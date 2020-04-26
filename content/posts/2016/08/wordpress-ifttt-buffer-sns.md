---
author: ottan
date: 2016-08-29 03:23:42+00:00
draft: false
title: WordPressに投稿したらIFTTTとBufferを使用して自動的にTwitter、Facebookページ、Google+に投稿する方法
type: post
slug: wordpress-ifttt-buffer-sns-4845
categories:
- Web
- Blog
tags:
- Development
- IFTTT
---

![](/uploads/2016/08/160829-57c3a37769de1.jpg)

WordPressに投稿したら自動的にSNSに連携するプラグインは数多くありますが、WordPressの負荷を考慮するならば、できる限り使用するプラグインは減らしたいものです。とはいえ、ブログ投稿の都度、SNSに手動で連携するのも幾分面倒です。自動投稿は機械的な投稿になりがちで人間味がないとよく言われますが、それでも投稿しないよりは効果はあります。

そこで、今回はWordPressのプラグインを使用せずに、WordPressに投稿したら自動的にSNSに投稿する方法をご紹介します。Webサービス連携の老舗、IFTTTを使用しますが、記事執筆時点では**IFTTTはGoogle+と連携できません**。とはいえ、Google+だけ個別に手動で投稿するのでは自動化する意味がありません。そこで、Google+を含む、Twitter、Facebookページにまとめて投稿できるBufferと呼ばれるWebサービスを使用します。

しかし、**Bufferは予約投稿でありIFTTTではキューに溜めることしかできないのでは？**という疑問が残ります。その通りです。IFTTTとBufferを連携したとしても、Bufferのキューに溜めることしかできません。そこで、今回はそれを迂回しながらBufferを使用し、Bufferのスケジュールに頼らず即時投稿する方法をご紹介します。

なぜ、Bufferのスケジュール管理に頼らないのかというと、WordPress自身に「予約投稿」という仕組みが用意されているからです。あえてBufferのスケジュール経由で時間帯を狙い撃ちで投稿する必要がありません。（ある程度、SNSによってピークの時間帯に偏りがあるのですが）

## IFTTTでブログ投稿を自動的にSNSに拡散する

では、具体的にIFTTTを使用してWordPressに投稿した記事を、時自動的にSNSに投稿する手順を見ていきます。今回は、WordPressに特化しましたが、IFTTTの「RSS」チャンネルを使用することで、「RSS」配信に対応しているすべてのブログで使用できますよ。

### レンタルサーバで使用するWordPressの注意点

今回、IFTTTからWordPressに接続しますが、レンタルサーバによってはセキュリティ向上のために、IFTTTのように海外のIPアドレスからのアクセスを拒否する設定が行われている場合があります。このような場合、IFTTTとWordPressを連携できません。そのため、セキュリティは低下しますが、あらかじめ設定を解除する必要があります。

![](/uploads/2016/08/160829-57c3a37fc2846.png)

XSERVERの場合、サーバーパネルにログイン後、「ホームページ」→「WordPressセキュリティ設定」にアクセスします。

![](/uploads/2016/08/160829-57c3a38477178.png)

「XML-RPC APIアクセス制限」を「OFF」にします。「ダッシュボードアクセス制限」は「ON」のままで構いません。余計な項目をオフにしてセキュリティを低下させないように注意しましょう。

### Bufferの投稿用メールアドレスを確認する

Bufferは、Webサイトから直接投稿する方法、ブラウザの拡張機能を使用する方法の他に、**一意に割り当てられたメールアドレス宛に投稿する方法**の３種類があります。今回は、この３つ目のメールアドレスの方法を使用します。

![](/uploads/2016/08/160829-57c3a389283fb.png)

まず、[Buffer](https://buffer.com/)にアクセスし、投稿したいソーシャルネットワークのアカウントがアクティブであることを確認します。私の場合、Twitter、Google+、Facebookがアクティブになっています。

![](/uploads/2016/08/160829-57c3a38e268ef.png)

続いて、ダッシュボードの右上の「My Account」をクリックします。

![](/uploads/2016/08/160829-57c3a394b9cad.png)

「Email Settings」をクリックします。

![](/uploads/2016/08/160829-57c3a3995e416.png)

「Buffer by Email」が「Yep」（オン）になっていることを確認します。次に、「secret email address」をクリックします。

![](/uploads/2016/08/160829-57c3a7c50e501.png)

「Email to Buffer」に、Bufferに投稿するための専用のメールアドレスが表示されます。このメールアドレス宛にブログの内容を投稿することで、Bufferに自動投稿できるわけです。また、送信元はBufferに登録済みのメールアドレスである必要はありません。

### IFTTTでWordPressとGmailを連携する

以上で、準備は整いました。BufferへはEmail経由で投稿する必要があるため、IFTTTではBufferチャンネルに「Connect」するのではなく、「Gmail」チャンネルに「Connect」します。

![](/uploads/2016/08/160829-57c3a3a335835.png)

IFTTTにログインした状態で、[Connect WordPress to hundreds of apps - IFTTT](https://ifttt.com/wordpress)にアクセします。「Connect」をクリックします。

![](/uploads/2016/08/160829-57c3a3a97adea.png)

ブログのURL、ダッシュボードにログインするための「Username」「Password」を入力します。ここで、前述の海外IPアドレスからのアクセス制限が行われている場合、レンタルサーバによっては正しく接続できません。

![](/uploads/2016/08/160829-57c3a3b05f0f7.png)

続いて、[Connect Gmail to hundreds of apps - IFTTT](https://ifttt.com/gmail)にアクセスします。「Connect」をクリックします。

![](/uploads/2016/08/160829-57c3a3b5d387b.png)

続いて、[Create Recipe - IFTTT](https://ifttt.com/myrecipes/personal/new)にアクセスし、レシピを作成します。「this」をクリックします。

![](/uploads/2016/08/160829-57c3a3bd6ad1b.png)

「Trigger Channel」から「WordPress」を選択します。

![](/uploads/2016/08/160829-57c3a3c75983c.png)

「Choose a Trigger」から「Any new post」をクリックします。すべての投稿が対象となります。

![](/uploads/2016/08/160829-57c3a3cd590bd.png)

「Create Trigger」をクリックします。

![](/uploads/2016/08/160829-57c3a3d2e726b.png)

続いて、「that」をクリックします。

![](/uploads/2016/08/160829-57c3a3d961a05.png)

「Action Channel」から「Gmail」を選択します。

![](/uploads/2016/08/160829-57c3a3dee3483.png)

「Choose an Action」から「Send an email」をクリックします。送信元は、登録したGmailのメールアドレスになります。

![](/uploads/2016/08/160829-57c3a3e4d4691.png)

各項目に以下のように入力します。

| 項目       | 内容                      |
| ---------- | ------------------------- |
| To address | 〜@to.bufferapp.com       |
| Subject    | ブログ更新：{{PostTitle}} |
| Body       | {{PostUrl}}><br>**@now**  |

「Subject」の「ブログ更新」は任意の文字に変更してください
。投稿される記事のタイトルになります。また、「Body」の**「@now」**は、Bufferで即時にシェアする、という意味です。詳細は、[How to Email to Buffer - Buffer](https://buffer.com/guides/email)をご確認ください。必ず、`<br>`を挟んでください。

![](/uploads/2016/08/160829-57c3a3ea34835.png)

以上で、レシピの作成は完了です。あとは、ブログを投稿するだけです！

## まとめ

今回は、WordPressに特化しましたが、IFTTTの「Trigger」を「RSS」とすることで、「RSS」配信に対応したブログであれば、同様の手法が使用できます。もちろん、IFTTTなどで投稿から最大15分程度のラグが生じることはご了承ください。
