---
author: ["@ottanxyz"]
date: 2016-10-29T00:00:00+00:00
draft: false
title: WordPressで記事を投稿した瞬間に各種SNSに簡単にシェアする方法
type: post
slug: wordpress-publish-post-sns-share-5156
categories:
  - Blog
tags:
  - Development
  - IFTTT
---

![](/uploads/2016/10/161029-5814029bd3472.jpg)

以前、[WordPress に投稿したら IFTTT と Buffer を使用して自動的に Twitter、Facebook ページ、Google+に投稿する方法 – OTTAN.XYZ](/posts/2016/08/wordpress-ifttt-buffer-sns-4845/)で、投稿した記事を[Buffer - A Smarter Way to Share on Social Media](https://buffer.com/)の仕組みを使用して、各種 SNS にシェアする方法をご紹介しました。しかし、この方法のデメリットは、[IFTTT](https://ifttt.com/)の仕組みを利用している特性上、IFTTT のトリガーが発動するまでに最大 15 分の遅延が発生する可能性がありました（WordPress の状態によっては 15 分以上の遅延が発生する可能性も）。

そのため、今回は同様に IFTTT と Buffer の仕組みは使用するものの、最大 15 分の遅延なしに即座にトリガーを発動する方法を利用し、記事投稿後にすぐに各種 SNS に拡散する方法をご紹介します。

* [WordPressで記事を投稿した瞬間に外部にメールを送信する方法 - OTTAN.XYZ](/posts/2016/10/wordpress-publish-mail-push-5145/)

事前に、上記記事内でご紹介している、記事投稿後にメールで通知する機能を有効化しておいてください。

## WordPress に投稿した記事をすぐに SNS に拡散する方法

冒頭でご紹介した記事の最大のデメリットは、記事公開から SNS 拡散までにタイムラグが発生することでした。今回は、このタイムラグを無くすことを考えます。

### IFTTT で遅延を発生させずにトリガーを発動する方法

IFTTT は、一般的に 15 分間隔でトリガーの状態を確認し、トリガーが発動したらアクションを実行するという使い方が一般的ですが、IFTTT で唯一「15 分」の壁を取っ払い、遅延を無くす方法があります。それが、「Email」チャンネルを使用することです。

![](/uploads/2016/10/161029-58140419b7871.png)

[Email Channel](https://ifttt.com/email)にあらかじめ登録したメールアドレスから、「trigger@Applet.ifttt.com」宛にメールを送信すると、**15 分の遅延を待たずに即座にトリガーを発動することが可能**なのです。[Email Channel](https://ifttt.com/email)には、事前に送信元アドレスを登録する必要があります。メールアドレスを登録すると、そのメールアドレス宛に PIN コードが送信されますので、その値を入力して登録完了です。

[Email Channel](https://ifttt.com/email)を使用する上での注意点は以下の通りです。

- [Email Channel](https://ifttt.com/email)に登録できるメールアドレスは 1 つのみ
- 15 分間隔の遅延を発生せずに即座にトリガーが発動する
- 1 日に発動できるトリガーの回数は 750 回まで
- トリガーの回数がリセットされるタイミングは 12:00AM（GMT）

今回の用途に限った話をすれば、1 日に 750 回も記事を投稿することはないでしょうから、十分な内容です。ただし、登録できるメールアドレスは 1 つのみであることには注意が必要です。WordPress の用途以外ですでにメールアドレスを登録している場合は注意してください。Email Channel に登録したメールアドレスから IFTTT にメールを送信すると、別のレシピで Email Channel を使用している場合も即座にトリガーが発動します。

### WordPress の記事を公開したら IFTTT に通知する

[【カスタマイズ】WordPress で記事を投稿した瞬間に外部にメールを送信する方法 – OTTAN.XYZ](/posts/2016/10/wordpress-publish-mail-push-5145/)でご紹介した方法を使用して、`functions.php`の末尾に以下を追加してください。

    add_action( 'transition_post_status', function( $new_status, $old_status, $post ) {
      if ( 'publish' == $new_status  &&  'publish' != $old_status && 'post' == $post->post_type ) {
        $header = array( 'From: from@example.com' );
        wp_mail( 'trigger@Applet.ifttt.com', $post->post_title, get_permalink( $post->ID ), $header );
      }
    }, 10, 3 );

送信元（`from@example.com`）に、事前に[Email Channel](https://ifttt.com/email)に登録したメールアドレス、送信先に、`trigger@recipe.ifttt.com`を指定します。それ以外の内容は同様です。

### IFTTT でレシピを作成する

では、IFTTT でレシピを作成しましょう。[Create Recipe - IFTTT](https://ifttt.com/myrecipes/personal/new)からレシピを作成できます。

![](/uploads/2016/10/161029-581404362f244.png)

「this」をクリックします。

![](/uploads/2016/10/161029-5814043b01fd4.png)

「Choose Trigger Channel」に「Email」を選択します。

![](/uploads/2016/10/161029-5814044155436.png)

「Choose a Trigger」で「Send IFTTT any email」を選択します。

![](/uploads/2016/10/161029-58140445d728c.png)

「Create Trigger」をクリックします。

![](/uploads/2016/10/161029-5814044b331cd.png)

「that」をクリックします。

![](/uploads/2016/10/161029-581404502ebba.png)

「Choose Action Channel」から「Gmail」を選択します。

![](/uploads/2016/10/161029-581404552d48a.png)

「Choose an Action」から「Send an email」を選択します。

![](/uploads/2016/10/161029-5814045971e72.png)

「To address」に、Buffer の固有のメールアドレスを指定します。固有のメールアドレスの指定方法については、[WordPress に投稿したら IFTTT と Buffer を使用して自動的に Twitter、Facebook ページ、Google+に投稿する方法 – OTTAN.XYZ](/posts/2016/08/wordpress-ifttt-buffer-sns-4845/)を参照してください。

「Subject」は、`{{Subject}}`を指定します。「Email Channel」に送付されてきたメールの件名（今回の場合は記事のタイトル）が格納されます。必要に応じて、「ブログ更新」などわかりやすい件名をつけてください。

「Body」は、`{{Body}}<br>@now`を指定します。また、`<br>`と`@now`の間に改行を挟んでください。`{{Body}}`には、「Email Channel」に送付されてきたメールの本文（今回の場合は記事のパーマリンク）が格納されます。指定方法の詳細については前述の記事で詳しくご紹介していますので、ご参照ください。

「Attachment URL」は空白にしてください。最後に「Create Recipe」をクリックし、レシピを作成します。

## まとめ

WordPress のアクションフックの仕組み、および IFTTT の「Email Channel」の仕組みを使用することで、記事の公開の都度、瞬時に各種 SNS に拡散することができるようになりました。今後も、WordPress のカスタマイズについては随時公開していきたいと思います。
