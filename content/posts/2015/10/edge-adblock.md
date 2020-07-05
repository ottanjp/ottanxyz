---
author: ["@ottanxyz"]
date: 2015-10-07T00:00:00+00:00
draft: false
title: Microsoft Edgeで広告を非表示にする方法
type: post
slug: edge-adblock-6808
categories:
- Windows
tags:
- Tips
---

![](/uploads/2015/10/151007-56151e8f167f9.jpg)






Windows 10とともにリリースされた、Microsoft Edgeブラウザ。Google ChromeやSafariのように自由に拡張機能が使用できるわけではないので、できることは限られているわけですが、広告非表示の機能くらいは欲しいと思っていました。今回は、**あくまで非公式な方法**ですが、その方法がわかったのでご紹介したいと思います。





何もしないまま弊サイトのトップページを開くと、Google Adsenseの広告が表示されていることがわかります。





![](/uploads/2015/10/151007-56151e9178a67.png)






## Microsoft Edgeで広告を非表示にする方法





では、具体的にMicrosoft Edgeで広告を非表示にする方法をご紹介します。まずは、以下のリンクにアクセスし、「hosts.zip」ファイルをダウンロードします。



http://www.mediafire.com/download/gcaoo6csbq7yt77/hosts.zip



緑色の「DOWNLOAD」ボタンをクリックします。





![](/uploads/2015/10/151007-56151e95413d9.png)






ダウンロードした「hosts.zip」ファイルを任意のディレクトリに展開し、管理者権限で「myps.bat」を実行します。同ファイルを右クリックして、「管理者として実行」をクリックします。





![](/uploads/2015/10/151007-56151e97c033b.png)






青いコマンドプロンプトの画面が表示されるので、↵キーを押します。





![](/uploads/2015/10/151007-56151e9a2954d.png)






続いて、レジストリエディターを開きます。Windowsキー＋Rキーを押して「ファイル名を指定して実行」画面を開き、「regedit」と入力し、↵キーを押します。





![](/uploads/2015/10/151007-56151e9b354c0.png)






レジストリエディターを開いたら、以下のキーにアクセスします。アクセスしたら、「編集」→「新規」→「QWORD値」を選択します。




    
    HKEY_LOCAL_MACHINE¥SYSTEM¥CurrentControlSet¥Services¥Dnscache¥Parameters





![](/uploads/2015/10/151007-5615247c27685.png)






作成した値の名前を「MaxCacheTtl」に変更し、値を「1」に変更します。レジストリエディターを終了し、コンピューターを再起動します。





![](/uploads/2015/10/151007-5615247e0a5c6.png)






もう一度、弊サイトのトップページを開いてみると、「Google Adsense」の広告が消えていることがわかります。





![](/uploads/2015/10/151007-56151ea11da25.png)






## まとめ





冒頭でも述べたように**あくまで非公式な方法**ですので、実行は自己責任でお願いします。また、すべての広告がブロックできるわけではありませんのでご注意を。





via：[Adblock for Microsoft Edge using very easy way - YouTube](https://www.youtube.com/watch?v=wQFOKj19rKo)
