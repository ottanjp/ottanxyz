---
author: ["@ottanxyz"]
date: 2019-06-30T00:00:00+00:00
draft: false
title: "macOS Catalina（Public beta）の起動ディスクを作成する方法"
type: post
slug: macos-catalina-bootable-disk-20190630
categories: ["Mac"]
tags: ["Catalina"]
toc: true
---

![](/uploads/2019/06/190630-d908639a63fee062.jpg)

macOS Catalina（Public beta）をクリーンインストールするために、起動ディスクを作成する方法をご紹介します。

## macOS Catalinaの起動ディスクを作成する

まずは、[macOS Mojaveの環境を壊さずにmacOS Catalinaを試す方法](/posts/2019/06/install-catalina-20190629/)でご紹介した方法を用いて、macOS Catalinaのインストーラをダウンロードします。以下の画面が表示されるまで手順を続けます。

![](/uploads/2019/06/190629-dd925d36177a728d.png)

インストーラが起動したら、この時点で<kbd>&#8984;</kbd>+<kbd>Q</kbd>を押してインストーラを終了しましょう。「アプリケーション」フォルダ配下に「Install」から始まるインストーラがダウンロードされています。

### 8GB以上のUSBメモリを接続する

起動ディスクを作成した時点で、使用容量は約4GB程度になるため、8GB以上のUSBメモリを用意しましょう。また、起動ディスクを作成すると、USBメモリの内容は消去されてしまうため、事前にバックアップしておきましょう。

### 起動ディスクの名称を確認する

接続したUSBメモリの名称をディスクユーティリティから確認しておきます。

![](/uploads/2019/06/190630-c0c0091b989839d8.png)

また、ターミナルから`diskutil list`コマンドで確認することもできます。

```
/dev/disk2 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *31.6 GB    disk2
   1:                 DOS_FAT_32 UNTITLED                31.6 GB    disk2s1
```

### ターミナルから起動ディスクを作成する

あとはターミナルから以下のコマンドを実行するのみです。`—volume`オプションには、マウントしたUSBメモリのパスを指定します。`/Volumes/`に続けて、事前に確認したUSBメモリの名称を指定します。また、特権で実行する必要があるため、`sudo`を付けて実行します。

```zsh
sudo /Applications/Install\ macOS\ Catalina\ Beta.app/Contents/Resources/createinstallmedia --volume /Volumes/UNTITLED
```

USBメモリの内容を消去した上で、起動ディスクが作成されます。USBメモリを消去しても構わない場合は、`y`を入力して<kbd>&#8629;</kbd>を押します。

```
Ready to start.
To continue we need to erase the volume at /Volumes/UNTITLED.
If you wish to continue type (Y) then press return:
```

起動ディスクの作成には時間を要します。

## 起動ディスクを使用してインストールする

起動ディスクを接続したまま、<kbd>&#8997;</kbd>を押しながらMacの電源を入れます。作成した起動ディスクのボリュームを選択して起動すると、macOS Catalinaのインストーラが起動します。

## 参考リンク

- [macOS の起動可能なインストーラを作成する方法 - Apple サポート](https://support.apple.com/ja-jp/HT201372)
