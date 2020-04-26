---
author: ottan
date: 2017-03-04 04:12:08+00:00
draft: false
title: Macの内蔵iSightカメラが勝手に使用されていることを検知し防止できる「OverSight」
type: post
url: /mac-isight-camera-oversight-5560/
categories:
- Mac
tags:
- Apps
- Security
---

![](/uploads/2017/03/170304-58ba3b1937ed1.jpg)






以前、[Macの内蔵カメラで盗撮可能な問題、セキュリティ研究者が報告 - ITmedia エンタープライズ](http://www.itmedia.co.jp/enterprise/articles/1610/07/news125.html)にあるように、MacBookなどに内蔵されているカメラ（iSightカメラ）が盗撮される問題が報告されています。iSightカメラは、FaceTimeやSkypeなどで幅広く利用されており、日常的に使用している方も多いはずです。





iSightカメラ起動中は、Macに内蔵されているLEDライトが緑色に点灯するためカメラが使用されていることに気づくことはできるのですが、常に小さなLEDライトに目を向けるわけにもいきません。また、普段iSightカメラを利用していないからこそ、不正にiSightカメラが利用されていることに気づかないことも多いはずです。





今回は、そのようなユーザのために開発された、iSightカメラの不正利用を防止するためのMacのソフトウェア「OverSight」をご紹介します。アプリをダウンロードして起動しておくだけで使用できる便利なソフトウェアです。





## Mac内蔵のiSightカメラの起動を検知する「OverSight」





「OverSight」は、Macに標準で内蔵されているiSightカメラの起動を検知するためのアプリです。





### 「OverSight」のダウンロード





「OverSight」はMac App Storeでは配布されておらず、開発者のWebページからダウンロードすることになります。



https://objective-see.com/products/oversight.html



上記リンク先の緑色の傘のアイコンをクリックしてダウンロードします。





![](/uploads/2017/03/170304-58ba3b3946ac0.png)






### 「OverSight」の起動





インストール方法は簡単です。ダウンロードしたzipファイルを解凍して、インストーラーを起動しましょう。なお、インストールのためには管理者権限が必要です。管理者グループに属するユーザでインストールしましょう。インストール時にログインしているユーザのパスワードを求められるため入力します。





![](/uploads/2017/03/170304-58ba3b2b45a6f.png)






「OverSight」はメニューバーに常駐するアプリケーションです。停止、起動はメニューバーから行います。「OverSight」を起動したい場合は、メニューバーから「Preferences」を選択します。





![](/uploads/2017/03/170304-58ba3b30214a3.png)






「Start!」をクリックしましょう。





### 「OverSight」によるiSightカメラの起動の検知





では、「OverSight」を起動した状態で「FaceTime」を起動してみましょう。





![](/uploads/2017/03/170304-58ba3b40b3d3b.png)






「OverSight」が起動している状態で、「FaceTime」が起動すると、macOSの通知の機能によりこのような画面が右上に表示されます。また、iSightカメラが起動されるためLEDライトが点灯することを覚えておきましょう。もし、このiSightカメラの使用が不正なものであった場合には「block」をクリックします。





![](/uploads/2017/03/170304-58ba3b463ac07.png)






すると、FaceTimeが終了し、このように「Video Device became inactive」と表示され、iSightカメラの使用が防止されました。また、同様にMacに内蔵されているマイクの使用を検知することもできます。





## まとめ





「OverSight」は、macOSの脆弱性等をついてiSightカメラや内蔵マイクの使用を未然に防止するためのアプリケーションです。日常的にiSightカメラや内蔵マイクを使用している、とくに自宅ではなく外出先や仕事で多用しているという場合には、ぜひダウンロードしてみてはいかがでしょうか。
