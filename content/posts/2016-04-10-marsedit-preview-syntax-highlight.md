---
author: ottan
date: 2016-04-10 04:05:31+00:00
draft: false
title: MarsEditのプレビュー画面で、「highlight.js」のシンタックスハイライトをリアルタイムでプレビューする
type: post
url: /marsedit-preview-syntax-highlight-6853/
categories:
- Mac
- Blog
tags:
- Development
- MarsEdit
- WordPress
---

![](/images/2016/04/160423-571b57e20f058.png)






MarsEditは、macOSで動作するWordPressやMovableTypeなどの主要なCMSに対応しているエディターで、とくにリアルタイムプレビューやAppleScriptとの連携は非常に便利です。





弊サイトでも、過去に[MarsEditをより便利に高速に活用するためのスクリプト集](/marsedit-script-619/)や、Alfredと連携した[WordPressの過去記事参照に！Alfredから記事を検索してMarsEditに貼り付けられる「Paste link for MarsEdit with Alfred」](/paste-link-for-marsedit-with-alfred-2174/)など、数多くの便利スクリプトをご紹介しています。





さて、便利なMarsEditですが、１点どうしても解消したい点がありました。それは、**リアルタイムプレビューでソースコードのシンタックスハイライトを実現する**、ということ。





シンタックスハイライトについては、弊サイトでは過去にご紹介した[全スタイルのサンプル付き！動作が軽快なシンタックスハイライター「highlight.js」](/syntax-highlight-github-435/)を使用していますが、JavaScriptを使用しているためプレビューでのリアルタイムの描画は厳しいと思い込んでいたのですが、**MarsEditのプレビューはJavaScriptの実行にも対応していた**んですね。





## 「highlight.js」をMarsEditのプレビューで使用する





MarsEditに適用する前に、簡単に「highlight.js」の使い方をおさらいしましょう。





### 「highlight.js」の使い方の復習





ここでは、WordPressで「highlight.js」を使用する方法をご紹介します。導入方法は簡単です。WordPressのヘッダー（header.php）、フッター（footer.php）に、以下のコードを記述するだけです。





**header.php**



    
    





**footer.php**



    
    </script>
    <script>hljs.initHighlightingOnLoad();</script>





ページロード時に、`<pre><code class="XXXX">YYYY</code></pre>`で囲まれた箇所が自動的にシンタックスハイライトされるようになります。「XXXX」にはハイライトしたい言語（php、xml、cなど）、「YYYY」にはソースコードを記述します。





### MarsEditのプレビュー画面でリアルタイムにシンタックスハイライトを適用する





では、MarsEditのプレビュー画面で、「highlight.js」を使用してリアルタイムにシンタックスハイライトを適用するためにはどうすればよいでしょうか。`hljs.initHighlightingOnLoad();`は、ページロード時にのみ機能するAPIです。つまり、初回読み込み時にはシンタックスハイライトを適用することが可能なものの、リアルタイムにプレビューすることは不可能です。そこで、「highlight.js」が備えている別のAPIを使用することで実現します。





![](/images/2016/04/160423-571b57e486a8b-1.png)






プレビューで、「highlight.js」を使用する前に、MarsEditの環境設定で「Enable JavaScript」にチェックが入っていることを確認しておきましょう。





![](/images/2016/04/160423-571b57e7e3af3-1.png)






シンタックスハイライトが適用されていない状態が上図です。そこで、MarsEditのプレビューのテンプレートに、以下を追記します。`</body>`タグの前に記述してください。




    
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





APIの詳細については、[How to use highlight.js](https://highlightjs.org/usage/)をご覧いただくとして、ここではポイントだけ解説します。






  * 事前にjQueryを読み込む
  * `<pre><code>XXXX</code></pre>`で囲まれたすべてのブロックに対して、`highlightBlock`を適用する
  * 1000ms秒（1秒）置きに、`highlightBlock`を適用する




`setTimeout`を使用することで、プレビュー画面を1秒置きにリフレッシュし、その都度スタイルを適用できます。1秒間隔が短すぎると感じた場合には、値を変えることも可能です。`setTimeout`を使用して、繰り返しプレビュー画面をリフレッシュさせることがポイントです。





![](/images/2016/04/160423-571b57eb1eac2-1.png)






これで、リアルタイムにプレビュー画面にシンタックスハイライトを適用できます。「highlight.js」以外のシンタックスハイライターを使用している場合も、`setTimeout`を使用することで同様の機能を実現できます。





## 参考リンク



https://highlightjs.org/

http://marcschwieterman.com/blog/marsedit-preview-with-syntaxhighlighter/
