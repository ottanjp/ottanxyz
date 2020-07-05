---
author: ["@ottanxyz"]
date: 2015-06-13T00:00:00+00:00
draft: false
title: 今日からコピペで使えるWordPressで人気記事や最新記事を取得する方法のまとめ
type: post
slug: wordpress-popular-custom-1701
categories:
- Blog
tags:
- Development
---

![](/uploads/2015/06/150613-557be49dd5dd5.jpg)

WordPressではさまざまな方法で投稿を取得できます。今回は、その中でもよく使われる手法についてまとめました。なお、簡略化のため、説明は `WP_Query` に渡すパラメーターのみとし、特段の注意点がなければ前後の処理は省いています。大まかな処理の流れは以下の通りになりますので参考にしてください。

```php
$r = new WP_Query();
if ( $r->have_posts() ) {
	while ( $r->have_posts() ) : the_post();
	// do stuff
	endwhile;
}
```

## WP_Queryで使用するパラメーターについて

解説の前に `WP_Query` で使用する頻度の高いパラメーターについてまとめておきます。

| パラメーター       | 説明                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| post_type          | 投稿のタイプを指定（post, page, custom...）                                                 |
| post_status        | 投稿の状態。通常は公開（publish）を指定                                                     |
| post_per_page      | 投稿の取得件数                                                                              |
| ignore_stick_posts | トップページに常に固定表示されている投稿を除く場合はtrue（1）を指定                         |
| orderby            | ソートする項目を指定。ソート順は「order」で指定。ランダムにソートする場合は、「rand」を指定 |
| order              | ソート順。ASCend（昇順）DESCend（降順）を指定                                               |

## WP_Queryでさまざまな投稿を取得する

上記を念頭に入れて、弊サイトでも実績のある方法をいくつかご紹介します。

### 最新記事を取得

まずは、最新記事を取得。取得件数は別途調整してください。すべての基本形です。

```php
$r = new WP_Query( array(
	'post_type' => 'post',
	'posts_per_page' => 6,
	'post_status' => 'publish',
	'ignore_sticky_posts' => 1,
	));
//do stuff
```

### 人気記事を取得

人気記事の取得方法については、[Google Analyticsと連携してページビューの多い人気記事を表示する](/posts/2015/02/wordpress-google-analytics-789/)を参考にしてください。

`_custom_pageviews` というカスタムフィールドにページビューが格納されているとした場合に、ページビューで並び替えるためのクエリは以下の通りになります。ポイントは、**`meta_key`にカスタムフィールド名を指定**することです。

```php
$r = new WP_Query( array(
	'post_type' => 'post',
	'posts_per_page' => 6,
	'post_status' => 'publish',
	'ignore_sticky_posts' => true,
	'orderby' => 'meta_value_num',
	'meta_key' => '_custom_pageviews',
	'order' => 'DESC',
));
//do stuff
```

また、指定したカスタムフィールドを**数値**として並べ替えたい場合は、**「orderby」に「meta_value_num」を指定してください**。文字列で並び替えられてしまった場合、「2」と「11」の順番が逆転するかもしれません。カスタムフィールドを数値として並び替えたい場合の決まり文句のため覚えておくと良いと思います。

### 関連記事（タグ）の取得

続いて、関連記事の取得方法です。まずは、同一のタグが設定されている記事を探し出します。タグが複数設定されている場合も対応可能です。 `tag__in` には、タグのID（スラッグではありません）を配列形式で指定します。また、 `post__not_in` に、現在表示中の記事のIDを指定することで、関連記事に自分自身が表示されなくなります。

なお、 `orderby` を「rand」に指定することで、記事の順番がランダムになります。

```php
global $post;
$tags = wp_get_post_tags($post->ID);
$tag_ids = array();
if ($tags) {
	foreach ($tags as $individual_tag) {
		$tag_ids[] = $individual_tag->term_id;
	}
	$args = array (
		'tag__in' => $tag_ids,
		'post__not_in' => array($post->ID),
		'posts_per_page' => 6,
		'ignore_sticky_posts' => 1,
		'orderby' => 'rand', );
	$r = new WP_Query( $args );
	// do stuff
}
```

### 関連記事（カテゴリー）の取得

続いて、関連記事のカテゴリー版です。 `category__in` に、カテゴリーのID（スラッグではありません）を配列形式で指定します。なお、タグとカテゴリーを組み合わせて、カテゴリーに所属、かつタグが振られている記事のみを取得といったことも可能です。

```php
global $post;
$categories = get_the_category($post->ID);
$category_ids = array();
if ($categories) {
	foreach ($categories as $category) {
		$category_id = $category->term_id;
		$category_child = get_term_children($category_id, 'category');
		if ($category_child != true) {
			$category_ids[] = $category->term_id;
		}
	}
	$r = new WP_Query( array(
		'category__in' =>
		$category_ids, 'post__not_in' => array($post->ID),
		'posts_per_page' => 6,
		'ignore_sticky_posts' => 1,
		'orderby' => 'rand' ));
	// do stuff
}
```

### 特定のカスタム投稿タイプの取得

たとえば、「News」というカスタム投稿タイプを作成した場合に、「News」だけを取得するためには、 `post_type` にカスタム投稿タイプを指定します。

```php
$r = new WP_Query( array(
	'post_type' => 'news',
	'posts_per_page' => 6,
	'post_status' => 'publish',
	'ignore_sticky_posts' => true,
));
// do stuff
```

上記の `post_type` に指定する値は、 `register_post_type()` 関数の第一引数で指定した値になります。

```php
register_post_type(
	'news',
	array(
		'labels' => array(
		'name' => __('News'),
		'singular_name' => __('News') ) ,
		'public' => true,
		'has_archive' => true,
		'rewrite' => array( 'slug' => 'news' )
	));
```

### 表示する記事の順番によって処理を振り分ける

続いて、表示する記事の順番によって処理を振り分ける方法です。たとえば、最新の記事だけ大きく表示させて目立たせておいて、古い記事は小さく表示させる、といったこともできますよ。

#### 3の倍数かどうかで処理を振り分ける

横3列に記事を並べて表示したい場合に便利なクエリです。 `current_post` プロパティで現在の投稿が何番目かがわかります。**最初の投稿は `current_post` が0であることに注意してください**。

```php
$r = new WP_Query( array(
	'post_type' => 'post',
	'posts_per_page' => 6,
	'post_status' => 'publish',
	'ignore_sticky_posts' => true,
));
if ( $r->have_posts() ) : while ($r->have_posts()) : $r->the_post();
if ( $r->current_post % 3 == 0) : ?>
// do stuff ...
```

#### 最初の記事かどうかで処理を振り分ける

最初の記事かどうかで振り分けるためには、 `current_post` が0かどうかで判定できます。

```php
$r = new WP_Query( array(
	'post_type' =>
	'post', 'posts_per_page' => 6,
	'post_status' => 'publish',
	'ignore_sticky_posts' => true,
));
if ( $r->have_posts() ) : while ($r->have_posts()) : $r->the_post();
if ( $r->current_post == 0) : ?>
// do stuff ...
```

#### 最後の記事かどうかで処理を振り分ける

逆に最後の記事かどうかで振り分けるためには、 `post_count` プロパティを使用します。これは取得した投稿の数です。 `current_post` が0から始まることに注意して判定するようにしてください。

```php
$r = new WP_Query( array(
	'post_type' => 'post',
	'posts_per_page' => 6,
	'post_status' => 'publish',
	'ignore_sticky_posts' => true,
));
if ( $r->have_posts() ) : while ($r->have_posts()) : $r->the_post();
if ( $r->current_post == $r->post_count - 1 ) : ?>
// do stuff ...
```

## まとめ

WordPressで使えそうなさまざまな形態の投稿取得方法をご紹介しました。
