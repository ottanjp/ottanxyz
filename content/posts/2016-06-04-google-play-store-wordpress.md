---
author: ottan
date: 2016-06-04 12:53:23+00:00
draft: false
title: WordPressの本文にGoogle Play StoreのURLを貼り付けるだけで、リンクを生成できるようにする
type: post
url: /google-play-store-wordpress-4409/
categories:
- Android
- WordPress
tags:
- Apps
- Development
- Google
---

![](/images/2016/06/160604-5752cc4aacb45.jpg)






以前、ご紹介したApp StoreのURLを貼り付けるだけでリンクを生成できる、Google Play Store版です。



https://ottan.xyz/wordpress-app-store-itunes-link-affiliate-4120/



## Google Play Storeから自動的にリンクを取得する





Google Play Storeから自動的にリンクを取得するための方法をご紹介します。ただし、この方法には注意点がありますので、後ほど説明します。





### ライブラリ





Google Play Storeは、iTunes Storeのように、検索のためのAPIが用意されていない（Google Custom Searchは制限が厳しい）ため、自前で用意する必要があります。そのために、事前にライブラリを用意しておきます。PHPでHTMLをパースするための有名なライブラリです。



https://sourceforge.net/projects/simplehtmldom/files/



### ソースコード





ソースコードは以下の通りです。ポイントは、冒頭でご紹介したApp StoreのURL生成と同様の原理のため内容は割愛します。



https://gist.github.com/ottanxyz/1f0bf483156ea9b72952ed9885d0faea



### ディレクトリ構成





ダウンロードしたソースコードを、`functions.php`から読み込んでください。その際に、上記のライブラリを合わせて読み込む必要があります。今回は下記のようなディレクトリ構成で作成していますので、適宜ご自身の環境に合わせて修正して使用してください。




    
    ├── css
    ├── functions.php
    ├── img
    ├── include
    │   ├── class
    │   │   └── class-google-play-link-builder.php
    │   └── lib
    │   　   └── simple_html_dom.php
    └── style.css





### 取得できる情報





このAPIを使用して取得できる情報（`$results`）は、以下の通りです。現状では、URL、アイコン（`cover_image`、タイトル（`id_app_title`）、説明（`description`）、著者（`author`）、価格（`price`）のみですが、もし使用してくださる方がいて、ご要望があれば追加も検討します。




    
    array (size=6)
      'url' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'https://play.google.com/store/apps/details?id=com.campmobile.snow'</font> (length=65)
      'cover_image' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'//lh3.googleusercontent.com/QmVJyHcDJjR5yPjde1PbfPuBSMNEBHdB0Q1qOEJrhMIEQ0rySmOKWxrCosQ2B0umhTE=w300'</font> (length=100)
      'id_app_title' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">' スノー SNOW - 自撮り、顔認識スタンプ、ウケるカメラ '</font> (length=73)
      'description' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">' SNOWで友達と楽しく動画メッセージを送りあってみてね！顔認識スタンプ/フィルターで撮影した動画を友達に送ってみよう
    チャットはGIFメッセージでよりリアルに表現可能へ！
    LIVEへ動画を投稿して友達たちと日常を公有してみない？？
    ■SNOWをもっと楽しむ方法1. 顔認識スタンプと多様なスタンプ
    インスタを占領しているワンチャン、キモカワリスなどSNOWでしか会えない
    愛�'...</font> (length=1590)
      'author' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'SNOW Team '</font> (length=10)
      'price' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'0'</font> (length=1)
    





### スタイルシート





Gistに公開しているクラス中で使用しているスタイルシートもご紹介しておきます。これは、WordPressの管理画面のプラグイン追加画面に使用されているスタイルシートをカスタマイズしたものです。



https://gist.github.com/ottanxyz/4097069b66be012078d35385cb32fbdd



### デモ





実際に、URLを貼り付けるとこのような感じになります。



{{< googleplay "com.mojang.minecraftpe" >}}



### 注意点





ソースコードや読み込むライブラリを見ていただければわかるとおり、このライブラリには最大の欠点があります。それは、**Google Play Storeの仕様に大幅に左右される**ということです。現状、Google Play Storeの検索APIが用意されていないため、暫定的な手段になります。GitHub等でも同等のライブラリを検索してみましたが、古い仕様のものが多かったです。





## まとめ





何か不具合等、発見されましたらページ下部のご意見ボード、または[@ottanxyz](https://twitter.com/ottanxyz)、コメント欄などでお待ちしています。
