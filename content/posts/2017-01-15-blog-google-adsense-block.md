---
author: ottan
date: 2017-01-15 02:51:55+00:00
draft: false
title: ブログを訪れたユーザーがどれだけGoogle AdSenseをブロックしているかを簡単に計測する方法
type: post
url: /blog-google-adsense-block-5470/
categories:
- Blog
tags:
- Development
- Google
---

![](/images/2017/01/170115-587adc00b89dd.jpg)






レンタルサーバー料金、独自ドメイン更新料など、ブログを運営していく上で欠かせないのが、その維持費です。維持費を捻出するためにGoogle AdSenseを導入されている方も多いのではないでしょうか。弊サイトでも、同様の目的でGoogle AdSenseを導入しています。





と言いつつ、Google AdSenseを積極的に推しているわけではなく、むしろ[iPhoneのすべてのアプリからありとあらゆる広告を消し去る魔法のアプリ「AdBlock」の仕組み – OTTAN.XYZ](/ios-adblock-5057/)など、広告を除去して快適にブラウジングする方法を紹介していたりします。結果的には収入は減ってしまうのですが、閲覧してくださる方も多くなり嬉しい限りです。





では、実際にどれくらいのユーザーがSafariやGoogle Chromeなどの拡張機能や、コンテンツブロッカー等を使用してGoogle AdSenseをブロックしているのか、計測してみたいと思ったことはありませんか。今回は、ブロックしているユーザの割合を計測したい場合に使用するスクリプトをご紹介します。





## Google AdSenseをブロックするユーザを計測するJavaScript





Google AdSenseをブロックするユーザを計測するために、今回はJavaScriptを使用します。JavaScript初心者の方でも簡単に設置できますのでご安心ください。





### Google Analyticsを導入する





今回は、Google Analyticsのイベントを使用してGoogle AdSenseをブロックしているユーザの数を計測します。計測する方法の性質上
、正確な数は把握できませんが、目安にはなると思います。ブログを運営されている方でGoogle Analyticsを導入されていない方は少ないと思いますが、まだの方はこれを機にGoogle Analyticsを導入しましょう。導入の方法については割愛します。



https://analytics.google.com/



### Google AdSenseをブロックするユーザを計測するJavaScriptを設置する





Google AdSenseは、次のようなタグで囲まれて表示されます。AdBlock Plusなどのコンテンツブロッカーは、このタグを表示しないように制御することで、広告を表示することを抑止しています。




    
    …</ins>





Google AdSenseの広告は、`<ins class="adsbygoogle"></ins>`というタグで囲まれていることがわかります。AdBlock Plusなどのコンテンツブロッカーは、このタグに囲まれたHTMLを表示しないように制御することで広告を表示しないようにしているのですね。





逆に言えば、このタグが正常に表示されているかどうか（≒タグの中身が空でないかどうか）で、Google AdSenseによる広告が表示されているかどうかを判断できます。よって、ユーザーがGoogle AdSenseをブロックしているかどうかは、このタグの内容を判定することで判別できそうですね。





そこで、以下の`<script>…</script>`で囲まれたスクリプトを、`</body>`タグの直前に挿入します。なお、事前にGoogle Analyticsで使用するJavaScriptが読み込まれていない場合、動作しませんので設置しておいてください。




    
    <script> 
      
      window.onload = function() { 
      
        // Delay to allow the async Google Ads to load
        setTimeout(function() { 
          
          // Get the first AdSense ad unit on the page
          var ad = document.querySelector("ins.adsbygoogle");
          
          // If the ads are not loaded, track the event
          if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {
     
            if (typeof ga !== 'undefined') {
     
                // Log an event in Universal Analytics
                // but without affecting overall bounce rate
                ga('send', 'event', 'Adblock', 'Yes', {'nonInteraction': 1}); 
     
            } else if (typeof _gaq !== 'undefined') {
     
                // Log a non-interactive event in old Google Analytics
                _gaq.push(['_trackEvent', 'Adblock', 'Yes', undefined, undefined, true]);
     
            }
          }
        }, 2000); // Run ad block detection 2 seconds after page load
      }; 
      
    </script>





このスクリプトは、Webページのロード完了後、2秒間待機してから、前述のGoogle AdSenseが表示されるHTMLタグの内容を判別するようになっています。`<ins class="adsbygoogle"></ins>`の内容が空白の場合、Google AdSenseはブロックされていると判定します。Webページのロード完了後、一定時間（今回の場合は2秒間）待機する必要があるのは、まだGoogle AdSenseの読み込みとコンテンツブロッカーによる表示抑止が完了してからでないと、ブロックされているかどうかの判別ができないからです。




    
    ga('send', 'event', 'Adblock', 'Yes', {'nonInteraction': 1});





Google AdSenseの広告がブロックされていると判定されれば、Google Analyticsのイベントとして登録します。「Adblock」というカスタマイズイベントをGoogle Analyticsに通知します。その性質上、即座には反映されないため、Google Analyticsに表示されない場合は、しばらく置いてから見てみてください。




    
    _gaq.push(['_trackEvent', 'Adblock', 'Yes', undefined, undefined, true]);





まだ使用している方がいらっしゃるかどうかわかりませんが、古いタイプのGoogle Analyticsを使用している場合は、こちらのコードを使用してGoogle Analyticsに通知します。





### 最小化したJavaScript





[JSCompress: Minify Javascript Online / Online JavaScript Compression](https://jscompress.com/)で圧縮したJavaScriptを掲載しておきます。通常の場合は、こちらのスクリプトを`</body>`タグの直前に挿入するのが良いでしょう。




    
    <script>window.onload=function(){setTimeout(function(){var a=document.querySelector("ins.adsbygoogle");a&&0==a.innerHTML.replace(/\s/g,"").length&&("undefined"!=typeof ga?ga("send","event","Adblock","Yes",{nonInteraction:1}):"undefined"!=typeof _gaq&&_gaq.push(["_trackEvent","Adblock","Yes",void 0,void 0,!0]))},2e3)};</script>





### Google Analyticsで確認する





JavaScriptを設置して、しばらく時間を置いたらGoogle Analyticsを確認してみましょう。





![](/images/2017/01/170115-587ae1a287215.png)






「イベント」は、レポートの「行動」→「イベント」から確認できます。





![](/images/2017/01/170115-587ae1ae7b72d.png)






Google Analyticsに正常にイベントが送信されていれば、このように「Adblock」と呼ばれるイベントが登録されます。ページビューに対して、「Adblock」イベントがどれくらい送信されているかによって、訪問者が広告をブロックしている割合を把握できます。
