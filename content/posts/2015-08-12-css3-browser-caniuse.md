---
author: ottan
date: 2015-08-12 14:16:15+00:00
draft: false
title: Webデザイナー必見！CSS3のブラウザの対応状況をコマンドラインで確認できる「caniuse-cmd」
type: post
url: /css3-browser-caniuse-2025/
categories:
- Mac
- Blog
tags:
- WordPress
- Development
---

![](/images/2015/08/150812-55cb5533b3681.png)






[Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/)といえば、CSS3やHTML5のブラウザの対応状況をブラウザで教えてくれる便利なツールですが、コマンドラインで確認できるツールが登場したのでご紹介します。





## HTML5、CSS3のブラウザの対応状況をCUIで調査！





インストールは、「npm」コマンドにより行います。




    
    $ npm install -g caniuse-cmd





「npm」によるパッケージ管理については、[はじめてのgulp.js！MacでCSSファイル、JavaScriptの圧縮を行おう](https://ottan.xyz/gulp-css-sass-268/)で詳しくご紹介していますので、こちらを参照してください。





### 使用方法





使用方法は以下の通りです。_XXXXX_は、調べたいコードを入力します。




    
    $ caniuse XXXXX





たとえば、Googleが開発し話題となった静止画フォーマットである、WebP（ウェッピー）を調べたい場合は、「XXXXX」に「webp」と入力します。





![](/images/2015/08/150812-55cb55387009c.png)






Google Chromeは、バージョン9以上でベンダープレフィックス付きで対応、バージョン23以上でベンダープレフィックス無しで完全対応していることがわかります。逆に、IEやFirefoxには対応していません。





![](/images/2015/08/150812-55cb553b87ba7.png)






調べたいコードは、部分的に入力しても構いません。たとえば、「border-radius」について調べたい場合は、「XXXXX」に「radius」と入力するだけで、「border-radius」について調べることができます。シェア91.34%のブラウザで対応済み、シェア0.01%のブラウザでベンダープレフィックス付きで対応していることもわかります。





![](/images/2015/08/150812-55cb553e9d792.png)






オプションで「-m」をつけると、モバイルブラウザについて調べることもできます。先ほどの「border-radius」について調べてみると、Opera Mobileはバージョン11以上、iOSのSafariはバージョン4以上で完全に対応していることがわかります。





![](/images/2015/08/150812-55cb5542d13d7.png)






オプションで「-web」をつけると、結果をコマンドラインではなく、Can I Useの結果をブラウザで表示してくれます。





## まとめ





「あのプロパティは、ブラウザに対応していたかな」と、ちょっと思った時に、気軽にコマンドラインから調べられるので便利ですね。なお、このコマンドはCan I Useのデータベースをローカルで参照しているため、最新情報を入手するためには、定期的にアップデートするようにしましょう。アップデートが必要な場合は、コマンドラインで実行した際に警告してくれます。（Caniuse data is more than 30 days out of date! Consider updating: npm install -g caniuse-cmd）1か月に1回程度が目安です。アップデート方法はインストール時と同様です。




    
    $ npm install -g caniuse-cmd
