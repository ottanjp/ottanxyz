---
author: ottan
date: 2016-01-19 12:33:41+00:00
draft: false
title: iPhoneにApp Store以外から任意のサードパーティ製アプリケーションをインストールする方法
type: post
url: /iphone-appstore-xcode-install-6827/
categories:
- iPhone
- Mac
tags:
- Development
---

![](/uploads/2016/01/160119-569e262a6656c-1.jpg)






iPhoneやiPadなどのiOSデバイスにアプリケーションをインストールする場合は、Appleが提供するApp Storeを経由してインストールする方法が一般的です。しかし、Apple ID、Mac、Xcodeがあれば、App Store以外の任意のアプリケーションをiOSデバイスにインストールすることが可能です。





## 任意のサードパーティ製のアプリケーションをインストールする





アプリケーションをインストールするためには、事前にApple IDの作成、Xcodeのダウンロードが必要です。また、XcodeはMac向けにしか提供されていないため、Windowsなど他OSでは実行することができませんので、ご注意ください。





### Xcodeのダウンロード





macOS、iOSなどのアプリケーションを開発するためには、MacのXcodeを使用する必要があります。今回、App Store以外から任意のアプリケーションをインストールするために、この開発ツールを使用しますので、事前にダウンロードしておきます。



{{< itunes 497799835 >}}



### Xcodeの事前準備





![](/uploads/2016/01/160119-569e262af047a.png)






Xcodeのダウンロードが完了したら、Xcodeを起動しましょう。Xcodeを起動したら、メニューバーから**「Xcode」→「Preferences...」**を選択します。または、⌘+,でも起動できます。環境設定が起動するため、「Accounts」タブの「+」をクリックして、Apple IDを登録しておきます。





![](/uploads/2016/01/160119-569e262bee161.png)






「Add Apple ID」を選択すると、Apple IDとパスワードを求められるため、入力したら「Sign in」をクリックします。





![](/uploads/2016/01/160119-569e262ce02c5.png)






画面にApple IDが表示されれば登録は完了です。





### GammaThingyのインストール





![](/uploads/2016/01/160119-569e262de5ca6.png)






たとえば、GitHub上には多数のアプリケーションのソースコードが公開されており、今回対象とするアプリケーションもGitHub上でソースコード、およびXcodeのプロジェクトファイルが配布されています。GammaThingyは、今後iOS9.3で実現されるであろう、「Night Mode」を実装するアプリケーションです。以下のリンクから「Download ZIP」でZIPファイルをダウンロードして、解凍しておきます。解凍したら、「GammaThingy.xcodeproj」をダブルクリックします。



https://github.com/thomasfinch/GammaThingy



![](/uploads/2016/01/160119-569e263505343.png)






Xcodeが起動されるため、左ペインから「GammaThingy」を選択します。





![](/uploads/2016/01/160119-569e2635c901d.png)






「General」タブを選択し、「Bundle Identifier」、および「Team」を変更します。「Bundle Identifier」は任意の名称で構いませんので、一意になるように変更します。今回は、「me.thomasfinch.GammaTest**Ottan**」としました。「Team」は先ほど事前に作成したApple IDを選択します。





![](/uploads/2016/01/160119-569e263685dea.png)






「Fix Issue」が表示された場合は、クリックします。





![](/uploads/2016/01/160119-569e2d23f1aa0.png)






「To fix this issue, select a Development Team to use for provisioning:」と表示された場合は、事前に作成したApple IDを選択して「Choose」をクリックします。





![](/uploads/2016/01/160119-569e263945ea5.png)






続いて、アプリケーションをインストールしたいデバイスと、MacをUSBケーブル経由で接続します。この状態で、画面左上のデバイスのプルダウンから接続したデバイスを選択します。または、**「Product」→「Destination」**の「Device」からデバイスを選択します。





![](/uploads/2016/01/160119-569e263ab86bc.png)






「Ready」と表示されていることが確認できたら、三角形のマークをクリックします。これでプロジェクトのビルドが始まり、アプリケーションがデバイスにインストールされます。





![](/uploads/2016/01/160119-569e263f83366-1.png)






はじめてアプリケーションをインストールする場合、プロファイルから開発元（今回の場合は、事前に作成したApple ID）を信頼する必要があります。iOS側で**「一般」→「プロファイル」**から「デベロッパーAPP」をタップします。





![](/uploads/2016/01/160119-569e26409fc7c-1.png)






アプリケーションのインストールに使用したApple IDが表示されるため「"<Apple ID>"を信頼」をタップします。





![](/uploads/2016/01/160119-569e2641d9e3a-1.png)






「信頼」をタップします。





![](/uploads/2016/01/160119-569e2643b2585-1.png)






ホーム画面にアプリケーションがインストールされていることが確認できます。





## まとめ





GitHubなどから任意のアプリケーションをインストールする場合、App StoreのAppleによる審査を通過していないアプリケーションをインストールすることになるため、十分に注意が必要です。実行は自己責任でお願いします。
