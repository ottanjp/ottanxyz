---
author: ottan
date: 2015-11-08 12:45:32+00:00
draft: false
title: macOSで右クリック1つでアニメーションGIFファイルを作る方法
type: post
url: /automator-animated-gif-6817/
categories:
- Mac
tags:
- Tips
---

![](/images/2015/11/151108-563f43efc6d2e-1.jpg)






複数の画像ファイルから簡単にGIFアニメーションファイルを作成する方法をご紹介します。対象の画像を選択して、右クリック1つで作成することができるため、誰でも簡単にGIFアニメーションを作成できます。ぜひ、お試しください。





## macOSのサービスからGIFアニメーションを作成する





GIFアニメーションを作成するためには、[ImageMagick: Convert, Edit, Or Compose Bitmap Images](http://www.imagemagick.org/script/index.php)と呼ばれるツールを使用します。ImageMagickは、macOSのパッケージ管理マネージャーであるHomebrewから簡単にインストールできます。





### Homebrewのインストール





Homebrewのインストールについては、[Macでプレゼン資料に数式を貼り付けるのに便利な「LaTeXiT」](/mac-latex-presentation-92/)でも詳しくご紹介していますのでご覧ください。インストールは以下のコマンドを実行するだけです。インストール方法は随時変更になる可能性もありますので、詳細は[Homebrew — macOS 用パッケージマネージャー](http://brew.sh/index_ja.html)を参照してください。




    
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"





### ImageMagickのインストール





次に、ImageMagickをインストールします。インストールと言っても、ターミナルから以下のコマンドを実行するだけです。




    
    brew install imagemagick





### Automatorによるサービスの作成





次に、AutomatorでmacOSのサービスを作成します。「アプリケーション」→「ユーティリティ」から「Automator」を起動してください。Automatorを起動したら、書類の種類は「サービス」を選択し、「選択」ボタンをクリックします。





![](/images/2015/11/151108-563f43f0e6141-1.png)






「選択項目」は**「ファイルまたはフォルダー」**、検索対象を**「Finder.app」**とします。





![](/images/2015/11/151108-563f43f263b63.png)






ライブラリから**「選択されたFinder項目を取得」**を右側のペインにドラッグ＆ドロップします。





![](/images/2015/11/151108-563f43f452629.png)






続いて、ライブラリから**「シェルスクリプトを実行」**を右側のペインにドラッグ＆ドロップします。シェルは**「/bin/bash」**、入力の引き渡し方法を**「引数として」**を選択します。





本文には以下のコマンドを入力します。




    
    /usr/local/bin/convert -delay 20 -loop 0 "$@" ~/Desktop/animated.gif





![](/images/2015/11/151108-563f43f805bc2.png)






最後に名前を付けてサービスを保存します。名称は任意で構いませんが、わかりやすい名前にしておきましょう。ここでは「Make Animated GIF」としました。以上で、Automatorの作成は完了です。





![](/images/2015/11/151108-563f43fb0e88b.png)






### 使い方





GIFアニメーションを作成するための元となる画像を複数用意します。ここでは、画面のスクリーンショットを用意しました。





![](/images/2015/11/151108-563f43fbf2901.png)






すべての画像を選択した状態で「右クリック」→「サービス」→「Make Animated GIF」をクリックします。





![](/images/2015/11/151108-563f43ffacc00.png)






すると、以下のようなGIFアニメーションファイルがデスクトップの「animated.gif」という名前で保存されました。





![](/images/2015/11/151108-563f4404e4eb6.gif)






## まとめ





コマンドの「-delay」オプションの数値を大きくすると、アニメーションGIFの画像から画像への	遷移時間が長くなります。また、「-loop」オプションの数値を変更するとループする回数を変更することもできます。簡単にGIFアニメ−ションを作成することができるため、ぜひお試しください。





via：[Make Animated GIFs In macOS With A Right-click | Jacob Salmela](http://jacobsalmela.com/make-animated-gifs-in-os-x-with-a-right-click/)
