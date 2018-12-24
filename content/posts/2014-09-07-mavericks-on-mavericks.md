---
author: ottan
date: 2014-09-07 02:36:35+00:00
draft: false
title: MacのVirtualBoxでmacOS Mavericksを動かす
type: post
url: /mavericks-on-mavericks-27/
categories:
- Mac
tags:
- Development
---

![](/images/2014/09/140906-540b27f189360.jpg)






[@おったん](https://twitter.com/ottanxyz)です。動作検証用のMacの環境が欲しかったため、VirtualBoxに仮想マシンを立てて検証環境を構築することとしました。何点かつまずくところもあったため、後学のためにメモしておきたいと思います。





## macOS Mavericksのインストーラーをダウンロードする





起動ディスクの作成には、macOS Mavericksのインストーラーが必要です。ダウンロードには時間がかかりますので、以下の手順を始める前にApp Storeからインストーラーをダウンロードしはじめておいてください。



{{< itunes 675248567 >}}



## VirtualBoxのインストール





仮想マシン（macOS）を動作させるためのエミュレーターが必要です。エミュレーターとしては、有償版の[VMware Fusion](http://www.vmware.com/jp/products/fusion)、[Parallels Desktop](http://www.parallels.com/products/desktop/)が有名ですが、今回は無償版の[Oracle VM VirtualBox](https://www.virtualbox.org/)を使用します。以下のリンクからmacOS用のインストーラーをダウンロードして、インストールウィザードの内容にしたがって進めてください。



https://www.virtualbox.org/wiki/Downloads



## macOS Mavericks用の仮想マシンを作成する





VirtualBoxを起動したら「新規」ボタンをクリックします。





![](/images/2014/09/140906-540b259c4820c.png)






名前は任意で構いませんが、ここではわかりやすく「macOS Mavericks」としました。タイプは「Mac macOS」バージョンは「Mac macOS 10.9 Mavericks (64bit）」を選択してください。





![](/images/2014/09/140906-540b259d8cfaf.png)






デフォルト値のまま「続ける」ボタンをクリックします。





![](/images/2014/09/140906-540b259e26af5.png)






デフォルト値のまま「続ける」ボタンをクリックします。





![](/images/2014/09/140906-540b259f174f3.png)






デフォルト値のまま「続ける」ボタンをクリックします。





![](/images/2014/09/140906-540b25a0adb44.png)






デフォルト値のまま「続ける」ボタンをクリックします。





![](/images/2014/09/140906-540b25a15554f.png)






デフォルト値のまま「作成」ボタンをクリックします。ここまででmacOS Mavericks用の仮想マシンの作成は完了です。





![](/images/2014/09/140907-540bbb3f1314a.png)






## VirtualBox用の起動ディスクを作成する





macOS Mavericksの起動ディスクを作成します。仮想マシン用の起動ディスクの作成方法は、通常とは異なりますので、以下の手順にしたがって作成してください。





まずは、任意のディレクトリ上で以下のコマンドを実行します。ここで出力される**Output.dmg**を後ほど使用しますので、出力した場所を覚えておいてください。「**-o**」で出力先を変更することもできます。





    git clone https://github.com/ntkme/InstallESD.dmg.tool
    cd InstallESD.dmg.tool
    bin/iesd -t BaseSystem -i /Applications/Install\ OS\ X\ Mavericks.app/Contents/SharedSupport/InstallESD.dmg -o Output.dmg





### 2013年以降に発売されたMacの場合





CPUが**Haswell**世代以降を搭載したMacの場合、仮想マシンのCPUの設定を変更しないと正しく動作しないようです。（MacBook Pro Late 2013で試したところ、この手順を実施しないと正しく動作しませんでした）





まずは、**VBoxManage**コマンドで、VirtualBoxで作成したすべての仮想マシンを列挙します。仮想マシン名の後ろに出力されるID（**UUID**と言います）を次のコマンドで使用します。





    $ VBoxManage list vms
    "macOS Mavericks" <uuid>





macOS Mavericksをインストールする仮想マシンの**UUID**を指定して、VirtualBox上でmacOS Mavericksが正しく動作するようにCPUの設定を変更します。**UUID**は**{ }**も含めて指定してください





    $ VBoxManage modifyvm <uuid> --cpuidset 00000001 000306a9 00020800 80000201 178bfbff





以上の手順は下記のリンクが参考になります。



https://github.com/ntkme/iesd

http://qiita.com/hnakamur/items/fca6379213a3033cb29d



## 仮想マシンにmacOS Mavericksをインストールする





それではいよいよ仮想マシンにmacOS Mavericksをインストールします。作成した仮想マシンを選択して「起動」ボタンをクリックしてください。





![](/images/2014/09/140907-540bbb3feb648.png)






起動してしばらくすると、以下のような画面が表示されます。赤い枠のアイコンをクリックして、作成した起動ディスク（**Output.dmg**）を選択して、「Start」ボタンをクリックしてください。





![](/images/2014/09/140907-540bbb42b0cf4.png)






「主に日本語を使用する」を選択して次へいきます。





![](/images/2014/09/140906-540b25a240551.png)






デフォルトのままではインストール先ディスクが表示されません。macOS Mavericksの動作に必要なファイルシステムでフォーマットされた領域が存在しないためです。





![](/images/2014/09/140906-540b25a30dccd.png)






ユーティリティから「ディスクユーティリティ」を選択します。





![](/images/2014/09/140906-540b25a3a624d.png)






デフォルトのまま進めていれば1つの仮想ディスクがディスクユーティリティから見えるはずです。ただし、ディスクは認識していますが、まだボリュームが存在しません（macOSの動作に必要なファイルシステムでフォーマットされたディスク）





そこで、「消去」多分を選択します。「フォーマット」から「Mac OS 拡張（ジャーナリング）」、名前を「Macintosh HD」（好み）に変更して、「消去」ボタンをクリックします。これで、macOS Mavericksをインストールする器の準備が整いました。





![](/images/2014/09/140906-540b25a448274.png)






無事、インストール先として仮想ディスクを選択することができるようになりました。そのまま「インストール」ボタンをクリックします。なお、インストールにはマシンのスペックにもよるところはあると思いますが、20〜30分は要しますので注意してください。





![](/images/2014/09/140906-540b25a4dfc43.png)






以降の工程はmacOS Mavericksのインストールとまったく同様です。それでは、素敵な仮想ライフを。
