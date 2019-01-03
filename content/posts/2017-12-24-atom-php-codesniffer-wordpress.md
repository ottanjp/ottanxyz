---
author: ottan
date: 2017-12-24 07:12:40+00:00
draft: false
title: AtomとPHP_CodeSnifferでWordPressコーディング規約に合わせてソースコードを自動修正
type: post
url: /atom-php-codesniffer-wordpress-6470/
categories:
  - Blog
tags:
  - Atom
  - Development
  - WordPress
---

![](/images/2017/12/171224-5a3f4af6505c0.png)

WordPress には、[WordPress Coding Standards – Make WordPress Core](https://make.wordpress.org/core/handbook/best-practices/coding-standards/)で定められている通り、ソースコードにコーディング規約が設けられています。コーディング規約に則りソースコードを記述することで、可読性、保守性が向上するだけでなく、チームで開発する場合においては、一定のソースコードの品質を保ったままコーディングを行うことができます。

ただし、WordPress のテーマやプラグイン開発において、コーディング規約に則りすべて正しく記述するのは、なかなか骨の折れる仕事です。そこで、今回は軽微なソースコードの修正は、自動的に実施してしまおうという方法のご紹介です。エディターは「Atom」を使用します。また、開発環境は Mac です。

## Atom と PHP_CodeSniffer でソースコードを自動修正

### PHP_CodeSniffer のインストール

PHP_CodeSniffer のインストールについては、[Sublime Text で WordPress のコーディング規約に遵守したコーディングを効率的に行おう！](https://ottan.xyz/sublime-text-wordpress-standard-coding-4309/)で詳しくご紹介していますので、こちらの記事を参照してください。インストール完了後に、以下のコマンドを実行し、PHP_CodeSniffer が正常にインストールされていることを確認してください。

    phpcs --version
    phpcbf --version

また、[Sublime Text で WordPress のコーディング規約に遵守したコーディングを効率的に行おう！](https://ottan.xyz/sublime-text-wordpress-standard-coding-4309/)でご紹介している方法を参考に、PHP_CodeSniffer のルールセットである「WordPress Coding Standard」を導入しておきます。正常にセットアップされているかどうかは、以下のコマンドで確認できます。標準出力に`WordPress-Core`が表示されることを確認してください。

    phpcs -i

### atom-beautify のインストール

ターミナルから以下のコマンドを実行するか、Atom の環境設定画面から「atom-beautify」のパッケージをインストールします。

    apm install atom-beautify

### Atom で atom-beautify の設定を行う

![](/images/2017/12/171224-5a3f4cb6c4022.png)

Atom の環境設定を開きます。「Packages」から「atom-beautify」を検索し、「Settings」をクリックします。

![](/images/2017/12/171224-5a3f4cbdcc547.png)

PHP の項目を展開し、以下の項目をチェックします。

| 項目                         | 内容                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Disable Beautifying Language | チェックオフ                                                                                                        |
| Default Beautifier           | PHPCBF                                                                                                              |
| Beautify On Save             | ファイル保存時に自動的に整形したい場合はチェック                                                                    |
| PHPCBF Path                  | PHPCode_Sniffer（phpcbf）を環境変数 PATH 以外のパスに入れている場合は、絶対パスで`phpcbf`コマンドのパスを入力します |

![](/images/2017/12/171224-5a3f4cc45e3e7.png)

| 項目            | 内容                                                                                 |
| --------------- | ------------------------------------------------------------------------------------ |
| PHPCBF Version  | お使いの PHP_CodeSniffer のバージョンに合わせて設定します。最新バージョンは「3」です |
| PHPCBF Standard | WordPress-Core                                                                       |

### PHP_CodeSniffer による自動修正を試す

たとえば、以下のコードは「WordPress Coding Standard」ではエラーとなります。

    define("HOGE");

文字列は「'」（シングルクオーテーション）で囲むこと、関数の引数の前後には半角スペースを設けることというルールに違反しているからです。linter および linter-phpcs を導入している場合は、エラーが表示されます。この文字列を自動修正するためには、「Beautify On Save」にチェックしている場合はファイルを上書き保存、していない場合は、⌥（option）+⌘（command）+B を押すか、コマンドパレット（⇧（shift）+⌘（command）+B で開く）から「Atom Beautify: Beautify Editor」を選択します。

    define( 'HOGE' );

すると上述のソースコードが、WordPress Coding Standard に則り上記のように自動修正されます。これからは軽微なソースコードの修正は、Atom に任せてしまいましょう！
