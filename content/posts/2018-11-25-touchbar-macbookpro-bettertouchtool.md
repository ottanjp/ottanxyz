---
author: ottan
date: 2018-11-25 13:50:27+00:00
draft: false
title: MacBook ProのTouch BarにCPU、メモリ使用率、バッテリー残り時間、日時、ESCキーを表示して、メニューバーをスッキリさせる
type: post
url: /touchbar-macbookpro-bettertouchtool-7084/
categories:
- Mac
tags:
- BetterTouchTool
- macOS
- Touch Bar
---

![office-925806_640](/images/2018/11/181125-5bfaa8c533d94.jpg)
￼





MacBook ProのTouch Bar使用してますか？先日のAppleのスペシャルイベントで、Touch Bar無し、Touch ID有りのMacBook Airが発表されて、手持ちのMacBook ProのTouch Barの行方が気になりそわそわしている皆様こんばんは。





![Touch Barショット 2018-11-25 16.56.40](/images/2018/11/181125-5bfaa8c533e35.png)
￼





せっかくのTouch Barですから使わないと損じゃないですか。⇧+⌘+6でTouch Bar単独のスクリーンショットを撮影することもできます。今回は、上記のスクリーンショットのように、Touch Barに常時ESCキーや日時、バッテリー残表示させてみます。通常であれば、日時やバッテリーについては、メニューバーに表示されているものですが、Touch Barを使用させることで、メニューバーの見た目もスッキリです！





## BetterTouchToolを使用してTouch Barをカスタマイズする





恐らくBetterTouchToolが無かったら、Touch Barはまさに「宝の持ち腐れ」状態だったかもわかりません。でも、もう大丈夫です。BetterTouchToolさえあれば、もう貴方のTouch Barは思うがままです。





[folivora.ai - Great Tools for your Mac!](https://folivora.ai/)





BetterTouchToolは有償ソフトウェアですが、同社の提供するBetterSnapToolのライセンスがあれば、そのライセンスと併用することも可能です。とはいえ、日々のコーヒーを我慢すれば買えなくはない、むしろ買わなきゃ損なツールですので、Touch Bar目的でなくてもMacBook使用者の方々は導入して損はないはずです。





### BetterTouchToolを使用して、Touch Barにバッテリー残量を表示してみよう





早速、BetterTouchToolでTouch Barを編集してみます。BetterTouchToolの環境設定はメニューバーから開きます。メニューバーの同ソフトウェアのアイコンをクリックして「Preferences」を選択してください。





![スクリーンショット 2018-11-25 17.06.36](/images/2018/11/181125-5bfaa8c692930.png)
￼





さまざまな項目が並んでいますが、メニューの中から「TouchBar」を選択してください。





![スクリーンショット 2018-11-25 17.16.09](/images/2018/11/181125-5bfaa8c53f6d6.png)
￼





続いて、「+ Widget/Gesture」ボタンをクリックして、ウィジェット追加します。





![スクリーンショット 2018-11-25 17.17.54](/images/2018/11/181125-5bfaa8c620e20.png)
￼





続いて、画面下部の「Select Touch Bar Widget/Gesture」のメニューから「Remaining Battery Time」をクリックします。





![スクリーンショット 2018-11-25 17.18.09](/images/2018/11/181125-5bfaa8c68bbd4.png)
￼





ウィジェットの詳細が表示されますが、そのままで十分に実用的です。そのまま、「Save」ボタンをクリックします。





![Touch Barショット 2018-11-25 16.56.40](/images/2018/11/181125-5bfaa8c533e35.png)
￼





これでバッテリー表示は完成です。このようにBetterTouchToolを使用すれば、ファンクションキーが使えなくなったムダな領域が、意味のある領域として蘇ります。バッテリーをTouch Barに任せることで、メニューバーの項目をまた1つ減らすことができました。





### JSON形式の情報をコピーしてBetterTouchToolに貼り付ける





ここまでで感じたことは「やっぱり面倒臭い」、そんなことを感じた貴方には朗報があります。諦めるのはまだ早いです。BetterTouchToolには、設定のエクスポート、インポート機能があります。しかも、エクスポートされたファイルはJSON形式ですから、そのコードさえ公開されていれば、誰でも共有できます。





![スクリーンショット 2018-11-25 17.22.40](/images/2018/11/181125-5bfaa8ca05aac.png)
￼





BetterTouchToolの環境設定を開いたら、何もないところで右クリックしてみてください。「Paste from JSON in clipboard」という項目が表示されるはずです。あらかじめJSONコードをクリップボードにコピーしておき、これで貼り付けて新しいウィジェットを手軽に作成できます。





というわけで、ここからは筆者が使用しているウィジェットの内容を貼り付けておきますので、ぜひ使ってみてください。





#### バッテリー残量表示



https://gist.github.com/ottanxyz/94fb2441ee57667473c21836dda604ff



#### CPU使用率



https://gist.github.com/ottanxyz/89b8d45f164d32ccad32812ce68e3385



#### メモリ使用率



https://gist.github.com/ottanxyz/b940022d3b0482df9e1733e8473d9113



CPU、メモリ使用率について補足します。CPU、メモリ使用率はmacOS標準の下記コマンドを使用して取得したものを表示しています。つまり、`ps`コマンドで取得可能な、プロセス毎のCPU、メモリ使用率の累計です。




    
    ps -A -o %mem | awk '{s+=$1} END {print s "%"}'
    





[TOPとPSのCPU使用率の違いについて | ハックノート](https://hacknote.jp/archives/10596/)の記載にもありますが、`ps`コマンドによる取得できるCPU、メモリ使用率は、「プロセスの生存期間中に実行に利用した時間のパーセンテージで表される」です。よって、`ps`コマンドで取得した使用率は、その瞬間のものではなく、あくまでプロセスが生存中に使用したリソースの時間です。そのため、すべてのプロセスの合計を計算すると100を超えてしまうことがあります。あくまで目安的にお使いください。CPU使用率の場合は、厳密には`top`コマンドを使用する方が良いでしょう。





#### 日時



https://gist.github.com/ottanxyz/4a16a9ac2e283115552ccb8c75f8f70e



日時のウィジェットは、Touch Barの右寄せにしています。ウィジェットの詳細設定で、「Item Placemment: Stick to the right side of the Touch Bar」を選択することで、ウィジェットを右寄せ固定にできます。





![スクリーンショット 2018-11-25 22.39.19](/images/2018/11/181125-5bfaa8cb4d3e4.png)
￼





#### Escキー



https://gist.github.com/ottanxyz/806c17f25cabfde9d8018ad89bb4054a



ESCキーについては、左上に表示されていた方が、従来のキーボード同様の使い勝手になると思われるため、左寄せ固定にしています。ウィジェットの詳細設定で、「Item Placemment: Stick to the left side of the Touch Bar」を選択することで、ウィジェットを右寄せ固定にできます。





![スクリーンショット 2018-11-25 22.41.06](/images/2018/11/181125-5bfaa8cd00420.png)
￼





## まとめ





今回はTouch Barの空きスペースを有効活用して、普段何気なくメニューバーに表示させているものを移動させてみたり、Touch Barによって消えてしまった物理ESCキーを復活させてみたりしてみました。BetterTouchToolを使用することで、Touch Barはさまざまにカスタマイズすることが可能ですので、ぜひお試しください。
