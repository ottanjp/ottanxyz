---
author: ["@ottanxyz"]
date: 2018-01-10T00:00:00+00:00
draft: false
title: Parallels DesktopやVMware FusionのWindows 10で、Apple USB SuperDriveを使用してDVDを再生する方法
type: post
slug: windows-10-dvd-play-parallels-vmware-bootcamp-6505
categories:
- Mac
- Windows
tags:
- Boot Camp
- Parallels Desktop
- VMware Fusion
- Windows 10
---

![](/uploads/2018/01/180109-5a54c4ce0b133.jpg)

MacBook ProなどでWindows 10を動作させるためには、Apple社の提供する「Boot Campアシスタント」を使用して、macOSとは別パーティションにWindows専用パーティションを作成しインストールする方法と、「Parallels Desktop for Mac」「VMware Fusion」などのサードパーティ製の仮想マシンを動作させるためのソフトウェアを使用する方法があります。

いずれの方法においても、Windows 10標準ではWindows 7やWindows 8.1では再生できたMPEG2コーデック（DVD）をそのまま再生することはできません。一部、特定のWindows 7やWindows 8からアップグレードしたWindows 10においては、現在Windowsストアで提供されている「Windows DVDプレイヤー」を使用することもできます（Windowsの更新プログラムから入手）が、インストールされていない場合にはWindowsストアから購入する必要があります（1,750円と意外と高い）。

これは、Windows 8.1までは標準で同梱されていたWindows Media CenterがWindows 10で廃止されたことによる影響です。Windows 10ではデフォルトでDVDを再生できないため、DVD再生環境を整える必要があります。さらに、MacBook Proなどの光学ドライブを持たない機種でDVDを再生するためには、Apple USB SuperDirve等の外部DVDドライブを別途接続して再生する必要がありマウが、「Parallels Desktop」や「VMware Fusion」上で作成したWindows 10でDVDを再生するためには、さらに一工夫が必要です。

今回は、VMware Fusion 8.5.10、MacBook Pro (15-inch, 2017)、macOS High Sierra 10.13.2、Windows 10 Fall Creators Update、Apple USB SuperDriveで試しました。

## Windows 10でDVDを再生できる環境を無償で整える

### Parallels DesktopやVMware Fusionなどの仮想マシン上で再生する

Boot Camp環境を使用している場合、もしくはWindows 10搭載のPCでDVDを再生したい場合は、本手順は必要ありません。「VLC Media Playerのダウンロード」まで進んでください。

![](/uploads/2018/01/180109-5a54c522170d8.png)

上図はVMware Fusion上のWindows 10（仮想マシン）に、Apple USB  SuperDriveを接続した場合に表示される警告ダイアログです。警告ダイアログには「Apple Boot Campドライバー」をインストールする必要がある旨が表示されています。実際に、このドライバーをインストールせずにDVDを再生しようとしても再生できず、DVDドライブから強制的にDVDドライブが排出されてしまいました。もしくは、DVDドライブが認識されていても、DVDをDVDドライブに挿入することができない状態です。

![](/uploads/2018/01/180109-5a54d7b07223b.png)

そこで、まずはMac上で「Apple Boot Campドライバー」をダウンロードします。同ソフトウェアをダウンロードするためには、「アプリケーション」→「ユーティリティ」→「Boot Campアシスタント.app」を起動します。上図の画面が表示されたら、メニューバーの「アクション」から「Windowsサポートソフトウェアをダウンロード」をクリックします。保存先のフォルダーを選択するダイアログが表示されるため選択します。なお、ダウンロードには40〜50分程度要しますので注意してください（容量は1.2GB程度）。

![](/uploads/2018/01/180109-5a54d8ce94f6c.png)

ダウンロードしたドライバーの構成は上図のようになっています。このフォルダーをWindows 10上にコピーします。そのまま「Setup.exe」をWindows 10上で実行しようとすると、「このバージョンのBoot Campはこのコンピューターモデル用ではありません」と怒られてしまいます。

![](/uploads/2018/01/180110-5a5619304c781.png)

そこで、上記のフォルダーの中の「WindowsSupport¥BootCamp¥Drivers¥AppleODDInstaller64.exe」を実行します。管理者権限で実行してください。これでApple USB SuperDriveが認識できるようになります。

### VLC Media Playerのインストール

Windows 10でDVDを再生するためには、WindowsストアからWindows DVDプレイヤー（有償）をダウンロードするか、サードパーティ製のアプリケーションを使用する必要があります。オススメは、後者のサードパーティ製のアプリケーションを使用する方法で、その中でも「[VLC: オフィシャルサイト - すべてのOSにフリーなマルチメディアソリューションを! - VideoLAN](https://www.videolan.org/index.ja.html)」がオススメです。Windows DVDプレイヤーは、文字通りDVDを再生するだけの用途にしか使用できませんが、VLCはさまざまな用途で用いることができます。

インストール方法は、前述のリンクからインストーラーをダウンロードして、ウィザードの内容にしたがってインストールするのみです（標準インストールを使用してインストールしましょう）。

### VLC Media PlayerでDVDを再生する方法

スタートボタンをクリックして、VLC Media Playerを開きます（もしくは、タスクバーの検索ボックスに「VLC」と入力し「VLC Media Player」を選択します）。

![](/uploads/2018/01/180110-5a561a4567b1d.png)

「メディア」→「ディスクを開く」をクリックします。

![](/uploads/2018/01/180109-5a54ceca9168a.png)

「ディスクデバイス」にApple USB SuperDriveが選択されていることを確認して「再生」ボタンをクリックします。これで、Apple USB SuperDriveでDVDを再生できるはずです。

### 既定のアプリとしてVLC Media Playerを設定する

DVD再生の都度、VLC Media Playerを開くのは手間がかかるため、既定のアプリに設定してしまいましょう。

![](/uploads/2018/01/180109-5a54ceeb979d1.png)

Windowsの設定を開き、「アプリ」をクリックします。

![](/uploads/2018/01/180109-5a54cef358e4a.png)

サイドメニューから「既定のアプリ」を選択します。「映画＆テレビ」をクリックして、「VLC Media Player」を選択します。これで、DVD挿入時には自動的にVLC Media Playerで再生されるようになります。
