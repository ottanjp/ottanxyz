---
author: ottan
date: 2016-05-14 07:01:19+00:00
draft: false
title: WordPressの本文にAmazonのURLを貼り付けるだけで、アフィリエイトリンクを生成できるようにする
type: post
url: /wordpress-amazon-link-affiliate-6864/
categories:
- Blog
tags:
- Development
---

![](/images/2016/05/160514-5736a89e598ca.png)






先日、[WordPressの本文にApp StoreのURLを貼り付けるだけで、アフィリエイトリンクを生成できるようにする](/wordpress-app-store-itunes-link-affiliate-6862/)で、App StoreのURLをWordPressの本文に貼り付けるだけで、アフィリエイトリンクを作成する方法をご紹介しましたが、今回はAmazon版です。



https://ottan.xyz/wordpress-app-store-itunes-link-affiliate-4120/



Amazonの商品情報を取得するためには、Amazon Product Advertising APIを使用します。このAPIの制約の1つに、「1リクエスト/秒」という制限があります。この制約を超えて使用した場合、リクエストに制限を受けてしまう可能性があるため、これを回避するためにも、前回と同様、一度取得した情報はWordPressのキャッシュとして保存するようにします。





## AmazonのURLからアフィリエイトリンクを生成する





AmazonのURLは複雑です。単純にAmazonのリンクを貼り付けるだけで、そのURLを動的に解析してアフィリエイトリンクを生成するのは至難の技です。





また、Amazon Product Advertising APIの利用方法も複雑です。そのため、GitHubで公開されているライブラリを使用します。





### AmazonのURLを編集する





たとえば、Kindle Paperwhiteの詳細ページのURLは以下のような構造をしています。今回は、このURLに含まれる`B00QJDOM6U`というキーワードに注目します。これは、ASIN（Amazon Standard Identification Number）と呼ばれる、Amazonで販売されている商品を識別するための一意のIDです。これをキーにAmazonの商品情報を検索できます。









しかし、毎回毎回Amazonの商品ページからASINを探し出すのは非常に面倒です。そこで、以下のブックマークレットを使用します。任意のページをブックマークに追加し、アドレスに以下のコードを貼り付けます。



https://gist.github.com/ottanxyz/18dbf434402fdb4abdd2b27d5d17df04



たとえば、Safariのお気に入りに追加する場合は、以下のようなイメージです。ブックマークの名称は任意に変更してください。





![](/images/2016/05/160514-5736c638448c6.png)






そして、Amazonの商品詳細ページを開いた状態で、作成したブックマークレットをクリックすると、以下のようなURLに自動的に遷移します。下記は、先ほどのKindle Paperwhiteの場合です。





    http://www.amazon.co.jp/dp/B00QJDOM6U





実は、AmazonのURLは、`http://www.amazon.co.jp/dp/<ASIN番号>`という形式でもアクセスできるようになっています。WordPressの本文にはこのURLを貼り付けて使用するようにします。





### Amazon Product Advertising APIを使用してAmazonの商品情報を取得する





次に、Amazon Product Advertising APIを使用するための事前準備を行います。APIを使用するためには、Amazon Web Services（AWS）のアカウントと、アクセスキーID、秘密アクセスキーが必要です。AWSのアカウントのメールアドレスは、Amazonアソシエイトで使用しているメールアドレスと同一である必要があります。以下のリンクから新規作成してください。



https://affiliate.amazon.co.jp/gp/advertising/api/detail/main.html



また、アクセスキーIDと秘密アクセスキーは、以下のURLを参照して取得してください。



http://www.ajaxtower.jp/ecs/pre/index1.html



次に、Amazon Product Advertising APIを使用するためのライブラリをダウンロードします。以下のリンクにアクセスしてください。



https://github.com/Exeu/apai-io



![](/images/2016/05/160514-5736a8ae537ea.png)






「Download ZIP」と書かれたリンクからZIPファイルをダウンロードしてください。





![](/images/2016/05/160514-5736a8b8382e5.png)






解凍してできたフォルダー（apai-io-master）の中の「lib」フォルダーの中にある「ApaiIO」というフォルダーをコピーしておいてください。





![](/images/2016/05/160514-5736a8c560044.png)






次に、以下のソースコードを**class-amazon-link-builder.php**という名称で保存します。このPHPファイルと同一階層に先ほどコピーした「ApaiIO」フォルダーをコピーします。そして、**functions.php**から、**class-amazon-link-builder.php**を読み込んでください。



https://gist.github.com/ottanxyz/4a44a5094bf27606c12803590a92d131






#### 2016/05/20追記




価格情報を取得できないことがあるためソースコードを一部修正しました。詳細はGistをご覧ください。








### Amazon Link Builderの使い方と制限事項





今回ご紹介したAmazon Link Builderの使い方と制限事項です。






  * `AWS_API_KEY`には、事前に取得したAWSのアクセスキーIDを入力してください
  * `AWS_API_SECRET_KEY`には、事前に取得したAWSの秘密アクセスキーを入力してください
  * `AWS_ASSOCIATE_TAG`には、Amazonアソシエイトタグ（`XXXXX-22`の形式）を入力してください
  * 対象となるURLは、`http://www.amazon.co.jp/dp/<ASIN番号>`という形式のみです
  * 上記URLの変換には、冒頭でご紹介したブックマークレットを使用すると便利です
  * テンプレートとなるHTMLは各サイトに合わせて自由に改変して使用してください
  * `$results`変数に格納されている値は連想配列です。取得できる項目は以下を参照してください




`$results`変数で取得できる項目は以下の通りです。テンプレートとなるHTMLに応じて取得する値を変更してください。





    array (size=9)
      'ASIN' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'B00QJDOM6U'</font> (length=10)
      'ParentASIN' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'B00U878M00'</font> (length=10)
      'DetailPageURL' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'http://www.amazon.co.jp/Amazon-DP75SDI-Kindle-Paperwhite-Wi-Fi%E3%80%81%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF/dp/B00QJDOM6U%3Fpsc%3D1%26SubscriptionId%3DAKIAJGFJDDBQ6RAL7MGA%26tag%3Dottan-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00QJDOM6U'</font> (length=267)
      'ItemLinks' <font color="#888a85">=></font>
        array (size=1)
          'ItemLink' <font color="#888a85">=></font>
            array (size=4)
              0 <font color="#888a85">=></font>
                array (size=2)
                  ...
              1 <font color="#888a85">=></font>
                array (size=2)
                  ...
              2 <font color="#888a85">=></font>
                array (size=2)
                  ...
              3 <font color="#888a85">=></font>
                array (size=2)
                  ...
      'SmallImage' <font color="#888a85">=></font>
        array (size=3)
          'URL' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'http://ecx.images-amazon.com/images/I/51ra15u4L0L._SL75_.jpg'</font> (length=60)
          'Height' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'75'</font> (length=2)
          'Width' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'75'</font> (length=2)
      'MediumImage' <font color="#888a85">=></font>
        array (size=3)
          'URL' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'http://ecx.images-amazon.com/images/I/51ra15u4L0L._SL160_.jpg'</font> (length=61)
          'Height' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'160'</font> (length=3)
          'Width' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'160'</font> (length=3)
      'LargeImage' <font color="#888a85">=></font>
        array (size=3)
          'URL' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'http://ecx.images-amazon.com/images/I/51ra15u4L0L.jpg'</font> (length=53)
          'Height' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'500'</font> (length=3)
          'Width' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'500'</font> (length=3)
      'ItemAttributes' <font color="#888a85">=></font>
        array (size=24)
          'Binding' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'エレクトロニクス'</font> (length=24)
          'Brand' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'Amazon'</font> (length=6)
          'CatalogNumberList' <font color="#888a85">=></font>
            array (size=1)
              'CatalogNumberListElement' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'53-003587'</font> (length=9)
          'Color' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'ブラック'</font> (length=12)
          'EAN' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'0848719056617'</font> (length=13)
          'EANList' <font color="#888a85">=></font>
            array (size=1)
              'EANListElement' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'0848719056617'</font> (length=13)
          'Feature' <font color="#888a85">=></font>
            array (size=7)
              0 <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'カラーは定番のブラックに新色のホワイト'</font> (length=57)
              1 <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'小さな文字もくっきりキレイ。300ppiの高解像度で今まで以上に美しく'</font> (length=93)
              2 <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'直接目を照らさないフロントライト方式で、目に優しい'</font> (length=75)
              3 <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'紙のように読みやすいEインクで長時間の読書も疲れにくい'</font> (length=79)
              4 <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'軽くて持ちやすいから、通勤・通学中も片手で読書'</font> (length=69)
              5 <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'本棚のスペースに困らない。数千冊がこの一台に(一般的な書籍の場合)'</font> (length=95)
              6 <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'最新のベストセラーなど豊富な品ぞろえを低価格で。無料で読める名作も'</font> (length=99)
          'ItemDimensions' <font color="#888a85">=></font>
            array (size=4)
              'Height' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'36'</font> (length=2)
              'Length' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'665'</font> (length=3)
              'Weight' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'45'</font> (length=2)
              'Width' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'461'</font> (length=3)
          'Label' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'Amazon'</font> (length=6)
          'ListPrice' <font color="#888a85">=></font>
            array (size=3)
              'Amount' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'16280'</font> (length=5)
              'CurrencyCode' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'JPY'</font> (length=3)
              'FormattedPrice' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'￥ 16,280'</font> (length=10)
          'Manufacturer' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'Amazon'</font> (length=6)
          'Model' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'DP75SDI'</font> (length=7)
          'MPN' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'DP75SDI'</font> (length=7)
          'PackageDimensions' <font color="#888a85">=></font>
            array (size=4)
              'Height' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'118'</font> (length=3)
              'Length' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'669'</font> (length=3)
              'Weight' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'84'</font> (length=2)
              'Width' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'512'</font> (length=3)
          'PartNumber' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'DP75SDI'</font> (length=7)
          'ProductGroup' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'Amazon Ereaders'</font> (length=15)
          'ProductTypeName' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'AMAZON_BOOK_READER'</font> (length=18)
          'Publisher' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'Amazon'</font> (length=6)
          'ReleaseDate' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'2015-06-30'</font> (length=10)
          'Size' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'4 GB'</font> (length=4)
          'Studio' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'Amazon'</font> (length=6)
          'Title' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'Kindle Paperwhite Wi-Fi、ブラック'</font> (length=38)
          'UPC' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'848719056617'</font> (length=12)
          'UPCList' <font color="#888a85">=></font>
            array (size=1)
              'UPCListElement' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'848719056617'</font> (length=12)
      'OfferSummary' <font color="#888a85">=></font>
        array (size=5)
          'LowestNewPrice' <font color="#888a85">=></font>
            array (size=3)
              'Amount' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'16280'</font> (length=5)
              'CurrencyCode' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'JPY'</font> (length=3)
              'FormattedPrice' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'￥ 16,280'</font> (length=10)
          'TotalNew' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'1'</font> (length=1)
          'TotalUsed' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'0'</font> (length=1)
          'TotalCollectible' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'0'</font> (length=1)
          'TotalRefurbished' <font color="#888a85">=></font> <small>string</small> <font color="#cc0000">'0'</font> (length=1)






### ポイント





Amazon Link Builderのポイントを簡単にご紹介します。






  * `wp_embed_register_handler()`でパターンにマッチしたURLをショートコードに変換する
  * 毎回、Amazon Product Advertising APIを使用して商品情報を取得すると、WordPressの動作が重くなるの、またAPIの制限に引っかかる可能性があるので、取得した情報はWordPressのTransient APIを使用してキャッシュとして保持する（キャッシュ期間は１日）
  * テーマやCSSが変わった場合に変更するのは、このクラスの`display()`関数だけ！
  * Amazonの価格情報はセールなどで随時変更されるため書き方に要注意
  * 場合によっては動かないことがあるかもしれません。コメント欄で教えていただけると助かります




## まとめ





とりあえず、お試しで作成してみました。すでに似たようなプラグインは多数公開されているかもしれませんが、機能を最低限に絞りました。ご要望やバグ発見時にはコメント欄、または[@ottanxyz](https://twitter.com/ottanxyz)まで教えてくださいね。
