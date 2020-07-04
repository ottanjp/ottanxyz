---
author: ["@ottanxyz"]
title: CSSフレームワーク「Bulma」の「columns」クラスに関する挙動について
date: 2020-06-14T00:00:00.000Z
tags:
  - CSS
categories:
  - Web
slug: bulma-css-framework-columns-responsive
katex: false
---
CSSフレームワークの「[Bulma: Free, open source, and modern CSS framework based on Flexbox](https://bulma.io/)」の`columns`クラスの挙動がおかしい、というお話です。

[Columns responsiveness](https://bulma.io/documentation/columns/responsiveness/)は、Flexboxをベースとしたレスポンシブなレイアウトを簡単に定義できます。ところが、以下のシンプルなコードをみてください。

```html
<html>
<body>
  <div class="columns is-desktop">
    <div class="column">1</div>
    <div class="column">2</div>
    <div class="column">3</div>
  </div>
</body>
</html>
```

何の変哲もない、チュートリアルに出てきそうなカラムレイアウトです。一見、何の問題もなさそうに見えます。しかし、本コードには以下の問題があります。

* `columns`で定義された`div`エレメントの横幅が、親要素である`body`エレメントの横幅を上回っている

Chromeのデベロッパーツールで確認すると、以下のように表示されます。

![](/uploads/2020/06/screenshot-2020-06-14-16.32.21.png)

![](/uploads/2020/06/screenshot-2020-06-14-16.32.29.png)

`body`エレメントの横幅1618pxに対し、`columns`クラスを付与した`div`エレメントの横幅は1642pxと、`body`エレメントの横幅を上回っています。マージンのせいです。この事実により、以下の問題が生じます。

* ブラウザは最上位の`body`エレメントの横幅を基準に表示する
* しかし、その子要素である`div`エレメントの横幅が上回っているため、要素がはみ出してレンダリングされる

デスクトップではあまり気になりませんが、モバイルからアクセスすると左右等に「ページがぐらつく」問題が発生します。モバイルでページ表示後に、2本の指で目一杯縮小すると「ぐらつき」はなくなります。ただし、少々気持ち悪いです。ワークアラウンドとしては、以下のように`is-marginless`クラスを付与します。これは、強制的に`columns`クラスで付与されるマージンを0にするものです。

```html
<html>
<body>
  <div class="columns is-desktop is-marginless">
    <div class="column">1</div>
    <div class="column">2</div>
    <div class="column">3</div>
  </div>
</body>
</html>
```

## 参考リンク

* [Wrapped `columns` overlap next element · Issue #1047 · jgthms/bulma](https://github.com/jgthms/bulma/issues/1047)
