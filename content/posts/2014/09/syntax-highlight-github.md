---
author: ottan
date: 2014-09-16 05:46:01+00:00
draft: false
title: 動作が軽快なシンタックスハイライター「highlight.js」
type: post
slug: syntax-highlight-github-435
categories:
- Blog
tags:
- Development
---

![](/uploads/2014/09/140916-5417c007730c4.png)






ソースコードのシンタックスハイライトについては、さまざまなプラグインが用意されています。しかし、必要以上の内容が詰め込まれていたり、カスタマイズ性に欠けていたりと、なかなか自分に「ピッタリ」なものを見つけるのは難しいです。そこで、今回は、「必要なものだけを自分で最適化できて」「動作が軽快な」プロダクトをご紹介します。





## 必要最小限の機能に絞り込む事が可能な「highlight.js」





[highlight.js](https://highlightjs.org/)は、さまざまな言語に対応したシンタックスハイライト。既存のコードにスタイルシートとJavaScriptを埋め込むだけで使用できます。特徴は、何と言っても**対応している言語の多さとデフォルトで用意されているさまざまなスタイルシート**です。





対応している言語は豊富ですが、すべてを使用する必要はまったくなく、自分にとって必要な言語に絞ってダウンロードすることもできるため、ソースコードが負担にならないのも良いところ。また、スタイルシートも同様で、自分のサイトのスタイルにあったものを使用すればよいので、ボトルネックになりそうな内容がふんだんに盛り込まれたJavaScriptやCSSに頭を悩ます必要もありません。





## ダウンロード





![](/uploads/2014/09/140916-5417c0091c61d.png)






highlight.jsのダウンロードは、[Getting highlight.js](https://highlightjs.org/download/)から行います。ダウンロード時に必要な言語に絞ってダウンロードができるため、ダウンロードしてから加工するといった操作も一切不要。スタイルシートはすべてのセットがダウンロードされるため、好きなスタイルのみをロードするようにしましょう。





## 使用方法





ダウンロードしたファイルを読み込むだけです。ブラウザのレンダリングを考慮して、スタイルシートは`<head>`タグ内、JavaScriptは、`</body>`の直前で読み込むのが良いでしょう。WordPressを使用している場合は、`get_template_directory_uri()`関数を使用してテンプレートディレクトリの配下のファイルを読み込むようにしましょう。





### ヘッダー（header.php）




    
    





### フッター（footer.php）




    
    </script>
    <script>hljs.initHighlightingOnLoad();</script>




### 本文





シンタックスハイライトを使いたいソースコードに対して、`<pre><code class="xxxx"></code></pre>`で囲みます。「xxxx」には「xml」「php」などの言語が入ります。使用できる言語の名称は、[CSS classes reference — highlight.js 8.1 documentation](https://highlightjs.readthedocs.org/en/latest/css-classes-reference.html)で確認できます。





`<code>`タグ内のHTMLのエンティティ文字列は、エンコードしておきましょう。エンコードされていない文字列（たとえば、`<>`）が含まれると、ただしくハイライトされませんので注意が必要です。たとえば、`<script>`は`&lt;script&gt;`にします。





しかし、毎回手動でエンコードするのは大変です。PopClipの拡張機能[PopClip Extensions](https://pilotmoon.com/popclip/extensions/)から「HTML Encode」をダウンロードし有効にしておくと、





![](/uploads/2014/09/140916-5417cda504c29.png)





選択したエンティティ文字列だけをエンコードするといった使い方ができて非常に便利です。



{{< itunes 445189367 >}}



#### PopClipを持ってない場合は？





HTMLのエンティティ文字列をエンコードしてくれる便利なWebサービスがありますのでそちらを使用するようにしましょう。



http://www.web2generators.com/html/entities



### 注意事項




JavaScriptは圧縮された状態でダウンロードされますが、スタイルシートは圧縮されていない状態です。必要に応じてスタイルシートは圧縮してしまいましょう。これらの圧縮については、[はじめてのgulp.js！MacでCSSファイル、JavaScriptの圧縮を行おう](/gulp-css-sass-268/)を参考にしてください。タスクランナーに登録しておくと作業が捗ります。
