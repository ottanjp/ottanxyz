---
author: ["@ottanxyz"]
date: 2015-11-08T00:00:00+00:00
draft: false
title: macOSで右クリック1つでアニメーションGIFファイルを作る方法
type: post
slug: automator-animated-gif-6817
categories:
  - Mac
tags:
  - Tips
---

![](/uploads/2015/11/151108-563f43efc6d2e-1.jpg)

複数の画像ファイルから簡単に GIF アニメーションファイルを作成する方法をご紹介します。対象の画像を選択して、右クリック 1 つで作成することができるため、誰でも簡単に GIF アニメーションを作成できます。ぜひ、お試しください。

## macOS のサービスから GIF アニメーションを作成する

GIF アニメーションを作成するためには、[ImageMagick: Convert, Edit, Or Compose Bitmap Images](http://www.imagemagick.org/script/index.php)と呼ばれるツールを使用します。ImageMagick は、macOS のパッケージ管理マネージャーである Homebrew から簡単にインストールできます。

### Homebrew のインストール

Homebrew のインストールについては、[Mac でプレゼン資料に数式を貼り付けるのに便利な「LaTeXiT」](/posts/2014/09/mac-latex-presentation-92/)でも詳しくご紹介していますのでご覧ください。インストールは以下のコマンドを実行するだけです。インストール方法は随時変更になる可能性もありますので、詳細は[Homebrew — macOS 用パッケージマネージャー](https://brew.sh/index_ja.html)を参照してください。

    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

### ImageMagick のインストール

次に、ImageMagick をインストールします。インストールと言っても、ターミナルから以下のコマンドを実行するだけです。

    brew install imagemagick

### Automator によるサービスの作成

次に、Automator で macOS のサービスを作成します。「アプリケーション」→「ユーティリティ」から「Automator」を起動してください。Automator を起動したら、書類の種類は「サービス」を選択し、「選択」ボタンをクリックします。

![](/uploads/2015/11/151108-563f43f0e6141-1.png)

「選択項目」は**「ファイルまたはフォルダー」**、検索対象を**「Finder.app」**とします。

![](/uploads/2015/11/151108-563f43f263b63.png)

ライブラリから**「選択された Finder 項目を取得」**を右側のペインにドラッグ＆ドロップします。

![](/uploads/2015/11/151108-563f43f452629.png)

続いて、ライブラリから**「シェルスクリプトを実行」**を右側のペインにドラッグ＆ドロップします。シェルは**「/bin/bash」**、入力の引き渡し方法を**「引数として」**を選択します。

本文には以下のコマンドを入力します。

    /usr/local/bin/convert -delay 20 -loop 0 "$@" ~/Desktop/animated.gif

![](/uploads/2015/11/151108-563f43f805bc2.png)

最後に名前を付けてサービスを保存します。名称は任意で構いませんが、わかりやすい名前にしておきましょう。ここでは「Make Animated GIF」としました。以上で、Automator の作成は完了です。

![](/uploads/2015/11/151108-563f43fb0e88b.png)

### 使い方

GIF アニメーションを作成するための元となる画像を複数用意します。ここでは、画面のスクリーンショットを用意しました。

![](/uploads/2015/11/151108-563f43fbf2901.png)

すべての画像を選択した状態で「右クリック」→「サービス」→「Make Animated GIF」をクリックします。

![](/uploads/2015/11/151108-563f43ffacc00.png)

すると、以下のような GIF アニメーションファイルがデスクトップの「animated.gif」という名前で保存されました。

![](/uploads/2015/11/151108-563f4404e4eb6.gif)

## まとめ

コマンドの「-delay」オプションの数値を大きくすると、アニメーション GIF の画像から画像への 遷移時間が長くなります。また、「-loop」オプションの数値を変更するとループする回数を変更することもできます。簡単に GIF アニメ − ションを作成することができるため、ぜひお試しください。

via：[Make Animated GIFs In macOS With A Right-click | Jacob Salmela](https://jacobsalmela.com/2015/11/02/make-animated-gifs-in-os-x-with-a-right-click/)
