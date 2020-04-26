---
author: ottan
date: 2014-09-15 10:38:04+00:00
draft: false
title: Sublime Textに導入しているオススメのプラグイン23選
type: post
url: /sublime-text-plugin-321/
categories:
- Mac
tags:
- Development
---

![](/uploads/2014/09/140915-5416c18f73114.jpg)






[@おったん](https://twitter.com/ottanxyz)です。もう高価な統合開発環境なんて必要ありません。WordPressのテーマ開発で私が使用している、恋に落ちる最強エディター「Sublime Text」のオススメパッケージをご紹介します。





## Package Control





Sublime Textにパッケージを導入するにあたって、事前に「Package Control」を導入しておきましょう。「Package Control」の導入は、Sublime Textのバージョンによって異なります。公式サイトのインストール方法にしたがってインストールしてください。コマンドを入力するコンソールは、「View」→「Show Console」から。



https://sublime.wbond.net/installation



## All Autocomplete





![](/uploads/2014/09/140915-54164bb623137.png)






Sublime Textのコード補完を補強するパッケージ。自分で定義した定数や関数も自動的に補完してくれます。導入しておいて間違いなし。





## ApacheConf.tmLanguage





![](/uploads/2014/09/140915-54164bb742154.png)






Apacheの設定ファイルのシンタックスハイライトを行ってくれるプラグイン。





## AutoFileName





![](/uploads/2014/09/140915-54164bba1e72b.png)






All Autocompleteと同様に、Sublime Textのコード補完を補強するパッケージ。





たとえば、編集中のファイルと同一階層に「img」ディレクトリがあるとして、その中の「favicon-152.png」というファイルを`<img>`タグに指定したい場合、`<img src="./"`と打つだけで、「img」ディレクトリ、「favicon-152.png」を自動補完してくれます。絶対パスでの指定も可能。





使いどころはあまり多くないが、導入しておくといざという時に便利なパッケージ。





## BoundKeys





![](/uploads/2014/09/140915-54164bbb82cbd.png)






Sublime Textは、さまざまなキーボードショートカットを使用するため、パッケージ同士で競合することもしばしば。そんな悩みを解消してくれるのがこのパッケージ。どのキーにどのコマンドが割り当てられているかを一覧にしてくれます。ショートカットの調子が悪いと思ったら、このパッケージを導入してみよう。





#### 使い方





一覧の出し方はコマンドパレットから「List bound keys」を呼び出すか、⇧+F10を押しましょう。





![](/uploads/2014/09/140915-54164bbcd1a7c.png)






## BracketHighlighter





![](/uploads/2014/09/140915-54164bbf19190.png)






[]、()、{}、""、''、<tag></tag>の開始、終了をハイライトしてくれる非常に便利なパッケージ。まず、導入しておいて間違いなし。タグや括弧の閉じ忘れ防止に必須です。





## Can I Use





![](/uploads/2014/09/140915-54164bc09d2d4.png)






[Can I use](https://caniuse.com/)は、CSS3やHTML5の各主要ブラウザの対応状態を確認できるWebサービス。このパッケージを導入すれば、選択した単語をすぐに[Can I use](https://caniuse.com/)で検索できて便利です。





![](/uploads/2014/09/140915-5416a6d464316.png)






## ColorPicker





![](/uploads/2014/09/140915-54164bc20ed95.png)






スタイルシートやHTML定義時に、意外に手間がかかるのが「色」の指定。「濃い青色」「薄い緑」など、イメージは沸くのに、16進数にできない、なんて時に役に立ちます。





コマンドパレット（⇧+⌘+P）から、「Color Picker」を実行すれば、OSデフォルトのカラーピッカーが開き、色を選択すれば自動的に現在編集中のファイルにペーストしてくれます。





![](/uploads/2014/09/140915-54164bc43b0b9.png)






## Diffy





![](/uploads/2014/09/140915-54164d31e1f35.png)






2つのファイルを比較してくれるパッケージ。使用する場合は、メニューから「View」→「Layout」→「Columns: 2」（⌥+⌘+2）でレイアウトを2列にした上で、比較したいファイルを左右に並べて、⌘+K、⌘+Dの順に押します。





2つのファイルの差異がハイライトされて表示されるので、コード修正後に正しく表示されなくなったけど、どこを修正したかが思い出せない！という時に便利。忘れん坊の私には必須のパッケージ。





## DocBlockr





![](/uploads/2014/09/140915-54164d33cbfb6.png)






メソッドやクラスの定義をリバースエンジニアリングして、Javadocスタイルのコメントを自動生成してくれる便利なパッケージ。メソッドやクラス定義の1行前にカーソルを置いて、`/*`と打った後、↵を押すだけ。ただし、そのまま使用すると日本語変換時に文字が消失してしまうという残念なパッケージ。私はこれで日本語をやめました。





## Goto-CSS-Declaration





![](/uploads/2014/09/140915-5416a120a8e92.png)






[OZPAの表4](http://ozpa-h4.com/2014/07/25/goto-css-declaration/)さんでも紹介されていた素晴らしく便利で泣けてくるパッケージ。HTMLタグに指定しているクラスを選択して、コンテキストメニューから「Go To CSS Declaration」を選択すると、当該スタイルの定義箇所まで飛んでくれて、非常に便利。





ただし、Sublime Textで定義の存在するCSSファイルを開いておくことが条件です。





![](/uploads/2014/09/140915-5416a1217527c.png)






## HTML-CSS-JS Prettify





![](/uploads/2014/09/140915-5416a1227bc02.png)






HTML、CSS、JS（JavaScript）ファイルを自動整形してくれるプラグイン。圧縮されたCSSやJSの展開にも便利なプラグインです。





![](/uploads/2014/09/140915-5416a123527e2.png)






## jQuery





![](/uploads/2014/09/140915-5416a126431f2.png)






Sublime Textのコード補完を補強するパッケージ。JQueryのコードを補完してくれる。導入しておいて間違いなし。





## SCSS





![](/uploads/2014/09/140915-5416a12a6705e.png)






Sublime Textのコード補完を補強するパッケージ。SCSSのコードを補完してくれる。導入しておいて間違いなし。





## Search Stack Overflow





![](/uploads/2014/09/140915-5416a12b48ff0.png)






分からないことがあれば[Stack Overflow](http://stackoverflow.com/)へ、というくらい同サイトにはWebサイト構築のノウハウが濃縮されています。選択した単語を同サイトで検索してくれる便利なパッケージ。





## SublimeCodeIntel





![](/uploads/2014/09/140915-5416a12c5bcc4.png)






JavaScript、Mason、XBL、XUL、RHTML、SCSS、Python、HTML、Ruby、Python3、XML、Sass、XSLT、Django、HTML5、Perl、CSS、Twig、Less、Smarty、Node.js、Tcl、TemplateToolkit、PHP、とありとあらゆるもののシンタックスハイライト、自動補完を行ってくれる神パッケージ。導入しておいて間違いなし。





## SublimeLinter





SublimeLinterシリーズのフレームワーク。これ単体では何も意味がありませんが、後続のLint系のプログラムを動かすために必要です。





## SublimeLinter-jshint





![](/uploads/2014/09/140915-5416a12d7ef54.png)






JavaScriptのシンタックスチェッカー。





#### インストール





事前に以下をインストールしておく必要があります。




    
    $ sudo npm install -g jshint





npmコマンドがインストールされていない場合は、[はじめてのgulp.js！MacでCSSファイル、JavaScriptの圧縮を行おう](/gulp-css-sass-268/)の記事にしたがってインストールしておいてください。





## SublimeLinter-csslint





CSSのシンタックスチェッカー。





#### インストール





事前に以下をインストールしておく必要があります。




    
    $ sudo npm install -g csslint





## SublimeLinter-contrib-scss-lint





![](/uploads/2014/09/140915-5416a12e668b8.png)






SCSSのシンタックスチェッカー。





#### インストール





事前に以下をインストールしておく必要があります。




    
    $ sudo gem install scss-lint





## SublimeLinter-phplint





PHPのシンタックスチェッカー。





#### インストール





事前に以下をインストールしておく必要があります。




    
    $ sudo npm install -g phplint





## Tag





![](/uploads/2014/09/140915-5416a12f2cb02.png)






Sublime Textのコード補完を補強するパッケージ。かゆいところに手が届くパッケージ。たとえば、`<aside>`と入力した後、`</`と入力するだけで、`</aside>`と閉じタグを自動生成してくれる。まず、導入しておいて間違いなし。





## TrailingSpaces





![](/uploads/2014/09/140915-5416b993865b4.png)






気が付けば、ムダな空白やタブによるスペースが生まれてしまうのは仕方がないこと。1つ1つ手動で綺麗にしておくと日が暮れてしまうので、このパッケージで一網打尽にしちゃいましょう。






## wpseek.com WordPress Developer Assistant





![](/uploads/2014/09/140915-5416a13057e79.png)






Sublime Textのコード補完を補強するパッケージ。WordPress独自のコードを補完してくれるパッケージで、WordPress開発に携わっているなら導入しておいて間違いなし。WordPressの補完といえば、[WordPress](https://sublime.wbond.net/packages/WordPress)が有名だが、こちらのパッケージの方がコード補完時に定義を表示してくれたりするので便利。
