---
author: ["@ottanxyz"]
date: 2015-02-07 13:21:08+00:00
draft: false
title: Google Analyticsと連携してページビューの多い人気記事を表示する
type: post
slug: wordpress-google-analytics-789
categories:
- Blog
tags:
- Development
- Google
---

![](/uploads/2015/02/150206-54d4ceea3719a.jpg)

WordPressの人気記事を取得する手段は数多くあれど、信頼性の高い数値はやはりGoogle Analytics。そこで、今回は公開されているAPIを利用して、Google Analyticsからページビューを取得する方法をご紹介します。

## Google Analyticsと連携してPVを取得する

多少敷居が高いと感じるかもしれませんが、さほど難しい話ではありません。順を追って解説します。

### Google Developers Consoleに新規プロジェクトを登録する

<!-- textlint-disable -->
「Google APIs Client Library for PHP」を使用するには、Google AnalyticsにアクセスするためのサービスアカウントをGoogle Developers Consoleに登録する必要があります。
<!-- textlint-enable -->

<https://console.developers.google.com/project>

#### Google Developers Consoleの言語を日本語にする

Google Developers Consoleのデフォルトの言語は英語になっています。そのままでも構いませんが、日本語が用意されていますので、言語設定から変更してしまいましょう。Google Developers Consoleにアクセスしたら、「Account Settings」をクリックします。

![](/uploads/2015/02/150206-54d4ceeb2028d.png)

はじめてGoogle Developers Consoleを使用する場合、利用規約への同意が必要となります。チェックしたら、「Continue」をクリックしてください。

引き続き、「Language & Formats」から、「LANGUAGE」を「日本語」に変更します。変更したら「Save」をクリックします。以上で、日本語化は完了です。

![](/uploads/2015/02/150206-54d4ceed951a3.png)

### Google Analytics APIを使用するためのプロジェクト作成

次に、サイドメニューから「プロジェクト」を選択します。

![](/uploads/2015/02/150206-54d4ceefbb320.png)

「プロジェクトを作成」ボタンをクリックします。

![](/uploads/2015/02/150206-54d4cef0a633e.png)

プロジェクト名を入力します。プロジェクト名は任意で構いません。ここでは、弊サイトのブログ名としました。プロジェクトIDは自動的に割り振られるため意識する必要はありません。プロジェクト名を入力したら、「作成」をクリックします。

![](/uploads/2015/02/150206-54d4cef237dae.png)

### Google Analytics APIの有効化

続いて、作成したプロジェクトをクリックします。新規プロジェクトのデフォルトの状態では、「Google Analytics」を使用するためのAPIは無効になっているため有効化する必要があります。サイドメニューの「APIと認証」から、「API」をクリックします。

![](/uploads/2015/02/150206-54d4cef632be0.png)

「Analytics API」の「無効」ボタンをクリックすると有効になります。

![](/uploads/2015/02/150206-54d4cef4e1c98.png)

#### Analytics API利用上の注意点

Analytics APIの利用は、50,000 requests/dayと上限が定められています。通常の使用方法であれば、まず上限に達する可能性はないと思いますが、頭の片隅にでも気に留めておいてください。

続いて、Google Analyticsにアクセスするための認証情報を作成します。サイドメニューの「APIと認証」から「認証情報」をクリックします。

![](/uploads/2015/02/150206-54d4cef721a71.png)

「OAuth」の「新しいクライアントIDを作成」をクリックします。

![](/uploads/2015/02/150206-54d4d15b2aa1d.png)

今回は、バッチプログラムによる定期実行を想定しているため、「サービスアカウント」を選択します。

![](/uploads/2015/02/150206-54d4d15dcf312.png)

iPhoneやAndroidなどのアプリケーションからアクセスしたい場合は「インストールされているアプリケーション」を洗濯します。ブラウザからGoogle Analytics APIを使用して情報を取得したい場合は「ウェブアプリケーション」を選択します。

「サービスアカウント」を選択したら、「クライアントIDを作成」をクリックします。

「サービスアカウント」を選択した場合、Google Analytics APIを使用する場合の認証方式は公開鍵認証になります。そのため、クライアントIDを作成後、秘密鍵（拡張子が .p12 のファイル）が自動的にダウンロードされます。後で使用します。

#### 公開鍵認証とは

デジタル署名（正当性の電子証明）にも応用される方式で、秘密鍵、公開鍵のペアで認証を行います。秘密鍵の所有者のみが、公開鍵の所有者の情報を取得できます。

<http://www.adminweb.jp/web-service/ssh/index4.html>

以上で、認証情報の作成は完了です。クライアントID、メールアドレスは後で使用しますので控えておきましょう。

### Google Analyticsにサービスアカウントを登録する

続いて、Google Developers Consoleで作成したサービスアカウントが、Google Analyticsの情報を取得できるように権限の割当を行います。

<http://www.google.com/intl/ja_jp/analytics/>

Google Analyticsにアクセスしたら、画面上部のメニューから「アナリティクス設定」をクリックします。

![](/uploads/2015/02/150207-54d58295339d7.png)

Google Developers Consoleで作成したアカウントを登録するために、「ユーザー管理」をクリックします。

![](/uploads/2015/02/150207-54d582968db58.png)

「権限を付与するユーザー」にGoogle Developers Consoleで作成したサービスアカウントのメールアドレスを入力します。権限はデフォルトの「表示と分析」で構いません。

![](/uploads/2015/02/150207-54d5829864f1a.png)

続いて、Google Analytics APIからアクセスするためのビューの情報を取得します。「ビュー」から「ビュー設定」をクリックします。

![](/uploads/2015/02/150207-54d58299e751e.png)

ここに表示される「ビューID」を使用しますので控えておいてください。

![](/uploads/2015/02/150207-54d5829c23096.png)

### Google APIs Client Library for PHPのダウンロード

Googleの提供する各種サービスにアクセスするためのライブラリがGitHubで公開されています。以下のリンクからライブラリ（「Download ZIP」をクリック）をダウンロードしておきましょう。

<https://github.com/google/google-api-php-client/>

ダウンロードしたZIPファイルを解凍します。`examples`フォルダーには、Google APIを利用するための簡単なサンプルが用意されています。Google APIを利用する前に一度目を通しておくことをオススメします。実際に使用するライブラリは、`Google`フォルダー配下にあります。

    google-api-php-client-master
    ├── CONTRIBUTING.md
    ├── LICENSE
    ├── README.md
    ├── composer.json
    ├── examples
    └── src
        └── Google
            ├── Auth
            ├── Cache
            ├── Client.php
            ├── Collection.php
            ├── Config.php
            ├── Exception.php
            ├── Http
            ├── IO
            ├── Model.php
            ├── Service
            ├── Service.php
            ├── Signer
            ├── Utils
            ├── Utils.php
            └── Verifier

### Google Analyticsからページビューを取得する

準備は整いました。いよいよ、Google Analyticsへのアクセスを行います。今回は、弊サイトを運営しているレンタルサーバー 高速・高機能・高安定性の【エックスサーバー】を例に説明します。

#### Google Analyticsプログラムのディレクトリ構成

弊サイトのGoogle Analyticsプログラムのディレクトリ構成は以下の通りとなっています。

    .
    ├── script
    │   ├── xxxxx-privatekey.p12
    │   ├── Google
    │   │   ├── Auth
    │   │   ├── Cache
    │   │   ├── Client.php
    │   │   ├── Collection.php
    │   │   ├── Config.php
    │   │   ├── Exception.php
    │   │   ├── Http
    │   │   ├── IO
    │   │   ├── Model.php
    │   │   ├── Service
    │   │   ├── Service.php
    │   │   ├── Signer
    │   │   ├── Utils
    │   │   ├── Utils.php
    │   │   └── Verifier
    │   └── analytics.php
    └── public_html
        └── wp-blog-header.php

`xxxxx-privatekey.p12`は事前にダウンロードした秘密鍵です。WordPressが動作している`public_html`の外側に格納しています。`Google`は事前にダウンロードしたGoogle API Libraryです。こちらも、通常使用することはありませんので、秘密鍵と同一階層に置いています。 `analytics.php`がプログラム本体です。

#### analytics.phpのソースコード

**analytics.php**

```php
// WordPressの関数を外部から利用する
define('WP_USE_THEMES', false);
require('../public_html/wp-blog-header.php');

// Google APIs Client Library for PHPに対してパスを通す
set_include_path(__DIR__);

// Google APIs Clientの読み込み
require_once 'Google/Client.php';
require_once 'Google/Service/Analytics.php';

// Google Developers ConsoleのクライアントID
define('CLIENT_ID', 'XXXXX.apps.googleusercontent.com');

// Google Developers Consoleのメールアドレス
define('SERVICE_ACCOUNT_NAME', 'XXXXX@developer.gserviceaccount.com');

// Google Developers Consoleで生成された秘密鍵へのパス
define('KEY_FILE', 'XXXXX-privatekey.p12');

// Google アナリティクスのビューID
define('PROFILE_ID', 'XXXXX');

$client = new Google_Client();
$client->setApplicationName('Google Analytics for Macious');
$client->setClientId(CLIENT_ID);
$client->setAssertionCredentials(new Google_Auth_AssertionCredentials(
	SERVICE_ACCOUNT_NAME,
	array('https://www.googleapis.com/auth/analytics'),
	file_get_contents(KEY_FILE, true)
));

$service = new Google_Service_Analytics($client);
$results = $service->data_ga->get(
	'ga:' . PROFILE_ID,
	'2005-01-01',  // 開始日
	'2100-01-01',  // 終了日
	'ga:pageviews',
	array(
	'dimensions'  =>  'ga:pagePath', // 投稿記事のスラッグを取得
	'sort'      =>  '-ga:pageviews'  // ページビュー数で並べ替え
	// 'max-results'  =>  '-1'  //件数
	)
);

foreach ($results['rows'] as $result) {
	$post_url = home_url() . $result[0];

	// パーマリンクから投稿記事のIDを取得
	$post_id = url_to_postid($post_url);

	// 投稿記事、固定ページのみを取得
	// 投稿後に記事のタイトルを変更した場合、
	// 同一の$post_idが複数取得される可能性があるため排除
	if ($post_id <=0 || in_array($post_id, $check)) {
	continue;
	}

	// 投稿記事のIDから投稿情報を取得
	$post = get_post($post_id);

	// 投稿記事の状態が「publish」（公開済み）かつ、固定ページを除く
	if ('publish' === get_post_status($post) && 'post' === get_post_type($post)) {

	// wp_postmetaテーブルに投稿記事のID毎のPV数をアップデート
	update_post_meta($post->ID, '_custom_pageviews', $result[1]);
	}
	$check[] = $post_id;
}
```

順を追って説明します。以下、WordPressのデータベース名称のプレフィックスは`wp_`であることを前提とします。

```php
// WordPressの関数を外部から利用する
define('WP_USE_THEMES', false);
require('../public_html/wp-blog-header.php');
```

プログラム後半でWordPressの関数を使用します。WordPress外で、同関数群を使用するためには、ヘッダーでこのように宣言します。

<https://codex.wordpress.org/Integrating_WordPress_with_Your_Website>

`wp-blog-header.php`を読み込めばOKです。

```php
// Google APIs Client Library for PHPに対してパスを通す
set_include_path(__DIR__);
```

続いて、`analytics.php`の実行ディレクトリにパスを通します。Google API Libraryは、 Google ディレクトリの格納されている場所まで、事前にパスを通しておく必要があります。

```php
define('CLIENT_ID', 'XXXXX.apps.googleusercontent.com');
define('SERVICE_ACCOUNT_NAME', 'XXXXX@developer.gserviceaccount.com');
define('KEY_FILE', 'XXXXX-privatekey.p12');
define('PROFILE_ID', 'XXXXX');
```

Google Developers Consoleで作成したプロジェクト情報を定義します。`PROFILE_ID`は、Google AnalyticsのビューIDを示しています。

```php
$client = new Google_Client();
$client->setApplicationName('Google Analytics for Macious');
$client->setClientId(CLIENT_ID);
$client->setAssertionCredentials(new Google_Auth_AssertionCredentials(
	SERVICE_ACCOUNT_NAME,
	array('https://www.googleapis.com/auth/analytics'),
	file_get_contents(KEY_FILE, true)
));
```

Google Analyticsに対する認証を行います。認証情報に、事前に入手した秘密鍵の情報を指定しています。公開鍵認証により通常のID/PWによるアクセスが不要になります。

```php
$service = new Google_Service_Analytics($client);
$results = $service->data_ga->get(
	'ga:' . PROFILE_ID,
	'2005-01-01',  // 開始日
	'2100-01-01',  // 終了日
	'ga:pageviews',
	array(
	'dimensions'  =>  'ga:pagePath', // 投稿記事のスラッグを取得
	'sort'      =>  '-ga:pageviews'  // ページビュー数で並べ替え
	// 'max-results'  =>  '-1'  //件数
	)
);
```

いよいよ、Google Analyticsから情報を取得します。弊サイトでは1日に1回（午前3時）Google Analyticsから情報を収集し全投稿記事に対するページビューの集計を行っています。

たとえば、月間アクセス数ランキング等を作成したい場合は、開始日、終了日を、各々先月の初日と末日にし、取得件数を絞り込んだほうが良いでしょう。ちなみに、先月の初日、末日は、以下の方法で簡単に取得できます。

```php
$dt_from = new Datetime('first day of now -1 months');
$dt_to = new Datetime('last day of now -1 months');
```

ディメンションで、投稿記事のスラッグのみを取得していますが、タイトルを取得したい場合は、カンマ区切りで`ga:pageTitle`を指定します。

Google Analyticsから取得した情報は、`$result['rows']`に格納されます。

```php
foreach ($results['rows'] as $result) {
	$post_url = home_url() . $result[0];
	$post_id = url_to_postid($post_url);
	if ($post_id <=0 || in_array($post_id, $check)) {
	continue;
	}
	$post = get_post($post_id);
	if ('publish' === get_post_status($post) && 'post' === get_post_type($post)) {
	update_post_meta($post->ID, '_custom_pageviews', $result[1]);
	}
	$check[] = $post_id;
}
```

Google Analyticsから取得したページビューをWordPressのデータベースに格納します。Google Analyticsから取得できるURLはスラッグ部分のみとなるため、まず、`home_url`関数を使用してパーマリンクを作成します。続いて、 `url_to_postid`関数を使用して、その投稿記事のIDを取得します。

続いて、投稿記事のIDをもとに投稿記事情報を`get_post`関数で取得します。後は、その記事の状態が「Publish」（公開済み）、かつ「post」（投稿記事）の場合のみ、 `update_post_meta`関数を使用して、`wp_postmeta`テーブルを更新します。ここで定義している`_custom_pageviews`は任意の名称を使用してください。後からページビューを取得するために必要です。

`wp_postmeta`テーブルは`wp_posts`に紐付くオプション情報を保存しておくためのテーブルです。任意のキーと値の組み合わせで、保存できます。たとえば、`_custom_keywords`という項目を設けておき、記事作成時にこのキーの値を更新し、ブログ表示時に`<meta>`タグの情報として表示するという活用方法もあります。

なお、`wp_postmeta`テーブルから値を取得するためには、`get_post_meta`関数を使用します。

<https://codex.wordpress.org/Function_Reference/get_post_meta>

#### Google Analyticsからの情報取得時の注意点

Google Analyticsから取得した情報には、単一の投稿記事のみならず、カテゴリーや固定ページ等を含む情報も含まれます。また、記事公開後にタイトル等を変更した場合、変更前後の記事のページビュー数を別々に取得してしまうため、同一IDの場合は処理をスキップする、などの考慮が必要です。

#### Google Analyticsプログラムをエックスサーバーのcronに登録する

最後に`analytics.php`をエックスサーバーのcronに登録します。cronへ登録する前に必ずローカル環境で動作を確認しましょう。

![](/uploads/2015/02/150207-54d6118524374.png)

cron登録時の注意点として、コマンドは実行環境も含めてフルパスで指定する必要があります。単独でプログラムを登録しても正常に動作しません。これはハマりがちですので注意してください。

![](/uploads/2015/02/150207-54d61186cd2ae.png)

**PHP 5.3を使用している場合**

    /usr/bin/php5.3 /home/xxxx/analytics.php

### Google Analyticsから取得した記事をページビュー順に表示する

Google Analyticsから取得した記事をページビュー順に表示するためには、`WP_Query`関数を使用します。ポイントは、パラメーターの`orderby`に`meta_value_num`、`meta_key`に`analytics.php`で更新したキーを指定します。ここでは、`_custom_pageviews`を指定しています。

```php
$r = new WP_Query(array(
	'post_type' => 'post',
	'posts_per_page' => 6,
	'post_status' => 'publish',
	'ignore_sticky_posts' => true,
	'orderby' => 'meta_value_num',
	'meta_key' => '_custom_pageviews',
	'order' => 'DESC',
));
```

#### パラメーター

| パラメーター        | 内容                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------- |
| post_type           | 投稿の種類を指定する。"post"（記事）、"page"（固定ページ）など。                      |
| posts_per_page      | 取得する記事の件数。                                                                  |
| post_status         | 記事の状態。"publish"（公開）、"draft"（下書き）など。                                |
| ignore_sticky_posts | ページの先頭に固定している記事を含めるかどうか。"true"（含めない）、"false"（含める） |
| orderby             | 取得する記事のソートに指定する項目。                                                  |
| meta_key            | `wp_postmeta`テーブルに保存したキーの値。                                             |
| order               | 取得する記事の順序を指定。"DESC"（降順）、"ASC"（昇順）。                             |

`WP_Query`関数で記事を取得した後は、WordPressの通常のループで記事を取得して、ページビュー順にソートされた記事を表示できます。

```php
if ($r->have_posts()):
$r->have_posts()): $r->the_post();
...
endwhile;
wp_reset_postdata();
endif;
```

## まとめ

Google Analyticsから常時ページビューを取得する、というのはリクエスト数の上限を考慮しなかったとしても、現実的ではありません。実行には多少時間を要するため、常時取得した場合、サイトの表示速度に影響があります。

cronによる定期実行が現実的ですが、cronが利用できない場合は `wp_schedule_event`関数を使用する方法も考えられます。WordPressアクセス時に開始時刻を過ぎていた場合にイベントが実行される、という疑似的なスケジューラですが、サイトの表示速度への影響は最小限（初回アクセス時のみ）に抑えられます。

<https://codex.wordpress.org/Function_Reference/wp_schedule_event>

少し長文になりましたが、最後までお付き合いいただきましてありがとうございました。

## 参考リンク

以下のサイトを参考にさせていただきました。

<http://www.karakaram.com/google-analytics-api-batch>

<https://hayashikejinan.com/wordpress/tips/372/>
