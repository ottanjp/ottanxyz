---
author: ["@ottanxyz"]
date: 2018-07-22 04:02:28+00:00
draft: false
title: 【随時更新】VS CodeでWordPressのテーマやプラグインを開発するために導入したいオススメの拡張機能
type: post
slug: visual-studio-code-wordpress-developer-plugin-6870
categories:
- Blog
tags:
- HTML
- JavaScript
- PHP
- VS Code
- Blog
---

![](/uploads/2018/07/180722-5b53eb5f83ba4.jpg)






統合開発環境（IDE）としては、Atom（GitHub社製で、現在はMicrosoftに買収）や、Sublime Textなどがありますが、Atom同様のElectronで作られたマルチプラットフォーム対応の、Visual Studio Codeもおススメです。無償で利用することが可能です。





Atomや、Sublime Textと何が違うの？という疑問点に対して、IDEの特徴をツラツラと書き連ねると宗教論争になりかねませんので、詳細は割愛しますが、簡単に述べると、






  * Atom（GitHub）はMicrosoft社に買収され、今後も継続は続けるとは宣言しているものの、似たようなIDEを維持し続けるのかは甚だ疑問
  * Sublime Textはステキ（でも、有償）
  * VS Codeにも拡張機能が多数存在し、他のエディター同様にプラグインによる拡張が可能
  * 拡張機能を導入しなくても、標準のままでも十分すぎるほど使える（たとえば、標準でgitに対応）
  * 拡張機能がMicrosoft公式のマーケットプレイス経由でのダウンロードとなるため、（ある程度の）安心感がある
  * AtomやSublime Textを意識したキーバインディングに変更することも可能




後発のエディターということもあり、他のエディターの「良いとこどり」をしているようなエディターです。もちろん、コード補完や自動インデントなどの基本機能には対応しつつ、不足分は拡張機能で補うというのが基本スタイルです。





また、VS Codeには、ユーザー単位で詳細に設定をいじることができるのですが（タブ、スペースを強要、インデントの幅、などなど）、その設定ファイルの中身は単なるJSON形式のファイルなので、他のユーザーと共有する事も簡単で、多人数のプロジェクトなんかで開発環境を揃えたいという場合にもうってつけなのです。もちろん、個人でも複数端末で同様の環境を準備できます。





さて、仕事でもVS Codeを使用することが最近多いため、ブログ用にも同エディターを使用してみようという事で、WordPressのテーマやプラグインの開発におススメしたい拡張機能をいくつかご紹介したいと思います。





## これだけは入れたいWordPress開発のためのVS Code拡張機能





拡張機能単体では動作せず、別途npmやComposer、Homebrew（Macの場合）が必要になったりする場合がありますが、その場合は補足します。なお、拡張機能はVS Codeから直接インストールすることを想定しています。そのため、URLについては割愛しています。





### PHP IntelliSense





恐らく、VS Codeで一番ダウンロードされているであろう、PHPのコード補完、コード修正の手助けをしてくれるプラグイン。VS Code標準でも端末にインストールされているPHPの実行ファイルを元に、PHPの関数等を標準で補完してくれますが、本拡張機能を導入することで、独自のクラスや関数、オブジェクトについても補完してくれるようになります。（参照：[Visaul Studio Code で PHP、インテリセンスとデバッグ - Qiita](https://qiita.com/diconran/items/6caed6b15cdda23c9933)




    
    {
      "php.suggest.basic": false
    }





また、VS CodeのデフォルトのPHPコードの補完と機能が重複するため、デフォルトの補完を無効化しておきます。





### WordPress Toolbox





WordPress独自の関数やクラスのコードを補完してくれる拡張機能です。WordPressは定期的にバージョンアップを繰り返しており、古い関数は非推奨になったり、新しい関数が追加されたりということがよくあります。常に最新のWordPressに対応しているというわけではないのですが、本拡張機能を導入しておくことで、ほぼ最新のWordPressに対応してくれます。





なお、この拡張機能とは別に（この拡張機能より有名な）「WordPress Snippet」がありますが、こちらの拡張機能の方が最新のWordPressに対応しており、かつコード補完に止まらず、WordPressで用意されている標準関数の引数の型まで教えてくれるのでオススメです！





### phpcs





PHP_CodeSniffer（コーディング規約に反するコードを自動的に指摘）のVS Code版です。単独では動作しないため、別途PHP_CodeSnifferをインストールする必要があります。PHP_CodeSnifferのインストールにはComposerを使用します。Composerは、[Composer](https://getcomposer.org/)からインストールできます。Composerをインストールしたら、以下のコマンドを実行して、PHP_CodeSnifferをインストールします。




    
    composer global require squizlabs/php_codesniffer





PHP_CodeSniffer単体では、WordPressが推奨するWordPress Coding Standardには対応できませんので、別途PHP_CodeSniffer対応のWordPressのコーディング規約をインストール、設定します。




    
    git clone git@github.com:WordPress-Coding-Standards/WordPress-Coding-Standards.git \
    ~/.composer/vendor/squizlabs/php_codesniffer/CodeSniffer/Standards/WordPress 





コーディング規約の設定ファイルのダウンロードが完了したら、PHP_CodeSnifferにWordPressのコーディング規約を追加します。




    
    phpcs --config-set installed_paths ~/.composer/vendor/squizlabs/php_codesniffer/CodeSniffer/Standards/WordPress





コーディング規約が追加されたかどうかを確認するためには、ターミナルで以下のコマンドを実行します。




    
    phpcs -i





「WordPress」が表示されることを確認します。確認ができたら、VS Codeの設定に以下を追記します。




    
    {
      "phpcs.standard": "WordPress"
    }





### WPCS Whitelist Flags





PHP_CodeSnifferはコーディング規約を統一するという意味では非常に有益なツールですが、規約に沿っていないコーディングについてはすべて指摘され、コンソールにエラーとして表示されてしまいます。コーディング規約自体のルールを無効化することもできますが、ルールの無効化はソースコード全体に適用されてしまうため推奨できません。





そこで、PHP_CodeSnifferでは、特定のソースコードに対して部分的にホワイトリストを適用するための書き方が存在します。（参照：[Whitelisting code which flags errors · WordPress-Coding-Standards/WordPress-Coding-Standards Wiki · GitHub](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/wiki/Whitelisting-code-which-flags-errors)）





たとえば、以下のソースコードを記述したとします。




    
    add_action(
      'wp_head', function () {
        echo '<link rel="shortcut icon" href="' . get_stylesheet_directory_uri() . '/favicon.ico"/>';
      }
    );





すると、コンソールに以下のエラーが出力されることでしょう。




    
    All output should be run through an escaping function (see the Security sections in the WordPress Developer Handbooks), found 'get_stylesheet_directory_uri'.





`get_stylesheet_directory_uri()`関数は、テーマのディレクトリのパス（URI形式）で取得する関数ですが、WordPressのコーディング規約では、特定の文字列などのアウトプットを出力する関数については、出力された文字列などに悪意のあるコードが埋め込まれないように、事前にエスケープする必要があります。とはいえ、`get_stylesheet_directory_uri()`は、テーマのディレクトリのパスを取得する関数であり、「わざわざエスケープしなくてもいいよね」と思うこともあります（実際はエスケープした方がいいでしょう）。





そのような場合には、上記のホワイトリストにしたがって、ソースコードの行末に`// WPCS: XSS ok.`とコメントを追加することで、その行に対する同様のエラーを無視（ホワイトリストに追加）できます。このコメントを補完してくれる拡張機能が、「WPCS Whitelist Flags」です。`wpcs`というキーワードを入力すると、自動的にコメントを補完してくれます。





### PHP DocBlocker





PHP版のJavaDocのための、コメント自動生成のための拡張機能です。適切なコメントはソースコードの可読性や保守性を高めることができます。たとえば、以下のようなPHPのソースコードがあったとします。




    
    function hoge( $a, $b ) {
      return $a + $b;
    }





単純に第一引数と第二引数の和を返却するためだけの関数で、引数の型チェック等何も行なっていないため、実用性にはかけますが、この関数に対するコメントを付けるためには、関数定義の1行前で`/**`と入力しエンターを押します。




    
    /**
     * Undocumented function
     *
     * @param [type] $a
     * @param [type] $b
     * @return void
     */
    





すると自動的にこのようなコメントを補完して入力してくれるようになります。





### Trailing Spaces





ソースコードの文末にある余計な空白文字列（とくに半角スペース）のせいで、ソースコードのコンパイルやビルドが通らない、といった悩みは良くありますが、その余分な空白を見やすく可視化してくれる拡張機能です。




    
    {
      "trailing-spaces.trimOnSave": true
    }





なお、上記の項目を設定ファイルに追記しておくことで、ファイル保存時にそのファイルの行末にある余分なスペースを自動的に削除してくれます。





### file-icons





VS Codeのワークスペースに表示するファイルに対して、ファイル毎にわかりやすいアイコンを表示してくれる機能です。必須ではありませんが、ファイルの拡張子を見なくても、そのファイルがどのような種別のファイルかどうかが見た目だけで一瞬で判断できるようになるので非常に役に立ちます。





インストール後は、「Code」→「基本設定」→「ファイルアイコンのテーマ」から設定します。





## まとめ





とりあえず、WordPressを使用する上でひととおり揃えておいたほうが良いと思われる拡張機能をご紹介しました。拡張機能は日々進化しているため、随時更新していきたいと思います。皆さんのオススメの拡張機能がありましたらぜひ教えてください。
