---
author: ottan
date: 2015-05-30 00:18:22+00:00
draft: false
title: 超簡単！MacでNexusにAndroid Mをインストールする方法
type: post
slug: nexus-mac-android-m-1568
categories:
- Android
- Mac
tags:
- Development
---

![](/uploads/2015/05/150529-5568fa2b9a7c5.jpg)






Androidの新しいバージョン、「Android M」が発表されました。「Android Developer Preview」がいち早く公開されましたので、手元のNexus 5にインストールしてみました。早く最新のバージョンで楽しみたい方は、ぜひ参考にしてみてください。





## USBデバッグモードの有効化





![](/uploads/2015/05/150530-556901d27170f.png)






ファームウェアの書き換えを行うためには、USBデバッグモードをはじめに有効にする必要があります。設定を開き、「端末情報」をタップします。





![](/uploads/2015/05/150530-556901d6296eb.png)






「ビルド番号」を7回タップします。





![](/uploads/2015/05/150530-556901d96dcc7.png)






システムに「開発者向けオプション」が表示されます。





![](/uploads/2015/05/150530-556901dce4b54.png)






「開発者向けオプション」を開き、「USBデバッグ」をオンにしてください。この状態で、Mac、またはPCと接続します。





## Android Mのダウンロード





以下のリンクをクリックします。



https://developer.android.com/about/versions/marshmallow/index.html



対応機種は、以下のとおりです。






  * Nexus 5
  * Nexus 6
  * Nexus 9
  * Nexus Player




![](/uploads/2015/05/150529-5568fa2d38d65.png)






自分のデバイスのファームウェアをダウンロードしておきます。ダウンロードしたファイルは解凍しておきましょう。





## Android Mへの更新





準備が整いましたので、いよいよAndroid Mへの更新を行います。




    
    $ brew install android-platform-tools





更新を行うためには、Android SDKが必要になります。Macの場合、Homebrewから簡単にインストールできます。Homebrewについては、[Macでプレゼン資料に数式を貼り付けるのに便利な「LaTeXiT」](/mac-latex-presentation-92/)を参照してください。Windowsの場合は、下記のリンクに従いセットアップを行ってください。



https://developer.android.com/sdk/installing/index.html



### ファームウェアの書き換え





![](/uploads/2015/05/150529-5568fa2fe4b80.jpg)






事前にUSBデバッグモードにした状態のNexusをMac、またはPCに接続しておきます。




    
    $ adb reboot bootloader





この状態で、ターミナル、またはコマンドプロンプトから上記のコマンドを実行します。





![](/uploads/2015/05/150529-5568fa31356e4.jpg)






次のステップを進むと、**端末のデータがすべて初期化されます**ので、事前に必ずバックアップを取得しておきましょう。




    
    $ fastboot oem unlock





ターミナル、またはコマンドプロンプトから上記のコマンドを実行します。音量大ボタン、音量小ボタンを使用して、「Yes」を選択し、電源ボタンを押します。




    
    $ cd hammerhead-MPZ44Q
    $ ./flash-all.sh





最後に、事前にダウンロード、解凍したファームウェアのディレクトリに移動し、Macの場合は「flash-all.sh」、Windowsの場合は「flash-all.bat」を実行します。以上でAndroid Mのインストールは完了です。





## まとめ





「Android M」への更新完了後は、ブートローダーから以下のコマンドを実行しておきましょう。




    
    $ adb reboot bootloader
    $ fastboot oem lock
