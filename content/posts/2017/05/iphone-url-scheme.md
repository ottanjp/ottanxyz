---
author: ottan
date: 2017-05-02 00:16:24+00:00
draft: false
title: iPhoneの任意のアプリのURLスキームを調べる方法
type: post
url: /iphone-url-scheme-5717/
categories:
- iPhone
- Mac
tags:
- Tips
---

![](/uploads/2017/05/170501-5907caece5b5d.jpg)

App Storeで配布されているiPhoneのアプリのURLスキームを使用すれば、たとえばSafariなどの外部ソフトウェアからそのアプリを簡単に呼び出すことができるため便利です。たとえば、[iOS版の1Passwordでウェブページの登録から使い方まで徹底解説！ – OTTAN.XYZ](/ios-1password-description-554/)でご紹介しているように、Safariで閲覧中のWebページを、そのまま1Passwordの内蔵ブラウザで開くこともできます。また、Workflowなど自動化アプリに組み込んで使用することで、より効果を発揮しそうです。

しかし、App Storeで配布されているすべてのアプリでURLスキームが使用できるわけではありません。そこで今回は、使用しているアプリがURLスキームに対応しているかどうかを、iTunesを使用して簡単に調べる方法をご紹介します。

## アプリのURLスキームを調べる方法

前提として、PCまたはMacにiTunesをダウンロードしておく必要があります。また、App Storeからアプリをダウンロードするために、事前にApple IDでサインインしておきましょう。

### iTunesで調査したいアプリをダウンロードする

![](/uploads/2017/05/170501-5907caf7e4c43.png)

まず、iTunesのApp StoreからURLスキームを調べたいアプリをダウンロードしましょう。iPhone、iPad、iPod touchなど、iOSデバイスで使用できるすべてのアプリケーションにこの方法は対応可能です。

![](/uploads/2017/05/170501-5907cb001872a.png)

続いて、iTunesでダウンロードしたアプリの保存場所を開きます。Macの場合はデフォルトで`~/Music/iTunes/iTunes\ Media/Mobile\ Applications`となっていますので、Finderを開いて移動してください。ダウンロードしたアプリケーション（拡張子が「ipa」）が存在することを確認したら、任意のフォルダーにコピーします。

![](/uploads/2017/05/170501-5907cb22b8f44.png)

今回はデスクトップにコピーしました。

![](/uploads/2017/05/170501-5907cb36a404d.png)

続いて、拡張子を「.ipa」（iPhone Application）から「.zip」に変更します。拡張子を変更したらダブルクリックして展開します。Macの場合は、デフォルトの設定であれば展開元のフォルダーにそのまま展開されます。「.ipa」ファイルの正体はzipで圧縮されたアーカイブファイルです。

![](/uploads/2017/05/170501-5907cb3d28041.png)

zipを展開して、フォルダーの中の「Payload」というフォルダーを探します。その中にアプリの本体が格納されています。たとえば、Twitterの場合は、「Twitter.app」というファイルが格納されていることがわかります。Macの場合は、右クリックして「パッケージの内容を表示」をクリックします。Windowsの場合は、単純にフォルダーとして表示されていると思いますのでそのままエクスプローラーで開きます。（もしフォルダーとして表示されていない場合は、拡張子を消してみてください）

![](/uploads/2017/05/170501-5907cb439c3f3.png)

そのフォルダーの直下に`info.plist`と呼ばれるプロパティリストファイルが存在します。アプリケーションを定義する重要なファイルです。このファイルをテキストエディター等で開いて、以下のような記述を探しましょう。

        <key>CFBundleURLTypes</key>
        <array>
          <dict>
            <key>CFBundleURLName</key>
            <string>com.twitter.twitter-iphone</string>
            <key>CFBundleURLSchemes</key>
            <array>
              <string>twitter</string>
              <string>com.twitter.twitter-iphone</string>
              <string>com.twitter.twitter-iphone+1.0.0</string>
              <string>tweetie</string>
              <string>com.atebits.Tweetie2</string>
              <string>com.atebits.Tweetie2+2.0.0</string>
              <string>com.atebits.Tweetie2+2.1.0</string>
              <string>com.atebits.Tweetie2+2.1.1</string>
              <string>com.atebits.Tweetie2+3.0.0</string>
              <string>fb2231777543</string>
              <string>twitterauth</string>
            </array>
          </dict>
        </array>

この**CFBundleURLSchemes**がアプリケーションのURLスキームに該当します。URLスキームは複数定義することが可能です。Twitterの場合は、上記のURLスキームが用意されていることがわかります。

## まとめ

URLスキームがあれば、外部からアプリケーションを簡単に起動することができるようになります。ランチャーアプリ等を使用して外部からアプリケーションを起動する必要がある場合には、そのアプリケーションがURLスキームに対応しているかどうか調べてみましょう。
