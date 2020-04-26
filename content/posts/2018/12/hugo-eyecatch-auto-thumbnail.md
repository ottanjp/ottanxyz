---
author: ottan
date: 2018-12-24T15:12:57+09:00
draft: false
title: "Hugoで記事のアイキャッチ画像を自動的に取得する"
type: post
slug: hugo-eyecatch-auto-thumbnail-20181224
categories:
  - Blog
tags:
  - Hugo
  - Netlify
toc: true
---

![](/uploads/2018/12/181224-2f55736572732f6.jpg)

Hugo には、記事執筆時点において、WordPress のような便利なプラグインはありません。しかし、Shortcode やテンプレートの構文を工夫することで、WordPress と同等のプラグイン機能を実現できます。

```
Hugo Static Site Generator v0.52/extended darwin/amd64 BuildDate: unknown
```

たとえば、WordPress にはアイキャッチ画像という概念があります。Hugo にも同様に、アイキャッチ画像という概念があるものの、アイキャッチ画像の定義はユーザー側に委ねられています。よくある方法としては、Front Matter と呼ばれる記事のヘッダーに、アイキャッチ画像のイメージを定義することです。

```
---
...
featured_images: <image file's URI>
...
---
```

Front Matter に記述したパラメーターは、テンプレート構文で以下のように参照できます。

```
.Params.featured_images
```

おそらくこの方法がもっともわかりやすく、かつ Hugo の公式ドキュメントや数多くのテーマにも採用されています。わかりやすい反面、記事のアイキャッチ画像を URL で明示的に指定する必要があります。WordPress には、「Auto Post Thumbnail」と呼ばれる、アイキャッチ画像が指定されていない場合に、記事内の最初の画像をアイキャッチ画像として取得する便利なプラグインがあります。今回は、このプラグインと同等の機能を Hugo で実現します。

## Hugo で記事の先頭の画像をアイキャッチ画像として取得する方法

Hugo には、便利な[Functions | Hugo](https://gohugo.io/categories/functions)が多数あります。記事本文からアイキャッチ画像を取得するためには、記事本文（`Content`）の中から最初の`img`タグを取得すれば良いことになります。記事本文（`Content`）は、Markdown が HTML に変換された状態で取得されるため、`img`タグを取得するコードは以下の通りとなります。

```
{{ $eyecatch_image := findRE "<img.*?src=([^>]*)?>" .Content 1 }}
{{ range $eyecatch_image }}
{{ . | safeHTML }}
{{ end }}
```

`findRE`関数は、引数に指定した文字列から正規表現に合致する値を取得する関数です。また、第 2 引数は正規表現に合致する取得する個数を指定します。今回は、最初の`img`タグのみ取得できれば良いため、1 を指定します。

`findRE`関数の戻り値は、文字列の配列です。配列から値を取得するためには、`range`関数を使用します。

### 安全な HTML ドキュメントとして宣言するための「safeHTML」関数

取得したコンテンツに対して`safeHTML`関数を使用しています。Hugo のテンプレートエンジンは、コンパイルの際に HTML タグをすべてエスケープした文字列として取得します。この`safeHTML`関数を使用することで、取得した値が安全な HTML ドキュメントである、つまり Hugo のテンプレートエンジンによって HTML タグがエスケープされない状態で取得されます。

    例：関数を使用しない場合、たとえば、<は&lt;、>は&gt;にエスケープされます

## まとめ

アイキャッチ画像を取得するための、コンポーネント部品として整備しておくことによって、使い回しできます。

1. `layouts/partials/*<PARTIALNAME>.html`
2. `themes/<THEME>/layouts/partials/*<PARTIALNAME>.html`

ただし、上記の例では`img`タグが取得できない場合のエラーハンドリングが含まれていないため、取得したリストの要素数が 0 の場合は、デフォルト画像を表示するなどの判定文が必要でしょう。

```
{{ $eyecatch_image := findRE "<img.*?src=([^>]*)?>" .Content 1 }}
{{ if ge (len $eyecatch_image ) 1 }}
{{ range $eyecatch_image }}
{{ . | safeHTML }}
{{ end }}
{{ else }}
<img src="/images/gohugo-default-sample-hero-image.jpg">
{{ end}}
```
