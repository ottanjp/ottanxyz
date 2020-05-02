---
author: ottan
date: 2015-08-22 02:17:45+00:00
draft: false
title:
  WordPressの過去記事参照に！Alfredから記事を検索してMarsEditに貼り付けられる「Paste link for MarsEdit with
  Alfred」
type: post
slug: paste-link-for-marsedit-with-alfred-2174
categories:
  - Mac
  - Blog
tags:
  - Alfred
  - Apps
  - MarsEdit
---

![](/uploads/2015/08/150822-55d7dbe6e6b29.jpg)

MarsEdit でブログを執筆している時に、過去の投稿のリンクを貼りたくなる時はありませんか？記事のタイトルを見ながら絞り込みのできる「Paste link for MarsEdit with Alfred」なら、そんなあなたのお悩みを一発で解消できます。

## 使い方

「Paste link for MarsEdit with Alfred」は、Alfred の Workflow 機能を使用します。事前に Alfred の「Power Pack ライセンス」を有効にしておいてください（※Mac App Store からダウンロードした Alfred では使用することはできません）なお、Alfred の使い方については、[Mac ユーザーが恋する必須の神アプリ Alfred を 120%使いこなすための手引](/posts/2014/09/alfred-guidance-181/)を参照してください。

Alfred をホットキー（デフォルト：`⌥ + ␣`）で起動して、キーワード「`me-script`」の後に検索ワードを入力します。タイトルに検索ワードが含まれる投稿の一覧が表示されますので、好きな記事を選択して ↵ を押してください。

![](/uploads/2015/08/150822-55d7dbe43dbe8.png)

選択した投稿のパーマリンクとタイトルを取得して、MarsEdit にリンクを貼り付けることができます。リンクのフォーマットは以下のとおりです。

    <a href="[パーマリンク]">[タイトル]</a>

### 使い方

たとえば、「2 段階認証」のキーワードで検索してみます。「Apple ID の 2 段階認証を有効にする方法」を選択した状態で、↵ を押します。

![](/uploads/2015/08/150822-55d7de1be3527.png)

ブログの作成画面に以下のリンクが自動的に貼り付けられます。

![](/uploads/2015/08/150822-55d7de1e89f9b.png)

### カスタマイズ

Alfred の Workflow を開きます。「Paste link to MarsEdit with Alfred」を開き、「Run Script」をダブルクリックします。

![](/uploads/2015/08/150822-55d7dfb2a7ca5.png)

実際に中身が表示されますので、リンクを自由に改変して使用していただく事が可能です。

![](/uploads/2015/08/150822-55d7dfba485b8.png)

最後の、`_resultHTML`が実際にリンクとして挿入されるタグとなっています。AppleScript の知識が多少必要になりますが、`_tmpPermalink`（パーマリンク）、`_tmpTitle`（タイトル）を使用し、`<a>`タグを修正して使用してください。

    set _query to "{query}"

    tell application "MarsEdit"

    	set _resultHTML to ""

    	repeat with i from 1 to number of post of selected blog

    		set _tmpPostID to post id of (item i of post of selected blog)

    		if (_tmpPostID is equal to _query) then

    			set _tmpPermalink to permalink of (item i of post of selected blog)
    			set _tmpTitle to title of (item i of post of selected blog)

    			set _resultHTML to "<a href=\"" & _tmpPermalink & "\">" & _tmpTitle & "</a>"
    		end if
    	end repeat

    	return _resultHTML
    end tell

### 注意事項

![](/uploads/2015/08/150822-55d7dbdf0bec6.png)

事前に上記のようにブログを選択した状態で実行する必要があります。なお、選択していない状態でワークフローを実行するとエラーメッセージが表示されるようになっています。

![](/uploads/2015/08/150822-55d7dbdd33f4f.png)

## ダウンロード

Dropbox からダウンロードしてお使いいただけます。以下からダウンロードできます。自由に改変、再配布して使っていただいて構いませんが、フィードバックをいただけると助かります。

https://www.dropbox.com/s/86px6b32xhnrgka/Paste%20link%20to%20MarsEdit%20with%20Alfred.alfredworkflow?dl=0"

GitHub にアップロードしました。

https://github.com/ottanxyz/alfred-workflow

## インストール

ダウンロードしたファイルをダブルクリックして、Alfred にインストールしてください。

![](/uploads/2015/08/150822-55d7dbe1e0d21.png)

## まとめ

本スクリプトに関するご質問、ご意見等はコメント欄、または[@おったん](https://twitter.com/ottanxyz)までお待ちしています。お気軽にご連絡くださいね。
