---
author: ottan
date: 2015-09-06 04:51:00+00:00
draft: false
title: 徹底的にFlash Playerプラグインを無効化・アンインストールする方法
type: post
url: /flash-player-inactive-uninstall-2388/
categories:
- Mac
tags:
- Security
---

![](/images/2015/09/150905-55eafb99e3f4b.png)






Flash Playerの脆弱性が数多く指摘されています。随時セキュリティアップデートは実施されていますが、脆弱性が指摘されてからセキュリティパッチが適用されるまでは時間のかかる可能性もあります。Web全体がFlash PlayerからHTML5へと変貌を遂げていることから、もはやFlash Playerは必須ではありません。そこで、今回はFlash Playerを完全にアンインストール方法をご紹介します。





## Flash Playerをアンインストール





Google Chrome、Microsoft Edgeには標準でAdobe Flash Playerが組み込まれているため、各々のアプリケーションの設定からプラグインを無効化する必要があります。また、Windows、macOS、Linuxから完全にFlash Playerをアンインストールする手順をご紹介します。





### Google Chrome





Google Chromeには、Flash Playerが標準で組み込まれています。Google ChromeでFlash Playerを停止するためには、Google Chromeで、以下のリンクにアクセスします。





[プラグイン](chrome://plugins)





「Adobe Flash Player」の「無効にする」をクリックします。





![](/images/2015/09/150905-55eafb9bed3d3.png)






### Microsoft Edge





Microsoft Edgeには、Google Chrome同様、Flash Playerが標準で組み込まれています。Microsoft EdgeでFlash Playerを停止するためには、同ブラウザの設定を開きます。





![](/images/2015/09/150905-55eafb9dea50d.png)






「詳細設定を表示」をクリックします。





![](/images/2015/09/150905-55eafba109786.png)






「Adobe Flash Player を使う」をオフにします。





![](/images/2015/09/150905-55eafba5c5792.png)






### Internet Explorer 8〜11





Internet ExplorerでFlash Playerを停止するためには、「設定」→「アドオンの管理」を開きます。





![](/images/2015/09/150905-55eafba9c7af4.png)






「Shockwave Flash Object」を選択して、「無効にする」をクリックします。





![](/images/2015/09/150905-55eafbac94e97.png)






#### すべてのユーザで強制的にFlash Playerを停止する





「Windows」キー＋「R」を押して「ファイル名を指定して実行」を開きます。以下のコマンドを入力します。




    
    gpedit.msc





![](/images/2015/09/150905-55eafbae802a1.png)






「ローカルグループポリシーエディター」が表示されるため、「ユーザーの構成」→「管理用テンプレート」→「Windowsコンポーネント」→「Internet Explorer」→「セキュリティの機能」→「アドオン管理」をダブルクリックして開きます。





![](/images/2015/09/150905-55eafbb0084c4.png)






「有効」を選択して、「OK」ボタンをクリックします。





![](/images/2015/09/150905-55eafbb2ad96b.png)






最後に「ファイル名を指定して実行」で、以下のコマンドを実行して、ポリシーを適用することで完了です。




    
    gpupdate /force





![](/images/2015/09/150905-55eafbb4a5c86.png)






### Windows





WindowsにインストールしたFlash Playerをアンインストールするためには、以下のリンクにアクセスします。「uninstall_flash_player.exe」をダウンロードして、アンインストールしてください。



https://helpx.adobe.com/jp/flash-player/kb/230810.html



### Mac





MacにインストールしたFlash Playerをアンインストールするためには、Windows同様に以下のリンクにアクセスします。macOSのバージョンに応じて「uninstall_flash_player_osx.dmg」をダウンロードして、アンインストールしてください。



https://helpx.adobe.com/jp/flash-player/kb/230810.html



### Linux





以下のコマンドを実行して、Flash Playerをアンインストールします。




    
    sudo apt-get remove flashplugin-installer




    
    sudo update-pepperflashplugin-nonfree --uninstall





## まとめ





Flash全盛期時代は終了し、Webサイト全体がHTML5へ切り替わっています。脆弱性が多く指摘されるAdobe Flash Playerをアンインストールして、セキュリティリスクを低くしましょう。
