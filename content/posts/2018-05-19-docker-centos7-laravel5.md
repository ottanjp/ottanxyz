---
author: ottan
date: 2018-05-19 12:43:42+00:00
draft: false
title: Docker上のCentOS7でApache 2.3.x、PHP7.x、Laravel 5.xを動作させるための手順
type: post
url: /docker-centos7-laravel5-6745/
categories:
- Mac
tags:
- CentOS
- Docker
- Laravel
- PHP
---

![](/images/2018/05/180519-5affcf7d17177.png)






[Windows Server上のIISでPHPアプリケーションを動作させる際の落とし穴と対策 – OTTAN.XYZ](https://ottan.xyz/windows-server-iis-php-laravel-6739/)で、Windows Server上でLaravelを動作させるための環境構築手順をご紹介しましたが、今回はCentOS版です。Docker上の真っさらなCentOS7で、何もインストールされていない状態から初期セットアップしてみます。





とりあえず、トライ＆エラー方式で、行けるところまで行きます。環境構築中に躓いた方は参考にしてみてください。なお、Dockerの詳細については割愛しますので、弊サイトのDockerご紹介記事等をご参照ください。





## Docker上のCentOS7でPHP7.x、Laravel 5.xの環境構築手順





まずは、手探り状態からスタートしてみます。エラーメッセージを見ながら随時解決していきましょう。





### Dockerイメージの起動





Docker for Macがインストールされている状態を前提とします。何はともあれ、Dockerコンテナーの起動です。




    
    docker run --privileged -it -d -p 8000:80 --name centos centos /sbin/init





`--name`オプションに指定するコンテナーの名前は任意のもので構いませんが、今回は「centos」としました。また、ホストOS（Mac）からブラウザ経由でアクセスするために、`-p`オプションにポート番号を設定しました。Macからローカルホストの8000番のポートにアクセスすると、自動的にコンテナーの80番ポート（http）にアクセスします。




    
    docker exec -it centos bash





続いて、Dockerコンテナーにアクセスします。以下、とくに記載がなければ、すべてDockerコンテナー上での操作になります。なお、コマンドが見つからない、等のエラーが表示された場合は、いったんコンテナーからログアウトすると解消される場合があります。





### Apache 2.xのインストール





まず、CentOS上のパッケージを最新化しておきましょう。




    
    yum update -y





続いて、Apache 2.xをインストールします。




    
    yum install -y httpd





インストールしたApacheのバージョンを確認するためには、以下のコマンドを実行します。




    
    httpd -v





Apache 2.4.6がインストールされている事がわかります。




    
    Server version: Apache/2.4.6 (CentOS)
    Server built:   Apr 20 2018 18:10:38





OS起動時に自動的にApacheが起動されるように設定を変更しておきます。




    
    systemctl enable httpd
    systemctl restart httpd





ブラウザから、`http://127.0.0.1:8000`にアクセスすると、Apacheのデフォルトの画面が表示されることを確認してください。





![](/images/2018/05/180519-5affc90ef315a.png)






### PHP 7.xのインストール





続いて、PHP 7.xをインストールします。なお、デフォルトのリポジトリに登録されているPHPのバージョンはPHP 5.xとバージョンが古いため、別途リポジトリを追加する必要があります。




    
    yum install -y epel-release
    yum install -y http://rpms.remirepo.net/enterprise/remi-release-7.rpm





追加したリポジトリから、PHP 7.2をインストールします。




    
    yum install -y php72 php72-php





PHPが正常にインストールされていることを確認するために、以下のコマンドを実行します。




    
    php -v





バージョンが表示されると思いきや、




    
    bash: php: command not found





`php`コマンドが見つからない旨のエラーが表示されてしまいました。ここで、いったんコンテナーからログアウトし、再度ログインします。





PHP 7.2がデフォルトで有効になるように、`module`コマンドでインストールしたPHP 7.2を有効化します。




    
    module load php72





再度、以下のコマンドを実行します。




    
    php -v





以下のようにPHPのバージョンが表示されていれば、インストール完了です。




    
    PHP 7.2.5 (cli) (built: Apr 24 2018 18:14:01) ( NTS )
    Copyright (c) 1997-2018 The PHP Group
    Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies





### Composerのインストール





Laravelのインストールに必要となる、Composerをインストールします。[Composer](https://getcomposer.org/download/)に記載されている手順通りに実行するだけです。




    
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"





カレントディレクトリに、`composer.phar`がインストールされますので、`/usr/bin`配下に移動します。




    
    mv composer.phar /usr/bin/composer





### Node.jsのインストール





LaravelのSassファイルやJavaScriptファイルのビルドに使用する、Node.jsをインストールしておきます。以下のコマンドを実行します。




    
    yum install -y nodejs





インストール完了後に、以下のコマンドを実行してバージョンを確認します。まずは、Nodeから。




    
    node -v





今回は、6.14.0がインストールされました。




    
    v6.14.0





続いて、「npm」コマンドの確認です。




    
    npm -v





今回は、3.10.10がインストールされました。




    
    3.10.10





### Laravelのインストール





[Installation - Laravel - The PHP Framework For Web Artisans](https://laravel.com/docs/5.6)の手順に従い、Laravelのインストールを行います。




    
    composer global require "laravel/installer"
    





しかし、早速インストールに失敗しました。




    
    Your requirements could not be resolved to an installable set of packages.
    
      Problem 1
        - laravel/installer v2.0.1 requires ext-zip * -> the requested PHP extension zip is missing from your system.
        - laravel/installer v2.0.0 requires ext-zip * -> the requested PHP extension zip is missing from your system.
        - Installation request for laravel/installer ^2.0 -> satisfiable by laravel/installer[v2.0.0, v2.0.1].
    
      To enable extensions, verify that they are enabled in your .ini files:
        - /etc/opt/remi/php72/php.ini
        - /etc/opt/remi/php72/php.d/20-bz2.ini
        - /etc/opt/remi/php72/php.d/20-calendar.ini
        - /etc/opt/remi/php72/php.d/20-ctype.ini
        - /etc/opt/remi/php72/php.d/20-curl.ini
        - /etc/opt/remi/php72/php.d/20-exif.ini
        - /etc/opt/remi/php72/php.d/20-fileinfo.ini
        - /etc/opt/remi/php72/php.d/20-ftp.ini
        - /etc/opt/remi/php72/php.d/20-gettext.ini
        - /etc/opt/remi/php72/php.d/20-iconv.ini
        - /etc/opt/remi/php72/php.d/20-json.ini
        - /etc/opt/remi/php72/php.d/20-phar.ini
        - /etc/opt/remi/php72/php.d/20-sockets.ini
        - /etc/opt/remi/php72/php.d/20-tokenizer.ini
      You can also run `php --ini` inside terminal to see which files are used by PHP in CLI mode.





ログを参照すると、`ext-zip`（PHPのzip拡張機能）がないと怒られています。そこで、以下のパッケージをインストールします。




    
    yum install -y php72-php-pecl-zip





パッケージのインストールが完了したら、再チャレンジです。




    
    composer global require "laravel/installer"
    





無事、インストールが完了しました。




    
    Reading /root/.composer/vendor/composer/installed.json
    Writing lock file
    Generating autoload files





続いて、Composerのパッケージの実行ディレクトリをPATH変数に追加します。




    
    PATH=$PATH:/root/.composer/vendor/bin





続いて、Laravelの新規プロジェクトを作成するために、以下のコマンドを実行します。「sample」はディレクトリおよびプロジェクトの名称になるため、適宜読み替えてください。Composerにより、必要な依存パッケージが順次ダウンロードされます。インストールには時間がかかりますので、気長に待ちましょう。




    
    laravel new sample





しかし、インストール中にエラーが発生しました。




    
    Your requirements could not be resolved to an installable set of packages.
    
      Problem 1
        - laravel/framework v5.6.9 requires ext-mbstring * -> the requested PHP extension mbstring is missing from your system.
    





PHPの拡張機能である`mbstring`がインストールされていない旨のエラーが表示されています。下記のコマンドを実行して、PHP7用のモジュールをインストールします。




    
    yum install -y php72-php-mbstring





インストールが完了したら、再チャレンジします。




    
    laravel new sample





しかし、すでにアプリケーションが存在する旨のエラーメッセージが表示されます。




    
    In NewCommand.php line 99:
                                   
      Application already exists!  
                                   
    
    new [--dev] [--force] [--] [<name>]





そのため、今度は`--force`オプションをつけて実行します。（もしくは、ディレクトリを削除して、実行し直しても良いでしょう）




    
    laravel new sample --force





しかし、またしてもエラーメッセージが表示されます。




    
    Your requirements could not be resolved to an installable set of packages.
    
      Problem 1
        - phpunit/phpunit 7.2.x-dev requires ext-dom * -> the requested PHP extension dom is missing from your system.





`ext-dom`拡張機能がインストールされていない旨のエラーメッセージが表示されました。先ほどよりは進展しましたが、指示通りにモジュールをインストールします。が、PHP 7.2に関連する「dom」という文字列のパッケージが見当たりません。そこで、下記のモジュールをインストールします。




    
    yum install -y php72-php-xml





インストールが完了したら再チャレンジです。




    
    laravel new sample --force




    
    Package manifest generated successfully.
    Application ready! Build something amazing.





と表示されれば、無事プロジェクトの作成は完了です！続いて、必要なNode.jsのパッケージをインストールしましょう。`package.json`はすでに用意されているので、プロジェクトのルートディレクトリに移動して、コマンドを打つだけです。楽勝ですね！`package.json`のおかげでコマンド一発で環境が整うは素晴らしいです。




    
    cd sample
    npm install





が、予想通りインストール途中でコケます。世の中そんなに甘くないようです。エラーメッセージは長いので一部を抜粋します。




    
    Command failed: autoreconf -fiv
    /bin/sh: autoreconf: command not found
    ...
    Error: pngquant failed to build, make sure that libpng-dev is installed
        at Promise.all.then.arr (/sample/node_modules/pngquant-bin/node_modules/bin-build/node_modules/execa/index.js:231:11)





`autoreconf`コマンドが存在しない、また、`libpng`関連のパッケージがインストールされていないと怒られます。そこでこれらのパッケージを改めてインストールします。




    
    yum install -y autoconf automake libpng-devel





これらのパッケージのインストールが完了したら、再チャレンジです。




    
    npm install





しかし、またしても`pngquant`関連でエラーが発生します。




    
    Error: pngquant failed to build, make sure that libpng-dev is installed
        at Promise.all.then.arr (/sample/node_modules/pngquant-bin/node_modules/bin-build/node_modules/execa/index.js:231:11)





まだ、パッケージが足りないようです。




    
    yum install -y libpng12-devel





インストール完了後に、心折れそうになりながら再チャレンジ！




    
    npm install





これでインストールが完了しました！最後に、インストールしたパッケージが動作するかどうかビルドしてみます。




    
    npm run dev





ようやくまともに動くようになりました...




    
    DONE  Compiled successfully in 5021ms          12:00:23 PM
    
           Asset     Size  Chunks                    Chunk Names
      /js/app.js  1.38 MB       0  [emitted]  [big]  /js/app
    /css/app.css   196 kB    0, 0  [emitted]         /js/app, /js/app





### ApacheでLaravelを動作させるための設定





今回は、デフォルトのドキュメントルート配下である`/var/www/html`にそのままディレクトリを持っていきます。




    
    cd ../
    mv sample /var/www/html





続いて、Apacheのコンフィグファイルの設定。オリジナルファイルをコピーして保存しておきましょう。




    
    cp -p /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf.org





デフォルトで、`vi`はインストールされているため、こちらを使って編集します。




    
    vi /etc/httpd/conf/httpd.conf





編集箇所は以下の通りです。




    
    164c164
    <     DirectoryIndex index.php index.html
    ---
    >     DirectoryIndex index.html
    238d237
    <     Alias /sample "/var/www/html/sample/public"
    286d284
    <     AddType application/x-httpd-php .php





`/sample`で、`/var/www/html/sample/public`にアクセスできるように変更します。また、Apacheが拡張子が`.php`のファイルを認識できるように変更します。なお、ApacheにPHPの追加モジュールをインストールする設定は、`php72-php`パッケージインストール時に、`/etc/httpd/conf.modules.d/15-php72-php.conf`で行われているため追記不要です。設定変更後はApacheを再起動します。




    
    systemctl restart httpd





### ブラウザからの動作確認





では、ブラウザから`http://127.0.0.1:8000/sample/`にアクセスしてみましょう。





![](/images/2018/05/180519-5b0019ef2c4a8.png)






Laravelのデバッグ画面が表示されました！




    
    The stream or file "/var/www/html/sample/storage/logs/laravel.log" could not be opened: failed to open stream: Permission denied





Apacheの実行ユーザで`/storage`配下に書き込めないと怒られました。権限を変更します。




    
    chown -R apache:apache /var/www/html/sample/storage





再びブラウザから閲覧！





![](/images/2018/05/180519-5b001abdcb9ff.png)






無事トップ画面がみれました！お疲れ様でした！





## まとめ





前提パッケージのインストール手順をまとめておきましょう。




    
    yum update -y
    yum install -y epel-release
    yum install -y http://rpms.remirepo.net/enterprise/remi-release-7.rpm
    yum install -y httpd php72 php72-php php72-php-pecl-zip php72-php-mbstring php72-php-xml nodejs autoconf automake libpng-devel libpng12-devel





思い返せばたったこれだけですが、随分と苦労させられました。






  * [CentOS7にPHP7をyumでインストールする - Qiita](https://qiita.com/inakadegaebal/items/b57cf10339978d638305)
  * [laravel 5.6 + laravel-mix 2.x (docker with alpine linux)にて、 npm install したら pngquant で libpng-dev のエラーが出たから暫定対応したメモ - Qiita](https://qiita.com/hokutoasari/items/e01179cd3bb0e2fd74af)

