---
author: ["@ottanxyz"]
date: 2016-04-07T00:00:00+00:00
draft: false
title: VMware Fusion 8.1のWindows上でUSBメモリを初期化できない問題の対処法
type: post
slug: vmware-fusion-8-1-usb-format-6851
categories:
- Mac
- Windows
tags:
- Tips
---

![](/uploads/2016/04/160423-571b6d99094e7.png)






MacBook Pro (Retina, 15-inch, Late 2013)にインストールしている、VMware Fusion 8.1上にWindows 7、Windows 8.1、Windows 10をインストールし、Windowsの検証環境を作成しています。





Windows 8.1以降の標準機能である「回復ドライブ」の検証を行おうと、VMware Fusion 8.1上のWindows上でUSBメモリのフォーマットを試みたのですが、「Windowsはフォーマットを完了できませんでした」と表示され、フォーマットに失敗してしまいました。使用しているUSBメモリは以下の通りです。





なお、「回復ドライブ」については、以下のリンクを参照してください。



http://windows.microsoft.com/ja-jp/windows-10/create-a-recovery-drive

http://weekly.ascii.jp/elem/000/000/359/359605/



## VMware Fusion 8.1でUSBメモリのフォーマットに失敗する問題の対処法





![](/uploads/2016/04/160423-571b6d9d1259b.png)






USBメモリをVMware Fusion 8.1上のWindowsに接続し、上記のようにUSBメモリのフォーマットを試みます。





![](/uploads/2016/04/160423-571b6d9e344a6.png)






すると、上記のメッセージが表示され、フォーマットに失敗してしまいます。VMwareのサポートセンターに問い合わせたところ、VMware Fusion 8.1のリムーバブルディスクへの操作に対して問題があるようです。次期アップデートで改善される見込みのようです。試しに、「diskpart」コマンドによるディスクの内容の消去を試みましたが、こちらもダメでした。





というわけで、VMware Fusion 8.1上のWindowsでUSBメモリのフォーマットを行うことはできません。すなわち、「回復ドライブ」の作成などのように、Windowsが強制的にデバイスのフォーマットを試みる機能は、全般的に使用できないということです。では、どうすれば良いのでしょうか。





### VMware Fusion 8.0.2にダウングレードする





この事象に対するワークアラウンドは、前バージョンであるVMware Fusion 8.0.2にダウングレードすることです。現在は、この方法しか手段がありません。





![](/uploads/2016/04/160423-571b6da01e141.png)






VMware Fusion 8.1からVMware Fusion 8.0.2にダグングレードするためには、アプリケーションフォルダーから、「VMware Fusion.app」をゴミ箱に移動します。その後、Finder上で、⇧+⌘+⌫でゴミ箱の中身を空にします。





その後、以下のリンクからVMware Fusion 8.0.2をダウンロードし、インストールします（My VMwareへのログインが必要です）。ダウングレード後は、Windows上で快適にUSBメモリのフォーマットが実施できるようになります。



https://my.vmware.com/jp/group/vmware/details?productId=527&rPId;=9753&downloadGroup;=FUS-802#product_downloads



### 補足：MacでフォーマットしたUSBメモリをWindowsに認識させるためには





![](/uploads/2016/04/160423-571b6dac06ebf-1.png)






これは補足になりますが、MacでフォーマットしたUSBメモリをWindowsに認識させるためには、ディスクユーティリティで内容を消去する際に、注意する必要があります。ディスクユーティリティを開いたら、該当のUSBメモリを選択して、「消去」ボタンをクリックします。





![](/uploads/2016/04/160423-571b6db49ba13-1.png)






「フォーマット」は「MS-DOS（FAT）」、「方式」は「マスター・ブート・レコード」を選択しましょう。これで、フォーマットしたUSBメモリをWindowsに認識させることができます。Windowsでフォーマットできなければ、Macでフォーマットしてから認識させるというのも1つの手段です。ただし、前述のように、VMware Fusion 8.1では、Windowsが強制的にフォーマットを実施してしまう機能を実行することはできません。





## まとめ





VMware Fusion 8.1では、WindowsでUSBメモリがフォーマットできない問題が報告されています。次期アップデートにより改善見込みですが、それまで待てないという場合には、苦渋の決断になりますが、VMware Fusion 8.0.2にダウングレードするしかありません。なお、ダウングレード時に仮想マシンを削除するわけではないので、安心してください。
