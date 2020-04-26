---
author: ottan
date: 2017-11-23 11:43:16+00:00
draft: false
title: Docker for Macのホスト、コンテナー間の同期が遅い問題をDocker標準機能で解決する
type: post
slug: docker-for-mac-sync-host-container-6326
categories:
- Mac
tags:
- Development
- Docker
---

 ![](/uploads/2017/11/171123-5a16b059c8a78.jpg)
 photo credit: maijou2501 [Docker-4](http://www.flickr.com/photos/134416355@N07/31518969030) via [photopin](http://photopin.com) [(license)](https://creativecommons.org/licenses/by-sa/2.0/) 



弊サイトでは、MacのWordPress開発環境の構築に[Docker For Mac | Docker](https://www.docker.com/docker-mac)をオススメしています。弊サイトでも、[Dockerで作る最強・最速のローカルWordPress環境 – OTTAN.XYZ](/docker-wordpress-best-practice-5164/)で、Dockerの基本的な操作方法から、WordMoveによる本番環境と開発環境の同期方法までご紹介していますが、Docker for Macには1点問題がありました。それは、ホスト側（Mac）からコンテナー側にマウントしているボリュームの同期速度が遅い点。ホスト側のファイルを更新するだけで、コンテナー側のファイルを更新できるため非常に便利なのですが、Dockerのファイルシステム（osxfs）の仕様上、ファイル更新からコンテナーへの反映までにラグがありました。





たとえば、ホスト側でCSSファイルを編集し、編集した内容が正しく反映できているかどうかを確認するために、ブラウザを立ち上げてキャッシュを削除してリロードしても、更新が反映されるまではかなりのラグがありました。




    
    docker cp <Container ID>:<src paath> <dest path>





ファイル更新の都度、コマンドを実行する、またはコンテナーの再起動を実施することで上記の問題は改善されるのですが、それではわざわざマウントしている意味がありません。しかし、ここ最近のDocker for Macのアップデートにより同期速度が改善されました。今回、実機で使用しているDockerのバージョンは以下の通りです。




    
    Docker version 17.09.0-ce, build afdb6d4





## ホストとコンテナーのボリュームの同期が遅い問題を解決する





Dockerによるコンテナーの管理は、`docker-compose`が便利です。詳細については、[たった1行で複数コンテナーを起動！Docker ComposeでWordPress環境をもっと楽に管理しよう！ – OTTAN.XYZ](/docker-compose-wordpress-5694/)をご参照ください。





### docker-compose.ymlに追加するたった1つの単語





`docker-compose`によるコンテナーの管理を行うためには、あらかじめ`docker-compose.yml`と呼ばれるYAML形式のファイルを作成しておく必要があります。前述のWordPress開発環境構築のためにご紹介したymlファイルが以下の通りですが、今回はボリュームの同期速度を改善するためのオプションを追加しています。




    
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





それが、`volumes:`オプションの最後に追加した`:cached`です。このオプションを追加することで、同期速度が従来よりもかなり改善されます。たった、この1つのオプションを追加するだけで、前述のブラウザのリロードによるCSSファイルの編集の反映を確認する程度であれば、気にならないくらいの同期速度になりました。





もし、Docker for Macを使用してい、ホストとコンテナー間の同期の遅さの問題に苦しんでいる場合、docker-syncなどのサードパーティ製ツールを使用しているが、Docker標準機能だけで解決したい（余計なコンテナーを作成しリソースを消費したくない）という場合には、こちらの方法をお試しください。
