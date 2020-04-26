---
author: ottan
date: 2014-11-13 06:44:37+00:00
draft: false
title: macOS YosemiteでHandoffが使用できない場合に見直したい項目
type: post
slug: yosemite-handoff-trouble-697
categories:
- iPhone
- Mac
tags:
- Tips
---

![](/uploads/2014/11/141113-546452cc0cbb5.jpg)






macOS Yosemite、iOS8から実装されたHandoff機能を使用すれば、iPhoneで書きかけていたメールを、そのままMacに引き継ぐなど。iOS、macOS間がよりシームレスに結合されます。Handoffの対応アプリ、Handoff機能の詳細については、公式サイトをご覧ください。





![](/uploads/2014/11/141113-546452b41d991.png)






一見、便利そうで使い所があまりなさそうな機能に見えますが、慣れると意外と便利です。私がよく利用しているのはメール機能。iPhoneで返信の内容を書いていた時に、予想以上に長くなりそうな時はMacに切り替えて使用します。このように、使い所がわかれば非常に便利な機能になりそうです。





で、便利に使用していたのですが、ある日突然Handoff機能が使用できなくなってしまいました。今回はこのHandoffが使用できなくなってしまった場合に見直したい項目について、私の体験も踏まえてご紹介したいと思います。





## Handoffが使用できない場合に見直したい項目





何はともあれ[iOS 8 および macOS Yosemite での連係機能の使い方に関するサポート情報 - Apple サポート](http://support.apple.com/ja-jp/TS5458)の公式サイトに記載のシステム要件を確認しましょう。macOS Yosemiteに対応していても、残念ながらすべてのMacに対応しているわけではありません。





### システム要件





#### Mac





Handoffの対応機種は以下の通りです。もちろん、macOS Yosemiteがインストールされている必要があります。






  * MacBook Air (Mid 2012 以降)
  * MacBook Pro (Mid 2012 以降)
  * iMac (Late 2012 以降)
  * Mac mini (Late 2012 以降)
  * Mac Pro (Late 2013)




お使いのMacがHandoffに対応しているかどうかは簡単に確認できます。





![](/uploads/2014/11/141113-546452b6bc8af.png)






システム環境設定の「一般」に「このMacとiCloudデバイス間でのHandoffを許可」という項目があれば、Handoff機能を使用できるモデルです。





#### iPhone、iPad





iPhone、iPadの対応機種は以下の通りです。iOS8がインストールされている必要があります。そのため、iOS8のサポート対象外となったiPhone 4は対象外ということになります。






  * iPhone 5以降
  * iPad (第 4 世代)、iPad Air、iPad Air 2
  * iPad mini、iPad mini Retina ディスプレイモデル、iPad mini 3
  * iPod touch (第 5 世代)




お使いのiPhone、iPad、iPod touchがHandoffに対応しているかどうかは、Mac同様に簡単に確認できます。





![](/uploads/2014/11/141113-546452b981399.png)






「設定」アプリの「一般」→「Handoffと候補のApp」という項目があれば、Handoff機能を使用できるモデルです。





### その他のシステム要件





簡単にまとめると以下の内容になります。






  * MacとiPhoneが同一のWi-Fiネットワークに接続している（SSIDは異なっていても構いませんが、同一ネットワーク上に存在している必要があります）
  * MacとiPhoneでBluetoothがオンになっている（ペアリングされている必要はありません）
  * MacとiPhoneでHandoffがオンになっている（上述の図を参考にしてください）
  * MacとiPhoneで同一のApple IDでiCloudにログインしている




### それでもうまくいかない場合





MacとiPhoneが同一のWi-Fiネットワーク上に存在し、かつBluetoothとHandoffがオンになっている状態にもかかわらず、Handoff機能が有効にならない場合は、Bluetoothのペアリングを試してみてください。Mac、iPhone間で互いにデバイスを再認識させるとうまくいくことがありそうです。（これは私の経験上です）





#### MacとiPhoneをペアリングしよう





Macで「システム環境設定」→「Bluetooth」を開きBluetoothが「入」になっていることを確認します。



![](/uploads/2014/11/141113-546452c0b1d4e.png)






また、同じくiPhoneで「設定」アプリの「Bluetooth」を開きます。





![](/uploads/2014/11/141113-546452be043ca.png)






しばらくすると、Mac側でiPhoneが認識され画面に表示されます。互いにBluetoothがオンになっていることが条件です。iPhoneが表示されたら「ペアリング」ボタンをクリックします。





![](/uploads/2014/11/141113-546452c3ba244.png)






「ペアリング」ボタンをクリックすると、Mac側はペアリングの受け入れ状態になります。その際、コードが表示されるため、そのコードがiPhoneに表示されていることを確認してください。





![](/uploads/2014/11/141113-546452c6944f0.png)






コードが一致していることを確認できたら、「ペアリング」ボタンをクリックします。以上でペアリング完了です。





![](/uploads/2014/11/141113-546452c8a6229.png)






以上の流れで、MacとiPhoneが共にBluetooth経由で認識されました。この状態でHandoff機能が正しく動作するか試してみてください。Handoff機能が正しく動作するようであれば、ペアリングしたデバイスを削除しても問題ありません。あくまで必要要件はBluetoothがオンになっていることだけです。





## まとめ





以上、簡単にではありますが、私が体験したことも踏まえて、Handoff機能を使用するためのトラブルシューティングをご紹介しました。何かのお役に立てれば幸いです。
