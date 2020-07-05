---
author: ["@ottanxyz"]
date: 2016-09-24T00:00:00+00:00
draft: false
title: macOS Sierraの起動可能なインストーラー（USBメモリ）を作成する方法
type: post
slug: macos-sierra-bootable-disk-5007
categories:
- Mac
tags:
- Development
---

![](/uploads/2016/09/160924-57e5e0ed53d27.jpg)






macOS Sierraをクリーンインストールしたい、今後のメジャーバージョンアップに備えて、macOS Sierraのインストールディスクを作成しておきたい、という方は、今回ご紹介する方法をお試しください。





## macOS Sierraの起動ディスクを作成する





### macOS Sierraのダウンロード





まず、Mac App StoreからmacOS Sierraをダウンロードします。以下のリンクからmacOS Sierraをダウンロードしましょう。



{{< itunes 1127487414 >}}



すでに、「ダウンロード済」となっている場合は、すでに「アプリケーション」フォルダーに「macOS Sierraインストール.app」がダウンロードされています。もし、「ダウンロード済」になっているにもかかわらず見つからない場合は、OSを再起動してみましょう。





![](/uploads/2016/09/160924-57e5e0f5944d4.png)






ダウンロード後に、macOS Sierraのインストーラーが起動しますが、⌘+Qで終了します。





### USBメモリのフォーマット





続いて、8GB以上のUSBメモリを手元に用意しましょう。起動ディスク作成後のUSBメモリの容量は約4.7GB程度であるため、8GBあれば問題ないと思います。USBメモリをMacに接続します。





![](/uploads/2016/09/160924-57e5e0fc184be.png)






「ディスクユーティリティ.app」を開き、先ほど接続したUSBメモリを選択し、「消去」をクリックします。なお、以下の操作を実行した時点で、USBメモリの内容は消去されますので、残したい内容がある場合は、事前に退避しておきましょう。





![](/uploads/2016/09/160924-57e5e106384f9.png)






「名前」は「UNTITLED」、「フォーマット」は「Mac OS拡張 (ジャーナリング)」、「方式」は「GUIDパーティションマップ」を選択して、「消去」をクリックします。





### macOS Sierraの起動ディスクを作成する





続いて、管理者権限を有するユーザーでログインしていることを確認し、「ターミナル.app」を開いて、以下のコマンドを実行します。`UNTITLED`は、ディスクユーティリティで指定した「名前」です。この「名前」に日本語などのマルチバイト文字を含まないようにしておくのが良いでしょう。




    
    sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/UNTITLED --applicationpath /Applications/Install\ macOS\ Sierra.app --nointeraction





現在、ログインしているユーザのパスワードを聞かれますので、入力します。




    
    Erasing Disk: 0%... 10%... 20%... 30%...100%...
    Copying installer files to disk...
    Copy complete.
    Making disk bootable...
    Copying boot files...
    Copy complete.
    Done.





このように表示されれば、起動ディスクの作成は完了です。





### macOS Sierraの起動ディスクを使用して起動する





クリーンインストール等の目的で、起動ディスクを使用して起動する場合には、⌥を押したままMacを起動します（または、再起動します）。起動ディスクの選択画面が表示されるため、「Install macOS Sierra」と書かれた黄色いディスクを選択して起動してください。





その後、macOSユーティリティが起動するため、「ディスクユーティリティ」から「Macintosh HD」を消去し、「macOS Sierra」をクリーンインストールする事もできます。





## まとめ





`createinstallmedia`コマンドを使用すれば、簡単にターミナルから起動ディスクを作成することができるようになりました。基本的に最近のOSであればすべて同様の方法で作成できますので、ぜひお試しください。
