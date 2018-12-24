---
author: ottan
date: 2018-05-13 12:32:39+00:00
draft: false
title: Windows Server上のIISでPHPアプリケーションを動作させる際の落とし穴と対策
type: post
url: /windows-server-iis-php-laravel-6739/
categories:
- Windows
tags:
- IIS
- PHP
- Windows Server
---

![](/images/2018/05/180507-5af048016ef56.jpg)






普段はインフラ構築系の業務がメインですが、ここ数日、珍しくフロントエンド系の開発（Webアプリケーションの開発）の仕事をしています。業務で使用するミドルウェアの制約上、Windows Server上のIIS（Internet Information Service）で動作させる（厳密には、ミドルウェアが動作するWindows Serverと、フロント周りのWebサーバは分割可能なのですが、とりあえずリソースを分割して使用するほどの金銭面の余裕や、性能は求められないので、今回は単純にすべて同一のIIS上に構築します）、言語はPHP（厳密には…割愛）である必要があるのですが、しばらくそういった業務から離れていた事もあり、またWindows Serverというよりも、IISに想像以上に触れていなかった事もあり、ありとあらゆる場面でハマったため、環境構築のメモを残しておきます。





今回の目標は、IIS+PHP+Laravel（PHPフレームワーク）のデフォルト画面が表示されることです。なお、環境はWindows Server 2012 R2（IIS 8.5）、PHPは7.2.x、Laravelは5.5です。バージョンによって差異がある可能性があります。





## IISでPHPアプリケーションが動作するようになるまで





### 役割と機能の追加





まずは、サーバーマネージャーから、IISをインストールします。その際に、PHPをCGIとして動作させるためのモジュールであるCGIを忘れないようにインストールしましょう。CGIは、「アプリケーションと開発」の中にあります。ここで、CGIをインストールし忘れると、IISのハンドラーマッピングの際に、「FastCGIModule」が選択できません。なお、役割と機能の追加のみであれば、インストールディスクやISOファイルは不要です。





![](/images/2018/05/180513-5af80c454d3ca.png)






![](/images/2018/05/180513-5af80c4e50ecf.png)






### IIS Rewrite Module 2.0のインストール





WordPressでも使用されているURL書き換え機能。Apacheの「mod_rewrite」モジュールが該当します。たとえば、WordPressでは、URLの末尾に記事のIDのパラメーターを付与することで記事を単独表示させる事ができます。




    
    変更前：https://localhost/wordpress/?p=1
    変更後：https://localhost/wordpress/1/





Apacheの場合、インストール時に設定を変更する事で、自動的にセットアップされますが、IIS単独では動作しません（Windows Server 2012 R2に付属するIIS 8.5の場合）。別途、IIS Rewrite Module 2.0をインストールする必要があります。ダウンロードは、[Download Microsoft URL Rewrite Module 2.0 for IIS 7 (x64) from Official Microsoft Download Center](https://www.microsoft.com/ja-jp/download/details.aspx?id=7435)から行います。「for IIS 7」とありますが、IIS 7以降であれば動作します。URLの置き換えを行いたい場合は、事前にモジュールをインストールしておく必要がありますのでご注意ください。インストール自体は、ダウンロードしたインストーラーを起動するだけです。





![](/images/2018/05/180513-5af80cdf7b9c9.png)






### PHPのインストール





Macの場合、デフォルトでPHPがインストールされていますが、インストールされていない場合においても、Homebrewさえ用意されれば、下記のコマンド一発でインストール可能ですが、Windowsの場合、そうはいきません。別途、[PHP For Windows: Binaries and sources Releases](https://windows.php.net/download#php-7.2)からダウンロードする必要があります。




    
    brew install php





Windows Server 2012 R2は、64bit版ですので、「x64 Non Thread Safe」のZIPファイルをダウンロードします。WindowsのIISでPHPをどう察させたい場合は、IISの制約上、Non Thread Safe版を選択するようにしてください。（Thread Safe版もありますが、Windows上のApacheなど他のWebサーバで動作させたい場合にダウンロードします）





![](/images/2018/05/180513-5af80d5046fb5.png)






ダウンロードしたZIPファイルはそのまま展開し、`C:¥php`に移動しておきます。展開先はどこでも構いませんが、慣例的にシステムドライブ直下の`php`フォルダーに配置することが多いようです。また、「スタート」を「右クリック」→「システム」→「システムの詳細設定」からシステム環境変数の「PATH」の末尾に上記のディレクトリを追加しておきます。システム環境変数に追加後、コマンドプロンプトを開き、以下のコマンドを実行し、エラーが表示されないことを確認します。




    
    php -v





なお、開発端末であるWindows 10クライアント等で「コンピューターにVCRUNTIME140.dll がないため、プログラムを開始できません」というエラーが表示される場合は、Visual Studio 2015再頒布パッケージのダウンロードが必要です。[Download Visual Studio 2015 の Visual C++ 再頒布可能パッケージ from Official Microsoft Download Center](https://www.microsoft.com/ja-jp/download/details.aspx?id=48145)からダウンロードしてインストールしておきましょう。





### IIS上でPHP（CGI）を動作させる為のハンドラーマッピング





続いて、IISからPHPファイルを、ダウンロードした「php-cgi.exe」で動作させるための設定を行います。





![](/images/2018/05/180513-5af80db0da801.png)






インターネットインフォメーションサービスマネージャーを開き、Webサイト（デフォルトでは「Default Web Site」を選択し、「ハンドラーマッピング」を選択します。





![](/images/2018/05/180513-5af80dbba2a02.png)






右側のペインから「モジュール追加」をクリックし、以下のように入力します。






<table >
<tr >項目内容</tr>
<tr >
<td >要求パス
</td>
<td >*.php
</td></tr>
<tr >
<td >モジュール
</td>
<td >FastCgiModule
</td></tr>
<tr >
<td >実行可能ファイル
</td>
<td >C:¥php¥php-cgi.exe
</td></tr>
<tr >
<td >名前
</td>
<td >任意（例：PHP）
</td></tr>
</table>






![](/images/2018/05/180513-5af80dc3b3402.png)






### PHP構成ファイル（php.ini）の編集





PHPの構成ファイルである「php.ini」ファイルを編集します。IISで最低限動作させる為に、デフォルトで用意されている`php.ini-development`ファイルを使用します。その他、PHPで必要な「openssl」や「mbstring」などのモジュールは必要に応じて追加しますが、今回はひとまず動作させる事が目的であるため割愛します。




    
    コピー前：C:¥php¥php.ini-development
    コピー後：C:¥php¥php.ini





![](/images/2018/05/180513-5af80e7c07e1c.png)






### PHPフレームワーク「Laravel」のインストール





Laravelのインストールは、PHPのパッケージマネージャーであるComposerから行います。Composerは、インストーラーを使用すれば自動的に必要な環境変数まで設定してくれますので、Windowsの場合はインストーラーを使用しましょう。[Introduction - Composer](https://getcomposer.org/doc/00-intro.md#installation-windows)





Composerのインストールが完了したら、コマンドプロンプトを開き以下のコマンドを実行します。




    
    cd C:¥inetpub¥wwwroot
    composer global require "laravel/installer"
    laravel new sample





「sample」はプロジェクト名になります。また、「sample」というディレクトリが作成されます。なお、composerによる初期インストールにはかなり時間がかかりますので気長に待ちましょう。





### Node.jsのインストール





Laravelのビルドには、Node.jsを使用する為、事前にNode.jsのWindows版をインストールしましょう。Windows版は、[ダウンロード | Node.js](https://nodejs.org/ja/download/)のWindows Installer (.msi)版をダウンロードしてインストールしてください。





### 仮想ディレクトリの作成





インターネットインフォメーションサービスマネージャーを開き、「Default Web Site」を右クリックして、「仮想ディレクトリの追加」をクリックします。





![](/images/2018/05/180513-5af811c25acdd.png)






「エイリアス」に「sample」、「物理パス」に「C:¥inetpub¥wwwroot¥sample¥public」を設定します。これで、`http://localhost/sample/`で、「物理パス」配下にアクセスできるようにできます。「sample」を変更したい場合は、エイリアス名を変更してください。





![](/images/2018/05/180513-5af812415f97c.png)






### 「index.php」を既定のファイルに追加する





続いて、インターネットインフォーメーションサービスマネージャーの「Default Web Site」を選択し、「既定のドキュメント」を追加します。





![](/images/2018/05/180513-5af826b0cec7f.png)






デフォルトでは、「index.php」をルートドキュメントとして認識してくれないため、追加しておきます。





![](/images/2018/05/180513-5af826b9933d0.png)






### phpinfo()による動作確認





`C:¥inetpub¥wwwroot`配下に`index.php`を新規作成し、下記のように書き換えます。




    
    <?php
      phpinfo();





続いて、ブラウザから`http://localhost/`にアクセスし、`phpinfo();`の結果が表示されることを確認してください。`http://localhost/index.php`と「index.php」を入力しなくても、ページが表示されることを確認しておきます。





![](/images/2018/05/180513-5af82721b7348.png)






### Web.configにURL置き換え（Rewrite）のルールを追加する





たとえば、`http://localhost/sample/hoge/`にアクセスした際に、`http://localhost/sample/index.php`に対して`hoge`というパラメーターが渡されるように、URL置き換えを行います。





![](/images/2018/05/180513-5af827e94e5b0.png)






先ほど作成した仮想ディレクトリを選択し、「URL置き換え」をクリックします。





![](/images/2018/05/180513-5af827f497a1e.png)






「規則の追加」→「空の規則」を選択します。規則名は任意、パターンに`^(.*)$`、「条件」グループに`{REQUEST_FILENAME}`に対して、「ファイルではない」と「ディレクトリではない」の2パターンを作成しておきます。





![](/images/2018/05/180513-5af82ee192a18.png)






また、「アクション」の「URLの置き換え」に`index.php/{R:1}`、一番下のチェックボックスである「後続の処理を停止する」をチェックしておきます。これで、`public`フォルダー配下に`Web.config`（Apacheの`.htaccess`に該当）が作成されます。デフォルトでは`.htaccess`は用意されているところを見ると、そもそもWindowsで動かす人はあまりいないのでしょう..





### 「storages」フォルダーにアクセス権限を追加する





最後に、IIS実行ユーザーが、Laravelのログファイル等を保存するために読み取り、書き込みが実行できるように権限を追加します。エクスプローラーで、`C:¥inetpub¥wwwroot¥sample¥storages`フォルダーを右クリックし、プロパティを開きます。





![](/images/2018/05/180513-5af82a3698b1a.png)






続いて、「セキュリティ」タブを開き、「編集」をクリックします。





![](/images/2018/05/180513-5af82a402676b.png)






「Everyone」（誰でも）に「フルコントロール」権限を与えておきましょう。（実際の環境では、IISの実行ユーザーのみに権限を割り当てることをオススメします）





![](/images/2018/05/180513-5af82a46bd5d0.png)






### Node.jsのパッケージをインストールする





最後に、Laravelのビルドに必要なNode.jsのパッケージをインストールします。すでに、パッケージのインストールに必要な情報である`package.json`は用意されているため、コマンドプロンプトで以下のコマンドを実行するだけです。




    
    cd C:¥inetpub¥wwwroot¥sample
    npm install





パッケージのインストールが完了すると、同フォルダー内に「node_modules」というフォルダーが作成され、その中に必要なモジュールがインストールされます。




    
    npm run dev





このコマンドを実行し、ビルドが正常に完了することを確認します。





### Laravelのサンプルテスト





ブラウザから、`http://localhost/sample/`にアクセスし、Laravelのトップ画面が表示されれば完成です！





![](/images/2018/05/180513-5af82fbc3e97a.png)

