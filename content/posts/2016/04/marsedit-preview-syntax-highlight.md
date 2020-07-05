---
author: ["@ottanxyz"]
date: 2016-04-10T00:00:00+00:00
draft: false
title: MarsEditのプレビュー画面で、「highlight.js」のシンタックスハイライトをリアルタイムでプレビューする
type: post
slug: marsedit-preview-syntax-highlight-6853
categories:
  - Mac
  - Blog
tags:
  - Development
  - MarsEdit
---

![](/uploads/2016/04/160423-571b57e20f058.png)

MarsEdit は、macOS で動作する WordPress や MovableType などの主要な CMS に対応しているエディターで、とくにリアルタイムプレビューや AppleScript との連携は非常に便利です。

弊サイトでも、過去に[MarsEdit をより便利に高速に活用するためのスクリプト集](/posts/2014/12/marsedit-script-619/)や、Alfred と連携した[WordPress の過去記事参照に！Alfred から記事を検索して MarsEdit に貼り付けられる「Paste link for MarsEdit with Alfred」](/posts/2015/08/paste-link-for-marsedit-with-alfred-2174/)など、数多くの便利スクリプトをご紹介しています。

さて、便利な MarsEdit ですが、1 点どうしても解消したい点がありました。それは、**リアルタイムプレビューでソースコードのシンタックスハイライトを実現する**、ということ。

シンタックスハイライトについては、弊サイトでは過去にご紹介した[全スタイルのサンプル付き！動作が軽快なシンタックスハイライター「highlight.js」](/posts/2014/09/syntax-highlight-github-435/)を使用していますが、JavaScript を使用しているためプレビューでのリアルタイムの描画は厳しいと思い込んでいたのですが、**MarsEdit のプレビューは JavaScript の実行にも対応していた**んですね。

## 「highlight.js」を MarsEdit のプレビューで使用する

MarsEdit に適用する前に、簡単に「highlight.js」の使い方をおさらいしましょう。

### 「highlight.js」の使い方の復習

ここでは、WordPress で「highlight.js」を使用する方法をご紹介します。導入方法は簡単です。WordPress のヘッダー（header.php）、フッター（footer.php）に、以下のコードを記述するだけです。

**header.php**

**footer.php**

    </script>
    <script>hljs.initHighlightingOnLoad();</script>

ページロード時に、`<pre><code class="XXXX">YYYY</code></pre>`で囲まれた箇所が自動的にシンタックスハイライトされるようになります。「XXXX」にはハイライトしたい言語（php、xml、c など）、「YYYY」にはソースコードを記述します。

### MarsEdit のプレビュー画面でリアルタイムにシンタックスハイライトを適用する

では、MarsEdit のプレビュー画面で、「highlight.js」を使用してリアルタイムにシンタックスハイライトを適用するためにはどうすればよいでしょうか。`hljs.initHighlightingOnLoad();`は、ページロード時にのみ機能する API です。つまり、初回読み込み時にはシンタックスハイライトを適用することが可能なものの、リアルタイムにプレビューすることは不可能です。そこで、「highlight.js」が備えている別の API を使用することで実現します。

![](/uploads/2016/04/160423-571b57e486a8b-1.png)

プレビューで、「highlight.js」を使用する前に、MarsEdit の環境設定で「Enable JavaScript」にチェックが入っていることを確認しておきましょう。

![](/uploads/2016/04/160423-571b57e7e3af3-1.png)

シンタックスハイライトが適用されていない状態が上図です。そこで、MarsEdit のプレビューのテンプレートに、以下を追記します。`</body>`タグの前に記述してください。

    </script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/highlight.min.js"></script>
    <script>
      function refreshHighlighting() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
        setTimeout("refreshHighlighting()", 1000);
      }
      refreshHighlighting();
    </script>

API の詳細については、[How to use highlight.js](https://highlightjs.org/usage/)をご覧いただくとして、ここではポイントだけ解説します。

- 事前に jQuery を読み込む
- `<pre><code>XXXX</code></pre>`で囲まれたすべてのブロックに対して、`highlightBlock`を適用する
- 1000ms 秒（1 秒）置きに、`highlightBlock`を適用する

`setTimeout`を使用することで、プレビュー画面を 1 秒置きにリフレッシュし、その都度スタイルを適用できます。1 秒間隔が短すぎると感じた場合には、値を変えることも可能です。`setTimeout`を使用して、繰り返しプレビュー画面をリフレッシュさせることがポイントです。

![](/uploads/2016/04/160423-571b57eb1eac2-1.png)

これで、リアルタイムにプレビュー画面にシンタックスハイライトを適用できます。「highlight.js」以外のシンタックスハイライターを使用している場合も、`setTimeout`を使用することで同様の機能を実現できます。

## 参考リンク

https://highlightjs.org/

http://marcschwieterman.com/blog/marsedit-preview-with-syntaxhighlighter/
