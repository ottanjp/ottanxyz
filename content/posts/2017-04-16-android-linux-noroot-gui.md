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

Android は、Linux カーネルにより動作しています。しかし、Android は、Linux カーネルにより動作しているというだけで、Linux のディストリビューションとして有名な OS とは似て非なるものです。動作するアプリケーションも異なります。

そこで、Android タブレットなど比較的解像度の高いタブレットを持っているなら試してみたいのが、Android の Linux 化。Android でこのような環境を実現するためには、root 化（特権）必須と思われがちです。しかし、Google Play で配布されているアプリを使用すれば、擬似 root 環境で、Android 上で Linux を動作させることができます。そこで、今回は、root 化は実施せずに、通常の Google Play アプリを使用して、Android 上で Linux を動作させる方法についてご紹介します。

## Android OS で Linux（Debian）を動作させる

### GNURoot Debian と XServer XSDL のダウンロード

まず、Android OS で Linux を動作させるための前提アプリとして、「GNURoot Debian」と「XServer XSDL」をダウンロードしておきます。お使いのデバイスに対応しているかどうかを事前に確認しておきましょう。

{{< googleplay "com.gnuroot.debian" >}}

なお、「GNURoot Debian」はAndroid 8（Oreo）以降ではご利用になれません。代わりに「UserLAnd」を使用してください。また、以下の説明を「UserLAnd」に読み替えてご利用ください。

{{< googleplay "tech.ula" >}}

「GNURoot Debian」は、Android のサンドボックス内で動作する Debian の擬似的環境を提供します。他の Android アプリと同様の権限で動作するため、root 化は不要です。「GNURoot Debian」は、`proot`と呼ばれるプログラムを利用しています。root 権限を得ることのできない非特権ユーザが、別の root ディレクトリ（擬似 root ディレクトリ）配下においてプログラムを root 権限で動作させるためのプログラムです。`chroot`と似ていますが、同プログラムは実行するためには、root 権限が必要であるため、Android では非 root 端末では使用できません。

「GNURoot Debian」には端末エミュレーターが付属しているため、CUI 環境から Android 上で動作する Debian にアクセスできます。

{{< googleplay "x.org.server" >}}

続いて、Debian の GUI 環境を使用するために X Windows System を動作させるための X サーバである「XServer XSDL」をインストールします。「XServer XSDL」を併用することで、Debian の GUI 環境にアクセスできます。これによって、Android タブレットで Linux の GUI 環境を操作できます。

### GNURoot Debian のセットアップ

では、実際に Linux 環境を構築してみましょう。「GNURoot Debian」を起動します。

![](/images/2017/04/170416-58f2d1a0c9ad5.png)

すると、自動的に Debian 環境のセットアップが行われます。セットアップは自動的に実施されますが、時間を要しますので気長に待ちましょう。

![](/images/2017/04/170416-58f2d1a5a4d30.png)

しばらくすると、このように（擬似的な）`root`ユーザのプロンプトが表示されます。プロンプトが表示されたら、リポジトリおよびパッケージを最新化しておきましょう。ソフトウェアキーボード（Android 標準のフリック入力のキーボード）を使用して、端末エミュレーターを操作します。画面をタップするとキーボードがあらわれます。`root`ユーザのプロンプトが表示されたら以下のコマンドを実行してください。

    apt-get update
    apt-get upgrade

APT（Advanced Packaging Tool）は、Debian のパッケージ管理ソフトウェアです。現在では、多くの Linux 系ディストリビューションで使用されているソフトウェアです。

![](/images/2017/04/170416-58f2d1af0474e.png)

パッケージのアップグレード中にこのようなプロンプトが表示されたら、`y`と入力して Enter キーをタップします。自動的にパッケージの最新化が行われます。

![](/images/2017/04/170416-58f2d1b827a35.png)

再び`root`ユーザのプロンプトが表示されるまで待機しておきます。以上で、「GNURoot Debian」のセットアップは完了です。最後に、デスクトップ環境をインストールします。ここでは軽量なデスクトップ環境である「LXDE」（Lightweight X11 Desktop Environment）をインストールします。その他、数多くのソフトウェアが開発されています。しかし、Debian が Android 上で動作する擬似的な環境であることを考慮して、リソース消費量の少ない軽量なソフトウェアである「LXDE」を選択しました。以下のコマンドでインストールします。

    apt-get install lxde

### XServer XSDL のセットアップ

続いて、インストールした「XServer XSDL」を起動しましょう。「GNURoot Debian」を起動させたまま「XServer XSDL」を起動します。ホームボタンをタップして、ホーム画面に一度戻った上で「XServer XSDL」を起動します。

![](/images/2017/04/170416-58f2d1bf564ab.png)

フォントのダウンロードが求められるため、チェックボックスをタップして、「OK」をタップします。

![](/images/2017/04/170416-58f2d1c66c497.png)

デスクトップ環境の解像度やフォントサイズ等を簡易に調節できますが、ひとまずデフォルトのままで問題ありません。カスタマイズしたい場合には、スクリーンのどこかをタップします。タップしないまま一定時間が経過すると X サーバが起動します。

![](/images/2017/04/170416-58f2d1cc9a72f.png)

この青い画面が表示されたら起動は完了です。「XServer XSDL」を起動したまま、先ほどの「GNURoot Debian」に戻ります。

![](/images/2017/04/170416-58f2d1d55811e.png)

ホームボタンが表示されない場合は、画面の上端から下側にスワイプすると、ホームボタンやアプリケーションの切り替えボタンが表示されるはずです。

![](/images/2017/04/170416-58f2d1df0e9cb.png)

そのまま通知画面を表示し、「端末エミュレーター」をタップしましょう。「GNURoot Debian」の端末エミュレーターに戻ることができます。ホームボタンに表示されているアイコンをタップすると、別セッションが起動しますので、現在のセッションを再開したい場合には、通知画面から行います。

### GUI 環境にアクセスする

では、端末エミュレーターを起動したら、GUI 環境にアクセスしてみましょう。

![](/images/2017/04/170416-58f31b99ddeed.png)

`root`プロンプトが表示されたら、以下のコマンドを実行します。先ほど、「XServer XSDL」の青い画面に表示されたコマンドを実行します。

    export DISPLAY=:0 PULSE_SERVER=tcp:127.0.0.1:4712
    startlxde &

以上で、準備は完了です。

![](/images/2017/04/170416-58f31ba14f21d.png)

再び、画面上端から下側にスワイプし、通知画面を表示します。「XServer XSDL」をタップしましょう。

![](/images/2017/04/170416-58f2d1fb363ff.png)

少々画面が小さくわかりづらいですが、GUI 環境にアクセスできれば準備は完了です。停止したい場合は、「XServer XSDL」の場合は、通知画面から「STOP」、「GNURoot Debian」の場合は、端末エミュレーターの画面で「×」ボタンをタップします。
