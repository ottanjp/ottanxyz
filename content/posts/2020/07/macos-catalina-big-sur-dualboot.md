---
title: macOS CatalinaとBig Sur（パブリックベータ）のデュアルブート環境の構築
date: 2020-07-12
tags:
  - Big Sur
  - Catalina
categories:
  - Mac
slug: macos-catalina-big-sur-dualboot
katex: false
---
## ディスクユーティリティで、APFSにmacOS Big Sur用のボリュームを追加する

「ディスクユーティリティ.app」を開きます。

![](/uploads/2020/07/screenshot-2020-07-12-19.33.16.png)

macOS CatalinaがインストールされているAPFSボリュームである「Macintosh HD」を選択します。「Macintosh HD」は、デフォルトのボリューム名です。お使いの環境によって名称が異なる可能性があることに注意してください。

![](/uploads/2020/07/screenshot-2020-07-12-19.33.40.png)

ツールバーから「パーティション作成」をクリックします。「ボリュームを追加」をクリックします。

![](/uploads/2020/07/screenshot-2020-07-12-19.34.32.png)

「名前」は任意で構いません。今回は「macOS Big Sur」としました。フォーマットは「APFS」とします。「追加」ボタンをクリックします。

![](/uploads/2020/07/screenshot-2020-07-12-19.34.43.png)

「ディスクユーティリティ.app」で「macOS Big Sur」ボリュームが追加されていることを確認します。

## Apple Beta Software Programからユーティリティをダウンロードする

[Apple Beta Software Program](https://beta.apple.com/sp/ja/betaprogram/enroll?locale=ja)へアクセスし、お使いのデバイスを登録します。Apple IDによるサインインが必要です。

![](/uploads/2020/07/screenshot-2020-07-12-19.23.21.png)

Apple IDでサインインし、「macOS Public Betaアクセスユーティリティをダウンロード」をクリックします。ダウンロードした、ディスクイメージファイルより、ユーティリティをインストールします。

![](/uploads/2020/07/screenshot-2020-07-12-19.39.29.png)

「システム環境設定」→「ソフトウェア・アップデート」「今すぐアップデート」が表示されていることを確認します。ここで「今すぐアップデート」をクリックすると、現在Catalinaが動作するボリュームへBig Surが上書きされてしまいます。Mac App Storeからインストーラをダウンロードする従来のバージョンと、以降の方法が異なるため注意が必要です。

## ターミナルからBig Surのインストーラをダウンロードする

ソフトウェアアップデートができる状態になったら、ターミナルから以下のコマンドを実行します。`softwareupdate`は、ソフトウェアアップデートをCLIで実施するためのコマンドで、下記のオプションを付与することでフルバージョンのインストーラをダウンロードできます。なお、Big Surは、macOS 11に該当するはずですが、現段階では`10.16`とする必要がありますので注意してください。

```console
softwareupdate --fetch-full-installer --full-installer-version 10.16
```

* [Apple Beta Software Program](https://beta.apple.com/sp/ja/betaprogram/enroll?locale=ja)