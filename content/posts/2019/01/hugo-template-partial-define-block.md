---
author: ["@ottanxyz"]
date: 2019-01-05T23:14:19+09:00
draft: false
title: 'Hugoのテンプレート構文「template」「partial」「block」「define」のわかりやすい解説'
type: post
slug: hugo-template-partial-define-block-20190101
categories:
    - Blog
tags:
    - Hugo
toc: true
---

![](/uploads/2019/01/190105-2f55736572732f6.jpg)

Hugo のオリジナルテーマ作成を勝手に応援する企画、記念すべき第 1 弾はテンプレート構文の基本となる「template」「partial」「block」「define」の違いについてです。以下のバージョンで確認しています。

```
Hugo Static Site Generator v0.53/extended darwin/amd64 BuildDate: unknown
```

## Hugo のテンプレート構文

Hugo にはさまざまなテンプレート構文が用意されています。今回は、その中でも基本となる以下の 4 つについて、とくにつまずきやすい点を中心に解説します。記事の内容に対するご質問やご指摘等はコメント欄でお待ちしております。

-   `template`
-   `partial`
-   `block`
-   `define`

### template

`template`構文は、Hugo であらかじめ定義されている内部のテンプレートファイルを読み込むための構文です。オリジナルテーマの独自の HTML ファイルを同構文で使用することはできません。

```go-html-template
{{ template “_internal/disqus.html” . }}
```

また、`template`に指定できるテンプレートは、Hugo のバージョンに依存します。さらに、テンプレートとして指定できる HTML ファイルは、Hugo に組み込まれているため、表面上はどこにもありません。中身を知るためには、GitHub のソースコードを追うしかありません。

Hugo 0.53 では、以下のテンプレートが用意されています。テンプレートの中身の説明は別の機会に譲り、ここでは詳細は割愛します。

-   [hugo/disqus.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/disqus.html)
-   [hugo/google_analytics.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/google_analytics.html)
-   [hugo/google_analytics_async.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/google_analytics_async.html)
-   [hugo/google_news.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/google_news.html)
-   [hugo/opengraph.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/opengraph.html)
-   [hugo/pagination.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/pagination.html)
-   [hugo/schema.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/schema.html)
-   [hugo/twitter_cards.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/twitter_cards.html)

内包されているテンプレートのソースも、Hugo の構文にしたがって記載されています。そのため、テンプレートのソースを読み込むことで、Hugo の構文の理解に役立ちます。時間のあるときに一度目を通しておくことをオススメします。オススメは、[hugo/opengraph.html at master · gohugoio/hugo](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/opengraph.html)です。

### partial

`template`は、Hugo 独自の内部のテンプレートを読み込むための構文でした。Hugo に内包されていて、直接内容を参照することはできませんでした。それに対して`partial`は、オリジナルテーマで作成した、独自の HTML ファイルを読み込むための構文です。

```go-html-template
{{ partial “article-header.html” . }}
```

`partial`で指定したファイルは、以下の優先度順で読み込まれます。

1. `layouts/partials/*<PARTIALNAME>.html`
2. `themes/<THEME>/layouts/partials/*<PARTIALNAME>.html`

ファイル名は任意で構いませんが、必ず上記のフォルダ配下に配置する必要があります。もし、上記のディレクトリ配下に該当のファイルが見つからない場合は、ビルド時にエラーが発生します。

また、`partial`の読み込み元で、さらに別の HTML ファイルを読み込むことができます。

`partial`は、HTML ファイルを最小限のコンポーネント毎に分割した部品です。テーマで共通的に使用するサイトのヘッダーやフッター、ソーシャルネットワークのシェアボタンなど、共通的に使用する部品を分割しておき、後から用途に応じて使用できます。

1 つのテンプレートファイルが肥大化した場合、そのファイル自身の用途がわかりづらくなってしまうため、用途毎に`partial`によって Partial Template とすると良いでしょう。

#### 具体例

```go-html-template
{{ partial "site-header.html" . }}
{{ partial "site-content.html" . }}
{{ partial "site-footer.html" . }}
```

### block

Hugo で最初につまずく構文が、`block`と、後述する`define`ではないでしょうか。前述の`partial`と混同してしまうことがよくあります。

`partial`はオリジナルテーマの HTML ファイルを読み込むために使用する構文でした。それに対して、`block`はファイルを読み込むための構文ではなく、文字通り「ブロック」を定義するための構文です。

```go-html-template
{{ block “main” . }}
...
{{ end }}
```

`partial`はファイルを読み込むものでしたが、`block`は引数に定義した名称のブロックの範囲を定義します。範囲を定義するため、必ず終わり（end）を指定する必要があります。

そして、`partial`で読み込まれる HTML ファイル中に、`block`を定義できます。

では、なぜ`block`という構文が必要なのでしょうか。それは、後述の`define`で解説します。

### define

`define`は、必ず`block`とペアで使用します。単独で使用しても意味がありません。逆もまた同様です。`define`は、`block`で定義したブロックを実装、もしくは上書きする役目を持っています。プログラマティックに表現すれば、`block`が抽象、`define`がその実装だと解釈すればわかりやすいかもしれません。

`block`で定義したブロックの実装、すなわち`define`が存在しない場合でも、ビルド時にはエラーになりません。逆もまた然りで、`define`で定義した実装の、`block`の範囲が存在しない場合でも、ビルド時にはエラーになりません。

`block`で定義したブロックの実装が存在しない場合、ビルド時は`block`構文に記述した内容がそのまま表示されます。`block`で定義された内容が空の場合は、何も表示されません。また、`define`で定義したブロックが存在しない場合、`define`構文は無視され、何も表示されません。

では、`block`や`define`はどのような時に使用すれば良いのでしょうか。理解を深めるためには、Hugo の Base Template を合わせて理解しておくと良いでしょう。

#### Base Template

Hugo のテンプレートには予約されているファイルがあります。Base Template と呼ばれています。Base Template は、記事執筆時点では以下のファイルがあります。

1. `/layouts/section/<TYPE>-baseof.html`
2. `/themes/<THEME>/layouts/section/<TYPE>-baseof.html`
3. `/layouts/<TYPE>/baseof.html`
4. `/themes/<THEME>/layouts/<TYPE>/baseof.html`
5. `/layouts/section/baseof.html`
6. `/themes/<THEME>/layouts/section/baseof.html`
7. `/layouts/_default/<TYPE>-baseof.html`
8. `/themes/<THEME>/layouts/_default/<TYPE>-baseof.html`
9. `/layouts/_default/baseof.html`
10. `/themes/<THEME>/layouts/_default/baseof.html`

ビルド時に上から順番に捜査され、記事の`<TYPE>`に応じた Base Template が読み込まれます。このテンプレートファイルの中で、テーマ作成に必須のファイルは、`/layouts/_default/baseof.html`のみです。これを踏まえた、オリジナルテーマ作成時の最小の構成は以下の通りです。

```
├── _default
│   ├── baseof.html
│   ├── list.html
│   └── single.html
└── index.html
```

`index.html`は、トップページ（フロントページ）のレンダリングに使用されます。`list.html`は、カテゴリーやタグ、またフロントページ等に表示する記事の一覧を表示させるためのテンプレートです。最後の`single.html`は、記事単体をレンダリングするための、もっとも重要なテンプレートファイルとなります。`baseof.html`ファイルは、すべてのファイルが読み込まれる際に合わせて読み込まれます。

通常は、これらに前述の Partial Template 等を組み合わせて使用することとなります。

`baseof.html`の記述例をみてみましょう。

```go-html-template
<!DOCTYPE html>
<html lang="{{ $.Site.LanguageCode | default "ja" }}" class="no-js">

<head>
	<meta charset="utf-8" />
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>{{ block "title" . }}{{ .Site.Title }} {{ with .Params.Title }} | {{ . }}{{ end }}{{ end }}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="robots" content="noindex, nofollow">

	{{ if .RSSLink }}
	<link href="{{ .RSSLink }}" rel="alternate" type="application/rss+xml" title="{{ .Site.Title }}" />
	<link href="{{ .RSSLink }}" rel="feed" type="application/rss+xml" title="{{ .Site.Title }}" />
	{{ end }}

	{{- template "_internal/opengraph.html" . -}}
	{{- template "_internal/google_news.html" . -}}
	{{- template "_internal/schema.html" . -}}
	{{- template "_internal/twitter_cards.html" . -}}
	{{- template "_internal/google_analytics_async.html" . -}}
</head>

<body>
	{{ block "header" . }}{{ partial "site-header.html" .}}{{ end }}
	<main class="grid-container" role="main">
		{{ block "main" . }}{{ end }}
	</main>
	{{ block "footer" . }}{{ partial "site-footer.html" . }}{{ end }}
	{{ block "scripts" . }}{{ partial "site-scripts.html" . }}{{ end }}
</body>

</html>
```

このテンプレートには、Hugo で生成される静的サイトの骨格とも言える内容が含まれています。たとえば、`<head>`タグに囲まれた内容は、記事の内容を問わず毎回レンダリングすべき内容です。`index.html`、`list.html`、`single.html`のすべてのファイルに同一の内容を記述しても良いのですが、冗長であることは言うまでもありません。`baseof.html`にまとめて記述しておくことで、サイトの共通部分をすべて 1 つにまとめることができます。

ここで、下記の部分に注目してください。

```go-html-template
	<main class="grid-container" role="main">
		{{ block "main" . }}{{ end }}
	</main>
```

`main`と呼ばれるブロックが定義されていることがわかります。ブロックの内容は空であり定義されていません。`index.html`であれば個別の記事への誘導やホームページに関する情報、`single.html`であれば個別記事の内容、`list.html`であれば記事の一覧を表示するべきです。そこで、`baseof.html`では`main`と呼ばれる空のブロックのみ定義しておき、実際のブロックの実装は各テンプレートに委ねています。こうすることで、各テンプレート側では個別に実装する部分のみを意識すればよく、サイトのヘッダーやフッター等の共通部分は`baseof.html`にお任せすれば良いことになります。

では、`index.html`の記述例を見てみます。

```go-html-template
{{ define "main" }}
<div id="main" class="grid-x grid-margin-x" style="margin-top: 5rem;">
	<div class="cell small-12 article-list">
		{{ range .Paginator.Pages }}
		{{ .Render "li" }}
		{{ end }}
	</div>
	{{ template "_internal/pagination.html" . }}
</div>
{{ end }}
```

`index.html`には、ブロックに対する実装部分のみが記述されています。フロントページが呼び出された場合、`index.html`の`define`で定義されたブロックが、`baseof.html`の`main`ブロックを上書きし、上記の内容に書き換えます。`block`、`define`のイメージが少し湧いてきましたでしょうか。

別の例をお見せします。OGP（Open Graph Protocol）で、記事のアイキャッチ画像を`<meta>`タグ内に記述したい場合があります。フロントページでは、デフォルトの画像、個別の記事ではアイキャッチ画像をタグ内に記述したいとします。このような場合、まず`baseof.html`にデフォルトのタグを定義しておきます。

```go-html-template
{{ block "ogp-image" . }}
<meta property="og:image" content="[Default Image URL]">
{{ end }}
```

仮に`ogp-image`というブロックを定義しました（このようにブロックには任意の名称を付与できます）。そして、`single.html`に個別のアイキャッチ画像を定義するためのブロックの実装を記述します。

```go-html-template
{{ define "ogp-image" }}
<meta property="og:image" content="[Eyecatch Image URL]">
{{ end }}
```

これで、アイキャッチ画像が設定されていない場合はデフォルトの画像、個別記事などアイキャッチ画像が指定されている場合はその画像の URL で`<meta>`タグの内容が上書きされるようになります。

このように、`block`と`define`を有効活用することで、サイトの全体最適化を図ることができます。

## オリジナルテーマ作成にあたって

ただし、いきなりこのような全体最適化を図ることは難しいものです。そこで、以下のような順序でテンプレートを最適化していくことをオススメします。

1. `index.html`、`list.html`、`single.html`を作成する（Hugo の構文を使用しない素の HTML ファイルを生成しましょう）
2. 共通部分（ヘッダー、フッター等）を別ファイルに切り出して、Partial Template 化する
3. テンプレートによって内容が異なる部分（コンテンツ）を、`block`として切り出す

このように大きな一枚岩のファイルから、徐々に全体最適化された個別のファイルを切り出していく方法をオススメします。こうすることで、必要な情報をすべて網羅した上で、かつテンプレートファイルを最小限に抑えることができます。

## 参考リンク

-   [Hugo's Lookup Order | Hugo](https://gohugo.io/templates/lookup-order/)
-   [Base Templates and Blocks | Hugo](https://gohugo.io/templates/base/)
-   [Internal Templates | Hugo](https://gohugo.io/templates/internal/)
