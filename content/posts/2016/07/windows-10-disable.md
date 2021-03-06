---
author: ["@ottanxyz"]
date: 2016-07-03T00:00:00+00:00
draft: false
title: Windows 10にアップグレードしたら無効化しておきたい7つの設定
type: post
slug: windows-10-disable-4559
categories:
- Windows
tags:
- Security
---

![](/uploads/2016/07/160703-5778720e9b83d.jpg)






Windows 10への無償アップグレード期間が迫ってきました。Microsoftの半ば強引なそのやり口により、Windows 10に対する批判が高まってきていますが、その無償アップグレード期間も1か月を切りました。これを機に、真剣にWindows 10へのアップグレードを検討してみてはいかがでしょうか。





さて、Windows 10には最新機能が多数搭載されていますが、その中にはあなたのプライバシーを脅かすもの、また残念ながら利便性が損なわれてしまいそうな機能もあります。そこで、今回は、このように無効化しても問題ない機能についていくつかご紹介します。これらを無効化して安全にWindows 10を使用しましょう。





## Windows 10にアップグレードしたら無効化しておきたい7つの設定





個々人のプライバシーを守るために、またWindows 10の利便性を最大限有効活用するために、無効化しておきたい7つの設定をご紹介します。なお、今回は、「build 14366」で確認しています。





### 新しい更新プログラムの提供方法を無効化する





Windows 10では、更新プログラムの提供方法として、MicrosoftのWindows Updateサーバのみならず、ローカルネットワーク上、もしくはインターネット上の他のPCから、P2Pで更新プログラムの提供を受けることができるようになりました。この新しい「最適化された配信方法」により、MicrosoftのWindows Updateサーバが利用できない環境においても、他のPCから更新プログラムの提供を受けることができるようになりました。





この方法の安全面については、既存のWindows Update、およびWindows Storeと同等のセキュリティ対策が施されている（更新プログラムの配信を行う側、行われる側のプライバシーが侵害されることはない）とのことですが、たとえば、更新プログラムの配信のために使用している帯域を占有されてしまったりということも十分に考えられます。とりあえず、よくわからない機能は無効化しておきましょう。





![](/uploads/2016/07/160703-57787215c875c.png)






「設定」→「更新とセキュリティ」を選択します。





![](/uploads/2016/07/160703-57787227e7856.png)






「更新プログラムの設定」→「詳細オプション」を選択します。





![](/uploads/2016/07/160703-5778723919468.png)






「更新プログラムの提供方法を選ぶ」を選択します。





![](/uploads/2016/07/160703-5778724d100f5.png)






「複数の場所から更新する」をオフにします。





### 不必要な通知を停止する





Windows 10には、アクションセンターと呼ばれる（Macの通知センター）、通知を管理する機能が追加されています。しかし、デフォルトの状態では、何でもかんでも通知される状態になっており、アクションセンターが受け取りたくもない通知で埋まってしまう可能性も考えられます。そこで、不要な通知はすべて無効化してしまいましょう。





![](/uploads/2016/07/160703-5778725ddf24e.png)






「設定」→「システム」を選択します。





![](/uploads/2016/07/160703-5778727282ad7.png)






「通知とアクション」を選択します。





![](/uploads/2016/07/160703-57787284a4ab5.png)






「通知」から「Windowsを使用しているためのヒントやオススメの方法を取得」をオフにします。





![](/uploads/2016/07/160703-577872956f030.png)






また、アプリごとの通知をオフにできます。「フィードバック Hub」は、Microsoftにフィードバックを送信するためのアシスタントで、必要ない場合は、オフにしておきましょう。





### スタートメニューから広告を削除する





Windows 10のスタートメニューは「タイル」と呼ばれる形式を採用しています。デフォルトでは、この「タイル」に、Microsoftがオススメする広告が表示されることがあります。これは鬱陶しいので無効化しておきましょう。





![](/uploads/2016/07/160703-577872a895284.png)






「設定」→「個人用設定」を選択します。





![](/uploads/2016/07/160703-577872bd4b3f0.png)






「スタート」を選択します。





![](/uploads/2016/07/160703-577872d044edb.png)






「ときどきスタート画面にオススメを表示する」をオフにします。





### 広告識別子をオフにする





最適な広告を配信するために、Windows 10で動作するアプリケーションには各デバイスに固有な広告識別子を提供することがデフォルトでオフになっています。このような追跡型広告のために、これらの情報を提供したくない場合は、オフにしておきましょう。





![](/uploads/2016/07/160703-577872e4428c2.png)






「設定」→「プライバシー」を選択します。





![](/uploads/2016/07/160703-577872f6b1540.png)






「全般」の「アプリ間のエクスペリエンスのために、アプリで自分の広告識別子を使うことを許可する」をオフにします。





### コルタナによるプライバシー情報の収集を停止する





コルタナは、Microsoftが開発したパーソナルアシスタントです（macOSやiOSのSiri）。コルタナは、あなたのことをよく知るためにあなたの音声入力情報や、手書き入力情報を収集しています。コルタナにこれらの事を知られたくない場合は、設定でオフにできます。





![](/uploads/2016/07/160703-577873087235a.png)






「設定」→「プライバシー」を選択します。





![](/uploads/2016/07/160703-5778731fda05f.png)






「音声認識、手描き入力、入力の設定」を選択します。





![](/uploads/2016/07/160703-57787332ee19f.png)






「あなたに合ったWindowsにするために」の「自分の情報を知らせない」をチェックします。





### アプリのバックグラウンドの動作を制御する





Windows 10のほとんどのアプリはバックグラウンドで動作します。つまり、アプリを使用しなくても、自動的に情報を収集し通知したり、更新プログラムをインストールしたりします。バックグラウンドで動作することにより、ラップトップを使用している場合は、バッテリーに影響が、また勝手にネットワークの帯域を占有してしまうかもしれません。このような場合には、バックグラウンドでの動作を制限してしまいましょう。





![](/uploads/2016/07/160703-577873457f51f.png)






「設定」→「プライバシー」を選択します（なんで「プライバシー」？）





![](/uploads/2016/07/160703-57787361118b1.png)






「バックグラウンドアプリ」を選択します。





![](/uploads/2016/07/160703-5778737277676.png)






任意のアプリのバックグラウンドによる動作をオフにできます。





### 設定の同期を無効化する





Microsoftアカウントを使用している場合、Windows 10では自動的にテーマ、Windowsの設定、パスワードを、同じMicrosoftアカウントを使用しているデバイス間で同期するようになっています。デバイス間でパスワードなんて同期する必要はありますか。ない場合は、設定の同期を無効化してしまいましょう。





![](/uploads/2016/07/160703-577873851ddc4.png)






「設定」→「アカウント」を選択します。





![](/uploads/2016/07/160703-57787397b6047.png)






「設定の同期」を選択します。





![](/uploads/2016/07/160703-577873a88731c.png)






「同期の設定」をオフにします（サインインにMicrosoftアカウントを使用していない場合は、このようにデフォルトでオフになっています）。





### コルタナによる検索履歴の収集をオフにする





コルタナは、Windows 10のパーソナルアシスタントですが、コルタナもあなたの検索履歴やアプリの使用履歴などを収集しています。これらの収集をストップできます。





![](/uploads/2016/07/160703-577873bbd4672.png)






コルタナを起動したら、「設定」（歯車のアイコン）をクリックします。





![](/uploads/2016/07/160703-577873c6af156.png)






「履歴表示」、「デバイスの履歴」をオフにします。





## まとめ





Windows 10は、Windows 8の無意味なタッチデバイスに最適されたOSよりも、格段に使い勝手が向上しています。Windows 7の方が個人的には好みですが、それは時間が解決してくれることでしょう。Microsoftのサポート期間も考慮すると、無償アップグレード期間中にWindows 10にアップデートしてみてはいかがでしょうか。
