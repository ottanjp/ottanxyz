---
author: ["@ottanxyz"]
title: HugoでSearch Consoleに追加された「ウェブに関する主な指標レポート」（CLS）の問題に対応する
date: 2020-07-03
tags:
  - Hugo
  - Google
categories:
  - Blog
slug: hugo-search-console-cls-improve
katex: false
---
![](/uploads/2020/07/screenshot-2020-07-03-20.28.33.png)

## Google Search Consoleに追加された新たな指標値

Google Search Consoleに新たな指標が追加されました。すべて、[ウェブに関する主な指標レポート](https://support.google.com/webmasters/answer/9205520?hl=ja)に記載の通りです。必ずしも早急な対処が必要なものではありません。ただし、これらの指標に対応することで、必然的にUI/UXの向上が期待できます。

* LCP (Largest Contentful Paint)
* FID (Fist Input Delay)
* CLS (Cumulative Layout Shift)

### LCP (Largest Contentful Paint)

LCPは、「ビューポート内に表示される**最大の画像またはテキストブロック**のレンダリング時間」を表し、[Largest Contentful Paint (LCP)](https://web.dev/lcp/#examples)に具体例が掲載されています。ビューポートは、「モバイルデバイスでコンテンツを表示する幅」を示します。ビューポートは、`<meta>`タグで明示的に指定可能です。

例えば、いわゆるレスポンシブなデザインを採用しているページでは、下記の指定をすることが多いでしょう。「コンテンツをモバイルデバイス（Safari等のブラウザ）の幅に合わせてレンダリングし、等倍で表示する」ことを表しています。ユーザーの操作による拡大・縮小を制限するものではないことに注意してください。ブラウザが、レンダリング時に描画する幅を示しています。

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

**「2.5秒」以内**に、「最大の画像」または「最大のテキストブロック」が表示されると良い、と（Googleは）定義しています。必ずしもすべての要素が表示されるまでの時間を示しているわけではないことに注意してください。**表示されるページのレイアウトが決定されるまでの時間**と捉えることもできます。ページが完全に表示されるまでの時間から、考え方がシフトしていることが分かりますね。

### FID (Fist Input Delay)

FIDは、定義を直訳すると「ユーザーが最初にページと対話した時（リンクをクリックした時、ボタンをタップした時、JavaScriptを使ったカスタムコントロールを使用した時など）から、ブラウザが実際にその対話に応答してイベントハンドラの処理を開始できるようになるまでの時間」です。

リンクやボタンをタップしても何の応答もない、もしくは応答がないように感じるページに遭遇したことはありませんか。ボタンをタップしたのかどうかもわからない、イライラしますよね。そのようなユーザーのイライラを抑えるために、イベント（クリックやタップ）を発火したタイミングから**「100ミリ秒」以内**に何らかの応答をせよ、ということです。

### CLS (Cumulative Layout Shift)

CLSは、「読み込みフェーズにおけるページレイアウトの移動量を示します」とあります。[First Input Delay (FID)](https://web.dev/fid/)では、「ページの全ライフサイクルの間に発生する予期せぬレイアウトシフトのすべてについて、個々のレイアウトシフトスコアの合計を測定」とあります。同ページに掲載されているYouTubeの動画を見るのが、理解への近道です。

要は、**ページ読み込み中の「ぐらつき」の累積**を表します。

ショッピングサイトの決済画面を思い出してください。カートに入れた商品を確認する「確認画面」、カートに入れた商品を注文する「注文画面」があったとします。後者の画面では、最後に「注文」ボタンを押しますよね。誤った注文をキャンセルしたい場合、「キャンセル」ボタンを押すかもしれません。「確認画面」から「注文画面」へ遷移後、注文を取り消すために「キャンセル」ボタンを押したいとします。しかし、ページの読み込みが完全に終わっておらず、突如「キャンセル」ボタンの上に広告等が挿入されることがあります。その結果、「表示のズレ」が発生し、ボタンではなく誤って広告をクリックした、という経験はありませんか。もしくは、「キャンセル」しようとしたのに、誤って「注文」してしまったというケースも考えられるかもしれません。

これが、ページの「ぐらつき」です。細かな計算方法は割愛しますが、CLSはこの「ぐらつき」をなくしましょうという指標です。LCP、FIDが「時間」を指標としていたのに対して、CLSのみレイアウトに関するものです。

## デスクトップ（パソコン）にのみCLSの警告が表示された

前置きが長くなりましたが、本記事の本題にようやく突入できました。ある日、Google Search Consoleをのぞくと、**「CLSに関する問題: 0.25超 (パソコン)」**と表示されていました。モバイルに関する指標は、すべて良好でした。CLSは、前述の通り「ページ読み込み時のレイアウトのぐらつき」に関する問題です。パソコンとモバイルの違いを検討した結果、問題は`<img>`タグで表示される画像にあることが分かりました。

### 原因は<img>タグに"width"、"height"属性を指定していなかったこと

詳細は、[【2020年夏】imgタグにはwidthとheight属性を書くのがいいらしい | Rriver](https://parashuto.com/rriver/development/img-size-attributes-are-back)の記事が大変分かりやすく勉強になりました。ブラウザが賢くなったのです。[Can I use](https://caniuse.com/#feat=mdn-css_properties_aspect-ratio)によると、Chrome、Firefox、Edge （Chromium)など主要ブラウザで対応していることが分かります。

また、当サイトはモバイルよりもデスクトップからの訪問者が圧倒的に多いです。必然的にブラウザシェアの高いChromeからのアクセスが多くなります。MacやiPhoneなど、Apple系のコンテンツが多めのため、賢くなる前（？）のSafariからのアクセスが多かったのでしょう。その結果、「賢い」デスクトップと、「賢くなる前」のモバイルで明暗が別れたのです。

## HugoでIMGタグに自動的に"width"、"height"属性を付与する

それ、Hugoで簡単に解決できます。[Image Functions | Hugo](https://gohugo.io/functions/images/#imageconfig)に、`imageConfig`という素晴らしい関数が記載されています。また、Hugoのバージョン0.62.0以降ですが、[Configure Markup](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks)という、画像のレンダリング前にフックできる仕組みも持っています。素晴らしい。何も考えずに対応できる、はずでした。

当サイトの構成は、WordPress時代の名残を（私自身が）受けて、`content`ディレクトリの下に`posts`（記事）、`uploads`（画像）が、**年月毎に保存される**ようになっています。すべてのディレクトリを表示すると数が多くなるため、一部のみ掲載しています。

```
├── archetypes
├── content
│   ├── pages
│   ├── posts
│   │   ├── 2014
│   │   │   ├── 09
│   │   │   ├── ...
│   │   │   └── 12
│   │   └── 2020
│   │       ├── 04
│   │       ├── ...
│   │       └── 06
│   └── uploads
│       ├── 2014
│       │   ├── 09
│       │   ├── ...
│       │   └── 12
│       └── 2020
│           ├── 04
│           ├── ...
│           └── 06
```

Hugoの画像（リソース）ファイルは、[Page Resources](https://gohugo.io/content-management/page-resources/)でのみ機能します。`imageConfig`関数は、画像（リソース）ファイルの情報を取得するだけで、操作はしないためPage Resourcesの一部である必要はありません。

> Page resources are available for page bundles only, i.e. a directory with either a index.md, or _index.md file at its root. Resources are only attached to the lowest page they are bundled with, and simple which names does not contain index.md are not attached any resource.

Page Resourcesとは、簡潔に言えば、`index.md`もしくは`_index.md`があるディレクトリ、およびその配下です。`uploads`ディレクトリ配下に、そのようなファイルがありません。

そこで、まずは`/content/uploads`直下に、以下の`index.md`を新規作成しました。Front Matterが存在するだけの、いわば空ファイルです。ただのダミーファイルのレンダリングを防止するため、`headless`を`true`にします。[Page Bundles](https://gohugo.io/content-management/page-bundles/#headless-bundle)を参照してください。`index.md`を作成することで、`uploads`フォルダをPage Resourcesとして認識でき、かつタイトルしかないHTMLファイルの生成も防ぐことができました。

```md
---
title: Media
headless: true
---
```

まだまだ苦難は続きます。通常は、[Hugo Markdown Render Hooks 入門 - Qiita](https://qiita.com/peaceiris/items/afc9dc4f2a00d42fc043)のように、`.Page.Resources`でレンダリング対象の記事中の画像（リソース）を簡単に取得できます。しかし、当サイトのように記事と画像が分断されている場合、この方法は使用できません。そこで、`/layouts/_default/_markup/render-image.html`を、以下のように作成しました。

```go-html-template
{{ $image := (site.GetPage "uploads").Resources.GetMatch (strings.TrimPrefix "/uploads/" .Destination) }}
{{ with $image }}
{{ $imageConf := (imageConfig (printf "content/uploads/%s" .Name)) }}

<figure>
    <img src="{{ $.Destination | safeURL }}" alt="{{ $.PlainText }}" width="{{ $imageConf.Width }}"
        height="{{ $imageConf.Height }}">
    <figcaption>
        {{ if $.Title }}
        <p>{{ $.Title | markdownify }}</p>
        {{ else if $.Text }}
        <p>{{ $.Text | markdownify }}</p>
        {{ end }}
    </figcaption>
</figure>

{{ end }}
```

まず、`site.GetPage "uploads"`で`/content/uploads`ディレクトリ配下をPage Resourcesとして取得します。`site`は、`/content`ディレクトリ全体から検索することに注意してください。

`.Destination`で`<img>`タグの`src`属性に指定された値（例：`/uploads/2020/07/image.png`）を取得します。前段で取得したPage Resourcesは、`/content/uploads`配下を指します。`/content/uploads`の下に`uploads`ディレクトリは存在しません。そのまま画像（リソース）を取得しようとすると、`no such file or directory`エラーです。そこで、画像（リソース）を取得する前に、`.Destionation`に含まれる`/uploads/`を意図的に削除します。削除した上で、`GetMatch`関数により同じ名前の画像ファイルを検索します。

この方法により、ようやく画像をPage Resourcesとして取得することができます。なお、`GetMatch`関数は最初に見つかったリソースファイルを返却します。次に、リソースのファイル名（`.Name`）を元に、`imageConfig`関数により画像の情報を取得します。あとは、`imageConfig`の`Width`、および`Height`プロパティを、`<img>`タグの属性に指定することで完成です。

#### `imageConfig`関数に直接画像ファイルのパスを指定できない理由

`imageConfig`関数で必要なのは、Page Resourcesではなくファイルのパスです。画像ファイルのリサイズ等、画像を変更する操作を行う場合、Page Resourcesである必要がありますが、`imageConfig`関数は対象外です。では、なんでこんなまどろっこしい事をする必要があるのか疑問に思われたかもしれません。`imageConfig`に直接`.Destination`を指定すれば良いように思います。あるサイトでは十分に機能するでしょう。

[Markdown Render Hooks](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks)では、Markdownのイメージとして指定されたすべてが対象になります。つまり、外部のイメージファイル（例えば、[Placehold.jp](https://placehold.jp/)で作成されたダミーファイル）が指定されているかもしれません。もちろん、外部のファイルに対して`imageConfig`関数は適用できず、ビルド時にエラーとなります。そのため、`imageConfig`関数の前段で何らかの判断が入るはずで、その手段として今回はPage Resourcesによる取得を用いました。将来的に画像のリサイズ等を動的に実施する可能性もあったからです。（ビルド時間が膨大になるため実施しないと思いますが）

## 参考

* [Hugo Markdown Render Hooks 入門 - Qiita](https://qiita.com/peaceiris/items/afc9dc4f2a00d42fc043)
* [Optimize Cumulative Layout Shift](https://web.dev/optimize-cls/)
* [Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/#feat=mdn-css_properties_aspect-ratio)
