---
author: ["@ottanxyz"]
date: 2015-08-11T00:00:00+00:00
draft: false
title: Windows 10のシャットダウン、再起動が遅い時の対処法
type: post
slug: windows-10-shutdown-reboot-1996
categories:
- Windows
tags:
- Tips
---

![](/uploads/2015/08/150811-55c9793cd47b3.jpg)






Windows 10の再起動、シャットダウンが遅いと感じたことはありませんか？今回は、Windows 10の再起動、シャットダウンのスピードを上げる方法をご紹介します。





## Windows 10の再起動、シャットダウンのスピードを上げる





レジストリを編集しますので、自己責任でお願いします。また、レジストリを編集する場合は、必ずバックアップを取得しましょう。





### 「WaitToKillServiceTimeout」の値を修正する





「Windows」キー＋Rボタンをクリックして、「ファイル名を指定して実行画面」を出し、「regedit」と入力しレジストリエディターを起動します。「ファイル」→「エクスポート」でレジストリのバックアップを取得しておきましょう。





![](/uploads/2015/08/150811-55c9793dc78bd.png)






以下に移動します。




    
    HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control





「WaitToKillServiceTimeout」キーをダブルクリックします。「WaitToKillServiceTimeout」は、サービスの応答がない場合に、サービスを強制終了するまでの時間をあわらします。





![](/uploads/2015/08/150811-55c9793f53572.png)






値の単位はミリ秒です。1000〜20,000まで設定可能ですが、ここでは「1000」（即ち、1秒）を設定します。設定したら「OK」ボタンをクリックします。





![](/uploads/2015/08/150811-55c97941262dd.png)






「データ」が「1000」になっていることを確認しましょう。





![](/uploads/2015/08/150811-55c97942a0be0.png)






### 「HungAppTimeout」値を作成する





次に、以下に移動します。




    
    HKEY_CURRENT_USER\Control Panel\Desktop





「編集」→「新規」→「文字列値」をクリックします。文字列値の名前は「HungAppTimeout」とします。「HungAppTimeout」は、サービスがハングアップしたと判断されるまでの時間です。





![](/uploads/2015/08/150811-55c97944d1d28.png)






作成した「HungAppTimeout」をダブルクリックして、値を編集します。単位はミリ秒です。ここでは例として、「1000」（即ち、1秒）としていますが、5秒（5000）程度がオススメです。





![](/uploads/2015/08/150811-55c97946a9c99.png)






「HungAppTimeout」のデータが「1000」となっていることを確認します。





### 「WaitToKillAppTimeout」値を作成する





同様の要領で「WaitToKillAppTimeout」を作成します。「WaitToKillAppTimeout」は、サービスからの応答がなくなるまでの時間をあらわしています。





![](/uploads/2015/08/150811-55c97948462e9.png)






単位はミリ秒です。ここでは「1000」（即ち、1秒）を設定します。





![](/uploads/2015/08/150811-55c9794a5da10.png)






「WaitToKillAppTimeout」のデータが「1000」となっていることを確認します。





![](/uploads/2015/08/150811-55c9794beafd1.png)






## まとめ





Windowsではシャットダウン時にアプリケーションの応答を確認しています。応答を確認するまでの時間が短ければ短いほど、シャットダウン、再起動の時間は短くなりますが、本来であれば正常終了していたアプリケーションが、応答なしと判断され強制終了されてしまう場合がありますので注意が必要です。レジストリの編集も必要ですので、自己責任でお願いします。必ずバックアップは取得しましょう。
