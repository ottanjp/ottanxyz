---
author: ["@ottanxyz"]
date: 2015-05-06 09:25:35+00:00
draft: false
title: macOS YosemiteとUbuntu 14.04.2 LTSのデュアルブート環境を構築する
type: post
slug: os-x-ubuntu-dual-boot-2-1236
categories:
- Mac
tags:
- Development
- Linux
---

![](/uploads/2015/05/150506-5549de123a76d.png)

macOS YosemiteとUbuntuのデュアルブート環境を構築します。

#### 動作環境について

今回は、MacBook Pro with Retina（Late 2013）、およびUbuntu 14.04.2を題材にデュアルブート環境を構築します。環境によっては、下記の手順で正しく動作しない場合がありますので、ご注意ください。

## パーティションの分割

Ubuntuをインストールするための、パーティションの作成を行います。

### 論理ボリュームの解除

macOS Yosemiteから、起動ディスクについては論理ボリュームがデフォルトで使用されるようになったため、自由にパーティション分割ができなくなっています。そのため、まずは論理ボリュームの解除を行います。「アプリケーション」→「ユーティリティ」フォルダーにある「ターミナル」を起動してください。

    $ diskutil list
    /dev/disk0
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *251.0 GB   disk0
       1:                        EFI EFI                     209.7 MB   disk0s1
       2:          Apple_CoreStorage                         250.7 GB   disk0s2
       3:                 Apple_Boot Boot macOS               134.2 MB   disk0s3
    /dev/disk1
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:                  Apple_HFS Macintosh HD           *250.3 GB   disk1
                                     Logical Volume on disk0s2
                                     B5047217-8446-4125-A129-AA40902DCDBC
                                     Unencrypted
    /dev/disk2
       #:                       TYPE NAME                    SIZE       IDENTIFIER
       0:      GUID_partition_scheme                        *16.1 GB    disk2
       1:                        EFI EFI                     209.7 MB   disk2s1
       2:       Microsoft Basic Data UBUNTU                  15.7 GB    disk2s2
    $

`diskutil`コマンドで「Macintosh HD」がインストールされているディスクを探してください。上記の例においては、「/dev/disk1」がOSをインストールしているディスクです。この「**disk1**」を覚えておいてください。

次に、`diskutil`コマンドを利用して、論理ボリュームの解除を行います。その際に指定するディスクの番号は、前述の「Macintosh HD」がインストールされているディスクの番号になります。

    $ diskutil cs revert disk1                   
    Started CoreStorage operation on disk1 Macintosh HD
    Switching partition from Core Storage type to original type
    Reclaiming space formerly used by Core Storage metadata
    Even though the disk is now fully reverted, you should reboot soon to re-mount your reverted disk from the actual original partition
    Removing Physical Volume
    Destroying Logical Volume Group
    Remounting former Physical Volume as normal disk
    Core Storage LV UUID: B5047217-8446-4125-A129-AA40902DCDBC
    Core Storage disk: disk0s2
    Finished CoreStorage operation on disk1 Macintosh HD
    $

### Ubuntuをインストールするパーティションの分割

「アプリケーション」→「ユーティリティ」フォルダーにある「ディスクユーティリティ」を起動します。「Macintosh HD」がインストールされているディスクを選択したら、「パーティション」タブをクリックし、「＋」ボタンをクリックします。

![](/uploads/2015/05/150506-5549a3ea66384.png)

Ubuntuのインストールには、最低10GB以上の空き容量が必要です。今回は少し余裕を持って20GBのパーティションを作成します。パーティション情報は以下の通りとしました。

| 項目         | 内容         |
| ------------ | ------------ |
| 名前         | UBUNTU HD    |
| フォーマット | MS-DOS (FAT) |
| サイズ       | 20GB         |

作成が完了したら「適用」ボタンをクリックします。

![](/uploads/2015/05/150506-5549a3ef8117d.png)

警告が表示されますが、そのまま「パーティション」ボタンをクリックします。

![](/uploads/2015/05/150506-5549a3f2254db.png)

同様の手順で、Ubuntuのスワップ領域を作成します。パーティション情報は以下の通りとしました。

| 項目         | 内容         |
| ------------ | ------------ |
| 名前         | UBUNTU SWAP  |
| フォーマット | MS-DOS (FAT) |
| サイズ       | 2GB          |

作成が完了したら「適用」ボタンをクリックします。

![](/uploads/2015/05/150506-5549a3f53eb40.png)

以上で、パーティション分割は終了です。

## Ubuntuの起動ディスクの作成

続いて、Ubuntuの起動ディスク（Live USB）を作成します。10GB以上の記憶媒体（USBメモリ、SDカード等）を用意してください。

### 起動ディスク用の記憶媒体のフォーマット

起動ディスクとなる記憶媒体を挿入したら、ディスクユーティリティを使用してフォーマットします。ディスクの情報は以下の通りとしました。

| 項目         | 内容         |
| ------------ | ------------ |
| フォーマット | MS-DOS (FAT) |
| 名前         | UBUNTU       |

入力し終えたら、「消去」ボタンをクリックします。

![](/uploads/2015/05/150506-5549ac152f2de.png)

### Ubuntu 14.04.2 LTSのダウンロード

続いて、今回デュアルブート環境を構築する「Ubuntu」をダウンロードします。以下のリンクをクリックしてください。

<http://www.ubuntu.com/desktop>

「Download Ubuntu」ボタンをクリックします。

![](/uploads/2015/05/150506-5549a5d2d8a27.png)

「Choose your flavour」に「64bit - recommended」と書かれていることを確認したら、「Download」ボタンをクリックします。

#### Ubuntuのサポート期間について

Ubuntuのサポート期間には、通常版と長期サポート版（Long Term Support）が存在します。通常版のサポート期間はリリースから9か月です。通常版を使うユーザーは、6か月から9か月ごとに新しいリリースへとバージョンアップをしなければならないことになります。新しい機能を含む最新のリリースを使うことを望むユーザーに向いています。長期サポート版（LTS）は2年間隔でリリースされ、サポート期間はリリースから5年です。安定した環境を望むユーザーに向いています。

今回は、長期サポート版である、「Ubuntu 14.04.2 LTS」をダウンロードします。

![](/uploads/2015/05/150506-5549aa95bbd61.png)

「Download」ボタンをクリックしたら、画面を最下部まで移動して、「Not now, take me to the download」と書かれたリンクをクリックします。これで、Ubuntuのダウンロードは完了です。

![](/uploads/2015/05/150506-5549a5d58875a.png)

### Mac Linux USB Loader

続いて、UbuntuのISOファイルから起動ディスクを作成してくれる、「Mac Linux USB Loader」をダウンロードします。以下のリンクをクリックしてください。

<https://sevenbits.github.io/Mac-Linux-USB-Loader/>

「Download Now」と書かれたボタンをクリックします。

![](/uploads/2015/05/150506-5549aa996d3c5.png)

分かりづらいですが、「No thanks, just take me to the download」と書かれたリンクをクリックします。

![](/uploads/2015/05/150506-5549aa9e414e0.png)

ダウンロードした「Mac Linux USB Loader」を起動したら、「Create Live USB」をクリックします。

![](/uploads/2015/05/150506-5549ac17b5f43.png)

先ほどダウンロードした、UbuntuのISOファイルを選択します。

![](/uploads/2015/05/150506-5549ac1a8ee61.png)

「Live USB」（起動ディスク）を作成する記憶媒体を選択します。画面に表示されない場合は、「Refresh」ボタンをクリックしてください。記憶媒体を選択したら「Next」ボタンをクリックします。

![](/uploads/2015/05/150506-5549ac1e0b513.png)

「Begin Installation」ボタンをクリックします。

![](/uploads/2015/05/150506-5549ac211f975.png)

「Mac Linux USB Loader」が記憶媒体（今回の場合は、USBメモリ）に書き込みできるよう権限を与える必要があります。「Grant Access」ボタンをクリックします。

![](/uploads/2015/05/150506-5549ac23b0dd2.png)

問題なく完了すれば「Success!」と表示されます。

![](/uploads/2015/05/150506-5549ac26341d1.png)

## ネットワークアダプターのドライバーのダウンロード

次に、ネットワークアダプターのドライバーをインストールします。今回は、「Broadcom BCM43xx 1.0」用のドライバーをインストールします。

![](/uploads/2015/05/150506-5549adf49734a.png)

ダウンロードするパッケージは全部で4種類です。

-   libfakeroot_1.20-3
-   fakeroot_1.20-3
-   dkms_2.2.0.3-1.1
-   bcmwl-kernel-source_6.30.223.248

上記4種類を下記のリンク先からダウンロードしてください。ダウンロードするサーバを選択できますが、アジアのサーバであれば比較的ダウンロードがスムーズです。

![](/uploads/2015/05/150506-5549adf8acf26.png)

<http://packages.ubuntu.com/trusty/amd64/libfakeroot/download>

<http://packages.ubuntu.com/trusty/amd64/fakeroot/download>

<https://packages.ubuntu.com/trusty-updates/all/dkms/download>

<http://packages.ubuntu.com/trusty-updates/amd64/bcmwl-kernel-source/download>

ダウンロードしたパッケージは、Ubuntuのセットアップで使用しますので、作成したLive USB（起動ディスク）にコピーしておきましょう。

![](/uploads/2015/05/150506-5549b385b7a10.png)

## ブートローダー（rEFInd）のインストール

続いて、Mac起動時にLinuxを起動できるようになるブートローダーである「rEFInd」をダウンロードします。以下のリンクをクリックしてください。

<http://www.rodsbooks.com/refind/getting.html>

「A binary zip file」と書かれたリンクをクリックします。

![](/uploads/2015/05/150506-5549adfab4853.png)

ダウンロードしたら、「アプリケーション」→「ユーティリティ」フォルダーにある「ターミナル」を起動します。`cd`コマンドで、ダウンロードした「rEFInd」フォルダーに移動したら、フォルダーに含まれる「install.sh」を実行します。

    $ ./install.sh 
    Not running as root; attempting to elevate privileges via sudo....
    Password:
    ShimSource is none
    Installing rEFInd on macOS....
    Installing rEFInd to the partition mounted at /Volumes/ESP
    Found rEFInd installation in /Volumes/ESP/EFI/refind; upgrading it.
    Copied rEFInd binary files

    Notice: Backed up existing icons directory as icons-backup.
    Existing refind.conf file found; copying sample file as refind.conf-sample
    to avoid overwriting your customizations.


    WARNING: If you have an Advanced Format disk, *DO NOT* attempt to check the
    bless status with 'bless --info', since this is known to cause disk corruption
    on some systems!!


    Installation has completed successfully.
    $

「Installation has completed successfully」と表示されていれば、正常に完了しています。

## Ubuntu 14.04.2 LTSのインストール

Live USB（起動ディスク）を挿入したまま、Macを再起動します。再起動時に⌥（オプション）ボタンを押し続けてください。すると、「Macintosh HD」「EFI Boot」のどちらから起動するか選択できます。「EFI Boot」を選択しましょう。

![](/uploads/2015/05/150506-5549b27c7e690.jpg)

画面の案内にしたがって1キーを押します。

    Welcome to Enterprise - Version 0.2.1

     Available boot options:
     Press the key corresponding to the number of the option that you want.

     1) Boot Linux from ISO file
     2) Modify Linux kernel boot options (advanced)

     Press any other key to reboot the system.

同じく画面の案内にしたがって1キーを押します。

    Welcome to Enterprise - Version 0.2.1

     Boot Selector:
     The following distributions have been detected on this USB.
     Press the key corresponding to the number of the option that you want.

     1) Ubuntu

     Press any other key to reboot the system.

Live USB（起動ディスク）から「Ubuntu」が起動しました。画面左上の「Install Ubuntu 14.04.2 LTS」アイコンをクリックして、Ubuntuのインストールを始めましょう。

![](/uploads/2015/05/150506-5549b27d6b207.png)

「日本語」を選択して、「続ける」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b27ea1933.png)

「サードパーティーのソフトウェアをインストールする」をチェックし、「続ける」ボタンをクリックします。この時点でインターネットに接続している必要はありません。

![](/uploads/2015/05/150506-5549b281c76d4.png)

警告が表示されますが「はい」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b28508c34.png)

インストールの種類に「その他」を選択して、「続ける」ボタンをクリックします。誤って「ディスクを削除してUbuntuをインストール」を選択すると、macOSが削除されてしまうため要注意です。

![](/uploads/2015/05/150506-5549b28740ada.png)

あらかじめパーティション分割時に作成しておいた2GBの領域を選択したら、「Change...」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b28a0f218.png)

利用方法に「スワップ領域」を選択し、「OK」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b28cc63d6.png)

続いて、同じくパーティション分割時に作成しておいた、20GBからスワップ領域を引いた残りの領域（18GB）を選択して、「Change...」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b28ea7ba0.png)

以下のように入力します。

| 項目                   | 内容                                |
| ---------------------- | ----------------------------------- |
| 利用方法               | ext4 ジャーナリングファイルシステム |
| パーティションの初期化 | チェック有                          |
| マウントポイント       | /                                   |

入力が完了したら「OK」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b29150938.png)

ブートローダーをインストールするデバイスに、先ほどマウントポイントを「/」に指定したディスク（18GBの領域）を選択し、「インストール」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b2937301f.png)

警告が表示されますが、「続ける」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b2965308c.png)

「続ける」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b29900c3f.png)

「続ける」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b29d344b5.png)

任意の情報を入力し、「続ける」ボタンをクリックします。

![](/uploads/2015/05/150506-5549b2a011e0f.png)

Ubuntuのインストールが開始されます。10分程度で完了します。最後に、再起動を促すダイアログが表示されますので、そのまま再起動します。

![](/uploads/2015/05/150506-5549b2a3d5729.png)

## Ubuntuの無線LAN環境セットアップ

UbuntuはデフォルトではWi-Fiに接続できないため、ネットワークアダプターのドライバーをインストールする必要があります。再起動すると、「rEFInd」により「Ubuntu」を選択できるようになっています。一番左のアイコンをクリックしてください。

![](/uploads/2015/05/150506-5549bcee7e666.jpg)

左上のアイコンをクリックして、「Terminal」を起動してください。

![](/uploads/2015/05/150506-5549cfd7ae1ff.png)

ターミナルを起動したら、あらかじめダウンロードしておいたネットワークアダプターのドライバーをインストールします。インストールには`dpkg`コマンドを使用します。下記の順番でインストールしてください。

    $ sudo dpkg -i libfakeroot_1.20-3ubuntu2_amd64.deb
    $ sudo dpkg -i fakeroot_1.20-3ubuntu2_amd64.deb
    $ sudo dpkg -i dkms_2.2.0.3-1.1ubuntu5.14.04_all.deb
    $ sudo dpkg -i bcmwl-kernel-source_6.30.223.248+bdcom-0ubuntu0.1_amd64.deb

なお、`dpkg`コマンドに指定するファイルは、UbuntuのLive USB（起動ディスク）に保存していると思いますので、ターミナルで指定する場合はドラッグ＆ドロップが便利です。

![](/uploads/2015/05/150506-5549cfdc9636d.png)

以上で、Wi-Fiネットワークが利用できるようになりました。

![](/uploads/2015/05/150506-5549ba67228c2.png)

## まとめ

ここまで駆け足でお伝えしましたが、macOSとUbuntuのデュアルブート環境を構築できました。万が一、上記の通りにならない等あれば、[@おったん](https://twitter.com/ottanxyz)、またはコメント欄で質問をお受けしていますので、お気軽にご相談ください。
