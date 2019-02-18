---
author: ottan
date: 2016-04-07 13:05:46+00:00
draft: false
title: VMware Fusion 8.1のWindows上でUSBメモリを初期化できない問題の対処法
type: post
url: /vmware-fusion-8-1-usb-format-6851/
categories:
    - Mac
    - Windows
tags:
    - Tips
---

![](/images/2016/04/160423-571b6d99094e7.png)

MacBook Pro (Late 2013)の VMware Fusion 8.1 に Windows 7、8.1、 10 をインストールし、Windows の検証環境を作成しています。

Windows 8.1 以降の標準機能である「回復ドライブ」の検証を行おうと、VMware Fusion 8.1 の Windows で USB メモリのフォーマットを試みました。しかし、「Windows はフォーマットを完了できませんでした」と表示され、フォーマットに失敗してしまいました。使用している USB メモリは以下の通りです。なお、「回復ドライブ」については、以下のリンクを参照してください。

http://windows.microsoft.com/ja-jp/windows-10/create-a-recovery-drive

http://weekly.ascii.jp/elem/000/000/359/359605/

## VMware Fusion 8.1 で USB メモリのフォーマットに失敗する問題の対処法

![](/images/2016/04/160423-571b6d9d1259b.png)

USB メモリを VMware Fusion 8.1 上の Windows に接続し、上記のように USB メモリのフォーマットを試みます。

![](/images/2016/04/160423-571b6d9e344a6.png)

すると、上記のメッセージが表示され、フォーマットに失敗してしまいます。VMware のサポートセンターに問い合わせたところ、VMware Fusion 8.1 のリムーバブルディスクへの操作に対して問題があるようです。次期アップデートで改善される見込みのようです。試しに、「diskpart」コマンドによるディスクの内容の消去を試みましたが、こちらもダメでした。

というわけで、VMware Fusion 8.1 上の Windows で USB メモリのフォーマットを行うことはできません。すなわち、「回復ドライブ」の作成などのように、Windows が強制的にデバイスのフォーマットを試みる機能は、全般的に使用できないということです。では、どうすれば良いのでしょうか。

### VMware Fusion 8.0.2 にダウングレードする

この事象に対するワークアラウンドは、前バージョンである VMware Fusion 8.0.2 にダウングレードすることです。現在は、この方法しか手段がありません。

![](/images/2016/04/160423-571b6da01e141.png)

VMware Fusion 8.1 から 8.0.2 にダグングレードするためには、アプリケーションフォルダーから、「VMware Fusion.app」をゴミ箱に移動します。その後、Finder 上で、⇧+⌘+⌫ でゴミ箱の中身を空にします。

その後、以下のリンクから VMware Fusion 8.0.2 をダウンロードし、インストールします（My VMware へのログインが必要です）。ダウングレード後は、Windows 上で快適に USB メモリのフォーマットが実施できるようになります。

https://my.vmware.com/jp/group/vmware/details?productId=527&rPId;=9753&downloadGroup;=FUS-802#product_downloads

### 補足：Mac でフォーマットした USB メモリを Windows に認識させるためには

![](/images/2016/04/160423-571b6dac06ebf-1.png)

これは補足になりますが、Mac でフォーマットした USB メモリを Windows に認識させるためには、ディスクユーティリティで内容を消去する際に、注意する必要があります。ディスクユーティリティを開いたら、該当の USB メモリを選択して、「消去」ボタンをクリックします。

![](/images/2016/04/160423-571b6db49ba13-1.png)

「フォーマット」は「MS-DOS（FAT）」、「方式」は「マスター・ブート・レコード」を選択しましょう。これで、フォーマットした USB メモリを Windows に認識させることができます。Windows でフォーマットできなければ、Mac でフォーマットしてから認識させるというのも 1 つの手段です。ただし、前述のように、VMware Fusion 8.1 では、Windows が強制的にフォーマットを実施してしまう機能を実行することはできません。

## まとめ

VMware Fusion 8.1 では、Windows で USB メモリをフォーマットできない問題が報告されています。次期アップデートにより改善見込みです。それまで待てないという場合には、苦渋の決断になりますが、VMware Fusion 8.0.2 にダウングレードするしかありません。なお、ダウングレード時に仮想マシンを削除するわけではないので、安心してください。
