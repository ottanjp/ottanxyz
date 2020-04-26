---
author: ottan
date: 2016-06-26 13:48:37+00:00
draft: false
title: 定期的にHomebrewをバックグラウンドで自動的にupdate/upgradeする
type: post
url: /homebrew-launchd-update-upgrade-4527/
categories:
- Mac
tags:
- Tips
---

![](/uploads/2016/06/160626-576fd72d2db44.jpg)






Homebrewは、macOSのパッケージ管理マネージャーです。Homebrewについては、弊サイトでも度々紹介していますが、下記リンクにその方法をまとめていますので、ぜひご覧ください。



https://ottan.xyz/mac-latex-presentation-92/



さて、Homebrewで公開されているパッケージは、定期的にアップグレードを繰り返しています。また、「Formula」と呼ばれるHomebrewのパッケージ管理に必要な情報が定期的に更新されます。とくに、不具合がない限り、現在使用しているパッケージを使用すれば問題ないのですが、できる限り不具合の改修された最新のパッケージを使用したいもの。というわけで、面倒くさがり屋の私は、Homebrewのパッケージについても、自動化してしまいました。





## 定期的にHomebrewを最新化する





事前にHomebrewのインストール、Homebrewのエラーの確認、terminal-notifier（後述）のインストールを行っておきます。





### 事前準備





まず、正常にHomebrewがアップデート、アップグレードできる状態であるかどうか、以下のコマンドをターミナルから実行して確認してください。




    
    $ brew doctor





macOS El Capitanにアップデートしてから、ありがちなのがパーミッション問題。以下のようなエラーが表示されていませんか？




    
    Warning: /usr/local is not writable.





このようなエラーが表示された場合には、下記のコマンドを実行して強制的にパーミッションを書き換えてください。




    
    $ sudo chown -R $(whoami) /usr/local





### terminal-notifierのインストール





terminal-notifierは、文字通りターミナルからmacOSの通知を利用して、任意の通知を行ってくれるコマンドです。terminal-notifierは、以下のコマンドを実行してインストールします。




    
    $ brew install terminal-notifier





たとえば、以下のコマンドを実行すると、60秒後にterminal-notifierで通知されます。実行に時間のかかるコンパイルなどと合わせて実行すると、終わったことが分かりやすくなり非常に便利です。




    
    $ sleep 60 && terminal-notifier -message "hoge"





### LaunchAgentsに登録





最後に、Homebrewを定期的にアップデート、アップグレードするために、以下のファイルをダウンロードして、`~/Library/LaunchAgents`に保存します。



https://gist.github.com/ottanxyz/ab8e843a1f54f06128a0647d5326afb2



`launchd`については、以下の記事で詳細を解説しています。ユーザログイン時に、バックグラウンドで実行され、完了するとterminal-notifierにより完了したことが通知されます。また、以降は8時間毎に定期的に実行されます。



https://ottan.xyz/launchd-vagrant-hosts-update-4495/



プロパティリスト（.plist）の書き方で注意したいのが、このファイル自体はXML形式で記述するため、エンティティ文字列（たとえば、`&`）は、エスケープする必要があるということです。





以下のコマンドを実行して、`launchd`に登録します。




    
    $ launchctl load ~/Library/LaunchAgents/localhost.homebrew-upgrade.plist





アップデート完了後、以下のダイアログが表示されることを確認してください。





![](/uploads/2016/06/160626-576fdc5d0d71a.png)






## 参考リンク



https://github.com/herrbischoff/awesome-osx-command-line
