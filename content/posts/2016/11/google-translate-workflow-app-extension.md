---
author: ottan
date: 2016-11-13 11:18:43+00:00
draft: false
title: 翻訳精度が向上したGoogle翻訳をiPhoneの色々なアプリから呼び出す拡張機能
type: post
slug: google-translate-workflow-app-extension-5238
categories:
  - iPhone
tags:
  - Tips
---

![](/uploads/2016/11/161113-582845d6e8a93.jpg)

[Google 翻訳の精度が向上した](https://nlab.itmedia.co.jp/nl/articles/1611/12/news021.html)、と連日話題になっています。ニュートラルネット機械翻訳技術（NMT：Neutral Machine Translation）と呼ばれる新技術が導入されて、飛躍的に翻訳精度が向上したとのことです。ただし、適用されているのは、「日 → 英」の翻訳のみという話もあり、何が正しいのかはわかりません。また、いくら精度が向上したといっても「機械翻訳技術」が向上しただけであって、そこに人間味はありません。

とはいえ、精度が向上した技術を使用しないのはもったいない。ただし、Google 翻訳のアプリは iPhone にもありますが、翻訳が使用できるのはアプリ内のみ。「Microsoft Translate」という Microsoft 社が提供する翻訳アプリは、iOS の「App Extension」に対応しているため、Safari のみならず、さまざまなアプリから呼び出せますが、翻訳精度が Google に比べてイマイチ。

Google 翻訳を呼び出すだけであれば、Safari のブックマークレットを使用するということも考えられますが、これでは使用できるのが Safari だけ。App Store を探しても、「App Extension」として Google 翻訳を呼び出せるアプリがなかなか見つかりません。というわけで、そのような場合には簡単に「App Extension」を作成可能な「Workflow」を使用します。

{{< itunes 915249334 >}}

「Workflow」は、Mac の Automator のようなもので、iOS の制限された範囲内でさまざまなことを組み合わせて自動化できる素晴らしい仕組みです。この「Workflow」を使用することで、渡された  パラメーター（今回の場合は URL）を、Google 翻訳に引き継ぐといったことが可能になります。しかも、この「Workflow」で作成した「App Extension」は、iOS の共有機能が使えるアプリであれば（実質、無制限）、どこでも呼び出すことができます。有償のアプリですが、それだけの価値があるのです。

## Workflow を使用して、どこでも Google 翻訳を使う

「Workflow」の良い点は、「App Extension」を一から作成しなくても、すでに Web 上に大量に公開されているものを簡単にインポートできるということです。「Workflow」は何でもできるがゆえに、初心者は「何をしたらいいかさっぱりわからない」という事態に陥りがちですが、すでに公開されている「Workflow」を参考にイノベーションすれば良いのです。

https://workflow.is/workflows/75328e15409542be9ca6a6dbc531598d

今回は、上記リンクで公開されている「Workflow」を使用します。この「Workflow」は、 パラメーターとして「URL」を受け取り、Google 翻訳を Safari で開くだけという至って単純なものですが、これを実現できる App がなかなか見つからないのが現状です。Google 翻訳が対応してくれれば言うことないんですが。

![](/uploads/2016/11/161113-582845e3a495f.png)

上記リンクにアクセスしたら、「GET WORKFLOW」をタップします。

![](/uploads/2016/11/161113-582845e884dc7.png)

この「Workflow」ですが、「独語 → 英語」の翻訳に使用される「Workflow」のようで、そのままでは何の役にも立ちません。そのため、「自動的に検出した言語 → 日本語」に変換してくれる「Workflow」になるように編集しましょう。左上の「Edit」をタップします。

![](/uploads/2016/11/161113-582845ef13d8b.png)

「URL」と書かれた項目を以下のように編集します。

    https://translate.google.com/translate?hl=de&tl;=en&u;=URL

↓

    https://translate.google.com/translate?hl=auto&tl;=ja&u;=URL

これで準備完了です。右上の「Done」をタップします。

### Safari で翻訳する

では、早速、先ほど作成した「Workflow」を Safari から呼び出してみます。

![](/uploads/2016/11/161113-582845f5a2333.png)

翻訳したい Web ページを見つけたら、「共有」メニューをタップします。

![](/uploads/2016/11/161113-582845fb151ab.png)

「Run Workflow」をタップします。

![](/uploads/2016/11/161113-58284600977d9.png)

「Run Workflow」が見つからない場合は、共有メニューで「Run Workflow」を有効化しておきましょう。また、並べ替えて「Run Workflow」を先頭に持ってくると使い勝手が向上します。

![](/uploads/2016/11/161113-58284606958e9.png)

「Workflow」が起動するので「Translate」をタップします。

![](/uploads/2016/11/161113-5828460bf0a34.png)

「Run Workflow」をタップします。「Safari からインポートした Workflow だけど実行して大丈夫か？その Workflow は本当に安全か？」みたいな警告です。もし、この警告が嫌ならば先ほどの「Workflow」を自作すれば良いだけです。

![](/uploads/2016/11/161113-582846124a273.png)

新規にタブが開いて、Google 翻訳により翻訳されました。

### Instapaper で翻訳する

最後に、最近の私のお気に入りの[Instapaper](/posts/2016/11/pocket-to-instapaper-5181/)から「Workflow」を呼び出してみます。といっても、Safari から呼び出す場合も、別のアプリから呼び出す場合も、方法はまったく一緒です。

![](/uploads/2016/11/161113-58284618b0f4e.png)

任意の記事を開いて、「共有」メニューをタップします。

![](/uploads/2016/11/161113-5828461f1110c.png)

「Run Workflow」をタップします。

![](/uploads/2016/11/161113-58284628084d8.png)

「Translate」をタップします。

![](/uploads/2016/11/161113-5828462f163d9.png)

Safari が自動的に開き、Google 翻訳で翻訳された記事が表示されます。便利！

## まとめ

Google 翻訳の「日 → 英」変換といえば、「存じ上げません」→「Zonjiage not」を思い出して、今でも吹き出しそうになりますが、現在は「I don't know」とまったくもって人間味のない、ごもっともなフレーズに翻訳されるようになっています。精度が向上した Google 翻訳を最大限に活用するために、「Workflow」を使用してみてはいかがでしょうか。
