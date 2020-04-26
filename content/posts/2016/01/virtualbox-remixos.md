---
author: ottan
date: 2016-01-15 06:48:22+00:00
draft: false
title: VirtualBoxにRemix OS 2.0をインストールする方法
type: post
url: /virtualbox-remixos-6826/
categories:
- Android
- Mac
tags:
- Development
---

![](/uploads/2016/01/160115-56988e3fa8252-1.jpg)






Remix OSは、Android OSをベースとしたデスクトップ向けに最適化されたOSです。[PCで動く「Android互換OS」を試してみた。マルチウィンドウが使えるRemix OS for PC α版が登場 - Engadget Japanese](https://japanese.engadget.com/2016/01/13/pc-android-os-remix-os-for-pc/)などでも、内容が詳しく紹介されていますので、詳細はそちらを参照してください。





## Remix OS 2.0をVirtualBoxにインストールする





Remix OSをインストールするためには、8GB以上のUSBメモリと、起動ディスクの作成が必要ですが、VIrtualBoxを使用することで、簡単に雰囲気のみ味わうことができます。今回は、VirtualBoxにRemix OSをインストールするために、Remix OSのダウンロードから起動までの一連の流れを解説します。





### Remix OS 2.0のダウンロード





![](/uploads/2016/01/160115-56988e4122d94-1.png)






Remix OSは、Jideの公式サイトからISOファイル、またはIMGファイルのダウンロードができます。ダウンロードするためには、以下のリンクにアクセスします。今回は、VirtualBoxにインストールことが目的であるため、ISOファイルをダウンロードします。



http://www.jide.com/en/remixos-for-pc#downloadNow



「I am a developer and have read the above message.」をチェックし、「Remix OS for PC Package (Legacy)」の「Download」をクリックします。ZIPファイルがダウンロードされるため、解凍しておきます。





### VirtualBoxにRemix OSをインストールする





![](/uploads/2016/01/160115-56988e5045133-1.png)






VirtualBoxを開き、「新規」をクリックします。





![](/uploads/2016/01/160115-56988e5828c77-1.png)






「名前」は任意で構いません。今回は、「Remix OS 2.0」としました。「タイプ」は「Linux」、「バージョン」は「Other Linux (64-bit)」を選択してください。「続ける」をクリックします。





![](/uploads/2016/01/160115-56988e6105a69-1.png)






メモリサイズは、Remix OSの動作環境の最小要件である「2048MB」とします。「続ける」をクリックします。





![](/uploads/2016/01/160115-56988e6a52574-1.png)






デフォルトのまま「作成」をクリックします。





![](/uploads/2016/01/160115-56988e73427f7-1.png)






デフォルトのまま「続ける」をクリックします。





![](/uploads/2016/01/160115-56988e7c593b4-1.png)






デフォルトのまま「続ける」をクリックします。





![](/uploads/2016/01/160115-56988e859a72a-1.png)






デフォルトのまま「作成」をクリックします。





![](/uploads/2016/01/160115-56988e8edf523-1.png)






続いて、作成した仮想マシンを選択した状態で「起動」をクリックします。





![](/uploads/2016/01/160115-56988e969232b-1.png)






ダウンロードしたISOファイルを選択し、「Start」をクリックします。





![](/uploads/2016/01/160115-56988e98c3084-1.png)






Remix OSでは、「Guest Mode」または「Resident Mode」を選択できます。「Guest Mode」ではRemix OSに対して行った変更は一切保存されません（LinuxのLive CDと同様）。「Resident Mode」ではRemix OSに対して行った変更を保存できます。「Resident Mode」では正常に起動できなかったため、今回は「Guest Mode」を選択します。





追記：後日、「Resident Mode」でインストールする方法を書きました。



https://ottan.xyz/remix-os-resident-mode-install-vmware-fusion-4492/



![](/uploads/2016/01/160115-56988e9c4aae5-1.png)






Remix OSが起動したら、「Language」を選択します。Macのマウスカーソルの動きと、Remix OSのポインタの動きの同期が取れないため、ポインタの動作がわかりづらいですが、「English」を選択した状態で「Next」をクリックします。





![](/uploads/2016/01/160115-56988eae138f6-1.png)






「Next」をクリックします。





![](/uploads/2016/01/160115-56988ebebf000-1.png)






「Start」をクリックします。





### 言語を英語から日本語に変更する





![](/uploads/2016/01/160115-56988ed1d2d5b-1.png)






デスクトップ上の「Settings」をクリックします。





![](/uploads/2016/01/160115-56988ee6ef76a-1.png)






「Language & Input」をクリックします。





![](/uploads/2016/01/160115-56988ef66b6e8-1.png)






「Language」をクリックします。





![](/uploads/2016/01/160115-56988f06538e9.png)






「言語」から「日本語」を選択して「OK」をクリックします。日本語を選択した状態においても、完全に日本語化されるわけではありませんが、雰囲気を味わうことはできると思います。





## まとめ





Google Playや、各種Googleアカウントを必要とするサービスが使用できないなど、まだまだ完全とは言えないRemix OSですが、Remix OSがどのようなOSであるか、雰囲気のみ味わいたい場合は、VirtualBoxにインストールすることをオススメします。また、MacのマウスカーソルとRemix OSのポインタの動作が同期できないため、VirtualBox上ではやや扱いづらいかもしれません。以上の注意事項を念頭に入れて、新進気鋭のOSを体験してみてください。
