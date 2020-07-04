---
author: ["@ottanxyz"]
date: 2015-08-08 12:43:30+00:00
draft: false
title: Gmailを一工夫！EvernoteベーシックプランでEvernoteメール転送機能の制限を回避する方法
type: post
slug: evernote-basic-email-transfer-1963
categories:
  - Web
tags:
  - IFTTT
  - Tips
---

![](/uploads/2015/08/150808-55c5f9900a98e.png)

Evernote にはメール転送機能と呼ばれる、Evernote 専用のメールアドレスにメールを送信すると、その内容をノートブックに保存してくれる便利な機能がありました。これまでは無料プランでも、メール転送機能を利用することができましたが、先日のプランの方針転換により、無料アカウントでは使用できなくなりました。使用するためには、ベーシックプラン（年間 ¥2,000）への加入が必須です。

しかし、あるサービスを利用すると、ベーシックプランでもこの制約を解除して思う存分メール転送機能を利用することができるようになります。もちろん、同等とはいきませんが、かなり便利になるのでぜひお試しください。

## IFTTT を使用して Gmail を Evernote に保存する

IFTTT については、[iPhone で Gmail を公式アプリを使わずにプッシュ通知で受け取る方法](/posts/2014/09/iphone-gmail-push-490/)でご紹介していますので、詳細はこちらをご覧ください。

IFTTT と聞いて、ピンときた方もいらっしゃるかもしれません。理屈はとても簡単です。**「Evernote」というラベルの付いた Gmail を Evernote に保存する**、たったこれだけです。

そのためには、ある程度の下準備が必要です。

### IFTTT で Evernote チャンネルをアクティベートする

IFTTT で Evernote を使用するためには、IFTTT と Evernote を連携する必要があります。まだアクティベートされていない方は事前にアクティベートしておきましょう。Evernote のアクティベートは、[Evernote connects with the apps you love - IFTTT](https://ifttt.com/evernote)から行います。

![](/uploads/2015/08/150808-55c5f976af8e6.png)

### IFTTT で Gmail チャンネルをアクティベートする

IFTTT で Gmail を使用するためには、IFTTT と Gmail を連携する必要があります。まだアクティベートされていない方は事前にアクティベートしておきましょう。Gmail のアクティベートは、[Connect Gmail to hundreds of apps - IFTTT](https://ifttt.com/gmail)から行います。

![](/uploads/2015/08/150808-55c5f97e10282.png)

### IFTTT でレシピを作成する

IFTTT には、昼夜を問わず多数のレシピが作成され、公開され続けています。同じような事を考えている方はたくさんいらっしゃるようで、今回も先人の知恵をお借りしたいと思います。下記のレシピは、[How to Save Emails into Evernote with IFTTT](http://www.labnol.org/internet/evernote-email-notes/28961/)で紹介されていたものです。

https://ifttt.com/recipes/311534-label-email-in-your-gmail-inbox-to-archive-it-in-a-notebook

上記のリンクにアクセスしたら、「Apply this label to email」に**「Evernote」**と入力して、「Add」ボタンをクリックします。

![](/uploads/2015/08/150808-55c5f98087cb1.png)

さて、ここまでで準備は完了です。Gmail でラベルに「Evernote」と付与されたメールは自動的に Evernote に保存されるようになりました。ただし、これではまだ使い勝手がよくありません。Evernote 専用メールアドレスのように、Gmail 専用アドレスを作っていきましょう。既存のアカウントを利活用できますので、新たにアカウントを作る必要はありませんよ。

## Gmail のフィルターを利用して「Evernote」ラベルをつける

Gmail は、**実質、無制限にメールアドレスを作成できる**事をご存知でしょうか？「◯◯◯◯@gmail.com」が通常のメールアドレスとすると、「◯◯◯◯+hogehoge@gmail.com」宛に送信されたメールも「◯◯◯◯@gmail.com」宛に送信されます。**「+」以降に付与された文字列は無視される**のです。

Gmail のこの性質を利用して、Evernote 専用のメールアドレスを作成します。作成、と言っても、そのメールアドレス宛に送信するだけなので、改めてアカウントの設定の必要があるわけではありません。ここでは**「◯◯◯◯+evernote@gmail.com」**を Evernote 専用メールアドレスとします。

### Evernote 専用メールアドレスに送信されたメールに「Evernote」というラベルを付ける

まずは、Gmail にアクセスします。

https://mail.google.com/

「設定」アイコンをクリックし、「設定」メニューをクリックします。

![](/uploads/2015/08/150808-55c5f9845e8ba.png)

「設定」メニューの中から「フィルター」をクリックします。

![](/uploads/2015/08/150808-55c5f985ade52.png)

画面最下部の「新しいフィルターを作成」をクリックします。

![](/uploads/2015/08/150808-55c5f98894837.png)

次に、「To」欄に「◯◯◯◯+evernote@gmail.com」（注：◯◯◯◯ は実際のアカウントを入力してください）と入力して、「この検索条件でフィルターを作成」をクリックします。

![](/uploads/2015/08/150808-55c5f98a2eb63.png)

「受信トレイをスキップする(アーカイブする)」「既読にする」「ラベルを付ける：Evernote」をチェックします。ラベルがまだ存在しない場合は、新規作成してください。すべてチェックが完了したら、「フィルターを作成」をクリックします。

![](/uploads/2015/08/150808-55c5f98c888f7.png)

以上で設定は完了です。従来の Evernote 専用のメールアドレスの代わりに、これからは**「◯◯◯◯+evernote@gmail.com」が Evernote 専用のメールアドレス**になります。

## まとめ

Evernote のプラン変更により、無料アカウントではメール転送機能が使用できず困っていた方も多いかもしれませんが、IFTTT を経由することで、多少強引ではありますが、簡単にメール転送機能と同等の機能を手にいれることができます。ぜひお試しあれ。
