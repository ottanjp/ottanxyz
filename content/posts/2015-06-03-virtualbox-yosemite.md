---
author: ottan
date: 2015-06-03 12:32:28+00:00
draft: false
title: VirtualBoxにmacOS Yosemiteをインストールする
type: post
url: /virtualbox-yosemite-1605/
categories:
- Mac
tags:
- Development
---

![](/images/2015/06/150603-556ed93007238.jpg)






[@おったん](https://twitter.com/ottanxyz)です。動作検証用のMacの環境が欲しかったため、VirtualBoxに仮想マシンを立てて検証環境を構築することとしました。何点かつまずくところもあったため、後学のためにメモしておきたいと思います。また、[MacのVirtualBoxでmacOS Mavericksを動かす](/mavericks-on-mavericks-27/)の記事も参考にしてください。





## macOS Yosemiteのインストーラーをダウンロードする





起動ディスクの作成には、macOS Yosemiteのインストーラーが必要です。ダウンロードには時間がかかりますので、以下の手順を始める前にApp Storeからインストーラーをダウンロードしはじめておいてください。



{{< itunes 915041082 >}}



## VirtualBoxのインストール





仮想マシン（macOS）を動作させるためのエミュレーターが必要です。今回は無償版のOracle VM VirtualBoxを使用します。以下のリンクからmacOS用のインストーラーをダウンロードして、インストールウィザードの内容にしたがって進めてください。



https://www.virtualbox.org/wiki/Downloads



## macOS Yosemite用の仮想マシンを作成する





VirtualBoxを起動したら「新規」ボタンをクリックします。





![](/images/2015/06/150603-556ed931caf19.png)






名前は任意で構いませんが、ここではわかりやすく「macOS Mavericks」としました。タイプは「Mac macOS」バージョンは「Mac macOS (64bit)」を選択してください。





![](/images/2015/06/150603-556ed935014bb.png)






デフォルト値のまま「続ける」ボタンをクリックします。





![](/images/2015/06/150603-556ed9389a22f.png)






デフォルト値のまま「作成」ボタンをクリックします。





![](/images/2015/06/150603-556ed93d141e6.png)






デフォルト値のまま「続ける」ボタンをクリックします。





![](/images/2015/06/150603-556ed940c2b0b.png)






デフォルト値のまま「続ける」ボタンをクリックします。





![](/images/2015/06/150603-556ed944c812f.png)






デフォルト値のまま「作成」ボタンをクリックします。ここまででmacOS Yosemite用の仮想マシンの作成は完了です。





![](/images/2015/06/150603-556ed94927ee3.png)






## VirtualBox用の起動ディスクを作成する





macOS Yosemiteの起動ディスクを作成します。仮想マシン用の起動ディスクの作成方法は、通常とは異なりますので、以下の手順にしたがって作成してください。





まずは、任意のディレクトリ上で以下のコマンドを実行します。ここで出力される**Output.dmg**を後ほど使用しますので、出力した場所を覚えておいてください。「**-o**」で出力先を変更することもできます。




    
    $ git clone https://github.com/ntkme/InstallESD.dmg.tool
    $ cd InstallESD.dmg.tool
    $ bin/iesd -t BaseSystem -i /Applications/Install\ OS\ X\ Yosemite.app/Contents/SharedSupport/InstallESD.dmg -o Output.dmg





### 2013年以降に発売されたMacの場合





CPUが**Haswell**世代以降を搭載したMacの場合、仮想マシンのCPUの設定を変更しないと正しく動作しないようです。まずは、`VBoxManage`コマンドで、VirtualBoxで作成したすべての仮想マシンを列挙します。仮想マシン名の後ろに出力されるID（UUIDと言います）を次のコマンドで使用します。




    
    $ VBoxManage list vms
    "macOS Yosemite" {0f86aef6-e197-4cb4-aeb5-0677edd6eb1f}





macOS Yosemiteをインストールする仮想マシンのUUIDを指定して、VirtualBox上でmacOS Yosemiteが正しく動作するようにCPUの設定を変更します。UUIDは{ }も含めて指定してください





以上の手順は下記のリンクが参考になります。



https://github.com/ntkme/iesd

http://qiita.com/hnakamur/items/fca6379213a3033cb29d



## 仮想マシンにmacOS Yosemiteをインストールする





それではいよいよ仮想マシンにmacOS Yosemiteをインストールします。作成した仮想マシンを選択して「起動」ボタンをクリックしてください。





![](/images/2015/06/150603-556ee0eebd10d.png)






起動してしばらくすると、以下のような画面が表示されます。赤い枠のアイコンをクリックして、作成した起動ディスク（Output.dmg）を選択して、「Start」ボタンをクリックしてください。





![](/images/2015/06/150603-556ee0f1bc19c.png)






「主に日本語を使用する」を選択して次へいきます。





![](/images/2015/06/150603-556ee0f567269.png)






「続ける」ボタンをクリックします。





![](/images/2015/06/150603-556ee0f97d618.png)






「続ける」ボタンをクリックします。





![](/images/2015/06/150603-556ee0fea957a.png)






「同意する」ボタンをクリックします。





![](/images/2015/06/150603-556ee103bce39.png)






デフォルトのままではインストール先ディスクが表示されません。macOS Yosemiteの動作に必要なファイルシステムでフォーマットされた領域が存在しないためです。ユーティリティから「ディスクユーティリティ」を選択します。





![](/images/2015/06/150603-556ee1081ef19.png)






デフォルトのまま進めていれば1つの仮想ディスクがディスクユーティリティから見えるはずです。ただし、ディスクは認識していますが、まだボリュームが存在しません（macOSの動作に必要なファイルシステムでフォーマットされたディスク）





そこで、「消去」タブを選択します。「フォーマット」から「Mac OS 拡張（ジャーナリング）」、名前を「Macintosh HD」（好み）に変更して、「消去」ボタンをクリックします。これで、macOS Mavericksをインストールする器の準備が整いました





![](/images/2015/06/150603-556ee10ca868b.png)






「消去」ボタンをクリックします。





![](/images/2015/06/150603-556ee1118c590.png)






フォーマットしたボリュームを選択して、「続ける」ボタンをクリックします。





![](/images/2015/06/150603-556ee11602aa9.png)






後は、通常のmacOS Yosemiteのインストール手順と同様です。





![](/images/2015/06/150603-556ee11ad2eeb.png)






## まとめ





それでは、良き仮想ライフを。
