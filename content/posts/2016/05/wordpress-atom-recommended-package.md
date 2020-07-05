---
author: ["@ottanxyz"]
date: 2016-05-28T00:00:00+00:00
draft: false
title: WordPressのテーマやプラグイン開発のためにAtomに導入したパッケージ（2016年版）
type: post
slug: wordpress-atom-recommended-package-4369
categories:
  - Mac
  - Windows
  - Blog
tags:
  - Atom
  - Development
---

![](/uploads/2016/05/160528-57490732a2c14.jpg)

Sublime Text はお気に入りのエディターですが、有償のソフトウェアです。無期限で試用することはできますが、永続的に使用するためにはライセンス料を支払う必要があります。高機能なエディターで非常に便利ですが、ライセンス料がやや高く、初心者にとっては敷居が高いかもしれません。

* [WordPress開発のためにAtomに導入しておきたい最低限のプラグイン8選 - OTTAN.XYZ](/posts/2015/08/atom-plugin-8-2207/)

そこで、今回は無償で、かつ Windows、Mac の両方で使用できる「Atom」を紹介します。「Atom」については以前も 1 回まとめていますので、こちらもご参照ください。

## WordPress 開発のための Atom の設定

何はともあれ、Atom をダウンロードしましょう。

https://atom.io/

### 下準備

次に、初期設定、パッケージのインストールを進めていきます。

![](/uploads/2016/05/160528-57490bc1d01ed.png)

ターミナルから簡単にパッケージをインストールすることのできるコマンドをインストールしておくと便利です。Atom を起動し、「Atom」→「Install Shell Commands」を選択します。これで「apm」「atom」コマンドが使用できるようになります。

#### インデントおよびガイドラインの表示

![](/uploads/2016/05/160528-57490bc786e56.png)

初期設定では「インデント」のガイドラインやタブ文字が表示されません。

![](/uploads/2016/05/160528-57490bcfc4eed.png)

そこで、⌘+,を押し、「Settings」を開きます。「Show Indent Guide」「Show Invisibles」をチェックします。

![](/uploads/2016/05/160528-57490bd742957.png)

これで、インデントのガイドライン、タブ文字が表示されるようになるため、コードが見やすくなります。

#### インデントにタブを強制

![](/uploads/2016/05/160528-57490be0b9062.png)

WordPress のコーディング規約では、インデントは半角スペースではなくタブ文字を使用するように決められています。そこで、インデントを強制的にタブ文字で行うように設定を変更します。「Settings」の「Tab Type」を「hard」に設定しておきましょう。

https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/

### WordPress 開発のために Atom に導入したいパッケージ

次に、Atom の見栄えを整えたり、より便利に使用するためのパッケージを紹介します。パッケージは GUI からもインストールできますが、ターミナルを使用すれば一括でインストールできるので便利です。

#### file-icons

![](/uploads/2016/05/160528-57490be7dafaa.png)

無機質なファイルのアイコンが少しオシャレになります。ファイルの拡張子によってアイコンが変更されるので、ファイルの見分けがしやすくなります。

    apm install file-icons

#### linter-phpcs

「linter-phpcs」を使用すれば、簡単に WordPress のコーディング規約に沿ったコーディングをできます。規約に沿っていない場合は警告を表示してくれます。

事前に、[Sublime Text で WordPress のコーディング規約に遵守したコーディングを効率的に行おう！](/posts/2016/05/sublime-text-wordpress-standard-coding-4309/)でもご紹介した、「phpcs」をインストールします。「phpcs」のインストールについては、上記リンクをご参照ください。

また、「linter-phpcs」をインストールするためには、あらかじめ「linter」と呼ばれるパッケージをインストールしておく必要があります。

    apm install linter
    apm install linter-phpcs

「linter-phpcs」をインストールしたら、パッケージの設定を変更しておきましょう。

![](/uploads/2016/05/160528-57490bee2e646.png)

⌘+,を押して「Settings」を開いたら、「Package」から「linter-phpcs」の「Settings」をクリックします。

![](/uploads/2016/05/160528-57490bf66614e.png)

「Code Standard Or Config File」を「WordPress-Core」に変更します。

![](/uploads/2016/05/160528-57490d5a69627.png)

これで、WordPress のコーディング規約に違反する箇所があれば自動的に指摘してくれるようになります。

#### color-picker

![](/uploads/2016/05/160528-57490c069484a.png)

CSS、SCSS、SASS の編集に便利なパッケージです。⇧+⌘+C でカラーパレットを表示します。

    apm install color-picker

#### wordpress-api

![](/uploads/2016/05/160528-57490c0e1ce9d.png)

WordPress で使用する関数をオートコンプリートの候補に追加できるパッケージです。WordPress 開発で Atom を使用するなら必須のパッケージです。

    apm install wordpress-api

#### aligner-php

配列や変数の位置を簡単に揃えるためのパッケージです。事前に「aligner」と呼ばれるパッケージをインストールしておく必要があります。

    apm install aligner
    apm install aligner-php

![](/uploads/2016/05/160528-57490c1723c70.png)

たとえば、上記のように変数の後の「=」の位置を統一したいことがあります。この時、位置を統一したい行を選択した状態で、⌃+⌘+/を押すと、

![](/uploads/2016/05/160528-57490c1f9227b.png)

このように位置が揃います。連想配列などで活躍します。

#### project-manager

Atom にはプロジェクトいう概念が存在しますが、プロジェクトを簡単に管理できるようにするパッケージが「project-manager」です。

    apm install project-manager

メニューの「File」→「Add Project Folder」から、1 つのプロジェクトにまとめたいフォルダーを追加します。この状態で、メニューの「Packages」→「Project Manager」→「Save Project」でプロジェクトを保存します。

![](/uploads/2016/05/160528-57490c2833b31.png)

次回以降は、⌃+⌘+P で保存したプロジェクトの一覧が表示されるため簡単に編集できるようになります。

#### tag

HTML を編集するならば是非導入しておきたいパッケージです。

    apm install tag

タグを閉じる際に自動的に補完してくれるようになります。

![](/uploads/2016/05/160528-57490c2fb22fc.png)

たとえば、上記のように`<p>`を閉じる際に、`</`まで入力すると、

![](/uploads/2016/05/160528-57490c38c2d10.png)

自動的にタグを閉じてくれます。

#### trailing-spaces

ソースコードの不要なスペースを抹殺してくれる素敵なパッケージです。

    apm install trailing-spaces

![](/uploads/2016/05/160528-57490c40422d7.png)

たとえば、上記のように末尾に半角スペースが入っている場合、この状態で上書き保存すると、

![](/uploads/2016/05/160528-57490c4a3f862.png)

末尾の不要な半角スペースを自動的に削除してくれます。

#### autocomplete-paths

`include()`や`require()`などでライブラリを読み込みたい場合に、パスを補完してくれるパッケージです。

    apm install autocomplete-paths

![](/uploads/2016/05/160528-57490c5405ef9.png)

たとえば、上記のように途中まで入力すれば自動的にパスを補完してくれるようになります。

#### highlight-selected

選択している単語をソースコード全体でハイライトしてくれるパッケージです。

    apm install highlight-selected

![](/uploads/2016/05/160528-57490c5d5aed4.png)

上記のように選択した単語がすべてハイライト表示されるため、ある変数がどこでどのように使用されているのか簡単に追うことができるようになります。

#### docblockr

関数やクラスのコメントを自動的に補完してくれるパッケージです。

    apm install docblockr

![](/uploads/2016/05/160528-57490dfd440ba.png)

関数やクラスの手前で、`/**`を入力して、↵ を押すと、自動的にコメントが補完されます。

![](/uploads/2016/05/160528-57490e05cd85d.png)
