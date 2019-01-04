---
author: ottan
date: 2017-04-19 02:25:40+00:00
draft: false
title: Docker ComposeでWordPress環境をもっと楽に管理しよう！
type: post
url: /docker-compose-wordpress-5694/
categories:
- Blog
tags:
- Development
- Docker
- WordPress
---

![](/images/2017/04/170419-58f6c1df347fc.jpg)






[Docker For Mac](https://www.docker.com/docker-mac)を使用すると、あらかじめ用意されたイメージ（テンプレート）を使用して、簡単にWordPress環境を構築できます。ローカルの開発環境の場合、インターネット接続環境であれば、ものの数分でWordPress環境を作成できます。また、イメージのダウンロードは初回のみで、次回以降は数秒でWordPress環境の起動、停止を行うことができます。Docker for MacによるWordPress環境の構築からカスタマイズについては、以下の記事をご参照ください。






  * [詳細な解説付き！今から始めるDocker for Mac！快適なWordPress開発環境を手に入れよう！ – OTTAN.XYZ](/docker-for-mac-wordpress-4711/)
  * [Docker for Macで始めるお手軽WordPress環境のさまざまなカスタマイズ – OTTAN.XYZ](/docker-for-mac-wordpress-customize-4714/)
  * [Dockerで作る最強・最速のローカルWordPress環境 – OTTAN.XYZ](/docker-wordpress-best-practice-5164/)




上記の記事内で、Webサーバ（WordPress）、DBサーバ（MySQL）のコンテナー（Dockerの互いに隔離されたホスト）を作成し、`docker`コマンドを使用してWordPress、MySQLの起動、停止を行いましたが、コンテナーが複数になると毎回の起動、停止や、コンテナーの再作成や再起動がややめんどうくさくなります。そこで、今回は`docker-compose`を使用して、より簡単にコンテナーを起動、停止できる方法を考えます。





## Docker Composeで複数コンテナーを楽に管理しよう





Docker Composeとは、Dockerに含まれるコンポーネントの1つで、コンテナーの設定や情報を一元管理することができる優れものです。開発環境、商用環境による環境の使い分けはもとより、各種コンテナーの設定（MySQLのrootユーザのパスワード、Webサーバのポートフォワーディング、ボリュームのマウントなど）を一括で管理できます。





### docker-compose.ymlファイルを管理する





Docker Composeを利用するためには、あらかじめ`docker-compose.yml`ファイルを作成する必要があります。同ファイルはYAML形式で記述されています。類似の記述方法にJSON形式があります。YAML形式では、`#`はコメント行を表します。また、半角スペース2つでインデントします。**YAML形式でタブ（Hard Indent）は使用できませんのでご注意ください**。YAML形式のファイルを使用していて、エラーが発生した場合は、大抵インデントの誤りです。[YAMLlint - The YAML Validator](http://www.yamllint.com/)などを利用して、文法誤りがないかどうか確かめてください。





では、実際に`docker-compose.yml`ファイルを作成します。任意のフォルダーに作成して構いませんが、後に使用する`docker-compose`コマンド（Docker for Macに包含されます）は、カレントディレクトリに同ファイルが配置されている必要があります。Dropboxなどオンラインストレージ上で作成しておくことで、複数のデバイスでDockerの設定ファイルを共有できます。




    
    # mysql
    db:
      image: mysql
      container_name: db
      environment:
        MYSQL_ROOT_PASSWORD: pass
    # wordpress
    wordpress:
      image: ottan/wordpress
      container_name: wordpress
      links:
        - db:mysql
      ports:
        - "8080:80"
      volumes:
        - ~/Dropbox/vccw/www/wordpress/wp-content/themes:/var/www/html/wp-content/themes:cached
    








#### 「cahched」オプションによるホスト、コンテナー間のボリュームの同期の高速化（2017/11/23追記）




「volumes」オプションを使用することで、ホスト側のフォルダーをコンテナー側にマウントすることができましたが、マウントしたフォルダーの内容の同期には時間がかかりますが、Docker for Macのバージョンアップにより、同オプションの使用による同期の速さが改善されました。これまで「docker-sync」などのRubyGem等を使用して同期を高速化する必要がありましたが、バージョンアップによりブラウザのリロード程度であれば気にならない程度の同期速度になりました。「volumes」オプションの最後に**cached**を指定します。



    
    Docker version 17.09.0-ce, build afdb6d4








では、詳しく解説します。




    
    # mysql  <span class="text-success">←#から始まる行はコメント行。MySQLコンテナーの設定であることを任意に表す</span>
    db:  <span class="text-success">←dbコンテナーの定義。コンテナーの名前は別途定義するため任意の分かりやすい名前を推奨</span>
      image: mysql  <span class="text-success">←コンテナーに使用するイメージを定義。先頭は半角スペース2つ。また、:の後ろに半角スペース1つ</span>
      container_name: db  <span class="text-success">←コンテナーの名前を定義。省略可能。省略した場合は、コンテナー作成時に自動的に生成される</span>
      environment:  <span class="text-success">←コンテナーの環境変数を定義。MySQLイメージを使用する場合は、主にrootユーザのパスワードを設定</span>
        MYSQL_ROOT_PASSWORD: pass  <span class="text-success">←MySQLのrootユーザのパスワードを定義。先頭は半角スペース4つ</span>
        <span class="text-success">- MYSQL_ROOT_PASSWORD=passと同義</span>
    # wordpress
    wordpress:
      image: ottan/wordpress  <span class="text-success">←冒頭でご紹介した記事でカスタマイズしたイメージ</span>
      container_name: wordpress
      links:  <span class="text-success">←参照するコンテナーを定義</span>
        - db:mysql  <span class="text-success">←参照するコンテナーが複数存在する場合は改行して記述</span>
      ports:  <span class="text-success">←ポートフォワーディング設定</span>
        - "8080:80"  <span class="text-success">←ポートフォワーディング設定が複数存在する場合は改行して記述</span>
      volumes:  <span class="text-success">←コンテナー側にマウントするホスト（Mac）側のフォルダーを指定</span>
        - ~/Dropbox/vccw/www/wordpress/wp-content/themes:/var/www/html/wp-content/themes:cached





いかがでしょうか。YAML記述法に慣れていない場合、最初は戸惑うかもしれません。XMLなどのマークアップ言語に似ていますが、YAMLはマークアップ言語ではありません。JSONに慣れている人であれば抵抗はないかもしれません。Docker Composeの詳細については、[Compose ファイル・リファレンス — Docker-docs-ja 1.13.RC ドキュメント](http://docs.docker.jp/compose/compose-file.html#environment)を参照してください。





### Docker Composeを使ったコンテナーの管理





では、`docker-compose.yml`ファイルを作成したら、コンテナーを起動しましょう。同ファイルが配置されているフォルダーに移動して、以下のコマンドを実行します。




    
    docker-compose up -d





これまで複数のコンテナーを作成する場合は、その都度`docker run`コマンドでオプションを指定しながら作成していましたが、`docker-compose.yml`ファイルで設定を一元管理することにより、たった一行でMySQL、WordPressのコンテナーを起動することができるようになりました。正常に起動したかどうかを確認するためには、以下のコマンドを実行します。




    
    docker ps





続いて、起動したコンテナーを停止します。以下のコマンドを実行します。




    
    docker-compose stop





コンテナーを再度起動したい場合は、以下のコマンドを実行します。




    
    docker-compose start





コンテナーの再起動のみを行いたい場合は、以下のコマンドを実行します。




    
    docker-compose restart





コンテナーを再作成する場合は、以下のコマンドを実行します。




    
    docker-compose stop
    docker-compose rm
    docker-compose up -d





一度コンテナーを停止した上で、コンテナーを削除し、再度作成しているだけです。このように`docker-compose`を使用すれば、コンテナーが複数になった場合においても、簡単にコンテナーを管理できます。Docker for Macを使用している方は、ぜひお試しください！
