---
author: ["@ottanxyz"]
date: 2016-08-15T00:00:00+00:00
draft: false
title: PopClipの拡張機能をカスタマイズしてみよう！PopClipの拡張機能「HTML Encode」でダブルクオーテションを変換しないようにする
type: post
slug: popclip-extensions-htmlencode-customize-4750
categories:
  - Mac
tags:
  - Tips
---

![](/uploads/2016/08/160815-57b1cdb6742b8.png)

[WordPress のテーマ開発、ブログの執筆作業を効率化する方法のまとめ – OTTAN.XYZ](/posts/2014/12/efficiency-blog-736/)でもご紹介している「PopClip」ですが、拡張機能を使用する事で、さまざまな用途に用いる事のできる、1 回使うと離れられない便利ツールです。

* [WordPressのテーマ開発、ブログの執筆作業を効率化する方法のまとめ - OTTAN.XYZ](/posts/2014/12/efficiency-blog-736/)

上記記事でもご紹介している通り、弊サイトでも WordPress の投稿記事内での`<pre>`タグ内に記述する文字列を HTML エンティティに変換する際に使用しているのですが、一点問題がありました。それは、デフォルトで「ダブルクオテーション」もエスケープしてしまうこと。「ダブルクオテーション」は、HTML の属性内では`&quot;`に変換する必要があるのですが、それ以外の平文においてはとくに変換する必要がありません。

また、「ダブルクオテーション」を HTML エンティティに変換することにより、不必要な問題を抱えることにもなりかねません。たとえば、[Broken Link Checker — WordPress Plugins](https://ja.wordpress.org/plugins/broken-link-checker/)で、URL のリンクチェックを行っている場合に、`<pre>`タグの中身もチェックするようにしているのですが、`href`属性の値の前後に付ける「ダブルクオーテション」まで HTML エンティティに変換されてしまい、URL に`&`が付与されていると勘違いされてしまうことがありました。

そこで、今回はこの拡張機能「HTML Encode」を少しだけ改修し、ダブルクオテーションは変換の対象に含めないようにしたいと思います。

{{< itunes 445189367 >}}

## 「HTML Encode」でダブルクオーテションを変換しない

「HTML Encode」をダウンロードし、インストールする前に、少し細工します。

### 拡張機能「HTML Encode」のダウンロード

拡張機能は以下の URL からダウンロード可能です。「HTML Encode」をダウンロードしてください。

https://pilotmoon.com/popclip/extensions/

### 拡張機能「HTML Encode」の修正

![](/uploads/2016/08/160815-57b1d241f15bd.png)

ダウンロードした拡張機能の拡張子は「popclipextz」ですが、拡張子を「zip」に変更します。

![](/uploads/2016/08/160815-57b1d24961951.png)

拡張子を「zip」に変更したら、解凍します。

![](/uploads/2016/08/160815-57b1d24fc6305.png)

拡張子が「popclipext」のファイルが解凍されます。

![](/uploads/2016/08/160815-57b1d25a4d20a.png)

右クリックして、「パッケージの内容を表示」をクリックします。

![](/uploads/2016/08/160815-57b1d26341315.png)

拡張機能に含まれるリソースの一覧が表示されます。ファイルの内容を以下の通り修正します。

**htmldecode.php**

    <?php
    mb_internal_encoding("UTF-8");
    $input=getenv('POPCLIP_TEXT');
    echo html_entity_decode($input, ENT_COMPAT | ENT_HTML401, 'UTF-8');
    ?>

`ENT_COMPAT`を`ENT_NOQUOTES`に変更します。

    <?php
    mb_internal_encoding("UTF-8");
    $input=getenv('POPCLIP_TEXT');
    echo html_entity_decode($input, ENT_NOQUOTES | ENT_HTML401, 'UTF-8');
    ?>

**htmlencode.php**

    <?php
    mb_internal_encoding("UTF-8");
    $input=getenv('POPCLIP_TEXT');
    echo htmlentities($input, ENT_COMPAT | ENT_HTML401, 'UTF-8');
    ?>

`ENT_COMPAT`を`ENT_NOQUOTES`に変更します。

    <?php
    mb_internal_encoding("UTF-8");
    $input=getenv('POPCLIP_TEXT');
    echo htmlentities($input, ENT_NOQUOTES | ENT_HTML401, 'UTF-8');
    ?>

**Config.plist**

    	<key>Extension Identifier</key>
    	<string>com.pilotmoon.popclip.extension.htmlencode</string>

`com.pilotmoon`を任意の文字列に変更します。`com.example`などでも良いです。`com.pilotmoon`は、PopClip の公式サイトで署名された拡張機能にのみ付与できます。改修した場合は、署名された内容とハッシュ値が異なるため同一の Identifier（識別子）を使用する事はできません。

    	<key>Extension Identifier</key>
    	<string>xyz.ottan.popclip.extension.htmlencode</string>

### 拡張機能「HTML Encode」のインストール

![](/uploads/2016/08/160815-57b1d27948961.png)

Finder で 1 つ前の画面に戻ります。拡張子が「popclipext」のファイルをダブルクリックします。

![](/uploads/2016/08/160815-57b1d28351e4b.png)

署名されていない旨の警告ダイアログが表示されます。「インストール」をクリックしてください。以上で、インストールは完了です。

## まとめ

PopClip の拡張機能の作り方については、別途またまとめたいと思いますが、雰囲気だけでも伝わったのではないでしょうか。いろいろカスタマイズしてみてくださいね。
