---
author: ["@ottanxyz"]
date: 2018-05-31 09:01:39+00:00
draft: false
title: Mac App Storeでアプリのアップデートが終わらないイライラを解消する方法
type: post
slug: mac-app-store-software-update-6750
categories:
  - Mac
---

![](/uploads/2018/05/180531-5b0fb80f82c5a.jpg)

Mac App Store で配布されているアプリは、Mac App Store 経由でアップデートする必要があります。通常は、「アップデート」タブの「すべてアップデート」をタップするだけで、自動的にアップデートが始まるのですが…

![](/uploads/2018/05/180531-5b0fb85402cfb.png)

このように「すべてアップデート」をクリックしても、いつまで経っても肝心なアプリのアップデートが始まらない、しかも「すべてアップデート」はグレーアウトされてしまい、バックグラウンドでアップデートが始まっているのかどうかすらわからない、このような経験ありませんか？

## Mac App Store 経由のアップデートを即座に終わらせる

忙しいご時世ですから、アップデートに時間をかけている余裕などありません。もし、あなたが、即座にアプリのアップデートを終わらせたい場合は、ターミナルを開き、以下のコマンドを実行しましょう。（ただし、管理者権限を持つユーザーで）

    sudo softwareupdate -i -a

認証を求められるため、管理者ユーザーのパスワードを入力します。もし、Touch Bar 付モデルを使用している場合は、[macOS High Sierra で sudo コマンドを Touch ID で認証する方法](/posts/2017/11/sudo-touch-id-macbook-6332/)が便利です。

    Software Update Tool

    Finding available software

    Downloading Command Line Tools (macOS High Sierra version 10.13) for Xcode
    Downloading Safari Technology Preview
    Downloaded Safari Technology Preview
    Downloaded Command Line Tools (macOS High Sierra version 10.13) for Xcode
    Installing Command Line Tools (macOS High Sierra version 10.13) for Xcode, Safari Technology Preview
    Done with Command Line Tools (macOS High Sierra version 10.13) for Xcode
    Done with Safari Technology Preview
    Done.

先ほどまであれだけアップデートに時間を要していたのが嘘のように一瞬で終わります。オススメです。

    softwareupdate

なお、`softwareupdate`コマンドにはさまざまなオプションが用意されています。ターミナルからオプションなしで実行すると、Usage が表示されるので確認してみてください！なお、今回使用したオプションは、`-i`（インストール）、`-a`（すべてのアップデート）を使用しました。
