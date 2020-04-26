---
author: ottan
date: 2019-03-02T16:48:56+09:00
draft: false
title: "HugoでMarkdownのランダムな位置にGoogle AdSenseのコードを挿入する"
type: post
slug: hugo-content-markdown-random-20190303
categories: ["Blog"]
tags: ["Hugo"]
toc: true
---

![](/uploads/2019/03/190302-fdd22500e5352588.png)

Hugoは静的サイトジェネレーターですが、テンプレート（Go Template）を使用することで、比較的自由にカスタマイズ可能です。このブログも以前はWordPressを使用していましたが、現在はHugoを使用しています。

WordPressからHugoへ移行する場合、色々考慮点はあると思いますが、頭を悩ませる点が今までプラグインで補っていた機能をどうするかということです。と言っても、一般的なブログに必要と思われる要素は、Hugoがデフォルトで具備しています。

- OpenGraph
- Twitter Card
- Google Analytics
- Disqus

上記は一例ですが、様々なテンプレートが用意されていますので、Hugoのテーマを作成される場合には、ぜひ活用してみてください。

しかし、テンプレートには限界があるため、ある程度のカスタマイズを必要とする場合には自分で実装する必要があります。

ただ、静的サイトジェネレーターで、そこまでのカスタマイズはできないんじゃないか、と思われるかもしれません。しかし、Hugoは柔軟なテンプレート構造となっており、Go Template構文で書かれたテンプレートは、比較的自由にカスタマイズできます。もちろん、シンプルに実装することも可能です。

今回は、上記のデフォルトテンプレートで補うことが難しい一例として、Google AdSenseの記事本文への挿入を実装します。記事の前後に広告コードを配置するだけであれば単純ですが、記事の中に埋め込む場合には一工夫が必要です。

筆者自身、基本的な性格が横着なので、できうる限りのことは自動化したいと思うのです。

## 単一記事の表示時にGoogle AdSenseのコードをランダムな位置に表示する

Hugoには、`.Scratch`と呼ばれる「Scratchpad」（いわゆるメモ帳）のように、変数や値を格納しておける便利な機能があります。通常のテンプレートで使用する場面は少ないと思いますが、`.Scratch`を活用することでテンプレートの幅が広がります。バージョン0.43から`newScratch`関数が実装され、ローカルスコープを持つスクラッチパッドを作成できるようになりました。

Markdownで生成された記事本文、正確には`.Content`の戻り値であるHTMLを加工して、Google AdSenseのコードのランダム埋め込みを、この`.Scratch`を使って実装してみます。

### 変数や値の一時領域として使用できる`.Scratch`

`.Scratch`の使い方は公式サイトを参考にしてください。とりあえず、`.Set`、`.Get`、`.Add`あたりを覚えておけば十分でしょう。`.Scratch`と通常の変数の違いについては、例を見ながら後述します。

[.Scratch | Hugo](https://gohugo.io/functions/scratch#readout)

### single.html

`.Content`の戻り値であるHTMLから、`<p>`タグの数を抽出して、Google AdSenseのコードをランダム（今回の場合は、真ん中）に埋め込む実装例をご紹介します。ただし、意図せぬ埋め込むことによって、記事自体が見づらくなっては本末転倒です。実装する場合は、その点に十分注意してください。

`.Content`は、改行コード区切りの整形されたHTMLを返却するため、改行コードで分割し配列に格納できます。配列に格納した文字列が`<p>`タグから始まり、かつコードを挿入する位置であった場合、Google AdSenseのコードを読み込み変数に挿入します。

Google AdSenseのコードを挿入する位置、`.Content`を分割した配列を格納するために、`.Scratch`を使用します。

```go
{{ /* 記事本文から、<p>タグの数を抽出 */ }}
{{ $p_tag := findRE "<p>(.|\n])+?</p>" .Content }}
{{ /* Google AdSenseのコードを配置する場所を決定 */ }}
{{ /* 下記の例では、記事の真ん中 */}}
{{ $position := div (len $p_tag) 2 }}
{{ /* 記事本文を改行コードで区切って配列に格納 */ }}
{{ $contents := split .Content "\n" }}
{{ $.Scratch.Set "Content" "" }}
{{ /* <p>タグの数をカウントするための一時変数をセット */ }}
{{ $.Scratch.Set "Counter" 0 }}
{{ range $contents }}
	{{ /* 現在の行の末尾に改行コードを付与して追記 */ }}
	{{ /* 改行コードを付与しないと、生成されるHTMLの改行が削除されるため注意 */ }}
	{{ $.Scratch.Add "Content" (print . "\n") }}
	{{ if hasPrefix . "<p>" }}
		{{ /* <p>タグから始まる行をカウント */ }}
		{{ $.Scratch.Add "Counter" 1 }}
		{{ if eq ($.Scratch.Get "Counter") $position }}
			{{ /* Google AdSenseのコードをテンプレートから読み込み */ }}
			{{ $.Scratch.Add "Content" (partial "google-adsense.html") }}
		{{ end }}
	{{ end }}
{{ end }}
```

#### 解説

ポイントを解説します。

```go
{{ $p_tag := findRE "<p>(.|\n])+?</p>" .Content }}
{{ $position := div (len $p_tag) 2 }}
```

`.Content`から返却される戻り値は、HugoのMarkdownパーサーであるBrackfridayによって整形されたHTMLです。今回は、段落を基準にGoogle AdSenseのコードを挿入する位置を決めるため、HTMLコードの中から`<p>`タグの数を検出します。抽出した数を加工し（今回は中央値）、挿入する位置を決めます。

```go
{{ $contents := split .Content "\n" }}
```

HTMLを改行コードで分割し、配列に格納します。

```go
{{ $.Scratch.Set "Content" "" }}
{{ $.Scratch.Set "Counter" 0 }}
```

いよいよ`.Scratch`の登場です。`Content`と`Counter`という新たな変数を定義しています。先ほど、`$contents`や`$position`といった変数を定義しました。`Content`や`Counter`も、わざわざ`.Scratch`を使用することなく、変数を定義すれば良いだけではないのかと思われる方もいらっしゃるかもしれません。では、なぜ`.Scatch`を利用するのでしょうか。

```go
{{ range $contents }}
{{ /* do stuff */ }}
{{ end }}
```

これはおなじみの構文です。配列の要素に対して、1つずつ処理を行います。

さて、ここで覚えておくべきHugoのテンプレート（Go Template）の変数のスコープに関する制限事項があります。先ほど定義した`$contents`や`$position`は、`range`から`end`、`if`から`end`で定義されたブロックの範囲外のみで有効な変数です。つまり、これらの変数を`range`や`if`の構文中で上書きすることはできませんし、ブロックの中で参照することもできません。

```go
{{ $counter := 5 }}
{{ if eq $counter 5 }}
{{ $counter := add $counter 1 }}
{{ /* 表示される値は1です */ }}
{{ $counter }}
{{ end }}
{{ /* 表示される値は5です */ }}
{{ $counter }}
```

では、条件に応じて変数の値を動的に変更したい場合にどうするか。そこで登場するのが`.Scratch`です。`.Scratch`で定義した変数のスコープはそのページ内でグローバルです。

以上のことを念頭に置いて、もう一度実装例をご覧になってみてください。もうほぼ解説する点はないのですが、1点のみ注意事項があります。

```go
{{ $.Scratch.Add "Content" (print . "\n") }}
```

オリジナルの`Content`を生成する過程で、必ず要素の末尾に改行コードを挿入してください。`split`関数により改行コードをデリミターとして使用したため、そのまま要素を結合していくと、改行コードが失われた状態になります。`<pre>`タグ内に記述したソースコード中の改行コードも抹消されてしまうため、大変みづらい状態になります。改行が適切でないソースコードなど、誰も目を通してくれないはずです。

#### 記事の表示

最後に記事を表示したい部分に先ほど生成した`Content`を取得し、表示して完了です。`.Content`の出力を意図的に加工したため、`safeHTML`関数を使用して出力しています。

```go
{{ $.Scratch.Get "Content" | safeHTML }}
```

### google-adsense.html

Google AdSenseのコードを直接記述しても構わないのですが、メンテナンス性を考慮すると、分離しておいた方が良いと思われます。`partials`ディレクトリ配下に作成します。内容は、Google AdSenseの公式サイトから広告ユニットのコードを取得し、貼り付けているだけです。さらに改良するなら、`data-ad-client`等の固定値は`config.toml`に移動させても良いでしょう。

```html
<ins class="adsbygoogle"
     style="..."
     data-ad-client="ca-pub-..."
	 data-ad-slot="..."></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

## パフォーマンスへの影響は？

テンプレートを作り込めば作り込むほど、パフォーマンスへの影響は現れます。ただ、Hugo自体が非常に高速であることから、今回のように`.Content`の出力結果を加工するだけであれば、パフォーマンス（ビルド時間への影響）はほぼありませんでした。

ただ、単純に出力する場合と比較して、リソース（CPUやメモリ）の使用率は高くなる可能性がありますので、やりすぎには注意が必要です。