---
author: ["@ottanxyz"]
date: 2015-05-23T00:00:00+00:00
draft: false
title: Twitter Bootstrap 3を用いてWordPressテーマを作成しよう④
type: post
slug: theme-twitter-bootstrap-04-1477
categories:
  - Blog
tags:
  - Development
---

![](/uploads/2015/05/150523-55606e84bd06a.jpg)

## 投稿ページの作成

[Twitter Bootstrap 3 を用いて WordPress テーマを作成しよう ③](/posts/2015/05/theme-twitter-bootstrap-03-1473/)まででメインとなる「**index.php**」では投稿一覧の表示まで行いました。今回は、投稿の個別ページを表示する「**single.php**」を作成します。「**index.php**」からリンクされたページは、WordPress により「**single.php**」に誘導されるため、「**index.php**」に手を入れる必要はまったくありません。

### single.php

投稿個別ページと聞くと、何から手を付けなければいけないかわからない、という方もいらっしゃるかもしれませんが、個別ページの作成方法は投稿一覧とよく似ています。まず、前回までの「**index.php**」を見てください。

        <!-- Example row of columns -->
        <div class="row">
            <div class="col-sm-8">
                <?php if ( have_posts() ) : ?>
                <?php while ( have_posts() ) : the_post() ?>
                <div class="row">
                    <div class="col-sm-4">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail( array( 180, 9999 ) ); ?>
                        </a>
                    </div>
                    <div class="col-sm-8">
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <div>
                            <?php the_excerpt(); ?>
                        </div>
                    </div>
                </div>
                <?php endwhile; ?>
                <?php else : ?>
                <div>記事が見つかりませんでした。</div>
                <?php endif; ?> </div>
            <div class="col-sm-4">
                <?php get_sidebar(); ?> </div>
        </div>
    </div>

これが前回までに作成した投稿一覧を表示する「**index.php**」です。続いて今回作成する、「**single.php**」の全容です。

    <?php get_header(); ?>
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <?php if ( have_posts() ) : ?>
                <?php while ( have_posts() ) : the_post() ?>
                <h3><?php the_title(); ?></h3>
                <div>
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
        <?php endwhile; ?>
        <?php else : ?>
        <div>記事が見つかりませんでした。</div>
        <?php endif; ?>
        <div class="col-sm-4">
            <?php get_sidebar(); ?> </div>
    </div>
    <?php get_footer(); ?>

差異は当然あるにしても、「**index.php**」と作りが似ていることに気が付くと思います。投稿一覧を作成する際に使用した、`have_posts()` 関数や、`the_post()` 関数も登場します。これらの関数について詳細に知りたい場合は、[Twitter Bootstrap 3 を用いて WordPress テーマを作成しよう ②](/posts/2015/05/theme-twitter-bootstrap-02-1456)で詳しくご紹介していますので是非参考にしてみてください。

投稿一覧と投稿個別ページで、唯一大きく異なるのが`the_excerpt()` 関数ではなく、`the_content()` 関数を呼び出しているところです。前者は本文の抜粋でしたが、後者は本文の内容をすべて表示します。これで投稿の内容を個別ページに出力することができました。

## 「index.php」と「single.php」には共通点が多い

ソースコードを参照すると、両者にあまり差異がないことに気付くかもしれません。複数のソースに同一の内容のコードを書いておくと、修正が発生した場合に、漏れなくすべての箇所を洗い出す必要があることから、共通化できるものは共通化しておいたほうがよいでしょう。

そこで、「**index.php**」に「**single.php**」の内容をマージし、必要な時だけ「**single.php**」の個別部分を呼び出すように、両者のソースコードを修正します。ただし、「**single.php**」という名前のファイルが存在すると、WordPress は投稿個別ページの呼び出し時にこのファイルを使用してしまうため、この時点で「**single.php**」は「**content-single.php**」に名称を変更します。

**index.php**

    <?php get_header(); ?>
    <div class="container">
        <!-- Example row of columns -->
        <div class="row">
            <div class="col-sm-8">
                <?php if ( have_posts() ) : ?>
                <?php while ( have_posts() ) : the_post() ?>
                <?php if ( is_single() ) { get_template_part( 'content-single' ); } else { ?>
                <div class="row">
                    <div class="col-sm-4">
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail( array( 180, 9999 ) ); ?>
                        </a>
                    </div>
                    <div class="col-sm-8">
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <div>
                            <?php the_excerpt(); ?>
                        </div>
                    </div>
                </div>
                <?php } ?>
                <?php endwhile; ?>
                <?php else : ?>
                <div>記事が見つかりませんでした。</div>
                <?php endif; ?> </div>
            <div class="col-sm-4">
                <?php get_sidebar(); ?> </div>
        </div>
    </div>
    <?php get_footer(); ?>

**content-single.php**

    <?php the_title(); ?>
    </h3>
    <div>
        <?php the_content(); ?>
    </div>

注目すべきは、「**index.php**」の分岐点です。`is_single()` 関数を使って、投稿個別ページかどうかを判定し、もしそうなら投稿個別ページのテンプレートを呼び出しています。テンプレートの呼び出しには、`get_template_part()` 関数を使います。

また、「**content-single.php**」については、「**index.php**」との共通部分を取り除いたところ、たった 2 行のソースコードにおさまりました。

### 投稿一覧ページも別ファイルとして作成する

WordPress には、投稿一覧、投稿個別ページのみならず、アーカイブページ、検索結果、カテゴリーページ、著者ページと多数のページが存在します。今後、このようなページについて、すべて部品化していくことを考えると、投稿一覧ページについても、ファイルを分割した方がメンテナンス性がよさそうです。

というわけで、「**index.php**」から投稿一覧部分を切り出し、「**content-index.php**」という名前でファイルを保存します。

**index.php**

    <?php get_header(); ?>
    <div class="container">
        <!-- Example row of columns -->
        <div class="row">
            <div class="col-sm-8">
                <?php if ( have_posts() ) : ?>
                <?php while ( have_posts() ) : the_post() ?>
                <?php if ( is_single() ) { get_template_part( 'content-single' ); } else { get_template_part( 'content-index' ); } ?>
                <?php endwhile; ?>
                <?php else : ?>
                <div>記事が見つかりませんでした。</div>
                <?php endif; ?> </div>
            <div class="col-sm-4">
                <?php get_sidebar(); ?> </div>
        </div>
    </div>
    <?php get_footer(); ?>

**content-index.php**

        <div class="col-sm-4">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( array( 180, 9999 ) ); ?>
            </a>
        </div>
        <div class="col-sm-8">
            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <div>
                <?php the_excerpt(); ?>
            </div>
        </div>
    </div>

これでだいぶ見通しがよくなりました。

![](/uploads/2015/05/150523-55606e866cf38.png)

## まとめ

第 4 回までで、WordPress のテーマ開発に必要な知識の基本的な部分についてはすべて揃いました。ページネーションやページャー、関連記事の表示など、細かな部分についてはまだまだ残っていますが、Twitter Bootstrap 3 を使ったサイト構築の流れについては、ひととおり掴んでいただけたのではないでしょうか。連載としては今回が最後になります。最後までご愛読いただきましてありがとうございました。

本連載に対するご意見、ご要望、叱咤激励、何でもお待ちしております。コメント欄、または [@おったん](https://twitter.com/ottanxyz)までお願いします。
