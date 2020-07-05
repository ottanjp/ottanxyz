---
author: ["@ottanxyz"]
date: 2015-05-23T00:00:00+00:00
draft: false
title: Twitter Bootstrap 3を用いてWordPressテーマを作成しよう③
type: post
slug: theme-twitter-bootstrap-03-1473
categories:
  - Blog
tags:
  - Development
---

![](/uploads/2015/05/150523-5560631fae5d9.jpg)

[Twitter Bootstrap 3 を用いて WordPress テーマを作成しよう ②](/posts/2015/05/theme-twitter-bootstrap-02-1456/)は、Twitter Bootstrap の根幹となるグリッドシステムのご紹介から、メインコンテンツにアイキャッチ画像、タイトル、投稿の内容を表示させる、など盛りだくさんの内容でした

また、その中で、`the_XXXX()` 関数と`get_the_XXXXX()` 関数の違い、`the_post()` 関数についても詳しくご紹介しましていますので、まだの方はぜひご覧いただければと思います。前回までの完成図は以下の通りです。

![](/uploads/2015/05/150523-556063217ec3b.png)

## 前回の補足

`the_post_thumbnail()` 関数でアイキャッチ（サムネイル）画像を表示しましたが、WordPress でアイキャッチ画像を使用するためには、事前に使用することを「**functions.php**」で宣言する必要があります。「**functions.php**」を新規作成し、以下の宣言を追加してください。

    add_action('after_setup_theme', function() {
        add_theme_support('post-thumbnails');
    });

以下のような記述方法もあります。前者後者に内容に違いはありませんので、どちらか好きなスタイルを選択してください。前者の無名関数（関数の定義をしない）の方が若干スマートになります。（スマートになるだけで可読性が向上するかどうかは別のお話ですが）

    function custom_theme_thumbnails() {
        add_theme_support('post-thumbnails');
    }
    add_action('after_setup_theme', 'custom_theme_thumbnails');

## サイドバーコンテンツにウィジェットを表示する

では、本題に戻りましょう。今回は、メインコンテンツの右側、サイドバーコンテンツにウィジェットを表示します。ウィジェットを表示するためには、アイキャッチ画像と同様に、ウィジェットを使用する旨を「**functions.php**」であらかじめ宣言する必要があります。以下のコードを同ファイルに追加してください。

    add_action('widgets_init', function() {
        register_sidebar(array('id' => 'sidebar-1', 'name' => 'Main Sidebar', 'description' => 'Main Sidebar', 'before_widget' => '<aside id="%1$s" class="widget %2$s">', 'after_widget' => '</aside>', 'before_title' => '<div class="widgettitle">', 'after_title' => '</div>'));
    });

`register_sidebar()` 関数によりサイドバーの登録を行います。ここで登録したサイドバーは`dynamic_sidebar()` 関数で呼び出すことができます。`register_sidebar()` 関数の引数は、最低限「id」「name」「description」があれば構いません。

### メインコンテンツとサイドバーコンテンツを独立させる

現在、メインコンテンツとサイドバーコンテンツは同一の「**index.php**」ファイルに書かれていますが、これをメインとサイドバーでファイルを分割することにします。分割したサイドバーは、メインから`get_sidebar()` 関数で呼び出すことができます。

まず、メインコンテンツ（**index.php**）は以下の通りです。`get_sidebar()` 関数を追加し、サイドバーを呼び出すようにしています。

    <?php get_header(); ?>
    <div class="container">
        <!-- Example row of columns -->
        <div class="row">
            <div class="col-sm-8">
                <?php if ( have_posts() ) : ?> // do stuff
                <?php endwhile; ?>
                <div>記事が見つかりませんでした。</div>
                <?php endif; ?> </div>
            <div class="col-sm-4">
                <?php get_sidebar(); ?> </div>
        </div>
    </div>
    <?php get_footer(); ?>

また、サイドバーコンテンツは、「**sidebar.php**」という名前で作成してください。「**sidebar.php**」の内容は以下の通りです。

    <?php
    if (is_active_sidebar('sidebar-1')) {
        dynamic_sidebar('sidebar-1');
    }
    ?>

`is_active_sidebar` は、「**functions.php**」にサイドバーが定義されているかどうかを判定し、定義されていれば`true` を、定義されていなければ`false` を返します。また、`dynamic_sidebar()` 関数で、指定したサイドバーを呼び出します。たった、この 3 行でサイドバーは完成です！

![](/uploads/2015/05/150523-55606327e3200.png)

「sidebar」とは銘打っていますが、任意の場所から`dynamic_sidebar()` 関数を呼び出すことができます。たとえば、広告表示専用のサイドバーを定義し、それを投稿の本文中に追加するといった使い方もできます。

## まとめ

ここまででだいぶブログらしくなってきました。長くなりましたので、今回はこの辺で。
