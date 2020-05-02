---
author: ottan
date: 2018-06-30 05:09:00+00:00
draft: false
title: macOS Mojaveのインストールディスク（USBメモリ）を作成する方法
type: post
slug: macos-mojave-install-disk-usb-6869
categories:
  - Mac
tags:
  - macOS
  - Mojave
---

![](/uploads/2018/06/180630-5b370a0971103.jpg)

macOS Mojave のパブリックベータ版が公開されました（[Apple Beta Software Program](https://beta.apple.com/sp/ja/betaprogram/welcome?locale=ja)）。今回は主にクリーンインストールする方向けに、恒例の macOS Mojave のインストールディスクを作成する方法をご紹介します。macOS High Sierra までと同様の方法でインストールディスクを作成する事が可能です。

## macOS Mojave の起動可能なインストーラーを作成する

あらかじめ、中身が消去されても問題のない 16GB 以上の USB メモリを用意しておいてください。

![](/uploads/2018/06/180630-5b370ae377dd8.png)

### macOS Mojave のインストーラーのダウンロード

[macOS Mojave のパブリックベータ版をインストールする方法](/posts/2018/06/macos-mojave-public-beta-6868/)に従い、インストーラーをダウンロードします。「アプリケーション」フォルダーに、「Install macOS Mojave Beta.app」がダウンロードされていれば OK です。自動的にインストーラーが起動しますが、⌘（command）+Q でインストーラーを終了します。

![](/uploads/2018/06/180630-5b370b1edaa85.png)

### ディスクユーティリティで USB メモリを初期化する

![](/uploads/2018/06/180630-5b370b538442e.png)

「アプリケーション」→「ユーティリティ」→「ディスクユーティリティ.app」を起動します。Mac に接続した USB メモリを選択して、「消去」をクリックします。

![](/uploads/2018/06/180630-5b370b673b0f7.png)

「名前」は「UNTITLED」（任意）、「フォーマット」は「MS-DOS（FAT）」を選択します（※画面は、「macOS High Sierra」で実行したものです）。「名前」が重要です。控えておいてください。「消去」をクリックします。これで、USB メモリの中身はすべて消去されます。

続いて、「アプリケーション」→「ユーティリティ」→「ターミナル.app」を開きます。ターミナルで、以下のコマンドを実行します。

    diskutil list

出力内容は以下の通りです。「NAME」が「UNTITLED」（先ほど消去したボリュームの名前）が表示されていることを確認します。

    /dev/disk3 (external, physical):
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *31.6 GB    disk3
       1:                        EFI EFI                     209.7 MB   disk3s1
       2:                  Apple_HFS UNTITLED                31.2 GB    disk3s2

続いて、ターミナルで、以下のコマンドを実行します。

    sudo /Applications/Install\ macOS\ Mojave\ Beta.app/Contents/Resources/createinstallmedia --volume /Volumes/UNTITLED

`--applicationpath`オプションの指定は不要です。macOS High Sierra のインストールディスク作成から廃止されました。ディスクの内容を消去しても問題がないかどうか確認するメッセージが表示されますので「y」と入力して Enter キーを押します。

    If you wish to continue type (Y) then press return

自動的に起動可能なインストーラーの作成が始まります。

    Ready to start.
    To continue we need to erase the volume at /Volumes/UNTITLED.
    If you wish to continue type (Y) then press return: y
    Erasing disk: 0%... 10%... 20%... 30%... 100%
    Copying to disk: 0%... 10%... 20%... 30%... 40%... 50%... 60%... 70%... 80%... 90%... 100%
    Making disk bootable...
    Copying boot files...
    Install media now available at "/Volumes/Install macOS Mojave Beta"

このように表示されていれば、問題なく完了しています。

### macOS Mojave のインストール

⌥（option）を押しながら再起動すると、作成したインストーラーから起動できるようになっています。インストーラーから起動した後は、メニューからインストールを選択して、macOS Mojave のインストーラーを起動してください。
