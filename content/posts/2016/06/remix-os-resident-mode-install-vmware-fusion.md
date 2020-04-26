---
author: ottan
date: 2016-06-19 13:18:14+00:00
draft: false
title: Remix OSをResident modeでVMware Fusionにインストールし、Google Playストアを使用できるようにする
type: post
url: /remix-os-resident-mode-install-vmware-fusion-4492/
categories:
- Android
- Mac
tags:
- Development
- Google
---

![](/uploads/2016/06/160619-576693af8f3ba.jpg)






Android互換OS「Remix OS」をインストールして使用する方法をご紹介します。以前、VirtualBoxにインストールする方法をご紹介した際は、「Resident mode」（常駐モード）でのセットアップが上手くいかず、「Guest Mode」（ゲストモード）で雰囲気のみを味わうに留まりましたが、今回は「Resident mode」でのセットアップの方法をご紹介します。



https://ottan.xyz/virtualbox-remixos-6826/



## Remix OSをVMware Fusionにインストールする





今回は、VMware Fusionを使用していますが、VirtualBox、Parallelsでも同様の方法でセットアップできると思います（要検証）。



http://www.jide.com/remixos-for-pc#downloadNow



まずは、「Remix OS for PC」のISOファイルをダウンロードしましょう。上記リンクから「64-bit」のISOファイルをダウンロードします。現在は、「Torrent」ファイルのみの提供となっているため、ダウンロードするためには、別途「uTorrent」などのダウンローダーが必要です。ここでは詳細は割愛します。





![](/uploads/2016/06/160619-576693b6a5b79.png)






### 仮想マシンの作成





![](/uploads/2016/06/160619-576693d83f865.png)






では、VMware Fusionで仮想マシンを作成しましょう。「ディスクまたはイメージからインポート」を選択して「続ける」をクリックします。





![](/uploads/2016/06/160619-576693dd252c4.png)






ダウンロードしたISOファイルを選択して、「続ける」をクリックします。





![](/uploads/2016/06/160619-576693e2c5976.png)






デフォルトでは、メモリが256MBと心もとないためカスタマイズします。「設定のカスタマイズ」をクリックします。





![](/uploads/2016/06/160619-576693e81fd67.png)






仮想マシンに任意の名前を付けて「保存」をクリックします。





![](/uploads/2016/06/160619-576693ef16d32.png)






「プロセッサとメモリ」をクリックします。





![](/uploads/2016/06/160619-576693fa1bbe3.png)






メモリを「2048MB」に変更します。以上で、仮想マシンのセットアップは完了です。





### Remix OSを「Resident mode」でインストールする





![](/uploads/2016/06/160619-576693ff59864.png)






続いて、仮想マシンを起動します。「Remix OS」の起動モードには「Resident mode」「Guest mode」の2種類が存在します。「Guest mode」で起動した場合、「Remix OS」に対して行った変更はすべて保存されません。雰囲気を味わいたい場合はこちらを選択すればOKです。





「Resident mode」でインストールするためには、少々小細工が必要です。「Resident mode」が選択されていることを確認して、⇥（tab）を押します。





![](/uploads/2016/06/160619-576694065bfd4.png)






セットアップパラメーターを変更します。**「SRC= DATA= CREATE_DATA_IMG=1」を削除**します。





![](/uploads/2016/06/160619-5766940de95e8.png)






続いて、**「INSTALL=1」**を末尾に追加します。JISキーボードをご使用の方は、^キーが「=」になります。注意してください。この状態で、↵（enter）を押します。





![](/uploads/2016/06/160619-5766941710d84.png)






続いて、「Create/Modify partitions」を選択して、↵を押します。





![](/uploads/2016/06/160619-5766941e1060b.png)






「Do you want to use GPT?」は、「No」を選択して、↵を押します。





![](/uploads/2016/06/160619-57669428319cb.png)






「New」を選択して、↵を押します。





![](/uploads/2016/06/160619-5766943008dd5.png)






「Primary」を選択して、↵を押します。





![](/uploads/2016/06/160619-576694373fd1a.png)






そのまま、↵を押します。





![](/uploads/2016/06/160619-5766943eaa880.png)






「Bootable」を選択して、↵を押します。





![](/uploads/2016/06/160619-576694455558e.png)






「Flags」が「Boot」になっていることを確認します。





![](/uploads/2016/06/160619-5766944cd646f.png)






「Write」を選択して、↵を押します。





![](/uploads/2016/06/160619-5766945396559.png)






「yes」と入力して、↵を押します。





![](/uploads/2016/06/160619-5766945a6298b.png)






「Quit」を選択して、↵を押します。





![](/uploads/2016/06/160619-5766946095a44.png)






作成したパーティション（sda1）を選択して、↵を押します。





![](/uploads/2016/06/160619-5766946752099.png)






「ext4」を選択して、↵を押します。





![](/uploads/2016/06/160619-5766946e8b2fd.png)






「Are you sure to format the partition sda1?」と表示されるので、「Yes」を選択して、↵を押します。





![](/uploads/2016/06/160619-576694749d070.png)






「Do you want to install boot loader GRUB?」と表示されるので、「Yes」を選択して、↵を押します。





![](/uploads/2016/06/160619-5766947b5ae2b.png)






「Do you want to install EFI GRUB2?」と表示されるので、「Skip」を選択して、↵を押します。





![](/uploads/2016/06/160619-576694820d45b.png)






「Do you want to install /system directory as read-write?」と表示されるので、「Yes」を選択して、↵を押します。（systemディレクトリを書き込み可能にする、つまり、AndroidでいうRoot化ですね）





![](/uploads/2016/06/160619-5766948c6d017.png)






最後に、「Reboot」を選択して、↵を押します。





### Remix OSの起動と日本語化





![](/uploads/2016/06/160619-576694934c4fe.png)






仮想マシンを再起動したら、起動モードを選択します。通常は、一番上を選択して、↵を押します。





![](/uploads/2016/06/160619-5766949a2b606.png)






Androidのマークが表示されたら、インストールは無事完了しています！





![](/uploads/2016/06/160619-576694a3af3d7.png)






「English」を選択して、「Next」をクリックします。





![](/uploads/2016/06/160619-576694bf08553.png)






「Next」をクリックします。





![](/uploads/2016/06/160619-576694d4d0983.png)






「Start」をクリックします。





![](/uploads/2016/06/160619-576694f5c8272.png)






「Settings」をクリックします。





![](/uploads/2016/06/160619-57669513c2a17.png)






「Language & input」をクリックします。





![](/uploads/2016/06/160619-576695280ec2d.png)






「Language」をクリックします。





![](/uploads/2016/06/160619-5766953d5ac11.png)






「日本語」を選択して、「OK」をクリックします。





### Google Playストアを使用できるようにする





「Remix OS」では、デフォルトではGoogleの各種サービスの恩恵を受けることができません。Google Playストアも然りです。このままではAndroid OSとしての魅力が半減するので、これらのGoogleサービスを使用できるようにします。





![](/uploads/2016/06/160619-57669554df658.png)






次に、デスクトップの「Install Apps」をクリックします。





![](/uploads/2016/06/160619-57669571047d2.png)






Google Chromeが起動します。表示されたリンクのうち、いずれか1つをクリックします。今回は、Google Driveを選択しました。





![](/uploads/2016/06/160619-5766957f4d0b3.png)






「ダウンロード」をクリックします。





![](/uploads/2016/06/160619-5766958917da0.png)






画面下部のバーの「オレンジ」のアイコン（ダウンロード）をクリックします。





![](/uploads/2016/06/160619-57669592b03a0.png)






ダウンロードした「GMSActivator.apk」をクリックします。





![](/uploads/2016/06/160619-5766959db88f5.png)






「インストール」をクリックします。





![](/uploads/2016/06/160619-576695b71d9bf.png)






「開く」をクリックします。





![](/uploads/2016/06/160619-576695c4d732f.png)






「INSTALL GOOGLE SERVICES」をクリックします。





![](/uploads/2016/06/160619-576695cde2b3a.png)






仮想マシンを再起動します。





![](/uploads/2016/06/160619-576695d7d974f.png)






再起動後に、Googleの各種サービスが使用できるようになっています。
