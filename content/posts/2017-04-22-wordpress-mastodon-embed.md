---
author: ottan
date: 2017-04-22 06:12:43+00:00
draft: false
title: WordPressにMastodonのURLを貼り付けただけでトゥートを埋め込む方法
type: post
url: /wordpress-mastodon-embed-5700/
categories:
- Blog
tags:
- Development
---

 ![](/images/2017/04/170422-58faefe1b74dd.jpg)
 photo credit: James St. John [Reconstruction of Mammut americanum (American mastodon) (Pleistocene; Shelton Mastodon site, Oakland County, Michigan, USA)](http://www.flickr.com/photos/47445767@N05/32290915030) via [photopin](http://photopin.com) [(license)](https://creativecommons.org/licenses/by/2.0/) 



巷で噂の分散型ソーシャルネットワークサービス「Mastodon」が急成長を見せています。「Mastodon」は、同様の短文投稿型SNSである「Twitter」と比較すると、「Twitter」のようにサーバが集約された集中型と異なり、オープンソースソフトウェアでユーザが自由にインスタンスを構築できる分散型SNSとなっています。日本でも[mstdn.jp](https://mstdn.jp/)をはじめとして数多くのインタンスが構築されているため、お試しでアカウント登録された方も多いのではないでしょうか。





さて、Twitterの場合、WordPressにツイートのURLを貼り付けるだけで、ブログ投稿時に「いい感じ」に加工して表示してくれますが、「Mastodon」の場合はそうはいきません。将来的にWordPress用の正式プラグインやoEmbedに正式対応する可能性はありますが、現段階ではありません。（非公式プラグインはあるようですが）では、「Mastodon」のトゥート（Twitterのツイート）を表示するためにはどうすれば良いでしょうか。





## WordPressの本文にURLを貼り付けただけでMastodonのトゥートを表示するカスタマイズ





では、[プラグインを使わずにGistのコードをWordPressに埋め込む方法 – OTTAN.XYZ](/gist-wordpress-embed-6861/)でご紹介した手法を元に、「Mastodon」のトゥートを表示する方法を考えましょう。まず、トゥート表示の元となるURLの形式は以下を満たしているとします。




    
    https://mstdn.jp/@<username>/<NNNNNN>





なお、今回は日本インスタンス最大規模の「mstdn.jp」に限定しましたが、ホスト名を変更、もしくは追加することで任意のインスタンスに対応可能です。





![](/images/2017/04/170422-58faf25b2ce35.png)






「Mastodon」でトゥートを表示するためには、「Mastodon」上で以下のリンクをクリックします。





![](/images/2017/04/170422-58faf263537c6.png)






すると、上記のような画面が表示されるため、アドレスバーに表示されたURLをコピーしてWordPressの投稿画面に貼り付けてください。





### Mastodonのトゥートを埋め込むためのプログラム





Gistにプログラムを公開しています。以下のプログラムをダウンロード、もしくはコピー＆ペーストして、WordPressのテーマフォルダー内に保存してください。保存したら、`functions.php`から保存したプログラムを読み込んでください。読み込む際のパス指定にご注意ください。



https://gist.github.com/ottanxyz/9aeae0609e035479e937d4895a681701



暫定的に公開しているプログラムであるため、たとえば存在しないURLを指定した場合、正常に動作しません。商用目的で使用される場合には、もう少しエラーハンドリング等を行った方が良いでしょう（たとえば、`wp_remote_get`関数の戻り値（HTTPステータス）の判断など）。





![](/images/2017/04/170422-58faf2f3ae1a0.png)






「Mastodon」の埋め込みトゥートを表示させるためには以下の数値を取得する必要があります。




    
    https://mstdn.jp/users/<username>/updates/<NNNNNN>/embed





上記の数値を取得するためには、冒頭のURLから上記の数値を一意に検索する必要がありますが、そのためには冒頭のURLのヘッダーに隠された数値を取得します。そのため、ここではやや強引な手法で数値を取得しています。そのうち、APIが充実するにつれもっとやり方は簡単になると思われますが。





## まとめ





今回は、「Mastodon」のトゥートをWordPressに埋め込むための方法をご紹介しました。他にもっと簡単な方法等あればコメント欄等で教えていただけると助かります。
