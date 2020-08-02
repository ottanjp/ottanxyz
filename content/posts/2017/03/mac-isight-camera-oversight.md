---
author: ["@ottanxyz"]
date: 2017-03-04T00:00:00+00:00
draft: false
title: Macの内蔵iSightカメラで盗聴されていることを検知できる「OverSight」
type: post
slug: mac-isight-camera-oversight-5560
categories:
  - Mac
tags:
  - Apps
  - Security
---

![](/uploads/2017/03/170304-58ba3b1937ed1.jpg)

以前、[Mac の内蔵カメラで盗撮可能な問題、セキュリティ研究者が報告 - ITmedia エンタープライズ](http://www.itmedia.co.jp/enterprise/articles/1610/07/news125.html)にあるように、MacBook などに内蔵されているカメラ（iSight カメラ）が盗撮される問題が報告されています。iSight カメラは、FaceTime や Skype などで幅広く利用されており、日常的に使用している方も多いはずです。

iSight カメラ起動中は、Mac に内蔵されている LED ライトが緑色に点灯するためカメラが使用されていることに気づくことはできるのですが、常に小さな LED ライトに目を向けるわけにもいきません。また、普段 iSight カメラを利用していないからこそ、不正に iSight カメラが利用されていることに気づかないことも多いはずです。

今回は、そのようなユーザのために開発された、iSight カメラの不正利用を防止するための Mac のソフトウェア「OverSight」をご紹介します。アプリをダウンロードして起動しておくだけで使用できる便利なソフトウェアです。

## Mac 内蔵の iSight カメラの起動を検知する「OverSight」

「OverSight」は、Mac に標準で内蔵されている iSight カメラの起動を検知するためのアプリです。

### 「OverSight」のダウンロード

「OverSight」は Mac App Store では配布されておらず、開発者の Web ページからダウンロードすることになります。

https://objective-see.com/products/oversight.html

上記リンク先の緑色の傘のアイコンをクリックしてダウンロードします。

![](/uploads/2017/03/170304-58ba3b3946ac0.png)

#### Homebrewを利用したインストール

Homebrewを利用してインストールすることもできます。

```zsh
brew cask install oversight
```

### 「OverSight」の起動

インストール方法は簡単です。ダウンロードした zip ファイルを解凍して、インストーラーを起動しましょう。なお、インストールのためには管理者権限が必要です。管理者グループに属するユーザでインストールしましょう。インストール時にログインしているユーザのパスワードを求められるため入力します。

![](/uploads/2017/03/170304-58ba3b2b45a6f.png)

「OverSight」はメニューバーに常駐するアプリケーションです。停止、起動はメニューバーから行います。「OverSight」を起動したい場合は、メニューバーから「Preferences」を選択します。

![](/uploads/2017/03/170304-58ba3b30214a3.png)

「Start!」をクリックしましょう。

### 「OverSight」による iSight カメラの起動の検知

では、「OverSight」を起動した状態で「FaceTime」を起動してみましょう。

![](/uploads/2017/03/170304-58ba3b40b3d3b.png)

「OverSight」が起動している状態で、「FaceTime」が起動すると、macOS の通知の機能によりこのような画面が右上に表示されます。また、iSight カメラが起動されるため LED ライトが点灯することを覚えておきましょう。もし、この iSight カメラの使用が不正なものであった場合には「block」をクリックします。

![](/uploads/2017/03/170304-58ba3b463ac07.png)

すると、FaceTime が終了し、このように「Video Device became inactive」と表示され、iSight カメラの使用が防止されました。また、同様に Mac に内蔵されているマイクの使用を検知することもできます。

## まとめ

「OverSight」は、macOS の脆弱性等をついて iSight カメラや内蔵マイクの使用を未然に防止するためのアプリケーションです。日常的に iSight カメラや内蔵マイクを使用している、とくに自宅ではなく外出先や仕事で多用しているという場合には、ぜひダウンロードしてみてはいかがでしょうか。
