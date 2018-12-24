---
author: ottan
date: 2016-05-29 05:23:26+00:00
draft: false
title: Atomの設定、キーマップ、スニペット、パッケージを複数の端末間で同期する「sync-settings」
type: post
url: /atom-sync-settings-4386/
categories:
- Mac
- WordPress
tags:
- Atom
- Development
---

![](/images/2016/05/160529-574a784b76e1b.jpg)






Sublime Textは、Dropbox経由でパッケージを同期することで、複数の端末間で同一の環境を簡単に構築することができました。Atomについても、ホームディレクトリ配下の`.atom`ディレクトリをオンラインストレージ経由で同期することで同一の環境を構築することも可能ですが、Atomには設定を同期するための専用のパッケージが用意されているので、こちらを使用すると便利です。



https://ottan.xyz/wordpress-atom-recommended-package-4369/



## Atomの設定、パッケージを同期する「sync-settings」





Atomを起動したら、メニューの「Atom」→「Install Shell Commands」から「app」コマンドをインストールしておきます。ターミナルを開いて以下のコマンドを実行します。




    
    apm install sync-settings





### GitHubのアクセストークンの取得





「sync-settings」パッケージは、GitHubのGistを経由してAtomの設定やパッケージの情報を同期します。そのために、事前にGitHubにアクセスするためのアクセストークン、および「Secret Gist」の用意が必要です。



https://github.com/



まず、上記のリンクから「GitHub」にアクセスします。





![](/images/2016/05/160529-574a785aa6c7e.png)






右上のプロフィールから「Settings」をクリックします。





![](/images/2016/05/160529-574a78609a595.png)






サイドメニューの「Personal access tokens」をクリックします。





![](/images/2016/05/160529-574a78664fa89.png)






「Generate new token」をクリックします。





![](/images/2016/05/160529-574a786cd43f1.png)






「Token description」に任意の名称を入力します。ここでは「Atom」としました。





![](/images/2016/05/160529-574a787f85b0f.png)






スコープは「gist」のみチェックしておきます。





![](/images/2016/05/160529-574a788427b5f.png)






最後に、「Generate token」をクリックします。





![](/images/2016/05/160529-574a788966b74.png)






アクセストークンが画面に表示されるため控えておきます。





### Secret Gistの作成





次に、Secret Gistを作成します。



https://gist.github.com/



まず、上記のリンクにアクセスします。





![](/images/2016/05/160529-574a788f72355.png)






任意のファイル名、ファイルの内容を入力して、「Create secret gist」をクリックします。ファイル名、内容は任意で構いません。ここでは、タイトルは「Atom」、内容は「a」としました。




    
    https://gist.github.com/ottanxyz/[Gist ID]





以上のようなURLが生成されるため、最後の「Gist ID」を控えておきます。





### sync-settingsの設定





最後に、Atomのパッケージの設定をします。Atomを起動したら、⌘+,を押し、環境設定を開きます。





![](/images/2016/05/160529-574a785443268.png)






「Packages」から「sync-settings」を探し、「Settings」をクリックします。





![](/images/2016/05/160529-574a78f21d4f5.png)






事前に控えたGitHubのアクセストークンを「Personal Access Token」に、Gist IDを「Gist Id」に入力します。





### sync-settingsによる設定、パッケージのバックアップ





![](/images/2016/05/160529-574a78fa55f9e.png)






Atomを起動したら、⇧+⌘+Pを押し、コマンドパレットを起動します。「Sync…」と入力すると、「Sync Settings: Backup」が表示されますのでこちらを選択します。





![](/images/2016/05/160529-574a7901e704c.png)






上記のように、「Your settings were successfully backed up.」と表示されればバックアップ完了です。





### 複数の端末間でAtomの設定、パッケージを同期する





バックアップした設定、パッケージを同期するためには、同期先の端末にAtomおよび「sync-settings」をインストールし、今回実施した内容と同様の設定（GitHubのアクセストークンおよびSecret Gist）を行います。その上で、コマンドパレットを起動し、「Sync Settings: Restore」をクリックします。




    
    sync-settings: Your settings were successfully synchronized.





上記のメッセージが表示されれば同期完了です。Atomを再起動すると、すべての設定が反映されます。





## まとめ





Atomをメインのエディターとして使用する場合には、複数の端末間で環境を同期できると便利です。「sync-settings」を使用して、快適なAtomライフをお過ごしください。
