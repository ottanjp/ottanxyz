---
author: ["@ottanxyz"]
date: 2015-11-06 12:58:45+00:00
draft: false
title: macOS El Capitanでディスクのアクセス権の検証、修復を行う方法
type: post
slug: el-capitan-disk-verify-repair-6816
categories:
- Mac
tags:
- Tips
---

![](/uploads/2015/11/151106-563ca40e7a8b8-1.jpg)






macOS El Capitanからディスクユーティリティが刷新され、macOS Yosemiteまで存在していたアクセス権の検証、修復がなくなりました。ここではコマンドラインで行う方法をご紹介します。





![](/uploads/2015/11/151106-563ca4113ad49.png)






アクセス権の検証を行うには以下のコマンドを実行します。




    
    $ sudo /usr/libexec/repair_packages --verify --standard-pkgs /
    	Permissions differ on "Library/Java", should be drwxr-xr-x , they are drwxrwxr-x .
    	User differs on "private/var/db/displaypolicyd", should be 0, user is 244.
    	Group differs on "private/var/db/displaypolicyd", should be 0, group is 244.
    	User differs on "usr/local", should be 0, user is 501.
    	Group differs on "usr/local", should be 0, group is 80.
    	Permissions differ on "usr/local", should be drwxr-xr-x , they are drwxrwxr-x .
    





アクセス権の修復を行うには以下のコマンドを実行します。




    
    $ sudo /usr/libexec/repair_packages --repair --standard-pkgs --volume /
    	Permissions differ on "Library/Java", should be drwxr-xr-x , they are drwxrwxr-x .
    	Repaired "Library/Java".
    	User differs on "private/var/db/displaypolicyd", should be 0, user is 244.
    	Group differs on "private/var/db/displaypolicyd", should be 0, group is 244.
    	Repaired "private/var/db/displaypolicyd".
    	User differs on "usr/local", should be 0, user is 501.
    	Group differs on "usr/local", should be 0, group is 80.
    	Permissions differ on "usr/local", should be drwxr-xr-x , they are drwxrwxr-x .
    	Repaired "usr/local".





Macの調子がおかしいときは、アクセス権の検証、修復を試してみましょう。
