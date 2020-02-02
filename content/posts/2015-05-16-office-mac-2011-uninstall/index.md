---
author: ottan
date: 2015-05-16 06:41:58+00:00
draft: false
title: Office for Mac 2011を完全にアンインストールする方法
type: post
url: /office-mac-2011-uninstall-1375/
categories:
- Mac
tags:
- Tips
---

![](/images/2015/05/150516-5556e344ae76f.jpg)






MacからOffice for Mac 2011を完全にアンインストールする方法をご紹介します。インストールはインストーラーのウィザードの内容にしたがって進めれば良いだけですが、アンインストールは大変です。以下の内容にしたがってアンインストールを進めてください。





## Dockからアイコンを削除する





まず、Dockを占有するOfficeのアイコンを削除します。





![](/images/2015/05/150516-5556e345baeb5.png)






## アプリケーションフォルダーからフォルダーを削除する





続いて、アプリケーションフォルダーにある「Microsoft Office 2011」フォルダーを削除する。





![](/images/2015/05/150516-5556e347a33de.png)






## ライブラリフォルダーから不要なファイルを削除する





`~/Library/Preferences`から、`com.microsoft`から始まるファイルをすべて削除します。Finderを開いて、⇧+⌘+Gを押し、上記のフォルダーに移動します。





![](/images/2015/05/150516-5556e34b634a4.png)






同様に`~/Library/Application Support`から、`Microsoft`フォルダーを削除します。





![](/images/2015/05/150516-5556e34f05cba.png)






続いて、`/private/var/db/receipts`に移動し、同様に`com.microsoft.office`から始まるファイルを削除します。





![](/images/2015/05/150516-5556e352d60ee.png)






## フォントファイルの削除





いよいよ最後です。`/Library/Fonts`フォルダーから、`Microsoft`フォルダーを削除します。





![](/images/2015/05/150516-5556e356c43fc.png)






以上で完了です。お疲れ様でした。
