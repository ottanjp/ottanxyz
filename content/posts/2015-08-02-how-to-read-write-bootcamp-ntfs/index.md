---
author: ottan
date: 2015-08-02 06:00:16+00:00
draft: false
title: NTFSフォーマットされたBootCamp領域をmacOSで読み書きできるようにする方法
type: post
url: /how-to-read-write-bootcamp-ntfs-1900/
categories:
- Mac
- Windows
tags:
- Development
---

![](/images/2015/08/150802-55bdb1f6b8b65.jpg)




Boot Campを利用すれば、macOSとWindowsのデュアルブート環境を構築することも簡単です。また、Boot Campにより、MacのトラックパッドなどをWindowsでフル活用するための専用ドライバーをインストールできます。





しかし、WindowsとmacOSには決定的な違いがあります。それは、ファイルシステムです。WindowsがNTFS（NT File System。NTは、New Technologyの略称です。Not File Systemではありません）であるのに対し、macOSの標準はHFS+（Hierarchical File System Plus）です。





macOSデフォルトの状態では、ファイルシステムの異なるmacOSからBOOTCAMP領域へファイルの書き込みを行うことはできません。必然的に、macOSとBOOTCAMP（Windows）領域間のファイルのやり取りはオンラインストレージやメール等の原始的な手段に頼らざるを得ません。





そこで、今回は、macOSのシステムファイルを変更することにより、macOSからBOOTCAMP領域へのファイルの書き込みを行うことができるようにする方法をご紹介します。実は、Snow Leopardから本機能は標準搭載されており、サードパーティ製のアプリケーションに頼ることなく行うことができます。





## NTFSフォーマットされた領域へ書き込みを行う方法





今回は、NTFSフォーマットされたディスクの代表としてBOOTCAMP領域についてご紹介しますが、この方法は任意のNTFSフォーマットされたファイルシステムについて有効です。





### BOOTCAMP領域のボリューム名を調べる





「アプリケーション」→「ユーティリティ」フォルダー配下のターミナルを開いて、以下のコマンドを実行します。




    
    $ diskutil info /Volumes/BOOTCAMP
       Device Identifier:        disk0s4
       Device Node:              /dev/disk0s4
       Part of Whole:            disk0
       Device / Media Name:      BOOTCAMP
    
       Volume Name:              BOOTCAMP
    
       Mounted:                  Yes
       Mount Point:              /Volumes/BOOTCAMP
    





「/Volumes/BOOTCAMP」は、BOOTCAMP領域のマウントポイントです。もし、マウントポイントがわからない場合は、ディスクユーティリティを開いて確認しておきましょう。





![](/images/2015/08/150802-55bdb1f51ea72.png)






diskutilコマンドで表示された「Volume Name」の値（デフォルトでは、BOOTCAMP）を覚えておこう。





### 「/etc/fstab」の内容を編集する





次に、ターミナルで「/etc/fstab」の内容を編集します。





UNIX系OSでは、「fstab」ファイルにデバイス名（またはラベル名）、マウントポイント、ファイルシステム名などを記載しておくことで、システム起動時に自動的にデバイスをマウントする仕組みを採用しています。





macOSインストール後のデフォルトの状態では、「/etc/fstab」ファイルは存在しません。もし、存在する場合には事前にバックアップを取得しておきましょう。



    
    $ ls /etc/fstab /etc/fstab
    $ sudo cp -p /etc/fstab /etc/fstab_YYYYMMDD





準備ができたら、さっそく「/etc/fstab」の内容を編集しましょう。「/etc」ディレクトリ配下の領域を一般ユーザで編集することはできないため、「sudo」コマンドを利用して特権でファイルの内容を編集します。




    
    $ sudo nano /etc/fstab





「/etc/fstab」に以下の内容を追記する。




    
    LABEL=BOOTCAMP none ntfs rw,auto,nobrowse





「BOOTCAMP」は事前に調べたボリューム名に変更します。BOOTCAMP領域であれば、デフォルトでは「BOOTCAMP」となっているはずです。上記の内容を追記したら、保存しましょう。



ポイントは、ファイルシステムとして「ntfs」を指定すること、「rw」「nobrowse」オプションを付与することです。「rw」オプションは、読み書き可能な領域としてマウントすることができるオプション、「nobrowse」オプションは、マウントした領域をFinderに表示しないオプションです。





NTFSフォーマットされた領域をマウントする場合、「nobrowse」オプションを付与しないと、「rw」オプションが有功にならないため注意しましょう。





### macOSを再起動する





「/etc/fstab」の内容を編集したら、macOSを再起動します。





### FinderからBOOTCAMP領域を編集する





「nobrowse」オプションを付与したため、Finderを開いてもサイドバーにマウントされた領域が表示されません。そこで、Finderで⇧（shift） + ⌘（command） + Gを押して、以下の領域に移動します。




    
    /Volumes





すると、「BOOTCAMP」という名前のボリュームがマウントされていることが確認できるはずです。これで、サードパーティ製のアプリケーションを使用することなく、自由にBOOTCAMP領域に手を加えることができます。





## まとめ





Boot Campを使用すれば、macOSとWindowsのデュアルブート環境を簡単に構築することができることは、冒頭に述べた通りです。しかし、macOSとWindowsの間にはファイルシステムという高い障壁が邪魔をしており、お互いを自由に行き来することができません。





しかし、macOS標準の機能を利用することにより、NTFSフォーマットされた領域に対しても簡単にファイルの読み書きを行うことができる。もし、macOSでBoot Campを併用しているなら、ぜひ試してみてください。ただし、公式サポートされた方法ではないため、使用には十分にご注意ください。
