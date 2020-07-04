---
author: ["@ottanxyz"]
date: 2016-10-30 06:31:15+00:00
draft: false
title: Dockerで作る最強・最速のローカルWordPress環境
type: post
slug: docker-wordpress-best-practice-5164
categories:
  - Mac
  - Blog
tags:
  - Development
  - Docker
---

![](/uploads/2016/10/161030-5815613793192.jpg)

WordPress のローカルホストの開発環境といえば、[Docker](https://www.docker.com/products/docker)が登場する以前は、Vagrant + VirtualBox による仮想環境や、MAMP を使用した構築が一般的でした。しかし、[Docker](https://www.docker.com/products/docker)を使用することで、プラットフォームに応じた Docker の環境さえ用意すれば、Docker Hub に登録されているイメージを使用することで即座に環境を構築できます。

* [詳細な解説付き！今から始めるDocker for Mac！快適なWordPress開発環境を手に入れよう！ - OTTAN.XYZ](/posts/2016/08/docker-for-mac-wordpress-4711/)

Docker の基本的な使い方については、上記記事でご紹介していますのでご参照ください。

## Docker で作る最強・最速の WordPress 環境

Docker を使用すれば、既存の環境を壊すことなく、完全に独立した環境（コンテナー）を構築することが可能です。今回は以下の環境を用意しました。

- テーマやプラグインの動作を確認したい
- 本番環境の WordPress をローカルホストの WordPress に同期したい
- ローカルホストの WordPress 環境にメール送信テスト用の疑似環境を用意したい

### WordPress、MySQL の Docker マシンの起動

Docker のイメージは、Docker Hub で公開されているイメージを使用します。コンテナーやイメージなどの基本的な用語集の解説については、冒頭の記事でご紹介していますので、そちらをご参照ください。

まず、WordPress の動作に必要な MySQL が稼動するコンテナーを起動します。以下のコマンドを実行してください。`docker`コマンドが見つからない場合は、事前に Docker をインストールしてください。`MYSQL_ROOT_PASSWORD`環境変数は必須です。

    docker run --name db -e MYSQL_ROOT_PASSWORD=root -d mysql:latest

続いて、以下のコマンドを実行して WordPress が稼動するコンテナーを起動します。

    docker run --name wordpress --link db:mysql -p 8080:80 -d wordpress:latest

以下の URL にアクセスして、WordPress のインストール画面が表示されることを確認してください。

    http://localhost:8080

なお、コンテナー初回起動時のみ、イメージファイルのダウンロードを伴うため時間を要しますが、次回以降は一瞬です。

### WordPress コンテナーのカスタマイズ

Docker Hub で公開されている WordPress の公式イメージは最低限の環境しか用意されていないため、Docker のコンテナーにログインし、各種カスタマイズを行います。Docker のコンテナーにログインするためには、以下のコマンドを実行します。

    docker exec -it wordpress /bin/bash

WordPress コンテナーにログインできたら、以下の記事でご紹介している WordMove の設定を行います。WordMove は、異なる環境同士の WordPress の内容を同期できます。

* [Docker for Macで始めるお手軽WordPress環境のさまざまなカスタマイズ - OTTAN.XYZ](/posts/2016/08/docker-for-mac-wordpress-customize-4714/)

上記記事内のままでも問題ありませんが、`Movefile`の編集時に`mysqldump_options`を追加して置いてください。`db_name`には、`name:`と同じ値を指定してください。ローカルホストの WordPress 環境のみ疑似メール送信環境を用意するために必要です。

    local:
      vhost: "http://localhost:8080"
      wordpress_path: "/var/www/html"

      database:
        name: "wordpress"
        user: "root"
        password: "root"
        host: "db"

    staging:
      vhost: "http://your-domain"
      wordpress_path: "/home/username/your-domain/public_html" # use an absolute path here

      database:
        name: "db_name"
        user: "db_user"
        password: "db_password"
        host: "db_host"
        charset: "utf8"
        mysqldump_options: "--ignore-table=db_name.wp_options"

      exclude:
        - ".git/"
        - ".gitignore"
        - ".sass-cache/"
        - "bin/"
        - "tmp/*"
        - "Gemfile*"
        - "Movefile"
        - "wp-config.php"
        - "wp-content/*.sql"
        - ".htaccess"

      ssh:
        host: "username.xsrv.jp"
        user: "username"
        port: 10022 # Port is optional
        rsync_options: "--verbose" # Additional rsync options, optional

`Movefile`の編集が完了したら、コンテナーからログアウトします。ターミナルから以下のコマンドを実行し、WordMove が正常に動作することを確認してください。`RUBYOPT`は文字のエンコード、`cd`コマンドで作業ディレクトリを`root`ユーザのホームディレクトリに移動します。また、WordMove のオプションとして、`-u -d`を指定します。これで、`uploads`ディレクトリ、およびデータベースの内容のみが同期されます。テーマやプラグインは同期されません。テーマも同期したい場合は、`-t`を追加してください。

    docker exec wordpress env RUBYOPT=-EUTF-8 bash -c 'cd /root; wordmove pull -u -d'

#### 「WP-Mail-SMTP」プラグインの導入

続いて、ローカルホストの WordPress に、疑似メール送信環境を構築するための補助プラグインを導入します。「WP Mail SMTP」というプラグインをインストールしてください。以下からダウンロードする場合と、WordPress の管理画面であるダッシュボードから追加できます。

https://ja.wordpress.org/plugins/wp-mail-smtp/

ダッシュボードからプラグインをインストールできない（FTP 接続情報を求められる）場合は、WordPress のコンテナーにログインして、`wp-config.php`の内容を編集してください。

    vi /var/www/html/wp-config.php

`WP_DEBUG`の下に、`FS_METHOD`の行を追加してください。

    define('WP_DEBUG', false);
    define('FS_METHOD', 'direct');

続いて、プラグインの設定を行います。ブラウザから WordPress のダッシュボードにログインし、「設定」→「メール」を開きます。「SMTP Host」に「mailcatcher」、「SMTP Port」に「1025」、「Encryption」は「暗号化なし」、「Authentication」は「いいえ」を選択して、「変更を保存」をクリックします。

![](/uploads/2016/10/161030-58156a5864638.png)

なお、「WP Mail SMTP」はローカルホストのコンテナーでのみ使用したかったため、WordMove のオプションでプラグインの同期は除外しました。

### WordPress コンテナーの作業内容の保存

Docker のコンテナーは起動、停止はできますが、コンテナーを停止しても作業内容は保存されません。そのため、作業内容を保存したい場合は、Docker のイメージファイルに書き出す必要があります。以下のコマンドを実行して、イメージファイルを作成してください。

    docker commit wordpress ottan/wordpress:latest

続いて、以下のコマンドを実行してイメージファイルが保存されていることを確認してください。なお、`ottan/wordpress`は任意の名前に変更してください。

    docker images

`ottan/wordpress`というリポジトリの、`latest`タグが付与されたイメージファイルの完成です。

    REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
    ottan/wordpress          latest              89ffa77a3559        13 hours ago        542 MB

冒頭の WordPress コンテナーの起動のためにダウンロードした、`wordpress`イメージはもう不要です。イメージを削除しましょう。イメージを削除するためには、いったんコンテナーを停止、削除する必要があります。ターミナルから以下のコマンドを実行します。

    docker stop wordpress
    docker rm wordpress
    docker rmi wordpress

### MailCatcher コンテナーの起動

WordPress の疑似メール送信環境は、[MailCatcher](https://mailcatcher.me/)が便利です。SMTP サーバの機能を備えたプログラムです。[MailCatcher](https://mailcatcher.me/)をすぐに動作させることのできる、Docker のイメージが Docker Hub で公開されています。以下のコマンドを実行することで、簡単に MailCatcher を起動できます。

    docker run -d -p 1080:1080 --name mailcatcher schickling/mailcatcher

ブラウザから以下の URL にアクセスします。

    http://localhost:1080

Web メールのようなインタフェースを備えています。ローカルホストの WordPress から送信したメールは、すべてこの画面から確認することができるようになります。なお、MailCatcher における SMTP のポートは「1025」、メール参照のための Web サーバのポートは「1080」です。

![](/uploads/2016/10/161030-58156a00e5c18.png)

### WordPress コンテナーの起動

WordPress のコンテナーを起動している場合は、いったんコンテナーを停止して、コンテナーを削除しましょう。コンテナーを削除していない場合は、前述の「WordPress コンテナーの作業内容の保存」セクションを参照してください。

続いて、以下のコマンドを実行して、WordPress のコンテナーを作成、起動します。`ottan/wordpress:latest`は、事前に commit したイメージです。ポイントは、`--link`オプションで、`mailcatcher:mailcatcher`コンテナーとリンクしていることです。

    docker run --name wordpress --link db:mysql --link mailcatcher:mailcatcher -p 8080:80 -d ottan/wordpress:latest

WordPress のコンテナーにログインし、`/etc/hosts`ファイルの内容を確認すると、以下のような記述を確認できます。`mysql`、`mailcatcher`というホスト名でリンクされたコンテナーに対して自動的に名前解決できるようになっています。

    172.17.0.2	mysql e41a220630d5 db
    172.17.0.4	mailcatcher 757a8012243f

前述の「WP Mail SMTP」プラグインのホスト名に「mailcathcer」という見慣れないホスト名を指定したのはこのためです。

    -v ~/www/wordpress/wp-content:/var/www/html/wp-content

なお、Mac のディレクトリと、コンテナーのディレクトリを共有（コンテナーにマウント）したい場合は、`-v`オプションを指定します。`:`（コロン）で区切って、Mac のディレクトリ、コンテナーのディレクトリを指定します。たとえば、Mac の`~/www/wordpress/wp-content`をコンテナーにマウントするためには上記のオプションを、`docker run`コマンドのオプションに指定します。

### メール送信環境のテスト

では、ローカルホストの WordPress の環境でメール送信できるかどうかテストしてみましょう。WordPress のダッシュボードにログインし、「設定」→「メール」と進みます。

![](/uploads/2016/10/161030-58156a6e8df5f.png)

宛先に適当なメールアドレスを入力（本当に、「テキトウ」で構いません）し、「テストメールを送信する」をクリックします。

![](/uploads/2016/10/161030-58156a7458c14.png)

結果に、`bool(true)`と表示されていれば、メール送信に成功しています。MailCatcher の内容を確認してみましょう。

![](/uploads/2016/10/161030-58156a9c7dfd3.png)

## まとめ

以上で、WordPress のテスト環境の構築は完了です。本番環境と同期したい場合には、

    docker exec wordpress env RUBYOPT=-EUTF-8 bash -c 'cd /root; wordmove pull -u -d'

をターミナルから実行します。MailCather の内容を確認したい場合には、

    http://localhost:1080

を確認します。これで、「Contact Form」などのお問い合わせフォームに必須となるメール送信環境も確保することができました。

Docker では、このように自由にカスタマイズした上で、作業内容をコミットできるため、いつでもどこでもイメージさえ用意しておけば、どこでもすぐに環境を構築できます。まだ、Docker を使用したことがないという場合には、これを機にぜひ試してみてください。
