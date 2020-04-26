---
author: ottan
date: 2015-06-28 04:19:34+00:00
draft: false
title: iMacでBluetoothのマウスとキーボードが認識されなくなった！PRAMクリアで解決
type: post
slug: imac-bluetooth-keyboard-mouse-1753
categories:
- Mac
tags:
- Tips
---

![](/uploads/2015/06/150628-558f75d963fd0.jpg)






突然、iMacにBluetooth経由で接続しているマウスとキーボードが認識されなくなり、途方に暮れていたんですが、PRAMクリアで無事認識されるようになりました。








#### そもそもPRAMとは




PRAM（Parameter Random-Access Memory）と呼ばれる、コンピューターの少容量のメモリでは、macOS がすばやくアクセスできる場所に特定の設定が保存されます。保存される特定の設定は、Mac の種類、および Mac に接続されている装置の種類によって決まります。この設定には、指定起動ディスク、表示解像度、スピーカーの音量、その他の情報が含まれます。




[macOS Mountain Lion: コンピューターの PRAM をリセットする](https://support.apple.com/kb/PH11243?locale=ja_JP&viewlocale=ja_JP)








マウス操作、キーボード操作の両方を受け付けなくなったので、まずシャットダウンすることすらできません。そのため、**電源ボタンを長押しして強制的にシャットダウン**を行います。





以下の方法で、PRAMのクリアを行います。






  1. 電源ボタンを長押ししてMacを強制的にシャットダウンする
  2. Macの電源を入れる
  3. ⌘+⌥+P+Rを、Macの起動音が２回するまで押し続けます。
  4. 起動音が２回聞こえたらキーボードから手を離します。




PRAMについては、[Macの起動が遅い！Macの起動を早くする7つの方法](/mac-boot-speed-up-1590/)でもご紹介していますので、参考にしてみてください。
