---
author: ["@ottanxyz"]
date: 2016-05-22 12:28:46+00:00
draft: false
title: MacでAndroidの環境を簡単に再現する方法
type: post
slug: mac-android-chrome-4323
categories:
- Android
- Mac
tags:
- Development
---

![](/uploads/2016/05/160522-5741a5e8e420c.jpg)






検証用にGoogle Nexus 5を保持しているのですが、ある日、何となく弊サイトをNexus 5のChromeから表示してみたら、レイアウトが崩れまくっているページが…！これは、と思い試行錯誤するもなかなか改善せず。もしや、他のデバイスでも？！と疑いだしたらきりがなかったのですが、これを機にmacOSにAndroidのエミュレート環境を用意することにしました。





## MacでAndroidの環境を簡単に再現する





Androidにもさまざまなエミュレーターが存在しますが、いくつか試してみて気軽に環境を再現できたのが、[Genymotion – Fast And Easy Android Emulation](https://www.genymotion.com/)でした。そこで、今回は「Genymotion」を使用して、MacでAndroidの環境を構築する方法をご紹介します。





### Oracle VirtualBoxのインストール





「Genymotion」の前提条件として、「Oracle VirtualBox」が必要です。下記のリンクから最新バージョンをダウンロードしてインストールしておきましょう。



https://www.virtualbox.org/



### Genymotionのインストール





Genymotionをダウンロードするためには、事前にアカウント登録が必要です。以下のリンクからアカウント登録を行っておきましょう。また、Genymotionは、個人使用に限り無償で使用できますが、商用で使用する場合には有償となりますので注意してください。



https://www.genymotion.com/account/create/



アカウントを作成したら、以下のリンクからGenymotionをダウンロードします。



https://www.genymotion.com/download/



### Google Nexus 5の環境を再現





ダウンロードした「Genymotion.app」を起動します。





![](/uploads/2016/05/160522-5741a3c999b0d.png)






「Accept」をクリックします。





![](/uploads/2016/05/160522-5741a3d043c5e.png)






「Yes」をクリックします。





![](/uploads/2016/05/160522-5741a3eb0f5df.png)






「Sign in」をクリックします。





![](/uploads/2016/05/160522-5741a3f9042db.png)






事前に登録したGenymotionのアカウントでサインインします。





![](/uploads/2016/05/160522-5741a4020ab84.png)






今回は、「Google Nexus 5」を選択しました。その他にもさまざまなデバイスを選択できます。検証したいデバイスを選択すると良いと思います。選択したら「Next」をクリックします。





![](/uploads/2016/05/160522-5741a40e66a26.png)






仮想マシンの名前はとくに変更する必要はないでしょう。「Next」をクリックします。





![](/uploads/2016/05/160522-5741a419b121d.png)






仮想マシンのイメージのダウンロードが始まります。





![](/uploads/2016/05/160522-5741a423c2020.png)






インストールが完了したら「Finish」をクリックします。





![](/uploads/2016/05/160522-5741a4320af2e.png)






インストールされているデバイスを選択して、「Start」をクリックします。





![](/uploads/2016/05/160522-5741a43cf03ad.png)






仮想マシンが起動し、デバイスの状態が再現されます。ただし、この状態を見ていただければわかるように、Nexus 5の標準ブラウザはChromeですが、GenymotionではAndroidブラウザが標準になっている上、Chromeはインストールされていません。もう少し工夫が必要かもしれませんね。
