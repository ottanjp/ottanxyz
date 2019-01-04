---
author: ottan
date: 2018-04-28 02:18:47+00:00
draft: false
title: Google Chromeで使用しているプライバシーを保護するための拡張機能4選
type: post
url: /google-chrome-extension-privacy-guard-6715/
categories:
- Mac
tags:
- Google Chrome
---

![](/images/2018/04/180427-5ae32484a9c45.jpg)






[米フェイスブック、情報流出は最大8700万人分の可能性 | ロイター](https://jp.reuters.com/article/facebook-privacy-idJPKCN1HB36Y)、[国内でマイニングマルウェアが爆発的流行、1月は「CoinMiner」の検出数がトップ - INTERNET Watch](https://internet.watch.impress.co.jp/docs/news/1107434.html)などなど、世間を騒がすニュースが数多く散見される2018年度ですが、この傾向は今後も続くと思われます。





Facebookのユーザーについて、主に影響を受けたアカウントは米国ユーザーのようですが、このような事が起きてしまうとFacebook自体を使用することも躊躇われてしまいます。また、後者のBitcoinなどの仮想通貨のいわゆるマイニング（採掘）を、コンピューターのリソースを勝手に拝借して採掘し、マイニング業者に送付するという身勝手なマルウェアも、昨今の仮想通貨ブームに乗っかり、増加の一途をたどる一方です。





そこで、今回は安全にブラウジングするために個人的にオススメしたい、Google Chromeの拡張機能をご紹介します。一部はSafariやFirefoxにも提供されていますので、興味のある方は検索してみてください。





## Google Chromeでプライバシーを保護するための拡張機能





Google Chrome 66.0.3359.139で確認しています。





### AdGuard



[appbox chromewebstore bgnkhhnnamicmpeenaelnjfhikgbkllg]



言わずと知れた広告ブロックの老舗、AdGuard。弊サイトでもiOS版の[iPhoneのすべてのアプリからありとあらゆる広告を消し去る魔法のアプリ「AdGuard Pro」の使用方法](/adguard-pro-vpn-adblock-6486/)をご紹介しています。オープンソースとして公開されていますし、他の拡張機能と比較すると安全と思われる広告ブロック拡張機能です。





![](/images/2018/04/180427-5ae32579f2cac.png)






AdGuardのフィルターログを参照すれば、どのスクリプトがブロック対象、もしくは対象外となっているかを追うこともできるため、必要に応じてブロック対象を手動で追加することもできますし、逆にホワイトリストとして登録することも可能です。





![](/images/2018/04/180427-5ae329537df98.png)






また、AdBlock Plus形式のファイルのインポートにも対応しています。iOS版のコンテンツブロッカーとして有名な[280blocker | モバイル広告ブロッカー](https://280blocker.net/)で配布されている、AdBlock Plus形式のファイルをダウンロードし、インポートすることで、280氏の提供するフィルターを使用することもできます。（280氏のブロッカーは、主にモバイル向けですが）ただし、あまり多くのユーザーフィルターを使用すると、動作が重くなる（Webページの表示が遅くなる）可能性があります。





### Ghostery



[appbox chromewebstore mlomiejdfkolichcflejclcbmpeaniij]



ありとあらゆるトラッカーを追跡し、ブロックしてくれる優秀な拡張機能です。Webサイトごとにホワイトリストに登録したり、ブロックしたくないトラッカーについては個々に対象外にしたりと、融通が効くためオススメです。また、ブロックするトラッカーは、サイトごとに設定も可能です。Google AnalyticsやFacebookなどありとあらゆるトラッカーを防止する事ができます。





![](/images/2018/04/180427-5ae3253a07f99.png)






### No Coin



[appbox chromewebstore gojamcfopckidlocpkbelmpjcgmbgjcl]



最近、流行している仮想通貨のマイニングスクリプトの実行を防止する拡張機能です。今後、増加の一途をたどると思われるスクリプトに対していたちごっこのような気がしないでもないですが、拡張機能としてダウンロードしたはずの拡張機能に悪意のあるスクリプトなどが仕込まれる時代ですから、とりあえず入れておいて損はないでしょう。




    
    ~/Library/Application Support/Google/Chrome/Default/Extensions/gojamcfopckidlocpkbelmpjcgmbgjcl/X.X.X/blacklist.txt





なお、ブロック対象のリストは上記に保管されています。`X.X.X`はバージョン名に読み替えてください。





### Disconnect Facebook



[appbox chromewebstore nnkndeagapifodhlebifbgbonbfmlnfm]



Facebookに個人情報を収集されたくない、という場合にはこちらの拡張機能もオススメです。老舗の拡張機能ですが、Facebookによるありとあらゆるトラッカーの追跡を防止する事ができます。なお、Facebookが表示されなくなるわけではなく、あくまでFacebookのトラッカーを防止するためのものです。たとえば、Webサイトの「いいね！」なども表示されなくなります。





![](/images/2018/04/180427-5ae3264b0910a.png)

