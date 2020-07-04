---
author: ["@ottanxyz"]
date: 2016-11-26 05:42:16+00:00
draft: false
title: macOS SierraでPythonのパッケージマネージャー「pip」でインストールできない時の対処法
type: post
slug: macos-sip-python-pip-5264
categories:
- Mac
tags:
- Tips
---

![](/uploads/2016/11/161126-58391c0de6557.jpg)






macOS El CapitanからSIP（rootless）と呼ばれるセキュリティ機構が導入され、特権ユーザー（sudo）をもってしてもシステムに関わるディレクトリ配下の変更や削除ができなくなりました。macOS Sierraでより強化されており、`/Library`や`/System`配下の変更ができなくなっています。





macOSは標準でPythonを使用できます。また、Pythonのパッケージマネージャーである「EasyInstall」や「pip」を使用することもできるのですが、この「SIP」によりパッケージが導入できないことがあります。





## SierraでPythonのパッケージがインストールできない場合の対処法





macOS SierraでPythonは標準で使用できます。また、「EasyInstall」も使用できますが、「pip」は使用できません。そのため、「pip」を使用してパッケージ管理を行いたい場合、まずは「pip」をインストールしてから、パッケージをインストールすることになるのですが。





### 標準のPythonを使用するとパッケージ導入に失敗する





「EasyInstall」を使用して「pip」をインストールします。




    
    sudo easy_install pip





上記コマンドを実行することで、すべてのユーザーで「pip」コマンドが使用できるようになります。




    
    Using /usr/local/lib/python2.7/site-packages
    Processing dependencies for pip
    Finished processing dependencies for pip





このように標準出力に表示されれば「pip」のインストールは完了しています。続いて、「pip」を使用して、サイト全体のリンク切れをチェックしてくれる高速なCUIツールである「linkchecker」をインストールしてみます。




    
    pip install linkchecker





順調にインストールが進むように見えますが…




    
    OSError: [Errno 13] Permission denied: '/Library/Python/2.7/site-packages/requests'





このように「Permission denied」で、`/Library`配下の変更に失敗します。上記のSIPが有効になっているため変更できないのです。`~/Library`（ホームディレクトリ配下）は大丈夫です。




    
    sudo pip install linkchecker





では、`sudo`（特権）を使用すれば解決するのかというと…




    
    OSError: [Errno 1] Operation not permitted: '/System/Library/Frameworks/Python.framework/Versions/2.7/share'





今度は、`/System`配下の書き込みに行こうとして、「Permission denied」で怒られます。





### 解決法





macOS Sierraで、Pythonを快適に使用するためには、OS標準のPythonではなく、[Homebrew](https://brew.sh/)を使用しましょう。Homebrewの導入は、リンク先を参照してください。ターミナルからワンライナーでインストールできます。




    
    brew update
    brew install python





上記のコマンドにより、「Python」がインストールされます。




    
    which python





インストール後に、上記コマンドを実行します。




    
    /usr/local/bin/python





`/usr/local/bin`配下であればOKです。`/usr/bin`（OS標準）を参照している場合は、ターミナルを再起動します。再度、上記コマンドを実行してみてください。参照先の優先パスが変更されているはずです。




    
    pip install --upgrade pip





Homebrewで「Python」をインストールすると、「pip」も合わせて導入されます。記事執筆時点（2016/11/26）では、少しバージョが古いようなので、「pip」自体をアップグレードしておきます。




    
    pip install linkchecker





続いて、インストールできなかった「linkchecker」をインストールしてみます。




    
    Installing collected packages: linkchecker
    Successfully installed linkchecker-9.3





問題なくインストールできました。蛇足ですが、「linkchecker」のバグで、インストール直後の状態では正常に動作しません。




    
    This program requires Python requests 2.2.0 or later.





このように表示されてしまう場合は、以下のコマンドを実行してください。「2.10.x」を「2.2.x」よりも古いバージョンであると誤認識しているようですね…。




    
    sudo pip install requests==2.9.2





## まとめ





SIP（rootless）は、リカバリモードで起動すれば解除することもできますが、安全ではありません。SIPにより、システムディレクトリの変更が制限されるのであれば、上記のように回避策を使用するべきなのでしょう。しかし、OS標準で付属しているツールにもかかわらず使用できないというのは困ったものです。
