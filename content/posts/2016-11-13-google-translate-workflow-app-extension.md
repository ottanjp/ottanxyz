---
author: ottan
date: 2016-11-13 11:18:43+00:00
draft: false
title: 翻訳精度が向上したGoogle翻訳をiPhoneの色々なアプリから呼び出す拡張機能
type: post
url: /google-translate-workflow-app-extension-5238/
categories:
- iPhone
tags:
- Tips
---

![](/images/2016/11/161113-582845d6e8a93.jpg)






[Google翻訳の精度が向上した](http://nlab.itmedia.co.jp/nl/articles/1611/12/news021.html)、と連日話題になっています。ニュートラルネット機械翻訳技術（NMT：Neutral Machine Translation）と呼ばれる新技術が導入されて、飛躍的に翻訳精度が向上したとのことです。ただし、適用されているのは、「日→英」の翻訳のみという話もあり、何が正しいのかはわかりません。また、いくら精度が向上したといっても「機械翻訳技術」が向上しただけであって、そこに人間味はありません。





とはいえ、精度が向上した技術を使用しないのはもったいない。ただし、Google翻訳のアプリはiPhoneにもありますが、翻訳が使用できるのはアプリ内のみ。「Microsoft Translate」というMicrosoft社が提供する翻訳アプリは、iOSの「App Extension」に対応しているため、Safariのみならず、さまざまなアプリから呼び出せますが、翻訳精度がGoogleに比べてイマイチ。





Google翻訳を呼び出すだけであれば、Safariのブックマークレットを使用するということも考えられますが、これでは使用できるのがSafariだけ。App Storeを探しても、「App Extension」としてGoogle翻訳を呼び出せるアプリがなかなか見つかりません。というわけで、そのような場合には簡単に「App Extension」を作成可能な「Workflow」を使用します。



{{< itunes 915249334 >}}



「Workflow」は、MacのAutomatorのようなもので、iOSの制限された範囲内でさまざまなことを組み合わせて自動化できる素晴らしい仕組みです。この「Workflow」を使用することで、渡されたパラメーター（今回の場合はURL）を、Google翻訳に引き継ぐといったことが可能になります。しかも、この「Workflow」で作成した「App Extension」は、iOSの共有機能が使えるアプリであれば（実質、無制限）、どこでも呼び出すことができます。有償のアプリですが、それだけの価値があるのです。





## Workflowを使用して、どこでもGoogle翻訳を使う





「Workflow」の良い点は、「App Extension」を一から作成しなくても、すでにWeb上に大量に公開されているものを簡単にインポートできるということです。「Workflow」は何でもできるが故に、初心者は「何をしたらいいかさっぱりわからない」という事態に陥りがちですが、すでに公開されている「Workflow」を参考にイノベーションすれば良いのです。



https://workflow.is/workflows/75328e15409542be9ca6a6dbc531598d



今回は、上記リンクで公開されている「Workflow」を使用します。この「Workflow」は、パラメーターとして「URL」を受け取り、Google翻訳をSafariで開くだけという至って単純なものですが、これを実現できるAppがなかなか見つからないのが現状です。Google翻訳が対応してくれれば言うことないんですが。





![](/images/2016/11/161113-582845e3a495f.png)






上記リンクにアクセスしたら、「GET WORKFLOW」をタップします。





![](/images/2016/11/161113-582845e884dc7.png)






この「Workflow」ですが、「独語→英語」の翻訳に使用される「Workflow」のようで、そのままでは何の役にも立ちません。そのため、「自動的に検出した言語→日本語」に変換してくれる「Workflow」になるように編集しましょう。左上の「Edit」をタップします。





![](/images/2016/11/161113-582845ef13d8b.png)






「URL」と書かれた項目を以下のように編集します。




    
    https://translate.google.com/translate?hl=de&tl;=en&u;=URL





↓




    
    https://translate.google.com/translate?hl=auto&tl;=ja&u;=URL





これで準備完了です。右上の「Done」をタップします。





### Safariで翻訳する





では、早速、先ほど作成した「Workflow」をSafariから呼び出してみます。





![](/images/2016/11/161113-582845f5a2333.png)






翻訳したいWebページを見つけたら、「共有」メニューをタップします。





![](/images/2016/11/161113-582845fb151ab.png)






「Run Workflow」をタップします。





![](/images/2016/11/161113-58284600977d9.png)






「Run Workflow」が見つからない場合は、共有メニューで「Run Workflow」を有効化しておきましょう。また、並べ替えて「Run Workflow」を先頭に持ってくると使い勝手が向上します。





![](/images/2016/11/161113-58284606958e9.png)






「Workflow」が起動するので「Translate」をタップします。





![](/images/2016/11/161113-5828460bf0a34.png)






「Run Workflow」をタップします。「SafariからインポートしたWorkflowだけど実行して大丈夫か？そのWorkflowは本当に安全か？」みたいな警告です。もし、この警告が嫌ならば先ほどの「Workflow」を自作すれば良いだけです。





![](/images/2016/11/161113-582846124a273.png)






新規にタブが開いて、Google翻訳により翻訳されました。





### Instapaperで翻訳する





最後に、最近の私のお気に入りの[Instapaper](https://ottan.xyz/pocket-to-instapaper-5181/)から「Workflow」を呼び出してみます。といっても、Safariから呼び出す場合も、別のアプリから呼び出す場合も、方法はまったく一緒です。





![](/images/2016/11/161113-58284618b0f4e.png)






任意の記事を開いて、「共有」メニューをタップします。





![](/images/2016/11/161113-5828461f1110c.png)






「Run Workflow」をタップします。





![](/images/2016/11/161113-58284628084d8.png)






「Translate」をタップします。





![](/images/2016/11/161113-5828462f163d9.png)






Safariが自動的に開き、Google翻訳で翻訳された記事が表示されます。便利！





## まとめ





Google翻訳の「日→英」変換といえば、「存じ上げません」→「Zonjiage not」を思い出して、今でも吹き出しそうになりますが、現在は「I don't know」とまったくもって人間味のない、ごもっともなフレーズに翻訳されるようになっています。精度が向上したGoogle翻訳を最大限に活用するために、「Workflow」を使用してみてはいかがでしょうか。
