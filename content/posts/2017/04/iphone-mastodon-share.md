---
author: ottan
date: 2017-04-26 07:53:22+00:00
draft: false
title: iPhoneの任意のアプリからMastodonにシェアする方法
type: post
slug: iphone-mastodon-share-5702
categories:
- iPhone
tags:
- Tips
---

![](/uploads/2017/04/170426-59004f17ee1e9.jpg)

短文投稿型SNSであるTwitterに代わる分散型SNSであるMastodonが俄かに賑わいを見せています。新しい風潮に、早速アカウント登録した人も多いのではないでしょうか。しかし、Mastodonはまだまだ黎明期の状態にあり、たとえば冒頭のTwitterのように任意のアプリからMastodonにトゥート（Twitterのツイート）を行う事はできません。

そこで、今回はApple社が買収し無償化したWorkflowを用いて、簡単に任意のアプリからURLとタイトルを投稿するための、レシピを作成しましたので、公開したいと思います。

## Workflow for iOSを使用してMastdonにシェアする

まず、Mastodonに外部からアクセスするためには、アクセストークンと呼ばれる認証情報が必要になります。

### Mastodonのアクセストークンを取得する

アクセストークンは以下で公開されているWebサービスを使用する事で簡単に取得する事ができます。

<https://takahashim.github.io/mastodon-access-token/>

注意点としては、「Scopes」（実施できる権限）を「read write」のように「write」権限を必ず付けてください。この権限がないと書き込みに失敗します。なお、アクセストークンの発行の際に、Mastodonへの認証が求められるためアカウントは事前に用意しておいてください。

### Workflowのレシピを取得する

続いて、アクセストークンの取得が完了したら以下のURLにアクセスし、Workflowのレシピを取得してください。

[GET WORKFLOW](https://workflow.is/workflows/508757092fd44397a95232f097bfe40b)

次に、Workflowの「Token」と書かれた項目に前述の手順で取得したアクセストークンを設定します。以上で、準備は完了です。

![](/uploads/2017/04/170426-59004f95a7769.png)

では、実際に作成したWorkflowを使用して、RSSリーダーであるReederから気になる記事をMastodonにシェアしてみましょう。
Reederを起動したら、Mastodonにシェアしたい任意の記事を選択して、共有メニューをタップします。

![](/uploads/2017/04/170426-59004fa6d6644.png)

共有メニューから、「Run Workflow」をタップします。共有メニューに該当メニューが存在しない場合は、メニューを左にスワイプし、該当メニューを表示させてください。このメニューはWorkflowがインストールされている状態でないと表示されません。

![](/uploads/2017/04/170426-59004fbfd501b.png)

![](/uploads/2017/04/170426-59004fc6e17a7.png)

Workflowが起動するので、起動させるレシピをタップします。正常に完了するとそのまま終了します。うまく動作しない場合はコメント欄やご意見ボードで教えていただけると助かります。

![](/uploads/2017/04/170426-59004fdf27848.png)

成功すると下図のようにMastodonのホームに投稿が表示されます。なお、TwitterのようにOGPには対応していないため、アイキャッチ画像等は表示されません。

![](/uploads/2017/04/170426-59005000c8c1d.png)
