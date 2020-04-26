---
author: ottan
date: 2018-03-14 13:06:57+00:00
draft: false
title: WordPressの高速化！WordPressでそのページで実行されているアクションやフックの一覧を表示するプラグイン「Simply Show Hooks」
type: post
slug: wordpress-plugin-simply-show-hooks-faster-6669
categories:
- Blog
tags:
- Plugin
- Blog
---

![](/uploads/2018/03/180314-5aa8ea3d6c266.jpg)

WordPressの特徴と1つして、その拡張性の高さがあります。WordPressの公式リポジトリには、多数のプラグインが登録されており、プラグインをインストールするだけで、機能拡張を簡単に行うことができます。

しかし、プラグインは便利な一方、多数のプラグインをロードすると、ページの読み込み速度が遅くなるなど、デメリットがあります。その対策として、投稿タイプやページ単位でプラグインのオン、オフを切り替えることが重要です。今回は、主にプラグインで使用されているJavaScriptやスタイルシートのオン、オフを行うために便利なプラグイン「Simply Show Hooks」をご紹介します。

## 実行されているアクションやフックを可視化する「Simply Show Hooks」

プラグインで使用されているJavaScriptやスタイルシートは、大抵の場合、WordPressの標準関数である`wp_enqueue_script()`（JavaScript）、`wp_enqueue_style()`関数（スタイルシート）を利用して、`wp_head()`、または`wp_foot()`関数で読み込まれます。また、通常は、`<script>`、`&ltstyle;>`タグのID属性にスクリプト名、スタイルシート名が指定されているため、不要な場合は、`wp_dequeue_script()`（JavaScript）、`wp_dequeue_style()`関数（スタイルシート）に、そのID名を指定することで読み込みを止めるできます。

    add_action(
      'wp_enqueue_scripts', function () {
        wp_dequeue_style( 'hoge' );
        wp_dequeue_script( 'fuga' );
      }
    );

しかし、上記で消去できない、もしくは指定するID属性の値がわからない（指定する値がID属性の値と異なる）場合があります。そのような場合には、JavaScriptやスタイルシートの読み込みを指定する`wp_enqueue_scripts`アクションを含めて、`add_action()`、もしくは`apply_filter()`関数でフックされている関数一覧を表示することのできる、「Simply Show Hooks」プラグインが便利です。

### 読み込まれているアクションやフックがヘッダーで一目でわかる

![](/uploads/2018/03/180314-5aa8ea4748c74.png)

WordPressにログインしているユーザーのみに、画面上部のヘッダー箇所に読み込まれているアクションおよびフックの一覧が表示されます。アクションのみを表示する、もしくはアクションおよびフックの一覧を表示するモードがあります。どのようなアクションやフィルターが存在しているかわかるとともに、どの関数を停止すれば不要な読み込みを止めることができるかどうかがわかります。

![](/uploads/2018/03/180314-5aa8ea73cef32.png)

上図の例では、`wp_enqueue_scripts`アクションで読み込まれている関数一覧が表示されています。また、読み込みのプライオリティ（順序）も確認できます。このアクションで呼び出されている関数さえわかってしまえば、

    remove_action( 'wp_enqueue_scripts', '<関数名>', 10 );

や、クラスの関数が呼び出されている場合は、

    remove_action( 'wp_enqueue_scripts', array( '<Class Name>', '<関数名>' ), 10 );

で停止できます。上記の「10」はプライオリティですので、読み込まれている関数のプライオリティと同一の値（デフォルトは「10」）を指定します。

これで、たとえば、いわゆる「お問い合わせ」ページのみで呼び出したい「Contact Form 7」など、投稿ページ等で必要のないスクリプトやスタイルを簡単にまとめて停止できます。

    remove_all_actions( 'wpcf7_do_enqueue_scripts' );
    remove_all_actions( 'wpcf7_enqueue_scripts' );
    remove_all_actions( 'wpcf7_init' );
