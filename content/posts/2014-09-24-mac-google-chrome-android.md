---
author: ottan
date: 2014-09-24 09:06:30+00:00
draft: false
title: MacのGoogle Chrome上でAndroidアプリを動作させる方法
type: post
url: /mac-google-chrome-android-596/
categories:
- Android
- Mac
tags:
- Development
- Google
---

![](/images/2014/09/140924-5422890c10545.jpg)






これまでも数々のAndriodエミュレーターは目にしてきましたが、今回ご紹介する方法は、Google Chrome上で動作させる方法です。理想はChrome OS上で動作させることですが、環境がないのでMacのGoogle Chromeで試してみました。





## 事前準備





### macOSのChromeでAndroidを起動するためのAndroidエミュレーターのインストール





まずは、macOSのChrome上でAndroidアプリを動作させるためのエミュレーターを[chromeos-apk/archon.md at master · vladikoff/chromeos-apk](https://github.com/vladikoff/chromeos-apk/blob/master/archon.md)からダウンロードします。注意点として、**現状の安定板であるChromeは64bit版が提供されていない**ため、32bit版をダウンロードするようにしてください。





![](/images/2014/09/140924-542288f09f4fb.png)






### ARChonを拡張機能として登録する





先ほどダウンロードしたファイルは解凍してください。解凍するとフォルダーができ上がりますが、そのフォルダーがまるごとGoogle Chromeの拡張機能になります。Google Chromeの拡張機能を開いたら、右上の「デベロッパーモード」をオンにしてください。





![](/images/2014/09/140924-542288f9e6df0.png)






次に「パッケージ化されていない拡張機能を読み込む」を選択し、先ほど解凍したARChonのフォルダーを選択してください。すると何点か警告が表示されます。以下に類似する警告であれば問題なく動作しますので、そのまま進めてください。





![](/images/2014/09/140924-542288fb3468f.png)







  * 'minimum_chrome_version' is only allowed for extensions, hosted apps, legacy packaged apps, and packaged apps, but this is a shared module.
  * Unrecognized manifest key 'arc_build_tag'.




### apkファイルを拡張機能としてChromeに登録するコマンド





次にapkファイル（Androidアプリで動作するようパッケージングされたアプリケーションファイル）を、Google Chromeの拡張機能として登録できるように変換するコマンドをダウンロードします。インストールには、Node.jsのパッケージ管理ツールである`npm`が必要になりますのであらかじめダウンロードしておいてください。





なお、弊サイトでも[はじめてのgulp.js！MacでCSSファイル、JavaScriptの圧縮を行おう](https://ottan.xyz/gulp-css-sass-268/)で`npm`コマンドについて詳しく解説していますので、そちらも合わせて参照してください。




    
    $ sudo npm install chromeos-apk -g





### Google Playからapkファイルをダウンロードする





次に目的のアプリを[Google Play](https://play.google.com/store?hl=ja)で検索します。今回は分かりやすい例として「Amazon」アプリにしましたが、他のアプリケーションでも構いません。





![](/images/2014/09/140924-542288f297fd8.png)






この時表示されるアプリ固有のリンクをコピーして控えておいてください。たとえば、Amazonのアプリであれば以下のようなURLになります。




    
    https://play.google.com/store/apps/details?id=com.amazon.mShop.android.shopping





次に、[APK Downloader [Latest] Download Directly | Chrome Extension v2.1.2 (Evozi Official)](http://apps.evozi.com/apk-downloader/)を開いてください。テキストボックスに先ほどコピーしたURLを入力して、「Generate Download Link」ボタンをクリックします。





![](/images/2014/09/140924-542288fca99a0.png)






緑色のダウンロードリンクが表示されるため、クリックしてapkファイルをダウンロードしてください。このように、apkファイルの入手には「APK Downloader」がとても便利です。





![](/images/2014/09/140924-542288fe57d1f.png)






続いて、ダウンロードしたAmazonアプリのapkファイルを、Google Chromeの拡張機能として登録するために、`chromeos-apk`コマンドを使用します。ダウンロードしたフォルダーで以下のコマンドを実行してください。




    
    $ chromeos-apk jp.amazon.mShop.android.apk





すると、apkファイルとは別に拡張機能の登録に必要なフォルダーが作成されているかと思います。このフォルダーを先ほどと同じ要領で拡張機能に登録します。「パッケージ化されていない拡張機能を読み込む」を選択しましょう。





![](/images/2014/09/140924-542289004ecb0.png)






`chromeos-apk`コマンド実行後に作成されたフォルダーを選択してください。





![](/images/2014/09/140924-5422890181937.png)






拡張機能としての登録時に1点警告が表示されますが、動作に支障はありませんのでそのまま無視していただいて構いません。






  * Unrecognized manifest key 'arc_metadata'.




![](/images/2014/09/140924-542289034aa6f.png)







## 起動方法





先ほど登録したAmazonアプリはGoogleのアプリランチャーに登録されています。ランチャーにアクセスするためにはブックマークバーの左端のボタンをクリックします。





![](/images/2014/09/140924-5422890b46c55.png)






見事に先ほど登録したAmazonアプリが表示されています。





![](/images/2014/09/140924-542289057fa2d.png)






起動することでAndroidアプリとしてGoogle Chrome上で動作します。





![](/images/2014/09/140924-542289082e19e.png)






## まとめ





今回の手順をまとめておきましょう。





初期構築時はさまざまな障壁が存在する様に感じますが、一連の流れを一度行ってしまえば、後はapkファイルを入手して拡張機能として登録するだけです。






  * Google Playでお気に入りのアプリを見つけてそのURLをコピーする
  * APK Downloaderからお気に入りのアプリのapkファイルを入手する
  * 「chromeos-apk」コマンドで入手したアプリを拡張機能に変換する`

