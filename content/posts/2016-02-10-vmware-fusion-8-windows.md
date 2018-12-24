---
author: ottan
date: 2016-02-10 08:36:15+00:00
draft: false
title: VMware Fusion 8にWindows 10をインストールする
type: post
url: /vmware-fusion-8-windows-6837/
categories:
- Mac
- Windows
tags:
- Development
---

![](/images/2016/02/160209-56b9f8d752afb.jpg)






[仮想化を使用して Mac 上で Windows を実行： VMware Fusion の無償評価版 | VMware 日本](http://www.vmware.com/jp/products/fusion)で、VMware Fusion 8の無償評価版を手に入れたので、早速仮想マシンにWindows 10をインストールしてみました。





## VMware Fusion 8にWindows 10をインストールする





VMware Fusion 8にWindows 10をインストールするためには、公式サイトからWindows 10のISOファイルをダウンロードしておきます。



https://www.microsoft.com/ja-jp/software-download/windows10ISO



![](/images/2016/02/160209-56b9f8d7daeb3.png)






インストールするWindows 10のエディションを選択します。「Windows 10」を選択し、「確認」をクリックします。





![](/images/2016/02/160209-56b9f8da4b9e3-1.png)






「日本語」を選択し、「確認」をクリックします。





![](/images/2016/02/160209-56b9f8e043d28.png)






PCの環境に応じて、32-bitまたは64-bitのISOファイルをダウンロードします。ここではMacBook Pro（Late 2013）にインストールする想定であるため、64-bit版を選択しました。





### VMware Fusion 8にWindows 10を簡単インストール





![](/images/2016/02/160208-56b84a0d237a5-1.png)






VMware Fusionで⌘+Nで新規仮想マシンを作成します。「ディスクまたはイメージ」を選択して、「続ける」をクリックします。





![](/images/2016/02/160209-56b9f8e30f572.png)






「別のディスクまたはディスクイメージを使用」をクリックし、ダウンロードしたISOファイルを選択します。Windows 10のISOファイルを選択した状態で、「続ける」をクリックします。





![](/images/2016/02/160209-56b9f8e487f38-1.png)






「Microsoft Windows 簡単インストール」画面が表示されますので、アカウント名、パスワード、プロダクトキーを入力し、Windowsのエディションを選択したら「続ける」をクリックします。





![](/images/2016/02/160208-56b84a12b82d5.png)






MacとWindowsを統合する方法は、Windows側がウイルスに感染した際の被害を最小限にするために、ここでは「さらに分離」（疎結合）を選択していますが、気にしない方は「さらにシームレス」（密結合）を選択しても良いでしょう。





![](/images/2016/02/160209-56b9f8e7a486e.png)






「終了」をクリックします。





![](/images/2016/02/160209-56b9f8e9a4c66.png)






仮想マシンを保存するフォルダーを選択する画面が出てくるため、任意のフォルダー、名称を付与して「保存」をクリックします。デフォルトでは、「~/Documents/仮想マシン/仮想マシン名.vmwarevm」となっています。





![](/images/2016/02/160209-56b9f8eb27c7d-1.png)






あとは放っておけば自然にWindowsのインストールが始まります。





![](/images/2016/02/160209-56b9f8fd71141.png)






最後に、よりVMware Fusionを快適に利用するために「VMware Tools」をインストールします。「VMware Tools」をインストールすることで、クリップボードの共有ができるようになります。





![](/images/2016/02/160208-56b84a2a89601.png)






「VMware Tools」のインストールを行うためには、仮想マシンが起動している状態で、メニューの「仮想マシン」→「VMware Tools のインストール」を選択します。





![](/images/2016/02/160209-56b9f92449e47.png)






「インストール」をクリックします。





![](/images/2016/02/160209-56b9f9445e7fe.png)






右下に「タップして、このディスクに対して行う操作を選んでください。」が表示されるため、タップしたら「setup64.exe の実行」をクリックします。ここに表示される内容は、32-bit版、64-bit版で異なりますので注意してください。





![](/images/2016/02/160209-56b9f9688f70b.png)






「VMware Tools」のインストールウィザードが始まりました。「次へ」をクリックします。





![](/images/2016/02/160209-56b9f9840f987-1.png)






「変更」をクリックします。





![](/images/2016/02/160209-56b9f99fe29e8.png)






「次へ」をクリックします。





![](/images/2016/02/160209-56b9f9bb44803-1.png)






「変更」をクリックします。





![](/images/2016/02/160209-56b9f9d5b4664-1.png)






「完了」をクリックします。以上で、「VMware Tools」のインストールは完了です。お疲れさまでした。





## まとめ





VMware Fusionを利用することで、簡単に仮想マシンにWindows 10をインストールすることができました。VMware Fusionの初心者の方の参考になればと思います。
