---
author: ottan
date: 2019-01-15T22:34:55+09:00
draft: false
title: "無償で利用可能なNetlify Functions（AWS Lambda）で学ぶサーバレスプログラミングの基本"
type: post
url: /netlify-functions-aws-lambda-serverless-20190115/
categories: ['Blog']
tags: ['Netlify','AWS','Lambda','Hugo']
toc: true
---

![](/images/2019/01/190115-f3634302e6a7067.jpg)

これまでGo言語の静的サイトジェネレータであるHugoを使用してNetlifyにホスティングする方法をご紹介してきました。今回は、FaaS（Function as a Service）であるNetlify Functionsをご紹介します。また、改めてご紹介しますが、HugoとNetlify Functionsを組み合わせることで、WordPressのようなインタラクティブなサイトを構築することも可能です。

Netlify Functionsの実行基盤はAWS Lambdaです。ただし、無償プランでは以下の制限があります（いずれかの制限に達した時点で使用できなくなります）。開発者向け、個人向け用途としては十分です。GitHubやGitLabのリポジトリとNetlifyのアカウントがあれば、いますぐに始めることができます。

* 125,000 リクエスト/月
* 100 時間/月

サンプルを交えて、Netlify Functionsの使い方をご紹介します。これを機にサーバレスのアプリケーション実行基盤の魅力を味わってみてください。

## AWS LambdaとNetlify Functionsの違い

Netlify Functionsの実行基盤は前述の通りAWS Lambdaですが、以下の違いがあります。

* アプリケーションの実行環境は、原則Node.js 8.1xのみ。Netlify Functionsでは、Go言語も使用可能ですが今回は言及しません
* Netlify独自の環境変数`AWS_LAMBDA_JS_RUNTIME`に`nodejs6.10`を設定することでNode.js 6.10も使用可能（非推奨）

## ローカル環境でNetlify Functionsをエミュレートする

Netlifyへデプロイする前に、ローカル環境でNetlify Functionsをエミュレートできます。Netlify Functionsをローカル環境で使用する場合は、`netlify-lambda`をインストールしておきましょう。以下、筆者の好みでNode.jsのパッケージ管理に`yarn`を使用していますが、`npm`でも問題ありません。

```
yarn global add netlify-lambda
```

`netlify-lambda`の使い方は、以下の通りです。ローカルホストの9000番ポートを使用します。9000番ポートがすでに使用されている場合は実行に失敗します。既に9000番ポートを使用しているアプリケーションを終了した上で、Netlify Functionsを実行してください。

```bash
netlify-lambda serve <source-folder>
netlify-lambda build <source-folder>
```

### Netlify Functionsのサンプルダウンロード

Netlify Functionsの動作を確認するには、公式のGitHubのリポジトリがオススメです。

```
git clone https://github.com/netlify/functions
cd ./functions
yarn
yarn build
```

ただし、公式の`package.json`のパッケージのバージョンが古く、`yarn build`時にWARNINGが発生して気持ち悪いため`package.json`を更新します。

#### package.jsonの修正

`package.json`をテキストエディター等で開き、以下のパッケージを最新化してください。編集が完了したら、`yarn`でパッケージをインストールします。

```diff
18c18
<     "babel-loader": "^7.1.4",
---
>     "babel-loader": "^8.0.0",
26c26
<     "netlify-lambda": "^0.4.0",
---
>     "netlify-lambda": "^1.2.0",
28,29c28,29
<     "webpack": "^4.6.0",
<     "webpack-cli": "^2.0.15",
---
>     "webpack": "^4.20.2",
>     "webpack-cli": "^3.1.1",
```

### Node.jsのバージョン指定

Netlify Functionsでは、実行環境がNode.js 8.1x系に限られているため、ローカルホストのNode.jsの実行環境も変更しておきましょう。Node.jsの実行環境を仮想化する`nvm`が便利です。

```bash
nvm install 8.10
nvm use 8.10
```

#### nvm（Node Version Manager）のインストール方法

MacではHomebrewを使用してインストールできます。

```bash
brew install nvm
```

インストール後に、bashの場合は「.bashrc」、zshの場合は「.zshrc」に以下を追記しておきます。追記したら`source`でファイルを読み込むか、ターミナルを再起動します。

```bashrc
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

### サンプルスクリプト

準備が整ったら、`yarn start:server`を実行してNetlify Functionsをローカルホストで実行します。ターミナルで以下のように表示されたらビルドが完了しています。

```
$ netlify-lambda serve src/lambda -c webpack.server.js
netlify-lambda: Starting server
Lambda server is listening on 9000
...
         Asset      Size  Chunks             Chunk Names
      hello.js  1.04 KiB       2  [emitted]  hello
hello_async.js  1.03 KiB       3  [emitted]  hello_async
hello_slack.js  18.3 KiB       4  [emitted]  hello_slack
...
    + 386 hidden modules
```

なお、これからご紹介するサンプルスクリプトは、すべて`src/lambda`配下にあります。

#### Hello, World!

Netlify Functionsで最も基本となる、アクセスすると「Hello, World!」と表示するだけのサンプルアプリケーションです。ブラウザを開いて、以下のURLにアクセスしてください。Netlifyにデプロイ後は、`localhost:9000`をNetlifyのドメインに置き換えてください。

```http
http://localhost:9000/.netlify/functions/hello
```

ソースコードは以下の通りです。`handler`関数をエクスポートすること、また`handler`関数の持つ引数はすべてAWS Lambdaと共通であることがわかります。コールバック関数の呼び方もAWS Lambdaと同様です。`callback`の第1引数について、正常時は`null`、エラーの場合は具体的なエラーの内容を記述しましょう。

```javascript
exports.handler = function(event, context, callback) {
	callback(null, {
		statusCode: 200,
		body: 'Hello, World',
	});
};
```

ただし、`event`や`context`の引数の内容自体は、Netlify独自のものです。また、AWS Lambdaよりバリエーションは少なくなっています。

`event`引数から取得できるパラメータは以下の通りで、公式ドキュメントにも記載があります。

```json
{
    "path": "Path parameter", // リクエストのパス
    "httpMethod": "Incoming request's method name", // HTTPメソッド（GET、POST等）
    "headers": {"headerName": "headerValue", ... }, // HTTPヘッダ
    "queryStringParameters": {"queryName": "queryValue", ...}, // クエリ文字列
    "body": "A JSON string of the request payload.", // リクエスト文字列
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode" // リクエストがBase64でエンコードされているかどうか
}
```

また、`context`にはNetlifyのIdentity APIを使用している場合、ユーザーのコンテキスト情報が格納されています。使用していない場合、空のオブジェクトが格納されます。

```json
{ clientContext: {} }
```

AWS Lambdaのように、呼び出された関数名等を`context`パラメータから取得することはできませんので注意してください。

* [Functions | Netlify](https://www.netlify.com/docs/functions/#event-triggered-functions)
* [Identity | Netlify](https://www.netlify.com/docs/identity/)

#### 非同期でHello, World!

続いて、`async`キーワードを使用するパターンです。Node.js 8.1x系で使用可能です（つまりデフォルト）。

```http
http://localhost:9000/.netlify/functions/hello_async
```

`async`キーワードとアロー関数を使用することで、より見やすく記述できます。環境変数にNode.js 6.10を指定した場合、下記の書き方は実行時にエラーとなりますので注意してください。

```javascript
exports.handler = async (event, context) => {
	return {
		statusCode: 200,
		body: 'Hello, World',
	};
	// エラーを返却したい場合は、throw new Error('...');
};
```

#### 指定されたパラメータでHello, World!

もう少し実用的な例を挙げましょう。パラメータに指定した文字列を受け取り、画面に表示する例を考えます。GETメソッド、POSTメソッドを使用した場合で挙動が異なります。

```http
http://localhost:9000/.netlify/functions/hello_name?name=World
```

まずは、GETメソッドを使用した場合の例です。`event`引数の`queryStringParameters`オブジェクトにすべてのパラメータが名前付きオブジェクトとして格納されているため、こちらから取得できます。

```javascript
exports.handler = async (event, context) => {
	const name = event.queryStringParameters.name || 'World';

	return {
		statusCode: 200,
		body: `Hello, ${name}`,
	};
};
```

続いて、POSTの場合の例です。GETかPOSTメソッドのどちらが使用されたかは、`event`引数の`httpMethod`で判定可能です。下記の例では、POST以外の場合、405エラーを返却しています。


```javascript
import querystring from 'querystring';

exports.handler = async (event, context) => {
	// Only allow POST
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	// When the method is POST, the name will no longer be in the event’s
	// queryStringParameters – it’ll be in the event body encoded as a query string
	const params = querystring.parse(event.body);
	const name = params.name || 'World';

	return {
		statusCode: 200,
		body: `Hello, ${name}`,
	};
};
```

注目は、パラメータ文字列の受け取り方法がGETメソッドの場合と異なる点です。GETメソッドの場合、`event`引数の`queryStringParameters`オブジェクトから値を取得できました。しかし、POSTメソッドで送信された内容を`queryStringParameters`で受け取ることはできません。POSTメソッドで送信された内容は`event`引数の`body`オブジェクトに含まれます。`body`オブジェクトは、Node.jsの`querystring`モジュールを使用することで簡単にクエリ文字列を取り出すことができます。

* [Query String | Node.js v11.6.0 Documentation](https://nodejs.org/api/querystring.html#querystring_query_string)

### 独自のアプリケーションを動作させてみよう

より具体的な例を挙げましょう。Google Playからアプリの情報をJSON形式で取得するアプリケーションを作成します。Google PlayはiTunes Libraryのような公式のAPIが用意されていないため、独自にGoogle PlayのWebページをクロールする必要があります。Google PlayをクロールするためのパッケージがNode.jsで公開されていますので、そちらを使用します。

```bash
yarn add google-play-scrapper
```

詳細は以下のリンクを参照してください。

* [google-play-scraper - npm](https://www.npmjs.com/package/google-play-scraper?activeTab=readme)

今回はGoogle PlayのアプリのIDを引数に渡すと、そのアプリの情報を取得してJSONとして結果を返却するアプリケーションをNode.jsで動かします。

```http
https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox
```

アプリのIDは、上記では`com.google.android.googlequicksearchbox`が該当します。このアプリのIDを引数として渡すと、そのアプリの詳細情報をJSON形式で返却するアプリケーションを作成します。`src/lambda/googleplay.js`を作成します。

```javascript
import gplay from 'google-play-scraper';

exports.handler = async (event, context) => {
	return gplay
		.app({
			appId: event.queryStringParameters.appId,
			lang: 'jp',
			country: 'jp',
		})
		.then(data => ({
			statusCode: 200,
			body: JSON.stringify(data, null, 2),
		}));
};
```

クエリ文字列の`appId`からアプリのIDを受け取るだけです。`app`メソッドは`Promise`オブジェクトを返却します。正常にアプリの情報を取得できた場合は、ステータスコード200とJSON形式の文字列を返却します。

準備が整ったら`yarn start:server`を実行します。

```http
http://localhost:9000/.netlify/functions/googleplay?appId=com.google.android.googlequicksearchbox
```

例えば、ブラウザから上記のURLにアクセスしてみてください。

```json
{
  "title": "Google",
  "description": "...",
  "descriptionHTML": "...",
  "summary": "Find quick answers, explore your interests, and stay up to date with Discover.",
  "installs": "1,000,000,000+",
  "minInstalls": 1000000000,
  "score": 4.407088,
  "scoreText": "4.4",
  "ratings": 9972148,
  "reviews": 2474866,
  "histogram": {
    "1": 632221,
    "2": 219211,
    "3": 644070,
    "4": 1437951,
    "5": 7038695
  },
  "price": 0,
  "free": true,
  "currency": "USD",
  "priceText": "Free",
  "offersIAP": false,
  "size": "Varies with device",
  "androidVersion": "VARY",
  "androidVersionText": "Varies with device",
  "developer": "Google LLC",
  "developerId": "5700313618786177705",
  "developerEmail": "apps-help@google.com",
  "developerWebsite": "https://www.google.com/search/about/",
  "developerAddress": "1600 Amphitheatre Parkway, Mountain View 94043",
  "privacyPolicy": "http://www.google.com/policies/privacy",
  "genre": "Tools",
  "genreId": "TOOLS",
  "icon": "https://lh3.googleusercontent.com/DKoidc0T3T1KvYC2stChcX9zwmjKj1pgmg3hXzGBDQXM8RG_7JjgiuS0CLOh8DUa7as",
  "headerImage": "https://lh3.googleusercontent.com/U8zDyTkJcCQFtKDeu4x8M2_-zIcVuF53fzipTAqZ4nY-ojbAjTNYhS_Z8SVNNysE5A",
  "screenshots": [
    "...",
    "..."
   ],
  "contentRating": "Rated for 3+",
  "adSupported": true,
  "released": "Aug 12, 2010",
  "updated": 1547227626000,
  "version": "Varies with device",
  "recentChanges": "...",
  "comments": ["..."],
  "appId": "com.google.android.googlequicksearchbox",
  "url": "https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox&hl=jp&gl=jp"
}
```

このようなJSON形式の文字列が返却されればOKです（上記では長いので一部内容を割愛しています）。冒頭のような制限事項はありますが、無償利用可能なAWS Lambdaで実行される使用できるAPIの完成です。太っ腹！

## Netlifyへのデプロイ

では、実際にNetlifyへデプロイしてみましょう。デプロイ手順は、以前[こちら](/netlify-cms-hugo-markdown-blog-7017/)で紹介した内容と同一のため割愛します。GitHubやGitLabにパブリック、またはプライベートリポジトリを作成し、Netlifyからのアクセスを許可するだけです。あとは指定したリポジトリに更新があった場合に、自動的にNetlify上へデプロイされます。

### netlify.toml

1点だけ注意があります。Netlify Functionsを使用する場合は、`netlify.toml`ファイルをルートディレクトリ上に作成します。ビルドに必要な情報、およびNetlify Functionsの実行ファイルの場所を指定してください。また、この情報は設定ファイルのみならず、GUI（ブラウザ）からも設定可能です。設定ファイルが存在する場合は、設定ファイルが優先されます。

```toml
[build]
  command = "yarn build:server"
  functions = "dist/server"
```

例えば、Netlify Functionsのサンプルをそのままデプロイする場合は、上記のように書きます。`command`に指定するコマンドは必ず`build`を指定してましょう。誤って`yarn start:server`と記載してしまうと、待ち受け状態となったままビルドが完了しません。Netlifyの自動デプロイをキャンセルする手段はないため、タイムアウト（30分）が経過するのを待つことになります。

## 関連リンク

* [netlify/functions: Playground repo for Netlify’s Lambda Functions](https://github.com/netlify/functions)
* [Functions | Netlify](https://www.netlify.com/docs/functions/)
* [Identity | Netlify](https://www.netlify.com/docs/identity/)
* [Query String | Node.js v11.6.0 Documentation](https://nodejs.org/api/querystring.html#querystring_query_string)
* [google-play-scraper - npm](https://www.npmjs.com/package/google-play-scraper?activeTab=readme)
