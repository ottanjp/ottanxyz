---
author: ottan
date: 2015-05-23 08:25:46+00:00
draft: false
title: Twitter Bootstrap 3を用いてWordPressテーマを作成しよう①
type: post
slug: theme-twitter-bootstrap-01-1453
categories:
- Blog
tags:
- Development
---

![](/uploads/2015/05/150523-5560217a37b10.jpg)




Twitter Bootstrapを用いたWordPressテーマは数多く配信されています。その中からピックアップしてカスタマイズしても良いのですが、それでは面白味がありませんので、極力そういった類いのツールは借りず、自作に近い形でテーマを作成したいと思います。





## 簡単にレスポンシブに対応したデザインが作成できる「Initializr」





[Initializr](http://www.initializr.com/)では、Twitter Bootstrapを使用した雛形を簡単に作成できます。今回は、この雛形をカスタマイズしていきたいと思います。[Initializr](http://www.initializr.com/)にアクセスし、以下の通りになっていることを確認して、「Download it!」ボタンをクリックしてください。






  * 「1 - Pre-configuration」は「Bootstrap」を選択
  * 「2 - Fine tunning」はデフォルトのまま変更しない




![](/uploads/2015/05/150523-55602176deacf.png)






ダウンロードされた圧縮ファイルを展開すると下図のような構造になっているはずです。




    
    ├── apple-touch-icon.png
    ├── browserconfig.xml
    ├── css
    │   ├── bootstrap-theme.css
    │   ├── bootstrap-theme.css.map
    │   ├── bootstrap-theme.min.css
    │   ├── bootstrap.css
    │   ├── bootstrap.css.map
    │   ├── bootstrap.min.css
    │   └── main.css
    ├── favicon.ico
    ├── fonts
    │   ├── glyphicons-halflings-regular.eot
    │   ├── glyphicons-halflings-regular.svg
    │   ├── glyphicons-halflings-regular.ttf
    │   └── glyphicons-halflings-regular.woff
    ├── img
    ├── index.html
    ├── js
    │   ├── main.js
    │   └── vendor
    │       ├── bootstrap.js
    │       ├── bootstrap.min.js
    │       ├── jquery-1.11.2.min.js
    │       ├── modernizr-2.8.3-respond-1.4.2.min.js
    │       └── npm.js
    ├── tile-wide.png
    └── tile.png





「index.html」をブラウザで表示すると、大きな文字で「Hello, world!」と表示されているのが確認できたでしょうか。ここまでで下準備は完了です。





![](/uploads/2015/05/150523-5560217b5fbc7.png)






## WordPressテーマの作成





では、いよいよWordPressテーマ作成に入っていきます。上記のフォルダーを、WordPressの`themes`フォルダーにコピーします。また、`index.html`を`index.php`にリネームします。





続いて、WordPress自身にこれがテーマであることを認識させるためには、**style.css**を作成する必要があります。**style.css**に記述され内容から、WordPressはこれがテーマファイルであるかどうかを認識します。





### style.css





以下のソースをコピーして、「index.html」と同じ階層に**style.css**という名前で格納してください。`Theme Name:` がWordPressが認識するテーマの名前になります。なお、`Theme URI:` 、`author`、`Version` については任意の文字列に変更してください。




    
    /*
    Theme Name: initializr
    Theme URI: http://wordpress.local/
    author: Ottan
    author URI: http://wordpress.local/
    Description: Version: 0.1.0
    License: GNU General Public License v2 or later
    License URI: http://www.gnu.org/licenses/gpl-2.0.html
    Tags:
    Text Domain:
    */
    





スタイルシートの作成が完了したら、WordPressの管理画面にアクセスします。「外観」→「テーマ」と進み、新規作成した「Initializr」が表示されていることを確認してください。表示されていることが確認できたら、さっそくテーマを有効化しましょう。





![](/uploads/2015/05/150523-5560217f0eefc.png)






はじめて有効化した時点では表示が崩れていると思いますが、今後修正しますので今のところは放置で大丈夫です。





### コンテンツからヘッダーとフッターの分離





現在、すべてのファイルが「index.php」に集約化されていますが、メンテナンス性、拡張性を考慮して、ヘッダー部分とフッター部分を分離します。`<div class="jumbotron">` より前までをヘッダー、`<footer>` から後ろをフッターとして切り離し、各々を「**header.php**」、「**footer.php**」として別ファイルに切り出してください。一部内容を割愛していますが、切り離し後のヘッダー、フッターは以下のようになります。





**header.php**




    
    <!doctype html>
    <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
    <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
    <!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
    <!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <title></title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="apple-touch-icon" href="apple-touch-icon.png">
    
            <link rel="stylesheet" href="css/bootstrap.min.css">
            <style>
                body {
                    padding-top: 50px;
                    padding-bottom: 20px;
                }
            </style>
            <link rel="stylesheet" href="css/bootstrap-theme.min.css">
            <link rel="stylesheet" href="css/main.css">
    
            <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
            <?php wp_head(); ?>
        </head>
        <body>
            <!--[if lt IE 8]>
                <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <form class="navbar-form navbar-right" role="form">
                <div class="form-group">
                  <input type="text" placeholder="Email" class="form-control">
                </div>
                <div class="form-group">
                  <input type="password" placeholder="Password" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Sign in</button>
              </form>
            </div><!--/.navbar-collapse -->
          </div>
        </nav>






**footer.php**




    
          <footer>
            <p>&copy; Company 2015</p>
          </footer>
        </div> <!-- /container -->        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
            <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
    
            <script src="js/vendor/bootstrap.min.js"></script>
    
            <script src="js/main.js"></script>
    
            <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
            <script>
                (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
                function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
                e=o.createElement(i);r=o.getElementsByTagName(i)[0];
                e.src='//www.google-analytics.com/analytics.js';
                r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
                ga('create','UA-XXXXX-X','auto');ga('send','pageview');
            </script>
            <?php wp_foot(); ?>
        </body>
    </html>





「**header.php**」「**footer.php**」に、各々`wp_head()`関数、`wp_footer()`関数を追加しています。これは、各種プラグインやウィジェット、WordPressのダッシュボードを正常に動作させるために必要な関数です。ここでは、何も考えず追加しておいてください。





また、分割した「**header.php**」、「**footer.php**」をメインの「**index.php**」から呼ぶためにコードを修正します。この時点で、「**index.html**」ファイルの拡張子を「**index.php**」に変更しておいてください。「**index.php**」の冒頭と末尾に、`get_header()` 、`get_footer()`を追記します。これで、「**index.php**」からヘッダーとフッターを呼ぶことができるようになります。





**index.php**




    
    <?php get_header(); ?>
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron"> ... </div>
    <div class="container">
        <!-- Example row of columns -->
        <div class="row"> ... </div>
    </div>
    <hr>
    <?php get_footer(); ?>





### スタイルシート、JavaScriptの呼び出し元をテンプレートディレクトリ配下に変更





「**index.php**」にアクセスすると、以下の図のように表示が崩れてしまっています。これは、正しくスタイルシート、JavaScriptが読み込めていない（パスが正しくない）ためにおこる現象です。





![](/uploads/2015/05/150523-5560289b33576.png)






サイトが正しく表示されるように先ほど分離した「**header.php**」、「**footer.php**」の内容を以下の通り変更します。テンプレートを格納したディレクトリを呼び出すためには、`get_template_directory_uri()` 関数を使用します。





**header.php**





`bootstrap.min.css` 、`bootstrap-theme.min.css` 、`main.css` 、`modernizr-2.6.2-respond-1.1.0.min.js` に対して、上記の関数を使用して呼び出し場所を調整します。




    
    <!doctype html>
    <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
    <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
    <!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
    <!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <title></title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="apple-touch-icon" href="apple-touch-icon.png">
    
            <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.min.css">
            <style>
                body {
                    padding-top: 50px;
                    padding-bottom: 20px;
                }
            </style>
          <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/bootstrap-theme.min.css">
          <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/main.css">
    
            <script src="<?php echo get_template_directory_uri(); ?>/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
            <?php wp_head(); ?>
        </head>
        <body>
            <!--[if lt IE 8]>
                <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <form class="navbar-form navbar-right" role="form">
                <div class="form-group">
                  <input type="text" placeholder="Email" class="form-control">
                </div>
                <div class="form-group">
                  <input type="password" placeholder="Password" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Sign in</button>
              </form>
            </div><!--/.navbar-collapse -->
          </div>
        </nav>





**footer.php**





`jquery-1.11.2.min.js` 、`bootstrap.min.js` 、`main.js` に対して、`get_template_directory_uri()` 関数を使用して呼び出し元を修正します。なお、フッターのGoogle Analyticsのコードは、必要に応じて`UA-XXXXX-X` の内容を変更してください。




    
          <footer>
            <p>&copy; Company 2015</p>
          </footer>
        </div> <!-- /container -->        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
            <script>window.jQuery || document.write('<script src="<?php echo get_template_directory_uri(); ?>/js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
    
            <script src="<?php echo get_template_directory_uri(); ?>/js/vendor/bootstrap.min.js"></script>
    
            <script src="<?php echo get_template_directory_uri(); ?>/js/main.js"></script>
    
            <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
            <script>
                (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
                function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
                e=o.createElement(i);r=o.getElementsByTagName(i)[0];
                e.src='//www.google-analytics.com/analytics.js';
                r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
                ga('create','UA-XXXXX-X','auto');ga('send','pageview');
            </script>
            <?php get_footer(); ?>
        </body>
    </html>





### 動作確認





![](/uploads/2015/05/150523-55602d0c77521.png)






この図のように表示されていれば、正しく修正されています。





## まとめ





Twitter Bootstrapを、WordPressのテーマにカスタマイズするところまでは完了です。次回以降は、本テーマを使用して、投稿の表示、サイドバーの表示についてチャレンジしたいと思います。
