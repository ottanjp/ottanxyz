---
author: ottan
date: 2016-08-01 14:40:59+00:00
draft: false
title: 詳細な解説付き！今から始めるDocker for Mac！快適なWordPress開発環境を手に入れよう！
type: post
url: /docker-for-mac-wordpress-4711/
categories:
- Mac
- Blog
tags:
- Development
- Docker
---

![](/images/2016/08/160801-579f4ca3588a2.jpg)






弊サイトでは、WordPressのテーマ、プラグイン開発環境として、[VCCW - A WordPress development environment.](http://vccw.cc/)を推奨してきました。Vagrant + VirtualBoxによる多機能な開発環境であるVCCW推奨の方針は変わらないのですが、[Docker for Mac](https://docs.docker.com/engine/installation/mac/)の登場により、より快適な環境をMacに構築できるようになりました。もう、VagrantもVirtualBoxも不要です。しかも、一瞬で作成できます。



https://ottan.xyz/vccw-wordmove-deploy-4092/



## Docker for MacでWordPress開発環境を手に入れる





Dockerの概念については、他サイトに譲るとして、ここではMac OS上にWordPressの開発環境を構築すること目的とします。以下のような心配がありますか？






  * WordPressを動作させるWebサーバ（Apache、Nginx）を用意していない
  * WordPressのデータを格納するMySQLを用意していない
  * Mac OS上の既存の開発環境を壊したくない




Docker for Macならもう大丈夫です。上記のような心配は、すべて「コンテナー型」仮想化がすべて解決してくれます。そう、Docker for Macは、Macで動作する仮想化技術です。仮想化されているため、既存の環境とは分離されます。





また、Dockerの「コンテナー」には「イメージ」が必要です。「イメージ」とは、テンプレートです。テンプレートは複数用意されています。テンプレートをダウンロードして、（箱を表す）コンテナーで動作させれば良いのです。既存の環境はコンテナーに手を出すこともありませんし、その逆も然りです。





しかも、Dockerは、MacのみならずWindowsでも動作します。もう、ハイパーバイザーのような仕組みは不要です。もちろん、このようなコンテナー型仮想化がすべてのシステムに向いているわけではありませんが、少なくともWordPressの開発環境を作るだけなら、Dockerで十分です。





### Dockerのインストール





[Docker for Mac](https://docs.docker.com/engine/installation/mac/)から、ディスクイメージファイル（dmg）をダウンロードして、ウィザードにしたがってインストールするだけです。インストールが完了したら、ターミナルを起動します。すでに起動している場合は、再起動します。





### Dockerの基本操作





#### コンテナーの作成





Dockerには、「コンテナー」で動作する「イメージ」が必要だと言いました。単独で「イメージ」をダウンロードし、ダウンロードした「イメージ」を「コンテナー」に紐付けて、ということもできますが、そのような煩わしいことすらする必要はありません（2016/9/6追記：オプションが誤っていたため修正しました）。




    
    $ docker run --name db -e MYSQL_ROOT_PASSWORD=pass -d mysql:5.7





`--name`オプションにコンテナーの名称を、`-e`オプションに環境変数を、`-d`オプションはデタッチ（バックグラウンドで起動）を表します。また、`run`コマンドの最後にイメージの名称を指定します。ここでは、イメージに「mysql:5.7」を指定しています。「mysql」はイメージ名、「5.7」はタグ（バージョン）と呼ばれるものです。利用できるイメージ、タグは、[Docker Hub](https://hub.docker.com/)で確認できます。今回使用するMySQLは、[mysql](https://hub.docker.com/_/mysql/)で確認できます。タグを指定しない場合は、最新の安定版がダウンロードされます。





環境変数の`MYSQL_ROOT_PASSWORD`は、MySQLのrootユーザのパスワードを指定します。この環境変数を指定しないとコンテナーを起動できません。





初回起動時は、自動的に「イメージ」のダウンロードが始まります。そのため、初回起動時のみ時間がかかります。一度、ダウンロードしてしまえば、2回目以降は即時起動します。





以上で、コンテナーの作成は完了です。MySQLが動作する独立した仮想マシンが1つ作成できました。すごいですね！





#### コンテナーの停止／起動





リソースを解放するために、不要なコンテナーは停止しておきます。停止するためには、以下のコマンドを実行します。




    
    $ docker stop db





`db`は、先ほど指定したコンテナーの名前です。コンテナーを再び起動するには、以下のコマンドを実行します。




    
    $ docker start db





コンテナーの状態を確認するためには、以下のコマンドを実行します。




    
    $ docker ps -a





`-a`オプションは、停止しているコンテナーも含めて、すべての情報を表示します。




    
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
    beac86d91c58        mysql:5.7           "docker-entrypoint.sh"   3 seconds ago       Up 2 seconds        3306/tcp            db





#### コンテナーの削除





不要になったDockerのコンテナーは削除しましょう。先ほど作成したコンテナーを削除します。コンテナーを削除するためには、事前にコンテナーを停止しておきましょう。




    
    $ docker rm db





#### 削除したコンテナーの再利用





削除したコンテナーを再度利用したい場合は、コンテナーの作成時に実行したコマンドを、再実行するだけです。




    
    $ docker run --name db -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7





#### イメージの削除





コンテナーで使用しているイメージが不要になった場合は、削除します。イメージを削除するためには、イメージを起動しているコンテナーが削除されている必要があります。コンテナーをすべて削除しておいてください。コンテナーをすべて削除した上で、イメージを削除するためには、以下のコマンドを実行します。




    
    $ docker rmi mysql:5.7





`mysql`はイメージ名、`5.7`はタグです。コンテナーの作成時に指定したオプションと同一です。タグを省略した場合は、`latest`と解釈されます。そのため、タグを使用してコンテナーを作成した場合は、必ずタグを指定してください。なお、現在残存しているイメージを確認する場合は、以下のコマンドを実行します。




    
    $ docker images





イメージの情報を確認できます。




    
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    mysql               5.7                 1195b21c3a45        7 weeks ago         380.2 MB





### DockerによるWordPress環境の構築





では、いよいよWordPress環境を構築してみましょう。WordPressは、Docker Hubで提供されていますが、動作させるためには事前にMySQLが起動しているコンテナーを用意する必要があります。前項でご紹介したコンテナーを起動しておいてください。ここでは、コンテナーの名前は`db`とします。では、以下のコマンドを実行してください。




    
    $ docker run --name wordpress --link db:mysql -p 8080:80 -d wordpress





`--name`オプションは、コンテナーの名称です。`--link`オプションは、リンクするコンテナーの名称を指定します（つまり、依存するコンテナー）。`db:mysql`の`db`は、前項で作成したコンテナーの名称です。`mysql`は固定です。`-p`は、ポートフォワーディングに指定します。つまり、ホスト（Mac）の8080番ポートを、コンテナーの80番にフォワーディングします。`-d`オプションはバックグラウンドで実行します。最後にイメージの名称を指定します。今回は、タグを指定しませんでした。タグは、自動的に`latest`（最新版）が指定されます。





`-e`オプションを指定して、環境変数を指定することもできます。環境変数を複数指定する場合は、`-e`オプションを複数指定します。環境変数については、[WordPress](https://hub.docker.com/_/wordpress/)を参照してください。





初回起動時は、イメージのダウンロードを伴うため時間がかかります。コンテナーが起動したら、以下のURLにアクセスしてください。




    
    http://localhost:8080





これで、WordPressのインストール画面が開くと思います。あとは、通常通りの手順でWordPressのインストールを進めてください。





#### Dockerコンテナーへのアクセス





WordPressでテーマやプラグインを開発するためには、WordPressのファイルを直接編集したい場合もあるでしょう。そのような場合には、以下のコマンドを実行します。




    
    $ docker exec -it wordpress /bin/bash





`-i`オプションはインタラクティブモード（対話型モード）、`-t`オプションは仮想端末を割り当てるモードです。これで、コンテナーにアクセスできます。





### DockerによるPhpMyAdminの構築





MySQLをインストールしたら、PhpMyAdminが使いたくなります（？）よね。PhpMyAdminも、オフィシャルイメージがDocker Hubに用意されています。[PhpMyAdmin](https://hub.docker.com/r/phpmyadmin/phpmyadmin/)を参照してください。PhpMyAdminのコンテナーを起動するためには、以下のコマンドを実行してください。




    
    $ docker run --name phpmyadmin -d --link db:db -p 8888:80 phpmyadmin/phpmyadmin





もうオプションのご説明は不要でしょう。`--link`オプションに指定する`db:db`の前者の`db`はコンテナーの名称、後者の`db`は固定です。また、`-p`オプションに指定するポートは、WordPressコンテナーのポートとバッティングしないように注意してください。また、イメージの指定が、MySQLやWordPressと異なりますね。これは、Docker Hubの「Docker Pull Command」を参照してください。また、PhpMyAdminはタグの指定ができません。





## まとめ





今回は、Docker for MacによるWordPress環境の構築についてご紹介しました。「Docker for Mac」の可能性を感じていただけましたでしょうか？高速です。そして、何より楽チンです。今回は、最小限の構成をご紹介したので、とくに、WordPressには何の機能も導入されていません。あくまで最小限にWordPressが動作する環境を提供しているだけです。[appcontainers/wordpress](https://hub.docker.com/r/appcontainers/wordpress/)など、ユーザによるカスタマイズされたWordPress環境も存在しています。Docker Hubを有効活用して最適な構成を見つけてみてください！
