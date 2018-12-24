---
author: ottan
date: 2016-05-02 14:07:16+00:00
draft: false
title: VCCW（Vagrant＋VirtualBox＋Chef＋WordPress）＋WordMoveで、本番環境から開発環境にデータを簡単に同期する！
type: post
url: /vccw-wordmove-deploy-6858/
categories:
- Mac
- Blog
tags:
- WordPress
- Development
---

![](/images/2016/05/160502-57275563c8c88.jpg)






弊サイトでも推奨しまくりの[VCCW - A WordPress development environment.](http://vccw.cc/)ですが、構築方法については[gulp.jsとBrowser Syncで快適なWordPress開発環境を手に入れる](https://ottan.xyz/gulp-browser-sync-476/)をご覧いただくとして、今回はVCCWとXSERVER（エックスサーバー）上に構築したWordPressの環境を同期し、簡単に開発環境（VCCW）に本番環境のデータを適用する方法をご紹介します。



https://ottan.xyz/gulp-browser-sync-476/



## VCCW＋WordMoveで本番環境と開発環境を同期する





### エックスサーバーの公開鍵設定





WordMoveによる開発環境から本番環境への接続方法には、FTP、またはSSHを選択できますが、ここではよりセキュアなSSHを選択することとします。





さて、通常、SSHでエックスサーバーに接続するためには、ユーザー名、パスワード情報が必要です。しかし、公開鍵認証を用いることでパスワード不要で接続することができるようになります。公開鍵認証とは、あらかじめ開発環境で秘密鍵と公開鍵と呼ばれる鍵を作成し、公開鍵をあらかじめ接続したいサーバー（ここではエックスサーバー）に登録しておくことで、秘密鍵を持つ開発環境からのみの接続を許可するというものです。





秘密鍵と公開鍵を作成するために、開発環境のVCCWにログインします。ターミナルを開いて、以下のコマンドを実行してください。




    
    $ cd ~/Documents/vccw-2.19.0
    $ vagrant ssh





`~/Documents/vccw-2.19.0`は、Vagrantfileが存在するパスです。適宜読み替えてください。VCCWにログインしたら、以下のコマンドを実行します。




    
    $ ssh-keygen
    Generating public/private rsa key pair.
    Enter file in which to save the key (/home/vagrant/.ssh/id_rsa): 
    Enter passphrase (empty for no passphrase): 
    Enter same passphrase again: 





すべてデフォルトの状態のまま、↵を押します。これで、公開鍵と秘密鍵が作成されました。最後に、公開鍵をエックスサーバーに登録するために、公開鍵の内容を表示します。




    
    $ cat ~/.ssh/id_rsa.pub





![](/images/2016/05/160502-572755670a9b8.png)






次に、エックスサーバーの[サーバーパネル](https://www.xserver.ne.jp/login_server.php)にログインします。ログインしたら、「設定対象ドメイン」を対象のドメインに変更します。（独自ドメインを使用している場合）





![](/images/2016/05/160502-5727556a42c57.png)






次に、「SSH設定」をクリックします。





![](/images/2016/05/160502-5727556e038ca.png)






次に、状態を「ONにする」をクリックします。ここで注意したいのが、**エックスサーバーで使用されるSSHのポートは「10022」である**という点です。SSHのデフォルトポートである「22」とは異なりますので注意しておきましょう。





![](/images/2016/05/160502-57275572a4353.png)






最後に、「公開鍵登録・設定」タブを開き、先ほど`cat`した公開鍵の内容をそのままペーストします。「公開鍵を登録する（確認）」をクリックして、公開鍵を登録しましょう。





次に、ターミナルから以下のコマンドを実行します。VCCWにログインした状態で行います。`username`は、エックスサーバーのアカウント名に適宜読み替えてください。




    
    $ ssh -p 10022 username@username.xsrv.jp





初回接続時には、以下のように表示されます。「yes」と入力して、↵を押します。次回以降、「known_hosts」と呼ばれるファイルに登録され、下記の表示が出なくなります。この作業を必ず行っておきましょう。そうしないと、WordMoveで自動化できません。




    
    The authenticity of host '[username.xsrv.jp]:10022 ([xxx.xxx.xxx.xxx]:10022)' can't be established.
    RSA key fingerprint is xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx.
    Are you sure you want to continue connecting (yes/no)?





### Movefileの修正





![](/images/2016/05/160502-5727557809ed5.png)






続いて、WordMoveの設定ファイルである「Movefile」の修正を行います。「Movefile」は「Vagrantfile」と同じフォルダーに存在しますので、テキストエディターで開いてください。




    
    local:
      vhost: "http://vccw.dev"
      wordpress_path: "/var/www/wordpress"
    
      database:
        name: "wordpress"
        user: "wordpress"
        password: "wordpress"
        host: "localhost"
    
    staging:
      vhost: "http://your-domain"
      wordpress_path: "/home/username/your-domain/public_html" # use an absolute path here
    
      database:
        name: "DB_NAME"
        user: "DB_USER"
        password: "DB_PASSWORD"
        host: "DB_HOST"
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
    
      # paths: # you can customize wordpress internal paths
      #   wp_content: "wp-content"
      #   uploads: "wp-content/uploads"
      #   plugins: "wp-content/plugins"
      #   themes: "wp-content/themes"
      #   languages: "wp-content/languages"
      #   themes: "wp-content/themes"
    
      ssh:
        host: "username.xsrv.jp"
        user: "username"
      #   password: "password" # password is optional, will use public keys if available.
        port: 10022 # Port is optional
        rsync_options: "--verbose" # Additional rsync options, optional
      #   gateway: # Gateway is optional
      #     host: "host"
      #     user: "user"
      #     password: "password" # password is optional, will use public keys if available.
    
      # ftp:
      #   user: "user"
      #   password: "password"
      #   host: "host"
      #   passive: true
    
    # production: # multiple environments can be specified
    #   [...]





変更箇所は太字の通りです。






  * `staging:`の`your-domain`を本番環境のWordPressのURLに変更する
  * `staging:`の`wordpress_path`を本番環境のWordPressの絶対パス（wp-load.phpの置かれているディレクトリ）に変更する
  * `staging:`の`database:`の項目を本番環境の値（wp-config.phpに記載されています）に変更する
  * `exclude:`に`.htaccess`を追加する。これは、本番環境の余計な設定（エックスサーバー独自の設定）を開発環境に適用しないようにするため）
  * `ssh:`、および配下の項目のコメントアウトを外す
  * `ssh:`の、`host:`、`user:`を本番環境の値に変更する（`username`は適宜読み替えてください）
  * `ssh:`の、`port:`を`10022`に変更する




さて、Movefileですが、１行ごとのインデントが非常に重要です。半角スペース１つずれると動作しません。不安な場合は、[YAMLlint - The YAML Validator](http://www.yamllint.com/)に値を貼り付けて、チェックしてみてください。ハマリがちなのが、コメントアウトする箇所。






  * `ssh:`の前の半角スペースは２つ
  * `host:`、`user:`、`port:`、`rsync_options:`の前の半角スペースは４つ




### WordMoveを実行する





ここまでで準備が整いました。ここからは次回以降、WordMoveを実行するために、1回VCCWからログアウトした状態であると仮定して話を進めます。ターミナルを起動して、以下のコマンドを実行します。




    
    $ cd ~/Documents/vccw-2.19.0
    $ vagrant ssh





`~/Documents/vccw-2.19.0`は、Vagrantfileが存在するパスです。適宜読み替えてください。VCCWにログインしたら、以下のコマンドを実行します。




    
    $ cd /vagrant
    $ wordmove pull --all





これで、一気に本番環境と開発環境が同期されます！`pull`と`push`を間違えないでください。`push`すると、開発環境のデータが本番環境に上書きされてしまいます。





## まとめ





WordMoveを使用すれば、本番環境と開発環境のホスト名の差異も吸収し、自動的にデータベースも同期してくれます。何から何までとにかく同期してくれます。一度使用すると手放せません！是非お試しアレ！
