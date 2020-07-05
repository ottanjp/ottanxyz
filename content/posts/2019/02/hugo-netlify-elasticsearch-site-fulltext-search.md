---
author: ["@ottanxyz"]
date: 2019-02-02T00:00:00+00:00
draft: false
title: "Netlify + Hugo + Elasticsearchで静的サイトの全文検索を行う"
type: post
slug: hugo-netlify-elasticsearch-site-fulltext-search-20190202
categories: ['Blog']
tags: ['Netlify','Hugo','Elasticsearch']
toc: true
---

![](/uploads/2019/02/190202-f3634302e706e67.png)

静的サイトにおけるサイト内全文検索の実装例をご紹介します。個人ブログにおける趣味の範囲内です。また、個人ブログのため、料金を抑える方針で検討します。

WordPressなどのCMSは標準で検索機能を有しています。しかし、静的サイトではビルド時にすべてのページが生成されます。そのため、WordPressのように検索時に毎回動的なページを作成できません。

## ビルド時に全文検索用の静的ファイルを生成する

そこで考えられる方法として挙げられるのが、静的サイトのビルド時に全文検索用のインデックスファイルを生成する方法です。

たとえば、ビルド時に全ページのタイトルやコンテンツ情報を含むインデックスファイルを作成します。ユーザーが検索ボックスに単語を入力すると、ブラウザがあらかじめ作成したインデックスファイルの読み込み、検索を実施し、キーワードに一致した結果を表示するというものです。

ただし、この方法には欠点があります。それは、**ファイルサイズの肥大化**です。コンテンツの量に比例して、当たり前ですがインデックスのファイルサイズは大きくなります。たとえば、一般的なブログで検索に必要な要素としては、以下が挙げられます。

* コンテンツのタイトル
* コンテンツのパーマリンク（URL）
* コンテンツの**記事本文**

試しに弊サイトでJSON形式のインデックスファイルを生成したところ、1MB以上のファイルが生成されました。記事本文を含めず、タイトルとタグやカテゴリなどの付随情報にとどめておけば上記の心配はさほど大きくありませんが、全文検索をしたいという（個人的）要望を叶えることはできません。

## Googleカスタム検索を使用する

全文検索の要望を満たすだけであれば、Googleカスタム検索を設置する方法がもっとも簡単です。ただし、Googleカスタム検索では、フォームや検索結果のデザインがGoogleに左右される、広告が表示されるなど、サイトポリシーにそぐわないことがあります。Googleカスタム検索を利用したい場合は、下記リンクから検索エンジンを生成し、テンプレートファイルにコードを埋め込むだけで実装できます。

* [カスタム検索 - 検索エンジンの編集](https://cse.google.com/cse/all)

## Algoliaによる検索APIを使用する

[Algolia](https://www.algolia.com/)は、マネージド型の全文検索サービスです。また、[DocSearch](https://community.algolia.com/docsearch/)と呼ばれる技術文書のみを対象とした全文検索サービスもあります。Hugoの公式ドキュメントは後者を利用しています。

DocSearchが利用できれば、Algoliaのクローラーにインデックスをすべて任せ、あとはGoogleカスタム検索のようにテンプレートにスクリプトを埋め込むだけで実装できます。DocSearchは無償で利用できる素晴らしいサービスですが、当然のように制限事項があります。

>Your website must be a documentation website. We do not index blogs or commercial content.

ブログや商用コンテンツはインデックスの対象外とあるため、個人ブログで利用することはできません。

では、Algoliaはどうでしょうか。Algoliaにも無料プランが用意されています。ただし、無料プランには以下の制限事項があります。

* 登録できるドキュメント数は10,000
* インデックスの追加、更新、削除、および検索が50,000回/月

ドキュメントとは、ブログで言えば1つの記事に相当します。そのため、1点目の制限事項は個人ブログの範疇であれば何ら問題はありません。

問題は2点目です。Algoliaに対するすべてのオペレーション（操作）を1回とカウントし、その回数が50,000回/月に制限されています。ページビューとの兼ね合いになりますが、なかなか微妙な数値です。この制限事項が、Algoliaを個人ブログで採用できるかどうかの指標値になります。今回は、この2点目の制限事項を回避するために採用は見送ることとしました。

## Elasticsearch（Bonsai.io） + Netlify Functionsによる全文検索を構築する

Bonsaiは、Elasticsearchのマネージド型サービスです。Hugoの公式ドキュメントでも紹介されています。AWS Elasticsearch Serviceなどさまざまなサービスが存在する中、Bonsaiは商用利用以外の範囲内では無料で使用できます。

* [Search for your Hugo Website | Hugo](https://gohugo.io/tools/search/#readout)

ただし、当然ですが無料プランには制限事項があります。

* 登録できるドキュメント数の上限は10,000まで
* 登録できるデータサイズの上限は125MBまで
* 使用できるシャード数は10まで
* 使用できるサーバーリソースであるメモリは125MBまで
* 読み取り専用のAPIは利用不可
* 同時接続数は1まで

Algoliaとの違いは、オペレーション（検索、追加、更新、削除）の利用数に上限が設定されていない点です。個人ブログで問題になるのは、読み取り専用のAPIと同時接続数です。

同時接続数は、サイト内検索の利用頻度が大きくないサイトであれば、さほど気になりません。問題は前者です。

無料プランでBonsaiが提供するElasticsearchのAPIにアクセスするためには、必ずクレデンシャル情報[^1]を含める必要があります。クレデンシャル情報を含めることで、ドキュメントの検索のみならず、インデックスの追加、更新、削除を行うことができます。

[^1]: クレデンシャル情報は、BonsaiのAPIを利用するためのAccess Key、Access Secretを指します。

このクレデンシャル情報が漏洩した場合、誰でもインデックスを改ざんできてしまうことになります。

静的サイトからBonsaiのAPIにアクセスする方法として考えられるのは、ElasticsearchのJavascript APIを利用する方法です。

* [elastic/elasticsearch-js: Official Elasticsearch client library for Node.js and the browser](https://github.com/elastic/elasticsearch-js)

しかし、前述のようにBonsaiのAPIへアクセスするにはクレデンシャル情報を含める必要があります。ただし、JavaScript内にクレデンシャル情報を直接埋め込むことは、インデックスを改ざんしてくださいと、第三者に開示しているようなものです。

### Netlify Functions（Lambda）の環境変数でクレデンシャル情報を渡す

クレデンシャル情報を隠蔽するためには、スクリプトの外に出すしかありません。JavaScriptを難読化してクレデンシャル情報を暗号化する方法も考えられますが、露呈していることに変わりはありません。

そこで考えられる方法として、無料の範囲内で実施するのであれば、Netlify Functionsにラッピングした上で環境変数としてクレデンシャル情報を渡すことです。弊サイトの実装方法も概ねそのようになっています。

ただ、Netlify Functionsを使用するということは、同サービスの制限（125,000リクエスト/月など）を受けることになります。詳細は以下をご覧ください。その他にもAWS Lambdaを使用する方法（そもそもNetlify FunctionsもLambdaのラッパー）等がありますが、今回は割愛します。

* [Netlify Functions（AWS Lambda）で学ぶサーバレスプログラミングの基本](/posts/2019/01/netlify-functions-aws-lambda-serverless-20190115/)

### Bonsai.ioの使い方

では、具体的なElasticsearch（Bonsai.io）の使い方をご紹介します。Hugo向けのドキュメントがすでに用意されているため、そちらを参照しながらご覧ください。なお、記事執筆時点ですが、Bonsai.ioで使用可能なElasticsearchのバージョンは`6.2.4`でした。

* [Hugo · Bonsai](https://docs.bonsai.io/docs/hugo)

#### 全文検索インデックスの作成

まずは、Elasticsearchに全文検索で使用するインデックスを作成しましょう。URLはダッシュボードの「Access」から確認できます。また、サンプルには記載されていませんが、URLの末尾に`pretty`を付与することで、レスポンス（JSON形式）が整形されて表示されます。

```bash
curl -XPUT https://user123:pass456@my-awesome-cluster-1234.us-east-1.bonsai.io/hugo?pretty
```

#### bonsai.htmlの作成

続いて、Elasticsearchに登録するためのファイルを生成します。Elasticsearchには、`bulk`と呼ばれるAPIが用意されており、一括でドキュメントを登録できます。`bulk`のパラメータは、ndJSON（Newline Delimited JSON）形式で作成する必要があります。ndJSONは、文字通り改行（`\n`）で区切られたJSON形式のファイルです。**ファイルの末尾に改行を含む必要があります**ので注意してください。また、**\n以外の改行コードを含むことはできません**。とくに、Windowsで作業している場合は注意してください。

`layouts/_default/list.bonsai.html`を作成します。サンプルではJSONファイル（`list.bonsai.json`）として生成していますが、あえてHTMLファイルとしています。`hugo`コマンドがndJSONを認識できないため、`--minify`オプションを付与してビルドした際にエラーが発生するのを避けるためです。（`text/plain`などでも良いです）また、全文検索用インデックスを作成するため、`.Summary`の代わりに`.Plain`を出力するように変更しています。

```go
{{/* Generates a valid Elasticsearch _bulk index payload */}}
{{- $section := $.Site.GetPage "section" .Section }}
{{- range .Site.AllPages -}}
  {{- if or (and (.IsDescendant $section) (and (not .Draft) (not .Params.private))) $section.IsHome -}}
    {{/* action / metadata */}}
    {{ (dict "index" (dict "_index" "hugo" "_type" "doc"  "_id" .UniqueID)) | jsonify }}
    {{ (dict "objectID" .UniqueID "date" .Date.UTC.Unix "description" .Description "dir" .Dir "expirydate" .ExpiryDate.UTC.Unix "fuzzywordcount" .FuzzyWordCount "keywords" .Keywords "kind" .Kind "lang" .Lang "lastmod" .Lastmod.UTC.Unix "permalink" .Permalink "publishdate" .PublishDate "readingtime" .ReadingTime "relpermalink" .RelPermalink "content" .Plain "title" .Title "type" .Type "url" .URL "weight" .Weight "wordcount" .WordCount "section" .Section "tags" .Params.Tags "categories" .Params.Categories "authors" .Params.authors) | jsonify }}
  {{- end -}}
{{- end }}
```

続いて`config.toml`の修正です。HugoのCustom Output Formatsに「Bonsai」フォーマットを追加します。サンプルから変更している箇所はコメントアウトしています。前述の通り、JSON形式として出力してしまうと、`--minify`時にエラーとなるため`HTML`として出力します。（`text/plain`のほうが自然かもしれません）

```toml:config.toml
[outputs]
home = ["HTML", "RSS", "Bonsai"]

[outputFormats.Bonsai]
baseName = "bonsai"
isPlainText = true
# mediaType = "application/json"
mediaType = "text/html"
notAlternative = true

[params.bonsai]
vars = ["title", "content", "date", "publishdate", "expirydate", "permalink"]
# vars = ["title", "summary", "date", "publishdate", "expirydate", "permalink"]
params = ["categories", "tags"]
```

最後に、`hugo`コマンドでビルドします。ビルドに成功したら、`public/bonsai.html`が生成されているはずです。

#### Elasticsearchへインデックスを登録

生成したndJSONをもとに、Elasticsearchへインデックスを登録しましょう。`_bulk`を使用する場合、`--data-binary`オプションを使用して生成したndJSONのパスを指定してください。また、`Content-Type`に`application/x-ndjson`を指定します。

```bash
curl -H "Content-Type: application/x-ndjson" -XPOST "https://user123:pass456@my-awesome-cluster-1234.us-east-1.bonsai.io/_bulk?pretty" --data-binary @public/bonsai.html
```

#### Elasticsearch検索用スクリプト（バックエンド）

最後に、Elasticsearchで全文検索するためのスクリプトの一例をご紹介します。Elasticsearchは多機能であり、ここでご紹介する方法はその一例に過ぎません。詳細は、Elasticsearchの公式ドキュメントを参照してください。

まず、Elasticsearchの公式パッケージをインストールします。プロダクション環境にバンドルしたいので、`-D`オプションは使用しません。

```bash
yarn add elasticsearch
```

Elasticsearchから特定の単語が含まれる文字列を検索するサンプルです。下記は、Netlify Functions（Lambda）用の書き方になっています。また、クレデンシャル情報をそのままスクリプト内に埋め込んでいますが、実際は環境変数などスクリプトの外部から取得するようにしましょう。Node.jsで環境変数を取得する場合は`dotenv`が便利です。ポイントとなる箇所にコメントを記していますので参考にしてください。

```js
import elasticsearch from 'elasticsearch'

exports.handler = async (event, context) => {
	const client = new elasticsearch.Client({
		// 実際はクレデンシャル情報は外部から取得する
		hosts: ['https://user123:pass456@my-awesome-cluster-1234.us-east-1.bonsai.io/'],
	})
	return client
		.search({
			// 'title'または'content'にクエリ文字列が含むドキュメントを検索
			body: {
				query: {
					bool: {
						should: [
							{ term: { 'title': event.queryStringParameters.q } },
							{ term: { 'content': event.queryStringParameters.q } },
						],
					},
				},
				// スコア（一致率）の高い最初の10件のみ取得
				size: 10,
				// 'title'と'relpermalink'フィールドのみ取得
				_source: ['title', 'relpermalink'],
			},
		})
		.then(res => ({
			statusCode: 200,
			// ドメインをまたいだリクエストを有効化（ほんとはドメイン指定が良い）
			headers: { 'Access-Control-Allow-Origin': '*' }, 
			body: JSON.stringify(res.hits.hits, null, 2),
		}))
}
```

#### Elasticsearch検索用スクリプト（フロントエンド）

検索専用のページを別途作成しても良かったのですが、今回はメニューバーに統合しました。また、ユーザーが検索ボックスに値を入力したことを検知するために、Vue.jsを使用しました。Vue.jsと組み合わせることで、検索ボックスの値と検索結果を容易に連動できます。

当初は、インクリメンタルサーチのように、検索ボックスの値とリアルタイムの連動を考えていました。しかし、Netlify Functionsのリクエスト回数に制限があることから、リクエストの間隔をあけて送信することにしました。その際に、lodashを使用しました。

```js
...
	// Go Templateのデリミタとの重複を避ける
	delimiters: ['[[', ']]'],
...
	created: function() {
	       // サーバ負荷軽減のため500msに1回リクエストを送信する
		this.debouncedSearch = _.debounce(this.search, 500)
	},
	methods: {
		search: function() {
			if (this.query.length === 0) {
				this.results = []
				return
			}
			// 実際は環境変数からURLを取得する
			fetch('http://localhost:9000/search?q=' + this.query, {
				// ドメインをまたいだリクエストを有効化
				mode: 'cors',
			})
				.then(response => {
					return response.json()
				})
				.then(results => {
					this.results = results
				})
		},
	},
	watch: {
		query: function() {
			this.debouncedSearch()
		},
	},
...
```

## 参考リンク

* [Hugo · Bonsai](https://docs.bonsai.io/docs/hugo)
* [Search for your Hugo Website | Hugo](https://gohugo.io/tools/search/#readout)
* [elasticsearch.js | Elastic](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
* [elastic/elasticsearch-js: Official Elasticsearch client library for Node.js and the browser](https://github.com/elastic/elasticsearch-js)
* [Build A Real-time Search Engine With Node, Vue and ElasticSearch ― Scotch.io](https://scotch.io/tutorials/build-a-real-time-search-engine-with-node-vue-and-elasticsearch)
* [Vue.js](https://jp.vuejs.org/index.html)
* [Lodash Documentation](https://lodash.com/docs/4.17.11)
