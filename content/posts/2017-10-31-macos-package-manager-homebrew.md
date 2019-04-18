---
author: ottan
date: 2017-10-31 13:30:14+00:00
draft: false
title: macOSのパッケージ管理にはHomebrewを使おう！Homebrewを使用する理由や便利な使い方までご紹介
type: post
url: /macos-package-manager-homebrew-6216/
categories:
- Mac
tags:
- Homebrew
- Tips
---

![](/images/2017/10/171031-59f87b5131b26.jpg)






macOSは、BSD系UNIXをベースに開発されたOSですが、「APT（Advanced Packaging Tool）」に代表されるLinuxで使用されるパッケージ管理ソフトウェアが、有志によって用意されています。「Homebrew」と呼ばれるもので、「MacPorts」と聞くと馴染みのある方もいらっしゃるかもしれません。macOS標準で付属するものではありませんが（macOS標準は、Mac App Store）、「Homebrew」を使用すれば、ターミナルから簡単に便利なコマンドのインストールはもとより、「Google Chrome」などのアプリケーションまでインストールできます。今まで、ターミナルの黒い画面（デフォルトでは「白い」のですが）恐怖症に陥っていた方も、ぜひ「Homebrew」の魅力にはまってください。





## Homebrew





Homebrewは、macOS専用のパッケージ管理ソフトウェアです。Linuxの「APT」、Rubyの「RubyGems」などと同様の役割を果たします。もはや、macOSに欠かせないパッケージ管理ソフトウェアであり、デフォルトでインストールしてほしいくらい、一度使い始めると、なくてはならなくなる便利なソフトウェアです。





Homebrewは、「APT」「RubyGems」同様、ターミナルから操作を行います。ターミナルと聞いて「黒い画面」を思い浮かべる方もいらっしゃるかもしれませんが、Homebrewによる操作は非常に簡単です。





### なぜ、Homebrewを使用するのか





Homebrewを使用する上でのメリットはさまざまです。デメリットは、Homebrewに対応していないパッケージはインストールできない、ただそれだけです。Macを使用するのであればHomebrewを使用しない手はないでしょう（これまで、Homebrewを悪用した話は聞いたことがありません。筆者が聞いたことがないだけかもしれませんが…）。





#### 利便性





Homebrewの操作はすべてターミナルから実施します。Linuxの「apt」コマンドなどを使用したことがある場合は、イメージしやすいでしょう。また、「APT」や「RubyGems」と異なり、Homebrewのコマンド「brew」は一般ユーザーの権限で使用できます。詳細な使用方法については後述します。なお、Homebrewはすべて「/usr」ディレクトリ配下で処理が実施されれるため、マルチアカウント環境においても、他のユーザーに影響を与えることがありません。





インストール、アンインストールも簡単です。macOSの初期セットアップの状態からすぐに使い始めることができます。インストール、アンインストールは、ターミナルからワンライナーで実行できます。





#### 多種多様なパッケージに対応





「Node.js」「Ruby」「Python」「Perl」「Ansible」「Jenkins」といったシステム開発に欠かせないもの（色々あって思いつきません…）、「wget」「vim」「git」などシステム開発やターミナルをより便利に使いこなすためのコマンドなど、多種多様なパッケージのインストールに対応しています。





また、「Homebrew Cask」を使用すれば、ターミナルから「アプリケーション」フォルダーにアプリケーションをインストールしている必要があります（アプリケーションが「Homebrew Cask」に対応している必要があります）。そのため、複数の開発環境を用意したいといった場合に、わざわざ一から開発環境を構築する必要がなく、Homebrewさえインストールしてしまえば、あとはすべて自動化することも可能なのです。





#### セキュリティ





macOSでは、macOS El Capitanから「SIP（System Integrity Protection）と呼ばれるセキュリティ機構が導入されました（Linux系OSのSE Linuxに似ています）。従来、管理者権限を保持するユーザーであれば「sudo」コマンドにより、そのユーザーによる権限のない領域においても特権（root）により、強制的に読み書き、実行ができましたが、El Capitan以降は、「/usr」「/System」「/bin」といったシステムを実行する上で欠かすことのできない領域については、SIPによりすべて保護され、例え特権ユーザーにおいても自由に変更することができなくなりました。特権ユーザーの権限を制限することにより、システムの改変、改竄を未然に防止できます。





「/usr」領域配下における例外が「/usr/local」です。当該ディレクトリにおいては、特権ユーザーであれば自由に読み書き、実行できます。Homebrewは、この「/usr/local」配下にインストールされます。Homebrewの初期インストール後は特権ユーザーを使用してパッケージをインストールすることはありません。すべてはユーザー権限のもとに実施されます。そのため、Homebrewによる特権ユーザーを使用したセキュリティ低下を防ぐことができます。





#### GUIによるパッケージ管理





後述の「Cakebrew」を使用することで、HomebrewのパッケージをGUI上で管理できます。





#### まとめ





このようにHomebrewを使用することで、簡単にパッケージ（ソフトウェア）のインストール、アンインストールを誰でも簡単に行うことができます。一からソースをビルドして、といった煩わしい手間を省くことができるのです。





### Homebrewのインストール





Homebrewは、ターミナルからコマンドを実行して、インストールします。インストール方法は、Homebrewのバージョンアップの都度、変更される可能性があるため、必ずHomebrewの公式サイトをご確認ください。



https://brew.sh/index_ja.html



Homebrewは、基本的に英語ですが、インストール方法については日本語のページが用意されています。上記のWebサイトを開くと、上部にインストールコマンドが記されていますので、ターミナルを起動してこのコマンドを実行してください。




    
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"





上記は記事執筆時点（2017/10/30）のコマンドです。常に最新版を確認してください。ウィザードの内容にしたがってインストールが完了したら、下記のコマンドを実行して、Homebrewのインストール状態を確認してください。




    
    brew doctor





下記のように表示されていればインストールは完了です。




    
    Your system is ready to brew.





### Homebrewでインストールしたパッケージの保存先は？





Homebrewでインストールしたパッケージ（たとえば、wget）の実態は、`/usr/local/Cellar`にあります。たとえば、前述の「wget」の場合は、`/usr/local/Cellar/wget`ディレクトリ配下に、バージョンごとにインストールされ管理されます。パッケージごと、バージョンごとにディレクトリが複数に分かれて管理されていますが、シンボリックリンクが`/usr/local/bin`配下に作成されます。たとえば、以下のコマンドを実行してみてください。




    
    ls -l /usr/local/bin/wget





以下のように、「wget」コマンドの実態は`/usr/local/Cellar`配下にリンクされていることがわかります。




    
    lrwxr-xr-x  1 ottan  admin  30 10 29 17:17 /usr/local/bin/wget -> ../Cellar/wget/1.19.2/bin/wget





Homebrewをインストールすると、環境変数「PATH」の先頭に`/usr/local/bin`が追記されるため、利用者は意識することなく、Homebrewでインストールしたコマンドを使用することができるようになるわけです。逆に、Homebrewでインストールしたコマンドが正常に機能しない場合は、環境変数「PATH」の状態を確認してみてください。シェルのプロファイル等で環境変数「PATH」が上書きされてしまっている可能性があります。他のアプリケーションのインストール等で「PATH」が書き換わってしまう可能性がある場合には、シェルのプロファイル等に「PATH」の先頭に「`/usr/local/bin`」を追加するように追記してください。




    
    echo export PATH='/usr/local/bin:$PATH' >> ~/.bash_profile // bashの場合





### Homebrewの使用方法





ここでは、Homebrewでよく使用するオプションをまとめておきます。





#### update





Homebrewでインストールできるパッケージを格納するリポジトリを更新します。




    
    brew update





#### upgrade





Homebrewでインストールしたパッケージを最新の状態にアップデートします。




    
    brew upgrade <Package Name>





「<Package Name>」は任意です。指定することで特定のパッケージのみをアップデートすることも可能です。省略した場合は、すべてのパッケージがアップデートされます。





#### install / uninstall





おそらくもっともよく使用するであろうオプションです。パッケージ名を指定して、パッケージのインストールを行います。なお、Homebrewでは、このパッケージを「Formula」と呼びます。




    
    brew install <Package Name> // パッケージのインストール
    brew uninstall <Package Name> // パッケージのアンインストール





#### link / unlink





Homebrewでインストールされるパッケージの実態は、すべて「`/usr/local/Cellar`」配下で管理されます。必要に応じて、シンボリックリンク（Windowsでいうショートカット）を`/usr/local/bin`に作成します。このシンボリックリンクの作成、削除を行うためのコマンドです。




    
    brew link <Package Name> // シンボリックリンクの作成
    brew unlink <Package Name> // シンボリックリンクの削除





#### search





Homebrewのリポジトリから、指定したパッケージを部分一致で検索します。該当のコマンドやパッケージがリポジトリに登録されているかどうかを探すのに便利なコマンドです。




    
    brew search <Package Name>





#### list





Homebrewによりインストールされたパッケージの一覧を表示します。




    
    brew list





### Homebre Caskを使用してアプリケーションをインストールする





「Homebrew Cask」を使用して、CUIでアプリケーションをインストールできます（ただし、アプリケーションが「Cask」に登録されている必要があります）。Macの場合、アプリケーションをインストールするためには、アプリケーションの配布元（Webサイト）やMac App Storeからアプリケーションをダウンロードして、「アプリケーション」フォルダーにアプリケーションをコピーする必要がありますが、「Homebrew Cask」を使用することで、すべてターミナルからインストールできます。そのため、スクリプトを使用することでアプリケーションのインストールも自動化できます。





#### Homebrew Caskのインストール





「Homebrew Cask」をインストールするためには、以下のコマンドを実行します。事前にHomebrewがインストールされている必要があります。




    
    brew tap caskroom/cask





#### Homebrew Caskのアンインストール





「Homebrew Cask」をアンインストールするためには、以下のコマンドを実行します。




    
    brew untap caskroom/cask





### Homebrew Caskの使用方法





「Homebrew Cask」のよく使用するオプションをご紹介します。Homebrewと同じ感覚で使用することができるため、戸惑うことは少ないでしょう。





#### install / uninstall





アプリケーションのインストール、アンインストールを行います。インストールしたアプリケーションは、「アプリケーション」フォルダーにインストールされます。




    
    brew cask install <Application Name> // アプリケーションのインストール
    brew cask uninstall <Application Name> // アプリケーションのアンインストール





#### search





Homebrew Caskでインストールできるアプリケーションの一覧を部分一致で検索します。




    
    brew cask search <Application Name>





#### list





Homebre Caskでインストールされたアプリケーションの一覧が表示されます。




    
    brew cask list





#### home





Homebrew Caskでインストールされるアプリケーションの配布元をブラウザで開きます。




    
    brew cask home <Application Name>





#### outdated





Homebrew Caskでインストールされたアプリケーションのうち、アップデートが必要なアプリケーションの一覧が表示されます。もし、アップデートが必要な場合は、再度「install」オプションを使用してインストールします。




    
    brew cask outdated





### Homebrewのアンインストール





Homebrewをアンインストールしたい場合は、以下のコマンドを実行します。




    
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"





なお、Homebrewのアンインストールについては、HomebrewのFAQに用意されています。



https://docs.brew.sh/FAQ.html



### HomebrewのGUI版「Cakebrew」を使用する





macOSは、BSD系UNIXをベースに開発したOSであり、macOSを使用する方にとってターミナルの、いわゆる「黒い画面」が苦手だという方は少ないかもしれませんが、Homebrewには有志でGUI上でインストール済みのパッケージ管理や新規パッケージインストールができるアプリが用意されています。それが「Cakebrew」です。



https://www.cakebrew.com



「Cakebrew」のインストール方法は簡単です。上記のWebサイトからCakebrewのディスクイメージファイル（dmg）をダウンロードしてダブルクリック（マウント）したら、「Cakebrew.app」をアプリケーションフォルダーにコピーするだけです。





![](/images/2017/10/171031-59f8789cbc2d1.png)






「Cakebrew」のGUIは上図のようになっており、macOS High Sierraでも動作可能です。Homebrewの基本的なコマンドは、すべてCakebrewで確認できるようになっており、GUIになることにより視認性が向上するため、多くのパッケージを管理したい場合には、Cakebrewを利用するのが便利かもしれません。
