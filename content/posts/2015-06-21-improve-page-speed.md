---
author: ottan
date: 2015-06-21 13:23:38+00:00
draft: false
title: WordPressのサイト表示速度を高速化させるために行っている施策まとめ
type: post
url: /improve-page-speed-1737/
categories:
- WordPress
tags:
- Development
---

![](/images/2015/06/150621-5586badf5ab09.jpg)






あなたのサイトの表示速度を向上するためのTipsをいくつかご紹介します。すべて弊サイトで実際に行っている施策ばかりです。サイトの表示速度は、SEOにとっても重要な要素です。ぜひ挑戦してみてください。





## WordPressアップロード前の下準備


 

### 画像ファイルの圧縮





WordPressに限らず、Webサイト表示のロード時間の大部分を要するのは、容量の多い画像ファイルです。できる限りアップロード前に圧縮を済ませておくことが望ましいです。画像を圧縮するソフトウェアやWebサービスは星の数ほどありますが、オススメはPNGファイルが「pngquant」、JPEGファイルが「jpegoptim」です。





#### pngquant、jpegoptimのインストール





どちらもCUIで使用するツールです。macOSのパッケージ管理ソフト「[Homebrew](http://brew.sh/)」でインストールできます。[Homebrew](http://brew.sh/)のインストールについては、[はじめてのgulp.js！MacでCSSファイル、JavaScriptの圧縮を行おう](https://ottan.xyz/gulp-css-sass-268/)を参照してください。




    
    brew install pngquant jpegoptim





#### 使用方法





どちらもターミナルから使用します。「pngquant」は、PNGの色数を減らすオプションもありますが、デフォルトのままでも十分な圧縮が期待できます。




    
    pngquant --force XXXX





「jpegoptim」は、メタ情報をすべて削除した上で、画質を80%程度に落とすのがオススメです。これ以上画質を落とした場合、劣化が気になり始めます。




    
    jpegoptim -f -s -m80 XXXX









#### JPEG形式とPNG形式の使い分け





そもそもJPEG形式とPNG形式はどのように使い分ければ良いのでしょうか。





JPEG形式は**色数が多い写真**のような媒体に向いています。高精細な媒体を使用する場合は、JPEGを選びましょう。iPhoneのカメラアプリで撮影した写真はJPEGで保存されます。





PNG形式は**色数が少ないイラスト**のような媒体に向いています。iPhoneのスクリーンショットはPNG形式で保存されます。写真とスクリーンショットで種類が違う理由はここにあるのです。





1600×1059サイズのJPEGファイルのもともとの容量は約200KBですが、あえてPNG形式で保存し直すと、**容量は1.3Mと約7倍近くに膨れ上がります**。画像を適切に扱うだけで、画像ファイルのサイズは増加したりも減少したりもしますので、注意しましょう。








### 画像ファイルのリサイズ





たとえば、 `<div>` タグの横幅が200pxしかないにもかかわらず、同タグの中に横幅が1,000pxの画像を配置することは、リソースのムダ遣いになります。適切な横幅のボックスに適切なサイズの画像を配置することが重要です。




WordPressには便利なオプションが用意されています。たとえば、上記の `<div>` タグに横幅一杯の画像を表示する予定であれば、**functions.php**に以下を追加しましょう。




    
    add_image_size( 'custom-size', 200, 9999 )





と、指定しておくことにより、**新規アップロード時に横幅200px（縦幅は任意）の画像ファイルを自動生成してくれます**。ただし、新規アップロード時のみです。すでにアップロード済みの画像ファイルには適用されませんので注意してください。
    
    the_post_thumbnail( 'custom-size' ),




上記の画像ファイルを読み込むためには、 `the_post_thumbnail()` 関数を使います。「custom-size」という名称が定義されている場合には、事前に `add_image_size` で指定した画像が読み込まれます。





なお、WordPressではデフォルトで3種類の画像サイズが定義されており、画像ファイルの新規アップロード時には3種類のファイルが自動生成されるようになっています。もし、必要としないのであれば「設定」→「メディア」からすべて空白にしておきましょう。





#### Force Regenerate Thumbnails





もし、すでにアップロード済みの画像に対して、サムネイルのサイズを変更したい場合には、[WordPress › Force Regenerate Thumbnails « WordPress Plugins](https://wordpress.org/plugins/force-regenerate-thumbnails/)がオススメです。古いサイズのサムネイル画像を削除した上で、新しいサイズの画像ファイルを自動生成してくれます。





### スタイルシート、JavaScriptの圧縮





塵も積もれば山となる、スタイルシート、JavaScriptもその対象です。Webサイトで読み込むスタイルシート、JavaScriptのサイズが小さければ小さいほど、そして少なければ少ないほどサイトの表示速度は向上します。





ブラウザはHTMLファイルを上から下に順番に読み込んでいくため、HTMLの上位に大きなサイズのスタイルシートやJavaScriptが存在する場合、そこで読み込みが止まってしまいサイト表示速度が著しく遅くなります。





よって、**ページのレンダリングに必要なスタイルシートは上位で、ページのレンダリングに不要なJavaScriptは下位で読み込む**のが、サイト表示速度を上げる定石とされています。





#### スタイルシートの圧縮





スタイルシートの圧縮については[はじめてのgulp.js！MacでCSSファイル、JavaScriptの圧縮を行おう](https://ottan.xyz/gulp-css-sass-268/)でご紹介した「gulp.js」をオススメします。手元に「gulp.js」の実行環境がない場合は、Webサービスを利用する手もありますが、この際ですから是非「gulp.js」の環境構築をオススメします。手間が随分違いますよ。





また、上記はスタイルシート（CSSファイル）の圧縮についてのみ触れていますが、JavaScriptも同様に「gulp.js」で圧縮できます。





#### gulp-uglify





gulp-uglifyは、JavaScriptを圧縮してくれる便利なプラグインです。インストールは、その他のgulpプラグインと同様です。




    
    npm install gulp-uglify --save-dev





また、gulpfile.jsには以下のように記述します。




    
    var gulp = require('gulp');
    gulp.task('jsmin', function() {
        var rename = require('gulp-rename');
        var uglify = require('gulp-uglify');
        gulp.src('wordpress/wp-content/themes/macious/src/js/*.js').pipe(uglify()).pipe(rename({
            suffix: '.min'
        })).pipe(gulp.dest('wordpress/wp-content/themes/macious/js'));
    });





圧縮前のファイルを残すために、拡張子の前に「.min」という文字列を付与しています。このように、「gulp.js」を使用すればすべてのタスクを自動化できます。





## Webサーバの設定





Webサーバ側の設定です。今回は弊サイトを運営しているエックスサーバーに採用されているApacheについて触れます。その他のWebサーバについても同様の設定が可能ですが、検証できる環境がありませんので、今回はApacheのみとさせてください。





### ブラウザキャッシュの活用





JPEGファイル、PNGファイル、スタイルシート、JavaScriptなど、一度アップロードしてしまえば、初期構築時を除き、なかなか更新することはありません。このような「静的」リソースは、一度表示した後は、ブラウザ（すなわちクライアント）のキャッシュから表示してもらう方法が高速です。




キャッシュが無効の場合、サイトへアクセスするたびに画像やスタイルシートがダウンロードされてしまうため、サイト表示に時間がかかります。スタイルシート、JavaScriptは結構変更することが多くて、という場合でも、**画像ファイルだけでもキャッシュするとサイト表示速度向上に大きな効果が望めます**。




Webサーバ（Apache）の設定は「.htaccess」ファイルで行います。WordPressインストールディレクトリ直下のこのファイルを編集してください。なお、**# END WordPressより上の項目は、サーバ初期構築時、WordPressインストール（パーマリンク設定時）に自動更新されたもの**です。誤って編集しないよう注意しましょう。




    
    <IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/png "access plus 1 months"
    ExpiresByType image/jpeg "access plus 1 months"
    ExpiresByType image/gif "access plus 1 months"
    </IfModule>





これでブラウザ側に画像ファイルがキャッシュされるようになります。サーバ側に高負荷をかけることもなく、ユーザーのサイト表示の体感速度も大幅に向上するためオススメです。（ただし、mod_expiresがサポートされているWebサーバのみで有効です）





### 圧縮可能なリソースの圧縮





画像ファイルはブラウザにキャッシュさせることでサイト速度を向上させることができましたが、その他のコンテンツはどうすればよいでしょうか。Apacheを始めとするWebサーバにはコンテンツを圧縮して転送する技術があります。これを使用します。




具体的には、.htaccessに以下のように記述します。




    
    <IfModule mod_deflate.c>
    SetOutputFilter DEFLATE
    SetEnvIfNoCase Request_URI .(?:gif|jpe?g|png|ico)$ no-gzip dont-vary
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/atom_xml
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/x-httpd-php
    </IfModule>





画像ファイルは圧縮した上でアップロードしているため、Webサーバによる圧縮の対象外としてます。また、mod_deflateはサーバのCPU使用率を向上させる可能性があります。設定を間違えると、とくにレンタルサーバの場合、第三者が害を被ることがありますので注意してください。mod_deflateについては以下のサイトが参考になりました。



http://oxynotes.com/?p=6519



## WordPressの設定





最後は、WordPressの設定です。上記で補えない箇所を、WordPressやjQueryのプラグインを使用して高速化します。





### 001 Prime Strategy Translate Accelerator





WordPressは、世界各国で使用されている万国共通のCMSです。そのため、日本語のみならず英語やドイツ語といった外国語をサポートしているのが特徴です。そのために、WordPressは環境に応じて言語を使い分けているのですが、この言語の翻訳に多少時間を要します。





そこで、この翻訳ファイルを改めて翻訳しないようキャッシュして表示を高速化するのがこのプラグインです。公式リポジトリに登録されているプラグインのため、WordPressのダッシュボードからインストールできます。オンにしておくだけで効果が表れますので、ぜひ導入しましょう。



https://wordpress.org/plugins/001-prime-strategy-translate-accelerator/



なお、WordPressのデバッグモードをONにしている場合で、かつこのプラグインを利用している場合、以下のような警告が表示されます。動作に影響はありませんが、本番環境ではデバッグモードはOFFにしておきましょう。
    
    Strict Standards: Redefining already defined constructor for class Prime_Strategy_Translate_Accelerator in /var/www/wordpress/wp-content/plugins/001-prime-strategy-translate-accelerator/001-prime-strategy-translate-accelerator.php on line 34

**wp-config.php**
    
    define( 'WP_DEBUG', false );





### EWWW Image Optimizer





画像ファイルの圧縮に使用するプラグインです。冒頭で述べた通り、できる限りローカル環境において、画像ファイルの圧縮、最適化を行った上でアップロードすることが望ましいですが、環境がない場合はこのプラグインを使いましょう。





アップロードした画像を自動で圧縮、最適化してくれます。投稿以外のファビコンで使用している画像など、意図せぬところにまだ最適化、圧縮の余地が残されている画像が存在したりするものです。導入しておいて損はないプラグインです。



https://wordpress.org/plugins/ewww-image-optimizer/



### WP-Optimize





WordPressは、MySQLというリレーショナルデータベースを使用しています。データベースは、データの挿入、削除を繰り返すと、ハードディスクのようにムダな空き領域がうまれたり、検索パフォーマンスが著しく低下する可能性があります。





そのため、MySQLも定期的にメンテナンスを行うことが望ましいのですが、データベースに直接アクセスするのは敷居が高いことがよくあります。（エックスサーバーはphpMyAdminからアクセスできます）





そんなときに便利なのが、このプラグインです。一時的に使用されたテーブルのレコード削除や、データベース全体の最適化を行ってくれます。常時オンにしておく必要性はありませんが、導入しておいて損はないプラグインといえます。



https://wordpress.org/plugins/wp-optimize/



### ソーシャルネットワーク





最後にソーシャルネットワークのシェアボタンの設置についてです。Twitter、Facebook、Google+、はてなブックマークなど、まともに公式サイトのボタンを設置して取得しようとすると時間がかかってしまいます。





そのため、弊サイトでは[jQueryを使用してTwitter、Facebook、Google+、はてなブックマークのシェア数を非同期で取得する方法のまとめ](https://ottan.xyz/jquery-social-network-share-count-1705/)でもご紹介したように、すべて非同期による読み込みを行い、サイト表示速度向上を図っています。ぜひこちらもご覧いただければと思います。





その他、非同期で読み込む方法はすでに定石化されています。下記のサイトの他、多数のサイトで紹介されていますので、読み込む時間が遅く感じる場合には参考にされてみてください。



http://tokkono.cute.coocan.jp/blog/slow/index.php/xhtmlcss/asynchronous-loading-of-major-social-buttons/



## まとめ





いかがでしたでしょうか。少しでもWordPress運営者の皆様の参考になればと思います。





上記の施策は一例です。その他にもさまざまな施策を行われているところもあると思います。もし、そのような事例があれば、ぜひコメント欄または [@おったん](https://twitter.com/ottanxyz)まで教えてくださいね。
