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

![](/uploads/2018/05/180507-5af048016ef56.jpg)

普段はインフラ構築系の業務がメインですが、ここ数日、珍しくフロントエンド系の開発（Web アプリケーションの開発）の仕事をしています。業務で使用するミドルウェアの制約上、Windows Server 上の IIS（Internet Information Service）で動作させる（厳密には、ミドルウェアが動作する Windows Server と、フロント周りの Web サーバは分割可能なのですが、とりあえずリソースを分割して使用するほどの金銭面の余裕や、性能は求められないので、今回は単純にすべて同一の IIS 上に構築します）、言語は PHP（厳密には…割愛）である必要があるのですが、しばらくそういった業務から離れていた事もあり、また Windows Server というよりも、IIS に想像以上に触れていなかった事もあり、ありとあらゆる場面でハマったため、環境構築のメモを残しておきます。

今回の目標は、IIS+PHP+Laravel（PHP フレームワーク）のデフォルト画面が表示されることです。なお、環境は Windows Server 2012 R2（IIS 8.5）、PHP は 7.2.x、Laravel は 5.5 です。バージョンによって差異がある可能性があります。

## IIS で PHP アプリケーションが動作するようになるまで

### 役割と機能の追加

まずは、サーバーマネージャーから、IIS をインストールします。その際に、PHP を CGI として動作させるためのモジュールである CGI を忘れないようにインストールしましょう。CGI は、「アプリケーションと開発」の中にあります。ここで、CGI をインストールし忘れると、IIS のハンドラーマッピングの際に、「FastCGIModule」が選択できません。なお、役割と機能の追加のみであれば、インストールディスクや ISO ファイルは不要です。

![](/uploads/2018/05/180513-5af80c454d3ca.png)

![](/uploads/2018/05/180513-5af80c4e50ecf.png)

### IIS Rewrite Module 2.0 のインストール

WordPress でも使用されている URL 書き換え機能。Apache の「mod_rewrite」モジュールが該当します。たとえば、WordPress では、URL の末尾に記事の ID のパラメーターを付与することで記事を単独表示させる事ができます。

    変更前：https://localhost/wordpress/?p=1
    変更後：https://localhost/wordpress/1/

Apache の場合、インストール時に設定を変更する事で、自動的にセットアップされますが、IIS 単独では動作しません（Windows Server 2012 R2 に付属する IIS 8.5 の場合）。別途、IIS Rewrite Module 2.0 をインストールする必要があります。ダウンロードは、[Download Microsoft URL Rewrite Module 2.0 for IIS 7 (x64) from Official Microsoft Download Center](https://www.microsoft.com/ja-jp/download/details.aspx?id=7435)から行います。「for IIS 7」とありますが、IIS 7 以降であれば動作します。URL の置き換えを行いたい場合は、事前にモジュールをインストールしておく必要がありますのでご注意ください。インストール自体は、ダウンロードしたインストーラーを起動するだけです。

![](/uploads/2018/05/180513-5af80cdf7b9c9.png)

### PHP のインストール

Mac の場合、デフォルトで PHP がインストールされていますが、インストールされていない場合においても、Homebrew さえ用意されれば、下記のコマンド一発でインストール可能ですが、Windows の場合、そうはいきません。別途、[PHP For Windows: Binaries and sources Releases](https://windows.php.net/download#php-7.2)からダウンロードする必要があります。

    brew install php

Windows Server 2012 R2 は、64bit 版ですので、「x64 Non Thread Safe」の ZIP ファイルをダウンロードします。Windows の IIS で PHP をどう察させたい場合は、IIS の制約上、Non Thread Safe 版を選択するようにしてください。（Thread Safe 版もありますが、Windows 上の Apache など他の Web サーバで動作させたい場合にダウンロードします）

![](/uploads/2018/05/180513-5af80d5046fb5.png)

ダウンロードした ZIP ファイルはそのまま展開し、`C:¥php`に移動しておきます。展開先はどこでも構いませんが、慣例的にシステムドライブ直下の`php`フォルダーに配置することが多いようです。また、「スタート」を「右クリック」→「システム」→「システムの詳細設定」からシステム環境変数の「PATH」の末尾に上記のディレクトリを追加しておきます。システム環境変数に追加後、コマンドプロンプトを開き、以下のコマンドを実行し、エラーが表示されないことを確認します。

    php -v

なお、開発端末である Windows 10 クライアント等で「コンピューターに VCRUNTIME140.dll がないため、プログラムを開始できません」というエラーが表示される場合は、Visual Studio 2015 再頒布パッケージのダウンロードが必要です。[Download Visual Studio 2015 の Visual C++ 再頒布可能パッケージ from Official Microsoft Download Center](https://www.microsoft.com/ja-jp/download/details.aspx?id=48145)からダウンロードしてインストールしておきましょう。

### IIS 上で PHP（CGI）を動作させる為のハンドラーマッピング

続いて、IIS から PHP ファイルを、ダウンロードした「php-cgi.exe」で動作させるための設定を行います。

![](/uploads/2018/05/180513-5af80db0da801.png)

インターネットインフォメーションサービスマネージャーを開き、Web サイト（デフォルトでは「Default Web Site」を選択し、「ハンドラーマッピング」を選択します。

![](/uploads/2018/05/180513-5af80dbba2a02.png)

右側のペインから「モジュール追加」をクリックし、以下のように入力します。

| 項目             | 内容               |
| ---------------- | ------------------ |
| 要求パス         | \*.php             |
| モジュール       | FastCgiModule      |
| 実行可能ファイル | C:¥php¥php-cgi.exe |
| 名前             | 任意（例：PHP）    |

![](/uploads/2018/05/180513-5af80dc3b3402.png)

### PHP 構成ファイル（php.ini）の編集

PHP の構成ファイルである「php.ini」ファイルを編集します。IIS で最低限動作させる為に、デフォルトで用意されている`php.ini-development`ファイルを使用します。その他、PHP で必要な「openssl」や「mbstring」などのモジュールは必要に応じて追加しますが、今回はひとまず動作させる事が目的であるため割愛します。

    コピー前：C:¥php¥php.ini-development
    コピー後：C:¥php¥php.ini

![](/uploads/2018/05/180513-5af80e7c07e1c.png)

### PHP フレームワーク「Laravel」のインストール

Laravel のインストールは、PHP のパッケージマネージャーである Composer から行います。Composer は、インストーラーを使用すれば自動的に必要な環境変数まで設定してくれますので、Windows の場合はインストーラーを使用しましょう。[Introduction - Composer](https://getcomposer.org/doc/00-intro.md#installation-windows)

Composer のインストールが完了したら、コマンドプロンプトを開き以下のコマンドを実行します。

    cd C:¥inetpub¥wwwroot
    composer global require "laravel/installer"
    laravel new sample

「sample」はプロジェクト名になります。また、「sample」というディレクトリが作成されます。なお、composer による初期インストールにはかなり時間がかかりますので気長に待ちましょう。

### Node.js のインストール

Laravel のビルドには、Node.js を使用する為、事前に Node.js の Windows 版をインストールしましょう。Windows 版は、[ダウンロード | Node.js](https://nodejs.org/ja/download/)の Windows Installer (.msi)版をダウンロードしてインストールしてください。

### 仮想ディレクトリの作成

インターネットインフォメーションサービスマネージャーを開き、「Default Web Site」を右クリックして、「仮想ディレクトリの追加」をクリックします。

![](/uploads/2018/05/180513-5af811c25acdd.png)

「エイリアス」に「sample」、「物理パス」に「C:¥inetpub¥wwwroot¥sample¥public」を設定します。これで、`http://localhost/sample/`で、「物理パス」配下にアクセスできるようにできます。「sample」を変更したい場合は、エイリアス名を変更してください。

![](/uploads/2018/05/180513-5af812415f97c.png)

### 「index.php」を既定のファイルに追加する

続いて、インターネットインフォーメーションサービスマネージャーの「Default Web Site」を選択し、「既定のドキュメント」を追加します。

![](/uploads/2018/05/180513-5af826b0cec7f.png)

デフォルトでは、「index.php」をルートドキュメントとして認識してくれないため、追加しておきます。

![](/uploads/2018/05/180513-5af826b9933d0.png)

### phpinfo()による動作確認

`C:¥inetpub¥wwwroot`配下に`index.php`を新規作成し、下記のように書き換えます。

    <?php
      phpinfo();

続いて、ブラウザから`http://localhost/`にアクセスし、`phpinfo();`の結果が表示されることを確認してください。`http://localhost/index.php`と「index.php」を入力しなくても、ページが表示されることを確認しておきます。

![](/uploads/2018/05/180513-5af82721b7348.png)

### Web.config に URL 置き換え（Rewrite）のルールを追加する

たとえば、`http://localhost/sample/hoge/`にアクセスした際に、`http://localhost/sample/index.php`に対して`hoge`というパラメーターが渡されるように、URL 置き換えを行います。

![](/uploads/2018/05/180513-5af827e94e5b0.png)

先ほど作成した仮想ディレクトリを選択し、「URL 置き換え」をクリックします。

![](/uploads/2018/05/180513-5af827f497a1e.png)

「規則の追加」→「空の規則」を選択します。規則名は任意、パターンに`^(.*)$`、「条件」グループに`{REQUEST_FILENAME}`に対して、「ファイルではない」と「ディレクトリではない」の 2 パターンを作成しておきます。

![](/uploads/2018/05/180513-5af82ee192a18.png)

また、「アクション」の「URL の置き換え」に`index.php/{R:1}`、一番下のチェックボックスである「後続の処理を停止する」をチェックしておきます。これで、`public`フォルダー配下に`Web.config`（Apache の`.htaccess`に該当）が作成されます。デフォルトでは`.htaccess`は用意されているところを見ると、そもそも Windows で動かす人はあまりいないのでしょう..

### 「storages」フォルダーにアクセス権限を追加する

最後に、IIS 実行ユーザーが、Laravel のログファイル等を保存するために読み取り、書き込みが実行できるように権限を追加します。エクスプローラーで、`C:¥inetpub¥wwwroot¥sample¥storages`フォルダーを右クリックし、プロパティを開きます。

![](/uploads/2018/05/180513-5af82a3698b1a.png)

続いて、「セキュリティ」タブを開き、「編集」をクリックします。

![](/uploads/2018/05/180513-5af82a402676b.png)

「Everyone」（誰でも）に「フルコントロール」権限を与えておきましょう。（実際の環境では、IIS の実行ユーザーのみに権限を割り当てることをオススメします）

![](/uploads/2018/05/180513-5af82a46bd5d0.png)

### Node.js のパッケージをインストールする

最後に、Laravel のビルドに必要な Node.js のパッケージをインストールします。すでに、パッケージのインストールに必要な情報である`package.json`は用意されているため、コマンドプロンプトで以下のコマンドを実行するだけです。

    cd C:¥inetpub¥wwwroot¥sample
    npm install

パッケージのインストールが完了すると、同フォルダー内に「node_modules」というフォルダーが作成され、その中に必要なモジュールがインストールされます。

    npm run dev

このコマンドを実行し、ビルドが正常に完了することを確認します。

### Laravel のサンプルテスト

ブラウザから、`http://localhost/sample/`にアクセスし、Laravel のトップ画面が表示されれば完成です！

![](/uploads/2018/05/180513-5af82fbc3e97a.png)
