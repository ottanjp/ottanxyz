---
author: ["@ottanxyz"]
title: HugoのMarkdownで数式組版ライブラリであるKaTeXをサポートする
date: 2020-05-25T00:00:00+00:00
tags:
  - Hugo
  - KaTeX
categories:
  - Blog
slug: support-hugo-katex
katex: true
markup: mmark
---
Hugoで、KaTeXというブラウザで数式を表現するためのライブラリをサポートする方法です。Hugo 0.70.0（Extended）で正常に表示されることを確認していますが、今後のバージョンアップ等により、以下の方法がサポートされなくなる可能性がありますので、ご注意ください。特に、Markdownパーサの変更が発生した場合、影響を受ける可能性があります。

## 表示

Markdownに記載することで、以下のように表示されます。

```tex
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$

```tex
$$
\frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}} {1+\frac{e^{-8\pi}} {1+\cdots} } } }
$$
```

$$
\frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}} {1+\frac{e^{-8\pi}} {1+\cdots} } } }
$$

```tex
$$
 \begin{bmatrix}
  a & b \cr
  c & d 
  \end{bmatrix}
$$
```

$$
 \begin{bmatrix}
  a & b \cr
  c & d 
  \end{bmatrix}
$$

## 結論

1. Markdownパーサを[Mmark](https://github.com/miekg/mmark)に変更する。ただし、Mmarkは現在非推奨のため今後廃止される可能性有り
2. KaTeXの[公式ドキュメント](https://katex.org/docs/browser.html)通りに、ライブラリを読み込む。ただし、全てのページでライブラリを読み込むと、ページの描画速度が遅くなるため、必要な場合にのみ読み込むよう一手間の工夫を加える

### Front Matterの修正

まず、`archetypes/default.md`のFront Matterを以下のように修正します。

```md
---
...
katex: false
markup:
---
```

`katex`は、Boolean値です。このMarkdownにKaTeXによる数式が含まれるかどうかを明示します。デフォルト値は、`false`です。この値が`true`の場合、テンプレートで、KaTeXによる描画に必要な各種スタイルシートやJavaScriptを読み込みます。

### テンプレートの修正

`<head>`タグに以下の記述を追記します。

```html
<head>
...
{{ block "katex-stylesheet" . }}{{ end }}
...
</head>
```

また、`</body>`タグの直後に、以下の記述を追記します。

```html
{{ block "katex-javascript" . }}{{ end }}
```

続いて、`layouts/_default/single.html`を修正します。

```html
{{ define "katex-stylesheet" }}
{{ if .Params.katex }}
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">
{{ end }}
{{ end }}

{{ define "katex-javascript" }}
{{ if .Params.katex }}
<script defer src="//cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js" integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz" crossorigin="anonymous"></script>
<script defer src="//cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI" crossorigin="anonymous" onload="renderMathInElement(document.body,{delimiters: [{ left: '\\[', right: '\\]', display: true },{ left: '$', right: '$', display: false }],});">
</script>
t>
{{ end }}
{{ end }}
```

Front Matterの`katex`が`true`の場合のみ、KaTexのライブラリを読み込みます。以上で、KaTeXをサポートする準備は整いました。

### Front Matterの`markup`を`mmark`に変更する

Hugo 0.60.0以降、Markdownパーサに[Goldmark](https://github.com/yuin/goldmark)が使用されています。Goldmarkで、KaTexの記法（$$〜$$）を使用した場合、冒頭の行列など、改行が含まれる場合の数式を上手く表現することができませんでした。

そこで、そのような数式を含む場合、もしくはKaTexによる数式を使用する可能性がある場合、Front Matterの`markup`を`mmark`に変更しておきます。ただし、[Mmark](https://github.com/miekg/mmark)は、記事執筆時点の最新版であるHugo 0.67.0（Extended）では非推奨（deprecated）となっており、将来廃止される可能性があります。
