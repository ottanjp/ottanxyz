---
author: ottan
date: 2017-12-24 07:12:40+00:00
draft: false
title: AtomとPHP_CodeSnifferでWordPressコーディング規約に合わせてソースコードを自動修正
type: post
slug: atom-php-codesniffer-wordpress-6470
categories:
- Blog
tags:
- Atom
- Development
---

![](/uploads/2017/12/171224-5a3f4af6505c0.png)

WordPressには、[WordPress Coding Standards – Make WordPress Core](https://make.wordpress.org/core/handbook/best-practices/coding-standards/)で定められている通り、ソースコードにコーディング規約が設けられています。コーディング規約に則りソースコードを記述することで、可読性、保守性が向上するだけでなく、チームで開発する場合においては、一定のソースコードの品質を保ったままコーディングを行うことができます。

ただし、WordPressのテーマやプラグイン開発において、コーディング規約に則りすべて正しく記述するのは、なかなか骨の折れる仕事です。そこで、今回は軽微なソースコードの修正は、自動的に実施してしまおうという方法のご紹介です。エディターは「Atom」を使用します。また、開発環境はMacです。

## AtomとPHP_CodeSnifferでソースコードを自動修正

### PHP_CodeSnifferのインストール

PHP_CodeSnifferのインストールについては、[こちら](/sublime-text-wordpress-standard-coding-4309/)で詳しくご紹介していますので、こちらの記事を参照してください。インストール完了後に、以下のコマンドを実行し、PHP_CodeSnifferが正常にインストールされていることを確認してください。

```bash
phpcs --version
phpcbf --version
```

また、[こちら](/sublime-text-wordpress-standard-coding-4309/)でご紹介している方法を参考に、PHP_CodeSnifferのルールセットである「WordPress Coding Standard」を導入しておきます。正常にセットアップされているかどうかは、以下のコマンドで確認できます。標準出力に`WordPress-Core`が表示されることを確認してください。

```bash
phpcs -i
```

### atom-beautifyのインストール

ターミナルから以下のコマンドを実行するか、Atomの環境設定画面から「atom-beautify」のパッケージをインストールします。

```bash
apm install atom-beautify
```

### Atomでatom-beautifyの設定を行う

![](/uploads/2017/12/171224-5a3f4cb6c4022.png)

Atomの環境設定を開きます。「Packages」から「atom-beautify」を検索し、「Settings」をクリックします。

![](/uploads/2017/12/171224-5a3f4cbdcc547.png)

PHPの項目を展開し、以下の項目をチェックします。

| 項目                         | 内容                                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Disable Beautifying Language | チェックオフ                                                                                                      |
| Default Beautifier           | PHPCBF                                                                                                            |
| Beautify On Save             | ファイル保存時に自動的に整形したい場合はチェック                                                                  |
| PHPCBF Path                  | PHPCode_Sniffer（phpcbf）を環境変数PATH以外のパスに入れている場合は、絶対パスで`phpcbf`コマンドのパスを入力します |

![](/uploads/2017/12/171224-5a3f4cc45e3e7.png)

| 項目            | 内容                                                                               |
| --------------- | ---------------------------------------------------------------------------------- |
| PHPCBF Version  | お使いのPHP_CodeSnifferのバージョンに合わせて設定します。最新バージョンは「3」です |
| PHPCBF Standard | WordPress-Core                                                                     |

### PHP_CodeSnifferによる自動修正を試す

たとえば、以下のコードは「WordPress Coding Standard」ではエラーとなります。

```php
define("HOGE");
```

文字列は「'」（シングルクオーテーション）で囲むこと、関数の引数の前後には半角スペースを設けることというルールに違反しているからです。linterおよびlinter-phpcsを導入している場合は、エラーが表示されます。この文字列を自動修正するためには、「Beautify On Save」にチェックしている場合はファイルを上書き保存します。または、⌥（option）+⌘（command）+Bを押すか、コマンドパレットから「Atom Beautify: Beautify Editor」を選択します。

```php
define( 'HOGE' );
```

すると上述のソースコードが、WordPress Coding Standardに則り上記のように自動修正されます。これからは軽微なソースコードの修正は、Atomに任せてしまいましょう！
