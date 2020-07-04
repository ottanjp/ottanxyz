---
author: ["@ottanxyz"]
date: 2017-11-24 13:49:44+00:00
draft: false
title: macOS High SierraでsudoコマンドをTouch IDで認証する方法
type: post
slug: sudo-touch-id-macbook-6332
categories:
- Mac
tags:
- Development
---

 ![](/uploads/2017/11/171124-5a17d0bf5b9b9.png)
 photo credit: lewro [I love working in this RAILS enviroment](http://www.flickr.com/photos/61128561@N00/3795782148) via [photopin](http://photopin.com) [(license)](https://creativecommons.org/licenses/by-nc-nd/2.0/) 



[MacBook ProのTouch IDを利用してSudoコマンドを実行できる方法が発見される。 | AAPL Ch.](https://applech2.com/archives/20171117-how-to-use-sudo-command-with-touch-id.html)によると、Touch BarおよびTouch IDが搭載されているMacBook Proにおいて、特権でコマンドを実行する`sudo`コマンドをTouch IDで認証できる方法が見つかったようです。





## sudoコマンドをTouch IDで認証する





`sudo`コマンドとは、Macのターミナルからコマンドを実行する際、特権（root）でコマンドを実行する方法です。管理者権限を有するユーザーであれば、通常のアカウントでは編集できないファイル（/etc/hostsなど）やコマンドを、特権（root）で実行できます。





### PAMの認証にTouch IDによるsudoを追加する





PAM（Pluggable Authentication Module）とは、認証処理を行うモジュールおよびその認証機構のことを指します。FreeBSDから派生したMacやLinux系OSには標準で搭載されているセキュリティ機構です。`sudo`コマンドによる認証も、PAMの仕組みを利用して行われます。Touch IDを搭載したMacBook Proには、Touch IDによるPAMのモジュールが標準で搭載されており、PAMによる`sudo`の認証にこのモジュールを追加することにより、`sudo`コマンド実行時に、従来のパスワードではなくTouch IDを使用して認証することができるようになります。




    
    # sudo: auth account password session
    auth       sufficient     pam_smartcard.so
    auth       required       pam_opendirectory.so
    account    required       pam_permit.so
    password   required       pam_deny.so
    session    required       pam_permit.so





`sudo`コマンドによる、PAMの認証は`/etc/pam.d/sudo`ファイルで管理されており、デフォルトでは上記のようになっています。PAMの認証は上から順番に行われるため、デフォルトでは「スマートカード（ICカード認証）」（十分条件：認証に成功した場合は実行、失敗した場合は次へ）、「OpenDirectory」（必要条件：認証に成功した場合は次へ、失敗した場合は処理を終了）、さらにアカウントの権限確認（管理者権限を持っているか）およびパスワードの認証を経て`sudo`されることになります。このファイルの先頭に以下の記述を追記します。




    
    auth       sufficient     pam_tid.so





この記述は、認証（auth）に`pam_tid.so`モジュールを使用することを意味します。この`pam_tid.so`が、Touch ID搭載のMacBook Proに搭載されているTouch IDによるPAMの認証モジュールです。sufficientは「十分条件」という意味であり、この認証に成功すると以降に記述されている認証は行われないため、Touch IDのみによる`sudo`コマンドの実行を行うことが可能です。





sufficeint（十分条件）をrequired（必要条件）に変更することで、Touch ID、かつパスワードによる認証という強固なものにすることもできますが、Touch IDを使用できない環境（手に汗をかいていて正常に認証されない、など）において、`sudo`できなくなってしまうため、あまり需要はないかもしれません。





このファイルは特権アカウントでのみ編集が許可されているため、編集時は`sudo`コマンドを使用してください。`vi`で編集するためには、ターミナルから以下のコマンドを実行します。




    
    sudo vi /etc/pam.d/sudo





任意のテキストエディター（今回の場合は、vi）で上記のファイルを開き
、ファイルの先頭に上記の文字列を追記してください。編集後のファイルは以下のようになります。




    
    # sudo: auth account password session
    auth       sufficient     pam_tid.so
    auth       sufficient     pam_smartcard.so
    auth       required       pam_opendirectory.so
    account    required       pam_permit.so
    password   required       pam_deny.so
    session    required       pam_permit.so





ターミナルを再起動し、再度同様のコマンドを実行しようとすると、パスワードを求められる代わりに以下のダイアログが表示されます。





![](/uploads/2017/11/171124-5a17d3e01da34.png)






ダイアログで「キャンセル」ボタンをクリックすると、従来通りパスワードによる認証になります。




    
    sudo -s





参考までに上記のコマンドを実行することで、以降の作業をすべて特権で実行できます。
