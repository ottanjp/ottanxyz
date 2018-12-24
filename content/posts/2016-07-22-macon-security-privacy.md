---
author: ottan
date: 2016-07-22 11:34:44+00:00
draft: false
title: 使用しているmacOSのセキュリティ強化、プライバシー保護が設定されているかどうかを自動的にチェックする
type: post
url: /macon-security-privacy-4664/
categories:
- Mac
tags:
- Security
---

![](/images/2016/07/160720-578f7bf197795.jpg)






簡単なスクリプトを使用して、macOSのセキュリティレベルの強化、およびプライバシー保護を行うことができるツールがGitHubで公開されていたのでご紹介します。





## osx-config-check





osx-config-checkは、Python言語で書かれた、macOSのセキュリティ強化、プライバシー保護を目的としたチェック、および補正ツールです。GitHubでオープンソースで公開されています。



https://github.com/kristovatlas/osx-config-check



### 実行方法





ターミナルから以下のコマンドを実行します。




    
    $ git clone https://github.com/kristovatlas/osx-config-check
    $ cd osx-config-check
    $ python app.py 





### チェックリスト





osx-config-checkでは、macOSのシステム全体、Safari、メール、Google Chromeのセキュリティをチェックできます。以下に、記事執筆時点でチェックできる項目を簡単にご紹介します。チェックリストはカスタマイズできます。後述します。





#### システム





**CHECK #1: The System Preferences application is currently closed**





「システム環境設定」が起動していないこと。以降のチェックを実施するために、事前に「システム環境設定」がクローズされている必要があります。





**CHECK #2: Current user is a non-admin account**





現在使用中のユーザが、管理者権限を保有していないこと。「システム環境設定」→「ユーザとグループ」から「このコンピューターの管理を許可」のチェックをオフにすることで、管理者権限を破棄できます。管理者権限を保有したユーザの場合、ユーザを乗っ取られると、macOSの環境変更を行われる可能性が有ります。





まあ、普段使用する分には、無視しても構わないでしょう。管理者権限を保有していないと色々不便です。





**CHECK #3: The OSX application firewall is enabled (system-wide)**





システム全体で、ファイアウォールが有効になっていること。これは、ぜひ有効にしておくことをオススメします。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「ファイアウォール」から。





**CHECK #4: The OSX application firewall is enabled (current user only)**





現在のユーザーで、ファイアウォールが有効になっていること。こちらも、ぜひ有効にしておくことをオススメします。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「ファイアウォール」から。





**CHECK #5: A password is required to wake the computer from sleep or screen saver (system-wide)**





システム全体で、スリープ状態やスクリーンセーバーからの復帰時に、ログインパスワードの入力が求められること。こちらも基本ですね。有効化しておきましょう。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「一般」から。





**CHECK #6: A password is required to wake the computer from sleep or screen saver (current user only)**





現在のユーザーで、スリープ状態やスクリーンセーバーからの復帰時に、ログインパスワードの入力が求められること。こちらも基本ですね。有効化しておきましょう。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「一般」から。





**CHECK #7: There is no delay between starting the screen saver and locking the machine (system-wide)**





システム全体で、スリープとスクリーンセーバーの解除に、パスワードの要求が即時に求められること。これも有効化しておくと良いでしょう。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「一般」から。





**CHECK #8: There is no delay between starting the screen saver and locking the machine (current user only)**





現在のユーザで、スリープとスクリーンセーバーの解除に、パスワードの要求が即時に求められること。これも有効化しておくと良いでしょう。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「一般」から。





**CHECK #9: Logging is enabled for the operating system**





ファイアウォールのロギングが有効になっていること。ファイアウォールを有効化した場合は、デフォルトで有効になっているはず。不審な通信の遮断ログ等が確認できるようになります。





**CHECK #10: Homebrew analytics are disabled**





Homebrewの統計情報収集が無効化されていること。[Homebrew — macOS 用パッケージマネージャー](http://brew.sh/index_ja.html)では、以前のアップデートで、Google Analyticsを使用した統計情報（使用者のIPアドレス、使用しているパッケージ等）を収集するようになりました。情報を収集されたくない場合は、設定を有効化しておきます。



http://rcmdnk.github.io/blog/2016/04/28/computer-mac-homebrew/



デフォルトでは、`~/.profile`に統計情報収集を無効化する環境変数を設定するようになっていますが、以下のコマンドの方が確実です。




    
    $ brew analytics off





**CHECK #11: Stealth mode is enabled for OSX: Computer does not respond to ICMP ping requests or connection attempts from a closed TCP/UDP port. (system-wide)**





システム全体で、ステルスモードが有効になっていること。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「ファイアウォール」→「ファイアウォールオプション」から。





**CHECK #12:  Stealth mode is enabled for OSX: Computer does not respond to ICMP ping requests or connection attempts from a closed TCP/UDP port. (current user only)**





現在のユーザで、ステルスモードが有効になっていること。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「ファイアウォール」→「ファイアウォールオプション」から。





**CHECK #13: Automatic whitelisting of Apple-signed applications for firewall is disabled (system-wide)**





システム全体で、「署名されたソフトウェアが外部からの接続を受け入れるのを自動的に許可」がオフになっていること。詳細は、ステルスモードと同様。





**CHECK #14: Automatic whitelisting of Apple-signed applications for firewall is disabled (current user only)**





現在のユーザで、「署名されたソフトウェアが外部からの接続を受け入れるのを自動的に許可」がオフになっていること。詳細は、ステルスモードと同様。





**CHECK #15: Captive portal for connecting to new networks is disabled to prevent MITM attacks**





中間者攻撃（Man-In-The-Middle attack）の温床となる、「Captive portal」がオフになっていること。「Captive Portal」については、下記のサイト参照。



https://www.designet.co.jp/faq/term/?id=Q2FwdGl2ZSBQb3J0YWw



**CHECK #16: OpenSSL is up-to-date**





OpenSSLが最新化されていること。最新化されていない場合は、Homebrewによりアップデートされます。





**CHECK #17: Hidden files are displayed in Finder**





隠しファイルが、Finderで表示できるようになっていること。個人的には、デフォルト（表示しない）状態で良いのではと思います。不用意に隠しファイルに触れてしまうよりは…。





**CHECK #18: All application software is currently up to date**





Mac App Storeから入手可能なソフトウェアがすべて最新化されていること。





**CHECK #19: Automatic check for software updates is enabled**





Mac App Storeから入手可能なソフトウェアのアップデートが自動的に実行されること。詳細は、「システム環境設定」→「App Store」から。





**CHECK #20: GateKeeper protection against untrusted applications is enabled**





ゲートキーパーの設定で、Mac App Storeと確認済みの開発元からのアプリケーションのみ実行が許可されているようになっていること。有効になっている場合も、それ以外のアプリケーションの実行は、随時、コンテキストメニュー（右クリック）から「開く」で実行できます。





**CHECK #21: Bluetooth is disabled**





Bluetoothが無効化されていること。そこまでやる必要はないような…。





**CHECK #22: The infrared receiver is disabled**





赤外線による送受信が無効化されていること。赤外線による送受信なんて今時使用しないでしょうから、無効化しておきましょう。





**CHECK #23: AirDrop file sharing is disabled**





AirDropが無効化されていること。そこまでやる必要はないような…。





**CHECK #24: File sharing is disabled**





ファイル共有が無効化されていること。他の機器とファイルを共有しないのであれば、オフで構わないでしょう。詳細は、「システム環境設定」→「共有」から。





**CHECK #25: Printer sharing is disabled**





プリンター共有が無効化されていること。他の機器とプリンターを共有しないのであれば、オフで構わないでしょう。詳細は、「システム環境設定」→「共有」から。





**CHECK #26: Remote login is disabled**





MacへのSSHによるリモートログインが許可されていないこと。外部から操作する必要がないのであれば、オフで構わないでしょう。詳細は、「システム環境設定」→「共有」から。





**CHECK #27: Remote Management is disabled**





Apple Remote Desktopによる、他の機器からのコンピューターへのアクセスが無効化されていること。使用していないのであれば、こちらもオフで。詳細は、「システム環境設定」→「共有」から。





**CHECK #28: Remote Apple events are disabled**





他のMacからこのコンピューターへの「Apple Events」の送信が許可されていないこと。使用していないのであれば、こちらもオフで。詳細は、「システム環境設定」→「共有」から。





**CHECK #29: Internet Sharing is disabled on all network interfaces**





インターネット共有がオフになっていること。使用していないのであれば、こちらもオフで。詳細は、「システム環境設定」→「共有」から。





**CHECK #30: Wake on Network Access feature is disabled**





ネットワークアクセスによるスリープ解除が無効化されていること。リモートからスリープしている機器を起こして、操作する要件がないのであれば、こちらもオフで。機器により操作方法が異なりますが、詳細は「システム環境設定」→「省エネルギー」から。





**CHECK #31: Automatic setting of time and date is disabled**





時刻同期がオフになっていること。そこまでやる必要はないような…。ntpdの脆弱性を気にしてのことでしょうか。詳細は、「システム環境設定」→「日付と時刻」から。





**CHECK #32: IPv6 is disabled on all network interfaces**





IPv6がすべてのネットワークインタフェースで無効化されていること。IPv6は、いつになったらIPv4にとって変わるのでしょうか。Googleの統計によると、IPv6は、ネットワークトラフィック全体の10%程度に過ぎないようです。





**CHECK #33: An administrator password is required to change system-wide preferences**





「システム全体の環境設定にアクセスするときに管理者パスワードを要求」がオンになっていること。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「詳細」から。デフォルトではオフですが、オンで良いでしょう。





**CHECK #34: Documents are not stored to iCloud Drive by default. (May be mistaken if iCloud is disabled)**





ドキュメントの保存先がiCloudではなくローカルであること。macOS標準のアプリケーション（たとえば、テキストエディット.app）のデフォルトの保存先が、いつからかデフォルトでiCloud担っていますが、設定によりローカルを優先できます。デフォルトではiCloudですが、利便性の観点から私は無効化しています。





**CHECK #35: The File Vault key is destroyed when going to standby mode**





ストレージの暗号化機能である「FileVault」の復旧キーを、スタンバイモード移行時に破棄する設定になっていること。デフォルトでは、「FileVault」の復旧キーは、EFI（ファームウェア）上に暗号化されて保存されています。そのため、スタンバイモードからの復旧時に速やかに復旧できますが、この設定を有効化することで、毎回復旧キーを入力し暗号化を解除する必要が出てくるようになります。究極のセキュリティを求めるあなたに。





**CHECK #36: The system will store a copy of memory to persistent storage, and will remove power to memory**





スリープ状態に移行するとき、メモリの状態をストレージに保存し、メモリの内容が解放されていること。この設定を有効化しておくことにより、スリープ状態に移行するとき、メモリが解放されます。ただし、一般的にスリープ状態から復帰するのに時間を要するようになります。





**CHECK #37: git is up to date or is not installed**





gitが最新化されていること。最新化されていない場合は、Homebrewによりアップデートされます。





**CHECK #38: Apple Push Notifications are disabled**





「Apple Push Notifications Service」（aped）が無効化されていること。通知センターが無効化されるわけではありません。あくまで、プッシュ通知が無効化されるだけです。





**CHECK #39: Google DNS servers are used by default on all network interfaces**





Googleが提供するパブリックDNSサーバが、すべてのネットワークインタフェースで設定されていること。そこまでやらなくていいような…。Google一押しなんでしょうか。何も問題がなければ、DNSはインターネット接続サービスプロバイダーが提供するDNSサーバを指定することで問題ないと思われます。





**CHECK #40: The curl utility is up to date or absent from the syste**





curlが最新化されていること。最新化されていない場合は、Homebrewによりアップデートされます。





**CHECK #41: FileVault file system encryption is enabled**





FileVaultが有効化されていること。詳細は、「システム環境設定」→「セキュリティとプライバシー」→「FileVault」から。





**CHECK #42: FileVault file system encryption is enabled at the root directory**





FileVaultがルートディレクトリで有効になっていること。デフォルトで有効になっています。





**CHECK #43: The idle timer for screen saver activation is set to 10 minutes or less**





アイドル状態が10分以上続いた場合に、スクリーンセーバーが起動すること。





#### Safari





**CHECK #44: The Safari application is currently closed**





Safariが起動していないこと。以降のチェックを実施するために、事前にSafariがクローズされている必要があります。





**CHECK #45: Safari will not auto-fill credit card data**





Safariで、自動入力の対象にクレジットカード情報が含まれないこと。Safariの環境設定を開き、「自動入力」から無効化できます。自動入力の対象となっている場合、クレジットカード番号がWebフォームに自動入力されます。





**CHECK #46: Safari will not auto-fill your contact data**





Safariで、自動入力の対象に連絡先情報が含まれないこと。Safariの環境設定を開き、「自動入力」から無効化できます。





**CHECK #47: Safari will not auto-fill miscellaneous forms**





Safariで、自動入力の対象にその他のフォームが含まれないこと。Safariの環境設定を開き、「自動入力」から無効化できます。





**CHECK #48: Safari will not auto-fill usernames or passwords**





Safariで、自動入力の対象にユーザとパスワードが含まれないこと。Safariの環境設定を開き、「自動入力」から無効化できます。





**CHECK #49: Files downloaded in Safari are not automatically opened**





Safariでダウンロードしたファイルが自動的に実行されないこと。Safariの環境設定を開き、「一般」の「ダウンロード後、"安全な"ファイルを開く」で設定できます。無効化しておくと良いでしょう。





**CHECK #50: Cookies and local storage are always blocked in Safari**





CookieがすべてのWebサイトでブロックされること。Safariの環境設定を開き、「プライバシー」の「CookieとWebサイトのデータ」で設定できます。そこまでやらなくていいような…。





**CHECK #51: Safari extensions are disabled**





Safariの拡張機能が無効化されていること。そこまでやらなくていいような…。





**CHECK #52: The Safari web browser will warn when visiting known fraudulent websites**





Safariで詐欺サイトにアクセスした時、警告が表示されること。Safariの環境設定を開き、「セキュリティ」で設定できます。デフォルトで有効になっているはず。





**CHECK #53: JavaScript disabled in the Safari web browser**





SafariでJavaScriptが無効化されていること。そこまでやらなくていいような…。





**CHECK #54: JavaScript disabled in the Safari web browser (Legacy version)**





古いバージョンのSafariでJavaScriptが無効化されていること。そこまでやらなくていいような…。





**CHECK #55: Pop-up windows are blocked in the Safari web browser**





Safariでポップアップウインドウをブロックする設定になっていること。Safariの環境設定を開き、「セキュリティ」で設定できます。デフォルトで有効になっているはず。





**CHECK #56: Pop-up windows are blocked in the Safari web browser (Legacy version)**





古いバージョンのSafariでポップアップウインドウをブロックする設定になっていること。Safariの環境設定を開き、「セキュリティ」で設定できます。デフォルトで有効になっているはず。





**CHECK #57: The WebGL plug-in is disabled in the Safari web browser**





SafariでWebGLプラグインが無効化されていること。Safariの環境設定を開き、「セキュリティ」で設定できます。これは好みかなあ。





**CHECK #58: Plug-ins are disabled in the Safari web browser**





Safariでプラグインが無効化されていること。Adobe Flashや、Microsoft Silverlightなどが該当します。不要なプラグインは無効化しておきましょう。Safariの環境設定を開き、「セキュリティ」で設定できます。





**CHECK #59: Plug-ins are disabled in the Safari web browser (Legacy version)**





古いバージョンのSafariでプラグインが無効化されていること。Adobe Flashや、Microsoft Silverlightなどが該当します。不要なプラグインは無効化しておきましょう。Safariの環境設定を開き、「セキュリティ」で設定できます。





**CHECK #60: Plug-ins are blocked by default in the Safari web browser unless a site is explicitly added to a list of allowed sites**





Safariで許可されたサイト以外でプラグインの実行が許可されていないこと。Safariの環境設定を開き、「セキュリティ」→「インターネットプラグイン」→「プラグイン設定」→「ほかのWebサイトにアクセスしたとき」で設定できます。拒否にしておくと良いでしょう。





**CHECK #61: The Java plug-in for Safari web browser is blocked unless a site is explicitly added to a list of allowed sites**





Safariで許可されたサイト以外でJavaプラグインの実行が許可されていないこと。Safariの環境設定を開き、「セキュリティ」→「インターネットプラグイン」→「プラグイン設定」で設定できます。拒否にしておくと良いでしょう。





**CHECK #62: The Java plug-in is disabled in the Safari web browser**





SafariでJavaプラグインが無効化されていること。Javaプラグインを使用しているWebサイトは数多くありません。無効化しておくと良いでしょう。





**CHECK #63: The Java plug-in is disabled in the Safari web browser (Legacy version)**





古いバージョンのSafariでJavaプラグインが無効化されていること。Javaプラグインを使用しているWebサイトは数多くありません。無効化しておくと良いでしょう。





**CHECK #64: The Safari web browser is configured to treat SHA-1 certificates as insecure**





SafariがSHA-1で署名された証明書を適切に処理するように設定されていること。SHA-1は一昔前のアルゴリズムです。SHA-2に移行しましょう。SHA-1の証明書は無効化しておきましょう。Safariの環境設定を開き、「詳細」タブで「メニューバーに"開発"メニューを表示」をチェックした上で、「開発」→「SHA-1証明書を安全でないとみなす」でチェックできます。





**CHECK #65: The Safari web browser will not pre-load webpages that rank highly as search matches**





Safariで「バックグラウンドでトップヒットを事前に読み込む」がオフであること。ブックマークと閲覧履歴から、よく読み込まれているWebページの内容を事前に読み込む、Safariによる検索を早めるための技術ですが、悪用された場合、予期せぬコードが実行される可能性が有ります。Safariの環境設定を開き、「検索」で設定できます。





**CHECK #66: The Safari web browser will not include search engine suggestions for text typed in the location bar**





Safariで検索エンジンに対して、入力した内容に基づいた候補の表示の要求が無効化されていること。有効になっている場合、検索エンジン側に検索語句が記録される可能性があります。Safariの環境設定を開き、「検索」で設定できます。





**CHECK #67: The Safari web browser's search suggestions are disabled**





Safariでスマートフィールドへの検索語句入力時に、ニュース、Wikipediaの記事、株価などの情報が表示されないようになっていること。Safariの環境設定を開き、「検索」→「Safariの検索候補を含める」で設定できます。





**CHECK #68: The Safari web browser uses the Do-Not-Track HTTP header**





SafariでWebサイトによるトラッキング（追跡型広告などで使用されます）を無効化していること。Safariの環境設定を開き、「プライバシー」→「Webサイトによるトラッキング」で設定できます。





**CHECK #69: PDF viewing is disabled in the Safari web browser**





SafariでPDFファイルのプレビューが無効化されていること。





**CHECK #70: Full website addresses are disabled in the location bar of the Safari web browser**





SafariでアドレスバーにWebサイトの完全なアドレスが表示されること。デフォルトでは、アドレスバーにドメインのみ表示されますが、詐欺サイトなどを防ぐため完全なアドレスを表示しておくと良いでしょう。Safariの環境設定を開き、「詳細」→「スマート検索フィールド」→「Webサイトの完全なアドレスを表示」で設定できます。





#### メール





**CHECK #71: The Mail application is currently closed**





メールが起動されていないこと。以降のチェックを実施するために、事前にメールがクローズされている必要があります。





**CHECK #72: Apple Mail does not automatically load remote content in e-mails**





メールで、メッセージ内のリモートコンテンツが自動で読み込まれないようになっていること。メールの環境設定を開き、「表示」→「メッセージ内のリモートコンテンツを表示」で設定できます。セキュリティを強化するために無効化できます。デフォルトでは有効化されています。





**CHECK #73: Mail identified by Apple Mail as junk is sent to the Junk mailbox**





メールで、迷惑メールが迷惑メールフォルダーに振り分けされるようになっていること。メールアプリで迷惑メールと判断されたメールは、デフォルトでは受信トレイに残されます。メールの環境設定を開き、「迷惑メール」で設定できます。





**CHECK #74: New e-mails composed in Apple Mail are encrypted by GPGMail if the receiver's PGP is present in the keychain**





GPGMailと呼ばれるメールのプラグインにより、メールが暗号化されていること。このプラグインは使用していないのでわかりません。すみません。





**CHECK #75: New e-mails composed in Apple Mail and saved as drafts are encrypted by GPGMail**





同上。





**CHECK #76: New e-mails composed in Apple Mail are signed by GPGMail**





同上。





**CHECK #77: Apple Mail with automatically check for updates to GPGMail**





同上。





#### Google Chrome





**CHECK #78: The Google Chrome browser is currently closed**





Google Chromeが起動されていないこと。以降のチェックを実施するために、事前にGoogle Chromeがクローズされている必要があります。





**CHECK #79: All Google Chrome web browser profiles prevent information leakage through navigation errors**





Google Chromeで、「ウェブサービスを使用してナビゲーション エラーの解決を支援する」が無効化されていること。デフォルトで無効化されています。





<blockquote>ウェブページに接続できない場合に、アクセスしようとしているページと似たページの候補を表示できます。候補の表示にあたっては、アクセスしようとしているページのウェブアドレスが Chrome から Google に送信されます。</blockquote>





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」から設定できます。





**CHECK #80: All Google Chrome web browser profiles prevent information leakage through URL suggestions**





Google Chromeで、「予測サービスを使用して、アドレスバーまたはアプリ ランチャーの検索ボックスに入力した検索キーワードや URL を補完する」が無効化されていること。デフォルトで無効化されています。





<blockquote>関連するウェブ検索、閲覧履歴、アクセス数の多いウェブサイトに基づいて候補が表示されます。既定の検索エンジンで候補表示サービスが提供される場合は、アドレスバーに入力したテキストがブラウザから検索エンジンに送信される可能性があります</blockquote>





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」から設定できます。





**CHECK #81: All Google Chrome web browser profiles prevent information leakage through network prediction**





Google Chromeで、「予測サービスを使用してページをより迅速に読み込む」が無効化されていること。デフォルトで無効化されています。





<blockquote>ブラウザではウェブページの読み込みに IP アドレスが使用されます。ウェブページにアクセスすると、Chrome ではそのページにあるすべてのリンクの IP アドレスが確認され、次にクリックされる可能性のあるリンクが読み込まれます。この設定を有効にすると、事前読み込みが行われたウェブサイトとそこに埋め込まれているコンテンツによって Cookie が設定される可能性があります。つまり、サイトにアクセスしなくても、次回その Cookie が読み取られ、以前アクセスがあったと認識される可能性があります。</blockquote>





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」から設定できます。





**CHECK #82: All Google Chrome web browser profiles prevent information leakage through report security incidents to Google**





Google Chromeで、「セキュリティに関する事象についての詳細を Google に自動送信する」が無効化されていること。デフォルトで無効化されています。





<blockquote>このチェックボックスをオンにすると、Chrome で不審なダウンロードやウェブサイトが検出されるたびにデータが Google に送信されます。</blockquote>





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」から設定できます。





**CHECK #83: All Google Chrome web browser profiles have Google Safe Browsing enabled**





Google Chromeで「危険なサイトやファイルからユーザーとデバイスを保護する」が有効化されていること。デフォルトで有効化されています。





<blockquote>害を及ぼすおそれがあるウェブサイトにアクセスしようとしていることが Chrome で検知されたときに、すぐにアラートを表示します。ウェブページにアクセスする際、Chrome ではユーザーのパソコンに保存されている既知の不正ウェブサイトのリストとの照合が行われます。ウェブサイトがリストに含まれている場合は、危険なサイトかどうかを判定するために、アドレスの一部がブラウザから Google に送信されます。</blockquote>





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」から設定できます。





**CHECK #84: All Google Chrome web browser profiles prevent information leakage through spell-checking network services**





Google Chromeで「ウェブサービスを使用してスペルミスの解決を支援する」が無効化されていること。デフォルトで無効化されています。





<blockquote>Google 検索と同じスペルチェック技術を Chrome で使用します。この場合、ユーザーが入力したテキストが Chrome から Google のサーバーに送信されます。</blockquote>





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」から設定できます。





**CHECK #85: All Google Chrome web browser profiles prevent information leakage through reporting usage statistics to Google**





Google Chromeで「使用統計データや障害レポートを自動的に Google に送信する」が無効化されていること。デフォルトで無効化されています。





<blockquote>Chrome で使用統計データと障害レポートを Google に自動送信するよう設定し、サービスの向上にご協力ください。Google ではお送りいただいた情報を参考に、優先順位の高いものから開発と改善を行っていきます</blockquote>





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」から設定できます。





**CHECK #86: All Google Chrome web browser profiles use the Do-Not-Track HTTP header**





Google Chromeで「閲覧トラフィックと一緒に「トラッキング拒否」リクエストを送信する」が有効化されていること。デフォルトでは無効化されています。





<blockquote>閲覧トラフィックと一緒に「トラッキング拒否」リクエストを送信できます。しかし多くのウェブサイトでは、このリクエストを送信しても、セキュリティの強化や、ウェブサイトでのコンテンツ、サービス、広告、オススメ情報の表示、レポートの統計情報の作成などの目的で、ユーザーの閲覧データが収集、使用されるのが現状です。</blockquote>





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」から設定できます。完全ではありませんが、設定しておくに越したことはありません。





**CHECK #87: All Google Chrome web browser profiles prevent pop-ups**





Google Chromeで「すべてのサイトのポップアップを許可しない」が有効化されていること。デフォルトで有効化されています。





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」→「コンテンツの設定」から設定できます。





**CHECK #88: All Google Chrome web browser profiles prevent geolocation by websites**





Google Chromeで「すべてのサイトに対して自分の物理的な現在地の追跡を許可しない」が有効化されていること。デフォルトで無効化されています。





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」→「コンテンツの設定」から設定できます。





**CHECK #89: All Google Chrome web browser profiles block unsandboxed plug-in software**





Google Chromeで、サンドボックス化されていない（Google Chromeに組み込まれていない）プラグインを実行する場合に、「すべてのサイトに対し、プラグインを使用してパソコンにアクセスすることを禁止する」が有効化されていること。デフォルトで無効化されています。





Google Chromeの環境設定を開き、「詳細設定を表示」→「プライバシー」→「コンテンツの設定」から設定できます。





**CHECK #90: All Google Chrome web browser profiles prevent filling personal information into forms automatically**





Google Chromeで「ワンクリックでのウェブフォームへの自動入力を有効にする」が無効化されていること。





Google Chromeの環境設定を開き、「詳細設定を表示」→「パスワードとフォーム」から設定できます。





**CHECK #91: All Google Chrome web browser profiles have disabled Password Manager**





Google Chromeで「パスワードの保存を確認する」が無効化されていること。ブラウザにパスワードを保存するのはやめて、専用のソフトウェアを使用しましょう。





Google Chromeの環境設定を開き、「詳細設定を表示」→「パスワードとフォーム」から設定できます。





**CHECK #92: All Google Chrome web browser profiles have disabled automatic sign-in for stored passwords**





Google Chromeで自動ログインが無効化されていること。デフォルトでは有効化されています。





Google Chromeの環境設定を開き、「詳細設定を表示」→「パスワードとフォーム」→「パスワードの保存を確認する」→「パスワードを管理」から設定できます。





**CHECK #93: All Google Chrome web browser profiles have disabled Google CloudPrint**





Google ChromeでGoogleクラウドプリントが無効化されていること。





Google Chromeの環境設定を開き、「詳細設定を表示」→「Googleクラウドプリント」から設定できます。





**CHECK #94: All Google Chrome web browser profiles have disabled Flash cookies**





Google Chromeで、Adobe Flash Playerがローカルデータを保持することを禁止していること。





**CHECK #95: All Google Chrome web browser profiles have disabled the Chrome Pepper Flash Player plug-in**





Google Chromeで、組み込みのAdobe Flash Playerが無効化されていること。無効化しておきましょう。





**CHECK #96: All Google Chrome web browser profiles have disabled the Adobe Shockwave Flash plug-in**





Google Chromeで、Adobe Flash Playerが無効化されていること。無効化しておきましょう。





**CHECK #97: All Google Chrome web browser profiles have disabled the Adobe Flash Player plug-in**





Google Chromeで、Adobe Flash Playerが無効化されていること。無効化しておきましょう。





**CHECK #98: All Google Chrome web browser profiles have disabled the Native Client plug-in**





Google Chromeで、Native Clientプラグインが無効化されていること。よく分からない。





**CHECK #99: All Google Chrome web browser profiles have disabled the Widevine Content Decryption Module plug-in**





Google Chromeで、Widevine Content Decryption Moduleプラグインが無効化されていること。よく分からない。





**CHECK #100: All Google Chrome web browser profiles have enabled the uBlock Origin extension**





Google Chromeで、uBlock Origin拡張機能が有効化されていること。これは好みかな？uBlock Originは、広告のみならず不要なコンテンツをブロックして、CPUやメモリ使用率を抑えます。





<blockquote>効率的なブロッカー：コンピューターのメモリとCPUのフットプリントはより少なく、別の人気のブロッカーよりも何千ものフィルターをロードし、強制的にブロックができます</blockquote>



https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=ja



**CHECK #101: All Google Chrome web browser profiles have enabled the Ghostery extension**





Google Chromeで、Ghostery拡張機能が有効化されていること。





<blockquote>Ghostery は、Facebook や Google、その他500以上の広告ネットワーク、行動データプロバイダー、ウェブパブリッシャーなど、あなたの行動様式に関心のあるあらゆる企業が設置したウェブページ上の｢見えない」ウェブを見つけ、トラッカーやウェブバグ、ピクセル、そしてビーコンなどを検出します。 管理 Ghostery では、不審な企業からのスクリプトや、画像、オブジェクト、フレーム付きドキュメントなどをブロックします。</blockquote>



https://chrome.google.com/webstore/detail/ghostery/mlomiejdfkolichcflejclcbmpeaniij/related?hl=ja



**CHECK #102: All Google Chrome web browser profiles have enabled the ScriptSafe extension**





Google Chromeで、ScriptSafe拡張機能が有効化されていること。



https://chrome.google.com/webstore/detail/scriptsafe/oiigbmnaadbkfbmpbfijlflahbdbdgdf



**CHECK #103: Google Chrome is the default web browser**





Google Chromeがデフォルトブラウザに設定されていること。Safariは無視ですね。





### カスタマイズ





チェックリスト、およびチェックする方法、修正する方法、画面に表示する内容は、コンフィグファイルを編集することで、自分好みにアレンジできます。コンフィグファイルの正体は、`osx-config.hjson`です。Human JSONと呼ばれる、人間に読みやすいJSONを拡張したフォーマットで書かれています。カスタマイズ方法は、このファイル内に詳細に記述されていますので、ここでは割愛します。





## まとめ





デフォルトの設定では、少しやりすぎな感もありますが、これを機にセキュリティ強化、プライバシー保護を意識してみてはいかがでしょうか。
