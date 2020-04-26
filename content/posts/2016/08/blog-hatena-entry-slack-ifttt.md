---
author: ottan
date: 2016-08-31 12:47:10+00:00
draft: false
title: ブログの記事が「はてな新着エントリー」に掲載されたらSlackに通知する
type: post
url: /blog-hatena-entry-slack-ifttt-4859/
categories:
- Web
- Blog
tags:
- Development
- IFTTT
- Slack
---

![](/uploads/2016/08/160831-57c6ccdf04c70.png)






「はてなブックマーク」は、国内最大のソーシャルブックマークサービスであり、新着エントリー、人気エントリーに掲載された記事については、たちまちSNS上でも拡散され、アクセス数向上に貢献します。投稿したブログの記事が、はてなブックマークに掲載されたかどうか、気にしすぎるのもアレですが、ブログを運営している以上、気になるものですよね。





とはいえ、記事を投稿するたびに、はてなブックマークで新着エントリーに掲載されたかどうかを、その都度確認するのは手間がかかります。そこで、今回は記事が新着エントリーに掲載されたことをSlackに通知する仕組みをIFTTTを使用して作ります。ここでは通知先をSlackとしましたが、連携先はお好みで選んでください。





## 新着エントリーに掲載されたらSlackに通知する





IFTTTを使用しますが、IFTTTにはてなブックマークのチャンネルはありません（海外のサービスなので当然ですね）。そこで、IFTTTとはてなブックマークを連携させるために、はてなブックマークの新着エントリーのRSSを取得します。





### 新着エントリーのRSSのURLを確認する





[はてなブックマーク](http://b.hatena.ne.jp/)にアクセスします。





![](/uploads/2016/08/160831-57c6cce800e63.png)






右上の検索ボックスに、ブログのURLを入力します。たとえば、弊サイトの場合は、以下の通りです。




    
    https://ottan.xyz/





![](/uploads/2016/08/160831-57c6ccec88a7c.png)






「新着順」がアクティブになっていることを確認します。その状態で、ブラウザのアドレスバーに表示されているアドレスをコピーします。弊サイトの場合は、以下の通りです。




    
    http://b.hatena.ne.jp/entrylist?url=http%3A%2F%2Fottan.xyz%2F





### Slackでパブリックチャンネルを作成する





[Slack: Be less busy](https://slack.com/)から、Slackにログインします。





![](/uploads/2016/08/160831-57c6ccf11b89b.png)






「Create new channel」をクリックします（CHANNELSの横の「+」をクリックします）。





![](/uploads/2016/08/160831-57c6ccf5c3471.png)






「public」になっていることを確認し、「Name」を入力します。ここでは「hatena」とします。「private」で作成した場合、IFTTTで連携できませんのでご注意ください。また、「private」で作成したチャンネルはリネームはできますが、削除できませんのでご注意ください。





### IFTTTで新着エントリーをSlackに通知する





[Learn how IFTTT works](https://ifttt.com/)にアクセスし、IFTTTにログインします。[Connect Slack to hundreds of apps - IFTTT](https://ifttt.com/slack)で、Slackチャンネルに「Connect」します。





![](/uploads/2016/08/160831-57c6ccfa9ac43.png)






続いて、[Create Recipe - IFTTT](https://ifttt.com/myrecipes/personal/new)にアクセスし、レシピを作成します。「this」をクリックします。





![](/uploads/2016/08/160831-57c6ccff62a0f.png)






「Choose Trigger Channel」から「Feed」を選択します。





![](/uploads/2016/08/160831-57c6cd043e82a.png)






「Choose a Trigger」から「New feed item」を選択します。





![](/uploads/2016/08/160831-57c6cd099a150.png)






「Feed URL」に、「事前にコピーしたURL＋`&mode;=rss`」を入力します。弊サイトの場合は、以下の通りです。入力したら、「Create Trigger」をクリックします。




    
    http://b.hatena.ne.jp/entrylist?url=http%3A%2F%2Fottan.xyz%2F&mode=rss





![](/uploads/2016/08/160831-57c6cd0f6750d.png)






「that」をクリックします。





![](/uploads/2016/08/160831-57c6cd144a476.png)






「Choose Action Channel」から「Slack」を選択します。





![](/uploads/2016/08/160831-57c6cd1a4c7e7.png)






「Choose an Action」から「Post to channel」を選択します。





![](/uploads/2016/08/160831-57c6cd21c6d4e.png)






「Which channel?」から、事前に作成したチャンネル名（今回の場合は、「hatena」）を選択します。その他は、デフォルトのまま
「Create Action」をクリックします。





## まとめ





以上で、「はてなブックマーク」に新着エントリー入りしたら、自動的にSlackに通知されるようになります。今回の場合は、Slackを通知先に選択しましたが、IFTTTで連携できるサービスであれば、何を使用しても構いません。





なお、新着エントリー入りした際に生成されるRSSの更新頻度、およびIFTTTの更新頻度（最大15分間隔）のタイミングによるため、リアルタイムには通知されません（リアルタイムに通知する必要もないと思いますが）。
