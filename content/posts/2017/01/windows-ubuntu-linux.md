---
author: ottan
date: 2017-01-22 05:57:52+00:00
draft: false
title: Windows 10にUbuntuをインストールして快適に使うための方法
type: post
slug: windows-ubuntu-linux-5481
categories:
- Windows
tags:
- Development
- Linux
---

![](/uploads/2017/01/170122-5884468182c75.jpg)






すでに多くの開発者の方がWindows 10にUbuntuをインストールして楽しんでることと思いますが、今回は復習も兼ねて素のWindows 10（Home）に、Ubuntuを改めてインストールしてみたいと思います。WindowsとLinuxの融合化の世界に足を踏み入れてみてください。ただし、Ubuntuについては記事執筆時点でいまだにβ版扱いのため、取り扱いにはご注意ください。なお、Windows Server系OSにはインストールできません。





## Windows 10にUbuntuをインストールする





Windows 10でUbuntuを使用するためには、WindowsのLinux Subsystemを有効化する必要あります。Ubuntuは、Windows 10のSubsystemとして機能します。





![](/uploads/2017/01/170122-58844689f0ab6.png)






Linux Subsystemを有効化するためには、コントロールパネルを開きましょう。コントロールパネルを開いたら、「プログラム」をクリックします。





![](/uploads/2017/01/170122-5884468f0fd4e.png)






「プログラムと機能」から「Windowsの機能の有効化または無効化」をクリックしてください。





![](/uploads/2017/01/170122-5884469481214.png)






「Windowsの機能」のダイアログから、「Windows Subsystem for Linux (Beta)」をチェックして、「OK」をクリックします。





![](/uploads/2017/01/170122-588446b261f8d.png)






自動的にWindows 10にSubsystemがインストールされます。インストール完了後は、Windowsを再起動する必要がありますので、「今すぐ再起動」をクリックします。





![](/uploads/2017/01/170122-588446a7196d2.png)






続いて、Ubuntuを使用するためには、Windows 10の設定を「開発者モード」に設定する必要があります。「開発者モード」に変更するためには、「Windowsの設定」を開き、「更新とセキュリティ」をクリックします。





![](/uploads/2017/01/170122-588446acc745b.png)






サイドメニューの「開発者向け」から「開発者モード」をチェックします。





![](/uploads/2017/01/170122-588446b79f446.png)






用意ができたらコマンドプロンプトを開きましょう。コマンドプロンプトを開いたら、以下のコマンドを入力します。




    
    bash





![](/uploads/2017/01/170122-588446bc6bc4a.png)






WindowsストアからUbuntuがダウンロード、インストールされます。初期構築にしばらく時間がかかります。気長に待ちましょう。インストールが完了すると、Ubuntuで使用するユーザ名を指定します。Windowsのユーザとは独立していますので、任意のユーザ名を英数字で入力します。





![](/uploads/2017/01/170122-588446c238074.png)






続いて、作成したUbuntuのユーザで使用するパスワードを英数字で入力します。確認のため2回入力する必要があります。以上で、Ubuntuの初期設定は完了です。続いて、パッケージを最新化したいところですが、デフォルトのままでは遅いので変更します。




    
    deb http://archive.ubuntu.com/ubuntu trusty main restricted universe multiverse
    deb http://archive.ubuntu.com/ubuntu trusty-updates main restricted universe multiverse
    deb http://archive.ubuntu.com/ubuntu trusty-backports main restricted universe multiverse
    deb http://security.ubuntu.com/ubuntu trusty-security main restricted universe multiverse





デフォルトでは、パッケージのアップデートに使用するリポジトリに海外のサーバーが指定されているため、日本のサーバーに変更します。以下のように書き換えましょう。




    
    deb http://ftp.jaist.ac.jp/pub/Linux/ubuntu trusty main restricted universe multiverse
    deb http://ftp.jaist.ac.jp/pub/Linux/ubuntu trusty-updates main restricted universe multiverse
    deb http://ftp.jaist.ac.jp/pub/Linux/ubuntu trusty-backports main restricted universe multiverse
    deb http://ftp.jaist.ac.jp/pub/Linux/ubuntu trusty-security main restricted universe multiverse





viなどのテキストエディター等で変更しても構いませんが、`sed`を使用すればワンライナーで書き換え可能です。以下のコマンドを実行してください。なお、`sudo`（root権限で実行）する前にパスワードを尋ねられますので、Ubuntuに作成したユーザのパスワードを入力してください。




    
    sudo sed -i -e 's%http://.*.ubuntu.com%http://ftp.jaist.ac.jp/pub/Linux%g' /etc/apt/sources.list





最後にパッケージをアップデートしておきましょう。




    
    sudo apt-get update
    sudo apt-get upgrade
