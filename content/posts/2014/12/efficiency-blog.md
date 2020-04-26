---
author: ottan
date: 2014-12-09 08:39:33+00:00
draft: false
title: WordPressのテーマ開発、ブログの執筆作業を効率化する方法のまとめ
type: post
url: /efficiency-blog-736/
categories:
- Mac
- Blog
tags:
- Development
---

![](/uploads/2014/12/141203-547ecbe329ea3.jpg)






今回は、私が実践しているWordPressのテーマ開発、およびブログの執筆作業を効率化するために行っている施策をいくつかご紹介します。前半はテーマ開発について、後半はブログの執筆作業についてまとめてみましたのでぜひご参考にしてみてください。





## Sublime Text 3の開発環境の共有によるテーマ開発の効率化





ブログの開発環境にはSublime Text 3を利用しています。過去にも[Sublime Textに導入しているオススメのプラグイン23選](/sublime-text-plugin-321/)としてオススメのプラグインをご紹介していますが、開発環境が変わるたび（たとえば、iMacからMacBook Pro）にプラグインを再インストールすることは非常に面倒な作業です。





そこで、この作業を簡略化するためにプラグインを共有するようにします。今回は共有するための環境としてDropboxを利用していますが、
環境によって読み替えて行ってください。





![](/uploads/2014/12/141203-547ed23343ec4.png)






まずは、下記フォルダーにある「Installed Packages」「Packages」のバックアップをDropbox上に取得します。私の場合は、Dropbox上に「Sublime Text」というフォルダーを区切って、その中に前述の退避させていますが、ここは任意で構いません。ここでは、このことを前提に進めます。




    
    ~/Library/Application\ Support/Sublime\ Text\ 3
    





退避が完了したら、ターミナルを開いて以下のコマンドを実行します。Sublime Textのプラグイン関連のフォルダーを、Dropbox上のフォルダーのリンクへと更新しています。各開発環境でこの一連の作業を行うだけで、まったく同じ環境でSublime Textを使用することができるので非常に便利です。




    
    $ cd ~/Library/Application\ Support/Sublime\ Text\ 3
    $ rm -fr Installed\ Packages/
    $ rm -fr Packages/
    $ ln -s ~/Dropbox/Sublime\ Text/Installed\ Packages .
    $ ln -s ~/Dropbox/Sublime\ Text/Packages .
    





ただし、この方法はSublime Textのプラグインや設定が同期されるだけであり、プラグインの実行に必要なバイナリ（たとえば、JavaScriptのコードチェッカーであるjslint）などが同期されるわけではないことに注意してください。



http://www.sublimetext.com/3



## WordPress開発環境の共有によるテーマ開発の効率化





WordPressの開発環境の構築方法については、[gulp.jsとBrowser Syncで快適なWordPress開発環境を手に入れる](/gulp-browser-sync-476/)の記事をご覧ください。VCCWインストール後に作成される「www」フォルダーこそWordPressの中身そのものですが、この「www」フォルダーを各開発環境で共有します。





![](/uploads/2014/12/141203-547ed230e1e02.png)






そのためには、再びDropboxを利用します。作成された「www」フォルダーをまるごとDropbox上にコピーします。コピー先はDropbox上であればどこでも構いませんが、私の場合はDropboxに「vccw」というフォルダーを区切ってからコピーしました。コピーが終わったら「www」フォルダーは削除しDropboxへのリンクを作成します。私の場合、ドキュメントフォルダーの下に「VCCW」をインストールしていますので、ターミナルで以下のコマンドを実行します。




    
    $ cd ~/Documents/vccw
    $ ln -s ~/Dropbox/vccw/www .





各開発環境でVCCWをインストール後、作成された「www」フォルダーを削除し、Dropboxへのリンクを作成することにより、WordPressの開発環境を共有することができるようになります。（なお、各開発環境へのVCCWのインストールは必要です）



http://vccw.cc/



## TextExpanderによるブログ執筆作業の効率化





[ブログ執筆時に便利！TextExpanderでSafari、Google ChromeからURL、タイトルを瞬時に取得する方法](/textexpander-safari-googlechrome-730/)でご紹介したように、TextExpanderを使用することで執筆作業を大幅に効率化できます。





![](/uploads/2014/12/141203-547ed23707e07.png)






たとえば、Twitterのリンクを作成する場合、TextExpanderにスニペットとして以下を登録しておけば「.ottan」とタイプするだけでリンクを作成できます。




    
    @おったん</a>





他にもブログでよく使用する定型文やHTMLを設定しておけば、作業効率が格段とアップします。



https://smilesoftware.com/textexpander



## PopClipの拡張機能によるブログ執筆作業の効率化





PopClipは、iOSのようなコンテキストメニューをmacOSで実現する素晴らしいプロダクトですが、単独で使用するにはもったいです。数多くの拡張機能が公式サイトから提供されているため、ぜひ一度は目を通してみることをオススメします。



{{< itunes 445189367 >}}



拡張機能はこちらで配布されています。その気があれば自作することも可能です。



https://pilotmoon.com/popclip/extensions/



拡張機能の中でブログを執筆する上でぜひ導入しておきたいのが、「HTML Encode」です。これは選択した文字列をHTMLエンティティに変換してくれるものです。



![1 fs8](/images/2014/12/141203-547f06296e13d.png)




### 変換前





`<pre>`タグにHTMLのソースコードをそのまま貼り付けてしまうと、意図しない形で表示されてしまいます。`<pre>`タグの中身がそのままHTMLとして認識されてしまっているためです。




    
    OTTAN.XYZ</a>





そこで下図のようにソースコードとして画面上に表示したい文字列を囲み、「&;」マークをクリックすると、必要に応じて文字列がHTMLエンティティに変換されます。



![1 fs8](/images/2014/12/141206-5482bd8bbf745.png)




### 変換後





変換後は以下のようにHTMLのソースコードとして画面上に表示されるようになりました。PopClipを使用することにより、たった1つのステップでHTMLエンティティに変換することができるため、作業が効率的になります。




    
    OTTAN.XYZ</a>





冒頭でも述べたようにPopClipの拡張機能は「HTML Encode」だけではありません。その他にも多数の拡張機能が配布されているのでぜひご覧になってみてください。





## MarsEdit＋AppleScriptの組合わせによるブログ執筆作業の効率化





[MarsEditをより便利に高速に活用するためのスクリプト集](/marsedit-script-619/)でご紹介したように、MarsEditとAppleScriptを組み合わせることによりさまざまな作業を自動化できます。たとえば、目次の自動生成であったり、過去記事参照のためのリンク作成であったりと、手動で行おうとすると面倒なことでも、AppleScriptを使用すれば簡単に作業を自動化できます。





![](/uploads/2014/12/141208-548556b1041cb.png)






ぜひAppleScriptを活用してブログ執筆作業の効率化を行いましょう。





## まとめ





今回は私が実践している手法をいくつかご紹介しました。その他にも便利な方法があれば、ぜひコメント欄または[@おったん](https://twitter.com/ottanxyz)まで教えてくださいね。
