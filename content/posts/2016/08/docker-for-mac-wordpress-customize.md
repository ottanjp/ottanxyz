---
author: ottan
date: 2016-08-04 13:28:10+00:00
draft: false
title: Docker for Macで始めるお手軽WordPress環境のさまざまなカスタマイズ
type: post
slug: docker-for-mac-wordpress-customize-4714
categories:
  - Mac
  - Blog
tags:
  - Development
  - Docker
---

![](/uploads/2016/08/160804-57a342e1e2382.jpg)

[詳細な解説付き！今から始める Docker for Mac！快適な WordPress 開発環境を手に入れよう！ – OTTAN.XYZ](/posts/2016/08/docker-for-mac-wordpress-4711/)でご紹介した、Docker for Mac を使った WordPress の開発環境の構築。超高速に WordPress 環境を構築できる代わりに、デフォルトの状態では少し貧弱ですね。

https://ottan.xyz/docker-for-mac-wordpress-4711/

そこで、以前ご紹介した本番環境の WordPress と MySQL の内容含めて丸ごと同期できる「WordMove」くらい動作させたいものです。そこで、空状態だった「WordPress」イメージを、「WordMove」を動作させるまでの過程をご紹介します。これを機に思う存分カスタマイズしてみてください。

https://ottan.xyz/vccw-wordmove-deploy-6858/

## Docker コンテナーのカスタマイズ

前回、ご紹介した記事を読んでいただいている前提で話を進めますので、まだの方は[詳細な解説付き！今から始める Docker for Mac！快適な WordPress 開発環境を手に入れよう！ – OTTAN.XYZ](/posts/2016/08/docker-for-mac-wordpress-4711/)をご覧ください。

### Docker コンテナーに WordMove を導入する

ターミナルを起動し、Docker コンテナーが起動していることを確認してください。確認したら「wordpress」コンテナーに仮想端末経由でログインします。

    $ docker exec -it wordpress /bin/bash

`wordpress`は、コンテナーの名称です。コンテナーの名称を変更している方は、任意の値に変更してください。以下、`#`プロンプトで始まる作業は、すべて Docker コンテナーでの作業です。

#### カーネルを確認してみる

ターミナルで以下のコマンドを実行します。

    # uname -a

以下の表示を見る限り、「4.4.15-moby」というカーネルです。Debian 系には詳しくないのですが、Linux 系 OS が動作しているということだけはわかります。

    Linux bf0b08f3764c 4.4.15-moby #1 SMP Thu Jul 28 22:03:07 UTC 2016 x86_64 GNU/Linux

ターミナルで以下のコマンドを実行します。

    # cat /etc/os-release

やはり、「Debian」のようです。

    PRETTY_NAME="Debian GNU/Linux 8 (jessie)"
    NAME="Debian GNU/Linux"
    VERSION_ID="8"
    VERSION="8 (jessie)"
    ID=debian
    HOME_URL="http://www.debian.org/"
    SUPPORT_URL="http://www.debian.org/support"
    BUG_REPORT_URL="https://bugs.debian.org/"

#### WordMove を導入する

「WordMove」を動作させるためには、「ruby」が導入されている必要があります。しかし、初期状態では「ruby」はインストールされていません。そこで、以下のコマンドを実行し、パッケージのアップグレード、アップデートを行います。このコマンドがあってよかった…。

    # apt-get upgrade
    # apt-get update

続いて、以下のコマンドを実行します。

    # apt-get -y install ruby

これで、「ruby」のインストールが完了しました。続いて、「ruby」のパッケージマネージャーである「gem」を使用して、「WordMove」をインストールします。

    # gem install wordmove

「WordMove」のインストールが完了しました。あとは、以下でご紹介している記事を参照しながら、本番環境のホストに繋いで「WordMove」を実行するだけだ！と思い込んでいたのですが。

https://ottan.xyz/vccw-wordmove-deploy-6858/

よくよく考えると、エックスサーバーに接続するための「ssh」コマンドも用意されていない。というわけで、以下のコマンドを実行し、「ssh」を導入します。

    # apt-get -y install ssh

これで「WordMove」が実行できる！…と思いきや、よくよく考えると「WordMove」を動作させるための「Movefile」を作成しないといけない。

    # cd

とりあえず、「root」ユーザのホームディレクトリに移動し、「Movefile」を作成する予定が…。今度は、テキストファイルを編集できるエディターがインストールされていない。そこで、以下のコマンドを実行し、「vim」をインストールします。

    # apt-get -y install vim

これで、「Movefile」を定義できるはずだ、と思いきや、よくよく考えると、別コンテナーですでに動作させている「db」コンテナーへの接続方法がわからない。しかし、コンテナー起動時に「db」コンテナーへリンクしているはずだ！ということを思い出し、名前解決はできるのであろうと踏んで、`hosts`を覗いてみます。

    # cat /etc/hosts

なるほど、「db」というコンテナーの名称が名前解決できるように`hosts`に記載がありますね。

    127.0.0.1	localhost
    ::1	localhost ip6-localhost ip6-loopback
    fe00::0	ip6-localnet
    ff00::0	ip6-mcastprefix
    ff02::1	ip6-allnodes
    ff02::2	ip6-allrouters
    172.17.0.2	mysql 8f698b11cdea db
    172.17.0.3	bf0b08f3764c

というわけで試行錯誤しながら作成した「Movefile」の全容がこちらです。ターミナルで以下のコマンドを実行します（ホームディレクトリに作成していることを前提とします）。

    # cat ~/Movefile





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

ポイントは、`vhost`、`wordpress_path`、`database`の記述です。`vhost`は、コンテナー起動時に`-p`オプションで指定したポート番号を指定します。また、データベースの`host`には、MySQL が動作するコンテナーの名称を記載します。

さあ、いよいよ実行か！…と思ったら、まだありました。本番環境の MySQL をダンプした結果を、Docker コンテナーで動作する MySQL に同期するための「mysqldump」コマンドがインストールされていない。そこで、以下のコマンドを実行します。

    # apt-get -y install mysql-client

これで、「mysqldump」が使えるようになります。もう大丈夫！と安心しきっていると、まだエラーが。リモートホストとローカルホストのファイルを同期するための「rsync」がインストールされていない。そこで、以下のコマンドを実行します。

    # apt-get -y install rsync

ようやくこれで「WordMove」を実行するための準備が整いました。以下のコマンドを実行して、「WordMove」が動作することを確認してください（「Movefile」が存在するディレクトリで実行してください）。

    # wordmove pull --all

#### WordMove を導入するまでの一連の流れ

試行錯誤しましたが、「WordMove」を実行するだけなら、以下のコマンドを実行して「Movefile」を作成すれば良いだけということになります。あっさり。

    # apt-get install -y ruby ssh vim mysql-client rsync
    # gem install wordmove

#### WordMove 実行時にエラーになる

WordMove 実行時に以下のエラーが表示される場合は、Ruby のエンコーディングが「US-ASCII」である可能性があります。

    Error: invalid byte sequence in US-ASCII

そのような場合は、以下のコマンドを実行します。

    # vi ~/.bashrc

`.bashrc`の末尾に Ruby 実行時のオプションを追加してください。

    RUBYOPT=-EUTF-8

次回から`/bin/bash`実行時に自動的に環境変数に追加されますが、今すぐに適用したい場合は、以下のコマンドを実行してください。

    # source ~/.bashrc

### Docker コンテナーを保存する

さて、ここまで苦労して作り上げたコンテナーですが、コンテナーを削除してしまえば元の木阿弥です。なぜなら、コンテナーは「イメージ」から作り上げたものであって、「イメージ」に変更が加わるわけではないからです。とはいえ、一度作った環境は保存しておきたい。そうしたい場合には、一度コンテナーからログアウトし、以下のコマンドを実行し、「イメージ」を保存します。

    $ docker commit wordpress ottan

`wordpress`は実行しているコンテナーの名前、`ottan`はイメージの名前。

    $ docker images

上記のコマンドを実行すると、「イメージ」が新規に保存されていることがわかります。

    REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
    ottan                   latest              b0b9252e83fd        9 seconds ago       551.4 MB
    phpmyadmin/phpmyadmin   latest              c2e6d9434a3b        8 days ago          57.03 MB
    wordpress               latest              ba0d4f420656        2 weeks ago         429.6 MB
    mysql                   5.7                 1195b21c3a45        7 weeks ago         380.2 MB

### ついでに Mac のディレクトリをコンテナーにマウントする

起動中のコンテナーにログインして、テーマやプラグインファイルを編集するのは面倒くさいですよね。そういう場合には、コンテナーのファイルを、Mac 側で編集できるように、コンテナーを新規作成するときに以下のコマンドを実行します。

    $ docker run -v ~/Dropbox/vccw/www/wordpress/wp-content/themes/ottan-xyz-v3:/var/www/html/wp-content/themes/ottan-xyz-v3:cached --name ottan --link db:mysql -p 8080:80 -d ottan

#### 「cahched」オプションによるホスト、コンテナー間のボリュームの同期の高速化（2017/11/23 追記）

「volumes」オプションを使用することで、ホスト側のフォルダーをコンテナー側にマウントすることができましたが、マウントしたフォルダーの内容の同期には時間がかかりますが、Docker for Mac のバージョンアップにより、同オプションの使用による同期の速さが改善されました。これまで「docker-sync」などの RubyGem 等を使用して同期を高速化する必要がありましたが、バージョンアップによりブラウザのリロード程度であれば気にならない程度の同期速度になりました。「volumes」オプションの最後に**cached**を指定します。

    Docker version 17.09.0-ce, build afdb6d4

ついでなので、先ほど作成したイメージである「ottan」を使用してみました。また、ややこしいですが、コンテナーの名称を指定する`--name`オプションも同一名称にしています。既存のコンテナーの名称と重複しなければ何でも良いです。「wordpress」はすでに使用していたので、「ottan」としましたが、もうイメージも保存しましたし、用済みなので「wordpress」コンテナーを削除して、新たに「wordpress」コンテナーを「ottan」イメージで作り直すこともできます。

## まとめ

Docker for Mac、限りなく便利ですね！
