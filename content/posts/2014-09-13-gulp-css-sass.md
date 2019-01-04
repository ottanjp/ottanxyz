---
author: ottan
date: 2014-09-13 08:11:46+00:00
draft: false
title: はじめてのgulp.js！MacでCSSファイル、JavaScriptの圧縮を行おう
type: post
url: /gulp-css-sass-268/
categories:
  - Mac
tags:
  - Development
---

![](/images/2014/09/140913-5413ee6d218c6.jpg)

[@おったん](https://twitter.com/ottanxyz)です。「gulp.js」はタスクランナーと呼ばれるプログラムで、その他に著名なものとして「Grunt」があります。どちらも聞いたことがあるけれど、難しそうでなかなか手がつけられない…そう思ってはいませんか？「gulp.js」はとっても簡単なんです！今からでも始めましょう。

## Homebrew のインストール

「gulp.js」で使用するパッケージ（プラグイン）の管理は、すべて「Node.js」で行います。「Node.js」は Homebrew を使用してインストールできます。まずは、Homebrew をインストールしましょう。

Homebrew のインストール方法は、[Homebrew — The missing package manager for macOS](http://brew.sh/) に記載されているインストール方法に従うだけです。記事執筆時点のインストール方法は、以下のコマンドを実行するだけです。また、Homebrew については[Mac でプレゼン資料に数式を貼り付けるのに便利な「LaTeXiT」](/mac-latex-presentation-92/)でも詳細を解説していますので、こちらも合わせてご覧ください。

    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

## Node.js のインストール

次に、Node.js をインストールします。Node.js のインストールは、Homebrew で行います。実は公式サイトでインストーラーも配布されていますが、今後のパッケージのアップデート等を考えると、Homebrew のほうが圧倒的に便利です。

    $ brew install node

以下のコマンドを実行して、Node.js が正常にインストールされたか確認します。

    $ node -v

バージョン情報が表示されれば、正常にインストールされています。

### Node.js が正常にインストールできない場合

過去に Node.js を別の方法（公式サイトで配布されているインストーラー等）でインストールしたことがある場合、Homebrew でインストールしようとすると正しく動作しない可能性があります。その場合は、いったん Node.js の環境を初期化した上で、再度インストールを行います。

    $ npm uninstall npm -g
    $ brew update
    $ brew uninstall node
    $ sudo rm -rf /usr/local/lib/node_module
    $ sudo rm -rf /usr/local/include/node
    $ sudo rm -rf /usr/local/lib/node

## gulp.js のインストール

続いて、gulp.js をインストールします。

    $ npm install -g gulp

ここで登場した`npm`コマンドは、**N**ode **P**ackage **M**anager の略称で、Node.js のパッケージ管理に使用します。Node.js をインストールすると使用できるようになります。gulp.js のインストールは、この`npm`コマンドを使用して行います。

### 「グローバル」と「ローカル」の違いについて

npm コマンドによるインストールには、「**グローバルインストール**」と「**ローカルインストール**」の２種類が存在します。デフォルトの状態では「ローカル」、「-g」オプションを付与すると「グローバル」になります。では、「グローバル」と「ローカル」の違いは何でしょうか。

#### ローカルインストール

ローカルインストールしたパッケージは、カレントディレクトリの「node_modules」配下にインストールされます。**タスクとして実行したいパッケージはすべてローカルインストールしておく**必要があります。

#### グローバルインストール

グローバルインストールしたパッケージの実行ファイルは、「/usr/local/bin」配下にインストールされます。gulp.js のタスクを実行するためには「gulp」パッケージが必要です。そのため、「gulp」パッケージについては、ローカルインストールではなくグローバルインストールを選択します。

ただし、「gulp」パッケージはタスクとしても実行する必要があるため、グローバルインストール、ローカルインストールの 2 回行います。

## gulp.js でタスクを自動実行する

今回は、gulp.js で Scss のコンパイル、および CSS、JavaScript の圧縮を行います。

### パッケージ管理ファイル（package.json）の作成

まず、パッケージ管理ファイルを生成します。といっても難しくありません。作業ディレクトリまで移動したあと、以下のコマンドを実行します。対話型でいろいろ聞かれますが、何も入力せず ↵ を押してしまって構いません。作業ディレクトリもどこでも構いません。

    $ npm init

これで作業ディレクトリに「package.json」ファイルが生成されます。この「package.json」は、パッケージを管理するための json ファイルです。現段階ではプロジェクトのメタ情報（プロジェクト名、バージョン等）しか記述されていません。

    {
      "name": "ottan",
      "version": "0.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
      "test": "echo "Error: no test specified" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }

### パッケージのインストール

gulp.js は、単独でできることは限られていますが、プラグインを利用することで機能を補完できます。[gulp plugin search](http://gulpjs.com/plugins/) でプラグインが公開されていますので、参考にしてみてください。思わぬプラグインが見つかるかもしれません。

パッケージのインストールは、前述の`npm`コマンドを使用します。コマンド実行時に「--save-dev」オプションを付与しておきましょう。このオプションを付与することで、**Node.js のプロジェクトを共有する**場合に絶大な効果を発揮します。

    $ npm install gulp --save-dev
    $ npm install gulp-sass --save-dev
    $ npm install gulp-cssmin --save-dev
    $ npm install gulp-rename --save-dev
    $ npm install gulp-autoprefixer --save-dev
    $ npm install gulp-jsmin --save-dev

今回は「-g」オプションを付与せず、「gulp」パッケージをローカルインストールしている点に注目してください。タスクの定義として「gulp」を使用する場合は、必ずローカルインストールする必要があります。

また、分かりやすいように複数行に分けて記述しましたが、以下のように 1 行で実行することもできます。

    $ npm install gulp gulp-sass ... --save-dev

ここで、再びパッケージ管理ファイル（package.json）を開いてみます。

    {
      "name": "www",
      "version": "1.0.0",
      "description": "",
      "main": "gulpfile.js",
      "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
      "del": "^0.1.2",
      "gulp": "^3.8.7",
      "gulp-autoprefixer": "0.0.10",
      "gulp-clean": "^0.3.1",
      "gulp-cssmin": "^0.1.6",
      "gulp-jsmin": "^0.1.4",
      "gulp-rename": "^1.2.0",
      "gulp-sass": "^0.7.3"
      }
    }

「devDependencies」という項目が追加されています。プロジェクトが依存するパッケージとそのバージョンが列挙されています。「--save-dev」オプションを付与した理由は、この「devDependencies」に必要となるパッケージを自動的に追記するためです。

Node.js のプロジェクトを複数人で共有する場合、パッケージのバージョンの差異による誤作動を未然に防止するためにも、ローカルの開発環境はバージョンも含めて一致している事が望ましいはずです。

Node.js の優れている点は、このパッケージ管理にあります。「package.json」を、別の端末にコピーし、`npm init`を実行すると、「devDependencies」に記載されているパッケージが、自動的にインストールされます。

なお、「Dependencies」については、「--save」「--save-dev」「--save-optional」など複数の記述方法があり、環境によって使い分けられるように工夫されています。「--save-dev」は主に開発環境で使用するためのものです。

### タスク定義ファイル（gulpfile.js）の作成

gulp.js によるタスクの定義は、「gulpfile.js」に記述します。「package.json」と同階層に作成してください。「gulpfile.js」の構造は以下の通りとなっています。こちらについて実例を通して説明したいと思います。まずは、CSS ファイルを圧縮するタスクを作成します。

![](/images/2014/09/140913-5413e79ee7c24.png)

#### CSS を圧縮するタスクを定義する

まずは、CSS ファイルを圧縮するタスクを作成します。

    var gulp = require('gulp');
    var cssmin = require('gulp-cssmin');
    var rename = require('gulp-rename');
    var autoprefixer = require('gulp-autoprefixer');
    var jsmin = require('gulp-jsmin');
    var sass = require('gulp-sass');

    gulp.task('cssmin', function () {
      gulp.src('/path/to/src/*.css')
      .pipe(autoprefixer(["last 2 version", "ie 8", "ie 7"]))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('/path/to/dist/css'));
    });

順を追って説明します。まず、必要なパッケージを宣言します。

    var gulp = require('gulp');
    var cssmin = require('gulp-cssmin');
    var rename = require('gulp-rename');
    var autoprefixer = require('gulp-autoprefixer');
    var jsmin = require('gulp-jsmin');
    var sass = require('gulp-sass');

次に、gulp.js で自動実行したいタスクを宣言します。

    gulp.task('cssmin', function() {
      // do stuff
    }

実際のタスク定義は「function()」の中に記述します。

      gulp.src('/path/to/src/*.css')
      .pipe(autoprefixer(["last 2 version", "ie 8", "ie 7"]))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('/path/to/dist/css'));

タスクの大まかな流れは以下の通りです。「pipe」に書かれている処理を繰り返し行うことになります。

- 「gulp」（ローカルインストール）パッケージの「src」メソッドで対象とするファイルを指定する
- 「pipe」メソッドで出力ファイルを引き継ぎ、さらに処理をする
- 「gulp」パッケージの「dest」メソッドで出力先を指定する

具体的にタスクの意味を見てみましょう。

- 「gulp」パッケージの「src」メソッドで対象とするファイルを指定する
- 「autoprefixer」により、CSS ファイルにベンダプレフィックスを付与する
- 「cssmin」により、CSS ファイルを圧縮する
- 「rename」により、接尾辞（suffix）に「min」を付与する
- 「gulp」パッケージの「dest」メソッドで出力先に CSS ファイルを出力する

ここで定義したタスクは、以下のコマンドで実行できます。「gulpfile.js」と同階層で実行してください。「gulp」コマンドの引数に「gulpfile.js」で定義したタスク名を指定します。

    $ gulp cssmin

#### Scss ファイルをコンパイルするタスクを定義する

    gulp.task('sass', function () {
      gulp.src('/path/to/src/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(["last 2 version", "ie 8", "ie 7"]))
        .pipe(gulp.dest('css/css/'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('path/to/dist/css'));
    });

#### JavaScript を圧縮するタスクを定義する

    gulp.task('jsmin', function () {
      gulp.src('/path/to/src/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('/path/to/dist/js'));
    });

定義中の「/path/to/src」「/path/to/dist」は適宜読み替えてください。

#### 注意事項

「gulp」コマンドの引数を何も指定しない場合、「default」というタスクが実行されます。そのため、「gulpfile.js」に「default」タスクが定義されていない場合に、引数なしの「gulp」コマンドを呼び出すとエラーになります。

タスクから別のタスクを呼び出すこともできます。この「default」タスクを使用してすべてのタスクが処理される様にしておくと利便性が向上します。

    gulp.task('default', ['cssmin', 'sass', jsmin]);

「task」メソッドでは、他のタスクを指定できます。上記のコードを書けば、「default」タスクを実行するだけで、「cssmin」、「sass」の２つのタスクが**非同期（Async）**に実行されます。非同期で実行されることに注意してください。すなわち、「cssmin」タスクの完了を待たず、「sass」タスクが並列で実行されます。（これが、gulp.js が持つ強みでもあります）

#### タスクが非同期に実行される場合の注意点

gulp.js のタスクは、原則、非同期で実行されます。タスク同士に依存関係を持たせたい場合の方法は割愛します。[gulp/docs/API.md at master · gulpjs/gulp · GitHub](https://github.com/gulpjs/gulp/blob/master/docs/API.md) を参考にしてください。

非同期で実行される場合の注意点としては、繰り返しになりますが
**タスクが順番に実行される訳ではない**ということです。たとえば、今回の場合、「cssmin」「sass」の両タスクに依存関係は存在しないため、どちらが先に実行されるかはわかりません。依存関係を付けたい場合は、以下のようにする必要があります。

    gulp.task('sass,  ['cssmin'], function() {
      // do stuff
    });

非同期で実行されても問題ないようにタスクを組むのが一番懸命なやり方です。

### タスクを実行する

では、最後に作成したタスクを実行してみましょう。ターミナルから以下のコマンドを実行します。これで、「default」タスクが実行されます。タスクを指定する場合は、「gulp」の引数に指定します。

    $ gulp

### 今回使用したプラグイン

最後に今回使用したプラグインとその内容について簡単にまとめておきたいと思います。

| プラグイン   | 内容                                                 |
| ------------ | ---------------------------------------------------- |
| autoprefixer | CSS ファイルに自動的にベンダプレフィックスを付与する |
| cssmin       | CSS ファイルを圧縮する                               |
| rename       | ファイルに接頭辞、接尾辞を付与する                   |
| sass         | scss、sass 形式のファイルをコンパイルする            |
| jsmin        | JavaScript を圧縮する                                |
