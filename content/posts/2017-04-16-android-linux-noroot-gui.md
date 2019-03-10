---
author: ottan
date: 2017-04-16 08:44:16+00:00
draft: false
title: AndroidでLinux！root化不要でAndroid上にGNU/Linux環境を構築する方法
type: post
url: /android-linux-noroot-gui-5690/
categories:
- Android
tags:
- Development
- Linux
---

![](/images/2017/04/170416-58f2d18ac9db7.jpg)









#### Android 8（Oreo）以降について




本手順は、Android 7以前のみでお試しいただけます。Android 8以降の機種ではご利用になれませんのでご注意ください。（ご指摘ありがとうございます）








Androidは、Linuxカーネルにより動作しています。しかし、Androidは、Linuxカーネルにより動作しているというだけで、たとえば、UbuntuやLinux MintといったLinuxのディストリビューションとして有名なOSとは似て非なるものです。動作するアプリケーションも異なります。





そこで、Androidタブレットなど比較的解像度の高いタブレットを持っているなら試してみたいのが、AndroidのLinux化。Androidでこのような環境を実現するためには、root化（特権）必須と思われがちですが、Google Playで配布されているアプリを使用すれば、擬似root環境で、Android上でLinuxを動作させることができます。そこで、今回は、root化は実施せずに、通常のGoogle Playアプリを使用して、Android上でLinuxを動作させる方法についてご紹介します。





## Android OSでLinux（Debian）を動作させる





### GNURoot DebianとXServer XSDLのダウンロード





まず、Android OSでLinuxを動作させるための前提アプリとして、「GNURoot Debian」と「XServer XSDL」をダウンロードしておきます。お使いのデバイスに対応しているかどうかを事前に確認しておきましょう。



{{< googleplay "com.gnuroot.debian" >}}



「GNURoot Debian」は、Androidのサンドボックス内で動作するDebianの擬似的環境を提供します。他のAndroidアプリと同様の権限で動作するため、root化は不要です。「GNURoot Debian」は、`proot`と呼ばれる、root権限を得ることのできない非特権ユーザが、別のrootディレクトリ（擬似rootディレクトリ）配下においてプログラムをroot権限で動作させるためのプログラムを利用しています。`chroot`と似ていますが、同プログラムは実行するためには、root権限が必要であるため、Androidでは非root端末では使用できません。





「GNURoot Debian」には端末エミュレーターが付属しているため、CUI環境からAndroid上で動作するDebianにアクセスできます。



{{< googleplay "x.org.server" >}}



続いて、DebianのGUI環境を使用するためにX Windows Systemを動作させるためのXサーバである「XServer XSDL」をインストールします。「XServer XSDL」を併用することで、DebianのGUI環境にアクセスすることができるようになります。これによって、AndroidタブレットでLinuxのGUI環境を操作できます。





### GNURoot Debianのセットアップ





では、実際にLinux環境を構築してみましょう。「GNURoot Debian」を起動します。





![](/images/2017/04/170416-58f2d1a0c9ad5.png)






すると、自動的にDebian環境のセットアップが行われます。セットアップは自動的に実施されますが、時間を要しますので気長に待ちましょう。





![](/images/2017/04/170416-58f2d1a5a4d30.png)






しばらくすると、このように（擬似的な）`root`ユーザのプロンプトが表示されます。プロンプトが表示されたら、リポジトリおよびパッケージを最新化しておきましょう。ソフトウェアキーボード（Android標準のフリック入力のキーボード）を使用して、端末エミュレーターを操作します。画面をタップするとキーボードがあらわれます。`root`ユーザのプロンプトが表示されたら以下のコマンドを実行してください。




    
    apt-get update
    apt-get upgrade





APT（Advanced Packaging Tool）は、Debianのパッケージ管理ソフトウェアです。現在では、多くのLinux系ディストリビューションで使用されているソフトウェアです。





![](/images/2017/04/170416-58f2d1af0474e.png)






パッケージのアップグレード中にこのようなプロンプトが表示されたら、`y`と入力してEnterキーをタップします。自動的にパッケージの最新化が行われます。





![](/images/2017/04/170416-58f2d1b827a35.png)






再び`root`ユーザのプロンプトが表示されるまで待機しておきます。以上で、「GNURoot Debian」のセットアップは完了です。最後に、デスクトップ環境をインストールします。ここでは軽量なデスクトップ環境である「LXDE」（Lightweight X11 Desktop Environment）をインストールします。その他、数多くのソフトウェアが開発されていますが、DebianがAndroid上で動作する擬似的な環境であることを考慮して、リソース消費量の少ない軽量なソフトウェアである「LXDE」を選択しました。以下のコマンドでインストールします。




    
    apt-get install lxde





### XServer XSDLのセットアップ





続いて、インストールした「XServer XSDL」を起動しましょう。「GNURoot Debian」を起動させたまま「XServer XSDL」を起動します。ホームボタンをタップして、ホーム画面に一度戻った上で「XServer XSDL」を起動します。





![](/images/2017/04/170416-58f2d1bf564ab.png)






フォントのダウンロードが求められるため、チェックボックスをタップして、「OK」をタップします。





![](/images/2017/04/170416-58f2d1c66c497.png)






デスクトップ環境の解像度やフォントサイズ等を簡易に調節できますが、ひとまずデフォルトのままで問題ありません。カスタマイズしたい場合には、スクリーンのどこかをタップします。タップしないまま一定時間が経過するとXサーバが起動します。





![](/images/2017/04/170416-58f2d1cc9a72f.png)






この青い画面が表示されたら起動は完了です。「XServer XSDL」を起動したまま、先ほどの「GNURoot Debian」に戻ります。





![](/images/2017/04/170416-58f2d1d55811e.png)






ホームボタンが表示されない場合は、画面の上端から下側にスワイプすると、ホームボタンやアプリケーションの切り替えボタンが表示されるはずです。





![](/images/2017/04/170416-58f2d1df0e9cb.png)






そのまま通知画面を表示し、「端末エミュレーター」をタップしましょう。「GNURoot Debian」の端末エミュレーターに戻ることができます。ホームボタンに表示されているアイコンをタップすると、別セッションが起動しますので、現在のセッションを再開したい場合には、通知画面から行います。





### GUI環境にアクセスする





では、端末エミュレーターを起動したら、GUI環境にアクセスしてみましょう。





![](/images/2017/04/170416-58f31b99ddeed.png)






`root`プロンプトが表示されたら、以下のコマンドを実行します。先ほど、「XServer XSDL」の青い画面に表示されたコマンドを実行します。




    
    export DISPLAY=:0 PULSE_SERVER=tcp:127.0.0.1:4712
    startlxde &





以上で、準備は完了です。





![](/images/2017/04/170416-58f31ba14f21d.png)






再び、画面上端から下側にスワイプし、通知画面を表示します。「XServer XSDL」をタップしましょう。





![](/images/2017/04/170416-58f2d1fb363ff.png)






少々画面が小さくわかりづらいですが、GUI環境にアクセスすることができれば準備は完了です。停止したい場合は、「XServer XSDL」の場合は、通知画面から「STOP」、「GNURoot Debian」の場合は、端末エミュレーターの画面で「×」ボタンをタップします。
