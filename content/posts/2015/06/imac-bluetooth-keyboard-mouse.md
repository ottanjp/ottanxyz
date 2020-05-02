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

突然、iMac に Bluetooth 経由で接続しているマウスとキーボードが認識されなくなり、途方に暮れていたんですが、PRAM クリアで無事認識されるようになりました。

#### そもそも PRAM とは

PRAM（Parameter Random-Access Memory）と呼ばれる、コンピューターの少容量のメモリでは、macOS がすばやくアクセスできる場所に特定の設定が保存されます。保存される特定の設定は、Mac の種類、および Mac に接続されている装置の種類によって決まります。この設定には、指定起動ディスク、表示解像度、スピーカーの音量、その他の情報が含まれます。

[macOS Mountain Lion: コンピューターの PRAM をリセットする](https://support.apple.com/kb/PH11243?locale=ja_JP&viewlocale=ja_JP)

マウス操作、キーボード操作の両方を受け付けなくなったので、まずシャットダウンすることすらできません。そのため、**電源ボタンを長押しして強制的にシャットダウン**を行います。

以下の方法で、PRAM のクリアを行います。

1. 電源ボタンを長押しして Mac を強制的にシャットダウンする
2. Mac の電源を入れる
3. ⌘+⌥+P+R を、Mac の起動音が 2 回するまで押し続けます。
4. 起動音が 2 回聞こえたらキーボードから手を離します。

PRAM については、[Mac の起動が遅い！Mac の起動を早くする 7 つの方法](/posts/2015/06/mac-boot-speed-up-1590/)でもご紹介していますので、参考にしてみてください。
