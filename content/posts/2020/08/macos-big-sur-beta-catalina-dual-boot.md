---
title: macOS CatalinaとBig Sur（パブリックベータ）のデュアルブート環境を構築
date: 2020-08-13
tags:
  - Catalina
  - Big Sur
categories:
  - Mac
slug: macos-big-sur-beta-catalina-dual-boot
katex: false
---
macOS CatalinaとBig Sur（パブリックベータ）のデュアルブート環境を構築してみました。また、Time Machine等でCatalinaの環境を復元するのがめんどうなので、CatalinaとBig SurをインストールするAPFSコンテナを分割し、新規インストールしました。

## macOS CatalinaとBig SurのAPFSコンテナを分割する

CatalinaとBig Surを同一のAPFSコンテナにインストールすると、[ソフトウェア・アップデートがインストールできなくなる不具合](https://applech2.com/archives/20200701-macos-11-big-sur-beta-apfs-container-issues.html)が発生するという不具合も報告されていたため、まずはAPFSコンテナを分割することにしました。

![](/uploads/2020/08/screenshot-2020-08-12-17.05.19.png)

「ディスクユーティリティ.app」を開きます。ツールバーの「パーティション作成」をクリックします。ディスクユーティリティ上は「パーティション」と表現されますが、APFSコンテナのことです。

![](/uploads/2020/08/screenshot-2020-08-12-17.05.34.png)

「パーティション」ではなく「ボリューム」を追加したら、と警告が出ます。APFSコンテナを分割したいため「パーティション作成」をクリックします。

![](/uploads/2020/08/screenshot-2020-08-12-17.05.39.png)

円グラフの下の「+」アイコンをクリックします。

![](/uploads/2020/08/screenshot-2020-08-12-17.05.50.png)

APFSコンテナ（パーティション）の名前は任意で構いません。

![](/uploads/2020/08/screenshot-2020-08-12-17.05.56.png)

APFSコンテナを分割（新規パーティションの作成）すると、既存のAPFSコンテナのサイズを縮小させることになります。「パーティション作成」をクリックします。

![](/uploads/2020/08/screenshot-2020-08-12-17.06.05.png)

今回は、macOS Catalinaがインストールされている起動ボリュームが含まれるAPFSコンテナのサイズを縮小し、新規にAPFSコンテナを作成したため警告が表示されました。このまま「続ける」をクリックします。さほど時間はかかりませんが、起動ボリューム（Macintosh HD）を含むAPFSコンテナのサイズを変更する場合、作業が完了するまでMacの操作ができなくなりますのでご注意ください。

![](/uploads/2020/08/screenshot-2020-08-12-17.07.30.png)

「macOS Big Sur」というAPFSコンテナ（および単一のボリューム）が作成されました。

## macOS Big Surのインストール

![](/uploads/2020/08/screenshot-2020-08-12-17.07.36.png)

パブリックベータに登録（enroll）したら、「ソフトウェア・アップデート」から「今すぐアップグレード」をクリックします。

![](/uploads/2020/08/screenshot-2020-08-12-17.07.50.png)

インストーラが起動します。ウィザードの内容に従いインストールを進めるだけですが、1点注意事項があります。インストール先のディスクを選択する際、先ほど作成した新規ボリュームへインストールするようにしましょう。インストール先を選択する画面が表示されたら、「すべてのディスクを表示」をクリックします。

![](/uploads/2020/08/screenshot-2020-08-12-17.07.54.png)

先ほど作成した新規ボリュームを選択します。誤って、既存のボリュームを選択しないようご注意ください。

### macOS Big Surインストール後のディスクユーティリティの状態

![](/uploads/2020/08/screenshot-2020-08-12-17.42.09.png)

謎のボリュームが出現しました…

### コマンドラインからパブリックベータへ登録

以下のコマンドで、パブリックベータへ簡単に登録できます。

```zsh
sudo /System/Library/PrivateFrameworks/Seeding.framework/Versions/A/Resources/seedutil enroll PublicSeed
```

解除したい場合は、以下のコマンドを実行します。

```
sudo /System/Library/PrivateFrameworks/Seeding.framework/Versions/A/Resources/seedutil unenroll
```