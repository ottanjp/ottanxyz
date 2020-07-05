---
author: ["@ottanxyz"]
date: 2016-05-08T00:00:00+00:00
draft: false
title: プラグインを使わずにGistのコードをWordPressに埋め込む方法
type: post
slug: gist-wordpress-embed-6861
categories:
  - Blog
tags:
  - Development
---

![](/uploads/2016/05/160508-572f1ee1418ea.png)

WordPress でプログラムのソースコードをハイライトする方法はいくつかありますが、公開されているプラグインやシンタックスハイライターを使用せずに、手っ取り早く公開したい場合は、GitHub Gist が便利です。[WordPress.com](https://ja.wordpress.com/)では、デフォルトで Gist のコードの埋め込みに対応しているのですが、[WordPress.org](https://wordpress.org/)で公開されている WordPress のプログラムは埋め込みに対応していません。

そこで、今回は外部のプラグインを使用せずに、Gist の URL をブログの本文に貼り付けるだけで Gist のコードを WordPress に埋め込む方法をご紹介します。この方法は、WordPress 4.5.2 で確認しています。

## WordPress の本文に Gist のコードを埋め込む

![](/uploads/2016/05/160508-572f21adf38f6.png)

通常、Gist のコードを WordPress の本文に埋め込むためには、Gist のページ上の「Embed」からリンクを取得し、それを WordPress の本文に貼り付ける必要があります。それだけでも十分に手軽なのですが、ここでは Gist の URL を貼り付けるだけで自動的に WordPress の本文に埋め込む方法をご紹介します。

{{< gist ottanjp 1d87a31d81b26db857f1fed436a3db95 >}}

WordPress の本文に Gist のコードを埋め込むためには、以下のコードをテーマの**functions.php**に追加します。

{{< gist ottanjp 1d87a31d81b26db857f1fed436a3db95 >}}

あとは、WordPress の本文に Gist の URL を貼り付けるだけで上記のように自動的にソースコードが埋め込まれるようになります。

### Bootstrap4 を使用している場合の注意点

CSS フレームワークとして、[Bootstrap4](http://v4-alpha.getbootstrap.com/)を使用している場合には注意が必要です。Gist の CSS と Bootstrap4 の CSS が競合し、Gist のソースコードが正常に表示されません。そのため、**style.css**、もしくは独自の CSS に以下のコードを追加してください。

{{< gist ottanjp bf6cb78f08c9b567c22043d7330bdc2b >}}

## まとめ

Gist のソースコードを公開することで、

- ソースコードの修正が楽
- ソースコードの HTML エンティティの変換が不要
- シンタックスハイライトは勝手に Gist が対応してくれる
- レスポンシブデザインに対応してくれる

と、さまざまなメリットがありました。弊サイトではこれまでシンタックスハイライターとして、[highlight.js](https://highlightjs.org/)を使用していたのですが、これを機に Gist に乗り換えも検討してみようと思います。

### 参考リンク

今回、**functions.php**にコードを追加するにあたり、以下のリンクを参考にさせていただきました。ただし、以下で公開されているコードをそのまま使用したところ、正常に動作しなかったため改変させていただきました。

http://targetimc.com/insertar-un-gist-de-github-en-wordpress-o-genesis/
