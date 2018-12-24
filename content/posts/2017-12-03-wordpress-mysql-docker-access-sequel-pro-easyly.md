---
author: ottan
date: 2017-12-03 08:13:12+00:00
draft: false
title: phpMyAdminは不要！Dockerで構築したMySQLにMacからSequel ProでGUI上からデータベースを簡単に編集する
type: post
url: /wordpress-mysql-docker-access-sequel-pro-easyly-6392/
categories:
- WordPress
tags:
- Development
- Docker
---

![](/images/2017/12/171203-5a237a8ae9047.png)






WordPressの開発環境の構築には、Dockerが便利であることは[Dockerで作る最強・最速のローカルWordPress環境](https://ottan.xyz/docker-wordpress-best-practice-5164/)でご紹介しています。WordPressのデータベースには、Oracle社のMySQLが使用されていますが、MySQLを操作するための代表的なソフトウェアに[phpMyAdmin](https://www.phpmyadmin.net/)があります。前回の記事においても、phpMyAdminを使用するための専用のコンテナーを構築する方法をご紹介しましたが、MacでMySQLなどのRDBMSを操作するためには便利なソフトウェアがあるので、今回はこちらをご紹介します。





## MySQLのデータベースをGUIから簡単に追加、変更、更新できる「Sequel Pro」





MacからGUIでMySQLのデータベースや、データベース内のテーブル、データを参照、編集できる便利なソフトウェアが[Sequel Pro](https://www.sequelpro.com/)です。Mac App Storeでは配布されていませんので、[Sequel Pro](https://www.sequelpro.com/)から直接ダウンロードしてインストールしてください。「Sequel Pro」の特徴は以下の通りです。






  * 私用、商用利用とわず無償で使用できる（「Sequel Pro」はドネーションウェアです）
  * TCP、ソケットなどMySQLに接続するために必要なすべてのプロトコルに対応している
  * phpMyAdminのように特別なコンテナーや、実行環境を別途用意する必要がない
  * GUIから直感的にデータベースの内容を操作できる
  * テーブルの最適化、分析、トリガーなどMySQLでできることは大抵なんでもできる




phpMyAdminをDockerの専用コンテナーとして作成しても良いのですが、専用のコンテナーを起動する必要があるため、ある程度のリソース（CPU、メモリ、ストレージ等）を消費することになります。その点、「Sequel Pro」を使用すれば必要な時に必要に応じて起動することが可能になりますし、Webアプリケーションとは異なるため（MySQLのレスポンス次第ですが）レスポンスも良好です。WordPress開発のみならずMySQLを使用しているならば、ぜひ試してみただきたいソフトウェアです。





### Dockerで構築したMySQLにMac（ホスト）からアクセスできるようにする





[Docker ComposeでWordPress環境をもっと楽に管理しよう！](https://ottan.xyz/docker-compose-wordpress-5694/)で、Docker Composeの使用方法についてご紹介しました。Docker Composeの設定ファイルはYAML（Yet Another Multicolumn Layout）形式で記述する必要がある旨をご紹介しました。前回ご紹介したYAMLファイルでは、MySQLにホストであるMacから直接アクセスすることはできませんでした（コンテナー間の通信は可能）。そこで、前回ご紹介したYAMLファイルを編集し、ホストからMySQLに接続できるようにします。




    
    # mysql
    db:
      image: mysql
      container_name: db
      environment:
        MYSQL_ROOT_PASSWORD: pass
      ports:
        - "13306:3306"
    # wordpress
    wordpress:
      image: wordpress
      container_name: wordpress
      links:
        - db:mysql
      ports:
        - "8080:80"
      volumes:
        - ~/Dropbox/vccw/www/wordpress/wp-content/themes:/var/www/html/wp-content/themes:cached





「db」コンテナーに「ports」セクションを追加しました。MySQLのデフォルトの待ち受けポート番号は「3306」ですが、ホストからアクセスする際に「13306」からアクセスできるように設定しました。既存のサービスのポート番号と重複しないように注意してください。「13306」がすでに使用されていないかどうかは以下のコマンドで確認できます。




    
    sudo lsof -i:13306





もし、すでに使用されている場合は、下記の通り表示されます。使用されていない場合は、何も表示されません。




    
    COMMAND PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
    vpnkit  464 ottan   20u  IPv4 0x75a98a7c0d36d8bf      0t0  TCP *:13306 (LISTEN)
    vpnkit  464 ottan   21u  IPv6 0x75a98a7c0bceecef      0t0  TCP localhost:13306 (LISTEN)





YAMLファイルの編集が完了したら、以下のコマンドを実行してコンテナーを起動します。




    
    docker-compose up -d





### ターミナルからMySQLにアクセスできることを確認する





続いて、ホストからMySQLに接続できることを確認します。ターミナルを開いて以下のコマンドを実行します。「-P」オプションに指定するポート番号は、YAMLファイルに記述した番号を指定してください。




    
    mysql -u root -h 127.0.0.1 -P 13306 --protocol=tcp -p





「command not found: mysql」と表示される場合は、MySQLクライアントがインストールされていないため、Homebrewを使用してMySQLをインストールしておきましょう。パスワードは、YAMLファイルに記述したパスワードを入力します。




    
    brew install mysql





### Sequel ProでMySQLに接続する





ターミナルからMySQLに接続できることが確認できたら、Sequel Proで接続しましょう。





![](/images/2017/12/171203-5a237aa0adc22.png)






接続情報は以下の通り入力します。






<table >
<tr >項目値</tr>
<tr >
<td >ホスト
</td>
<td >127.0.0.1
</td></tr>
<tr >
<td >ユーザ名
</td>
<td >root
</td></tr>
<tr >
<td >パスワード
</td>
<td >YAMLファイルに記載したパスワード
</td></tr>
<tr >
<td >データベース
</td>
<td >wordpress（省略可）
</td></tr>
<tr >
<td >ポート
</td>
<td >YAMLファイルに記載したポート番号
</td></tr>
</table>






「接続」ボタンをクリックします。





![](/images/2017/12/171203-5a237ae007b1e.png)






Sequel Proから接続できると上図の画面が表示されます。左上の「データベースを選択」のプルダウンから任意のデータベースを選択します。接続時にデータベースを指定している場合は、すでに選択された状態になっています。





![](/images/2017/12/171203-5a237b060afca.png)






データベースを選択すると、テーブルの一覧が表示されます。





![](/images/2017/12/171203-5a237b5fcd99d.png)






各テーブルを選択すると、テーブルの構造の詳細を確認できます。また、この画面を使用して、テーブルの構成を変更したり、任意のカラムを追加できます。





![](/images/2017/12/171203-5a237b67b3039.png)






「内容」タブを選択すると、データベースに格納されている情報が表示されます。すでに格納されている値を編集、削除したり、新しい値を追加できます。





![](/images/2017/12/171203-5a23af8ad8d6d.png)






その他、テーブルを選択した状態で、「テーブル」メニューからテーブルの最適化など、MySQLでできる操作、phpMyAdminでできる操作はすべてSequel Proから実施できます。ローカルホスト上で試験的に新規テーブルを作成したり、SQL文を発行して正常にテーブルのデータが取得できるかどうかを確認したり、といったことがすべてGUI上から行うことができますので、WordPressでMySQLを使用している場合には、Sequel Proによる確認を実施してみましょう！
