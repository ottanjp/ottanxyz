---
author: ottan
date: 2015-10-01 13:55:08+00:00
draft: false
title: macOS 10.11 El Capitanの起動ディスクを作成する方法
type: post
slug: el-capitan-bootable-disk-2679
categories:
- Mac
tags:
- Development
---

![](/uploads/2015/10/151001-560d326d553bd.jpg)






[@おったん](https://twitter.com/ottanxyz)です。2015年10月1日未明に、macOS El CapitanのMac App Storeでの配信が開始されました。ここでは、macOS El Capitanをクリーンインストールするために欠かせない起動ディスクの作成方法をご紹介します。起動ディスクを作成するためには、8GB以上の外部ディスク（USBメモリなど）が必要になりますので、あらかじめ準備しておいてください。





## macOS El Capitanの起動ディスクを作成する








#### macOS El Capitanについて




Mac App Storeからの配布はすでに中止されているため、起動ディスクを作成するためには、すでにダウンロード済みのインストーラーを使用する必要があることにご注意ください。以下の手順は読み替えてご使用ください。








### Mac App StoreからmacOS El Capitanのインストーラーをダウンロードする





まずは、macOS El CapitanのインストーラーをMac App Storeからダウンロードします。インストーラーはMac App Storeで無償で配布されています。





### USBメモリを初期化する





![](/uploads/2015/10/151004-561090195c83c.png)






次に、あらかじめ用意したUSBメモリを初期化します。**「アプリケーション」→「ユーティリティ」→「ディスクユーティリティ」**を起動します。USBメモリを選択した状態で、「消去」タブをクリックします。「フォーマット」は「Mac OS 拡張（ジャーナリング）」を選択し、「消去」ボタンをクリックします。「名前」は任意で構いませんが、あとで使用します。ここでは**「UNTITLED」**とします。





### 起動ディスクを作成する





次に、**「アプリケーション」→「ユーティリティ」→「ターミナル」**を起動します。ターミナルを起動したら、以下のコマンドを実行します。**「UNTITLED」**は、ディスクユーティリティで初期化した際のボリュームの名称です。




    
    $ sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/UNTITLED/ --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app --nointeraction





起動ディスクの作成にはしばらく時間を要しますので、気長に待ちましよう。以下のように表示されれば、起動ディスクの作成は完了ししています。




    
    Erasing Disk: 0%... 10%... 20%... 30%...100%...
    Copying installer files to disk...
    Copy complete.
    Making disk bootable...
    Copying boot files...
    Copy complete.
    Done.





### クリーンインストールを実施する





作成した起動ディスクからクリーンインストールを実施するためには、⌥（option）キーを押しながら再起動します。ディスク選択画面に作成した起動ディスクが表示されますので、そちらを選択します。





## まとめ





起動ディスクを作成するには、macOS インストーラーに内蔵されている「createinstallmedia」コマンドを使用する方法が簡単です。新しいOSで新しい環境で作業したい方は、クリーンインストールをぜひお試しください。
