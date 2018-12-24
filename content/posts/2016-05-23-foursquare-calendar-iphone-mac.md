---
author: ottan
date: 2016-05-23 12:27:44+00:00
draft: false
title: Foursquareのチェックイン履歴をiCloudのカレンダーに簡単に追加する方法
type: post
url: /foursquare-calendar-iphone-mac-4334/
categories:
- iPhone
- Mac
tags:
- Tips
---

![](/images/2016/05/160523-5742efd302b60.jpg)






旅先や日常生活での思い出を残すために、Foursquareを使用してチェックイン履歴を残しています。iPhoneやMacのカレンダーでFoursquareのチェックイン履歴を参照できたらいいなあ、と昔思い立ち[IFTTT - Connect The Apps You Love](https://ifttt.com/)で、「FoursquareにチェックインしたらGoogleカレンダーに書き込む」というレシピを作ったのですが、実際のチェックイン履歴とGoogleカレンダーに書き込まれる日付がずれたり、とイマイチ使い勝手がよくなかったのです。





その昔は、Googleカレンダーにすべての予定を集約していたのですが、iPhoneやMacを購入してからは、カレンダーの予定はすべてiCloudに集約しているようにしています。そこで、GoogleカレンダーからiCloudカレンダーに乗り換えようと思ったのですが、Foursquareのチェックイン履歴も簡単にiCloudカレンダーに追加できることがわかったので共有します。ただし、**iCloudカレンダーに追加するにはmacOSのカレンダー.appが必要**です。というわけで、Macで作業してください。





## iCloudのカレンダーにFoursquareのチェックイン履歴を追加する





はじめに、Foursquareのチェックイン履歴は、iCalendar（.ics）の形式で配布されています。このURLは個々人によって異なります。また、Foursquareにアクセスするとわかるのですが、「この機能のサポートは終了しています」と表示されます。それでもまだ使えるようです。というわけで、それでもよければお使いください。





ちなみに、ややこしい上に比較的どうでも良い話なのですが、iCalendarはカレンダーのフォーマットのことで、Macで使用されていた「iCal」というカレンダーアプリケーションのことではありません。



https://ja.foursquare.com/



iCalendar形式のURLを取得するには、上記のリンクからFoursquareにアクセスし、ログインします。





![](/images/2016/05/160523-5742f37cceca0.png)






続いて、右上のアカウントをクリックして、「履歴」をクリックします。





![](/images/2016/05/160523-5742f3868d25a.png)






右下に「RSS / ICS / KML」と表示されているため、クリックします。





![](/images/2016/05/160523-5742f3afc7613.png)






「ICS」の隣のリンクをコピーしておきます。





![](/images/2016/05/160523-5742f3b5a20b1.png)






次に、Macで「カレンダー.app」を起動したら、メニューから「ファイル」→「新規照会カレンダー」をクリックします。





![](/images/2016/05/160523-5742f3bb35a9f.png)






照会したいカレンダーのURLに、先ほどコピーしたリンクを貼り付けます。貼り付けたら「照会」をクリックします。





![](/images/2016/05/160523-5742f3c262d9a.png)






カレンダーの名前が、デフォルトでは「foursquare check-ins for <アカウント名>」となっていますので、必要に応じて修正してください。そして、**「場所」を「iCloud」に変更します**。「自動更新」は適宜変更してください。この作業がMacでしかできません。iCloud.comでもできません。iPhoneでもできません。





これで、すべてのiOS、macOSデバイスでiCloud上から「Foursquare」のカレンダーを参照することができるようになります。



{{< itunes 306934924 >}}

{{< itunes 870161082 >}}
