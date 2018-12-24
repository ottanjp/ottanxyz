---
author: ottan
date: 2016-05-01 11:50:24+00:00
draft: false
title: VCCW（Vagrant＋VirtualBox＋Chef＋WordPress）のメール送信テスト環境には、MailCatcherが最適！
type: post
url: /vccw-vagrant-virtualbox-chef-wordpress-mailcatcher-6857/
categories:
- Mac
- Blog
tags:
- WordPress
- Development
---

![](/images/2016/05/160501-5725e9562d436.png)






ローカルのWordPressの開発環境を用意するのであれば、[VCCW - A WordPress development environment.](http://vccw.cc/)を使用しましょう。VagrantとVirtualBoxさえあれば、なんでもそろった無償の開発環境を迅速に構築できます。VCCWの構築方法については、[gulp.jsとBrowser Syncで快適なWordPress開発環境を手に入れる](https://ottan.xyz/gulp-browser-sync-476/)をご参照ください。



https://ottan.xyz/gulp-browser-sync-476/



## VCCWの開発環境でメール送信テストを行う





VCCWを使用すれば簡単にローカルホストにWordPressの開発環境を構築できるので、独自のテーマ、プラグイン、ウィジェットの開発に非常に役に立っているのですが、唯一困っていたのが「Contact Form」などのメール送信テストを行う環境。





たとえば、弊サイトでは最近ページごとにご意見を匿名で簡単に送っていただける送信フォームを用意したのですが、いきなり本番環境に適用するわけにもいかず、どうしてもローカルでテストをしたかったのです。





![](/images/2016/05/160501-5725e999a690c.png)






しかし、そこは天下のVCCW、ちゃんとメール送信テストを行うための環境もデフォルトで用意されていました。それは、[MailCatcher](https://mailcatcher.me/)というソフトウェア。シンプルなSMTPサーバで、WordPressから送信されたメールを、独自のWebインタフェースで簡単に確認を行うことができるようになります。ちょっとしたテストに十分すぎるほど充実した機能！





### VCCW（Vagrant）でMailCatcherを使用する





VCCWでは、デフォルトでMailCatcherは有効化されていません。有効化するためには、VirtualBoxの仮想マシンにログインして、MailCatcherを起動する必要があります。




    
    $ cd ~/Documents/vccw-2.19.0
    $ vagrant ssh





MailCatcherを起動するために仮想マシンにログインします。上記のパスは、VCCWのVagrantfileが置いてある場所です。ログインしたら、以下のコマンドを実行します。




    
    $ curl -L https://raw.githubusercontent.com/vccw-team/activate-mailcatcher/master/setup.sh | bash





これで、自動的にMailCatcherがセットアップされ、起動します。MailCatcherが起動したら、ブラウザから`http://192.168.33.10:1080`にアクセスします。





![](/images/2016/05/160501-5725e95ae9443.png)






これが、MailCatcherのWebインタフェースです。WordPressで送信したメールはすべてMailCatcherが受け取ります。これで、メール送信テストも手軽に行うことができますね。





もし、MailCatcherのデーモン（プログラム）が落ちたりした場合や、次回以降の起動には、仮想マシンにログインした状態で、以下のコマンドを実行します。




    
    $ mailcatcher --ip=0.0.0.0





## まとめ





ローカルのメール送信テスト環境をどうしようかずっと悩んでいたのですが、まさかデフォルトでVCCWに組み込まれていたとは…。これでしばらくWordPressの開発環境に困ることはなさそうです。
