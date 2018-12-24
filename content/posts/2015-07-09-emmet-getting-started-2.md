---
author: ottan
date: 2015-07-09 13:15:40+00:00
draft: false
title: 今からでも遅くない！今日から始めるEmmet入門
type: post
url: /emmet-getting-started-2-1759/
categories:
- Mac
- WordPress
tags:
- Development
---

![](/images/2015/07/150709-559e75639a903.jpg)




## Emmet





Emmetとは、HTML、CSSを高速に記述、編集できるエディター系プラグインです。何だか敷居が高いな、と思われている方もいらっしゃるかもしれませんが、やってみれば意外と簡単、むしろ超便利！ということに気付きます。ぜひチャレンジしてみてましょう。





### 下準備





今回使用するエディターは、Sublime Textです。Sublime Textに、あらかじめ「Emmet」パッケージをインストールしておく必要があります。「Package Control」を使用しますが、これについては、[Sublime Textに導入しているオススメのプラグイン23選](https://ottan.xyz/sublime-text-plugin-321/)を参照してください。





また、エディターによってインストール方法が異なります。各エディターのインストール方法を参照してください。



http://emmet.io/download/



#### ⇥で変換しないようにする





Emmetにおけるコードの展開は、デフォルトで⌃（control）+E、および⇥（tab）キーとなっていますが、後者は他の動作を上書きしてしまうため、同キーによるコードの展開を抑止します。





Sublime Textの場合、⌘（command）+,の環境設定に下記を記述します。




    
    "disable_tab_abbreviations": true





#### 日本語で文字変換時に文字が消えるのを回避する





日本語の文字変換時に文字が消えてしまうのを回避するために、同じく環境設定に下記を記述しておきます。





これらについては、[【便利ツール】Emmetで、ちょっと気持ちいいコーディング with sublime text 2・上巻 ｜ Developers.IO](http://dev.classmethod.jp/tool/emmet-sublimetext2-1/)の記事が参考になりました。




    
    "disable_formatted_linebreak": true





### 文法（Syntax）





ここでは、Emmetの基本的な文法についてご紹介します。展開前の状態で⌃+Eを押すと、展開後の表記に自動的に変換されます。





#### Child



**展開前**


    
    nav>ul>li



**展開後**


    
    <nav>
        <ul>
            <li></li>
        </ul>
    </nav>






  * タグをネストする場合は、**>**を使用する
  * Emmetにおいて、タグの前後の**<>**は不要




#### Sibling



**展開前**


    
    div+p+bq



**展開後**


    
    <div></div>
    <p></p>
    <blockquote></blockquote>






  * タグを改行コードで区切るには、**+**を使用する
  * bqのように、短縮して入力することのできるタグが存在する




#### Multiplication



**展開前**


    
    ul>li*5



**展開後**


    
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>






  * タグを連続して入力する場合は、*****を使用する
  * >と+など、他の文法と連携することができる




#### ID and CLASS attributes



**展開前**


    
    #header



**展開後**


    
    </div>






  * IDを属性に付与する場合は、**#**を使用する
  * #の前のタグを省略した場合は、**<div>**が使用される


**展開前**


    
    .title



**展開後**


    
    </div>





#### 応用編



**展開前**


    
    ul#header>li.title*5



**展開後**


    
    
        <li class="title"></li>
        <li class="title"></li>
        <li class="title"></li>
        <li class="title"></li>
        <li class="title"></li>
    </ul>






  * IDとクラスの名前は、>や*の前に指定する




### HTML





以下、よく利用するHTMLのコードをご紹介します。コーディングの参考にしてください。なお、すべてを暗記するのは不可能です。忘れてしまった場合は、[Cheat Sheet](http://docs.emmet.io/cheat-sheet/)を参照してください。





#### !



**展開前**


    
    !



**展開後**


    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        
    </body>
    </html>





#### Anchor



**展開前**


    
    a
    a:link
    a:mail



**展開後**


    
    </a>
    <a href="http://"></a>
    <a href="mailto:"></a>





#### Link



**展開前**


    
    link
    link:css
    link:favicon



**展開後**


    
    
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">





#### Image



**展開前**


    
    img
    



**展開後**


    
    





#### Form



**展開前**


    
    form
    form:get
    input
    input:h
    input:p



**展開後**


    
    </form>
    <form action="" method="get"></form>
    <input type="text">
    <input type="hidden" name="">
    <input type="password" name="" id="">





#### Table



**展開前**


    
    table+
    tr+



**展開後**


    
    <table>
        <tr>
            <td></td>
        </tr>
    </table>



**展開前**


    
    tr+



**展開後**


    
    <tr>
        <td></td>
    </tr>





### CSS





以下、よく利用するCSSのコードをご紹介します。コーディングの参考にしてください。なお、すべてを暗記するのは不可能です。忘れてしまった場合は、[Cheat Sheet](http://docs.emmet.io/cheat-sheet/)を参照してください。





#### Visual Formatting



**展開前**


    
    pos
    pos:r
    pos:a
    fl
    fl:l
    fl:r
    cl
    cl:b
    d
    d:b
    d:ib



**展開後**


    
    position: relative;
    position: relative;
    position: absolute;
    float: left;
    float: left;
    float: right;
    clear: both;
    clear: both;
    display: block;
    display: block;
    display: inline-block;





#### Margin & Padding



**展開前**


    
    m
    m:a
    mt
    mt:a
    p
    pt



**展開後**


    
    margin: ;
    margin: auto;
    margin-top: ;
    margin-top: auto;
    padding: ;
    padding-top: ;





#### Box Sizing



**展開前**


    
    bxz
    bxsh
    w
    w:a
    h
    h:a
    maw
    mah
    miw
    mih



**展開後**


    
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: inset hoff voff blur color;
    box-shadow: inset hoff voff blur color;
    width: ;
    width: auto;
    height: ;
    height: auto;
    max-width: ;
    max-height: ;
    min-width: ;
    min-height: ;





#### Font



**展開前**


    
    f
    f+
    fw
    fw:b
    fs
    fs:n
    fz
    fz12
    ff
    ff:a



**展開後**


    
    font: ;
    font: 1em Arial,sans-serif;
    font-weight: ;
    font-weight: bold;
    font-style: italic;
    font-style: normal;
    font-size: ;
    font-size: 12px;
    font-family: ;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;





#### Text



**展開前**


    
    va
    va:m
    ta
    ta:c
    td
    td:u



**展開後**


    
    vertical-align: top;
    vertical-align: middle;
    text-align: left;
    text-align: center;
    text-decoration: none;
    text-decoration: underline;


 


#### Background



**展開前**


    
    bg
    bgc



**展開後**


    
    background: #000;
    background-color: #fff;





#### Color



**展開前**


    
    c
    c:r



**展開後**


    
    color: #000;
    color: rgb(0, 0, 0);





#### Border



**展開前**


    
    bd
    bd+
    bd:n
    bdc
    bds
    bds:s
    bdt
    bdt+
    bdt:n



**展開後**


    
    border: ;
    border: 1px solid #000;
    border: none;
    border-color: #000;
    border-style: ;
    border-style: solid;
    border-top: ;
    border-top: 1px solid #000;
    border-top: none;
    





#### List



**展開前**


    
    lis
    lis:n
    list
    list:c



**展開後**


    
    list-style: ;
    list-style: none;
    list-syle-type: ;
    list-style-type: circle;





#### Others



**展開前**


    
    !



**展開後**


    
    !important



**展開前**


    
    @f



**展開後**


    
    @font-face {
    	font-family:;
    	src:url();
    }



**展開前**


    
    @f+



**展開後**


    
    @font-face {
    	font-family: 'FontName';
    	src: url('FileName.eot');
    	src: url('FileName.eot?#iefix') format('embedded-opentype'),
    		 url('FileName.woff') format('woff'),
    		 url('FileName.ttf') format('truetype'),
    		 url('FileName.svg#FontName') format('svg');
    	font-style: normal;
    	font-weight: normal;
    }





### 全部暗記する必要はあるの？





全部暗記する必要はありません。忘れてしまった場合は、[Cheat Sheet](http://docs.emmet.io/cheat-sheet/)を参照してください。HTMLのタグや、CSSのプロパティは、頭文字をとったものが多いのが見ていてわかると思います。それを頭に入れて記述すると、随分と早くコーディングできるようになります。
