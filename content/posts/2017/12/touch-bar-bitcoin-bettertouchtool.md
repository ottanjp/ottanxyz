---
author: ["@ottanxyz"]
date: 2017-12-10T00:00:00+00:00
draft: false
title: Touch Barに現在のビットコインの価格を表示する
type: post
slug: touch-bar-bitcoin-bettertouchtool-6422
categories:
- Mac
tags:
- BetterTouchTool
- Touch Bar
---

![](/uploads/2017/12/171210-5a2d24593d82c.jpg)

MacBook ProのTouch Bar付きモデルを購入してから、Touch Barの余白を持て余していたため、[BetterTouchTool](https://www.boastr.net/)の、Touch Barのカスタマイズ機能を使用して、Touch Barに（少し時差のある）現在のビットコインの価格（BTC/JPY）を表示させてみました。商用利用には向きませんので、あくまで個人利用の範囲内でということで。

![](/uploads/2017/12/171210-5a2d2509269e8.png)

## Touch Barにビットコインの価格を表示する

Touch Barをカスタマイズするために、macOS標準の機能で用意されている方法は、「システム環境設定」→「キーボード」から「Control Stripをカスタマイズ」です。

![](/uploads/2017/12/171210-5a2d2750424db.png)

しかし、上記の方法ではTouch Barを十分にカスタマイズできるとは言えません。そこで登場するのが、MacBookのトラックパッドを最大限に活用するために必須とも言えるソフトウェアである[BetterTouchTool](https://www.boastr.net/)を使用する方法です。BetterTouchToolは有償ソフトウェアですが、Mac App StoreでBetterSnapToolを購入している場合には、そのライセンスで使用できます。

{{< itunes 417375580 >}}

### ビットコインの価格を取得する方法の考察

「BLOCKCHAIN」の「Exchange Rates API」を使用することにより、15分程度の時差がありますが、1ビットコインあたりの日本円の情報を取得することができそうです（より詳細に、リアルタイムに情報を得たい場合は、BitFlyer等の開発者向けAPIを使用するのが良いでしょう）。[Bitcoin Price API: Bitcoin Ticker & Exchange Rate API - Blockchain](https://blockchain.info/api/exchange_rates_api)によると、本APIで取得できる情報はJSON形式です。

    {
      "USD" : {"15m" : 478.68, "last" : 478.68, "buy" : 478.55, "sell" : 478.68,  "symbol" : "$"},
      "JPY" : {"15m" : 51033.99, "last" : 51033.99, "buy" : 51020.13, "sell" : 51033.99,  "symbol" : "¥"},
      "CNY" : {"15m" : 2937.05, "last" : 2937.05, "buy" : 2936.25, "sell" : 2937.05,  "symbol" : "¥"},
      "SGD" : {"15m" : 605.39, "last" : 605.39, "buy" : 605.22, "sell" : 605.39,  "symbol" : "$"},
      "HKD" : {"15m" : 3709.91, "last" : 3709.91, "buy" : 3708.9, "sell" : 3709.91,  "symbol" : "$"},
      "CAD" : {"15m" : 526.72, "last" : 526.72, "buy" : 526.58, "sell" : 526.72,  "symbol" : "$"},
      "NZD" : {"15m" : 582.26, "last" : 582.26, "buy" : 582.1, "sell" : 582.26,  "symbol" : "$"},
      "AUD" : {"15m" : 524.61, "last" : 524.61, "buy" : 524.46, "sell" : 524.61,  "symbol" : "$"},
      "CLP" : {"15m" : 283014.81, "last" : 283014.81, "buy" : 282937.95, "sell" : 283014.81,  "symbol" : "$"},
      "GBP" : {"15m" : 297.4, "last" : 297.4, "buy" : 297.32, "sell" : 297.4,  "symbol" : "£"},
      "DKK" : {"15m" : 2756.84, "last" : 2756.84, "buy" : 2756.09, "sell" : 2756.84,  "symbol" : "kr"},
      "SEK" : {"15m" : 3403.41, "last" : 3403.41, "buy" : 3402.49, "sell" : 3403.41,  "symbol" : "kr"},
      "ISK" : {"15m" : 56797.78, "last" : 56797.78, "buy" : 56782.35, "sell" : 56797.78,  "symbol" : "kr"},
      "CHF" : {"15m" : 447.19, "last" : 447.19, "buy" : 447.07, "sell" : 447.19,  "symbol" : "CHF"},
      "BRL" : {"15m" : 1093.06, "last" : 1093.06, "buy" : 1092.77, "sell" : 1093.06,  "symbol" : "R$"},
      "EUR" : {"15m" : 370.13, "last" : 370.13, "buy" : 370.03, "sell" : 370.13,  "symbol" : "€"},
      "RUB" : {"15m" : 17806.28, "last" : 17806.28, "buy" : 17801.44, "sell" : 17806.28,  "symbol" : "RUB"},
      "PLN" : {"15m" : 1557.38, "last" : 1557.38, "buy" : 1556.96, "sell" : 1557.38,  "symbol" : "zł"},
      "THB" : {"15m" : 15398.04, "last" : 15398.04, "buy" : 15393.86, "sell" : 15398.04,  "symbol" : "฿"},
      "KRW" : {"15m" : 494436.55, "last" : 494436.55, "buy" : 494302.27, "sell" : 494436.55,  "symbol" : "₩"},
      "TWD" : {"15m" : 14340.68, "last" : 14340.68, "buy" : 14336.79, "sell" : 14340.68,  "symbol" : "NT$"}

    }

BetterTouchToolで実行できるスクリプトは「Apple Script」のみです。「Apple Script」でJSON形式の情報を扱う方法としては「JSON Helper」が有名ですが、「Apple Script」では数値が大きくなった場合に「1.492621087E7」のような指数表示となってしまうため、価値が高騰しているビットコインの価格を「Apple Script」で操作するのは難儀しそうです。

{{< itunes 453114608 >}}

「Apple Script」では、シェルスクリプトを呼び出して実行する機能があるため、今回はこちらを使用します。シェルスクリプトでJSON形式を扱う一例としては、`jq`コマンドを使用します（Command-line JSON processor）。ただし、標準ではmacOSにインストールされていないため、Homebrewによりインストールしておきます。

    brew install jq

以上で準備は整いました。「Exchange Rates API」で公開されているAPIを`curl`コマンドでリクエストして、`jq`コマンドでJSONをパースすればワンライナーで実現できそうです。

### BetterTouchToolでTouch Barにウィジェットを表示する

準備が整いましたので、実際にTouch Barにビットコインの価格を表示してみます。

![](/uploads/2017/12/171210-5a2d2463b049c.png)

BetterTouchToolの環境設定を開きます。常時表示しておきたいため、「Select Application」で「Global」（すべてのアプリケーションでTouch Barを表示）を選択します。また、上部のタブから「Touch Bar」を選択します。続いて、「+Widget」ボタンをクリックします。

![](/uploads/2017/12/171210-5a2d246ac703e.png)

BetterTouchToolに「Select Widget」と呼ばれるアクションが追加されます。画面下部の「Select Touch Bar Widget」から「Run Apple Script and Show Return Value」を選択します。

![](/uploads/2017/12/171210-5a2d247164a59.png)

記事執筆時点では、Touch Barをウィジェットとして活用する方法として上記の項目が用意されています。「More to come soon...」とあるので今後新しい機能が追加されるかもしれませんね。今回は、前述の通り「Run Apple Script and Show Return Value」（Apple Scriptを実行して、戻り値を表示する）を選択します。

![](/uploads/2017/12/171210-5a2d24781c674.png)

続いて、「Advanced Configuration」をクリックします。

![](/uploads/2017/12/171210-5a2d247f8cbad.png)

「Name」に「Bitcoin」（任意）、実行するスクリプトに以下を入力します。

    return do shell script "curl https://blockchain.info/ja/ticker | /usr/local/bin/jq \".JPY.last\""

「TouchBar Button Color」でウィジェットの背景色をカスタマイズすることもできます。今回は、オレンジを選択してみました。また、「Execute this script every x seconds」で、何秒置きにスクリプトを実行するかをスライダーから選択できます。デフォルトでは「5秒」ですが、どうせ15分程度の時差がある価格なので、最大値である「100秒」で十分です。

![](/uploads/2017/12/171210-5a2d2fc72d6ef.png)

「Compile / Check Syntax」で「Apple Script」のコンパイルエラーが発生しないことを確認したら、「Run Script」で「Apple Script」を実行し、想定通りの値が得られることを確認します。

![](/uploads/2017/12/171210-5a2d2509269e8.png)

これで、Touch Bar上にビットコインの価格を表示することができました。持て余していたTouch Barのスペースを少しは有効活用できそうです。なお、今回は表示するだけのウィジェットを作成しましたが、BetterTouchToolのアクションで、特定のURLを開くアクションを作成しておき、ビットコインの価格を押したらデフォルトブラウザでビットコインの取引所のURLを開くようにしておけばより実用的かもしれません。

今更ながらBetterTouchToolおもしろいですね。Touch Barの使い道が増えそうです。
