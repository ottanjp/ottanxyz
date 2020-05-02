---
author: ottan
date: 2016-07-11 14:18:59+00:00
draft: false
title: システム環境設定をターミナル（defaultsコマンド）から設定する方法（Dock）
type: post
slug: system-preferences-terminal-defaults-dock-4644
categories:
  - Mac
tags:
  - Tips
---

![](/uploads/2016/07/160710-57824e95886ff.jpg)

[システム環境設定をターミナル（defaults コマンド）から設定する方法（一般） – OTTAN.XYZ](/posts/2016/07/system-preferences-terminal-defaults-2-4643/)に引き続き、「システム環境設定」を`defaults`コマンドでなんとか使用シリーズです。`defaults`コマンドの設定値の調べ方は上記記事を御覧ください。

![](/uploads/2016/07/160710-57824ed9609b3.png)

今回は、「デスクトップとスクリーンセーバー」は割愛して、「Dock」編です。

## システム環境設定をターミナルから設定する（Dock 編）

![](/uploads/2016/07/160710-57824edfd8fd1.png)

Dock は、すべて`defaults`コマンドで管理できます。

### サイズ

Dock に表示するアプリケーションのアイコンのサイズを整数値（16〜128）で指定します。最小値を設定する場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock tilesize -int 16

最大値を設定する場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock tilesize -int 128

デフォルトの設定に戻すためには、以下のコマンドを実行します。

    $ defaults delete com.apple.dock tilesize

### 拡大

まず、チェックボックスです。Dock のアイコンを拡大するかどうかを指定します。チェックボックスをオンにする場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock magnification -bool true

チェックボックスをオフにする場合は、以下のコマンドを実行します。

    defaults delete com.apple.dock magnification

続いて、拡大する場合のサイズを整数値（16〜128）で指定します。最小値を設定する場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock largesize -int 16

最大値を設定する場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock largesize -int 128

デフォルトの設定に戻すためには、以下のコマンドを実行します。

    $ defaults delete com.apple.dock largesize

### 画面上の位置

Dock の位置を指定します。左に指定する場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock orientation -string "left"

右に指定する場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock orientation -string "right"

デフォルトの設定（下）に戻すためには、以下のコマンドを実行します。

    $ defaults delete com.apple.dock orientation

### ウインドウをしまうときのエフェクト

ウインドウを Dock にしまうときのエフェクトを指定します。「スケールエフェクト」を指定する場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock mineffect -string "scale"

デフォルトの設定（ジニーエフェクト）に戻すためには、以下のコマンドを実行します。

    $ defaults delete com.apple.dock mineffect

### ウインドウタイトルバーのダブルクリックで

まず、チェックボックスです。チェックボックスをオフにする場合は、以下のコマンドを実行します。

    $ defaults write -g AppleActionOnDoubleClick -string "None"

チェックボックスをオンにし、「しまう」を指定する場合は、以下のコマンドを実行します。

    $ defaults write -g AppleActionOnDoubleClick -string "Minimize"

デフォルトの設定（拡大／縮小）に戻すためには、以下のコマンドを実行します。

    $ defaults delete -g AppleActionOnDoubleClick

### ウインドウをアプリケーションアイコンにしまう

アプリケーションで開いているウインドウを、Dock の個別のアイコンに格納するのではなく、その開いているアプリケーションのアイコンにしまうかどうかを選択します。チェックボックスをオンにする場合は、以下のコマンドを実行します。

    $ defaults write com.apple.dock minimize-to-application -bool true

チェックボックスをオフにする場合は、以下のコマンドを実行します。

    $ defaults delete com.apple.dock minimize-to-application

### 起動中のアプリケーションをアニメションで表示

チェックボックスをオフにするためには、以下のコマンドを実行します。

    $ defaults write com.apple.dock launchanim -bool false

チェックボックスをオンにするためには、以下のコマンドを実行します。

    $ defaults delete com.apple.dock launchanim

### Dock を自動的に隠す／表示

MacBook などの解像度の低い端末では有効です。チェックボックスをオンにするためには、以下のコマンドを実行します。

    $ defaults write com.apple.dock autohide -bool true

チェックボックスをオフにするためには、以下のコマンドを実行します。

    $ defaults delete com.apple.dock autohide

### 起動済みのアプリケーションにインジケーターを表示

チェックボックスがオンの状態では、起動済みアプリケーションの Dock のアイコンの下に点が表示されます。デフォルトではオンです。チェックボックスをオフにするためには、以下のコマンドを実行します。

    $ defaults write com.apple.dock show-process-indicators -bool false

チェックボックスをオフにするためには、以下のコマンドを実行します。

    $ defaults delete com.apple.dock show-process-indicators

## まとめ

`com.apple.dock`を変更した場合は、以下のコマンドを実行して、Dock を再起動してください。Dock の再起動により設定値が反映されます。それ以外の設定値については、再ログイン、もしくは端末を再起動してください（再起動が確実）。

    $ killall Dock
