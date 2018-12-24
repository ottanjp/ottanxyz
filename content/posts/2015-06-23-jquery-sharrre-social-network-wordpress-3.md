---
author: ottan
date: 2015-06-23 13:22:22+00:00
draft: false
title: jQueryのプラグイン「Sharrre」を使用してWordPressにソーシャルネットワークのシェア数を非同期で取得する
type: post
url: /jquery-sharrre-social-network-wordpress-3-1740/
categories:
- WordPress
tags:
- Development
---

![](/images/2015/06/150623-55895dd4a3b2d.jpg)






ソーシャルネットワークのシェア数をカウントするjQueryのプラグインはさまざまですが、今回はあの世界的に有名な[Mashable](http://mashable.com/)でも使用されているという噂の、[Sharrre - A plugin for sharing buttons](http://sharrre.com/)を使用してみました。





前述のMashableのように、記事毎のトータルのシェア数を表示し、シェア数にマウスカーソルを合わせると、各ソーシャルネットワークの個々のシェア数がわかります。また、表示されたソーシャルネットワークのアイコンをクリックすると、そのまま記事をシェアできます。





シェア数が**1,000**を超えると、**1K**と略して表示されたりします。目指せ、1,000シェア！目指せ、Mashable？！





## サンプル





今回の動作サンプルも[CodePen](http://codepen.io/)にお世話になっています。





HTMLで指定したURLに対してTwitter、Facebook、Google+、はてなブックマークのトータルシェア数を表示します。また、その数値にマウスカーソルを合わせると各SNSのシェア状況がわかるようになっています。（※[CodePen](http://codepen.io/)でサンプルを実行すると、クロスドメイン、およびスクリプトが読み込まれるタイミング等の違いにより、ソーシャルネットワークのアイコンが表示されたり表示されなかったりする場合があります）



[codepen_embed height="268" theme_id="15957" slug_hash="YXEwZe" default_tab="result" user="ottanJP"]See the Pen YXEwZe by ottan (@ottanJP) on [CodePen](http://codepen.io).[/codepen_embed]



本プログラムを動作させるためには、jQuery 1.11.x、および[Sharrre - A plugin for sharing buttons](http://sharrre.com/)が必要になります。あらかじめダウンロードしておいてください。（※jQuery 2.X系では動作確認しておりませんので、悪しからず）



http://jquery.com/

http://sharrre.com/



## 解説





今回のサンプル（実際に弊サイトで使用しているソースコード）の解説です。





### HTML





まず、HTML部分です。今回は、 `<div>` タグを使用していますが任意のタグで構いません。また、サンプルのCSSには記載していませんが、 `.text-right` は要素を右寄せにするだけのクラスです。そのため、使用しなくてもとくに問題ありません。




    
    </div>
    
    <script src="https://ottan.xyz/wp-content/themes/ottanxyz/js/jquery-1.11.3.min.js"></script>
    <script src="https://ottan.xyz/wp-content/themes/ottanxyz/js/jquery.sharrre.min.js"></script>





WordPressに適用させるための、 `<div>` タグのポイントは以下の通りです。






<table >
<tr >項目説明</tr>
<tr >
<td >id
</td>
<td >他の要素と重複しない一意のIDを指定します。`the_id()` メソッドで記事のIDを割り当てます。
</td></tr>
<tr >
<td >data-url
</td>
<td >シェア数を取得するURLを指定する。 `the_permalink()` メソッドを使用します。
</td></tr>
<tr >
<td >data-title
</td>
<td >任意の文字列。トータルのシェア数の後ろに付与される文字列です。例では「 SHARES」。
</td></tr>
<tr >
<td >data-text
</td>
<td >シェアする際にTwitterやFacebookに付与される文字列。 `the_title()` を使用すると良いでしょう
</td></tr>
</table>






独自データ要素については、[jQueryを使用してTwitter、Facebook、Google+、はてなブックマークのシェア数を非同期で取得する方法のまとめ](https://ottan.xyz/jquery-social-network-share-count-1705/)でも解説していますので、ぜひご覧になってください。





HTML部分は、[Sharrre](http://sharrre.com/)により集計が行われ、最終的に以下のようになります。内容は長いので一部割愛しています。先頭の `<div>` タグのクラスに `.sharrre` が追加されていること、 `.box` クラスにトータルのシェア数、 `.buttons` クラスにソーシャルネットワーク毎のボタンが設置されていることを覚えておいてください。




    
    <div id="share-720" class="text-right sharrre" …>
      <div class="box">
        <a class="count" href="#">16</a>
        <a class="share" href="#"> SHARES</a>
      </div>
      <div class="buttons" style="display: none;">
        <div class="button hatena">
          <iframe class="hatena-bookmark-button-frame" …></iframe>
        </div>
        <div class="button twitter">
          <iframe id="twitter-widget-0" …></iframe>
        </div>
        <div class="button facebook">
          <div id="fb-root" class=" fb_reset">
            …
          </div>
        </div>
        <div class="button googleplus">
          <div id="___plusone_0" …>
            <iframe frameborder="0" …></iframe>
          </div>
        </div>
      </div>
    </div>





### JavaScript





JavaScriptは、HTMLのフッターに書きます。表示速度への影響が気になる場合は、 `async` 属性を付与することも可能ですが、スクリプトの読み込みが完了する前にフッターのスクリプトが呼ばれる可能性があるため、オススメはできません。




    
    </script>
    <script src="https://ottan.xyz/wp-content/themes/otttanxyz/js/jquery.sharrre.min.js"></script>





フッターのJavaScriptの内容は以下の通りです。インデックス以外のページでスクリプトを実行させたくない場合は、 `is_home()` または `is_front_page()` メソッドを使用して場合分けしましょう。




    
      $(document).ready(function () {
        $.each( $("[id^=share-]"), function() {
          $(this).sharrre({
            share: {
              hatena: true,
              twitter: true,
              facebook: true,
              googlePlus: true
            },
            click: function(api, options){
              api.simulateClick();
            },
            hover: function(api, options){
              $(api.element).find('.buttons').show();
            },
            hide: function(api, options){
              $(api.element).find('.buttons').hide();
            }
          });
        });
      });





HTML部分でご紹介したように、各 `<div>` タグには、 `the_id()` メソッドにより一意のIDを割り当てています。ただし、そのIDがソーシャルネットワークのシェア数を取得するために使用するものであることを明示するため、頭に必ず `share-` と付与しています。この性質を利用します。




    
      $(document).ready(function () {
        $.each( $("[id^=share-]"), function() {
          // do stuff
        });
      });





まず、DOM要素がすべてロードされたタイミングでこのスクリプトを実行します。 `$("[id^=share-]")` により、IDが `share-` で始まる要素をすべて抽出し、その要素に対して以下の処理を実行します。ここで、すべてのIDに `share-` を付与していた理由がここにあります。





    
          $(this).sharrre({
            share: {
              hatena: true,
              twitter: true,
              facebook: true,
              googlePlus: true
            },
            click: function(api, options){
              api.simulateClick();
            },
            hover: function(api, options){
              $(api.element).find('.buttons').show();
            },
            hide: function(api, options){
              $(api.element).find('.buttons').hide();
            }
          });





抽出した `<div>` タグに対して、今回使用しているプラグインの `sharrre()` メソッドを実行します。各オプションの意味は以下の通りです。






<table >
<tr >項目説明</tr>
<tr >
<td >share
</td>
<td >取得対象のソーシャルネットワーク。はてな（hatena）、Twitter、Facebook、Google+を対象とします。ただし、はてな（hatena）については後述します。
</td></tr>
<tr >
<td >click
</td>
<td >ソーシャルネットワークのアイコンがクリックされた時の動作です。 `simulateClick()` メソッドを呼ぶことでクリックした瞬間にカウンタが+1されます。
</td></tr>
<tr >
<td >hover
</td>
<td >マウスカーソルを合わせた場合の挙動を定義します。 `.buttons` は、ソーシャルネットワーク毎のアイコンが格納されている `<div>` タグのクラス名です。マウスカーソルを合わせるとボタンを表示します。
</td></tr>
<tr >
<td >hide
</td>
<td >マウスカーソルが離れた場合の挙動を定義します。 `hover` 同様にボタンを非表示にします。
</td></tr>
</table>






### CSS





CSSは以下の通りです。部分的に抜粋して解説しますので、詳細はサンプルをご覧ください。該当部分のHTMLについても再掲します。




    
    .sharrre .box {
      float: left;
    }
    
    .sharrre .count {
      color: #444444;
      display: block;
      font-size: 17px;
      line-height: 34px;
      height: 34px;
      padding: 4px 0;
      position: relative;
      text-align: center;
      text-decoration: none;
      width: 50px;
      background-color: #eee;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
    
    .sharrre .share {
      color: #FFFFFF;
      display: block;
      font-size: 11px;
      height: 16px;
      line-height: 16px;
      margin-top: 3px;
      padding: 0;
      text-align: center;
      text-decoration: none;
      width: 50px;
      background-color: #9CCE39;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
    
    .sharrre .buttons {
      display: none;
      position: absolute;
      margin-left: 50px;
      z-index: 10;
      background-color: #fff;
    }
    
    .sharrre .button {
      float: left;
     /* max-width: 50px;
     */ margin-left: 10px;
    }




    
    <div id="share-720" class="text-right sharrre" …>
      <div class="box">
        <a class="count" href="#">16</a>
        <a class="share" href="#"> SHARES</a>
      </div>
      <div class="buttons" style="display: none;">
        <div class="button hatena">
          <iframe class="hatena-bookmark-button-frame" …></iframe>
        </div>
        <div class="button twitter">
          <iframe id="twitter-widget-0" …></iframe>
        </div>
        <div class="button facebook">
          <div id="fb-root" class=" fb_reset">
            …
          </div>
        </div>
        <div class="button googleplus">
          <div id="___plusone_0" …>
            <iframe frameborder="0" …></iframe>
          </div>
        </div>
      </div>
    </div>





## はてなブックマークに対応させる





最後に番外編として便利なSharrreを、日本固有のサービス、はてなブックマークに対応させてみましたので、その方法をご紹介します。




    
      defaults = {
        className: 'sharrre',
        share: {
        googlePlus: false,
        facebook: false,
        twitter: false,
        digg: false,
        delicious: false,
        stumbleupon: false,
        linkedin: false,
        pinterest: false,
        hatena: false
      },





まず、 `sharrre()` メソッドのオプションである `share` に対して、 `hatena` を追加します。




    
      buttons: { //settings for buttons
      googlePlus: { //http://www.google.com/webmasters/+1/button/
        url: '', //if you need to personnalize button url
        urlCount: true, //if you want to use personnalize button url on global counter
        size: 'medium',
        lang: 'en_US',
        annotation: 'bubble'
      },
      ....
      pinterest: { //http://pinterest.com/about/goodies/
        url: '', //if you need to personalize url button
        media: '',
        description: '',
        layout: 'horizontal'
      },
      hatena: {
        url: '',
        urlCount: false,
      }
    }





続いて、同じくオプションである `buttons` に対して、 `hatena` を追加します。ボタンの必須オプションは `url` 、 `urlCount` のみです。 




    
      urlJson = {
      googlePlus: "",
    
      //new FQL method by Sire
      facebook: "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
      ....
      pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
      hatena: "http://api.b.st-hatena.com/entry.count?url={url}&callback=?"
      },





続いて、 `getJSON()` メソッドを使用して取得するURLを定義します。詳細は、[jQueryを使用してTwitter、Facebook、Google+、はてなブックマークのシェア数を非同期で取得する方法のまとめ](https://ottan.xyz/jquery-social-network-share-count-1705/)をご覧いただければと思います。なお、Google+については特殊な処理が必要です。これも前述の記事をご覧いただければ内容はご理解いただけるかと思いますので、ここでは割愛します。




    
      loadButton = {
        googlePlus: function (self) {
          ....
        },
        pinterest: function (self) {
         ....
        },
        hatena: function (self) {
        var sett = self.options.buttons.hatena;
        $(self.element)
          .find('.buttons')
          .append('<div class="button hatena"><a href="http://b.hatena.ne.jp/entry/' + (sett.url !== '' ? sett.url : self.options.url) + '" class="hatena-bookmark-button" data-hatena-bookmark-layout="simple-balloon" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a>');
        var loading = 0;
        if (typeof Hatena === 'undefined' && loading == 0) {
          loading = 1;
          (function () {
          var hatenaScriptTag = document.createElement('script');
          hatenaScriptTag.type = 'text/javascript';
          hatenaScriptTag.async = true;
          hatenaScriptTag.src = '//b.st-hatena.com/js/bookmark_button.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(hatenaScriptTag, s);
          })();
        }
        }
      },
    





最後に、はてなブックマーク用のボタンを設置するためのスクリプトです。基本的には[はてなブックマークボタンの作成・設置について - はてなブックマーク](http://b.hatena.ne.jp/guide/bbutton)に記載されている通りをそのまま追加しています。取得対象のURLは、 `sett.url` 、または `self.options.url` に格納されています。前者が空（固有のURL無し）の場合は、後者（現在のWebページのURL）を対象とします。





また、はてなブックマーク用のボタンを設置するためには、専用のJavaScript（bookmark_button.js）をあらかじめ読み込む必要があります。 同スクリプトに含まれる、`Hatena` というオブジェクトがすでに定義されているかどうかで、読み込み済みかどうかを判断し、オブジェクトが定義されていなければヘッダーにスクリプトの読み込みを追加します。




    
        tracking = {
          googlePlus: function () {},
          ....
          pinterest: function () {
            //if somenone find a solution, mail me !
          },
          hatena: function () {}
        },
    





最後にGoogle Analyticsによるトラッキングについて。はてなブックマークについてはよくわからなかったので、現在のところ空の関数となっています。





## まとめ





長文になりましたが、最後までご愛読いただきましてありがとうございました。皆様のお役に少しでも立てればと思います。





### 参考リンク



http://brdr-mmrndm.tumblr.com/post/78715104491/sharrre

http://webdesignrecipes.com/wordpress-conditional-tags-and-custom-post-type/

http://sharrre.com/
