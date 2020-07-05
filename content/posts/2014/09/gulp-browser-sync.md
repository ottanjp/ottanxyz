---
author: ["@ottanxyz"]
date: 2014-09-21T00:00:00+00:00
draft: false
title: gulp.jsとBrowser Syncで快適なWordPress開発環境を手に入れる
type: post
slug: gulp-browser-sync-476
categories:
  - Blog
tags:
  - Development
---

![](/uploads/2014/09/140921-541e5278dd510.jpg)

## Browser Sync のインストール

まず、[BrowserSync](http://www.browsersync.io/)をダウンロードします。BrowserSync をダウンロードには`npm`コマンドを使用します。`npm`コマンドを使用するための設定については、[はじめての gulp.js！Mac で CSS ファイル、JavaScript の圧縮を行おう gulp-css-sass-268](//)を参考にしてください。

    $ sudo npm install -g browser-sync

### BrowserSync の動作確認

BrowserSync のインストールが完了したら動作確認しましょう。BrowserSync を起動するためには、以下のコマンドを実行します。これで、`css`ディレクトリ配下に保存されている CSS ファイルが変更される都度、ブラウザがリロードされます。

    $ browser-sync start --server --files "css/*.css"

#### 動作確認

以下のような HTML ファイルを作成します。

    <!DOCTYPE html>
    <html>
    <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="style.css">
    </head>
    <body>
    <h1 class="sample">Hello, World!</h1>
    </body>
    </html>

スタイルシートの内容は以下の通りです。

    .sample {
    	color: black;
    }

この状態でブラウザを見ると、以下のような状態になっています。

![](/uploads/2014/09/140920-541d6cc0989fe.png)

続いて、スタイルシートの内容を変更します。

    .sample {
    	color: red;
    }

スタイルシートの変更がリアルタイムに反映されました。

![](/uploads/2014/09/140920-541d6cc28ab71.png)

以上の内容を踏まえて、BrowserSync の環境を WordPress に適用します。

## WordPress の環境構築

WordPress の環境構築は、[Vagrant](https://www.vagrantup.com/)を使用するのが簡単です。[VCCW - Vagrant based development environment for WordPress](http://vccw.cc/)は、VirtualBox、Vagrant をインストールしておけば、後は自動的に WordPress に必要な環境を仮想マシンに適用してくれる便利なツールです。今回はこれを利用します。公式サイトに従い、VirtualBox、Vagrant をインストールしましょう。

### VirtualBox のインストール

https://www.virtualbox.org/

### Vagrant のインストール

仮想マシンをエミュレートするソフトウエアを「Vagrant」では「Provider」（プロバイダーー）と表現しており、「VirtualBox」の他、有償ソフトウエアとして VMware 社の「VMware Fusion」や Parallels 社の「Parallels Desktop」をサポートしています。そのため、「Vagrant」とここでご紹介したエミュレーターソフトウエアが 1 つあれば、CUI 操作のみで誰でも簡単に仮想マシンを構築できます。

https://www.vagrantup.com/

### VCCW のインストール

次に、仮想マシンのイメージファイルである「Box」を構築します。今回は、前述のように「[VCCW](http://vccw.cc/)」を使用します。「[VCCW ](http://vccw.cc/)」を導入するだけで、WordPress でのプラグインやテーマの開発に必要なすべてがそろいます。

[VCCW ](http://vccw.cc/)の手順に従いインストールします。「hostsupdater」とは、文字通り「hosts」ファイルを自動的に「update」してくれる優れたプラグインです。仮想マシン起動時、仮想マシンに割り当てたプライベート IP アドレス、ホスト名を自動的に「hosts」ファイルに追加してくれます。

    $ vagrant plugin install vagrant-hostsupdater

続いて、GitHub で公開されている VCCW の[git リポジトリ](https://github.com/miya0001)の最新版をコピーします。公開されている git リポジトリは、 git コマンドにより、ターミナルから簡単に取得できます。

    $ git clone https://github.com/miya0001/vccw.git

作業ディレクトリに移動します。

    $ cd vccw

Vagrant で仮想マシンを構築するにあたっては、仮想マシンの構成を記述した「[Vagrantfile](https://docs.vagrantup.com/v2/vagrantfile/)」が必要になります。VCCW では、あらかじめ最適な「Vagrantfile」が用意されているため、それをそのまま利用します。

    $ cp Vagrantfile.sample Vagrantfile

最後に仮想マシンを起動したら準備は完了です。仮想マシンの初期構築は、OS の設定、WordPress の構築など、多岐に亘る作業が自動的に行われるため、時間を要します。時間に余裕があるときに実行すると良いでしょう。

    $ vagrant up

## gulp.js のインストール

続いて、[BrowserSync](http://www.browsersync.io/)をより効率的に使用するために、Node.js ベースのタスクランナーである「gulp.js」をインストールします。なお、「gulp.js」については、[はじめての gulp.js！Mac で CSS ファイル、JavaScript の圧縮を行おう](/posts/2014/09/gulp-css-sass-268/)で詳しくご紹介していますので、こちらもご覧ください。

### Node.js のインストール

[node.js](https://nodejs.org/)のインストールには[Homebrew — OS X 用パッケージマネージャー](https://brew.sh/index_ja.html)が便利です。Homebrew については、[Mac でプレゼン資料に数式を貼り付けるのに便利な「LaTeXiT」](/posts/2014/09/mac-latex-presentation-92/)で詳しくご紹介していますので、こちらも合わせてご覧ください。

    $ brew install node

### gulp.js のインストール

続いて、gulp.js のインストールを行います。gulp.js は Node.js ベースであるため、プラグインの管理はすべて`npm`コマンドで行います。まずは、`gulp`コマンドを利用するために、「gulp.js」をグローバルインストールします。ローカルインストール、グローバルインストールの違いについては[はじめての gulp.js！Mac で CSS ファイル、JavaScript の圧縮を行おう](/posts/2014/09/gulp-css-sass-268/)をご覧ください。

    $ sudo npm install -g gulp

### プラグインのインストール

今回利用するプラグインは、

- Sass のコンパイル（gulp-sass）
- CSS 属性へのベンダープレフィックスの自動補完（gulp-autoprefixer）
- CSS の圧縮（gulp-cssmin）
- リネーム（gulp-rename)

です。以下のコマンドを実行してプラグインをインストールしてください。

    $ npm install --save-dev gulp




    $ npm install --save-dev gulp-sass




    $ npm install --save-dev gulp-autoprefixer




    $ npm install --save-dev gulp-cssmin




    $ npm install --save-dev gulp-rename

### browser-sync のインストール

今回の主役である「BrowserSync」をローカルインストールします。

    $ npm install --save-dev browser-sync

### gulpfile.js の作成

次に gulp.js の構成定義ファイルである「gulpfile.js」を作成します。

    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var autoprefixer = require('gulp-autoprefixer');
    var cssmin = require('gulp-cssmin');
    var rename = require('gulp-rename');
    var browserSync = require('browser-sync');

    gulp.task('sass', function () {
        gulp.src('/path/to/src/css/*.scss')
            .pipe(sass())
            .pipe(autoprefixer(["last 2 version", "ie 8", "ie 7"]))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('/path/to/css'))
            .pipe(browserSync.reload({stream: true}));
    });

    gulp.task('browser-sync', function () {
        browserSync({
            proxy: "wordpress.local"
        });
    });

    gulp.task('bs-reload', function () {
        browserSync.reload();
    });

    gulp.task('default', ['browser-sync'], function () {
        gulp.watch("/path/to/src/css/*.scss", ['sass']);
        gulp.watch("/path/to/wordpress/theme/*.php", ['bs-reload']);
    });

#### 解説

    gulp.task('sass', function () {
        gulp.src('/path/to/src/css/*.scss')
            .pipe(sass())
            .pipe(autoprefixer(["last 2 version", "ie 8", "ie 7"]))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('/path/to/css'))
            .pipe(browserSync.reload({stream: true}));
    });

「sass」というタスクを定義します。「/path/to/src/css」ディレクトリ配下の「scss」のコンパイルを`sass()`で実行します。

次に、`autoprefixer()`により、主要ブラウザ（Internet Explorer、Google Chrome、Safari、Firefox、Opera など）の 2 つ前のメジャーバージョンに適用できるよう CSS ファイルを修正します。

次に、`cssmin()`により Sass コンパイル、およびベンダープレフィックスの修正が完了した CSS ファイルを圧縮します。さらに、圧縮したファイルに接尾辞を付与し「XXXX.min.css」に変更し、`dest()`により所定のディレクトリに保存します。

最後に、browserSync の`reload()`関数によりブラウザを変更します。`{stream: true}`オプションを付与することによりブラウザをリロードすることなく変更を確認できます。

#### browserSync の stream オプションについて

BrowserSync は、**ストリーミング**をサポートしています。すなわち、タスクの中で変更が発生したファイルのみを読み込み、画面に再描画することができるようになっています。ただし、PHP のソースコードの変更など、ストリーミングによる再読み込みでは正しく描画できない場合は、ブラウザのリロードを意図的に行う必要があります。

    gulp.task('bs-reload', function () {
        browserSync.reload();
    });

gulp.js で BrowserSync のリロードを意図的に行うためには、上記のようなリロードを行うタスクを定義します。

    gulp.task('browser-sync', function () {
        browserSync({
            proxy: "wordpress.local"
        });
    });

次に、BrowserSync を起動するためのタスクを定義します。ポイントは、`proxy`に「wordpress.local」を指定しているところです。`proxy`を定義することにより、構築済みの WordPress 環境に対して BrowserSync を適用できるようになります。

    gulp.task('default', ['browser-sync'], function () {
        gulp.watch("/path/to/src/css/*.scss", ['sass']);
        gulp.watch("/path/to/wordpress/theme/*.php", ['bs-reload']);
    });

最後に、「default」タスクの定義を行います。「default」は、`gulp`コマンドの引数が何も指定されなかった場合に実行されるタスクです。`['browser-sync']`と記述することにより、「default」タスクが実行される前に「browser-sync」タスクが実行されます。

また、`watch`により、scss ファイルに変更があった場合は「sass」タスクを、PHP ファイルに変更があった場合は「bs-reload」タスクを実行するよう定義します。PHP ファイルは、BrowserSync によりストリーミングできないため、手動でブラウザをリロードさせます。

## 動作確認

### SCSS ファイルの場合

![](/uploads/2014/09/140921-541e51bd06613.png)

現在の SCSS ファイルの状態は以下のようになっています。

    .entry-title h1 {
      margin: 0 0 8px;

タイトルの文字数を少し大きくしてみます。

    .entry-title h1 {
      margin: 0 0 8px;
      font-size: 2em;

ブラウザが自動的にリロードされ、文字のサイズが大きくなりました。

![](/uploads/2014/09/140921-541e51bfb2051.png)

### PHP ファイルの場合

![](/uploads/2014/09/140921-541e51bd06613.png)

タイトルの右端に投稿 ID を表示してみましょう。

      <h1 class="h2">
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?>
      </a>
      </h1>
    </div>





      <h1 class="h2">
      <a href="<?php the_permalink(); ?>">
        <?php the_title(); ?> - <?php the_ID(); ?>
      </a>
      </h1>
    </div>

![](/uploads/2014/09/140921-541e51c23295c.png)

ブラウザが自動的にリロードされ、変更内容が反映されました！
