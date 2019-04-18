---
author: ottan
date: 2019-02-23T12:22:20+09:00
draft: false
title: "Macを使用してiPhone、iPadのSafariでデバッグを行う方法"
type: post
url: /ios-safari-debug-mac-20190222/
categories: ["iPhone","Mac"]
tags: ["Safari"]
toc: true
---

![](/images/2019/02/190222-f3634302e6a7067.jpg)

Google ChromeやSafariのブラウザには、デベロッパーツールと呼ばれる開発者向けメニューが付属しています。デベロッパーツールを使用することで、Webアプリケーションのデバッグを簡単に行うことができます。例えば、Google Chromeのコンソールを使用することで、JavaScriptの実行エラーを検出しバグを解析できます。スタイルを操作することで、一時的にサイトのデザインを変更することもできます。

Webアプリケーション作成にはもはや欠かせないツールとなっているデベロッパーツールですが、iPhoneなどのスマートフォンでは使用できません。Google ChromeにはiPhoneやAndroidなどのスマートフォンでの表示をエミュレートする機能があります。ただ、Google Chrome上では正常に動作していても、実際にiPhoneのSafariで確認すると正しく動作しないということがよくあります。

今回は、Macを使ってiPhoneやiPadのSafari上でWebアプリケーションをデバッグする手法をご紹介します。Macを使用するメリットは、Mac、iPhoneの標準機能だけで実現できる点です。

## MacとiPhoneを使ってWebアプリケーションのデバッグを行う

iPhoneのSafariでデバッグを行うためには、iPhone、Macで各々準備が必要です。この準備は初回のみ行う必要があります。次回以降は同様の手順を実施する必要はありません。

### iPhoneの準備

iOSで「設定」→「Safari」→「詳細」と開き、「**Webインスペクタ**」をオンにします。念のため、Safariをいったん終了しておきます。

![](/images/2019/02/190223-92d312e6a706567.jpeg)

### Macの準備

MacでSafariを開きます。メニューバーに「開発」が表示されていることを確認します。「開発」メニューが存在しない場合は、環境設定を開き「詳細」タブの「**メニューバーに"開発"メニューを表示**」をチェックしてください。

![](/images/2019/02/190222-12e31392e706e67.png)

### iPhoneとMacをUSBケーブルを使用して接続する

最後に、iPhoneとMacをUSBケーブルを使用して接続します。iPhoneやiPadに標準で付属しているLightningケーブルは、USB（Type-A）です。MacBook Pro等を使用している場合、USB（Type-C）しかない場合があります。その場合、Type-A、Type-C変換アダプターが必要になりますので準備しておきましょう。以上で準備は完了です。

* [USB-C - Lightningケーブル（1 m） - Apple（日本）](https://www.apple.com/jp/shop/product/MQGJ2FE/A/usb-c-lightning%E3%82%B1%E3%83%BC%E3%83%96%E3%83%AB1-m?fnode=8b)

### iPhoneとMacのSafariを使用してデバッグを行う

では、iPhoneのSafariでデバッグを行ってみましょう。iPhoneのSafariでデバッグを行いたい任意のWebページを開きます。このWebページはローカルネットワーク上でも構いません。

![](/images/2019/02/190222-22d312e6a706567.jpeg)

続いて、**iPhoneのSafariでデバッグしたいWebページを開いた状態**で、MacのSafariを起動します。先にSafariを起動していても問題ありません。「開発」メニューを開くと、「iPhone」のデバイス名が表示されます。この名称は、iPhoneの「設定」→「一般」→「情報」で設定した名称が表示されます。人によって表示される名称が異なりますので注意してください。

![](/images/2019/02/190222-22e31372e706e67.png)

「開発」メニューからデバイス名をたどると、iPhoneのSafariで現在開いているWebページのURLが表示されます。そのURLをクリックします。

![](/images/2019/02/190222-22e32342e706e67.png)

クリックすると、MacのSafariでWebインスペクタが起動します。Webインスペクタは、iPhoneでのSafariの操作が記録されます。例えば正常に動作しないJavaScriptがある場合、「コンソール」タブにエラーが表示されているはずです。また、「要素」タブを使用することでiPhone上でのサイトのデザインを一時的に操作することもできます。操作するデバイスがiPhoneに変わっただけで、MacのSafariで使用できるデベロッパーツールの機能をそのままiPhoneで使用できます。

![](/images/2019/02/190222-22e33302e706e67.png)

iPhone単独ではSafariでデバッグを行うことはできませんが、Macを利用することで簡単にデバッグできます。良きデバッグライフを！