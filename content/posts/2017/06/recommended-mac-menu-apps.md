---
author: ottan
date: 2017-06-15 00:32:33+00:00
draft: false
title: Macを購入したら導入したいメニューバーに常駐する便利なオススメのアプリケーション
type: post
url: /recommended-mac-menu-apps-5964/
categories:
- Mac
tags:
- Apps
---

![](/uploads/2017/06/170612-593ddd26deecd.jpg)

Macには、Mac App Storeをはじめとしてさまざまな便利なアプリケーションが配布されていますが、今回は私が実際に使用している、Macのメニューバーに常駐し、さまざまな作業を便利にしてくれる、セキュリティを強化してくれるアプリケーションを厳選してご紹介します。Macの買い替え、新規購入などの参考にしていただければと思います。

## Macのメニューバーに常駐する便利なアプリケーション

常駐するアプリケーションはメニューバーのみではなくバックグラウンドで動作するものも多々ありますが、今回は主にメニューバー
に常駐させておくと便利なアプリケーションに絞ってご紹介したいと思います。その他、お気に入りのアプリがあればぜひコメント欄等で教えてくださいね。

### PopClip

トラックパッド、マウス、どちらを使用している方にもオススメしたい、拡張アプリケーション。インストールした直後の状態でも便利ですが、専用の拡張機能を導入することで、ますます使い道が広がります。詳細は、[選択したテキストやURLをさまざまなものに保存、加工できるPopclipの便利な厳選拡張機能 – OTTAN.XYZ](/popclip-extension-best-5629/)をご覧ください。

{{< itunes 445189367 >}}

### 翻訳タブ

![](/uploads/2017/06/170612-593ddd44db994.png)

メニューバーに常駐し、いつでもGoogle翻訳により翻訳を行うことができるアプリケーションです。海外のニュースサイト等を読むのに重宝します。前述のPopClipの拡張機能を使用することで、選択したテキストをそのまま翻訳タブに渡すことができるようになるため、調べたい単語、フレーズ、文章等を簡単に翻訳できます。

{{< itunes 458887729 >}}

### BetterTouchTool

![](/uploads/2017/06/170612-593ddd8dcea48.png)

MacBookなどでトラックパッドを使用しているならぜひ導入しておきたいアプリケーション。トラックパッドやMagic Mouseのジェスチャーを拡張します。三本の指でトラックパッドを下にスワイプするとSafariのタブを閉じるなど、アプリケーションのメニューをすべてジェスチャーに割り当てることができます。また、付随する「Window Snapping」機能を使用することで、アプリケーションのウインドウを左右に簡単に分割、四分割することができるためウインドウを整理したい方にも便利です。

<https://www.boastr.net>

### CloudClip

![](/uploads/2017/06/170612-593ddd3de4da7.png)

インストールするだけで、iCloud経由で自動的にクリップボードを同期できる便利なクリップボード管理アプリケーションです。iOS版、macOS版が用意されており、インストールするだけでデバイス間でクリップボードを同期できます。なお、同期の対象となるのはテキストのみです。シンプルですが、シンプルであるがゆえに使いやすいアプリケーションです。[セットアップ不要！iCloud経由でクリップボード（テキスト）をiOS、macOS間で同期できる「CloudClip」 – OTTAN.XYZ](/icloud-clipboard-cloudclip-5884/)

{{< itunes 563362017 >}}

### TripMode

![](/uploads/2017/06/170612-593ddd51628b3.png)

[テザリング時に必須！許可したアプリケーションの通信のみ許可できる便利なMacのアプリ「TripMode」 – OTTAN.XYZ](/tethering-tripmode-1363/)でご紹介しています。MacBookをiPhoneでテザリングする場合、VPN接続する場合に、特定のアプリケーションのみ通信を許可することのできる、痒い所に手が届くアプリケーションです。これで、テザリング時に誤ってDropbox経由で巨大なサイズのファイルを同期してしまい、iPhoneの通信速度に制限がかかってしまったという心配もなくなります。

<https://www.tripmode.ch>

### Dash

![](/uploads/2017/06/170612-593ddd585cb4b.png)

Dashは、言語のリファレンスをオフラインで参照できる便利なライブラリですが、私の場合はスニペット展開アプリとして使用しています。TextExpanderと呼ばれる高機能なスニペット展開アプリが月額制に移行したことに伴い、Dashにすべて移行しました。[スニペット展開アプリのTextExpanderの代替アプリとしてDashを使用する – OTTAN.XYZ](/textexpander-dash-snippet-5908/)で詳しくご紹介しています。

    global pageURL
    global pageTitle

    tell application "Safari"
    	set pageTitle to get name of current tab of window 1
    	set pageURL to get URL of current tab of window 1
    end tell

    set the clipboard to "<a href=\"" & pageURL & "\" target=\"_blank\">" & pageTitle & "</a>"

    tell application "System Events"
    	keystroke "v" using {command down}
    end tell

TextExpanderでは、スニペットにAppleScript（またはJavaScript）を組み込むことが可能でしたが、Dashでは使用できません。スニペットの展開でSafariのアクティブなタブを取得し、タイトルとURLからHTMLタグを整形するということを行なっていましたが、Dashではできません。ただし、私の場合、スニペットの展開はブログエディターであるMarsEditにおける使用が主であったため、MarsEditのスクリプトに上記を追加することにより補完するようにすることですべて解決しました。

<https://kapeli.com/dash>

### 1Password

![](/uploads/2017/06/170612-593ddd5d984b2.png)

iOS、macOSにおけるパスワード管理アプリケーションの決定版。初期投資にはややお金がかかりますが、一般的なワンタイムパスワード（TOTP：Time-Based One-Time Password Algorithm）に対応しているため、ワンタイムパスワードについても一元的に管理できます。ワンタイムパスワードは、セキュリティ向上にはもはや欠かせない技術です。ワンタイムパスワードによる2段階認証（もしくは2要素認証）が可能な場合は、ワンタイムパスワードを設定しておくと良いでしょう。iOS版については、[iOS版の1Passwordでウェブページの登録からワンタイムパスワードの使い方まで徹底解説！ – OTTAN.XYZ](/ios-1password-description-part2-875/)で詳しくご紹介しています。

{{< itunes 443987910 >}}

### Stockmagic for Mac

![](/uploads/2017/06/170612-593ddd37bf3cf.png)

主に、WordPressで記事を投稿する際のアイキャッチ画像探しに利用しています。CC0ライセンスで配布されている商用利用可能、クレジット表記不要の画像ファイルをメニューバーからキーワードで検索、ダウンロードまで行うことができます。[無料の写真 - Pixabay](https://pixabay.com/ja/)で提供されている写真を利用しています。[WordPressのアイキャッチ画像探しに便利なメニューバーから画像を検索できる「Stockmagic for Mac」 – OTTAN.XYZ](/wordpress-eyecatch-stockmagic-pixabay-5823/)でご紹介しています。

<https://getstockmagic.com>

### Irvue

![](/uploads/2017/06/170614-59408b3268f95.png)

Macのデスクトップの壁紙を気にすることはあまりなかったのですが、Retinaディスプレイによる高精細なディスプレイを活かさないのはもったいないと思い導入したアプリケーションです。設定した時間の間隔で定期的に高画質な壁紙に自動的に設定してくれます。壁紙で気分転換してみませんか。[Macの美しいRetinaディスプレイを一層美しく彩る壁紙の究極の楽しみを提供する「Irvue」 – OTTAN.XYZ](/mac-retina-display-desktop-picture-5272/)でご紹介しています。

{{< itunes 1039633667 >}}

### Amphetamine

![](/uploads/2017/06/170614-59408b008d705.png)

作業中のMacのスリープを一時的に制御する、Macに頑張って働いてもらうための便利なアプリケーション。もともと、「Caffeine」と呼ばれる著名なアプリケーションを使用していましたが、Mac App Storeからの配布が停止されていたため、こちらに乗り換えました。詳しくは、[「Caffeine」から乗り換えよう！メニューバーからクリック1つでmacOSの省電力設定を無効化、有効化できる「Amphetamine」 – OTTAN.XYZ](/caffeinate-amphetamine-power-saving-caffeine-5459/)でご紹介しています。

{{< itunes 937984704 >}}

### OverSight

![](/uploads/2017/06/170614-5941cba5a6ac1.png)

Macには、FaceTime等で使用することのできる内蔵iSightカメラが導入されています。逆に言えば、iSightカメラにさえアクセスできてしまえば、不正なアプリケーション等から盗撮される可能性があることを示しています。ランサムウェア、マルウェア等から被害を最小限に防ぐために、[Macの内蔵iSightカメラが勝手に使用されていることを検知し防止できる「OverSight」 – OTTAN.XYZ](/mac-isight-camera-oversight-5560/)でもご紹介したこのアプリケーションを使用しています。iSightカメラにアクセスがあった場合には、通知が表示され、その都度使用を許可、拒否できます。

<https://objective-see.com/products/oversight.html>

### Bartender 2

![](/uploads/2017/06/170612-593ddd4c00df2.png)

メニューバーに常駐するアプリケーションが増えすぎると、アプリケーションによってはメニューの項目が多い場合に、すべてのアプリケーションが表示されなくなる可能性があります。そこで、メニューバーには常駐させておきたいけど普段は隠しておきたい、もしくは勝手にメニューバーに常駐してしまうけどアイコンは隠しておきたい、という時に便利なのが「Bartender」です。有償のアプリケーションですが、無償で使用できる試用期間も用意されているので、メニューバーを整理したい方は試してみてください。

<https://www.macbartender.com>

## まとめ

以上、メニューバーに常駐する便利なアプリケーションの数々をご紹介しました。お気に入りのアプリケーションがあれば、[@ottanxyz](https://twitter.com/ottanxyz)やコメント欄等で教えていただけると助かります。
