---
author: ["@ottanxyz"]
date: 2014-12-03 08:15:42+00:00
draft: false
title: ブログ執筆時に便利！TextExpanderでSafari、Google ChromeからURL、タイトルを瞬時に取得する方法
type: post
slug: textexpander-safari-googlechrome-730
categories:
- Mac
tags:
- Apps
- Development
---

![](/uploads/2014/12/141203-547ec6b5988dc.png)






ブログ執筆時に文献やウェブサイトを参考にすることが多くあります。その場合、ブログに引用元を掲載したくなります。しかし、わざわざブラウザを開いてタイトルとURLをコピーして記事に貼り付けるのは、やや面倒な作業です。





そこでこれらの作業を簡略化するために、AppleScriptで現在閲覧中のタブのURLとタイトルを取得する方法をご紹介します。ここではTextExpanderと合わせてさらに簡略化していますが、単純にURLとタイトルをクリップボードにコピーすることもできます。





## TextExpanderで現在閲覧中のウェブサイトのURLを取得する





TextExpanderで新しいスニペットを作成します。**「Content」が「アップルスクリプト」となっている**ことを確認してください。また、「Label」は何でも構いませんが、「Abbreviation」はこの後組み合わせて使いますのでわかりやすいネーミングにしておきましょう。ここでは「getTitleFromBrowser」としました。





![](/uploads/2014/12/141203-547ebf76c8c25.png)






### Google Chrome





Google Chromeの場合は、下記の通りとなります。




    
    tell application "Google Chrome"
      set pageURI to get URL of active tab of window 1
    end tell
    return pageURI





「現在のウィンドウからアクティブなタブを取得し、そのURLを取得する」という意味になります。





#### クリップボードにURLをコピーする場合




    
    tell application "Google Chrome"
      set pageURI to get URL of active tab of window 1
      set the clipboard to pageURI
    end tell
    





### Safari





Safariの場合は、下記の通りとなります。Google Chromeと一部異なる点があることに注意が必要です。




    
    tell application "Safari"
      set pageURI to get URL of current tab of window 1
    end tell
    return pageURI





#### クリップボードにURLをコピーする場合



    
    tell application "Safari"
      set pageURI to get URL of current tab of window 1
      set the clipboard to pageURI
    end tell
    





## TextExpanderで現在閲覧中のウェブサイトのタイトルを取得する





再びTextExpanderで新しいスニペットを作成します。その他の注意事項はURLの場合と同様です。「Abbreviation」は「getTitleFromBrowser」としました。





![](/uploads/2014/12/141203-547ebf78c6146.png)






#### Google Chrome





Google Chromeの場合は、下記の通りとなります。




    
    tell application "Google Chrome"
      set pageTitle to get title of active tab of window 1
    end tell
    return pageTitle





「現在のウィンドウからアクティブなタブを取得し、そのタイトルを取得する」という意味になります。





#### クリップボードにタイトルをコピーする場合




    
    tell application "Google Chrome"
      set pageTitle to get title of active tab of window 1
      set the clipboard to pageTitle
    end tell





#### Safari





Safariの場合は、下記の通りとなります。URLの場合と同様に、Google Chromeと一部異なる点があることに注意が必要です。




    
    tell application "Safari"
      set pageTitle to get name of current tab of window 1
    end tell
    return pageTitle





#### クリップボードにタイトルをコピーする場合




    
    tell application "Safari"
      set pageTitle to get name of current tab of window 1
      set the clipboard to pageTitle
    end tell





## 作成したスニペットを利用して現在閲覧中のウェブサイトのタイトルとURLのリンクを貼り付ける





![](/uploads/2014/12/141203-547ebf7ab24f4.png)






ここからは応用編です。今回作成したスニペットを利用して、ブラウザで現在閲覧中のウェブサイトのタイトルとURLのリンクを貼り付ける方法です。TextExpanderで、**スニペットから他のスニペットを使用する場合には「%snippet:<Abbreviation名>%」**として呼び出すことができます。





そこで下記のスニペットを新規登録します。これで現在閲覧中のウェブサイトの<a>タグ付きのリンクを作成できます。




    
    %snippet:getTitleFromBrowser%</a>





## まとめ





今回は、TextExpanderとアップルスクリプトを使用して、ブログの執筆時に便利な、現在閲覧中のウェブサイトをリンクとして貼り付ける方法をご紹介しました。アップルスクリプトではさまざまな情報を取得できます。他にも便利な使い方があれば[@おったん](https://twitter.com/ottanxyz)まで教えてくださいね。
