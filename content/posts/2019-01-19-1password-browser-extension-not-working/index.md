---
author: ottan
date: 2019-01-19T19:44:42+09:00
draft: false
title: "Google Chromeで1Passwordの拡張機能が使用できなくなった場合の対処法"
type: post
url: /1password-browser-extension-not-working-20190119/
categories: ["Mac"]
tags: ["Google Chrome","1Password","Google"]
toc: true
---

![](/images/2019/01/190119-f3634302e6a7067.jpg)

1Password 6（最新より1つ前の古いバージョン）を使用しています。最新バージョンである1Password 7は、1Password 6から直接アップグレードできず、別アプリとしてインストールする必要があります。特に1Password 6に不満があったわけではありません。ただ、いつまでも古いバージョンを使用するのもなあと思い、1Password 6は残したまま1Password 7をインストールしてみました。1Password 7は、以下のリンクからダウンロード可能です。

* [Mac 用にダウンロード | 1Password](https://1password.com/jp/downloads/mac/)

ところが、ここからが悲劇の始まりでした。

1Password 7を一通り試した結果、現段階で取り急ぎアップグレードする必要はなしという結論に達しアンインストールすることとしました。アンインストールにはCleanMyMacを用いました。App Cleanerでもよいと思います。Macの中を隅々まで綺麗にし、これで今まで通りの1Password 6の生活に戻れると思っていたのですが。

* [CleanMyMac – マックをクリーンにしよう | Macをクリーンアップ！](http://www.cleanmymac.jp/)
* [AppCleaner](https://freemacsoft.net/appcleaner/)

意に反してGoogle Chromeを起動すると、以下のエラーメッセージが表示されました。そして、1Passwordのブラウザ拡張機能を使用できなくなりました。

* 1Password can't save or fill in Google Chrome.
* Restarting your browser may resolve this issue. If not, click Get Help.
* I'll Restart My Browser

![](/images/2019/01/190119-62e35312e706e67.png)

エラーメッセージとともにヘルプページへ誘導されました。[こちら](https://support.1password.com/kb/201707/)の内容に従い、リカバリ手順を実行してみたのですが一向に回復する見込みがありません。試行錯誤を繰り返した結果、1時間ほどかけてようやく再びブラウザ拡張機能が使用できるようになりました。そのリカバリ手順をここに残しておこうと思います。同じように困り果てている方がいたら、ぜひ試してみてくださいね。

{{< chrome aomjjhallfgjeglblehebfpbcfeobpgk >}}

## Google Chromeで1Passwordの拡張機能をリカバリする手順

そもそもどうすると事象が再現するのか、事象が再現した場合にどのように対処すれば良いのかを順を追って紹介します。

### 1Passwordの拡張機能が使用できなくなるまでの再現手順

リカバリ手順を記載する前に、この事象が再現する手順を残しておきます。今回の事象は、**1Password 6と7を同時に起動してしまったことに起因**します。

1. 1Password 7をインストールする
2. 1Password 7を起動する
3. アプリケーションフォルダの`1Password 6.app.zip`を解凍する
4. 1Password 7を起動した状態で、1Password 6を起動する
5. 1Password 7を終了する
6. 1Password 7をアンインストールする

つまり、1Password 6と7（1Password mini）を同時に起動すると冒頭の事象が発生します。

### 1Passwordの拡張機能を修復する手順

Google Chrome、Safari等のブラウザで1Passwordの拡張機能が使用できなくなった場合は、以下の手順を試してみてください。1Passwordは、1つのバージョンのみインストールされていることを前提とします。また、ここではGoogle Chromeの例で説明します。

1. Google Chromeを起動する
2. 1Passwordの拡張機能を削除する
3. 1Passwordの拡張機能をインストールする
4. OSを再起動する
5. Google Chromeを起動する
6. Google Chromeを終了する
7. Google Chromeを起動する

最後にブラウザを起動した際に、冒頭のエラーが表示されなくなっていれば修復完了です。公式のKB（Knowledge Base）の方法では解決しませんでした。おそらくテンポラリーの領域等に不具合の原因となるキャッシュ等が残されているものと思われますが、そこまでの詳細は追うことができませんでした。

{{< chrome aomjjhallfgjeglblehebfpbcfeobpgk >}}
