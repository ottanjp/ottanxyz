---
author: ottan
date: 2016-10-30 06:31:15+00:00
draft: false
title: Dockerで作る最強・最速のローカルWordPress環境
type: post
url: /docker-wordpress-best-practice-5164/
categories:
- Mac
- Blog
tags:
- Development
- Docker
- WordPress
---

![](/images/2016/10/161030-5815613793192.jpg)






WordPressのローカルホストの開発環境といえば、[Docker](https://www.docker.com/products/docker)が登場する以前は、Vagrant + VirtualBoxによる仮想環境や、MAMPを使用した構築が一般的でした。しかし、[Docker](https://www.docker.com/products/docker)を使用することで、プラットフォームに応じたDockerの環境さえ用意すれば、Docker Hubに登録されているイメージを使用することで即座に環境を構築できます。



https://ottan.xyz/docker-for-mac-wordpress-4711/



Dockerの基本的な使い方については、上記記事でご紹介していますのでご参照ください。





## Dockerで作る最強・最速のWordPress環境





Dockerを使用すれば、既存の環境を壊すことなく、完全に独立した環境（コンテナー）を構築することが可能です。今回は以下の環境を用意しました。






  * テーマやプラグインの動作を確認したい
  * 本番環境のWordPressをローカルホストのWordPressに同期したい
  * ローカルホストのWordPress環境にメール送信テスト用の疑似環境を用意したい




### WordPress、MySQLのDockerマシンの起動





Dockerのイメージは、Docker Hubで公開されているイメージを使用します。コンテナーやイメージなどの基本的な用語集の解説については、冒頭の記事でご紹介していますので、そちらをご参照ください。





まず、WordPressの動作に必要なMySQLが稼動するコンテナーを起動します。以下のコマンドを実行してください。`docker`コマンドが見つからない場合は、事前にDockerをインストールしてください。`MYSQL_ROOT_PASSWORD`環境変数は必須です。




    
    docker run --name db -e MYSQL_ROOT_PASSWORD=root -d mysql:latest





続いて、以下のコマンドを実行してWordPressが稼動するコンテナーを起動します。




    
    docker run --name wordpress --link db:mysql -p 8080:80 -d wordpress:latest





以下のURLにアクセスして、WordPressのインストール画面が表示されることを確認してください。




    
    http://localhost:8080





なお、コンテナー初回起動時のみ、イメージファイルのダウンロードを伴うため時間を要しますが、次回以降は一瞬です。





### WordPressコンテナーのカスタマイズ





Docker Hubで公開されているWordPressの公式イメージは最低限の環境しか用意されていないため、Dockerのコンテナーにログインし、各種カスタマイズを行います。Dockerのコンテナーにログインするためには、以下のコマンドを実行します。




    
    docker exec -it wordpress /bin/bash





WordPressコンテナーにログインできたら、以下の記事でご紹介しているWordMoveの設定を行います。WordMoveは、異なる環境同士のWordPressの内容を同期できます。



https://ottan.xyz/docker-for-mac-wordpress-customize-4714/



上記記事内のままでも問題ありませんが、`Movefile`の編集時に`mysqldump_options`を追加して置いてください。`db_name`には、`name:`と同じ値を指定してください。ローカルホストのWordPress環境のみ疑似メール送信環境を用意するために必要です。




    
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





`Movefile`の編集が完了したら、コンテナーからログアウトします。ターミナルから以下のコマンドを実行し、WordMoveが正常に動作することを確認してください。`RUBYOPT`は文字のエンコード、`cd`コマンドで作業ディレクトリを`root`ユーザのホームディレクトリに移動します。また、WordMoveのオプションとして、`-u -d`を指定します。これで、`uploads`ディレクトリ、およびデータベースの内容のみが同期されます。テーマやプラグインは同期されません。テーマも同期したい場合は、`-t`を追加してください。




    
    docker exec wordpress env RUBYOPT=-EUTF-8 bash -c 'cd /root; wordmove pull -u -d'





#### 「WP-Mail-SMTP」プラグインの導入





続いて、ローカルホストのWordPressに、疑似メール送信環境を構築するための補助プラグインを導入します。「WP Mail SMTP」というプラグインをインストールしてください。以下からダウンロードする場合と、WordPressの管理画面であるダッシュボードから追加できます。



https://ja.wordpress.org/plugins/wp-mail-smtp/



ダッシュボードからプラグインをインストールできない（FTP接続情報を求められる）場合は、WordPressのコンテナーにログインして、`wp-config.php`の内容を編集してください。




    
    vi /var/www/html/wp-config.php





`WP_DEBUG`の下に、`FS_METHOD`の行を追加してください。




    
    define('WP_DEBUG', false);
    define('FS_METHOD', 'direct');





続いて、プラグインの設定を行います。ブラウザからWordPressのダッシュボードにログインし、「設定」→「メール」を開きます。「SMTP Host」に「mailcatcher」、「SMTP Port」に「1025」、「Encryption」は「暗号化なし」、「Authentication」は「いいえ」を選択して、「変更を保存」をクリックします。





![](/images/2016/10/161030-58156a5864638.png)






なお、「WP Mail SMTP」はローカルホストのコンテナーでのみ使用したかったため、WordMoveのオプションでプラグインの同期は除外しました。





### WordPressコンテナーの作業内容の保存





Dockerのコンテナーは起動、停止はできますが、コンテナーを停止しても作業内容は保存されません。そのため、作業内容を保存したい場合は、Dockerのイメージファイルに書き出す必要があります。以下のコマンドを実行して、イメージファイルを作成してください。




    
    docker commit wordpress ottan/wordpress:latest





続いて、以下のコマンドを実行してイメージファイルが保存されていることを確認してください。なお、`ottan/wordpress`は任意の名前に変更してください。




    
    docker images





`ottan/wordpress`というリポジトリの、`latest`タグが付与されたイメージファイルの完成です。




    
    REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
    ottan/wordpress          latest              89ffa77a3559        13 hours ago        542 MB





冒頭のWordPressコンテナーの起動のためにダウンロードした、`wordpress`イメージはもう不要です。イメージを削除しましょう。イメージを削除するためには、いったんコンテナーを停止、削除する必要があります。ターミナルから以下のコマンドを実行します。




    
    docker stop wordpress
    docker rm wordpress
    docker rmi wordpress





### MailCatcherコンテナーの起動





WordPressの疑似メール送信環境は、[MailCatcher](https://mailcatcher.me/)が便利です。SMTPサーバの機能を備えたプログラムです。[MailCatcher](https://mailcatcher.me/)をすぐに動作させることのできる、DockerのイメージがDocker Hubで公開されています。以下のコマンドを実行することで、簡単にMailCatcherを起動できます。




    
    docker run -d -p 1080:1080 --name mailcatcher schickling/mailcatcher





ブラウザから以下のURLにアクセスします。




    
    http://localhost:1080





Webメールのようなインタフェースを備えています。ローカルホストのWordPressから送信したメールは、すべてこの画面から確認することができるようになります。なお、MailCatcherにおけるSMTPのポートは「1025」、メール参照のためのWebサーバのポートは「1080」です。





![](/images/2016/10/161030-58156a00e5c18.png)






### WordPressコンテナーの起動





WordPressのコンテナーを起動している場合は、いったんコンテナーを停止して、コンテナーを削除しましょう。コンテナーを削除していない場合は、前述の「WordPressコンテナーの作業内容の保存」セクションを参照してください。





続いて、以下のコマンドを実行して、WordPressのコンテナーを作成、起動します。`ottan/wordpress:latest`は、事前にcommitしたイメージです。ポイントは、`--link`オプションで、`mailcatcher:mailcatcher`コンテナーとリンクしていることです。




    
    docker run --name wordpress --link db:mysql --link mailcatcher:mailcatcher -p 8080:80 -d ottan/wordpress:latest





WordPressのコンテナーにログインし、`/etc/hosts`ファイルの内容を確認すると、以下のような記述を確認できます。`mysql`、`mailcatcher`というホスト名でリンクされたコンテナーに対して自動的に名前解決できるようになっています。




    
    172.17.0.2	mysql e41a220630d5 db
    172.17.0.4	mailcatcher 757a8012243f





前述の「WP Mail SMTP」プラグインのホスト名に「mailcathcer」という見慣れないホスト名を指定したのはこのためです。




    
    -v ~/www/wordpress/wp-content:/var/www/html/wp-content





なお、Macのディレクトリと、コンテナーのディレクトリを共有（コンテナーにマウント）したい場合は、`-v`オプションを指定します。`:`（コロン）で区切って、Macのディレクトリ、コンテナーのディレクトリを指定します。たとえば、Macの`~/www/wordpress/wp-content`をコンテナーにマウントするためには上記のオプションを、`docker run`コマンドのオプションに指定します。





### メール送信環境のテスト





では、ローカルホストのWordPressの環境でメール送信できるかどうかテストしてみましょう。WordPressのダッシュボードにログインし、「設定」→「メール」と進みます。





![](/images/2016/10/161030-58156a6e8df5f.png)






宛先に適当なメールアドレスを入力（本当に、「テキトウ」で構いません）し、「テストメールを送信する」をクリックします。





![](/images/2016/10/161030-58156a7458c14.png)






結果に、`bool(true)`と表示されていれば、メール送信に成功しています。MailCatcherの内容を確認してみましょう。





![](/images/2016/10/161030-58156a9c7dfd3.png)






## まとめ





以上で、WordPressのテスト環境の構築は完了です。本番環境と同期したい場合には、




    
    docker exec wordpress env RUBYOPT=-EUTF-8 bash -c 'cd /root; wordmove pull -u -d'





をターミナルから実行します。MailCatherの内容を確認したい場合には、




    
    http://localhost:1080





を確認します。これで、「Contact Form」などのお問い合わせフォームに必須となるメール送信環境も確保することができました。





Dockerでは、このように自由にカスタマイズした上で、作業内容をコミットできるため、いつでもどこでもイメージさえ用意しておけば、どこでもすぐに環境を構築できます。まだ、Dockerを使用したことがないという場合には、これを機にぜひ試してみてください。
