---
author: ottan
date: 2016-10-16 12:47:09+00:00
draft: false
title: MacでWindowsに搭載されているInternet Explorer 9でのレンダリングを確認する方法
type: post
slug: mac-windows-internet-explorer-5113
categories:
  - Mac
  - Windows
tags:
  - Tips
---

![](/uploads/2016/10/161016-580373be2faca.jpg)

以前、[Mac で Internet Explorer 11 を使用する簡単な方法 – OTTAN.XYZ](/how-to-use-ie-mac-6812/)という記事を執筆し、幸いにも多くの方に閲覧していただいている状況です。しかし、ここでご紹介している方法は、年月が経過するとともに陳腐化してしまい、とうとう使用できなくなってしまっていました。「modern.IE」と呼ばれる、Mac のリソースを使用することなく、非常に簡単に使用できる画期的な方法だったわけですが、Microsoft が突如停止してしまったため現在は使用できません。今回は、代替手段をご紹介します。

## Mac で Internet Explorer を使用する

一手間が必要になりましたが、無償で使用できます。Mac に何らかの仮想環境を構築する必要があります。もっとも手軽に試せる手段は、Oracle が提供する無償のソフトウェア「VirtualBox」を使用することです。今回は、利用者が多いと思われる「Parallels Desktop」を使用します。

### 仮想マシンのイメージをダウンロードする

マイクロソフトは、「modern.IE」による、リモートでの Internet Explorer の再現環境の提供を中止し、代替手段として仮想マシンのイメージファイルを提供するようになりました。Mac で動作する「VirtualBox」「VMware Fusion」「Parallels Desktop」などの主要な仮想環境に対応した仮想マシンのイメージをダウンロードできます。

https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/

仮想マシンのイメージをダウンロードするためには、上記のリンクをクリックします。

![](/uploads/2016/10/161016-5803735b93776.png)

「Virtual machine」「Select platform」から、必要な仮想マシンのイメージファイル、仮想環境のプラットフォームを選択します。記事執筆時点では、「IE8 on Win7」「IE9 on Win7」「IE10 on Win7」「IE11 on Win7」「IE11 on Win81」「Microsoft Edge」から選択できます。Windows 8 は、完全に闇の中のようです。また、プラットフォームとしては「VirtualBox」「Vagrant」「Hyper-V」「VPC」「VMware」「Parallels」から選択可能です。「Hyper-V」「VPC」は Windows 専用のため、Mac ユーザの皆さんは対象外です。

![](/uploads/2016/10/161016-580373654a032.png)

さて、今回は「IE9 on Win7」の「Parallels」を選択しました。「Virtual machine」と「Select platform」を選択すると、「Download .zip」がアクティブになりますので、クリックします。「Parallels」の場合で、約 3.8GB 程度の容量があり、さらに解凍すると 10GB 程度の空き容量が必要になります。

![](/uploads/2016/10/161016-5803736b2856d.png)

ダウンロードして、zip ファイルを解凍すると、そのまま「Parallels Desktop for Mac」の仮想マシンイメージが展開されます。10GB 程度の容量を必要とするため、空き容量にご注意ください。ダブルクリックします。

![](/uploads/2016/10/161016-5803736fcedaf.png)

「コピー済み」をクリックします。

![](/uploads/2016/10/161016-5803737707a8c.png)

すぐに、Windows 7 の再現環境が起動します。「Parallels Desktop for Mac」をお使いの場合は、自動的に「Parallels Tools」のインストールが始まります。完了したら、一度再起動してください。Windows 7 のエディションは「Enterprise」と表示されています。また、壁紙にも使用方法が書かれていますが、Internet Explorer 以外の用途で使用することはできませんのでご注意ください。

![](/uploads/2016/10/161016-5803737f6763a.png)

Internet Explorer を開くと、任意の Web ページを閲覧できます。

## まとめ

「modern.IE」は偉大。レガシーなブラウザのサポートが必要である場合は、この方法をお試しください。
