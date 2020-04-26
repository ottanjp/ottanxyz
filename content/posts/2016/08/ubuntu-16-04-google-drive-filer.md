---
author: ottan
date: 2016-08-07 04:29:53+00:00
draft: false
title: Ubuntu 16.04の標準ファイラーで「Google Drive」にアクセスする方法
type: post
slug: ubuntu-16-04-google-drive-filer-4725
categories:
- Mac
tags:
- Development
- Linux
---

![](/uploads/2016/08/160807-57a6b2bba503d.jpg)






[The leading OS for PC, tablet, phone and cloud | Ubuntu](http://www.ubuntu.com/)で入手可能な、Ubuntu 16.04.1 LTS。「Ubuntu Software」では、「Dropbox」は提供されていますが、「Google Drive」は提供されていません。そのため、「Google Drive」にアクセスするためには、ブラウザ経由でアクセスすることになりますが、標準のファイラーからアクセスできるようにすると便利です。今回は、この方法をご紹介します。



https://ottan.xyz/vmware-fusion-8-ubuntu-iso-6836/



## Ubuntuの標準ファイラーからGoogle Driveにアクセスする





Ubuntuの標準ファイラーからGoogle Driveにアクセスするには、「Ubuntu Software」から「GNOME コントロールセンター」をインストールする必要があります。





### GNOMEコントロールセンターのインストール





![](/uploads/2016/08/160807-57a6b2c4274ef.png)






「Ubuntu Software」を起動したら、「GNOME コントロールセンター」をインストールしましょう。または、ターミナルから以下のコマンドを実行しても、インストールできます。




    
    sudo apt-get install gnome-control-center





![](/uploads/2016/08/160807-57a6b2c9ea268.png)






インストールが完了したら、「GNOME コントロールセンター」を起動します。





### オンラインアカウントに「Google」を追加する





![](/uploads/2016/08/160807-57a6b2cfb5ec3.png)






「オンラインアカウント」を選択します。





![](/uploads/2016/08/160807-57a6b2d52cbb5.png)






「オンラインアカウントの追加」をクリックします。





![](/uploads/2016/08/160807-57a6b2da7c953.png)






「Google」をクリックします。





![](/uploads/2016/08/160807-57a6b2df7601b.png)






Googleアカウントへのログインが求められるため、メールアドレス、パスワード（２段階認証を有効にしている場合は、ワンタイムパスワードも）を入力し、ログインします。





![](/uploads/2016/08/160807-57a6b2e4ac391.png)






「ファイル」が「オン」になっていることを確認します。





### ファイラーから「Google Drive」にアクセスする





![](/uploads/2016/08/160807-57a6b2e9516a6.png)






ファイラーを開くと、サイドバーに「Google Drive」がマウントされていることがわかります。こちらにアクセスすることで、自由に「Google Drive」に読み書きできることがわかります。





日常的に「Google Drive」を使用している人は、ぜひお試しください。
