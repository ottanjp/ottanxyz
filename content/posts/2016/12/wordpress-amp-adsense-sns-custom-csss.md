---
author: ottan
date: 2016-12-09 10:31:09+00:00
draft: false
title: WordPressをAMPに対応させる方法とそのカスタマイズ
type: post
slug: wordpress-amp-adsense-sns-custom-csss-5319
categories:
- Blog
tags:
- Development
---

![](/uploads/2016/12/161209-584a71204f3d6.jpg)






2016年2月から導入されたGoogle検索結果に適用されるAMP（Accelerated Mobile Pages）プロジェクト。スマートフォンなどのモバイルデバイスにおける検索結果表示を高速化するためのプロジェクトです。しかし、このプロジェクト開始当初は柔軟なカスタマイズが不可能であり、逆にユーザビリティの低下に繋がる可能性があるように感じられたため、弊サイトでの導入は見送ってきました。徐々にプロジェクトが成熟し始め、ある程度のカスタマイズもできるようになったため、弊サイトでもAMPを遂に導入しました。





今回は、弊サイトでAMPを導入したその方法と、Google AnalyticsやGoogle Adsenseの導入、Font AwesomeなどのWebフォントの導入、カスタマイズCSSの構築方法についてご紹介します。WordPressの場合、WordPressの開発元であるAutomattic社が
開発するプラグインを導入するだけなので、AMP対応するだけならとても簡単です。リソースをかけることなく対応できますよ。





## WordPressをAMPに対応しカスタマイズする





WordPressをAMPに対応させるだけなら非常に簡単です。WordPressの開発元であるAutomattic社が提供する「AMP」プラグインを導入するだけだからです。ただし、そのままではGoogle AnalyticsやGoogle Adsenseを使用することはできませんので、ある程度のカスタマイズが必要です。





### AMPプラグインのインストール





![](/uploads/2016/12/161209-584a7187068f3.png)






まずは、WordPressのダッシュボードにログインし、Automattic社の「AMP」プラグインをインストール、有効化します。





![](/uploads/2016/12/161209-584a718e708a1.png)






プラグインを有効化するだけでAMPへの対応は完了です。URLの末尾に`amp`を付与してアクセスします。以下に例を示します。




    
    http://macbook-pro:8080/iphone-gmail-client-utlimate-guide-5302/amp/





ただし、プラグイン有効化直後の状態では何もカスタマイズされていないため、WordPressで構築されたすべてのWebページについて、まったく同じスタイルが適用されたページが表示されることになります。





![](/uploads/2016/12/161209-584a7192e2142.png)






たとえば、本文は明朝体で統一されています。





![](/uploads/2016/12/161209-584a719778620.png)






`table`タグに対するスタイルは何も適用されていないため、スマートフォンでは視認性に欠けます。





![](/uploads/2016/12/161209-584a719c071d3.png)






iTunesのアフィリエイトリンクについても、スタイルが何も適用されていないため、かろうじてリンクであることはわかりますが、非常に読みづらいです。





### AMPのカスタマイズ





では、AMPの表示をカスタマイズしていきましょう。カスタマイズ方法は、「AMP」プラグインの開発元であるAutomattic社のGitHubに公開されています。



https://github.com/Automattic/amp-wp



「AMP」プラグインに同梱されているテンプレートを上書きすると、プラグインアップデートの都度、テンプレートを書き直さなくてはなりません。そのため、記事ページのテンプレートをコピーしておきます。「AMP」プラグインインストールディレクトリ配下の`single.php`をコピーします。




    
    <WordPress Install Directory>/wp-content/plugins/amp/templates/single.php




    
    <WordPress Install Directory>/wp-content/themes/<Your Theme>/include/amp/single.php





続いて、`functions.php`の最後に以下を追記します。`single.php`のパスは、環境に応じて適宜変更してください。今回は、上記のパスにコピーされていることを前提としています。



https://gist.github.com/ottanxyz/bb03aade6544114f03c0da95a5917224



続いて、AMPに適用するカスタマイズCSSを作成します。AMPでは外部スタイルシートやスクリプトを読み込むことができません。すべてインラインで記述する必要がありますが、スタイルシートの記述方法にも作法があります。「AMP」プラグインを使用する場合は、`functions.php`の末尾に以下を追記します。以下の関数の中に、カスタマイズしたいCSSをそのまま追記してください。



https://gist.github.com/ottanxyz/fad23452969e7081364e588bbcdd1db0



たとえば、BootstrapなどのCSSフレームワークを使用している場合、AMP表示に必要なCSSのみを抽出します。と言っても、どの部分を抽出すれば良いのか、すぐには分かりませんよね。必要なCSSのみを抽出するためには、Google Chromeのデベロッパーコンソールが便利です。





![](/uploads/2016/12/161209-584a7973b31c0.png)






たとえば、Google Chromeの場合、オリジナルのWebページを開いて、CSSを抽出したい要素を選択して、右クリックし「検証」をクリックします。





![](/uploads/2016/12/161209-584a797b07fd5.png)






すると、デベロッパーコンソールが起動します。「Elements」タブに、現在選択している要素と、その要素に適用されているスタイルが右側に表示されます。ここに表示されているスタイルをそのままコピーして使用できます。冗長なスタイルシートはすべて省いてしまいましょう。[Webクリエイターは要チェック！CSS作業をバツグンに効率化してくれる無料のツール&アプリ17選｜SeleQt【セレキュト】](http://www.seleqt.net/design/free-css-tools-and-apps/)で紹介されているCSSのツールを使用すると、より効率的に使用するスタイルを抽出できるかもしれませんね。





#### Font Awesomeを使用する





弊サイトでは、Font AwesomeによるWebフォントを使用しています。通常は、CDN（コンテンツ・デリバリー・ネットワーク）で配信されているCSSファイルを読み込むだけなのですが、AMPでは外部スタイルシートを読み込むことができません。そこで、前述のカスタマイズCSSに追加する必要があります。



https://fontawesome.com//



まずは、上記リンクからFont Awesomeの本体をダウンロードします。本体の中の「Fonts」フォルダーを開いて、以下のファイルのみWordPressのテーマフォルダーにコピーしておきます。今回は、以下のフォルダーにコピーしました。




    
    <WordPress Install Directory>/wp-content/themes/<Your Theme>/include/fonts/fontawesome-webfont.eot
    <WordPress Install Directory>/wp-content/themes/<Your Theme>/include/fonts/fontawesome-webfont.svg
    <WordPress Install Directory>/wp-content/themes/<Your Theme>/include/fonts/fontawesome-webfont.ttf
    <WordPress Install Directory>/wp-content/themes/<Your Theme>/include/fonts/fontawesome-webfont.woff
    <WordPress Install Directory>/wp-content/themes/<Your Theme>/include/fonts/fontawesome-webfont.woff2
    <WordPress Install Directory>/wp-content/themes/<Your Theme>/include/fonts/FontAwesome.otf





続いて、以下のコードを先ほどのカスタマイズCSSに追記します。



https://gist.github.com/ottanxyz/9fa7b7cab517781159a04ad0691db627



`fa-twitter`の`content`プロパティに設定しているUnicodeは、Font AwesomeのWebページで確認できます。





![](/uploads/2016/12/161209-584a82362d064.png)






たとえば、TwitterのアイコンのUnicodeは、上記の画像の通り、`f099`であることがわかります。





#### Google Analytics





続いて、AMPページにGoogle Analyticsを導入します。以下のコードを`functions.php`の末尾に追記します。



https://gist.github.com/ottanxyz/f3ae66a753d5498af27d74f67023064f



`account`に設定するトラッキングIDは、Google Analyticsにログインして確認します。ログイン後、「管理」→「プロパティ」→「プロパティ設定」から「トラッキングID」を確認できます。





![](/uploads/2016/12/161209-584a789ad49dc.png)






### Google Adsense





最後にGoogle Adsenseを導入します。Google Adsenseは、「AMP」プラグインで標準で対応していないため、手動で設定する必要があります。コピーしたテンプレートファイル（`single.php`）の`<head>`に以下のコードを追記します。




    
    </script>





続いて、以下のAMPのGoogle Adsense専用タグを、コピーしたテンプレートファイルに追記します。設置するGoogle AdsenseのGoogleが推奨する広告枠には2種類あります。それは、「スクロールせずに見える範囲」と「スクロールしなければ見えない位置」の2種類です。





「スクロールせずに見える範囲」とは、たとえばページのヘッダー箇所に表示する広告です。スマートフォンで表示した際に、ユーザーがスクロールすることなく見える範囲に表示される広告を表示したい場合には、以下を追記します。




    
    <amp-ad
      layout="fixed-height"
      height=100
      type="adsense"
      data-ad-client="ca-pub-xxxx"
      data-ad-slot="yyyy">
    </amp-ad>





「スクロールしなければ見えない位置」とは、たとえば記事の末尾に表示される広告です。ユーザーが記事を読み終えた後に表示したい広告がある場合には、表示したい位置に以下を追記します。




    
    <amp-ad
      layout="responsive"
      width=300
      height=250
      type="adsense"
      data-ad-client="ca-pub-xxxx"
      data-ad-slot="zzzz">
    </amp-ad>





`data-ad-client`、`data-ad-slot`に設定する値は、Google Adsenseで確認します。





![](/uploads/2016/12/161209-584a77622c693.png)






Google Adsenseにログインしたら「広告の設定」をクリックします。





![](/uploads/2016/12/161209-584a778615541.png)






設置したい広告の「コードを取得」をクリックします。AMPに表示する広告のサイズは「レスポンシブ」である必要があります。これについては後述します。





![](/uploads/2016/12/161209-584a778c0c121.png)






表示されるコードの中から、`data-ad-client`、`data-ad-slot`の値を取得します。`data-ad-client`の値はすべての広告で共通です。





![](/uploads/2016/12/161209-584a77bc97615.png)






広告サイズは「レスポンシブ」である必要があると述べましたが、広告ユニットを作成する際に、広告サイズを「レスポンシブ」としてください。作成済みの広告ユニットが「レスポンシブ」であるかどうかを確認するためには、広告ユニットのタイトルをクリックします。





### 表示を確認する





ここまでカスタマイズしたところで、実際の表示を確認してみます。通常のURLの末尾に`amp`を付与します。




    
    http://macbook-pro:8080/iphone-gmail-client-utlimate-guide-5302/amp/





PCやスマートフォンのブラウザから上記のURLにアクセスします。





![](/uploads/2016/12/161209-584a74885da97.png)






Google Adsenseが表示されました。また、各種ソーシャルボタンが表示されていることがわかります。このソーシャルボタンで使用しているWebフォントにはFont Awesomeを使用しています。





![](/uploads/2016/12/161209-584a748fbce65.png)






何処と無くぎこちなかった本文のフォントについては、すべてゴシック系で統一されました。





![](/uploads/2016/12/161209-584a74946a652.png)






また、テーブルも表示サイズに応じてスクロールするレスポンシブな表示に切り替わりました。





![](/uploads/2016/12/161209-584a749beb52a.png)






iTunesのアフィリエイトリンクについても、スタイルシートが適用され表示がわかりやすくなりました。





### Google Chromeのデベロッパーコンソールで確認する





最後に、GoogleがAMPページをキャッシュするためには、AMPのフォーマットが正常であることを確認する必要があります。ここでエラーが表示された場合、GoogleはAMPページをキャッシュすることができず検索結果にも表示されません。





Google Chromeを開き、AMPページのURL（つまり、末尾に`amp`を付与したページ）の末尾に`#development=1`を付与して開きます。




    
    http://macbook-pro:8080/iphone-gmail-client-utlimate-guide-5302/amp/#development=1





たとえば、上記のような感じです。





![](/uploads/2016/12/161209-584a7ab15bf72.png)






Google Chromeのデベロッパーコンソールを開き、「AMP validation successful」と表示されていることを確認してください。Safariでは確認できません。必ずGoogle Chromeで確認してください。





## まとめ





以上、駆け足でWordPressをAMP対応させる方法と、そのカスタマイズについて簡単にご紹介しました。今後のプラグインのアップデート等で状況が変わる可能性もあるため、その際は、追ってご紹介したいと思います。AMPに関するご質問、ご指摘等ありましたら、[@ottanxyz](https://twitter.com/ottanxyz)やコメント欄で受け付けています。
