---
author: ottan
date: 2016-04-19 13:17:59+00:00
draft: false
title: MarsEditのプレビュー画面にWordPressのショートコードをリアルタイムに反映する
type: post
url: /marsedit-preview-shortcode-wordpress-6854/
categories:
- Mac
- Blog
tags:
- WordPress
- Development
- MarsEdit
---

![](/images/2016/04/160429-5723685638ac2.png)






MacでWordPressを使ってブログを書くなら使いたい「MarsEdit」、弊サイトでも、度々その使い方についてご紹介してきました。過去記事については、[MarsEditのプレビュー画面で、「highlight.js」のシンタックスハイライトをリアルタイムでプレビューする](https://ottan.xyz/marsedit-preview-syntax-highlight-3811/)、[WordPressのテーマ開発、ブログの執筆作業を効率化する方法のまとめ](https://ottan.xyz/efficiency-blog-736/)などをご覧いただくとして、今回はMarsEditの要でもあるプレビュー画面に、WordPressのショートコードをリアルタイムに展開するための方法をご紹介します。



https://ottan.xyz/marsedit-preview-syntax-highlight-3811/



## MarsEditのプレビュー画面にリアルタイムにショートコードを反映する





ショートコードについては、[ショートコード API - WordPress Codex 日本語版](https://wpdocs.osdn.jp/ショートコード_API)などをご覧いただくとして、ここではMarsEditに特化してご紹介します。また、MarsEditのプレビュー画面のカスタマイズについては、[MarsEditのプレビューをブログデザインと同じようにするための参考記事＆快適に書くための注意点 | なまら春友流](http://harutomo-ryu.com/archives/2012-09-02/132614.html)などをご覧ください。





### 下準備





さて、MarsEditのプレビュー画面にリアルタイムにショートコードを反映させるためには、ちょっとした下準備が必要です。今回は、手っ取り早い方法をご紹介しますが、他にも何か良い案をお持ちの方がいらっしゃれば、是非教えてください。





手っ取り早い方法とは、**ローカル環境にWordPressの開発環境を用意する**ことです。そして、WordPressの開発環境を手っ取り早く用意するためには、Vagrantをオススメしています。Vagrantの中でも[VCCW - A WordPress development environment.](http://vccw.cc/)は構築が簡単でオススメです。ここでは、VCCWを使用していることを前提として書きますので、読み替えてください。なお、VCCWについては、[gulp.jsとBrowser Syncで快適なWordPress開発環境を手に入れる](https://ottan.xyz/gulp-browser-sync-476/)で詳しくご紹介しています。





### MarsEditのテキストフィルター（TextFilters）を用意する





VCCWを使用してWordPressの開発環境を構築した場合は、WordPressインストールディレクトリ直下の「wp-config.php」ファイルの中身を修正してください。具体的には、`DB_HOST`の値を`vccw.dev`に修正します。



**wp-config.php**

    
    /** MySQL hostname */
    define('DB_HOST', 'vccw.dev');


続いて、テキストエディターなど、普段PHPファイルを編集しているエディターを開いて、以下の内容を記述し、「WordPress.php」という名前で保存します。コード中の[WordPress Install Path]は、実際のWordPressのインストールディレクトリの絶対パスに置き換えてください。相対パスではなく絶対パスにしてください。

**WordPress.php**

    
    #!/usr/bin/env php
    <?php
    require_once '[WordPress Install Path]/wp-load.php';
    
    $content = file_get_contents('php://stdin', 'r');
    
    echo apply_filters('the_content', $content);
    ?>





続いて、保存したファイルを移動します。Finderの場合、⇧+⌘+Gで、パスを入力してください。




    
    ~/Library/Application Support/MarsEdit/TextFilters





![](/images/2016/04/160429-5723685a6e659.png)






このフォルダーに、新規フォルダーを作成します。名前は「WordPress」とします。





![](/images/2016/04/160429-572368651ed73.png)






作成した「WordPress」フォルダーに、先ほど作成した「WordPress.php」を移動します。ここまできたら、MarsEditを開いている場合は、一度MarsEditを再起動します。





### MarsEditでWordPressフィルターを使用する





![](/images/2016/04/160429-5723686e73d46.png)






続いて、編集するブログを選択した状態で「右クリック」→「Edit Settings」を開きます。





![](/images/2016/04/160429-57236872948eb.png)






「Editing」タブの、「Preview Text Filter」で「WordPress」が選択できるようになっているので、こちらを選択します。「OK」ボタンをクリックします。





![](/images/2016/04/160429-57236877184de.png)






続いて、記事の編集画面を開きます。プレビュー画面も開いておきます。記事の編集画面に任意のショートコードを入力します。たとえば、代表的なショートコードとして、ここでは`[[article]]`を例にあげます。`[[article]]`については、[WordPressのショートコード入門](https://ottan.xyz/wordpress-shortcode-getting-start-3873/)をご覧ください。





![](/images/2016/04/160429-5723687ae46ae.png)






入力すると同時に、リアルタイムにプレビュー画面にショートコードの内容が展開されました！





## まとめ





今回用意したMarsEditのテキストフィルター（TextFilters）は、






 	  1. 外部のPHPファイルからWordPressの関数を使用できるよう「wp-load.php」を読み込む
 	  2. MarsEditの記事の編集画面の内容を取得する
 	  3. WordPressの関数を使用して、画面出力用に変換する




ということをやっています。WordPressのことなんで、入力したものをWordPressの実際の出力内容に変換してやれば、たいていのことは何とでもなります。ただし、JavaScriptを使用するもの、たとえば、TwitterやYouTubeなどのoEmbed系は、正しく変換できてもプレビュー画面にはうまく出力されません。この辺りについてはまだ改良の余地がありそうですが、MarsEditの限界かもしれません。独自のショートコードを使用している場合も、たいていの場合は動作しますので、ぜひお試しあれ！





もちろん、DBの向き先はローカルの開発環境なので、ショートコードから記事の内容を取得するようなものは、ローカルのDBにその内容が反映されている必要がありますので、ご注意ください。
