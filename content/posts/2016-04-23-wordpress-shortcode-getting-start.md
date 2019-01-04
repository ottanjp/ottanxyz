---
author: ottan
date: 2016-04-23 06:08:04+00:00
draft: false
title: WordPressのショートコード入門
type: post
url: /wordpress-shortcode-getting-start-6855/
categories:
  - Blog
tags:
  - Development
  - WordPress
---

![](/images/2016/04/160423-571b55fc9bd95-1.jpg)

WordPress のショートコードとは、いわゆる「ショートカット」のように機能します。たとえば、代表的なショートコードとして`[[gallery]]`がありますが、これは記事中に`[[gallery]]`と記述することで、簡単にイメージファイルのサムネイルを呼び出すことができるものです。今回は、ショートコードの作り方から、簡単なサンプル作成までを行います。

WordPress のショートコードは、WordPress が提供するショートコード API を使用して作成します。あらかじめ、ショートコード API に沿ってハンドラーと呼ばれる関数を用意し、`add_shortcode`関数にショートコードを登録する必要があります。このショートコードのハンドラーは、３つの引数を持ちます。

_ `$atts`：ショートコードのパラメーターを格納する配列
_ `$content`：ショートコードに囲まれた本文 \* `$tag`：ショートコードのタグ

ここでは、簡単な例を示しましょう。

    [ottanxyz]

_ `$atts` = array()
_ `$content` = null

    [ottanxyz]This is a content.[/ottanxyz]

_ `$atts` = array()
_ `$content` = This is a content.

    [ottanxyz id='1000' name='ottan']

_ `$atts` = array( 'id' => '1000', 'name' => 'ottan' )
_ `$content` = null

    [ottanxyz id='1000']This is a content.[/ottanxyz]

_ `$atts` = array( 'id => '1000' )
_ `$content` = This is a content.

## ショートコードを作成する

では、ここからは実際に簡単なショートコードを作成してみましょう。

まず、`functions.php`の先頭に、以下を記述します。

**functions.php**

    include 'shortcodes.php';

`functions.php`に直接記述しても構いませんが、ここではコードを分離することで、`functions.php`の肥大化を防止しています。

続いて、`shortcodes.php`に、以下の内容を記述します。

**shortcodes.php**

    <?php
    function ox_shortcodes_article( $atts, $content=null ) {
      extract( shortcode_atts( array( 'id' => '' ) ,$atts ) );
      $getpost = get_posts( array( 'include' => array( $id ) ) );
      $getpost = $getpost[0];

      $permalink = get_permalink( $getpost->ID );
      $title = $getpost->post_title;
      $image_id = get_post_thumbnail_id( $getpost->ID );
      $image_url = wp_get_attachment_image_src( $image_id, array( 64, 64 ) );
      $image_url = $image_url[0];
      $description = mb_substr( str_replace( array( "\r\n", "\r", "\n" ), '', strip_tags( $getpost->post_content ) ), 0, 120 );

      return <<< EOM
    <div class="media bg-article">
    <div class="media-left pull-left">
    <a href="${permalink}">
    <img class="media-object img-rounded" src="${image_url}" alt="${title}">
    </a>
    </div>
    <div class="media-body">
    <a href="${permalink}">
    <h4 class="media-heading">${title}</h4>
    </a>
    <p><small class="text-muted">${description}</small></p>
    </div>
    </div>
    EOM;
    }

    add_shortcode( 'article', 'ox_shortcodes_article' );
    ?>

順を追って解説します。

    function ox_shortcodes_article( $atts, $content=null ) {
    ...
    }

まず、ハンドラー関数である`ox_shortcodes_article`を定義します。`$atts`、`$content`については前述の通りです。

    extract( shortcode_atts( array( 'id' => '' ) ,$atts ) );

ショートコードで使用する変数を定義します。ここでは、`id`を変数として用意しました。連想配列の`id`要素に値をあらかじめ定義しておくことで、デフォルト値（値が null の場合の定義）を定義できます。それを、PHP の標準関数である`extract`を使用して展開します。展開後は、`id`に設定された値は、`$id`として受け取ることができます。

    $getpost = get_posts( array( 'include' => array( $id ) ) );
    $getpost = $getpost[0];

    $permalink = get_permalink( $getpost->ID );
    $title = $getpost->post_title;
    $image_id = get_post_thumbnail_id( $getpost->ID );
    $image_url = wp_get_attachment_image_src( $image_id, array( 64, 64 ) );
    $image_url = $image_url[0];
    $description = mb_substr( str_replace( array( "\r\n", "\r", "\n" ), '', strip_tags( $getpost->post_content ) ), 0, 120 );

順に解説します。

_ `$getpost`：`get_posts`関数を使用して、記事の ID をキーに過去記事の内容を取得します。戻り値は配列となるため、一番目の要素のみを取り出します。
_ `$permalink`：記事のパーマリンクを取得します。
_ `$title`：記事のタイトルを取得します。
_ `$image_id`：記事のアイキャッチ画像の添付ファイル ID を取得します。
_ `$image_url`：記事のアイキャッチ画像の URL を取得します。配列で、画像の横 × 縦のサイズを指定できます。
_ `$description`：記事の抜粋を取得します。弊サイトでは、記事の抜粋を別途用意していないため、記事の冒頭から 120 文字を取得します。

      return <<< EOM
    <div class="media bg-article">
    <div class="media-left pull-left">
    <a href="${permalink}">
    <img class="media-object img-rounded" src="${image_url}" alt="${title}">
    </a>
    </div>
    <div class="media-body">
    <a href="${permalink}">
    <h4 class="media-heading">${title}</h4>
    </a>
    <p><small class="text-muted">${description}</small></p>
    </div>
    </div>
    EOM;

ショートコードが返却する HTML をヒアドキュメントとして記述します。テンプレートは任意に変更することが可能です。ヒアドキュメント中で、変数を使用する場合は、`${permalink}`のように、変数名の両端を`{}`で囲む必要があります。

### ショートコードの使い方

    [[article id=3482]]

ショートコードを使用すると、`id`に指定された記事の ID から記事の内容を自動的に取得し、HTML を返却します。以下のように表示されます。

![](/images/2016/04/160423-571b5600a69a7-1.png)

## まとめ

ショートコードを使用することで、定型的に使用する文章を簡略化したり、共通する部品をショートコードに集約しておくことで、サイト全体のテンプレートを変更する際に、記事全体の HTML を修正するのではなく、ショートコードの変更のみで対応できます。ショートコードはうまく利用すると非常に便利です。ぜひお試しください。
