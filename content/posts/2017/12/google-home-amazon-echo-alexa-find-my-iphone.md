---
author: ottan
date: 2017-12-11 15:19:05+00:00
draft: false
title: 「Google Home」または「Amazon Echo」から「iPhoneを探す」
type: post
slug: google-home-amazon-echo-alexa-find-my-iphone-6443
categories:
- iPhone
tags:
- Amazon Echo
- Google Home
---

 ![](/uploads/2017/12/171211-5a2e926a958a7.jpg)
 photo credit: Norio.NAKAYAMA [Amazon echo](http://www.flickr.com/photos/23713037@N07/37645502645) via [photopin](http://photopin.com) [(license)](https://creativecommons.org/licenses/by-nc-sa/2.0/) 



iPhone、iPad、iPod touchのiOSデバイスに対して、「Google Home」「Amazon Echo」から音声で「iPhoneを探す」を実現する方法をご紹介します。「iPhoneを探す」では、遠隔からデバイスの情報を削除したり、ロックする機能がありますが、同機能は実現できません。今回は、「あれ、iPhone、どこに置いたかな」と家庭内でiPhoneを紛失した場合に備えて、「Google Home」や「Amazon Echo」に対して、音声でお願いして、同デバイスに対して音を鳴らすというものです。



{{< itunes 376101648 >}}



## IFTTTと「Google Assistant」「Amazon Alexa」を連携して音声だけでiPhoneを探す





「Google Home」や「Amazon Alexa」から「iPhoneを探す」ためには、IFTTTを使用します。あらかじめ、探したいデバイスに対して「IFTTT」をインストールしておく必要があります。



{{< itunes 660944635 >}}



### VoIP Calls





IFTTTで数多く紹介されているアプレットとして、「Phone Call (US Only)」というサービスを使用したものがありますが、本サービスは文字通り米国のみで有効、かつ音声通話が可能なデバイスに限ります。そのため、日本では現在このサービスは使用できません。また、iPod Touchなど電話番号を持たないデバイス（iPadのWi-Fiモデルも）では使用することができません。





その代替手段として登場したサービスが「VoIP Calls」と呼ばれるサービスです。このサービスは、IFTTTがインストールされているデバイスに対して、IFTTTアプリから直接そのデバイスに対してCallKitを使用してデバイスに対して着信を行うサービスです（FaceTimeと同様）。そのため、電話番号を持たないデバイスでも使用できます。また、日本でも使用できます。ただし、最新のiOS（おそらくCallKitが実装されたiOS 10以上）、最新のIFTTTアプリが必要です





![](/uploads/2017/12/171211-5a2e9289d694b.jpeg)






IFTTTを起動したら、「Search」タブをタップします。





![](/uploads/2017/12/171211-5a2e92a30f322.jpeg)






検索ボックスにキーワード（たとえば、「VoIP」）と入力して「VoIP Calls」サービスを探します。





![](/uploads/2017/12/171211-5a2e92ad69505.jpeg)






「VoIP Calls」サービスを使用するためには、アプリから「VoIP Calls」の起動を許可しておく必要があります。「VoIP Calls」のサービス画面において、「Connect」ボタンをタップし、接続完了です。電話番号を必要としないため、とくにSMSや音声通話等によるPINコードの入力等はありません。





### Google Assistant





「Google Home」からiPhoneを探すためには、「Google Assistant」を有効化します。





![](/uploads/2017/12/171211-5a2e92cc0ba8b.jpeg)






先ほどと同様の手順で「Google Assistant」を探します（検索キーワードに「Google Assistant」と入力してください）。続いて、「Google Assistant」のサービス画面において、「Connect」をタップします。Safariが起動し、Googleアカウントによる認証画面が開きますので、**Google HomeにサインインしているGoogleアカウントと同一のアカウントでサインイン**して、IFTTTとの連携を許可しておきます。





### Amazon Alexa





「Amazon Echo」からiPhoneを探すためには、「Amazon Alexa」を有効化します。





![](/uploads/2017/12/171211-5a2e92b87aaed.jpeg)






先ほどと同様の手順で「Amazon Alexa」を探します（検索キーワードに「Alexa」と入力してください。「Echo」ではヒットしませんので注意してください）。続いて、「Amazon Alexa」のサービス画面において、「Connect」をタップします。Safariが起動し、Amazonアカウントによる認証画面が開きますので、**「Amazon EchoにサインインしているAmazonアカウントと同一のアカウントでサインイン**して、IFTTTとの連携を許可しておきます。





## Google HomeからiPhoneを探す





では、実際にIFTTTでGoogle HomeからiPhoneを探すアプレットを作成します。「My Applets」タブから新規作成します。





![](/uploads/2017/12/171211-5a2e92da391cc.jpeg)






まず、連携元となるトリガーを作成します。今回の場合、「Google Home」（IFTTTでは、Google Assistant）がthis（トリガー／契機）となり、「VoIP Calls」がthat（アクション）です。「this」をタップします。





![](/uploads/2017/12/171211-5a2e92e72bba7.png)






検索ボックスにキーワード（たとえば、「Google Assistant」）を入力して、トリガーとなるサービスを検索します。





![](/uploads/2017/12/171211-5a2e92f084dd7.png)






今回の目的はGoogle HomeにiPhoneを見つけてもらうだけなので、「Say a simple phrase」を選択します（特定のキーワードに対してGoogle Homeが反応する）。





![](/uploads/2017/12/171211-5a2e93026202c.png)






さまざまな入力項目がありますが、必須の項目は「What do you want to say?」と「What do you want the Assistant to say in response?」のみです。「What do you want to say?」に「iPhone 探して」と入力します。ポイントは、記事執筆時点ではGoogle Homeの日本語の助詞（てにをは）の認識能力がやや精度に欠けるため、「iPhoneを探して」ではなく「iPhone 探して」のように**単語を組み合わせて入力すること**です。筆者は「iPhone 探して」と単語と単語の間に半角スペースを使用しました。





「What do you want the Assistant to say in response?」は、Google Homeに対して呼びかけた時に対する、Google Homeからの応答の文字列です。ここは日本語をそのまま入力して問題ありません（漢字の読み間違えはあるかもしれないので、魑魅魍魎など複雑な単語は使用しないほうが良いでしょう…）。また、**「Language」は「日本語」を選択します**。





その他の入力項目はオプションです。「iPhone 探して」のみならず「iPhone どこ」「iPhone 見つけて」のように別のキーワードを、合計3つまで登録できます。





![](/uploads/2017/12/171211-5a2e930b2cd0c.png)






続いて、that（アクション）を作成します。





![](/uploads/2017/12/171211-5a2e931af1e25.png)






検索ボックスにキーワード（たとえば、「VoIP」）を入力して、トリガーとなるサービスを検索します。「VoIP Calls」サービスで実行できるアクションは記事執筆時点では「Call my device」（着信）のみです。





![](/uploads/2017/12/171211-5a2e9c608d54f.png)






iOSデバイスで応答した際に流れる音声メッセージを入力します。説明は英語ですが、日本語文字列でも構いません。流暢な日本語で応答してくれます。空白にはできない（無言電話も怖い）ため、任意の文字列を入力します。





![](/uploads/2017/12/171211-5a2e932611108.png)






最後に「Finish」をタップしてアプレットの作成完了です。





### Google HomeからiPhoneを呼び出す





Google Homeに対して、「ねえ、Google。iPhone探して」（「iPhone探して」は、あらかじめ登録したキーワード）と呼びかけます。





![](/uploads/2017/12/171211-5a2e9330802e7.png)






すると、IFTTTをインストールしているデバイス上で上記のようにIFTTTからの自動着信があります。応答すると、先ほど「VoIP Calls」のメッセージに設定した日本語が流暢に流れます（もちろん、英語も）。





## Amazon EchoからiPhoneを探す





Amazon Echoの場合も、手順はほぼ同様です。





![](/uploads/2017/12/171211-5a2e933a43aa0.png)






this（トリガー／契機）で「Amazon Alexa」サービスを選択します。Google Homeの場合と同様に、今回の目的はGoogle HomeにiPhoneを見つけてもらうだけなので、「Say a specific phrase」（特定のキーワードに対してAmazon Echoが反応する）を選択します。





![](/uploads/2017/12/171211-5a2e934f7f0e9.png)






Amazon Alexaの場合は、Google Homeと比べて単純です。キーワードを入力するのみです。「Use lower-case characters only」とありますが、日本語を入力することもできます。ただし、Google Homeと同様に、記事執筆時点では日本語の助詞（てにをは）の認識能力がやや精度に欠けるため、「iphoneを探して」ではなく「iphone 探して」のように**単語を組み合わせて入力すること**です。さらに注意したいことは、「Use lower-case characters only」とあるため「iPhone」など大文字（今回の場合は「P」）は使用できません。すべて小文字で入力します。日本語も認識しやすい単語が良いでしょう。今回は「iphone 探して」としました。





![](/uploads/2017/12/171211-5a2e93585e9d0.png)






VoIP Callsの手順は、Google Homeと同様のため割愛します。





### Amazon EchoからiPhoneを呼び出す





Amazon Echoに対して、「アレクサ、iPhone探して、トリガー」（「iPhone探して」は、あらかじめ登録したキーワード）と呼びかけます（「トリガー」を最後に持ってくると認識精度が上がります）。Google Homeではトリガーというキーワードは必要ありませんでしたが、Amazon Echoではこれが「IFTTT」の呼び出しであることを認識させるために「トリガー」というキーワードを入れる必要があります。「アレクサ、トリガー、iPhone探して」でも良いのですが、「トリガー」というキーワードを後にした方が認識しやすいようです。日本語としては少し辿々しいですが、Amazon Echo（Alexa）の仕様ですので従うほかありません。なお、ウェイクワードを変更している場合は、「アレクサ」ではなくそのキーワードで呼びかけてください。





![](/uploads/2017/12/171211-5a2e9330802e7.png)






## まとめ





IFTTTという外部サービスを使用することで、「Google Home」「Amazon Echo」から擬似「iPhoneを探す」を実現することができました。また、「iPhoneを探す」と同様に「iPod Touch」などのデバイスでも利用できるところが便利です。最大の問題は、着信機能を使用するため**「マナーモードにしているとサウンドが再生されない（端末の設定による）。バイブレーションだけ」**という事でしょうか…。これは、FaceTimeや他のVoIPサービスでも同様であり、iOSの仕様上、致し方がないところではあります。





擬似「iPhoneを探す」と記述したのは、純正の「iPhoneを探す」が、マナーモードの設定有無にかかわらず強制的にアラーム音を出す、遠隔から端末のロックができる、遠隔から端末のデータを削除できる、など優秀な機能を備えているからです。





ただ、音声だけでiPhoneを簡易的に探すのは便利！キーワードを変更して、IFTTTアプリを複数のデバイスにインストールしておけば、家族のiPhoneを判別して探すこともできそうですね。



{{< itunes 376101648 >}}
{{< itunes 660944635 >}}
{{< itunes 680819774 >}}
{{< itunes 944011620 >}}
