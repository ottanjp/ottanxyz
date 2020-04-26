---
author: ottan
date: 2017-05-26 01:41:47+00:00
draft: false
title: SafariでOneNote Web Clipper、またはEvernote Web Clipperが使用できない場合の対処法
type: post
slug: safari-onenote-evernote-web-clipper-not-working-5887
categories:
- Mac
tags:
- Tips
---

![](/uploads/2017/05/170526-59277dea3d81e.png)

macOS SierraのSafariで検証しています。Safariでは拡張機能と呼ばれるプラグインを導入することによって、より便利に使用できますが、愛用しているプラグインの中で「OneNote Web Clipper」「Evernote Web Clipper」がいつのまにか使用できなくなってしまっていたので、対処法をご紹介します。

## OneNote Web Clipper、Evernote Web Clipperが使用できない場合の対処法

愛用している拡張機能に、「OneNote Web Clipper」「Evernote Web Clipper」があります。前者は、MicrosoftのOneNoteにWebページを保存する拡張機能、後者はEvernoteにWebページを保存する機能ですね。Webページを保存する場合は、Evernoteがやはり重宝します。OneNoteの場合、Webページを一括で保存できるのですが、スタイルが崩れてしまったり、フォントが固定されてしまうので扱いづらいですね。今後に期待です。

<https://safari-extensions.apple.com/details/?id=com.microsoft.onenote.clipper-UBF8T346G9>

<https://safari-extensions.apple.com/details/?id=com.evernote.safari.clipper-Q79WDW8YH9>

さて、両者に共通して起こる問題があります。Safariに拡張機能をインストールし、Webページを保存しようとすると、**新しいタブを開こうとしてすぐ閉じる、新しいタブを開きSafariが異常終了する**事象が確認できました。Webページを保存しようにも、ダイアログがあらわれずに、OneNoteなりEvernoteにWebページを保存することができないのです。このような場合には、Safariの環境設定を見直しましょう。

![](/uploads/2017/05/170526-5927860800143.png)

Safariの環境設定を開き、「プライバシー」タブの「CookieとWebサイトのデータ」を「閲覧したWebサイトは許可」、もしくは「常に許可」に変更します。「閲覧したWebサイトは許可」をオススメします。

<blockquote>閲覧中の Web サイトのみ許可：ユーザが現在閲覧している Web サイトからのみ Cookie と Web サイトのデータを受け入れます。多くの Web サイトにはほかのソースのコンテンツが埋め込まれています。それらの第三者による Cookie とその他のデータの保存を禁止します。</blockquote>

<blockquote>閲覧した Web サイトは許可：ユーザが閲覧した Web サイトからのみ Cookie と Web サイトのデータを受け入れます。Web サイトを閲覧したことがあるかどうかは、Cookie を使用して決定されます。これには、ユーザが表示する別の Web サイトにコンテンツを埋め込んでいる Web サイトが Mac に Cookie とデータを保存することを防ぐ効果があります。</blockquote>

要は、「閲覧中のWebサイトのみ許可」にしていた場合、そのWebサイトのドメインに対するCookieやデータの使用が許可されないため、OneNoteやEvernoteのドメインに対するCookieやデータの使用が許可されず、サインインできないというか使用できなくなってしまうようです。セキュリティ的には、悪質なCookieが読み込まれないように「閲覧中のWebサイトのみ許可」にしておきたいところですが、一度閲覧したことのあるWebサイトであれば許容範囲といったところでしょうか。この辺りの問題を拡張機能側で解決してもらえると嬉しいのですが。

何はともあれ、個人的には今後のOneNoteのWebページの保存の正確さに期待したいところです。現段階ではまだまだEvernoteの方が使いやすいです。
