---
author: ottan
date: 2015-09-06 13:49:44+00:00
draft: false
title: VirtualBoxにUbuntu 14.04.2 LTSをインストールする方法
type: post
url: /virtualbox-ubuntu-2418/
categories:
- Mac
tags:
- Development
- Linux
---

![](/images/2015/09/150906-55ebebde0ee6c.jpg)






Ubuntuのインストールについては、[macOS YosemiteとUbuntu 14.04.2 LTSのデュアルブート環境を構築する](https://ottan.xyz/os-x-ubuntu-dual-boot-2-1236/)で１回ご紹介していますが、デュアルブート環境を構築するのはやや敷居が高いため、より手軽な手段が欲しいという場合には、OracleのVirtualBoxを使用する方法があります。今回は、VirtualBoxにUbuntuをインストールするまでの流れをご紹介したいと思います。





## VirtualBoxにUbuntuをインストールする





以下の手順でUbuntuをVirtualBoxにインストールします。






  1. Ubuntuのダウンロード
  2. 仮想マシンの作成
  3. Ubuntuのインストール




### Ubuntuのダウンロード





Ubuntuのダウンロードは、以下のリンクから行います。



http://www.ubuntu.com/desktop



「Download Ubuntu」をクリックします。





![](/images/2015/09/150906-55ebeb7118154.png)






「Download」をクリックします。





![](/images/2015/09/150906-55ebeb736963f.png)






画面最下部の「Not now, take me to the download」をクリックします。





![](/images/2015/09/150906-55ebeb766e09d.png)






### 仮想マシンの作成





VirtualBoxを起動したら、「新規」をクリックします。





![](/images/2015/09/150906-55ebeb77ef6fe.png)






「タイプ」は「Linux」、「バージョン」は「Ubuntu (64bit)」を選択します。名前は任意の名称で構いません。「続ける」をクリックします。





![](/images/2015/09/150906-55ebeb7a0e1a0.png)






「メモリーサイズ」は、デフォルトの「512MB」では心許ないので、「1024MB」に変更します。「続ける」をクリックします。





![](/images/2015/09/150906-55ebeb7c3df5f.png)






そのまま「続ける」をクリックします。





![](/images/2015/09/150906-55ebeb7ee6ab4.png)






そのまま「続ける」をクリックします。





![](/images/2015/09/150906-55ebeb80f39d6.png)






そのまま「続ける」をクリックします。





![](/images/2015/09/150906-55ebeb837334c.png)






「作成」をクリックします。





![](/images/2015/09/150906-55ebeb859b406.png)






仮想マシンの作成が完了したら、作成した仮想マシンを選択した状態で「起動」をクリックします。





![](/images/2015/09/150906-55ebeb87e4033.png)






### Ubuntuのインストール





ダウンロードした「ubuntu-14.04.3-desktop-amd64.iso」を選択し、「Start」をクリックします。





![](/images/2015/09/150906-55ebeb8a34b99.png)






言語は「日本語」を選択し、「Ubuntuをインストール」をクリックします。





![](/images/2015/09/150906-55ebeb8d29bf6.png)






「インストール中にアップデートをダウンロードする」、「サードパーティーのソフトウェアをインストールする」をチェックし、「続ける」をクリックします。





![](/images/2015/09/150906-55ebeb9293b91.png)






そのまま「インストール」をクリックします。





![](/images/2015/09/150906-55ebeb9904ad5.png)






警告ダイアログが表示されますが、そのまま「続ける」をクリックします。





![](/images/2015/09/150906-55ebeba0b5f1f.png)






そのまま「続ける」をクリックします。





![](/images/2015/09/150906-55ebeba8cf5cd.png)






そのまま「続ける」をクリックします。





![](/images/2015/09/150906-55ebebb08a4ae.png)






項目をすべて入力して「続ける」をクリックします。「あなたの名前」は、ログイン後に表示される名前です。「ユーザー名」とは異なりますので注意してください。





![](/images/2015/09/150906-55ebebb6a0493.png)






Ubuntuのインストールが始まります。しばらく時間がかかります。





![](/images/2015/09/150906-55ebebbd9ddd6.png)






「今すぐ再起動する」をクリックします。





![](/images/2015/09/150906-55ebebc98638b.png)






デフォルトでは解像度が低すぎるので拡張パックをインストールします。Ubuntuを起動した状態で、メニューの「Devices」→「Insert Guest Additions CD Image」をクリックします。





![](/images/2015/09/150906-55ebebd5c1d41.png)






「実行する」ボタンをクリックします。この状態では解像度が低く、「実行する」が隠れてしまっていることに気が付くと思います。





![](/images/2015/09/150906-55ebebd7efbc2.png)






最後に作成したアカウントのパスワードを入力して、「認証する」をクリックします。





![](/images/2015/09/150906-55ebebdb4bed6.png)






再起動してUbuntuのインストールは完了です。





![](/images/2015/09/150906-55ec44443d063.png)






## まとめ





VirtualBoxを使用すれば簡単にUbuntuの環境を構築できます。手軽なLinuxの検証環境が欲しい場合は、ぜひお試しください。
