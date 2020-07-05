---
author: ["@ottanxyz"]
date: 2019-04-07T00:00:00+00:00
draft: false
title: "Windows 10でコントロールパネルや設定から削除できない「Xbox」アプリを削除する"
type: post
slug: windows10-uninstall-xbox-app-20190404
categories: ["Windows"]
tags: ["Windows 10", "PowerShell"]
toc: true
---

![](/uploads/2019/04/190407-af4ae6f2b0a69a98.jpg)

Windows 10にインストールされたアプリの管理は「設定」アプリから行います。不要なアプリは削除して、ストレージの空きを増やしたり、電力消費量を減らしてバッテリーの減りを抑えることができます。しかし、いくら「設定」アプリやコントロールパネルを開いても、削除できないアプリがあります。それが「Xbox」アプリです。

![](/uploads/2019/04/190407-b028ff8fc094c28c.png)

筆者は、Windows 10を仕事や検証用に使用しているため、ゲームは使用しません。そのため、「Xbox」アプリも不要なので（害もないですが）削除したかったんです。ところが、「設定」アプリから「アプリと機能」を開くと…。

![](/uploads/2019/04/190407-aacf5e7a03c941c4.png)

なぜかグレーアウトされていてアンインストールできません。コントロールパネルには表示すらされません。Windows 10の標準アプリはコントロールパネルには表示されません。インストールされていて困るわけではないのですが、なんだか気持ち悪かったのでPowerShellを使用して強制的にアンインストールしてみました。なお、再度インストールしたい場合は、Microsoft Storeから入手可能なので安心してください。

## Windows 10から削除できない「Xbox」アプリを削除する

スタートボタン（Windowsアイコン）を右クリックして、「Windows PowerShell (管理者)」を選択します。アプリケーションの削除には管理者権限が必要です。PowerShellが起動したら、以下のコマンドを実行してみてください。`Get-AppxPackage`はアプリの情報を取得するためのコマンドレットです。パラメータを省略すると、Windows 10にインストールされているすべてのアプリが表示されます。

```ps1
Get-AppxPackage *XboxApp*
```

今回は、アプリケーションの「Name」に「XboxApp」を含むものをフィルターして表示します。

    Name              : Microsoft.XboxApp
    Publisher         : CN=Microsoft Corporation, O=Microsoft Corporation, L=Redmond, S=Washington, C=US
    Architecture      : X64
    ResourceId        :
    Version           : 44.44.7002.0
    PackageFullName   : Microsoft.XboxApp_44.44.7002.0_x64__8wekyb3d8bbwe
    InstallLocation   : C:\Program Files\WindowsApps\Microsoft.XboxApp_44.44.7002.0_x64__8wekyb3d8bbwe
    IsFramework       : False
    PackageFamilyName : Microsoft.XboxApp_8wekyb3d8bbwe
    PublisherId       : 8wekyb3d8bbwe
    IsResourcePackage : False
    IsBundle          : False
    IsDevelopmentMode : False
    NonRemovable      : False
    Dependencies      : {Microsoft.VCLibs.140.00_14.0.27323.0_x64__8wekyb3d8bbwe, Microsoft.NET.Native.Runtime.1.6_1.6.2490
                        3.0_x64__8wekyb3d8bbwe, Microsoft.NET.Native.Framework.1.6_1.6.24903.0_x64__8wekyb3d8bbwe, Microsof
                        t.XboxApp_44.44.7002.0_neutral_split.language-ja_8wekyb3d8bbwe...}
    IsPartiallyStaged : False
    SignatureKind     : Store
    Status            : Ok

こちらが、削除できない「Xbox」アプリの正体です。アプリを削除するためには、`Remove-AppxPackage`コマンドレットを使用します。`Get-AppxPackage`コマンドレットで取得したアプリを削除するためには、標準出力をパイプすると便利です。

```ps1
Get-AppxPackage *XboxApp* | Remove-AppxPackage
```

コマンドが正常終了したら、再び「アプリと機能」を見てみます。

![](/uploads/2019/04/190407-37c1270546d4c6cd.png)

無事、削除されました！このように`Remove-AppxPackage`を使用することで、「設定」アプリから削除できないアプリを、強制的にアンインストールできますのでお試しください。なお、誤って重要なアプリをアンインストールしてしまわないようにご注意ください。

## 「Xbox」アプリを再インストールする

「Xbox」アプリは、Microsoft Storeから再インストール可能です。Windows 10標準のアプリケーションは、すべてMicrosoft Storeを通じて配布されているため、必要に応じて再インストールできます。なお、Microsoft Storeからインストールしても、「設定」アプリでは再び「アンインストール」の文字がグレーアウトされます…。

![](/uploads/2019/04/190407-0a7753c830fa0afd.png)
