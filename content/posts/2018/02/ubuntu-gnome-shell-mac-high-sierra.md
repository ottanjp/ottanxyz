---
author: ottan
date: 2018-02-11 14:48:17+00:00
draft: false
title: Ubuntu 16.04 LTSのGNOME ShellをMac風にカスタマイズする
type: post
slug: ubuntu-gnome-shell-mac-high-sierra-6629
categories:
- Mac
tags:
- Ubuntu
---

![](/uploads/2018/02/180210-5a7edd08336c5.jpg)

日常的にMacを愛用していると、すべてのデスクトップ環境をMac風にカスタマイズしたくなるものです（※個人差があります）。今回は、Ubuntu 16.04 LTS版を用いて、Ubuntuのデスクトップ環境であるGNOME ShellをHigh Sierra風にカスタマイズしてみたいと思います。2018年4月に、次期UbuntuのLTS（Long Term Support）版である、18.04が正式リリースされる見込みですが、18.04では標準のデスクトップ環境がUnityからGNOME Shellに移行される見込みのため、GNOME版のみのご紹介です。UnityやCinnamon（Linux Mintのデフォルトのデスクトップ環境であり、別途導入が必要）のカスタマイズも可能ですが、今回は割愛します。なお、基本的なUbuntuのセットアップ方法については、

-   [Ubuntu 16.04 LTSで、Macの「英数」「かな」キーにIMEオフ、オンを割り当てる](/ubuntu-16-04-ime-on-off-4913/)
-   [Ubuntu 16.04でキーボードレイアウトをMacBook Pro向けに変更する](/ubuntu-keyboard-layout-mac-6095/)

でご紹介していますので、そちらをご参照ください。ここでは初期セットアップはすでに完了していることを前提としてご紹介します。

## UbuntuのGNOME ShellをMac風にカスタマイズする

![](/uploads/2018/02/180211-5a805091460b7.jpg)

Ubuntu 16.04 LTSのデフォルトのデスクトップ環境の見た目が、

![](/uploads/2018/02/180211-5a8050e92599b.jpg)

こうなります。なお、今回の目標はあくまで外観をMac風にカスタマイズするのみですので、SpotlightやQuick Lookなどの機能面については、とくにカスタマイズを施しておりません。

まずはじめにリポジトリの状態と、パッケージを最新化しておきます。ターミナルを開いて以下のコマンドを実行します。

    sudo apt-get update
    sudo apt-get upgrade

`git`、`curl`を後ほど使用しますので、導入していない場合は、以下のコマンドを実行して導入しておきます。

    sudo apt-get install git curl

続いて、GitHubで公開されているGNOME用のテーマをダウンロードします。テーマはホームディレクトリ直下の`.themes`ディレクトリに作成する必要があります。ターミナルを開いて以下のコマンドを実行します。

    mkdir ~/.themes
    cd ~/.themes
    git clone https://github.com/B00merang-Project/macOS-Sierra/

続いて、アイコンもMac風にカスタマイズします。デフォルトのリポジトリには登録されていないため、サードパーティのリポジトリ（PPA：Personal Package Archive）を追加します。リポジトリを追加したら、`update`コマンドで最新化しておきましょう。

    sudo add-apt-repository ppa:numix/ppa
    sudo apt-get update

続いて、GitHubで公開されているMac風アイコンのパッケージをインストールします。今回ダウンロードするアイコンに依存する前提パッケージもインストールしておきます。なお、アイコンのパッケージのみをダウンロードすることもできますが、今回ご紹介するパッケージの場合、インストーラー（シェルスクリプト）も用意されているため、こちらを使用します。

    sudo apt-get install numix-icon-theme-circle
    curl https://raw.githubusercontent.com/ActusOS/GnomeYosemiteIcons/master/download_from_github.sh | sh

さらに、Dockの見た目をMac風に近づけるために、[Plank in Launchpad](https://launchpad.net/plank)と呼ばれる、軽量のドックを導入します。Ubuntuには、Plankの他にさまざまなDockが用意されていますが、Plankが軽量で、かつカスタマイズ性があるため今回はこちらを使用します。

    sudo apt-get install plank

最後に、GNOMEのカスタマイズでお馴染みの、GNOME Tweak Toolを導入したら準備は完了です。

    sudo apt-get install gnome-tweak-tool

ランチャーからGNOME Tweak Toolを起動します。

![](/uploads/2018/02/180211-5a8050f6999bf.png)

先ほど導入したPlankについて、再起動後に自動起動されるように、スタートアップアプリケーションに追加します（ターミナルから手動で設定することもできますが、Tweak Toolを使用すると容易です）。サイドメニューの「スタートアップアプリケーション」からPlankを追加します。

![](/uploads/2018/02/180211-5a8050feb8657.png)

任意のアプリケーションを追加することができるため、Plankを選択します。

![](/uploads/2018/02/180211-5a8051077548d.png)

続いて「外観」メニューから「GTK+」（The GIMP Toolkit）をSierraに変更します。また、アイコンが「GnomeYosemiteIcons」に変更されていることを確認してください。

![](/uploads/2018/02/180211-5a8055b522924.png)

また、このままでは左側と画面下部の両方にDockが表示されてしまうため、デフォルトのドックを隠します。Ubuntu標準の環境設定を開き、「外観」をクリックします。「挙動」タブから「Launcherを自動的に隠す」のチェックボックスをオンにします。また、画面最上部のメニューバーにメニューが表示されるように「メニューの表示」を「常に表示」に変更します。

![](/uploads/2018/02/180211-5a8051123d2a8.png)

最後に、背景を変更します。デフォルトで用意されているSierraの壁紙（`~/.themes/macOS-Sierra`配下の`Wallpaper.jpg`）を使用しても良いですし、High Sierra風にカスタマイズしたい場合は、MacのFinderから`/Library/Desktop Pictures`配下にある「High Sierra.jpg」をコピーしてこちらを壁紙に設定します。Finderで上記のディレクトリに移動できない場合は、⌘（command）+⇧（shift）+Gを押して、直接パスを入力してください。

![](/uploads/2018/02/180211-5a8050e92599b.jpg)

以上で、UbuntuがHigh Sierra風にカスタマイズされました！これで、UbuntuでもMac気分が味わえますね！
