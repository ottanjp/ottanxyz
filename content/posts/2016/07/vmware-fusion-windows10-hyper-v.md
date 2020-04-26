---
author: ottan
date: 2016-07-24 02:56:59+00:00
draft: false
title: VMware Fusionで作成したWindows 10 Professionalの仮想マシンでHyper-Vを有効化する方法
type: post
slug: vmware-fusion-Windows 10-hyper-v-4689
categories:
- Mac
- Windows
tags:
- Development
---

![](/uploads/2016/07/160724-57942af931232.jpg)






Windows 10 Insider Preview（Build 14379）で確認しています。通常、VMware Fusionで作成したWindows 10の仮想マシン上で、Windowsの標準仮想化技術であるHyper-Vを動作させることはできませんが、VMwareの設定を変更することで、Hyper-Vを有効化させる事ができます。ただし、Hyper-Vは、VMware Fusionのサポート対象外であり、かつHyper-Vを動作させる仮想マシン自体に高スペックが必要であることから実用性は皆無です。趣味の世界です。





## VMware FusionのWindowsでHyper-Vを有効化する





![](/uploads/2016/07/160724-57942b8f2c7a0.png)






まず、前提として、Hyper-Vを有効化できるOSは、Windows 10 Professionalです。Windows 10 Homeでは有効化できません。





さて、VMware Fusionにインストールした、Windows 10からHyper-Vの機能を有効化しようとすると、「Hyper-Vをインストールできません：プロセッサに、必要な仮想化機能がありません」と表示されてしまいます。



https://msdn.microsoft.com/ja-jp/virtualization/hyperv_on_windows/quick_start/walkthrough_compatibility



Hyper-Vに要求されるシステム要件は上記の通りです。これらを満たしていないということです。





### 仮想マシンのOSの種類を変更する





では、どうするかというと、VMware Fusionで仮想マシンのOSの種類を変更してしまいます。





![](/uploads/2016/07/160724-57942c56d4936.png)






具体的には、Hyper-VがサポートされたOS（Windows 8以降）を選択して、「設定」をクリックします。





![](/uploads/2016/07/160724-57942cb11eb9b.png)






「一般」をクリックします。





![](/uploads/2016/07/160724-57942cc33211b.png)






「OS」を「Hyper-V（サポートなし）」に変更します。もちろん、仮想マシン作成時に事前に「Hyper-V」を選択しても構いません。「サポートなし」であることを注意してください。つまり、OSをHyper-Vに設定した仮想マシンに関する、VMware Fusion絡みのトラブルはサポートされないということです。





![](/uploads/2016/07/160724-57942ccbe5c8d.png)






「変更」をクリックしたら、OSを起動します。





### Hyper-Vをインストールする





![](/uploads/2016/07/160724-57942cd24f2b1.png)






Windows 10 Professionalが起動したら、「スタート」を右クリックして「コントロールパネル」をクリックします。





![](/uploads/2016/07/160724-57942cdcc175e.png)






「プログラム」をクリックします。





![](/uploads/2016/07/160724-57942ce364f35.png)






「プログラムと機能」から「Windowsの機能の有効化または無効化」をクリックします。





![](/uploads/2016/07/160724-57942cea02564.png)






「Hyper-V」のチェックボックスをオンにして、「OK」をクリックします。





![](/uploads/2016/07/160724-57942cf225467.png)






自動的に必要な機能がインストールされます。とくに、Windowsのインストールメディアは不要です。最後に、OS再起動を促されますので、再起動します。





### Hyper-Vを使用する





![](/uploads/2016/07/160724-57942cf870bc1.png)






「スタート」メニューの検索ボックスに「Hyper-V」と入力して、「Hyper-Vマネージャー」をクリックします。





![](/uploads/2016/07/160724-57942d00a9e37.png)






このように、Windows 10で「Hyper-Vマネージャー」が使用できるようになりました。後は、自由に仮想マシンを追加、削除することがきます。





## まとめ





完全に趣味の範囲内ですが、VMware Fusion上で作成したWindows仮想マシン上で、Hyper-Vを有効化する方法をご紹介しました。
