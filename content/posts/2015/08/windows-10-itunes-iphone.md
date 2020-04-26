---
author: ottan
date: 2015-08-14 12:29:30+00:00
draft: false
title: Windows 10でiTunesにiPhoneが認識されない問題の対処法
type: post
url: /windows-10-itunes-iphone-2042/
categories:
- iPhone
- Windows
tags:
- Tips
---

![](/uploads/2015/08/150813-55cca0dada559.png)






[@おったん](https://twitter.com/ottanxyz)です。Windows 10で、USBケーブルでiPhoneを接続してもiTunesに認識されない場合の対処法をご紹介します。





## iTunesにiPhoneが認識されない問題





iTunesにiPhoneが認識されない問題の原因はいくつか考えられますが、ここではその中からもっとも可能性の高い原因について詳しくご紹介します。





### WindowsとiPhoneを再起動する





困った時は、まずWindowsとiPhoneを再起動してみましょう。





### 異なるUSBポートにケーブルを接続する





ポートによって、iPhoneが認識される場合、認識されない場合があります。異なるポートにUSBケーブルを差し込んで、iPhoneが認識されるかどうか試してみてください。





### iTunesを再インストール





コントロールパネルから「プログラムと機能」を開き、iTunesをいったん削除した後、最新版を再インストールします。





![](/uploads/2015/08/150813-55cca0de49924.png)






iTunesは以下のリンクからダウンロードできます。



http://www.apple.com/jp/itunes/download/



### Windows Updateで最新の状態にする





Windows Updateを行い、Windowsを最新の状態にしましょう。





![](/uploads/2015/08/150813-55cca0dc7e4d2.png)






### コンピューターを信頼する





はじめてiPhoneをPCに接続した場合、iPhone側で以下のようなダイアログが表示されます。忘れずに「信頼」をタップしておきましょう。





![](/uploads/2015/08/150813-55cca3b22b96c.png)






### Apple Mobile Device Supportを再インストールする





コントロールパネルから、「プログラムと機能」を開き、「Apple Mobile Device Support」をアンインストールし、iTunesを再インストールします。





![](/uploads/2015/08/150813-55cca0dfcb36e.png)






### Apple Mobile Device Serviceを再起動する





コントロールパネル、または「Windows」キー＋「R」キーを押して、「services.msc」と入力し、サービスを開きます。





![](/uploads/2015/08/150813-55cca0e1b9a42.png)






右クリックでプロパティを開き、サービスを「停止」した後、「開始」します。そして、PCを再起動しましょう。





![](/uploads/2015/08/150813-55cca0e391daa.png)






### Apple Mobile Device USB Driverを再スキャンする





iPhoneを接続した状態で以下の作業を実施します。コントロールパネル、または「Windows」キー＋「R」キーを押して、「devmgmt.msc」と入力し、デバイスマネージャーを開きます。「ユニバーサルシリアルバスコントローラー」にある「Apple Mobile Device USB Driver」を選択し、右クリックして「削除」を選択します。





![](/uploads/2015/08/150813-55cca0e53265e.png)






**「このデバイスのドライバーソフトウェアを削除する」のチェックを外し**、「OK」ボタンをクリックします。 





![](/uploads/2015/08/150813-55cca0e94b8f0.png)






「ユニバーサルシリアルバスコントローラー」を右クリックして、「ハードウェア変更のスキャン」をクリックします。再度、「Apple Device USB Driver」が表示されることを確認します。





![](/uploads/2015/08/150813-55cca0e7539c1.png)






#### 誤って「Apple Mobile Device USB Driver」のドライバーソフトウェアを削除してしまった場合





iPhoneを接続した状態で、「Apple iPhone」というデバイスを探します。「Apple iPhone」を右クリックして「ドライバーソフトウェアの更新」をクリックします。





![](/uploads/2015/08/150814-55cdc381dd4e4.png)






「コンピューターを参照してドライバーソフトウェアを検索します」をクリックします。





![](/uploads/2015/08/150814-55cdc384341f3.png)






「次の場所でドライバーソフトウェアを検索します」に、以下のパスを入力します。




    
    C:\Program Files\Common Files\Apple\Mobile Device Support\Drivers





入力したら「次へ」をクリックします。





![](/uploads/2015/08/150814-55cdc385a911c.png)






「ドライバーソフトウェアが正常に更新されました」と表示された場合は、正常にドライバーがインストールされています。





![](/uploads/2015/08/150814-55cdc387472e0.png)






## まとめ





iTunesに関するトラブルは、公式サイトのフォーラムでもよく議論になっています。今回ご紹介した解決策は一例ですが、ぜひ試してみてくださいね。
