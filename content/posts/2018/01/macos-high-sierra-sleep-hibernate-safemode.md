---
author: ["@ottanxyz"]
date: 2018-01-28 07:45:17+00:00
draft: false
title: macOS High Sierraでスリープから復帰時にフリーズして操作できなくる事象を回避する
type: post
slug: macos-high-sierra-sleep-hibernate-safemode-6587
categories:
- Mac
tags:
- macOS
---

![](/uploads/2018/01/180128-5a6d77116e71d.jpg)

macOS High Sierra（筆者の環境は10.13.3、MacBook Pro 2017）において、スリープから復帰時（とくに、夜間にバッテリーの充電を行い翌朝使用する場合）に、画面がフリーズしてログイン画面が表示された状態のまま操作できない（反応はするが何もできない）状態に陥ることが多くなりました。おそらく、macOS High Sierraのバグと考えられますが、同じような事象に悩まされている方で、本事象が解決するまでの暫定的な対処策をご紹介します。

## macOS High Sierraでスリープから復帰時にフリーズする事象を回避

通常の短時間のスリープからの復帰時には問題ありませんが、一定時間が経過しスタンバイモードからの復帰時に事象が再現します。必ずしも再現するわけではありませんが、度々再現するため事象を回避することにしました。

### 恐らく原因はスリープ（セーフスリープ）からの復帰

Macのラップトップ製品（MacBook、MacBook Air、MacBook Pro）では、デフォルトで「セーフスリープ」が有効になっています。これは、スリープ時に、セッションの状態をSSDに退避しておくことで、通常のスリープから復帰時にはRAMからの読み込み、バッテリー電源が切れてしまった場合からの復帰時には、SSDから退避したファイルの内容を読み込んで復帰してくれるという、スリープの「いいとこ取り」のような機能です。この「セーフスリープ」は、非常に便利な機能で、できれば無効化したくないのですが、どうもこの「セーフスリープ」からの復帰時に正常に復帰できていないようです。現在のスリープモードの設定は以下のコマンドで確認できます。

    pmset -g

以下のような内容が表示されます。

    System-wide power settings:
    Currently in use:
     standbydelay         10800
     standby              1
     halfdim              1
     hibernatefile        /var/vm/sleepimage
     powernap             0
     gpuswitch            2
     disksleep            10
     sleep                1 (sleep prevented by sharingd, coreaudiod)
     autopoweroffdelay    28800
     hibernatemode        3
     autopoweroff         1
     ttyskeepawake        1
     displaysleep         2
     tcpkeepalive         1
     acwake               0
     lidwake              1

デフォルトでは、`hibernatemode`が3（セーフスリープ）になっています。`hibernatemode`には3種類あり
、ラップトップ製品のデフォルトである3（セーフスリープ）の他に、0（スリープ）、25（ディープスリープ）があります。ラップトップ製品ではデフォルト値が3、デスクトップ製品ではデフォルト値が1（通常、電源が切れる心配がないため）になっています。

通常のスリープモードでは、SSDにセッションの状態が退避されないため、バッテリー電源が切れてしまうと作業内容が完全に失われてしまいます。また、ディープスリープモードでは、作業内容を常に`hibernatefile`に退避し、スリープからの復帰時には必ずファイルから内容を読み込むため、スリープからの復帰が遅くなり日常的に使用するには向いていません（RAMの内容を完全にファイルに書き込んでから退避するためRAMを解放するという意味では向いているのかもしれませんが…）。

外出が多く、バッテリー切れが心配な方には、あまりオススメできる方法ではありませんが、このスリープから復帰時にフリーズする事象は、セーフモードを無効化することで一時的に回避できそうです。（将来的には修正されることを願って）

### セーフスリープからスリープへの変更（要再起動）

セーフスリープから通常のスリープへ変更するためには、ターミナルから以下のコマンドを実行します。

    sudo pmset -a hibernatemode 0

実行後は、前述のコマンドを実行して`hibernatemode`が変更されていることを確認してください。

    System-wide power settings:
    Currently in use:
     standbydelay         10800
     standby              1
     halfdim              1
     hibernatefile        /var/vm/sleepimage
     powernap             0
     gpuswitch            2
     disksleep            10
     sleep                1 (sleep prevented by sharingd, coreaudiod)
     autopoweroffdelay    28800
     hibernatemode        0
     autopoweroff         1
     ttyskeepawake        1
     displaysleep         2
     tcpkeepalive         1
     acwake               0
     lidwake              1

数値が変更されていることが確認できたら、OSを再起動して設定完了です。同じような事象に悩まされている場合には、お試しください。（バッテリー電源切れにはくれぐれもご注意ください）
