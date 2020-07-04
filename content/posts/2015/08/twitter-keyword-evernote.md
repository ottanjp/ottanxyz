---
author: ["@ottanxyz"]
date: 2015-08-23 12:47:25+00:00
draft: false
title: Twitterから気になるキーワードを含むツイートをEvernoteに収集する方法
type: post
slug: twitter-keyword-evernote-2200
categories:
  - Web
tags:
  - IFTTT
  - Tips
---

![](/uploads/2015/08/150823-55d9bb96b430b.jpg)

Twitter は、もはや情報収集ツールとしては欠かせないものになっていますが、Twitter から気になるキーワードを常にチェックしておくのは大変です。そこで、キーワードを自動収集し、Evernote に自動的に保存する IFTTT のレシピをご紹介します。

## Twitter のキーワードを自動収集する

まず、以下のリンクにアクセスします。

https://twitter.com/search-advanced?lang=ja

収集したいキーワードを入力します。たとえば、「iPhone」に関連する情報を収集したい場合は、「これらのすべての単語」に「iPhone」と入力します。「iPad」の情報も収集したい場合は、「これらの単語のどれか」に「iPhone iPad」と半角スペースを空けて入力します。入力し終えたら、「検索」ボタンをクリックします。

![](/uploads/2015/08/150823-55d9bb97c1222.png)

次に、以下のリンクにアクセスします。

http://page2rss.com/

「Page2RSS」は、RSS に対応していないページを RSS へ変換してくれるサービスです。「Page URL」に先ほど検索したページの URL を入力します。

![](/uploads/2015/08/150823-55d9c0e162355.png)

画面右側にフィードの URL が表示されます。「RSS」のリンクをコピーしておきましょう。

![](/uploads/2015/08/150823-55d9bb9a6da53.png)

### IFTTT でレシピを作成する

ここからは[Connect the apps you love - IFTTT](https://ifttt.com/)でレシピを作成します。IFTTT については、[iPhone で Gmail を公式アプリを使わずにプッシュ通知で受け取る方法](/posts/2014/09/iphone-gmail-push-490/)でも詳しくご紹介していますので、そちらも参照してください。

トリガーとして、「Feed」を選択します。

![](/uploads/2015/08/150823-55d9bb9bd5e57.png)

「Choose a Trigger」から「New feed item」を選択します。

![](/uploads/2015/08/150823-55d9bb9e68c68.png)

「Feed URL」に先ほど「Page2RSS」で生成した RSS フィードの URL を入力します。

![](/uploads/2015/08/150823-55d9bba0d7dd9.png)

次にアクションとして「Evernote」を選択します。

![](/uploads/2015/08/150823-55d9bba2c9f4a.png)

「Chose a Action」から「Create a note」を選択します。

![](/uploads/2015/08/150823-55d9bba5413ef.png)

必要に応じて内容を修正します。

![](/uploads/2015/08/150823-55d9bba7d5724.png)

「Notebook」の名前は、デフォルトで「IFTTT Feed」となっていますが、必要であれば修正してください。最後に、「Create Action」をクリックします。

![](/uploads/2015/08/150823-55d9bba9e41a0.png)

最後に、「Create a Recipe」ボタンをクリックすれば完了です。

![](/uploads/2015/08/150823-55d9bbac168a4.png)

## まとめ

Twitter は、情報収集ツールとして欠かせないものです。Twitter から最新情報が手に入ることも珍しくありません。気になるキーワードがあれば、ぜひこのレシピを有効活用してくださいね。
