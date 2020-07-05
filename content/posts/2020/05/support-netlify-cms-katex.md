---
author: ["@ottanxyz"]
title: Netlify CMSのプレビューでHightlight.js + KaTeX（LaTeX）をサポートする
date: 2020-05-30T00:00:00+00:00
tags:
  - Netlify
  - Hugo
  - KaTeX
categories:
  - Blog
slug: support-netlify-cms-katex
katex: true
markup: mmark
---
[HugoのMarkdownで数式組版ライブラリであるKaTeXをサポートする](/posts/2020/05/support-hugo-katex/)で、Hugoに$\KaTeX$を組み込みました。$\KaTeX$は、MathJaxより高速にレンダリングできる、ブラウザで動作する数式組版ライブラリです。

今回は、Netlify CMSのプレビューで、リアルタイムで$\KaTeX$による変換を行います。また、おまけ要素ですが、ついでにHighlight.jsを組み込み、プレビューでシンタックスハイライトが可能になるようにします。

ブラウザだけで完結します。

## 2020/6/14更新：Netlify CMSのプレビューでイメージファイルが正常に表示されない

Marked.jsでMarkdownをそのままレンダリングした場合、Netlify CMSへアップロードした画像ファイルがプレビューに表示されない問題があったため、以下のコードを追加しました。

```javascript
        // 2020/6/14 imageのパスをNetlifyCMSが提供するgetAsset関数で正規のパスに変換
        // 2020/6/14 Netlify CMSのプレビューでイメージファイルが表示されない問題に対応
        const renderer = new marked.Renderer()
        renderer.image = (href, title, text) => {
          if (!href) return text;
          // https://www.netlifycms.org/docs/customization/
          const uri = this.props.getAsset(href).url;
          return `<img src="${uri}" title="${title}" alt="${text}"/>`
        }
```

## Netlify CMS

`/static/admin/index.html`を以下のように書き換えます。

```html
<head>
...
  <!-- KaTeX -->
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js" integrity="sha384y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz" crossorigin="anonymous"></script>
  <!-- KaTeX Auto rendering Extension -->
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI" crossorigin="anonymous"></script>
  <!-- Marked.js -->
  <script src="https://cdn.jsdelivr.net/npm/marked@1.1.0/marked.min.js" integrity="sha256-GGbzkRkTtLnv3bOg61WAnkjYHxtsiVqu+tjMj6ssDVw=" crossorigin="anonymous"></script>
  <!-- highlight.js -->
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.3/build/highlight.min.js"></script>
...
</head>
```

まず、必要なライブラリを読み込みます。Netlify CMSのMarkdown Parserは、[remarkjs/remark](https://github.com/remarkjs/remark)です（記事執筆時点）。Remarkは、ブラウザから利用できません。今回は、ブラウザで利用可能な[markedjs/marked](https://github.com/markedjs/marked)を代わりに利用します。標準で組み込まれている機能を利用しないのは気が引けますが、現時点で代替手段が見当たりませんでした。（Netlify CMSで公開されているAPIが存在しない）

$\KaTeX$に必要なスクリプトは、冒頭の記事でご紹介しているため、そちらを参照してください。

```html
<body>
...
  <script>
    <!-- GitHub Markdown(Option) -->
    CMS.registerPreviewStyle("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css");
    <!-- KaTeX Stylesheet -->
    CMS.registerPreviewStyle("https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css");
    <!-- Hightlight.js Stylesheet -->
    CMS.registerPreviewStyle("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.3/build/styles/github-gist.min.css")
  </script>
...
```

続いて、Netlify CMSへスタイルシートを適用します。スタイルシートは、`<head>`タグに記述するのではなく、Netlify CMS専用の関数である`registerPreviewStyle`を用いて行います。こうすると、プレビューの`<iframe>`タグ中の`<head>`タグ内で自動的に読み込まれます。

なお、GitHub MarkdownのCSSは必須ではありません。GitHub風のスタイルシートを適用するためのCSSファイルであり、お好みです。`markdown-body`というクラスの子要素に対して、スタイルが適用されます。

また、Hightlight.jsを必要としない場合も、CSSファイルを読み込む必要はありません。

```html
<body>
...
 <!-- "import"構文を利用するため"module"として読み込み -->
 <script type="module">
    // JavaScriptでJSXスタイルの構文を利用できる軽量ライブラリ。トランスパイル不要。HTMLのレンダリング目的のみで利用
    import htm from 'https://unpkg.com/htm?module';
    // Netlify CMSのh関数（React.createElementのエイリアス）のバインド
    const html = htm.bind(h);

    const Post = createClass({
      render() {
        const entry = this.props.entry;
        const title = entry.getIn(['data', 'title'], null);
        // bodyが空の場合は、空文字列とする。デフォルトはnull。nullだと後述のMarkdown変換の際にエラーとなる
        let body = entry.getIn(['data', 'body'], '');
        // KaTeXのレンダリング関数へ渡すためのDOMを生成
        let div = document.createElement('div');

        // 2020/6/14 imageのパスをNetlifyCMSが提供するgetAsset関数で正規のパスに変換
        // 2020/6/14 Netlify CMSのプレビューでイメージファイルが表示されない問題に対応
        const renderer = new marked.Renderer()
        renderer.image = (href, title, text) => {
          if (!href) return text;
          // https://www.netlifycms.org/docs/customization/
          const uri = this.props.getAsset(href).url;
          return `<img src="${uri}" title="${title}" alt="${text}"/>`
        }

        // Marked.jsのオプションでhighlight.jsをサポート
        // https://madogiwa0124.hatenablog.com/entry/2019/01/03/203334
        marked.setOptions({
          highlight: function (code, lang) {
            return hljs.highlightAuto(code, [lang]).value;
          },
          renderer: renderer,
        });
        // 事前に生成したDOMにMarkdown→HTML変換済みの文字列を格納
        div.innerHTML = marked(body);
        // KaTeXのAuto Rendering Extensionを利用して変換
        // デフォルトのデリミタから、LaTeXと同様の形式へ変更
        renderMathInElement(div, {
          delimiters: [
            // display: true はHTMLのBlock Element
            { left: '$$', right: '$$', display: true },
            // display; falseはHTMLのInline Element
            { left: '$', right: '$', display: false },
          ],
        });

        // htmによるレンダリング。dangerouslySetInnerHTMLを利用する場合、事前にサニタイズによるXSS対策を推奨
        return html`
          <body>
            <main>
              <article class="markdown-body">
                <h1>${title}</h1>
                <div dangerouslySetInnerHTML=${{ __html: div.innerHTML }}></div>
              </article>
            </main>
          </body>
        `;
      },
    });

    CMS.registerPreviewTemplate('blog', Post);
  </script>
...
</body>
```

Netlify CMSの実装は、Reactコンポーネントの集まりです。

Netlify CMS用にカスタマイズされた`createClass`関数、および`React.createElement`のエイリアスである`h`関数を利用して、Reactコンポーネントを作成します。`createClass`関数でコンポーネントを宣言し、Netlify CMS専用の`registerPreviewTemplate`関数でコンポーネントを登録します。

`createClass`関数で宣言したコンポーネントで実装したクラスに含める必要のある関数は、`render`関数のみです。戻り値は、`React.Element`です。通常、`h`関数による実装を行いますが、記述方法が直感的でないことと、JSXライクな構文を利用できる[developit/htm](https://github.com/developit/htm/)が便利であるため、こちらを利用しています。

Markdownパーサとして、ブラウザで利用可能な[markedjs/marked](https://github.com/markedjs/marked)を使用します。また、シンタックスハイライト用のライブラリで、Hugoでも標準で使用されている[highlight.js](https://highlightjs.org/)と連携が可能です。詳細は、上記のソースコードを参照してください。`setOptions`関数を使用します。

ポイントとなる$\KaTeX$との連携は、少々小細工しています。$\KaTeX$ライブラリでは、`render`、`renderToString`関数の2種類が用意されています。前者は指定したDOMへ描画、後者文字列として変換後の文字列を返却する関数です。いずれの関数も、前提としてHTMLでマークアップしたい文字列のみ、あらかじめ抽出した上で関数へと渡す必要があります。Markdownから、特定の文字列（例：`$$`）に囲まれた部分を抽出し、`renderToString`関数でHTMLに変換する、もしくはMarked.jsのプラグインとして別途実装するという方法も考えられます。しかし、高度な正規表現や、別途ライブラリを用意する必要があるため手間がかかります。

そこで、利用したいのが、$\KaTeX$の[Auto-render Extension · KaTeX](https://katex.org/docs/autorender.html)です。`renderMathInElement`関数のみが用意されている、シンプルなライブラリです。HTMLElementを引数として渡すと、HTMLを解釈して必要な部分のみ自動的に変換してHTMLElementとして返却してくれる便利なライブラリです。`renderMathInElement`関数を利用するためには、事前にHTMLElementを生成して準備しておく必要があることから、今回はダミーの`div`Elementを生成しています。より良い方法はあるかもしれません。

なお、`renderMathInElement`関数のオプションとして、デリミタや無視するHTMLタグ等を変更できます。今回は、デリミタを`$$`と`$`に変更しました。無視するタグは、デフォルトでは`<pre>`、`<code>`、`<script>`等です。通常はデフォルトのままで良いでしょう。その他、無視する（変換したくない）クラス名を指定することもできます。

最後に、`htm`によるレンダリングです。事前に生成した`div`Elementを埋め込みます。`dangerouslySetInnerHTML`を宣言することで、生のHTMLをそのまま埋め込めますが、悪質なスクリプト実行を防ぐめたのXSS対策をした方が良いでしょう。利用しなくて良い方法があれば、そちらを利用してください。

## 参考リンク

* [Creating Custom Previews | Netlify CMS | Open-Source Content Management System](https://www.netlifycms.org/docs/customization/)
* [developit/htm: Hyperscript Tagged Markup: JSX alternative using standard tagged templates, with compiler support.](https://github.com/developit/htm/)
* [markedjs/marked: A markdown parser and compiler. Built for speed.](https://github.com/markedjs/marked)
* [Customize Netlify CMS preview with Markdown-it and Prism.js | guangshi.io](https://www.guangshi.io/posts/customize-netlify-cms-preview/)
* [KaTeX – The fastest math typesetting library for the web](https://katex.org/)
