---
author: ottan
date: 2016-04-30 05:44:31+00:00
draft: false
title: macOS El CapitanとUbuntu 16.04 LTSのデュアルブート環境を構築する
type: post
url: /el-capitan-ubuntu-dual-boot-6856/
categories:
- Mac
tags:
- Development
- Linux
---

![](/images/2016/04/160430-5724307c2b687.png)






以前、[macOS YosemiteとUbuntu 14.04.2 LTSのデュアルブート環境を構築する](/os-x-ubuntu-dual-boot-2-1236/)で、macOS YosemiteとUbuntuのデュアルブート環境を構築する方法をご紹介しましたが、公開してから記事の内容がだいぶ古くなってしまったので、今回は最新のOSであるmacOS El CapitanとUbuntu 16.04 LTSを使用してデュアルブート環境を構築してみます。



https://ottan.xyz/os-x-ubuntu-dual-boot-2-1236/



![](/images/2016/04/160430-57244646d588d.png)






注意点としては、Ubuntuのデフォルトのインストール状態ではWi-Fi接続を行うことができません。私が使用しているMacに搭載されているインターフェイスの情報は、上図の通りです。同一の「Broadcom BCM43xx」であれば、後述の手順でWi-Fiに接続できるようになります。





## El CapitanとUbuntuのデュアルブート環境を構築する





では、順を追って解説します。基本的には[macOS YosemiteとUbuntu 14.04.2 LTSのデュアルブート環境を構築する](/os-x-ubuntu-dual-boot-2-1236/)でご紹介した方法を踏襲していますが、事前にドライバーのダウンロードなどは行いません。





### Ubuntu 16.04 LTSのダウンロード





![](/images/2016/04/160430-5724308052ba1.png)






まず、以下のリンクからUbuntu 16.04 LTSのISOファイルをダウンロードします。「Download」をクリックします。



http://www.ubuntu.com/download/desktop



![](/images/2016/04/160430-57243089700d6.png)






画面最下部にある、「Not now, take me to the download」をクリックします。これで、ダウンロード完了です。





### インストールディスクの作成





![](/images/2016/04/160430-5724464e824f0.png)






続いて、16GB以上のフラッシュメモリ（USBメモリ）を用意します。あらかじめ、ディスクユーティリティからフォーマットを行っておきます。フォーマットする際に、「名前」は任意、「フォーマット」は「MS-DOS（FAT）」、「方式」は「GUIDパーティションマップ」を選択します。





続いて、USBメモリを接続したまま、ターミナルを開きます。ターミナルは、「アプリケーション」→「ユーティリティ」フォルダーの中にあります。ターミナルを開いたら、以下のコマンドを実行します。




    
    $ diskutil list




    
    /dev/disk0 (internal, physical):
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *251.0 GB   disk0
       1:                        EFI EFI                     209.7 MB   disk0s1
       2:                  Apple_HFS Macintosh HD            250.1 GB   disk0s2
       3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3
    /dev/disk1 (external, physical):
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *31.6 GB    disk1
       1:                        EFI EFI                     209.7 MB   disk1s1
       2:       Microsoft Basic Data                         31.4 GB    disk1s2





USBメモリのディスクの番号を控えておきます。ここでは「disk1」が該当のUSBメモリです。誤って他のディスクを消去することがないよう注意しましょう。次に、ターミナルから以下のコマンドを実行します。「disk1」は該当の番号に置き換えてください。これで、アンマウントされます。




    
    $ diskutil unmountDisk /dev/disk1





続いて、ダウンロードしたISOファイルの場所に移動します。たとえば、「ダウンロード」フォルダーに移動したい場合は、以下のコマンドを実行します。




    
    $ cd ~/Downloads





最後に、USBメモリにUbuntuのインストールディスクの書き込みを行います。ターミナルから以下のコマンドを実行します。「ubuntu-16.04-desktop-amd64.iso」は実際にダウンロードしたファイル名、「/dev/rdisk1」は事前に控えたディスクの番号に読み替えてください。「/dev/disk1」でも良いのですが、「/dev/**r**disk1」とすると書き込みが速くなります。




    
    $ sudo dd if=ubuntu-16.04-desktop-amd64.iso of=/dev/rdisk1 bs=1m





![](/images/2016/04/160430-572430a06ea8e.png)






USBメモリへの書き込み完了後に上記のような警告ダイアログが出る可能性がありますが、とりあえず無視しておきます。





### Ubuntuのパーティションの作成





![](/images/2016/04/160430-5724308cb90fe.png)






ディスクユーティリティを開き、「Macintosh HD」が含まれるディスクを選択します。選択した状態で「パーティション」をクリックします。





![](/images/2016/04/160430-572430971584d.png)






Ubuntuのパーティションを作成します。「パーティション」は任意、「フォーマット」は「MS-DOS（FAT）」、「サイズ」は任意です。50GBもあれば十分でしょう。





### ブートローダーの準備





![](/images/2016/04/160430-572430a442b9d.png)






次に、以下のリンクから「rEFInd」をダウンロードします。「A binary zip file」を選択してダウンロードしてください。ダウンロードしたら、任意のフォルダーに解凍しておいてください。「rEFInd」については、[macOS YosemiteとUbuntu 14.04.2 LTSのデュアルブート環境を構築する](/os-x-ubuntu-dual-boot-2-1236/)
を参照してください。なお、ここでは「Downloads」フォルダーに解凍してあるものとします。



http://www.rodsbooks.com/refind/getting.html



さて、El Capitanからは「SIP」と呼ばれる新たなセキュリティ機構が導入され、デフォルトの状態では「rEFInd」をインストールすることができません。そこで、Macをリカバリーモードで起動する必要があります。





Macを再起動し、⌘+Rを押し続けてください。Macがリカバリーモードで起動します。リカバリーモードで起動したら、以下の手順で「rEFInd」をインストールします。






  1. メニューの「ユーティリティ」→「ターミナル」をクリックします
  2. ターミナルから、「rEFInd」を解凍しているフォルダーに移動します。以下のコマンドを参照。「ottan」、「Downloads」、「refind-0.10.2」は適宜読み替えてください
  3. `./refind-install`を実行。「Installation has completed successfully.」と表示されればインストールは完了です
  4. Macを通常モードで再起動します



    
    # cd /Volumes/Macintosh\ HD/Users/ottan/Downloads/refind-0.10.2





通常では、「rEFInd」のインストールが完了した時点で、作業は完了なのですが、どうもEl Capitanの環境ではこのままではうまく動作しないようです。Ubuntuのインストール完了後に、Macを⌥（option）を押したまま再起動し、Ubuntuの起動ディスクが見えないようでしたら、以下の手順を試してみてください。



https://wavisaviwasavi.amebaownd.com/posts/208897



こちらを参考に、少々小細工します。ターミナルを開いて、以下のコマンドを実行します。




    
    $ diskutil list




    
    /dev/disk0 (internal, physical):
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *251.0 GB   disk0
       1:                        EFI EFI                     209.7 MB   disk0s1
       2:                  Apple_HFS Macintosh HD            250.1 GB   disk0s2
       3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3





「EFI」の「IDENTIFIER」を控えておいてください。次に、ターミナルから以下のコマンドを実行します。




    
    $ mkdir /Volumes/efi
    $ sudo mount -t msdos /dev/disk0s1 /Volumes/efi





「/dev/disk0s1」は事前に確認した「EFI」の「IDENTIFIER」です。適宜読み替えてください。次に、Finderを開き、`/Volumes/efi`に移動します。具体的には、Finderで、⇧+⌘+Gで、移動する場所に上記を指定してください。





その後の作業については上記リンクに書いてある通りです。





### Ubuntuのインストール





Ubuntuのインストールディスク（USBメモリ）を接続した状態で、Macを再起動します。その際に、⌥（option）を押しっぱなしにします。画面に、「EFI Boot」という黄色いディスクがあわられますので、こちらを選択して起動します。





Ubuntuのインストールディスクから起動されます。「Try Ubuntu without installing」を選択して、UbuntuをUSBメモリから起動します。その後、デスクトップ上の「Install Ubuntu 16.04 LTS」をダブルクリックします。





![](/images/2016/04/160430-572430a8210c9.png)






「日本語」を選択して、「続ける」をクリックします。





![](/images/2016/04/160430-572430a9b8e83.png)






何もチェックせずに、そのまま「続ける」をクリックします。





![](/images/2016/04/160430-572430aaac755.png)






「それ以外」を選択して、「続ける」をクリックします。「ディスクを削除してUbuntuをインストール」を選択すると、macOSの領域まで削除されてしまうため、要注意です。





![](/images/2016/04/160430-572430ab9f470.png)






あらかじめ用意したパーティションを選択します。「タイプ」が「fat32」、「サイズ」があらかじめ指定したサイズになっているデバイスを選択してください。選択したら、「変更...」をクリックします。





![](/images/2016/04/160430-572430acbf438.png)






「利用方法」を「ext4 ジャーナリングファイルシステム」、「パーティションの初期化」をチェック、「マウントポイント」を「/」にして、「OK」をクリックします。





![](/images/2016/04/160430-572430ad73569.png)






「続ける」をクリックします。





![](/images/2016/04/160430-572430ae272b2.png)






「インストール」をクリックします。





![](/images/2016/04/160430-572430af8624e.png)






今回、スワップ領域を用意しなかったため、上記の警告ダイアログが表示されました。スワップ領域を用意する場合には、あらかじめディスクユーティリティでスワップ領域用のパーティションを用意してください。詳細は、[macOS YosemiteとUbuntu 14.04.2 LTSのデュアルブート環境を構築する](/os-x-ubuntu-dual-boot-2-1236/)を参照してください。





![](/images/2016/04/160430-572430b1702d4.png)






「続ける」をクリックします。





![](/images/2016/04/160430-572430b4ad38d.png)






「続ける」をクリックします。





![](/images/2016/04/160430-572430b679f55.png)






項目を入力して、「続ける」をクリックします。





![](/images/2016/04/160430-572430b7a9d04.png)






インストールが開始されます。





![](/images/2016/04/160430-572430b985329.png)






「今すぐ再起動する」をクリックします。デフォルトの状態であれば、そのままUbuntuが起動します。





### ドライバーのインストール





さて、Ubuntuのデフォルトのインストールの状態の場合、Wi-Fiに接続することができないため、ドライバーをインストール必要があります。ドライバーは、インストールに使用したUSBメモリに格納されています。





![](/images/2016/04/160430-572430ba8439d.png)






USBメモリの「/pool/main/d/dkms」に格納されているファイルを、「Home」にコピーしておきます。





![](/images/2016/04/160430-572430bbd8b3a.png)






続いて、同じくUSBメモリの「/pool/restricted/b/bcmwl」に格納されているファイルを、「Home」にコピーしておきます。





![](/images/2016/04/160430-572430bdb221f.png)






「Home」にこのように格納されていればOKです。続いて、「Terminal」（端末）を起動します。「Terminal」が起動したら、以下のコマンドを実行します。ドライバーを「Home」以外にコピーした場場合は、そのディレクトリに移動してからコマンドを実行してください。




    
    $ sudo dpkg -i *.deb





これで、UbuntuがWi-Fiに接続できるようになります。





## まとめ





macOS El Capitanになったことにより、「SIP」と呼ばれるセキュリティ機構が導入されたことに伴い、再起動を何回も行う必要があり、若干手順が面倒くさくなっていますが、基本的には前回お伝えした手順と変更はありません。Wi-Fiドライバーは簡単にインストールできたんですね。前回も同様の手順でできたのかもしれません。（もう手元に環境がないので分からないのが残念なのですが）
