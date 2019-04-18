---
author: ottan
date: 2016-05-21 05:07:21+00:00
draft: false
title: Sublime TextでWordPressのコーディング規約に遵守したコーディングを効率的に行おう！
type: post
url: /sublime-text-wordpress-standard-coding-4309/
categories:
- Mac
- Blog
tags:
- Development
---

![](/images/2016/05/160521-573fe31dc0073.jpg)






Sublime Textはお気に入りのエディターです。プラグインを使用することで拡張することができ、さまざまな用途で使用することができるようになります。また、多数のテーマも開発されており、自分の好みにあった外観に仕上げることも可能です。今回は、このSublime Textを使用してWordPressのコーディング規約に沿ったコーディングが行われているか簡単に確認できるようにしてみます。





## Sublime TextでPHP CodeSnifferを使用する





Sublime Textのパッケージに「SublimeLinter-phpcs」がありますが、そのためには事前の準備がいろいろと必要です。初回のみですので頑張りましょう。





### Composerのインストール





PHP CodeSnifferを使用するには、PHPのパッケージ管理ソフトウェアである「Composer」をあらかじめインストールしておく必要があります。その他のPHPのパッケージ管理にも使用できますので、これを機に導入しておくと後々便利になります。



https://getcomposer.org/download/



インストールは上記のリンクから行います。具体的には、ターミナルを開いて以下のコマンドを実行します。なお、Composerのアップデートによりハッシュ値等が変更になる場合がありますので、最新情報は上記のサイトで確認するようにしてください。




    
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('SHA384', 'composer-setup.php') === '92102166af5abdb03f49ce52a40591073a7b859a86e8ff13338cf7db58a19f7844fbc0bb79b2773bf30791e935dbd938') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"





カレントディレクトリに`composer.phar`というファイルが生成されますので、以下のコマンドを実行して、この実行ファイルを移動します。




    
    mv composer.phar /usr/local/bin/composer





ターミナルを閉じて、再度ターミナルを開き直します。以下のコマンドを実行して、Composerがインストールされていることを確認してください。




    
    composer -V





### PHP CodeSnifferのインストール





続いて、PHP CodeSnifferをインストールします。ターミナルを開いて以下のコマンドを実行します。




    
    composer global require "squizlabs/php_codesniffer=*"





インストールが完了すると、`~/.composer/vendor/bin`配下に`phpcs`という実行ファイルがインストールされます。`/usr/local/bin`配下にシンボリックリンクを作成します。




    
    ln -s ~/.composer/vendor/bin/phpcs /usr/local/bin





ターミナルを閉じて、再度ターミナルを開き直します。以下のコマンドを実行して、PHP CodeSnifferがインストールされたことを確認してください。




    
    phpcs --version





### WordPress Coding Standardのインストール





次に、PHP CodeSnifferでチェックするWordPress Coding Standardをインストールします。



https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards



具体的にはターミナルを開いて以下のコマンドを実行します。




    
    git clone -b master https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git ~/.composer/vendor/squizlabs/php_codesniffer/CodeSniffer/Standards/WordPress





PHP CodeSnifferでダウンロードしたWordPress Coding Standardが使用できるように、PHP CodeSnifferに認識させます。




    
    phpcs --config-set installed_paths ~/.composer/vendor/squizlabs/php_codesniffer/CodeSniffer/Standards/WordPress





以下のコマンドを実行して、「WordPress」が表示されることを確認してください。




    
    phpcs -i





### SublimeLinter-phpcsのインストール





事前準備は完了です。続いて、Sublime Textを開き、PHP CodeSnifferが使用できるようにします。Package Controlを開き、「SublimeLinter-phpcs」パッケージをインストールしてください。なお、「Package Control」の使い方については、以下のリンクを参照してください。また、「SublimeLinter-phpcs」を使用するためには、事前に「SublimeLinter」パッケージをインストールしておく必要があります。



https://ottan.xyz/sublime-text-plugin-321/



次に、Sublime Textのメニューから「Sublime Text」→「Preferences」→「Package Settings」→「SublimeLinter」→「Settings - User」を開きます。（一部内容を省略しています）




    
    {
        "user": {
            "debug": false,
            "delay": 0.25,
            "error_color": "D02000",
            "gutter_theme": "Packages/SublimeLinter/gutter-themes/Default/Default.gutter-theme",
            "gutter_theme_excludes": [],
            "lint_mode": "background",
            "linters": {
                "phpcs": {
                    "@disable": false,
                    "args": [],
                    "excludes": [],
                    "standard": "WordPress-Core"
                }
            },
            "mark_style": "outline",
            "no_column_highlights_line": false,
            "passive_warnings": false
        }
    }





「user」→「linters」→「phpcs」→「standard」の内容を「WordPress-Core」に書き換えてください。書き換えたらSublime Textを再起動します。





### SublimeLinter-phpcsを使用してコーディング規約を確認する





![](/images/2016/05/160521-573feb7e2e54f.png)






このようにWordPressコーディング規約に違反する箇所に「赤い丸」が表示されるようになります。また、該当行にカーソルを合わせると、ステータスバーに具体的なエラーメッセージが表示されるようになります。



https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/



WordPressのコーディング規約に従い、可読性のあるコーディングを心がけましょう！





## おまけ





PHP CodeSnifferはコマンドラインからも使用できます。ターミナルを開いて以下のコマンドを実行すると、一括でPHPファイルの内容を確認できます。




    
    phpcs -p -s -v --standard=WordPress-Core ./*.php
