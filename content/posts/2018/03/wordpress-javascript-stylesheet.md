---
author: ottan
date: 2018-03-21 13:09:04+00:00
draft: false
title: WordPressのwp_enqueue_script、wp_enqueue_style関数で呼び出されているスクリプトとCSSの一覧を確認する
type: post
slug: wordpress-javascript-stylesheet-6673
categories:
- Blog
tags:
- Development
- Blog
---

![](/uploads/2018/03/180321-5ab2516925b6a.jpeg)

[WordPressの高速化！WordPressでそのページで実行されているアクションやフックの一覧を表示するプラグイン「Simply Show Hooks」](/wordpress-plugin-simply-show-hooks-faster-6669/)で、WordPressで呼び出されているアクションとフックの一覧を表示するプラグインをご紹介し、不必要なアクションやフックは徹底的に排除しようということをしましたが、今回は`wp_enqueue_script()`関数や`wp_enqueue_style()`関数で読み込まれているJavaScriptとCSSの一覧を取得する方法をご紹介します。

WordPressには便利なプラグインが多数ありますが、プラグインを導入しすぎると、プラグインによって勝手にJavaScriptやCSSが出力され、ページ読み込み速度に影響を与えるということが多々あります。このような場合には、今回ご紹介する方法を使用して、キューに入っているスクリプトやCSSファイルをデキュー（キューから追い出す）するのがオススメです。

## wp_enqueue_script、wp_enqueue_styleで呼びされているJavaScript、CSSの一覧

プラグインやテーマのソースコードの中から、同関数を呼び出している箇所を洗い出すというのも1つの方法ですが、手間がかかりますし、プラグインやテーマを変更する都度、すべてのソースコードに目を通さなくてはなりません。そのような場合に、キューに入っているJavaScriptやCSSの一覧を取得したい場合には、今回ご紹介する方法が便利です。ただし、今回ご紹介する方法は、くれぐれもローカルホストの開発環境等で実行してください。本番環境で使用しないでください。

### JavaScript

JavaScriptは、デフォルトでは次のように出力されます。後述のCSSと異なり、`<script>`タグにID属性は付与されておらず、`wp_enqueue_script()`関数で使用されているID（ハンドル名）を探し出すのも容易ではありません。

    </script>

そこで、`fucntions.php`に以下の行を追加します。

    add_filter(
      'script_loader_tag', function( $tag, $handle, $src ) {
        var_dump( $handle );
      }, 10, 2
    );

`wp_enqueue_script()`関数の第一引数に指定する`$handle`の一覧を画面に表示できます。ハンドル名が取得できて、かつこのJavaScriptを使用する必要がないのであれば、`functions.php`に以下のコードを追記します。なお、上記のデバッグ用コードはコメントアウト、もしくは削除しておきましょう（もし、手元に開発環境がなく実際の環境で試す必要がある場合は、WordPressがデバッグモードの時のみ呼び出す、等考慮しておきましょう）。

    add_action(
      'wp_print_scripts', function() {
        wp_dequeue_script( '<handle name>' );
      }
    );

投稿タイプ等によって切り替える場合は、`is_singular()`、`is_page()`関数等を併用すると良いでしょう。

### CSS

続いて、CSSは、デフォルトでは次のように出力されます。`&ltlink;>`タグにID属性が付与されており、このID属性と`wp_enqueue_style()`関数で使用されているID（ハンドル名）が一致する場合が多いのですが、必ずしも一致するわけではありません。

そこで、`fucntions.php`に以下の行を追加します。

    add_filter(
      'style_loader_tag', function( $html, $handle, $href, $media ) {
        var_dump( $handle );
      }, 10, 2
    );

`wp_enqueue_style()`関数の第一引数に指定する`$handle`の一覧を画面に表示できます。ハンドル名が取得できて、かつこのCSSを使用する必要がないのであれば、`functions.php`に以下のコードを追記します。なお、JavaScriptの場合と同様に、上記のデバッグ用コードはコメントアウト、もしくは削除しておきましょう。

    add_action(
      'wp_print_styles', function() {
        wp_dequeue_style( '<handle name>' );
      }
    );

投稿タイプ等によって切り替える場合は、`is_singular()`、`is_page()`関数等を併用すると良いでしょう。

## まとめ

不必要なJavaScriptやCSSを見つけるコツは、

-   `script_loader_tag`、`style_loader_tag`フィルターを使用して、ハンドル名の一覧を取得する
-   JavaScriptの場合は、`wp_print_scripts`アクションの中で、`wp_dequeue_script`を呼び出す
-   CSSの場合は、`wp_print_styles`アクションの中で、`wp_dequeue_style`を呼びだす

以上の手順で簡単に制御できますので、ぜひお試しください。
