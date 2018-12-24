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
- WordPress
tags:
- Development
---

![](/images/2016/05/160510-5731d1e0800c7.jpg)






WordPressを使用していて、App StoreやMac App Storeに公開されているiPhone、iPad、Macのアプリケーションを紹介する際に、アフィリエイトリンクを貼り付けている方は多数いらっしゃると思います。





アフィリエイトリンクを生成する方法は、アップルが公開している[iTunes Link Maker](https://linkmaker.itunes.apple.com/en-us/?country=jp)を使用したり、多数公開されているプラグインやウィジェットを使用する方法があるかと思いますが、今回はApp StoreやMac App StoreのアプリケーションのURLを、WordPressの本文に貼り付けるだけでアフィリエイトのリンクを簡単に生成できる方法をご紹介します。





## App StoreのURLからアフィリエイトリンクを生成する





以下のソースコードを**class-itunes-link-builder.php**という名前で保存して、テーマの**functions.php**から読み込んでください。直接、**functions.php**に書き込んでもいいですが、長くなるので分割した方が可読性は良くなると思います。



{{< gist ottanxyz fa722621d551eb76c6302166681c10a2 >}}



原理は、[プラグインを使わずにGistのコードをWordPressに埋め込む方法](https://ottan.xyz/gist-wordpress-embed-4108/)でご紹介した方法と同様です。ポイントとなるのは、`wp_embed_register_handler()`関数です。詳細は、[wp_embed_register_handler() | Function | WordPress Developer Resources](https://developer.wordpress.org/reference/functions/wp_embed_register_handler/)を参照してください。



https://ottan.xyz/gist-wordpress-embed-4108/



### 使い方と制限事項





iTunes Link Builder（と呼んでいます）の簡単な使い方と制限事項です。






  * `ITUNES_AFFILIATE_TAG`は、iTunesアフィリエイトプログラムにログインして確認した、アフィリエイトトークンに置換してください（下記リンク参照）
  * 対象となるURLは、`https://itunes.apple.com/jp/`から始まるURLのみです
  * 対象となるのは、iPhone、iPad、Macアプリケーションのみです。ミュージック、映画、Podcast、Apple Musicなどには対応していません
  * テンプレートとなるHTMLは各サイトに合わせて自由に改変して使用してください
  * `$results`変数で取得できる項目は、[iTunes Search API – iTunes Affiliate Resources](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/)を参照してください（ここにもすべては書かれていないようなのですが…）
  * テンプレートに表示したい項目に応じて`$results`変数から値を取得してください。


https://itunes.phgconsole.performancehorizon.com/login/itunes/jp



`$results`変数から取得できる値の代表的なものを紹介します。`$results->XXXXX`の`XXXXX`の部分を紹介します。






<table >
<tr >項目内容</tr>
<tr >
<td >screenshotUrls
</td>
<td >配列。アプリケーションのスクリーンショットのURL
</td></tr>
<tr >
<td >artworkUrl60
</td>
<td >文字列。アプリケーションのアイコンを示すURL。60×60のサイズ
</td></tr>
<tr >
<td >artworkUrl100
</td>
<td >文字列。アプリケーションのアイコンを示すURL。100×100のサイズ
</td></tr>
<tr >
<td >artworkUrl512
</td>
<td >文字列。アプリケーションのアイコンを示すURL。512×512のサイズ
</td></tr>
<tr >
<td >artistViewUrl
</td>
<td >文字列。開発元が公開しているアプリケーション一覧を示すURL
</td></tr>
<tr >
<td >supportedDevices
</td>
<td >配列。サポートしているデバイス
</td></tr>
<tr >
<td >fileSizeBytes
</td>
<td >数値。ファイルサイズ。単位はバイト
</td></tr>
<tr >
<td >sellerUrl
</td>
<td >文字列。開発元のウェブサイトのURL
</td></tr>
<tr >
<td >trackViewUrl
</td>
<td >文字列。アプリケーションのURL
</td></tr>
<tr >
<td >version
</td>
<td >文字列。アプリケーションのバージョン
</td></tr>
<tr >
<td >userRatingCountForCurrentVersion
</td>
<td >数値。現在のバージョンのレーティング
</td></tr>
<tr >
<td >description
</td>
<td >文字列。アプリケーションの説明
</td></tr>
<tr >
<td >artistName
</td>
<td >文字列。開発元の名称
</td></tr>
<tr >
<td >genres
</td>
<td >配列。アプリケーションのカテゴリー（ジャンル）
</td></tr>
<tr >
<td >trackName
</td>
<td >文字列。アプリケーションの名称
</td></tr>
<tr >
<td >releaseDate
</td>
<td >文字列。アプリケーションの初期バージョンのリリース日
</td></tr>
<tr >
<td >formattedPrice
</td>
<td >文字列。整形されたアプリケーションの価格。0円の場合は「無料」
</td></tr>
<tr >
<td >currentVersionReleaseDate
</td>
<td >文字列。現在のバージョンのリリース日
</td></tr>
<tr >
<td >averageUserRating
</td>
<td >数値。ユーザレビューの平均値
</td></tr>
<tr >
<td >userRatingCount
</td>
<td >数値。ユーザレビューの件数
</td></tr>
</table>






弊サイトで適用した場合のリンクは以下のようになります。（スクリーンショットを掲載しています）





![](/images/2016/05/160510-5731d28051ea6.png)






![](/images/2016/05/160510-5731d2926f059.png)






![](/images/2016/05/160510-5731d29db84cb.png)






### ポイント





iTunes Link Builderのポイントを簡単にご紹介します。応用すれば、Amazon Link Builderなんてものも作れそうです。






  * `wp_embed_register_handler()`でパターンにマッチしたURLをショートコードに変換する
  * 毎回、iTunes Search APIを使用してアプリの情報を取得すると、WordPressの動作が重くなるので、取得した情報はWordPressのTransient APIを使用してキャッシュとして保持する（キャッシュ期間は１日）。取得した情報は下図のようにデータベースにシリアライズされて保持されます
  * テーマやCSSが変わった場合に変更するのは、このクラスの`display()`関数だけ！
  * App Store、Mac App Storeの価格情報はセールなどで随時変更されるため書き方に要注意
  * 場合によっては動かないことがあるかもしれません。コメント欄で教えていただけると助かります




![](/images/2016/05/160510-5731d1f1ba742.png)






## まとめ





とりあえず、お試しで作成してみました。すでに似たようなプラグインは多数公開されているかもしれませんが、機能を最低限に絞りました。ご要望やバグ発見時にはコメント欄、または[@ottanxyz](https://twitter.com/ottanxyz)まで教えてくださいね。
