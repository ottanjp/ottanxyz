---
author: ottan
date: 2014-09-08 11:19:11+00:00
draft: false
title: Macを購入したら最初に導入しておきたいQuick Lookのプラグイン
type: post
slug: quick-look-plugin-78
categories:
- Mac
tags:
- Tips
---

![](/uploads/2014/09/140907-540c30c27fe39.jpg)

Quick Lookは、macOSを代表する便利な機能です。フォルダーやファイルを選択した状態で␣（スペースキー）を押すと、アプリケーションを起動することなく内容を表示してくれます。また、プラグインを導入することで、さらにQuick Lookの機能を拡張できます。今回は、オススメのプラグインを紹介します。

## プラグインのインストール方法

プラグインの中には、後述のHomebrew Caskを使用したCUIからのインストールが可能なものと、直接公式サイトからダウンロードして手動で導入するものの２種類があります。Homebrew Caskについては後述しますので、手動でインストールする場合の方法をご紹介します。

### 手動でインストールする場合

ダウンロードしたプラグイン（`.qlgenerator`という拡張子のファイル）を、以下のどちらかにコピーしてください。

-   ~/Library/QuickLook  

→「~」（チルダ）は現在のユーザーのホームディレクトリを表しています。プラグインは現在のユーザーにのみ適用されます。

-   /Library/QuickLook  

→そのMacを使用するすべてのユーザーに適用されます。

また、コピー後は以下のコマンドを実行してください。なお、後述のHomebrew Caskによるインストールの場合は、インストール時に自動的に以下のコマンドが実行されます。

```bash
qlmanage -r
```

## Homebrewのインストール

[Homebrew](https://brew.sh/)は、Macのパッケージ管理ソフトです。ターミナル（CUI）でパッケージの管理ができるため、GUI操作と比較して素早くミスなく、そして何よりコピー＆ペーストでインストールできます。Homebrewのインストールについては、[macOSのパッケージ管理にはHomebrewを使おう！Homebrewを使用する理由や便利な使い方までご紹介](/macos-package-manager-homebrew-6216/)でご紹介しています。

### Homebrew Caskのインストール

著名なQuick Lookプラグインについては、[Homebrew Cask](http://caskroom.io/)でインストールできるようになりました。

Homebrew Caskは、Homebrewの拡張機能です。[Homebrew](https://brew.sh/)によるパッケージ管理の他、Google ChromeなどGUIアプリケーションも同機能で管理できるようになります。Homebrew Caskをインストールするためには、以下のコマンドを実行します。

```bash
brew install caskroom/cask/brew-cask
```

Homebrew Caskでインストールできるアプリケーションは、公式サイトで確認できます。ますますHomebrewが手放せなくなること間違いなしです。

<http://caskroom.io/>

<https://supership.jp/#/blog/2014/03/05/homebrew-cask/>

## Quick Lookプラグインのインストール

では、実際にインストールしていきましょう。実行時に管理者ユーザーのパスワードを求められる場合があります。

### QuicklookStephen

![](/uploads/2014/09/140908-540d85b36183d.png)

[QuicklookStephen](https://github.com/whomwah/qlstephen)は、拡張子のないファイルをQuick Lookで表示してくれるプラグインです。「README」「Vagrantfile」など、テキストファイルであれば何でも開けてしまう便利な拡張機能です。ぜひ導入しておきましょう。

#### インストール（Homebrew）

```bash
brew cask install qlstephen
```

#### インストール（手動）

<https://github.com/whomwah/qlstephen>

### QLMarkdown

![](/uploads/2014/09/140908-540d85b4489d9.png)

[QLMarkdown](https://github.com/toland/qlmarkdown)は、文字通りMarkdown形式のテキストファイルをQuick Lookでプレビューできるプラグインです。[GitHub](https://github.com/)をはじめとして、README.mdファイルなどMarkdown形式が当たり前のように登場するようになっています。このプラグインを導入しておくと便利ですよ。

#### インストール（Homebrew）

```bash
brew cask install qlmarkdown
```

#### インストール（手動）

<https://github.com/toland/qlmarkdown>

### QuickLookJSON

![](/uploads/2014/09/140908-540d85b5cfdfd.png)

[QuickLookJSON](http://www.sagtau.com/quicklookjson.html)は、JSON形式のテキストファイルをQuick Lookでプレビューできるプラグインです。展開や折りたたみもできるため、必要な箇所だけを確認するといった使い方もできます。内容を整形して表示してくれるので、テキストエディターで開くよりもQuick Lookのほうが便利だったりします。

#### インストール（Homebrew）

```bash
brew cask install quicklook-json
```

#### インストール（手動）

<http://www.sagtau.com/quicklookjson.html>

### QuickLookCSV

![](/uploads/2014/09/140908-540d85b85f55d.png)

[QuickLookCSV](https://github.com/sindresorhus/quick-look-plugins)は、私のお気に入りの「かゆいところに手が届く」プラグインです。カンマ、タブ、スペース、パイプ（|）文字で区切られたテキストファイルを整形して表示してくれるQuick Lookの拡張機能です。わざわざテキストエディターやNumbersを起動する必要もなくなります！表示用のデータは以下からお借りしました。

<https://github.com/openmundi/world.csv>

#### インストール（Homebrew）

```bash
brew cask install quicklook-csv
```

#### インストール（手動）

<https://github.com/p2/quicklook-csv>

### BetterZip Quick Look

![](/uploads/2014/09/140908-540d85b946ec9.png)

[BetterZip Quick Look](http://macitbetter.com/BetterZip-Quick-Look-Generator/)は、アーカイブファイルの中身をQuick Lookでプレビュー表示してくれる拡張機能です。Macで展開可能なアーカイブファイルであれば、何でもプレビューしてくれます。また、表示が非常に美しいため、プレビュー表示していて気持ちいい（？）プラグインでもあります。

#### インストール（Homebrew）

```bash
brew cask install betterzipql
```

#### インストール（手動）

<http://macitbetter.com/BetterZip-Quick-Look-Generator/>

### Suspicious Package

![](/uploads/2014/09/140908-540d85ba597b7.png)

![](/uploads/2014/09/140908-540d85bb447ca.png)

[Suspicious Package](http://www.mothersruin.com/software/SuspiciousPackage/)は、何とインストーラーパッケージ（.pkgファイル）の内容をQuick Lookでプレビューしてしまう素晴らしい拡張機能です。ややマニアックな拡張機能ですが、私には欠かせないプラグインです。

たとえば、アプリケーションのインストールやアップデート時に、インストーラーが何を行っているのか気になったことはありませんか？ブラックボックスのインストーラーパッケージを丸裸にしてくれるのがこのプラグインの特徴です。

-   パッケージのインストールに管理者権限を要するか
-   パッケージへ含まれるインストール前後に起動されるスクリプトの有無

プレビューだけでこんなことまで確認できちゃいます。パッケージファイルを何気なくのぞいてみると、macOSの仕組みや隠された機構が段々と見えてきたりしておもしろいですよ。ぜひ導入してみてください。

#### インストール（手動）

インストール先の変更により、現在Homebrew Caskではインストールできなくなっています。下記のリンク先から直接ダウンロードしてください。

<http://www.mothersruin.com/software/SuspiciousPackage/download.html>

### QLColorCode

![](/uploads/2014/09/140908-540d7fd1e8411.png)

[QLColorCode](https://github.com/n8gray/QLColorCode)は、Quick Lookでソースコードをハイライト表示してくれる便利なプラグインです。エディターでファイルを開く手間を省いてくれるため、ちょっとしたソースコードの確認に有用です。日本語が正常に表示されない、などの問題が一時期ありましたが最新版では解消されているようです。

#### インストール（Homebrew）

```bash
brew cask install qlcolorcode
```

#### インストール（手動）

<https://code.google.com/p/qlcolorcode/>

#### カスタマイズ

本プラグインは、今回ご紹介するプラグインの中で唯一カスタマイズ可能なプラグインです。たとえば、以下のコマンドを実行すると、ハイライト表示とともに行番号を表示するようになります。

```bash
defaults write org.n8gray.QLColorCode extraHLFlags '-l'
```

また、フォントサイズを調整したい場合は、以下のコマンドで変更できます。

```bash
defaults write org.n8gray.QLColorCode fontSizePoints 10
```

さらに、以下のコマンドを実行することでハイライト表示のテーマを変更できます。ぜひお気に入りのテーマを見つけてみてください。

```bash
defaults write org.n8gray.QLColorCode hlTheme <テーマ名>
```

![](/uploads/2014/09/140908-540d7fd30999a.png)

acid

![](/uploads/2014/09/140908-540d7fd3d76a2.png)

bipolar

![](/uploads/2014/09/140908-540d7fd4ddc3f.png)

blacknblue

![](/uploads/2014/09/140908-540d7fd5b4ff1.png)

bright

![](/uploads/2014/09/140908-540d7fd6963cc.png)

contrast

![](/uploads/2014/09/140908-540d7fd83e5a1.png)

darkblue

![](/uploads/2014/09/140908-540d7fda4e39f.png)

darkness

![](/uploads/2014/09/140908-540d7fdb25f23.png)

desert

![](/uploads/2014/09/140908-540d7fdc05f75.png)

easter

![](/uploads/2014/09/140908-540d7fdcd09b3.png)

emacs

![](/uploads/2014/09/140908-540d7fde64749.png)

golden

![](/uploads/2014/09/140908-540d7fdf3a392.png)

greenlcd

![](/uploads/2014/09/140908-540d7fe0374b9.png)

ide-anjuta

![](/uploads/2014/09/140908-540d7fe60d13f.png)

ide-codewarrior

![](/uploads/2014/09/140908-540d7fe86f796.png)

ide-eclipse

![](/uploads/2014/09/140908-540d7fe942cc7.png)

ide-kdev

![](/uploads/2014/09/140908-540d7fea7f980.png)

ide-xcode

![](/uploads/2014/09/140908-540d7feb53682.png)

kwrite

![](/uploads/2014/09/140908-540d7fec3522e.png)

lucretia

![](/uploads/2014/09/140908-540d7fee49e45.png)

matlab

![](/uploads/2014/09/140908-540d7fef4968a.png)

moe

![](/uploads/2014/09/140908-540d7ff054663.png)

navy

![](/uploads/2014/09/140908-540d7ff12a2a4.png)

nedit

![](/uploads/2014/09/140908-540d7ff23cb89.png)

neon

![](/uploads/2014/09/140908-540d7ff34d928.png)

night

![](/uploads/2014/09/140908-540d7ff42c9d2.png)

orion

![](/uploads/2014/09/140908-540d7ff50c644.png)

pablo

![](/uploads/2014/09/140908-540d7ff5d12c0.png)

peachpuff

![](/uploads/2014/09/140908-540d7ff83d78c.png)

print

![](/uploads/2014/09/140908-540d7ffa7bfb4.png)

rand01

![](/uploads/2014/09/140908-540d7ffb615ef.png)

seashell

![](/uploads/2014/09/140908-540d7ffc39556.png)

slateGreen

![](/uploads/2014/09/140908-540d7ffd0a765.png)

the

![](/uploads/2014/09/140908-540d7ffdce82d.png)

typical

![](/uploads/2014/09/140908-540d7ffea2915.png)

vampire

![](/uploads/2014/09/140908-540d7fff844c2.png)

vim-dark

![](/uploads/2014/09/140908-540d800061251.png)

vim

![](/uploads/2014/09/140908-540d8001460b5.png)

whitengrey

![](/uploads/2014/09/140908-540d80022228c.png)
zellner

### 番外編

Quick Lookをもっと便利にする小技をご紹介します。

Quick Lookは、デフォルトの状態ではプレビューした内容を選択できません。（本当にプレビューのみ）しかし、以下のコマンドを実行することで、Quick Lookにおいてもテキストを選択できるようになります。今回ご紹介するプラグインを活用する上で必須ですので、ぜひ実行しておいてください。

```bash
defaults write com.apple.finder QLEnableTextSelection -bool true && killall Finder
```

## まとめ

今回ご紹介したプラグインは、以下のコマンドを実行するだけですべて導入可能です。１つずつインストールするのが面倒だ、という方はこのコマンドを使用してください。

```bash
brew cask install qlcolorcode qlstephen qlmarkdown quicklook-json quicklook-csv betterzipql 
```

また、Homebrew Caskでは、以下のコマンドを実行することで、インストール可能なパッケージやアプリケーションを検索できます。おもしろいものが見つかったら、ぜひ[@ottanxyz](https://twitter.com/ottanxyz)またはコメント欄で教えてくださいね。

```bash
brew cask search
```