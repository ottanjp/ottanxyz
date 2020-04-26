---
author: ottan
date: 2015-06-18 06:27:08+00:00
draft: false
title: 本番環境と開発環境のWordPressを自動的に同期する方法
type: post
slug: wordpress-sync-auto-1713
categories:
- Blog
tags:
- Development
---

![](/uploads/2015/06/150618-558264afd6441.jpg)






本番環境と開発環境のWordPressの環境を同期する方法をご紹介します。常に、本番環境と開発環境のWordPressの情報を同期化しておくことで、開発がスムーズになることが考えられます。初期設定が少々面倒ですが、是非試してみてください。





## 本番環境と開発環境のWordPressを同期する





順を追って、方法をご紹介します。





### エックスサーバで公開鍵認証を行う





今回は、弊サイトでお世話になっているエックスサーバでの設定方法をご紹介しますが、SSHが利用できるレンタルサーバであれば、使用できると思いますので、カスタマイズしてみてください。





最終的にすべて自動化することが目的であるため、公開鍵認証を使用します。もともとエックスサーバはセキュリティの都合上、公開鍵認証しかできませんが。





公開鍵認証とは、公開鍵と秘密鍵のペアで認証する方式で、サーバ側の公開鍵とローカルホストの秘密鍵のペアが一致しないとログインできません。ローカル環境で公開鍵と秘密鍵を生成して、公開鍵をエックスサーバに登録します。この鍵のペアを生成するためには、`ssh-keygen`コマンドを使用します。




    
    $ ssh-keygen
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/ottan/.ssh/id_rsa): 
    Created directory '/Users/ottan/.ssh'.
    Enter passphrase (empty for no passphrase): 
    Enter same passphrase again: 
    Your identification has been saved in /Users/ottan/.ssh/id_rsa.
    Your public key has been saved in /Users/ottan/.ssh/id_rsa.pub.
    The key fingerprint is:
    70:f0:9e:f1:31:b8:29:50:ba:bc:40:ba:0a:bf:9e:f0 ottan@macbook-pro
    The key's randomart image is:
    +---[RSA 2048]----+
    |      o          |
    |     o o .       |
    |  . o . = o      |
    | o . o + * o     |
    |. . o . S .      |
    | . . . .         |
    |+   .            |
    |o+ .             |
    |..E.             |
    +-----------------+





続いて、作成した公開鍵の内容をエックスサーバに登録します。サーバーパネルから、エックスサーバにログインしてください。



https://www.xserver.ne.jp/login_server.php



「SSH設定」をクリックします。





![](/uploads/2015/06/150618-558256ed2dd15.png)






「SSH設定」の状態が「OFF」の場合は、「ONにする」ボタンをクリックします。





![](/uploads/2015/06/150618-558256ef64c1d.png)






続いて生成した公開鍵の内容を登録するために、`cat`コマンドで公開鍵の内容を表示します。




    
    $ cat ~/.ssh/id_rsa.pub





表示された内容をそのままエックスサーバに貼り付け、「公開鍵を登録する」ボタンをクリックしてください。以上で、公開鍵認証の準備は完了です。





![](/uploads/2015/06/150618-558256f16c54f.png)






パスワード無しでエックスサーバにログインできるかどうか、ターミナルから下記のコマンドを実行します。**[USER]**は、エックスサーバの「ユーザID」に置き換えてください。




    
    $ ssh [USER]@[USER].xsrv.jp
    The authenticity of host '[[USER].xsrv.jp]:10022 ([120.136.14.36]:10022)' can't be established.
    RSA key fingerprint is xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:x:xx:xx.
    Are you sure you want to continue connecting (yes/no)? 





このような内容が表示されていれば、無事に公開鍵の登録は完了しています。`yes`と入力してください。1回接続すると、「known_hosts」と呼ばれるファイルにホストの情報が保存されるため、この内容は表示されなくなります。再度、下記のコマンドを実行してください。




    
    ssh [USER]@[USER].xsrv.jp





問題なく接続できたらログアウトします。




    
    exit





### 開発環境（VCCW）で公開鍵認証を行う





続いてローカルの開発環境についても、操作を自動化するために公開鍵認証の登録を行います。



http://vccw.cc/



今回は、無償で提供されている、ローカルのWordPress開発環境を簡単に構築できるVCCWを使用させていただきました。公開鍵認証を設定するために、以下のコマンドを実行します。




    
    vagrant ssh-config >> ~/.ssh/config





続いて、パスワード無しでローカルの開発環境にログインできるかどうか、以下のコマンドを実行してください。




    
    ssh vagrant@default





問題なく接続できたらログアウトします。




    
    exit





### 本番環境のMySQLの内容をダンプする





次に、本番環境のWordPressの内容をダンプする作業を実施します。WordPressのコンフィグファイルである`wp-config.php`にデータベース名、ユーザー名、パスワード、ホスト名が記載されていますので、この内容を確認します。




    
    // ** MySQL 設定 - この情報はホスティング先から入手してください。 ** //
    /** WordPress のためのデータベース名 */
    define('DB_NAME', '[DB_NAME]');
    
    /** MySQL データベースのユーザー名 */
    define('DB_USER', '[DB_USER]');
    
    /** MySQL データベースのパスワード */
    define('DB_PASSWORD', '[DB_PW]');
    
    /** MySQL のホスト名 */
    define('DB_HOST', '[DB_HOST]');





内容を確認したら、SSHで接続してダンプファイルを取得します。




    
    ssh [USER]@[USER].xsrv.jp -p 10022 mysqldump -u[DB_USER] -p[DB_PW] -h [DB_HOST] [DB_NAME] > dump.sql





`dump.sql`が生成されていることを確認してください。また、内容が空でないことを確認してください。生成されていない、内容が空の場合は、ユーザー名やパスワードが誤っている可能性がありますので、もう一度見直してみてください。





### 開発環境（VCCW）のMySQLの内容をダンプする





開発環境のMySQLの内容についても、バックアップのためにダンプしておきます。以下のコマンドを実行してください。




    
    ssh vagrant@default mysqldump -uwordpress -pwordpress wordpress > dump_local.sql





`dump_local.sql`が生成されていることを確認してください。また、内容が空でないことを確認してください。生成されていない、内容が空の場合は、ユーザー名やパスワードが誤っている可能性がありますので、もう一度見直してみてください。





### 本番環境のダンプファイルを開発環境にコピーする





続いて、本番環境から取得したダンプファイルを開発環境にインポートするために、ローカルの開発環境にコピーします。コピーには`scp`コマンドを使用します。




    
    scp dump.sql vagrant@default:/tmp/





コマンドが正常終了することを確認してください。





### 本番環境のダンプファイルを開発環境のMySQLに取り込む




    
    ssh vagrant@default mysql -uwordpress -pwordpress wordpress < /tmp/dump.sql
    





### 開発環境に取り込んだホスト情報を開発環境に置換する





本番環境から取得したMySQLのダンプファイルには、もちろん本番環境のホスト名が登録されているため、ローカルの開発環境のホスト名に置換する必要があります。置換するためには「Search-Replace-DB」を使用します。以下の2ファイルをダウンロードしてください。



https://raw.githubusercontent.com/interconnectit/Search-Replace-DB/master/srdb.class.php

https://raw.githubusercontent.com/interconnectit/Search-Replace-DB/master/srdb.cli.php



**[HOST_HONBAN]**は本番環境のホスト名、**[HOST_KAIHATSU]**は、開発環境のホスト名に置換した上で、以下のコマンドを実行してください。VCCWを前提にホスト名、ユーザ名、パスワード、データベース名を使用していますが、異なる場合は置換して使用してください。




    
    php srdb.cli.php -h='localhost' -u='wordpress' -p='wordpress' -n='wordpress' -s=[HOST_HONBAN] -r=[HOST_KAIHATSU]





以上で、本番環境から開発環境へのインポートは完了です。これらの作業をシェルスクリプトを使用して自動化します。





## 本番環境から開発環境へのダンプを自動化する





以下の内容をコピーして任意のフォルダーに保存してください。また、赤い部分は各自の環境に置換して使用してください。注意点として、先ほどダウンロードした`srdb.class.php`、`srdb.cli.php`と同一のフォルダーに保存してください。




    
    #!/bin/sh
    NOW=`date +"%Y%m%d_%H%M"`
    SEARCH=$1
    REPLACE=$2
    
    #dumpファイルの保存先
    BAK_LOCAL="/tmp/local.bk.$NOW.sql"
    BAK_REMOTE="/tmp/remote.bk.$NOW.sql"
    
    #検証環境のDBをバックアップ
    echo "ssh vagrant@default mysqldump -uwordpress -pwordpress 192.168.33.10 > $BAK_LOCAL"
    ssh vagrant@default mysqldump -uwordpress -pwordpress wordpress > $BAK_LOCAL
    
    #ファイルがない場合は終了
    if [ ! -s $BAK_LOCAL ]; then
      echo "dump failed: check $BAK_LOCAL"
      exit
    fi
    
    #本番DBに接続して、データをダンプ（SSHで接続しない場合は-hを変えてください）
    echo "ssh [USER]@[USER].xsrv.jp -p 10022 mysqldump -u[DB_USER] -p[DB_PW] -h [DB_HOST] [DB_NAME] > $BAK_REMOTE"
    ssh [USER]@[USER].xsrv.jp -p 10022 mysqldump -u[USER]@[USER].xsrv.jp -p[DB_PW] -h [DB_HOST] [DB_NAME]  > $BAK_REMOTE
    
    #ファイルがない場合は終了
    if [ ! -s $BAK_REMOTE ]; then
      echo "dump failed: check $BAK_REMOTE"
      exit
    fi
    
    #検証環境にダンプファイルをコピーする
    echo scp $BAK_REMOTE vagrant@default:/tmp/
    scp $BAK_REMOTE vagrant@default:/tmp/
    
    #検証DBに本番DBを取り込む
    echo "ssh vagrant@default mysql -uwordpress -pwordpress wordpress < $BAK_REMOTE"
    ssh vagrant@default mysql -uwordpress -pwordpress wordpress < $BAK_REMOTE
    
    #DB内容を書き換え
    echo "php srdb.cli.php -h='wordpress.local' -u='wordpress' -p='wordpress' -n='wordpress' -s=$SEARCH -r=$REPLACE"
    php srdb.cli.php -h='wordpress.local' -u='wordpress' -p='wordpress' -n='wordpress' -s=$SEARCH -r=$REPLACE
    





### 使用方法





仮に「sync.sh」として保存しました。実行権限を与えるために、以下のコマンドを実行してください。




    
    chmod +x ./sync.sh





次に、以下のコマンドを実行します。第一引数に本番環境のホスト名、第二引数に開発環境のホスト名を指定します。




    
    $ ./sync.sh [HOST_HONBAN] [HOST_KAIHATSU]





## 参考リンク





今回のシェルスクリプト作成にあたっては、以下のリンクを参考にさせていただきました。



http://qiita.com/tadatti/items/69cca7b71877eaa15393
