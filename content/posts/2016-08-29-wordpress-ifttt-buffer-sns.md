---
author: ottan
date: 2016-08-29 03:23:42+00:00
draft: false
title: WordPressに投稿したらIFTTTとBufferを使用して自動的にTwitter、Facebookページ、Google+に投稿する方法
type: post
url: /wordpress-ifttt-buffer-sns-4845/
categories:
  - Blog
tags:
  - Development
  - IFTTT
  - WordPress
---

![](/images/2016/08/160829-57c3a37769de1.jpg)

WordPress に投稿したら自動的に SNS（Twitter、Facebook ページ、Google+）に連携するプラグインは数多くありますが、WordPress の負荷を考慮するならば、できる限り使用するプラグインは減らしたいものです。とはいえ、ブログ投稿のたびに SNS に手動で連携するのも幾分面倒です。自動投稿は機械的な投稿になりがちで人間味がないとよく言われますが、それでも投稿しないよりは効果はあります。

そこで、今回は WordPress のプラグインを使用せずに、WordPress に投稿したら自動的に SNS に投稿する方法をご紹介します。Web サービス連携の老舗、IFTTT を使用しますが、記事執筆時点では**IFTTT は Google+と連携できません**。とはいえ、Google+だけ個別に手動で投稿するのでは自動化する意味がありません。そこで、Google+を含む、Twitter、Facebook ページにまとめて投稿できる Buffer と呼ばれる Web サービスを使用します。

しかし、**Buffer は予約投稿であり IFTTT ではキューに溜めることしかできないのでは？**という疑問が残ります。その通りです。IFTTT と Buffer を連携したとしても、Buffer のキューに溜めることしかできません。そこで、今回はそれを迂回しながら Buffer を使用し、Buffer のスケジュールに頼らず即時投稿する方法をご紹介します。

なぜ、Buffer のスケジュール管理に頼らないのかというと、WordPress 自身に「予約投稿」という仕組みが用意されており、あえて Buffer のスケジュール経由で時間帯を狙い撃ちで投稿する必要がないからです。（ある程度、SNS によってピークの時間帯に偏りがあるのですが）

## IFTTT でブログ投稿を自動的に SNS に拡散する

では、具体的に IFTTT を使用して WordPress に投稿した記事を、時自動的に SNS に投稿する手順を見ていきます。今回は、WordPress に特化しましたが、IFTTT の「RSS」チャンネルを使用することで、「RSS」配信に対応しているすべてのブログで使用できますよ。

### レンタルサーバで使用する WordPress の注意点

今回、IFTTT から WordPress に接続しますが、レンタルサーバによってはセキュリティ向上のために、IFTTT のように海外の IP アドレスからのアクセスを拒否する設定が行われている場合があります。このような場合、IFTTT と WordPress を連携することができません。そのため、セキュリティは低下しますが、あらかじめ設定を解除する必要があります。

![](/images/2016/08/160829-57c3a37fc2846.png)

XSERVER の場合、サーバーパネルにログイン後、「ホームページ」→「WordPress セキュリティ設定」にアクセスします。

![](/images/2016/08/160829-57c3a38477178.png)

「XML-RPC API アクセス制限」を「OFF」にします。「ダッシュボードアクセス制限」は「ON」のままで構いません。余計な項目をオフにしてセキュリティを低下させないように注意しましょう。

### Buffer の投稿用メールアドレスを確認する

Buffer は、Web サイトから直接投稿する方法、ブラウザの拡張機能を使用する方法の他に、**一意に割り当てられたメールアドレス宛に投稿する方法**の３種類があります。今回は、この３つ目のメールアドレスの方法を使用します。

![](/images/2016/08/160829-57c3a389283fb.png)

まず、[Buffer](https://buffer.com/)にアクセスし、投稿したいソーシャルネットワークのアカウントがアクティブであることを確認します。私の場合、Twitter、Google+、Facebook がアクティブになっています。

![](/images/2016/08/160829-57c3a38e268ef.png)

続いて、ダッシュボードの右上の「My Account」をクリックします。

![](/images/2016/08/160829-57c3a394b9cad.png)

「Email Settings」をクリックします。

![](/images/2016/08/160829-57c3a3995e416.png)

「Buffer by Email」が「Yep」（オン）になっていることを確認します。次に、「secret email address」をクリックします。

![](/images/2016/08/160829-57c3a7c50e501.png)

「Email to Buffer」に、Buffer に投稿するための専用のメールアドレスが表示されます。このメールアドレス宛にブログの内容を投稿することで、Buffer に自動投稿できるわけです。また、送信元は Buffer に登録済みのメールアドレスである必要はありません。

### IFTTT で WordPress と Gmail を連携する

以上で、準備は整いました。Buffer へは Email 経由で投稿する必要があるため、IFTTT では Buffer チャンネルに「Connect」するのではなく、「Gmail」チャンネルに「Connect」します。

![](/images/2016/08/160829-57c3a3a335835.png)

IFTTT にログインした状態で、[Connect WordPress to hundreds of apps - IFTTT](https://ifttt.com/wordpress)にアクセします。「Connect」をクリックします。

![](/images/2016/08/160829-57c3a3a97adea.png)

ブログの URL、ダッシュボードにログインするための「Username」「Password」を入力します。ここで、前述の海外 IP アドレスからのアクセス制限が行われている場合、レンタルサーバによっては正しく接続できません。

![](/images/2016/08/160829-57c3a3b05f0f7.png)

続いて、[Connect Gmail to hundreds of apps - IFTTT](https://ifttt.com/gmail)にアクセスします。「Connect」をクリックします。

![](/images/2016/08/160829-57c3a3b5d387b.png)

続いて、[Create Recipe - IFTTT](https://ifttt.com/myrecipes/personal/new)にアクセスし、レシピを作成します。「this」をクリックします。

![](/images/2016/08/160829-57c3a3bd6ad1b.png)

「Trigger Channel」から「WordPress」を選択します。

![](/images/2016/08/160829-57c3a3c75983c.png)

「Choose a Trigger」から「Any new post」をクリックします。すべての投稿が対象となります。

![](/images/2016/08/160829-57c3a3cd590bd.png)

「Create Trigger」をクリックします。

![](/images/2016/08/160829-57c3a3d2e726b.png)

続いて、「that」をクリックします。

![](/images/2016/08/160829-57c3a3d961a05.png)

「Action Channel」から「Gmail」を選択します。

![](/images/2016/08/160829-57c3a3dee3483.png)

「Choose an Action」から「Send an email」をクリックします。送信元は、登録した Gmail のメールアドレスになります。

![](/images/2016/08/160829-57c3a3e4d4691.png)

各項目に以下のように入力します。

| 項目       | 内容                      |
| ---------- | ------------------------- |
| To address | 〜@to.bufferapp.com       |
| Subject    | ブログ更新：{{PostTitle}} |
| Body       | {{PostUrl}}&lt;br&gt;@now |

「Subject」の「ブログ更新」は任意の文字に変更してください
。投稿される記事のタイトルになります。また、「Body」の**「@now」**は、Buffer で即時にシェアする、という意味です。詳細は、[How to Email to Buffer - Buffer](https://buffer.com/guides/email)をご確認ください。必ず、`<br>`を挟んでください。

![](/images/2016/08/160829-57c3a3ea34835.png)

以上で、レシピの作成は完了です。あとは、ブログを投稿するだけです！

## まとめ

今回は、WordPress に特化しましたが、IFTTT の「Trigger」を「RSS」とすることで、「RSS」配信に対応したブログ（対応していないブログなどないと思いますが）であれば、同様の手法が使用できます。もちろん、IFTTT などで投稿から最大 15 分程度のラグが生じることはご了承ください。
