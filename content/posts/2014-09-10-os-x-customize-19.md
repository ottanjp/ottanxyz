---
author: ottan
date: 2014-09-10 00:34:59+00:00
draft: false
title: コピペだけでできるMacのカスタマイズ19選
type: post
url: /os-x-customize-19-217/
categories:
- Mac
tags:
- Tips
---

![](/images/2014/09/140909-540eda2d9df8d.jpg)






[@おったん](https://twitter.com/ottanxyz)です。今すぐ実践可能なmacOSのカスタマイズとして、ターミナルから変更することが可能なTipsを厳選した上で何点かご紹介します。また、実際に環境変更する前にコマンドの履歴を自動保存する方法についても、合わせてご紹介したいと思います。





## コマンドの履歴を自動的に保存する





defaultsコマンドによる環境変更は、その履歴を保存しておくと何かと便利です。過去に自分がどのような環境変更を行ったのかを記録することで、何かしらのトラブルに見舞われた際の参考になります。また、次回以降に同じ環境変更を行うときの助けにもなります。




ログインシェルに「bash」を使用している場合（デフォルト）は、以下のコマンドを「~/.bashrc」に追記してください。追記後は、`source`コマンドで「~/.bashrc」を読み込みなおしてください。または、ターミナルを開きなおしてください。





**bash**




    
    PROMPT_COMMAND='echo "$(history 1 | grep "defaults")" | sed '/^$/d' >> /path/to/defaults.txt'





ログインシェルに「zsh」を使用している場合は、以下のコマンドを「~/.zshrc」に追記してください。追記後は、**bash**の場合と同様に、`source`コマンドで「~/.zshrc」を読み込みなおしてください。





**zsh**




    
    unalias history
    precmd() { eval "$PROMPT_COMMAND" }
    PROMPT_COMMAND='echo "$(history -1 | grep "defaults")" | sed '/^$/d' >> /path/to/defaults.txt'





なお、どちらの場合も保存先は任意ですので「/path/to/defaults.txt」を適宜変更してください。このような感じで保存されるようになります。




    
     21 defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false
     22 defaults write com.apple.screencapture type -string jpg
     23 defaults write com.apple.screencapture type p
     24 defaults delete com.apple.screencapture type
     25 defaults write com.apple.Dock showhidden -bool YES && killall Dock
     26 defaults delte com.apple.Dock showhidden
     27 defaults delete com.apple.Dock showhidden
     29 sudo defaults write /Library/Preferences/com.apple.loginwindow AdminHostInfo HostName
     29 sudo defaults write /Library/Preferences/com.apple.loginwindow AdminHostInfo HostName
     30 sudo defaults delete /Library/Preferences/com.apple.loginwindow
     31 defaults write com.apple.loginwindow PowerButtonSleepsSystem -bool no
     32 defaults write com.apple.Finder FXPreferredViewStyle Nlsv 





## Finder





### QuickLookでテキストを選択できるようにする





macOSのデフォルトでは、QuickLook（␣キーを押す）で開いたドキュメントの内容をコピーすることができません。以下のコマンドを実行することで、コピーできるようになります。なお、QuickLookについては、[Macを購入したら最初に導入しておきたいQuick Lookのプラグイン](/quick-look-plugin-78/)も参照してください。そろそろ、この挙動をシステムのデフォルトにしてほしい。




    
    $ defaults write com.apple.finder QLEnableTextSelection -bool true
    $ killall Finder





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.finder QLEnableTextSelection
    $ killall Finder






### 隠しファイルをすべて表示する





Finderで隠しファイル（.DS_Storeなど「.」から始まるファイル）がすべて表示されるようになります。有効にする場合は、誤って重要なシステムファイルを削除しないように十分注意してください。怪しいファイルに「.」をつけて保存している場合は、とくに注意してください（？）




    
    $ defaults write com.apple.finder AppleShowAllFiles TRUE
    $ killall Finder





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.finder AppleShowAllFiles
    killall Finder





### デスクトップに散らばったやばいものを隠す





デスクトップを綺麗サッパリにしてくれます。ただし、デスクトップからファイルが削除されたわけではなく、Finderからは参照可能です。もしものとき（？）のためのオマジナイですね。




    
    $ defaults write com.apple.finder CreateDesktop -bool false
    $ killall Finder





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.finder CreateDesktop
    $ killall Finder





### Finderで開いた時のビューを常にリストビューにする





**Finderで開いたときのデフォルトビューをリストビューに変更します**。これ便利です。Finderでいつも自分の好みのビューを使用できます。リストビューが一番見やすいと思うのは私だけでしょうか。その他にも、「icnv」（アイコンビュー）、「clmv」（カラムビュー）、「Flwv」（カバーフロービュー）から選択できます。




    
    $ defaults write com.apple.Finder FXPreferredViewStyle Nlsv
    $ killall Finder





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.Finder FXPreferredViewStyle
    $ killall Finder





## Dock





### Mission Controlを開くときのアニメーションのスピードを上げる





Mission Controlは、散らかったウインドウを探すのに便利な機能です。しかし、Mission Controlの起動（アニメーション）の遅さにイライラしたことはありませんか？そんなあなたにはこのコマンドがオススメです。Mission Controlの起動スピードが段違いに早くなります。




    
    $ defaults write com.apple.dock expose-animation-duration -float 0.1
    $ killall Dock





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.dock expose-animation-duration
    $ killall Dock





### Dockを隠す／表示のアニメーションを無効化する





MacBook Airなど解像度の低いデバイスを使用している場合には、作業スペースを確保するためDockを自動的に隠す設定にしている方も多いと思います。デフォルトでは、アニメーションがもたつくので、以下のコマンドを使用してスピードを上げることをオススメします。




    
    $ defaults write com.apple.dock autohide-time-modifier -int 0.1
    $ killall Dock





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.dock autohide-time-modifier
    $ killall Dock





### Dockを自動的に表示するときのディレイ（遅延）を0にする





Dockを自動的に隠す設定にしている場合、Dockの位置にカーソルを合わせてもすぐにDockは表示されません。これは、Dockが誤って表示されるのを防ぐためのものですが、時にこの挙動がモタモタしイライラしたことはないでしょうか。そのような場合には、この表示されるまでの遅延を0にしてしまいましょう。すぐに表示されるようになります。




    
    $ defaults write com.apple.Dock autohide-delay -float 0
    $ killall Dock





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.Dock autohide-delay
    $ killall Dock





## スクリーンショット





### スクリーンショットの保存場所をピクチャフォルダーに変更する





スクリーンショットの保存場所は、デフォルトではユーザーのデスクトップです。画像なんだからピクチャフォルダーで良いのに！と思ったら今すぐ変更しましょう。




    
    $ defaults write com.apple.screencapture location ~/Pictures
    $ killall SystemUIServer





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.screencapture location
    $ killall SystemUIServer





### スクリーンショットのファイル名を変更する





スクリーンショットのデフォルトの名称には「スクリーンショット〜」という長い日本語名称が付きます。長すぎるので短い名前に変えてしまいましょう。




    
    $ defaults write com.apple.screencapture name "SS"
    $ killall SystemUIServer





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.screencapture name
    $ killall SystemUIServer





### スクリーンショットの影を消す





スクリーンショットを撮影すると、デフォルトではウインドウの影も一緒に撮影します。しかし、ブログ用にスクリーンショットを使用したいのであれば、画像ファイルが重くなる影は取り除いたほうがよいでしょう。無効化するには以下のコマンドを実行します。




    
    $ defaults write com.apple.screencapture disable-shadow -bool true
    $ killall SystemUIServer





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.screencapture disable-shadow
    $ killall SystemUIServer





### スクリーンショットの保存形式を変更する





スクリーンショットの保存形式を変更する方法です。スクリーンショットの形式はデフォルトのPNG形式をオススメしますが、どうしても変更したいときに。





JPEGは写真のような画素数の多いイメージファイルに、PNGはその逆に向いています。どちらにも一長一短があり、使い方を誤るとムダにファイルサイズが大きくなったりします。JPEG、PNG、どちらにも一長一短がありますので注意してください。




    
    $ defaults write com.apple.screencapture type -string jpg
    $ killall SystemUIServer





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.screencapture type
    $ killall SystemUIServer





## その他





### Safariのバックスペースで戻る機能を有効にする





古いSafariには「バックスペースで戻る」という機能がありました。しかし、最新のSafariでは同機能が削除されてしまいました。往年のSafariを取り戻したい場合は以下のコマンドを実行しましょう。




    
    $ defaults write com.apple.Safari.ContentPageGroupIdentifier.WebKit2BackspaceKeyNavigationEnabled -bool YES





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.Safari.ContentPageGroupIdentifier.WebKit2BackspaceKeyNavigationEnabled





### App Napをシステム全体で無効化する





macOS Mavericksのみ。App Napとは、アプリケーションがバックグラウンドで待機している間は、CPUやメモリなどのリソース消費量を節約するための機能です。しかし、バックグラウンドで処理を行いたい場合には、弊害となったりします。Mountain Lion以前の挙動に戻す場合は、以下のコマンドを実行します。なお、有効化するためには再ログイン、または再起動が必要です。




    
    $ defaults write NSGlobalDomain NSAppSleepDisabled -bool yes





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete NSGlobalDomain NSAppSleepDisabled





### ディスクイメージマウント時の高速化





通常、ディスクイメージ（.dmg）のマウントには、事前に検証というステップが入るため、ダブルクリックしてから参照できるようになるまで時間を要します。この「検証」という行為をスキップして、すぐにマウントするようにするのが以下のコマンドです。どんなディスクイメージでもすぐにマウントしてしまうため、セキュリティ事故を起こさないよう注意しましょう。




    
    $ defaults write com.apple.frameworks.diskimages skip-verify -bool true





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.frameworks.diskimages skip-verify






### ネットワーク上のフォルダーに「.DS_Store」を作成しない





共有ファイルサーバなど、ネットワーク上のフォルダーには「.DS_Store」を作成しなくなるのがこのコマンドです。Windowsから参照した際に、「.DS_Store」が見られたらちょっとかっこ悪いですよね。




    
    $ defaults write com.apple.desktopservices DSDontWriteNetworkStores true





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.desktopservices DSDontWriteNetworkStores





### ヘルプ画面が常時全面に表示されるのを防ぐ





macOSで一番偉いのはヘルプウィンドウです。なぜなら、他にどんなことをしていようと、常に最前面にへばりついているからです。さっさと最背面にでも後退してもらいたい場合はこのコマンドを実行しておきましょう。




    
    $ defaults write com.apple.helpviewer DevMode -bool true





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.helpviewer DevMode





### 電源ボタンを押したら再起動やログオンメニューが出るようにする





macOS Mavericksのみ。Mountain Lion以前では電源ボタンを軽く押すと、再起動、ログアウト、スリープ、システム終了から選べるダイアログが表示されていましたが、Mavericksでは問答無用でスリープします。同じダイアログを出すためには、1.5秒程度電源ボタンを押しっぱなしにする必要があり、集中していないと思わず5秒以上長押しして強制電源OFFになりかねません。Mountain Lion以前に戻したい場合は、以下のコマンドを実行しておきましょう。




    
    $ defaults write com.apple.loginwindow PowerButtonSleepsSystem -bool no





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.loginwindow PowerButtonSleepsSystem





### 標準のメールアプリでイメージのプレビューを行わない





メールアプリが遅い、と思ったらイメージのプレビューをやめてみましょう。メールが高速になります。




    
    $ defaults write com.apple.mail DisableInlineAttachmentViewing -bool true





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.mail DisableInlineAttachmentViewing





### ダッシュボードを無効にする





使わない機能は無効化しておくことです。




    
    $ defaults write com.apple.dashboard mcx-disabled -boolean YES





元に戻したい場合は以下のコマンドを実行してください。




    
    $ defaults delete com.apple.dashboard mcx-disabled
