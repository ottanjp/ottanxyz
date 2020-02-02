---
author: ottan
date: 2016-07-20 12:15:23+00:00
draft: false
title: システム環境設定をターミナル（defaultsコマンド）から設定する方法（Mission Control）
type: post
url: /system-preferences-terminal-defaults-mission-control-4656/
categories:
- Mac
tags:
- Tips
---

![](/images/2016/07/160720-578f42b571a37.jpg)

[システム環境設定をターミナル（defaultsコマンド）から設定する方法（一般） – OTTAN.XYZ](/system-preferences-terminal-defaults-2-4643/)に引き続き、`defaults`コマンドシリーズです。今回は、「Mission Control」編です。ニッチな機能、追求するのがムダな機能は割愛しています。

## システム環境設定をターミナルから設定する（Mission Control編）

![](/images/2016/07/160720-578f42d2041b6.png)

「システム環境設定」→「Mission Control」から設定できる項目です。「キーボードとマウスのショートカット」の項目については、「システム環境設定」→「キーボード」→「ショートカット」とも密接に関わっています。今回は、一部機能の設定方法のみご紹介します。

### 最新の使用状況に基づいて操作スペースを自動的に並べ替える

チェックボックスをオフにするためには、以下のコマンドを実行します。

```bash
defaults write com.apple.dock mru-spaces -bool false
```

デフォルト（オン）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete com.apple.dock mru-spaces
```

### アプリケーションの切り替えで、アプリケーションのウインドウが開いている操作スペースに移動

チェックボックスをオフにするためには、以下のコマンドを実行します。

```bash
defaults write -g AppleSpacesSwitchOnActivate -bool false
```

デフォルト（オン）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete -g AppleSpacesSwitchOnActivate
```

### ウインドウをアプリケーションごとにグループ化

チェックボックスをオンにするためには、以下のコマンドを実行します。

```bash
defaults write com.apple.dock expose-group-apps -bool true
```

デフォルト（オフ）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete com.apple.dock expose-group-apps
```

### ディスプレイごとに個別の操作スペース

チェックボックスをオフにするためには、以下のコマンドを実行します。

```bash
defaults write com.apple.spaces spans-displays -bool true
```

デフォルト（オン）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete com.apple.spaces spans-displays
```

### Dashboard

「操作スペースとして表示」にするには、以下のコマンドを実行します。

```bash
defaults write com.apple.dashboard dashboard-enabled-state -int 2
```

「オーバレイ表示」にするには、以下のコマンドを実行します。

```bash
defaults write com.apple.dashboard dashboard-enabled-state -int 3
```

デフォルト（切）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete com.apple.dashboard dashboard-enabled-state
```

### キーボードとマウスのショートカット

ここでは、各機能をファンクションキーに割り当てる方法をご紹介します。各機能では、ファンクションキーのみならず、修飾キー（⌘（command）や⇧（shift）のこと）を設定する事も可能ですが、設定方法が煩雑、かつ需要も無さそうなので割愛します。

#### Mission Control

「Mission Control」のキーボードショートカットに「F1」を割り当てるには、以下のコマンドを実行します。

```bash
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 32 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>65535</integer><integer>122</integer><integer>0</integer></array><key>type</key><string>standard</string></dict></dict>"
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 34 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>65535</integer><integer>122</integer><integer>131072</integer></array><key>type</key><string>standard</string></dict></dict>"
```

少し解説します。まず、「32」「34」が「Mission Control」を意味します。この機能に対して割り当てるキーを設定します。割り当てるキーには、３つのパラメーターを設定します。まず、「65535」はASCIIコード以外の文字列（今回の場合は、ファンクションキー）を意味します。逆に言うと、ASCIIコードに対応した文字列を指定できるのでしょうが、今回は検証していません。次に、「122」は「F1」キーを指します。最後の「0」は修飾キーなしという意味です。ファンクションキーに割り当てられた値は以下の通りです。

| 値  | 文字 |
| --- | ---- |
| 122 | F1   |
| 120 | F2   |
| 99  | F3   |
| 118 | F4   |
| 96  | F5   |
| 97  | F6   |
| 98  | F7   |
| 100 | F8   |
| 101 | F9   |
| 109 | F10  |
| 103 | F11  |
| 111 | F12  |
| 105 | F13  |
| 107 | F14  |
| 113 | F15  |

また、修飾キーに割り当てられた値は以下の通りです。

| 値      | 文字         |
| ------- | ------------ |
| 0       | 修飾キーなし |
| 131072  | ⇧（shift）   |
| 262144  | ⌃（control） |
| 524288  | ⌥（option）  |
| 1048576 | ⌘（command） |

さて、`defaults`コマンドに、やや煩雑なXML形式の値を指定しました。ただ、値を指定するだけなら、以下の指定方法でも問題なさそうです。

```bash
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 32 "{enabled = 1 ; value = { parameters = (65535, 122, 0); type = standard; }; }"
```

一見すると、これでも問題がないように見えます。実際に、`defaults`コマンドで値を読み取ると、正常に値が設定されているように見えます。しかし、本来、`65535`などの数値は、「Integer」型として登録する必要があります。

![](/images/2016/07/160720-578f42ca32f57.png)

上記の指定方法の場合、Xcodeでプロパティリストを開いてみると、上記のように「文字列型」（String）として設定されてしまい、設定が反映されません。そのため、`-dict-add`で値を指定する場合で、かつ明示的に型を指定する必要がある場合は、上記のようにXML形式で指定します（ハマリどころです…）

#### アプリケーションウインドウ

「アプリケーションウインドウ」のキーボードショートカットに「F1」を割り当てるには、以下のコマンドを実行します。

```bash
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 33 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>65535</integer><integer>122</integer><integer>0</integer></array><key>type</key><string>standard</string></dict></dict>"
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 35 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>65535</integer><integer>122</integer><integer>131072</integer></array><key>type</key><string>standard</string></dict></dict>"
```

#### デスクトップを表示

「デスクトップを表示」のキーボードショートカットに「F1」を割り当てるには、以下のコマンドを実行します。

```bash
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 36 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>65535</integer><integer>122</integer><integer>0</integer></array><key>type</key><string>standard</string></dict></dict>"
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 37 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>65535</integer><integer>122</integer><integer>131072</integer></array><key>type</key><string>standard</string></dict></dict>"
```

#### Dashboardを表示

「Dashboardを表示」のキーボードショートカットに「F1」を割り当てるには、以下のコマンドを実行します。

```bash
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 62 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>65535</integer><integer>122</integer><integer>0</integer></array><key>type</key><string>standard</string></dict></dict>"
defaults write com.apple.symbolichotkeys AppleSymbolicHotKeys -dict-add 63 "<dict><key>enabled</key><true/><key>value</key><dict><key>parameters</key><array><integer>65535</integer><integer>122</integer><integer>131072</integer></array><key>type</key><string>standard</string></dict></dict>"
```

### ホットコーナー

![](/images/2016/07/160720-578f65b46809b.png)

マウスカーソルを画面のコーナーに移動させた時、起動させる機能を設定できます。コーナーから機能を起動させるショートカットを、ホットコーナーと呼びます。

#### 左上

左上に、「Misson Control」を割り当てるためには、以下のコマンドを実行します。

```bash
defaults write com.apple.dock wvous-tl-corner -int 2
defaults write com.apple.dock wvous-tl-modifier -int 0
```

デフォルト（無効）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete com.apple.dock wvous-tl-corner
defaults delete com.apple.dock wvous-tl-modifier
```

「tl」は「top left」（左上）の略称ですね。また、指定できる値は以下の通りです。

| 機能                           | 値  |
| ------------------------------ | --- |
| Mission Control                | 2   |
| アプリケーションウインドウ     | 34  |
| デスクトップ                   | 4   |
| Dashboard                      | 7   |
| 通知センター                   | 11  |
| Launchpad                      | 9   |
| スクリーンセーバーを開始する   | 5   |
| スクリーンセーバーを無効にする | 6   |
| ディスプレイをスリープさせる   | 8   |

左下に、「Misson Control」を割り当てるためには、以下のコマンドを実行します。

```bash
defaults write com.apple.dock wvous-bl-corner -int 2
defaults write com.apple.dock wvous-bl-modifier -int 0
```

デフォルト（無効）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete com.apple.dock wvous-bl-corner
defaults delete com.apple.dock wvous-bl-modifier
```

右上に、「Misson Control」を割り当てるためには、以下のコマンドを実行します。

```bash
defaults write com.apple.dock wvous-tr-corner -int 2
defaults write com.apple.dock wvous-tr-modifier -int 0
```

デフォルト（無効）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete com.apple.dock wvous-tr-corner
defaults delete com.apple.dock wvous-tr-modifier
```

右下に、「Misson Control」を割り当てるためには、以下のコマンドを実行します。

```bash
defaults write com.apple.dock wvous-br-corner -int 2
defaults write com.apple.dock wvous-br-modifier -int 0
```

デフォルト（無効）に戻すためには、以下のコマンドを実行します。

```bash
defaults delete com.apple.dock wvous-br-corner
defaults delete com.apple.dock wvous-br-modifier
```

## まとめ

`com.apple.dock`を変更した場合は、設定を反映させるために、ターミナルから以下のコマンドを実行してください。

```bash
killall Dock
```

また、上記以外の設定を反映させるためには、ログアウト／ログイン、もしくは再起動を行う必要があります。

### 参考リンク

<http://krypted.com/mac-os-x/defaults-symbolichotkeys/>
