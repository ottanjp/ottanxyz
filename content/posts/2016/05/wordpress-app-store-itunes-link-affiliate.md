---
author: ottan
date: 2016-05-10 13:03:01+00:00
draft: false
title: WordPressの本文にApp StoreのURLを貼り付けるだけで、アフィリエイトリンクを生成できるようにする
type: post
slug: wordpress-app-store-itunes-link-affiliate-6862
categories:
- iPhone
- Mac
- Blog
tags:
- Development
---

![](/uploads/2016/05/160510-5731d1e0800c7.jpg)

WordPressを使用していて、App Storeに公開されているiPhone、iPad、Macのアプリケーションを紹介する際に、アフィリエイトリンクを貼り付けている方は多数いらっしゃると思います。

アフィリエイトリンクを生成する方法は、アップルが公開している[iTunes Link Maker](https://linkmaker.itunes.apple.com/en-us/?country=jp)を使用したり、多数公開されているプラグインやウィジェットを使用する方法があります。今回はApp StoreやMac App StoreのアプリケーションのURLを、WordPressの本文に貼り付けるだけでアフィリエイトのリンクを簡単に生成できる方法をご紹介します。

## App StoreのURLからアフィリエイトリンクを生成する

以下のソースコードを**class-itunes-link-builder.php**という名前で保存して、テーマの**functions.php**から読み込んでください。直接、**functions.php**に書き込んでもいいですが、長くなるので分割した方が可読性は良くなると思います。

<https://gist.github.com/ottanxyz/fa722621d551eb76c6302166681c10a2>

原理は、[プラグインを使わずにGistのコードをWordPressに埋め込む方法](/gist-wordpress-embed-6861/)でご紹介した方法と同様です。ポイントとなるのは、`wp_embed_register_handler()`関数です。詳細は、[wp_embed_register_handler() | Function | WordPress Developer Resources](https://developer.wordpress.org/reference/functions/wp_embed_register_handler/)を参照してください。

### 使い方と制限事項

iTunes Link Builder（と呼んでいます）の簡単な使い方と制限事項です。

-   `ITUNES_AFFILIATE_TAG`は、iTunesアフィリエイトプログラムにログインして確認した、アフィリエイトトークンに置換してください（下記リンク参照）
-   対象となるURLは、`https://itunes.apple.com/jp/`から始まるURLのみです
-   対象となるのは、iPhone、iPad、Macアプリケーションのみです。ミュージック、映画、Podcast、Apple Musicなどには対応していません
-   テンプレートとなるHTMLは各サイトに合わせて自由に改変して使用してください
-   `$results`変数で取得できる項目は、[iTunes Search API – iTunes Affiliate Resources](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/)を参照してください（ここにもすべては書かれていないようなのですが…）
-   テンプレートへ表示したい項目に応じて`$results`変数から値を取得してください。

<https://itunes.phgconsole.performancehorizon.com/login/itunes/jp>

`$results`変数から取得できる値の代表的なものを紹介します。`$results->XXXXX`の`XXXXX`の部分を紹介します。

| 項目                             | 内容                                                          |
| -------------------------------- | ------------------------------------------------------------- |
| screenshotUrls                   | 配列。アプリケーションのスクリーンショットのURL               |
| artworkUrl60                     | 文字列。アプリケーションのアイコンを示すURL。60×60のサイズ    |
| artworkUrl100                    | 文字列。アプリケーションのアイコンを示すURL。100×100のサイズ  |
| artworkUrl512                    | 文字列。アプリケーションのアイコンを示すURL。512×512のサイズ  |
| artistViewUrl                    | 文字列。開発元が公開しているアプリケーション一覧を示すURL     |
| supportedDevices                 | 配列。サポートしているデバイス                                |
| fileSizeBytes                    | 数値。ファイルサイズ。単位はバイト                            |
| sellerUrl                        | 文字列。開発元のウェブサイトのURL                             |
| trackViewUrl                     | 文字列。アプリケーションのURL                                 |
| version                          | 文字列。アプリケーションのバージョン                          |
| userRatingCountForCurrentVersion | 数値。現在のバージョンのレーティング                          |
| description                      | 文字列。アプリケーションの説明                                |
| artistName                       | 文字列。開発元の名称                                          |
| genres                           | 配列。アプリケーションのカテゴリー（ジャンル）                |
| trackName                        | 文字列。アプリケーションの名称                                |
| releaseDate                      | 文字列。アプリケーションの初期バージョンのリリース日          |
| formattedPrice                   | 文字列。整形されたアプリケーションの価格。0円の場合は「無料」 |
| currentVersionReleaseDate        | 文字列。現在のバージョンのリリース日                          |
| averageUserRating                | 数値。ユーザレビューの平均値                                  |
| userRatingCount                  | 数値。ユーザレビューの件数                                    |

弊サイトで適用した場合のリンクは以下のようになります。（スクリーンショットを掲載しています）

![](/uploads/2016/05/160510-5731d28051ea6.png)

![](/uploads/2016/05/160510-5731d2926f059.png)

![](/uploads/2016/05/160510-5731d29db84cb.png)

### ポイント

iTunes Link Builderのポイントを簡単にご紹介します。応用すれば、Amazon Link Builderなんてものも作れそうです。

-   `wp_embed_register_handler()`でパターンにマッチしたURLをショートコードに変換する
-   毎回、iTunes Search APIを使用してアプリの情報を取得すると、WordPressの動作が重くなります。取得した情報はWordPressのTransient APIを使用してキャッシュとして保持する（キャッシュ期間は１日）。取得した情報は下図のようにデータベースにシリアライズされて保持されます
-   テーマやCSSが変わった場合に変更するのは、このクラスの`display()`関数だけ！
-   App Store、Mac App Storeの価格情報はセールなどで随時変更されるため書き方に要注意
-   場合によっては動かないことがあるかもしれません。コメント欄で教えていただけると助かります

![](/uploads/2016/05/160510-5731d1f1ba742.png)

## まとめ

とりあえず、お試しで作成してみました。すでに似たようなプラグインは多数公開されているかもしれませんが、機能を最低限に絞りました。ご要望やバグ発見時にはコメント欄、または[@ottanxyz](https://twitter.com/ottanxyz)まで教えてくださいね。
