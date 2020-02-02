---
author: ottan
date: 2016-07-07 13:37:59+00:00
draft: false
title: WindowsのInternet ExplorerまたはGoogle Chromeで強制的にメイリオを使用する
type: post
url: /internet-explorer-chrome-meiryo-4591/
categories:
- Windows
tags:
- Google
- Tips
---

![](/images/2016/07/160707-577e55df48ba8.jpg)






Windows Vistaから導入された「メイリオ」、素晴らしいと思います。Windowsに標準で搭載されているフォントの中で、「メイリオ」の美しさにかなうものはないと思うのです。「游ゴシック体」？いや、Windowsなら「メイリオ」でしょう！





ただ、WindowsのInternet ExplorerやGoogle ChromeでWebサイトを閲覧している場合に、Webサイトによっては`font-family`の指定がされていなかったり、好みでもないフォントが指定されていたりすることがあります。弊サイトも、`font-family`の指定は、`sans-serif`だけなので、完全にブラウザ任せです。手抜きではなく、素材の味を活かしているんです。





そんな、弊サイトを含むはた迷惑なWebサイトのフォント指定、もうこうなってしまったら強制的に「メイリオ」に変更すればいいじゃないですか。完全にWebサイトのデザイナー泣かせです。





## ブラウザで表示するフォントを「メイリオ」にする





ここでは、Windowsのブラウザで首位を争う「Internet Explorer」、「Google Chrome」で強制的に「メイリオ」に上書きしてしまう方法をご紹介します。





### Internet Explorerの場合





![](/images/2016/07/160707-577e55e7343f0.png)






何も指定せずに弊サイトをInternet Explorer 11で閲覧した場合です。いまいち文字がかすれているようで見辛いです。Windows 7のInternet Explorerで、`font-family`に`sans-serif`が指定された場合、システムのデフォルトフォントである「メイリオ」ではなく「MS UI Gothic」が適用されているせいです。こうなったら「メイリオ」で上書きしましょう。





![](/images/2016/07/160707-577e55f83dd21.png)






「インターネットオプション」を開き、「全般」タブの「フォント」をクリックします。





![](/images/2016/07/160707-577e55fd98e68.png)






「Webページフォント」を「メイリオ」に変更します。これで、閲覧時のデフォルトのフォント（つまり、フォントが指定されていない場合のデフォルトフォント）が「メイリオ」に変更されました。しかし、他のフォントが指定されている場合は、そちらが優先されてしまいます。これでは「メイリオ」魂が泣きます。





![](/images/2016/07/160707-577e560282b33.png)






再度、「全般」タブに戻って、今度は「ユーザー補助」をクリックします。「Webページで指定されたフォントスタイルを使用しない」をチェックします。これで、`font-family`に指定されたフォントは無効になります。しかし、これでもなお一部のコンポーネントは、デフォルトフォントとして指定した「メイリオ」ではなく「MS UI Gothic」が使用される場合があります。困ったものです。





そのような場合には、任意のフォルダーに`style.css`というファイルを作成し、以下の内容に書き換えてください。




    
    * {
    	font-family: "メイリオ", "Meiryo" !important;
    }





そして、「自分のスタイルシートでドキュメントの書式を設定する」で、先ほど保存した`style.css`を指定します。ファイル名は何でも構いません。これで「メイリオ」全開です。何でもかんでも「メイリオ」に強制上書きです。





![](/images/2016/07/160707-577e56094cc40.png)






綺麗に表示されるようになりましたね！





### Google Chromeの場合





![](/images/2016/07/160707-577e5674cc8aa.png)






Windows 7のGoogle Chromeで弊サイトを閲覧した場合、Internet Explorer同様に、フォントが汚い（見づらい）です。困ったものです。私のせいです。



https://chrome.google.com/webstore/detail/stylist/pabfempgigicdjjlccdgnbmeggkbjdhd



Google Chromeには、便利な拡張機能があります。Internet Explorerのようなユーザースタイルシートの指定はありませんが、拡張機能を使用すれば解決します。上記の拡張機能をインストールしておいてください。





![](/images/2016/07/160707-577e56bec2457.png)






拡張機能「Stylist」をインストールしたら、拡張機能のオプションを開きます。「Add New Style」をクリックします。





![](/images/2016/07/160707-577e56cfd2703.png)






「Style Name」に任意の名前（「The Meiryo!」など）、「All site」をチェック、本文に以下を追加し、「Save」をクリックします。




    
    * {
    	font-family: "メイリオ", "Meiryo" !important;
    }





![](/images/2016/07/160707-577e56e19a573.png)






これで弊サイトも見やすくなりました。





## まとめ





今更ながらWindowsのメイリオに感銘を受けて、思わず記事にしてしまいました。これで会社のWindows 7でも快適にブラウジングできますね！
