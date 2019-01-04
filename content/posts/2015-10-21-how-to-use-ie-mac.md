---
author: ottan
date: 2015-10-21 05:12:40+00:00
draft: false
title: MacでInternet Explorer 11を使用する簡単な方法
type: post
url: /how-to-use-ie-mac-6812/
categories:
  - Mac
  - Windows
tags:
  - Development
---

![](/images/2015/10/151021-562718e32e573.jpg)

Mac で Internet Explorer を使用するためには、仮想環境を利用する、Boot Camp 環境を利用するなど、Windows 環境を構築する必要がありましたが、今回ご紹介する方法を使用すれば、Microsoft アカウントと Mac App Store で配布されているアプリケーションを利用するだけで使用することができるようになります。

**2016/10/16 現在、この方法は使用することができません。下記の方法をご参照ください。**

- [OTTAN.XYZ | Mac で Windows に搭載されている Internet Explorer 9 でのレンダリングを確認する方法](/mac-windows-internet-explorer-5113/)

## Mac で Internet Explorer 11 を使用する方法

Internet Explorer 11 を使用するためには下準備が必要です。必要なのは Microsoft アカウントと Mac App Store で配布されている「Microsoft Remote Desktop」だけです。準備が整ったら実際に IE11 を起動する方法をご紹介します。

### 下準備

Mac で Internet Explorer 11 を使用するためには、下準備が必要です。

1. [ホーム｜ Microsoft アカウント](http://www.microsoft.com/ja-jp/msaccount/)で Microsoft アカウントを登録する
2. Mac App Store から Microsoft Remote Desktop をダウンロードする

{{< itunes 715768417 >}}

### Mac で Internet Explorer 11 を使用する

[Remote Test IE Technical Preview on Mac macOS, iOS, Android, Windows 7 and Phone](https://remote.modern.ie/subscribe)にアクセスします。Microsoft アカウントの入力を求められるため、下準備で登録した Microsoft アカウントを入力します。

![](/images/2015/10/151021-562718e4260b9.png)

「Remote.IE が、次の操作を行う許可を求めています」という画面が表示されますので、「はい」ボタンをクリックします。

![](/images/2015/10/151021-562718e5eebb9-1.png)

ログインしたらサービスを利用したいリージョンを選択して、「Submit」ボタンをクリックします。現時点では「ヨーロッパ」か「アメリカ合衆国」しか選択できないため、どちらを選択しても大差はありません。

![](/images/2015/10/151021-56271ecb0c744.png)

続いて、ダウンロードした「Microsoft Remote Desktop」を起動し、「Azure RemoteApp」をクリックします。

![](/images/2015/10/151021-562718e91ff4b.png)

「Get Started」をクリックします。

![](/images/2015/10/151021-562718ea18e14.png)

Microsoft アカウントに使用しているメールアドレスまたは電話番号を入力し、「続行」ボタンをクリックします。

![](/images/2015/10/151021-562718eb1f797.png)

Microsoft アカウントのパスワードを入力し、「サインイン」ボタンをクリックします。

![](/images/2015/10/151021-562718ec4169c.png)

「Internet Explorer」ボタンをチェックします。

![](/images/2015/10/151021-562718ed76263.png)

「Microsoft Remote Desktop」に「XXXX IE with EdgeHTML」をダブルクリックします。「XXXX」は選択したリージョンによって異なります。

![](/images/2015/10/151021-562718eea44bc.png)

すると、Internet Explorer を起動することができました。弊サイトも Internet Explorer 11 で無事閲覧できることがわかりました。

![](/images/2015/10/151021-56271ecc94b05.png)

使用できるバージョンは、Internet Explorer 11 のみです。

![](/images/2015/10/151021-562718f1b13f9.png)

## まとめ

従来は、Internet Explorer 11 を使用する場合は、たとえば VirtualBox を利用して Windows の仮想マシンを作成する、Boot Camp 環境に Windows を導入するなど、やや複雑な手順を踏む必要がありました。今回ご紹介した方法を使用すれば、簡単に Internet Explorer 11 が使用できるのでオススメです。

Via：[How to Use Internet Explorer 11 in Mac macOS the Easy Way](http://osxdaily.com/2015/10/19/use-internet-explorer-11-mac-os-x-easy/)
