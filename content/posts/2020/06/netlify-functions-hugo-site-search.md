---
author: ["@ottanxyz"]
title: Netlify Functions + Hugoで簡単サイト内検索
date: 2020-06-03T00:00:00+00:00
tags:
  - Hugo
  - Netlify
categories:
  - Blog
slug: netlify-functions-hugo-site-search
katex: false
---
静的サイトの悩みの種、サイト内検索をNetlify Functions＋Hugoで実装してみました。ポイントは、以下の通りです。

- クライアントであるブラウザにとって負荷の低い実装方法とする
- 記事の更新の都度、インデックス等の更新にかかる運用が発生しないようにする（自動的に行う）
- Hugoの機能、ある程度の月間PVに耐えられるものとする
- インクリメンタルサーチは実装しない（Netlify Functionsの無料範囲内での実装を目指す）

有名どころでは、[Lunr: A bit like Solr, but much smaller and not as bright](https://lunrjs.com/)や[Modern site search for companies of all sizes | Algolia](https://www.algolia.com/)があり、[Search for your Hugo Website | Hugo](https://gohugo.io/tools/search/)でも紹介されています。今回は、同ページでも紹介されていますが、[What is Fuse.js? | Fuse.js](https://fusejs.io/)を使った実装方法をご紹介します。（気付いたら、Hugoのページが充実している）

なお、Netlify Functionsは、AWS Lambda + API Gatewayのラッパーです。詳細は、[Netlify Functions | Netlify](https://www.netlify.com/products/functions/)を確認してください。

- 125,000リクエスト/月
- 100時間/月

のいずれかを超えるまで無償で利用可能の太っ腹な機能です。使うっきゃない。

## Hugo Configuration

[Custom Output Formats | Hugo](https://gohugo.io/templates/output-formats/)で、JSONを生成するように、`/config.yaml`に以下を追記します。（RSSはおまけ）

```yaml
outputs:
  home: [HTML,JSON,RSS]
```

`/public/index.json`が生成されるように、テーマの`layouts`ディレクトリ配下に`index.json`を作成します。記事全文である`.Content`（もしくは、`.Plain`）は、記事の数が多くなってくると膨大な量になるため外しました。検索はサーバサイドで処理する実装としたため、結果的には加えて良かったかもしれません。仮にクライアントサイドで処理する場合、初回アクセス時に数MBのJSONファイルを読み込んでもらう必要があります。

```go-html-template
{{- $.Scratch.Add "index" slice -}}
{{- range .Site.RegularPages -}}
  {{- $.Scratch.Add "index" (dict "title" .Title "tags" .Params.tags "categories" .Params.categories "permalink" .Permalink "summary" .Summary "publish_date" .PublishDate) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```

`hugo`コマンドで、以下のようなJSONファイルが自動的に生成されるようになります。デプロイの都度、生成されます。

`/public/index.json`

```json
[{"categories":["Blog"],"permalink":"https://ottan.xyz/posts/2020/05/support-netlify-cms-katex/","publish_date":"2020-05-30T00:00:00Z","summary":"...","tags":["Netlify","Hugo","KaTeX"],"title":"Netlify CMSのプレビューでHightlight.js + KaTeX（LaTeX）をサポートする"},{...}]
```

## Netlify Functions

続いて、Netlify Functionsの実装です。ECMAScript Modules（ESM）には対応していません。CommonJSで記述する必要があります。（今後、`import`へ対応すれば少し楽になるかも）

Netlify Functionsを実装するためには、`/funcitons`ディレクトリ配下に、`<関数名>.js`のファイルを作成します。`/<関数名>/<関数名>.js`でも良いようです。数が多くなる、読み込むJavaScriptファイルが多くなる場合は、ディレクトリを分割しても良いでしょう。なお、作成したNetlify Functionsは、`/.netlify/functions/<関数名>`で呼び出せます。

なお、[Fuse.js](https://fusejs.io/)のオプションは、ほぼデフォルトのまま使用しています。検索の「重み」（weight）を調節したい場合は公式サイトを参照してください。

`/functions/search.js`

```javascript
// /public/index.jsonの読み込み
const index = require('../public/index.json');
// package.jsonで管理。Fuse.jsのライブラリを読み込む
const Fuse = require('fuse.js');

const fuse = new Fuse(index, { keys: ['title'] });

// Netlify Functionsの形式に従って記載する
exports.handler = function (event, context, callback) {
  // URLの「&q=」の値を受け取る
  const term = event.queryStringParameters.q || '';
  let result = fuse.search(term);
  // 検索結果の上限値を設定する（任意）
  const length = Math.min(result.length, 21);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result.slice(0, length)),
  });
}
```

`/package.json`は以下の通りとなります。

```json
{
...
  "dependencies": {
    "fuse.js": "^6.0.0"
  },
...
}
```

## Hugo Template

続いて、Hugo Templateの修正です。`baseof.html`が以下の通りであるとします。`{{ block "main" . }}{{ end }}`以外は任意です。

`/layouts/_default/baseof.html`

```html
<body>
...
  <main role="main">
    {{ block "main" . }}{{ end }}
  </main>
...
</body>
```

新たに、`/content/search.md`を作成します。`hugo`コマンドで、`/public/search/index.html`が生成されます。また、`layout`に`"search"`を指定することで、`/layouts/_default`配下の、`search.html`がTemplateとして使用されます。

```markdown
---
title: "検索結果"
layout: "search"
---
```

次に、`/layouts/_default/search.html`を作成します。ここで作成したHugo Templateが検索結果ページになります。`main`ブロックを定義し、`baseof.html`で定義した`main`ブロックで読み込みます。こちらがクライアント（ブラウザ）が読み込む部分になります。

テキストボックスを用意して、`keydown`イベントを監視することでインクリメンタルサーチっぽいことは実装できるかもしれません。ただし、文字入力の都度Netlify Functionsを呼び出していては、レスポンスが悪いので調整が必要です。また、Netlify Functionsの月々の上限に達する可能性もあります。クライアント（ブラウザ）にJSONファイルをキャッシュしておくことも可能ですが、初回読み込みのみファイルサイズが大きくなるため注意が必要です。

```html
{{ define "main" }}
<!-- 検索結果表示用 -->
<section>
...
  <!-- 検索ワード・ヒット件数表示用 -->
  <div>検索結果：<span id="search-term"></span></div>
  <div>ヒット件数：<span id="search-count"></span></div>
...
</section>
<!-- 検索結果件数が上限に達したことを表示する -->
<section id="search-warning">
...
  検索結果の件数が多すぎます。そのため、一部のみ表示しています。
...
</section>
<!-- 検索結果が存在しないことを表示する -->
<section id="search-notfound">
...
  検索結果が0件です。別のキーワードをお試しください。
</section>
<section>
...
  <!-- 検索結果の表示用 -->
  <div id="search-result"></div>
...
</section>
<script>
  // 日付型フォーマットを定義するユーティリティ関数
  function formatDate(date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    return format;
  }

  // URLの「&q=」の部分を読み込むためのユーティリティ関数
  function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
  }

  // 画面読み込み時に呼ばれる非同期関数を定義
  window.onload = async () => {
    // URLから「&q=」を取り出す
    const search_term = param('q')
    // Netlify Functionsの呼び出し
    const result = await fetch(
      `/.netlify/functions/search?q=${search_term}`).then(x => x
      .json())
    // 検索値の上限を超える場合。is-hiddenはCSSで別途定義
    if (result.length > 20) {
      document.getElementById('search-warning').classList.remove('is-hidden')
    // 検索結果が0件の場合
    } else if (result.length == 0) {
      document.getElementById('search-notfound').classList.remove('is-hidden')
    }
    let count = Math.min(result.length, 20);
    let html = '';
    for (i = 0; i < count; i++) {
      // 日付の変換。index.json生成時に調整した方が楽かも
      let publish_date = formatDate(new Date(result[i].item.publish_date), "yyyy.MM.dd");
      // 取得した検索結果を埋め込む
      html += `<div>
        ...
          <div>
            <a href="${result[i].item.permalink}">${result[i].item.title}</a>
          </div>
          <div>${result[i].item.summary}</div>
          <div>
            <time>${publish_date}</time>
          </div>
        ...
      </div>`
    }
    document.getElementById('search-result').innerHTML = html
    document.getElementById('search-term').innerHTML = decodeURI(search_term)
    document.getElementById('search-count').innerHTML = count
  }
</script>
{{ end }}
```

サーバサイド（Netlify Functions）で検索処理を実施することで、クライアント（ブラウザ）の処理は最小限としました。本サイトでも、上記の方法によりサイト内（簡易）検索を実装していますので、ぜひ参考にしてみてください。
