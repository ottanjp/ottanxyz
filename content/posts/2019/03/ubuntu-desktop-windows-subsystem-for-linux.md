---
author: ["@ottanxyz"]
date: 2019-03-10T00:00:00+00:00
draft: false
title: "Windows Subsystem for LinuxでUbuntu Desktop (GNOME)を動かす"
type: post
slug: ubuntu-desktop-windows-subsystem-for-linux-20190303
categories:
tags:
toc: true
---

![](/uploads/2019/03/190310-90fa5c4fa27f216f.jpg)

Windows 10（バージョン1809）で試しました。Windows 10上でWSLからUbuntu Desktopを動作させたい、ただそれだけの理由で試しました。そのため、現段階では使い物になりません。Firefoxを起動してブラウジングするくらいはできそうです。Firefoxを使いたいだけであれば、わざわざUbuntu Desktopを動作させる必要はありませんが。

## WSLでUbuntu 18.04 LTS (GNOME)のデスクトップ環境を動かす

Windows 10からWSL（Windows Subsystem for Linux）が使用できるようになりました。Windows 10上にさまざまなLinuxディストリビューションをインストールできます。今回は、Ubuntu 18.04 LTSで試しました。

### Windows Subsystem for Linux (WSL) の有効化

「コントロールパネル」→「Windowsの機能の有効化または無効化」から「Windows Subsystem for Linux」を有効化します。有効化したらWindowsを再起動しましょう。

![](/uploads/2019/03/190310-fcb85db6ace9f46d.jpg)

### Ubuntu 18.04 LTSをMicrosoft Storeからダウンロード

Microsoft Storeから「Ubuntu 18.04 LTS」をインストールします。Microsoft Storeから提供される以前は、開発者モードを有効化する必要がありましたが、現在は必要ありません。

![](/uploads/2019/03/190310-41eed16be16e8a4a.jpg)

インストールが完了したら、「Ubuntu 18.04 LTS」を起動します。初回起動時は、オンラインでUbuntuのインストールが自動的に実施されます。そのため時間を要しますので気長に待ちます。

![](/uploads/2019/03/190310-e49dd3d9c053bf09.jpg)

Ubuntuにログインするためのユーザーとそのパスワードを作成します。

![](/uploads/2019/03/190310-ef1cbfaf8258dc6b.jpg)

以下の画面が表示されればインストール完了です。

![](/uploads/2019/03/190310-50a9d44dbd9d7b10.jpg)

#### パッケージの最新化

以下のコマンドを実行して、Ubuntuのリポジトリとパッケージを最新化しておきます。

```bash
sudo apt-get update
sudo apt-get upgrade
```

#### Ubuntu Desktopのインストール

以下のコマンドを実行して、Ubuntu Desktopをインストールします。インストールには時間を要しますので気長に待ちましょう。

```bash
sudo apt-get ubuntu-desktop
```

#### （オプション）日本語化

デスクトップ環境を試すだけであれば必要ありません。デフォルトでは、システム言語が英語ですので、日本語化しておきます。言語の設定は再ログイン後に有効です。

```bash
sudo apt-get install language-pack-ja
sudo update-locale LANG=ja_JP.UTF-8
```

#### （オプション）タイムゾーンの変更

デスクトップ環境を試すだけであれば必要ありません。タイムゾーンを東京に変更しておきます。

```bash
sudo dpkg-reconfigure tzdata
```

### VcXsrvのインストール

Windows 10で動作するXサーバーである、VcXsrvをインストールします。インストールウィザードの内容にしたがってインストールします。デフォルトから変更する必要はありません。

- [VcXsrv Windows X Server download | SourceForge.net](https://sourceforge.net/projects/vcxsrv/)

### 仮想デスクトップの追加

Windows 10の便利な機能の1つに仮想デスクトップがあります。VcXsrvをフルスクリーンモードで起動した場合、画面がUbuntuに専有されてしまうため、仮想デスクトップを追加しておくと便利です。なお、Windows 10の仮想デスクトップは「Windows」キー＋「Control」＋「←」or「→」で切り替えできます。

![](/uploads/2019/03/190310-af9fc62449b50ace.jpg)

仮想デスクトップは、Windows 10から搭載されたタイムライン機能で追加できます。タイムラインを開いたら、左上の「新しいデスクトップ」をクリックします。

### VcXsrvをフルスクリーンモードで起動

先ほど新規作成した仮想デスクトップに切り替えてから、VcXsrvを起動します。スタートメニューには「XLaunch」が追加されています。スタートメニューから起動したい場合、検索から起動したい場合は、こちらを選択してください。最初の画面で「Fullscreen」を選んだら、あとはデフォルトのままで構いません。

![](/uploads/2019/03/190310-ca4501e628907cc4.jpg)

フルスクリーンモードで起動した「VcXsrv」を終了する場合は、仮想デスクトップを切り替えて、タスクバーから終了します。終了確認のダイアログが表示されるため、「Exit」を選択します。

### Ubuntu Desktop環境の起動

初回起動時にホームディレクトリ配下のキャッシュディレクトリに対するアクセス権限に関するエラーが表示されます。その場合は、現在ログインしているユーザーがアクセスできるように権限を与えておきます。

```bash
sudo chmod 777 -R ~/.cache/
```

以下のコマンドを実行して、Ubuntu Desktopを起動します。VcXsrvが問題なく起動していれば、作成した仮想デスクトップ上にGUI環境が起動しているはずです。なお、Ubuntuのターミナル上にさまざまなエラーが表示されますが、今回は無視します。また、D-Busに関するFATALエラーが表示されるため、回避するための暫定対処策としてD-BUsのサービスを再起動しておきます。起動する前に、毎回実施してください。

```bash
sudo service dbus restart 
DISPLAY=0:0 XDG_SESSION_TYPE=x11 gnome-session
```

![](/uploads/2019/03/190310-7334bc3c5ca6bf76.jpg)

初回のみ上図の警告が表示されます。「キャンセル」しておきます。

![](/uploads/2019/03/190310-62ef334d1cbf6ed1.jpg)

このように新規作成した仮想デスクトップでUbuntuのデスクトップ環境が表示されれば完了です。終了したい場合は、タスクバーからVcXsrvを終了させるか、ターミナル上で「Control」＋「C」を押して、プロセスを終了させます。
