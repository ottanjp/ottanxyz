---
author: ["@ottanxyz"]
date: 2015-09-12 11:45:49+00:00
draft: false
title: macOSをクリーンインストールした後に行う初期設定のまとめ
type: post
slug: os-x-clean-install-settings-2441
categories:
  - Mac
tags:
  - Tips
---

![](/uploads/2015/09/150912-55f3e288d2fe6.jpg)

私が実践している macOS クリーンインストール後の、ブロガーとして、ブログが書ける状態になるまでの初期設定をご紹介します。ブロガーならずとも参考になる箇所があるかもしれませんので、共有したいと思います。

## 初期設定のまとめ

システム環境設定からアプリケーションのセットアップまで、順を追ってご紹介します。

### システム環境設定

![](/uploads/2015/09/150912-55f3c23a5a236.png)

まずは、システム環境設定から。システム環境設定については、[Mac を購入したら最初に設定しておきたいシステム環境設定](/posts/2014/09/mac-preference-51/)もご参照ください。

#### Dock

![](/uploads/2015/09/150912-55f3c23be8b85.png)

「ウインドウをアプリケーションアイコンにしまう」と「Dock を自動的に隠す／表示」にチェック。

前者は、アプリケーションのウインドウを最小化する際に、Dock のアプリケーションのアイコンにしまってくれるので、Dock のスペースを有効に使うことができます。後者は、MacBook の解像度は iMac 等と比較すると狭いので、少しでも有効活用できるよう、普段はしまっておきます。

#### セキュリティとプライバシー

![](/uploads/2015/09/150912-55f3c23ddff04.png)

とりあえず、ファイアウォールはオンにしておきましょう。

#### キーボード

![](/uploads/2015/09/150912-55f3c23f6467f.png)

「F1、F2 などのすべてのキーを標準のファンクションキーとして使用」にチェック。かなや英数変換のためにファンクションキーを使えるようにしておきましょう。

![](/uploads/2015/09/150912-55f3c241a5d7b.png)

Caps Lock は使用する場面が少ないので、よく使用する「Control」キーに割り当てます。

![](/uploads/2015/09/150912-55f3c24485ded.png)

変換候補の表示に使われるヒラギノ明朝体があまり好きではないので、ヒラギノ角ゴに変更します。

![](/uploads/2015/09/150912-55f3c24776bea.png)

また、⇥（タブ）キーで、ウインドウとダイアログを操作できるように、「すべてのコントロール」をチェックしておきます。

#### トラックパッド

![](/uploads/2015/09/150912-55f3c24ac1b49.png)

まず、最初に行っておきたい設定。「タップでクリック」をチェックします。これで、トラックパッドを押し込む必要がなくなります。また、軌跡の速さも最大にしておきます。慣れると病みつきです。

#### インターネットアカウント

![](/uploads/2015/09/150912-55f3c24c316c4.png)

インターネットアカウントは iCloud で同期されますが、Google アカウントのみ正しく機能しなかったため、一度アカウントを削除して再設定します。

#### ユーザとグループ

![](/uploads/2015/09/150912-55f3c626d84cd.png)

Mac の起動をはやくするために、ログインオプションから「児童ログイン」をオンにしておきます。

![](/uploads/2015/09/150912-55f3c628d0fb5.png)

左下の鍵マークを解除した状態でアカウントの横を右クリックすると詳細オプションが表示されますので、クリックします。

![](/uploads/2015/09/150912-55f3c62a9a8b4.png)

ログインシェルを「/bin/zsh」に変更します。デフォルトの「/bin/bash」よりも使い勝手が良いためです。また、後述の「oh-my-zsh」にも関係します。

#### 共有

![](/uploads/2015/09/150912-55f3ca3a822de.png)

デフォルトのホスト名がアレなので、変更しておきましょう。

### Finder

![](/uploads/2015/09/150912-55f3c62ceaa10.png)

Finder をリスト表示にした状態で、「表示オプションを表示」を選択します。

![](/uploads/2015/09/150912-55f3c630094bc.png)

リスト表示が見やすいため、「常にリスト表示で開く」をチェックします。並び順序と表示順序は好みに応じて変更してください。また、アイコンサイズも大きなものにしておくと視認性が上がります。すべて設定したら「デフォルトとして使用」にチェックします。これで、次回以降、この状態で Finder が開くようになります。

![](/uploads/2015/09/150912-55f3dc1639aee.png)

また、Finder の環境設定からデスクトップに表示する項目として「ハードディスク」を追加します。また、「新規 Finder ウインドウで次を表示」のデフォルトの「マイファイル」は使い勝手が悪いので、ホームディレクトリに変更しておきます。

![](/uploads/2015/09/150912-55f3dc17b8273.png)

私が Finder で常に表示させている項目は図の通りです。

![](/uploads/2015/09/150912-55f3dc196276e.png)

また、詳細から「すべてのファイル名拡張子を表示」をチェック、残りの 2 つのチェックを外します。また、「検索実行時」を「現在のフォルダー内を検索」に変更します。デフォルトの状態（ハードディスク全体）は、ファイルを Finder から探すのに余分なものも表示されてしまうからです。

![](/uploads/2015/09/150912-55f3de8a40c16.png)

ピクチャフォルダーでは「大きさ」「解像度」を表示しておくと便利です。これについては、[これは便利！Finder で画像ファイルの解像度と大きさを確認する方法](/posts/2014/09/finder-tips-resolution-464/)をご参照ください。

### メニューバー

![](/uploads/2015/09/150912-55f3c631af8fe.png)

デフォルトではバッテリーのパーセント表示がオフになっているため、オンにしておきます。

### ターミナル

![](/uploads/2015/09/150912-55f3ca3d89832.png)

好みに応じて外観を変更しましょう。ターミナルの外観を配布しているサイトもあるため、デフォルトの外観に満足できない場合は探してみても良いでしょう。私は、「Pro」をデフォルトとして使っています。また、デフォルトのフォントサイズはやや小さいため、フォントサイズを変更しています。

![](/uploads/2015/09/150912-55f3ca406fa4b.png)

また、「シェルの終了時」は「ウインドウを閉じる」を選択します。これで`exit`コマンドで終了時にターミナルのウインドウが自動的に閉じるようになります。

#### oh-my-zsh

ターミナルで以下のコマンドを実行して「oh-my-zsh」をインストールします。

    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

「oh-my-zsh」は、zsh を拡張してくれるとても便利なソフトウェアです。[oh-my-zsh を使って zsh の便利な設定をまとめて取り入れる - mollifier delta blog](http://mollifier.hatenablog.com/entry/20101009/p1)で詳しく解説されていますので、ぜひご覧になってみてください。

### スクリーンショット

スクリーンショットのデフォルトの保存先はデスクトップフォルダーですが、それをピクチャフォルダーに変更します。また、デフォルトではスクリーンショットに影がついた立体的な状態で表示されますが、ブログで紹介する際にはファイルサイズが増えるだけなので、影もオフにしておきます。

    $ defaults write com.apple.screencapture location ~/Pictures/
    $ defaults write com.apple.screencapture disable-shadow -boolean true
    $ killall SystemUIServer

### Safari

![](/uploads/2015/09/150912-55f3dc04aae8a.png)

WordPress でよく URL を確認したい場合が多いので、Safari の環境設定で「Web サイトの完全なアドレスを表示」をチェックしておきます。また、Web サイトのソースの表示や要素の検証のために、「メニューバーに"開発"メニューを表示」にもチェックしておきます。

#### 拡張機能

「1Password」「Awesome Screenshot」「Buffer」を使用しています。

##### 1Password

「1Password」は、もちろんパスワードの入力・参照に使います。

https://agilebits.com/onepassword/extensions

##### Awesome Screenshot

「Awesome Screenshot」は、サイトやアプリケーション紹介時に、そのサイトのトップページをアイキャッチ画像として使用するために使います。

https://extensions.apple.com/?q=Awesome%20Screenshot

##### Buffer

「Buffer」は、Twitter、Facebook ページ、Google+に一度に記事を配信できるので、とても便利です。

https://buffer.com/extras

### アプリケーションのインストール（App Store）

まずは、Mac App Store からインストールできるアプリからご紹介します。

#### 1Password for Mac

まずは、「1Password for Mac」。もはやパスワード管理にはかかせないアプリケーションです。「1Password」については、[iOS 版の 1Password でウェブページの登録から使い方まで徹底解説！](/posts/2014/09/ios-1password-description-554/)や[1Password Anyware で、会社の PC など 1Password が使えない状況で、パスワード情報にアクセスする方法](/posts/2015/06/1password-anyware-1638/)もご参照ください。

{{< itunes 443987910 >}}

また、1Password の設定は私が横着者だからかセキュリティにう頓着だからか、セキュリティの設定をすべて解除しておきます。これで、ログアウトしない限り、1Password をマスターパスワードなしで開くことができます。

![](/uploads/2015/09/150912-55f3ca4319f4b.png)

また、Alfred と連携させるために「サードパーティ製のアプリと統合を有効にする」をチェックしておきましょう。

![](/uploads/2015/09/150912-55f3ca44e3a18.png)

#### Caffeine

一定時間、Mac のスクリーンをスリープ状態にさせないためのアプリケーションです。長時間の処理を実行していて、スリープ状態にできない場合、などに便利です。

{{< itunes 411246225 >}}

#### Pasteasy

Mac、Windows、iOS、Android 間でクリップボードの共有を瞬時に行うことのできる魔法のようなアプリケーションです。こちらについては、[Mac、Windows、iPhone、Android 間のクリップボードを自動で同期する「Pasteasy」](/posts/2015/05/clipboard-pasteeasy-1549/)で詳しく解説していますのでご参照ください。

{{< itunes 906277880 >}}

#### PopClip

PopClip は、トラックパッド、マウスに革命を起こすアプリケーションです。選択したテキストに対してさまざまな処理を実行できます。PopClip については、[WordPress のテーマ開発、ブログの執筆作業を効率化する方法のまとめ](/posts/2014/12/efficiency-blog-736/)でもご紹介しています。

{{< itunes 445189367 >}}

「Character Count」は、選択したテキストの文字数を表示する拡張機能です。ブログのタイトルを考える際の目安にしています。

![](/uploads/2015/09/150912-55f3ca4684e67.png)

「Translate Tab」は後述の翻訳タブと連携して、選択した英語を日本語に、日本語を英語に瞬時に変換してくれる神のような拡張機能です。これで快適に海外のブログを読むことができます。

![](/uploads/2015/09/150912-55f3ca47da99a.png)

最後に「HTML Encode」は、ブログで HTML や PHP のコードを紹介したい場合に、そのままでは正しく表示されない文字列をエンコードしてくれる非常に便利な拡張機能です。これもブログを書く時に使用しています。

![](/uploads/2015/09/150912-55f3ca49b4852.png)

#### Reeder 2

ブログの元ネタにもなる、情報収集は主に RSS を利用しています。そのため、RSS リーダーは必須です。RSS リーダーには好みがあると思いますが、対応しているサービスが多く、インタフェースがすぐれている「Reeder 2」が好みです。Reeder については、[feedly で作る自分だけのキュレーションアプリ](/posts/2014/09/feedly-curation-314/)でもご紹介しています。

{{< itunes 880001334 >}}

#### Skitch

ブログでスクリーンショットを紹介する際に、補足を書き込んだり、四角い枠で囲ったりと、画像を快適に軽快に編集できる便利なアプリケーションです。

{{< itunes 425955336 >}}

#### ToyViewer

主に、個人情報などを隠すためにモザイク加工するために使用しています。

{{< itunes 414298354 >}}

「ノイズ・モザイク」がモザイク加工するためのメニューなのですが、デフォルトではショートカットが設定されていません。よく呼び出すのでショートカットが欲しいところです。

![](/uploads/2015/09/150912-55f3dc0723e87.png)

「システム環境設定」→「キーボード」の「ショートカット」にキーボードショートカットを追加しておくと効率よく使用できます。

![](/uploads/2015/09/150912-55f3dc08f2366.png)

#### TweetBot for Twitter

ユーザインタフェースが好みなことと、iPhone でも愛用していることから、Mac でも Twitter クライアントは「TweetBot for Twitter」を使用しています。ブログの記事以外の情報の配信や個人的な書き込みはこれを使用しています。

{{< itunes 557168941 >}}

#### 翻訳タブ

後述の「PopClip」と合わせて使用することで、最強の翻訳アプリに変身します。メニューバーに常駐し、いつでもどこでも快適に翻訳できます。主に海外のブログから情報を収集する際に使用するアプリケーションです。

{{< itunes 458887729 >}}

### アプリケーションのインストール（その他）

次に、Mac App Store からは手に入らないアプリケーションの数々です。

#### Dropbox

MacBook Pro と iMac、iPhone で共有するために、ほとんどすべての情報を「Dropbox」で共有しています。後述するアプリケーションの設定ファイルの共有は非常に便利です。ぜひ試してみてみてください。「Dropbox」については、[1Password Anyware で、会社の PC など 1Password が使えない状況で、パスワード情報にアクセスする方法](/posts/2015/06/1password-anyware-1638/)や、[WordPress のテーマ開発、ブログの執筆作業を効率化する方法のまとめ](/posts/2014/12/efficiency-blog-736/)でもご紹介しています。

https://www.dropbox.com/home

#### TextExpander

さまざまなスニペットを簡単に呼び出すことができる、非常に便利なアプリケーションです。たとえば、「.pp」と入力するだけで`<p></p>`と変換されるようにしています。その他、便利な使い方については、[ブログ執筆時に便利！TextExpander で Safari、Google Chrome から URL、タイトルを瞬時に取得する方法](/posts/2014/12/textexpander-safari-googlechrome-730/)をご参照ください。

https://smilesoftware.com/TextExpander/index.html

「TextExpander」に登録しているスニペットはすべて Dropbox に保管しています。

![](/uploads/2015/09/150912-55f3cafc993d7.png)

2 回目以降インストール時は、「ドロップボックスへのリンク」を選択してください。「ドロップボックスデーターを取り替える」を選択すると、ローカルの初期化されたスニペットが Dropbox に保存されてしまいます。

![](/uploads/2015/09/150912-55f3cafad9ef2.png)

Dock に「TextExpander」のアイコンは不要なので「Hide TextExpander icon in Dock」のチェックは外し、起動時に自動起動するように「Launch at Login」をチェックします。

![](/uploads/2015/09/150912-55f3cafde27d2.png)

#### BetterTouchTool

「BetterTouchTool」を使用すれば、トラックパッドの使い方が無限に広がります。ただし、私はどちらかというと、BetterTouchTool の「Windows Snapping」機能を主に使用しています。画面左端にウインドウを持っていくと画面左半分にウインドウがリサイズされたり、画面上部の真ん中あたりにウインドウを持っていくとフルサイズにリサイズされたりと、非常に便利な機能なのです。

http://www.bettertouchtool.net/

「BetterTouchTool」起動時に表示されるダイアログで、「Yes, activate the window snapping!」をクリックしておきましょう。

![](/uploads/2015/09/150912-55f3dc0b98dd5.png)

また、唯一必ず設定するのが Safari のジェスチャー。二本指で下にスワイプするとウインドウを閉じるようにしています。

![](/uploads/2015/09/150912-55f3dc0da12bf.png)

また、「Launch BetterTouchTool on startup」にチェックを入れて、Mac 起動時に合わせて起動するようにしておくと便利です。

![](/uploads/2015/09/150912-55f3dc134ac35.png)

#### Alfred

言わずと知れた、Mac の最強ランチャーアプリ。これなしでの生活は考えられません。この熱い思いは[Mac ユーザーが恋する必須の神アプリ Alfred を 120%使いこなすための手引](/posts/2014/09/alfred-guidance-181/)で確認してください。

https://www.alfredapp.com/

PowerPack が前提となりますが、Dropbox で同期するようにしておくと、再インストール時に一から設定をし直す必要がなくなります。

![](/uploads/2015/09/150912-55f3dc108de44.png)

#### Transmit

「Transmit」はファイル転送アプリケーションです。主に、ローカルのファイルを、ブログを運営している X サーバにアップロードするために使用しています。ローカルファイルとリモートファイルを同期できるのが非常に便利です。また、同期先をローカルファイル、リモートファイルから選択できるのも、痒いところに手が届いていい感じです。

https://panic.com/jp/transmit/

「Transmit」の設定も「Dropbox」で同期しています。次回以降、サーバの設定をし直す必要がなくなります。

![](/uploads/2015/09/150912-55f3de8d31a13.png)

この同期画面が非常に便利です。変更日、またはサイズで、変更日が新しい方、サイズが異なる場合にファイルを転送して同期できます。

![](/uploads/2015/09/150912-55f3de914e344.png)

#### VirtualBox

後述の Vagrant のため、および Ubuntu の検証に使用しています。

https://www.virtualbox.org/wiki/Downloads

#### Vagrant

Vagrant は、[仮想環境構築ツール「Vagrant」で開発環境を仮想マシン上に自動作成する | OSDN Magazine](https://osdn.jp/magazine/15/02/13/200000)で紹介されているように、仮想環境を簡単に構築することができるツールです。

https://www.vagrantup.com/downloads.html

##### VCCW

VirtualBox と Vagrant を使用して、WordPress の環境を自動で構築できるのが「VCCW」です。公式サイトの案内にしたがってインストールしてください。

http://vccw.cc/

たった 3 行のコマンドで WordPress の環境構築が完了です。

    $ vagrant plugin install vagrant-hostsupdater
    $ cd /path/to/vccw
    $ vagrant up

また、WordPress の本体は Dropbox 上に保存し、MacBook Pro、iMac 間で同期しています。そのため、上記コマンド時に生成される WordPress の保存先を Dropbox に変更しておくと便利です。「VCCW」については、[gulp.js と Browser Sync で快適な WordPress 開発環境を手に入れる](/posts/2014/09/gulp-browser-sync-476/)でもご紹介しています。

    $ ln -s ~/Dropbox/path/to/vccw/www .

また、本番環境から検証環境に WordPress の投稿をインポートする際に、ファイルサイズが 2M を超えるとインポートできません。これは、PHP によるデフォルトの制約です。そこで、仮想マシンにログインして、「php.ini」の設定を変更します。

    $ cd /path/to/vccw
    $ vagrant ssh
    $ sudo vi /etc/php.ini

「File Uploads」の項目のうち、`upload_max_filesize`の値をデフォルトの 2M から 10M 程度に変更しておきます。これで 2M を超えるファイルもインポートすることができるようになります。

    ;;;;;;;;;;;;;;;;
    ; File Uploads ;
    ;;;;;;;;;;;;;;;;

    ; Whether to allow HTTP file uploads.
    file_uploads = On

    ; Temporary directory for HTTP uploaded files (will use system default if not
    ; specified).
    ;upload_tmp_dir =

    ; Maximum allowed size for uploaded files.
    upload_max_filesize = 10M

アップロードのファイルサイズ変更後は Web サーバ（Apache）の再インストールが必要になります。以下のコマンドを実行しておきましょう。

    $ sudo apachectl restart

#### Sublime Text

PHP、HTML、CSS ファイルの編集に欠かせないのがテキストエディター「Sublime Text」。豊富なプラグインのおかげで快適な編集が実現できます。プラグインについては、[Sublime Text に導入しているオススメのプラグイン 23 選](/posts/2014/09/sublime-text-plugin-321/)をご覧ください。

http://www.sublimetext.com/3

Sublime Text に導入しているプラグインも、iMac、MacBook Pro 間で同期したいため、Dropbox を利用しています。Dropbox を利用して同期する場合には、「Sublime Text」のプラグインフォルダーをそのまま Dropbox に作成し、ローカルはショートカットを作成して対応します。以下のコマンドを実行しましょう。

    $ cd ~/Library/Application\ Support/Sublime\ Text\ 3
    $ rm -r Installed\ Packages
    $ rm -r Packages
    $ ln -s ~/Dropbox/Sublime\ Text/Installed\ Packages .
    $ ln -s ~/Dropbox/Sublime\ Text/Packages .

~/Dropbox/Sublime Text/に、「Installed Packages」および「Packages」が保存されている前提です。ショートカットを作成する方法については、[WordPress のテーマ開発、ブログの執筆作業を効率化する方法のまとめ](/posts/2014/12/efficiency-blog-736/)でもご紹介しています。

#### Homebrew

macOS のパッケージ管理ソフトウェアです。これも無くてはならない存在です。ここでは、ブログに使用しているパッケージのみをご紹介します。まず、インストールするためには、以下のコマンドを実行します。

    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Xcode のコマンドライン・デベロッパー・ツールがインストールされていない場合は、以下のダイアログが表示されますので、「インストール」をクリックしてください。

![](/uploads/2015/09/150912-55f3de94095d7.png)

Homebrew については、[Mac でプレゼン資料に数式を貼り付けるのに便利な「LaTeXiT」](/posts/2014/09/mac-latex-presentation-92/)でもご紹介しています。

##### pngquant

PNG ファイルを圧縮してくれるツールです。以下のコマンドを実行してインストールします。

    $ brew install pngquant

基本的な使い方は、`pngquant --force /path/to/pngfile.png`です。ワイルドカード（\*）指定、範囲指定（[1-10]）のような使い方もできます。PNG ファイルのサイズを大幅に削減してくれるツールのため、macOS や iPhone のスクリーンショットをブログにアップする際は必須のツールです。

##### jpegoptim

JPEG ファイルを圧縮してくれるツールです。以下のコマンドを実行してインストールします。

    $ brew install jpegoptim

基本的な使い方は、`jpegoptim -s -m80 /path/to/jpegfile.jpg`です。「-m」パラメーターは、オリジナルファイルと比較してどの程度の画質に落とすか、を指定します。これまでの経験上、80%程度が画質を落とすことなく、ファイルサイズを大幅に減らしてくれる値です。

「pngquant」「jpegoptim」については、[WordPress のサイト表示速度を高速化させるために行っている施策まとめ](/posts/2015/06/improve-page-speed-1737/)でも詳しくご紹介していますので、そちらも参照してください。

#### MarsEdit

いよいよ大詰め、「MarsEdit」です。Mac でブログをかくならコレ、というくらい定番のブログエディターです。

https://red-sweater.com/marsedit/

エディターの設定がデフォルトでは文字が小さいため、フォントとそのサイズを変更して使用しています。

![](/uploads/2015/09/150912-55f3de95ea3a1.png)

「Image Size」はオリジナルのサイズにしたいため「Defaults To Full Size」（実際は、CSS でサイズを制御）にしています。また、誤って書きかけの原稿を公開してしまわないように、デフォルトの「Post Status」は「Draft」（下書き）にしています。

![](/uploads/2015/09/150912-55f3de98600d0.png)

弊ブログでは、パーマリンクを「/%postname%-%post_id%/」にしているため、「%postname%」を決める「Slug Field」を表示するようにしています。

![](/uploads/2015/09/150912-55f3de9a3de00.png)

その他、MarsEdit については、[WordPress のテーマ開発、ブログの執筆作業を効率化する方法のまとめ](/posts/2014/12/efficiency-blog-736/)、[MarsEdit をより便利に高速に活用するためのスクリプト集](/posts/2014/12/marsedit-script-619/)、[WordPress の過去記事参照に！Alfred から記事を検索して MarsEdit に貼り付けられる「Paste link for MarsEdit with Alfred」](/posts/2015/08/paste-link-for-marsedit-with-alfred-2174/)など、さまざまな記事でご紹介していますので、そちらもご参照ください。

## まとめ

駆け足でお伝えしましたが、その他にも[はじめての gulp.js！Mac で CSS ファイル、JavaScript の圧縮を行おう](/posts/2014/09/gulp-css-sass-268/)で、さまざまなタスクを自動化したり、とその他にも工夫できる点はさまざまです。あなたならではの初期構築設定のやり方をぜひ教えてくださいね。
