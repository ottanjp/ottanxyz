---
author: ottan
date: 2016-05-08 11:48:55+00:00
draft: false
title: プラグインを使わずにGistのコードをWordPressに埋め込む方法
type: post
url: /gist-wordpress-embed-6861/
categories:
- WordPress
tags:
- Development
---

![](/images/2016/05/160508-572f1ee1418ea.png)






WordPressでプログラムのソースコードをハイライトする方法はいくつかありますが、公開されているプラグインやシンタックスハイライターを使用せずに、手っ取り早く公開したい場合は、GitHub Gistが便利です。[WordPress.com](https://ja.wordpress.com/)では、デフォルトでGistのコードの埋め込みに対応しているのですが、[WordPress.org](https://wordpress.org/)で公開されているWordPressのプログラムは埋め込みに対応していません。





そこで、今回は外部のプラグインを使用せずに、GistのURLをブログの本文に貼り付けるだけでGistのコードをWordPressに埋め込む方法をご紹介します。この方法は、WordPress 4.5.2で確認しています。





## WordPressの本文にGistのコードを埋め込む





![](/images/2016/05/160508-572f21adf38f6.png)






通常、GistのコードをWordPressの本文に埋め込むためには、Gistのページ上の「Embed」からリンクを取得し、それをWordPressの本文に貼り付ける必要があります。それだけでも十分に手軽なのですが、ここではGistのURLを貼り付けるだけで自動的にWordPressの本文に埋め込む方法をご紹介します。



{{< gist ottanxyz 1d87a31d81b26db857f1fed436a3db95 >}}



WordPressの本文にGistのコードを埋め込むためには、以下のコードをテーマの**functions.php**に追加します。



{{< gist ottanxyz 1d87a31d81b26db857f1fed436a3db95 >}}



あとは、WordPressの本文にGistのURLを貼り付けるだけで上記のように自動的にソースコードが埋め込まれるようになります。





### Bootstrap4を使用している場合の注意点





CSSフレームワークとして、[Bootstrap4](http://v4-alpha.getbootstrap.com/)を使用している場合には注意が必要です。GistのCSSとBootstrap4のCSSが競合し、Gistのソースコードが正常に表示されません。そのため、**style.css**、もしくは独自のCSSに以下のコードを追加してください。



{{< gist ottanxyz bf6cb78f08c9b567c22043d7330bdc2b >}}



## まとめ





Gistのソースコードを公開することで、






  * ソースコードの修正が楽
  * ソースコードのHTMLエンティティの変換が不要
  * シンタックスハイライトは勝手にGistが対応してくれる
  * レスポンシブデザインに対応してくれる




と、さまざまなメリットがありました。弊サイトではこれまでシンタックスハイライターとして、[highlight.js](https://highlightjs.org/)を使用していたのですが、これを機にGistに乗り換えも検討してみようと思います。





### 参考リンク





今回、**functions.php**にコードを追加するにあたり、以下のリンクを参考にさせていただきました。ただし、以下で公開されているコードをそのまま使用したところ、正常に動作しなかったため改変させていただきました。



http://targetimc.com/insertar-un-gist-de-github-en-wordpress-o-genesis/
