---
author: ottan
date: 2016-05-10 13:03:01+00:00
draft: false
title: WordPressの本文にApp StoreのURLを貼り付けるだけで、アフィリエイトリンクを生成できるようにする
type: post
url: /wordpress-app-store-itunes-link-affiliate-6862/
categories:
  - iPhone
  - Mac
  - Blog
tags:
  - Development
  - WordPress
---

![](/images/2016/05/160510-5731d1e0800c7.jpg)

WordPress を使用していて、App Store や Mac App Store に公開されている iPhone、iPad、Mac のアプリケーションを紹介する際に、アフィリエイトリンクを貼り付けている方は多数いらっしゃると思います。

アフィリエイトリンクを生成する方法は、アップルが公開している[iTunes Link Maker](https://linkmaker.itunes.apple.com/en-us/?country=jp)を使用したり、多数公開されているプラグインやウィジェットを使用する方法があるかと思いますが、今回は App Store や Mac App Store のアプリケーションの URL を、WordPress の本文に貼り付けるだけでアフィリエイトのリンクを簡単に生成できる方法をご紹介します。

## App Store の URL からアフィリエイトリンクを生成する

以下のソースコードを**class-itunes-link-builder.php**という名前で保存して、テーマの**functions.php**から読み込んでください。直接、**functions.php**に書き込んでもいいですが、長くなるので分割した方が可読性は良くなると思います。

{{< gist ottanxyz fa722621d551eb76c6302166681c10a2 >}}

原理は、[プラグインを使わずに Gist のコードを WordPress に埋め込む方法](/gist-wordpress-embed-4108/)でご紹介した方法と同様です。ポイントとなるのは、`wp_embed_register_handler()`関数です。詳細は、[wp_embed_register_handler() | Function | WordPress Developer Resources](https://developer.wordpress.org/reference/functions/wp_embed_register_handler/)を参照してください。

### 使い方と制限事項

iTunes Link Builder（と呼んでいます）の簡単な使い方と制限事項です。

- `ITUNES_AFFILIATE_TAG`は、iTunes アフィリエイトプログラムにログインして確認した、アフィリエイトトークンに置換してください（下記リンク参照）
- 対象となる URL は、`https://itunes.apple.com/jp/`から始まる URL のみです
- 対象となるのは、iPhone、iPad、Mac アプリケーションのみです。ミュージック、映画、Podcast、Apple Music などには対応していません
- テンプレートとなる HTML は各サイトに合わせて自由に改変して使用してください
- `$results`変数で取得できる項目は、[iTunes Search API – iTunes Affiliate Resources](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/)を参照してください（ここにもすべては書かれていないようなのですが…）
- テンプレートに表示したい項目に応じて`$results`変数から値を取得してください。

https://itunes.phgconsole.performancehorizon.com/login/itunes/jp

`$results`変数から取得できる値の代表的なものを紹介します。`$results->XXXXX`の`XXXXX`の部分を紹介します。

| 項目                             | 内容                                                           |
| -------------------------------- | -------------------------------------------------------------- |
| screenshotUrls                   | 配列。アプリケーションのスクリーンショットの URL               |
| artworkUrl60                     | 文字列。アプリケーションのアイコンを示す URL。60×60 のサイズ   |
| artworkUrl100                    | 文字列。アプリケーションのアイコンを示す URL。100×100 のサイズ |
| artworkUrl512                    | 文字列。アプリケーションのアイコンを示す URL。512×512 のサイズ |
| artistViewUrl                    | 文字列。開発元が公開しているアプリケーション一覧を示す URL     |
| supportedDevices                 | 配列。サポートしているデバイス                                 |
| fileSizeBytes                    | 数値。ファイルサイズ。単位はバイト                             |
| sellerUrl                        | 文字列。開発元のウェブサイトの URL                             |
| trackViewUrl                     | 文字列。アプリケーションの URL                                 |
| version                          | 文字列。アプリケーションのバージョン                           |
| userRatingCountForCurrentVersion | 数値。現在のバージョンのレーティング                           |
| description                      | 文字列。アプリケーションの説明                                 |
| artistName                       | 文字列。開発元の名称                                           |
| genres                           | 配列。アプリケーションのカテゴリー（ジャンル）                 |
| trackName                        | 文字列。アプリケーションの名称                                 |
| releaseDate                      | 文字列。アプリケーションの初期バージョンのリリース日           |
| formattedPrice                   | 文字列。整形されたアプリケーションの価格。0 円の場合は「無料」 |
| currentVersionReleaseDate        | 文字列。現在のバージョンのリリース日                           |
| averageUserRating                | 数値。ユーザレビューの平均値                                   |
| userRatingCount                  | 数値。ユーザレビューの件数                                     |

弊サイトで適用した場合のリンクは以下のようになります。（スクリーンショットを掲載しています）

![](/images/2016/05/160510-5731d28051ea6.png)

![](/images/2016/05/160510-5731d2926f059.png)

![](/images/2016/05/160510-5731d29db84cb.png)

### ポイント

iTunes Link Builder のポイントを簡単にご紹介します。応用すれば、Amazon Link Builder なんてものも作れそうです。

- `wp_embed_register_handler()`でパターンにマッチした URL をショートコードに変換する
- 毎回、iTunes Search API を使用してアプリの情報を取得すると、WordPress の動作が重くなるので、取得した情報は WordPress の Transient API を使用してキャッシュとして保持する（キャッシュ期間は１日）。取得した情報は下図のようにデータベースにシリアライズされて保持されます
- テーマや CSS が変わった場合に変更するのは、このクラスの`display()`関数だけ！
- App Store、Mac App Store の価格情報はセールなどで随時変更されるため書き方に要注意
- 場合によっては動かないことがあるかもしれません。コメント欄で教えていただけると助かります

![](/images/2016/05/160510-5731d1f1ba742.png)

## まとめ

とりあえず、お試しで作成してみました。すでに似たようなプラグインは多数公開されているかもしれませんが、機能を最低限に絞りました。ご要望やバグ発見時にはコメント欄、または[@ottanxyz](https://twitter.com/ottanxyz)まで教えてくださいね。
