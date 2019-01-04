---
author: ottan
date: 2018-08-12 07:39:15+00:00
draft: false
title: Amazon Lightsailで月5ドルから始めるWordPress（独自ドメインでのメール送受信）
type: post
url: /aws-lightsail-wordpress-domain-mail-6945/
categories:
- Blog
tags:
- Amazon
- AWS
- WordPress
---

![](/images/2018/08/businessman-2956974_640.jpg)






[Amazon Lightsailで月5ドルから始めるWordPress（下準備〜HTTPS化編）](/aws-lightsail-wordpress-6908/)
で、AWSのVPSサービスであるAmazon Lightsailを使用して、月5ドルから始めるWordPressについてご紹介しました。国内外のVPSサービスと比較しても、月5ドルという価格は魅力的です。個人や商用にしてもそこまでピーク性能が求められないブログであれば十分に実用的な範囲内で、手軽に始められるサービスですので、ぜひこれを機にクラウドサービスを体験してみてください。





今回は、引き続きAWSを使用したWordPress構築手順の続きです。たとえば、エックスサーバー（XSERVER）では、ホスティングサービス（VPS）以外に、メールサービスやその他のサービスを提供していますが、AWS Lightsailで提供されるのはあくまでVPS（Virtual Private Server）サービスのみです。別途、EC2（Elastic Compute Cloud）を使用してメールサーバを構築するという手もあるのですが、月5ドルという範囲を大きく超えてしまうため、今回はSES（Simple Email Service）、S3（Simple Storage Service）、Lamdaを使用してメールを送受信できる環境を構築します。





一気にAWSで使用するサービスの名前が増えて混乱するかもしれませんが、順を追って設定していくだけ、またはコピー＆ペーストで済ますことのできるものばかりなので、まずは手探りでやっていきましょう。





## Amazon SESでメールを簡単に送受信しよう





まずはじめに、Amazon SESは一般のメールサービスとは異なります。メールサービスといえば、メールクライアントソフトで、POP3またはIMAP、およびSMTPプロトコルを使用してメールの送受信を行う場面を思い浮かべますが、Amazon SESで提供されるのは、あくまでメール中継サービスのみ。POP3、IMAPプロトコルによる受信については対応していないことに注意が必要です。





そんなサービスをどうやって使用するのか、具体的に解説します。まずは、AWSのマネジメントコンソールにアクセスします。また、SESは、東京リージョンではサービスを提供していませんので、今回は米国東部（バージニア）リージョンを選択しました。





![](/images/2018/08/1-fs8.png)






サービス一覧の中から、「Simple Email Service」を選択します。





### Amazon SESで受信したメールをS3に保存する





![](/images/2018/08/2-fs8.png)






まずは、前回設定した独自ドメインを、Amazon SESに設定します。独自ドメインの所有者であることの確認が取れれば、そのドメインに対してメールの送受信を行うことができるようになります。サイドメニューの「Identify Management」から「Domains」を選択します。





![](/images/2018/08/3-fs8.png)






「Verify a New Domain」をクリックします。





![](/images/2018/08/4-fs8.png)






「Domain」に前回Route 53に設定したドメイン名、「Generate DKIM Settings」をチェックし、「Verify This Domain」をクリックします。「DKIM」とは、「Domainkeys Identified Mail」の略称で、電子署名に関する規格でRFC4871、5672として標準化されています。とりあえず、電子署名に関するものだということを頭に入れて、次へ進みます。（なお、後述の手順でDKIMを意識して設定する必要のある項目はありません）





![](/images/2018/08/5-fs8.png)






通常であればDNSサービスに、表示されているレコードを手動で登録、管理する必要があるのですが、今回はRoute 53を使用しているので、「Use Route 53」をクリックするだけです。





![](/images/2018/08/6-fs8.png)






「Create Record Sets」をクリックします。





![](/images/2018/08/7-fs8.png)






5〜10分程度で、「Vertification Status」が「verified」（検証済み）に変わります。





### Amazon SESでメールを受信した際のルールを作成する





通常、メールを受信した場合、メールクライアントソフトを開いてメールをダウンロードして内容を確認する、という流れになると思いますが、前述のようにAmazon SESではそのようなサービスを提供していません。別途、WorkMailというサービスがありますが、月4ドルかかってしまうため、料金が約2倍に跳ね上がってしまいます（十分安いんですけどね…）。





Amazon SESでは、認証済のドメイン（xxx@example.com）に対するメールを受信した場合、そのメールに対してどのような操作を行うのか、ルールを作成できます。ルールは複数設定可能で、上から順番に優先的に処理され、ルールに合致しないメールが届いた場合には受信が拒否されます。





![](/images/2018/08/8-fs8.png)






「Email Receiving」から「Rule Sets」をクリックします。続いて、「Create a Receipt Rule」をクリックします。メール受信時の挙動を設定します。





![](/images/2018/08/9-fs8.png)






ドメイン、およびサブドメインすべてに対するメールに対するルールを設定するために、「ドメイン名」を入力して「Add Recipient」をクリックします。特定のメールアドレスや、サブドメインに対してのみルールを設定したい場合は、その値を入力します。





![](/images/2018/08/10-fs8-1.png)






「Action」で、今回はS3（Simple Storage Service）を選択します。S3ではバケットという単位（フォルダーのようなもの）で管理され、バケット単位にアクセス権限等を設定できますが、今回はとりあえずメールの入れ物としてのバケットを1つ用意します。新規にバケットを作成しましょう。既存のバケットを使用することもできますが、SESからのアクセスを許可するなど特別な設定が必要になるため、新規にバケットを作成した方が手順的には楽チンです。





![](/images/2018/08/11-fs8-1.png)






「S3 bucket」に作成するバケットの名称（半角英数字、または半角ハイフン、S3全体で一意の名前である必要有）、「Object key prefix」は空白、「Encrypt Message」はチェックなし、「SNS Topic」は「<None>」を選択し右下の「Next Step」をクリックします。





![](/images/2018/08/12-fs8-1.png)






「Rule name」はわかりやすい名前（メール受信を表す名前等）、「Enabled」はチェック有（ルールを有効化）、「Require TLS」はチェック無（受信するメールについてTLSによる暗号化を必要としない）、「Enable spam and virus scanning」はチェック有（スパム、迷惑メール対策を実施する）で、右下の「Next Step」をクリックします。





![](/images/2018/08/13-fs8.png)






最後に、「Create Rule」をクリックします。これで、「xxx@<Domain Name>」で受信したメールは、すべて作成したS3のバケットに保存されるようになります。S3に保存されたメールを閲覧したい場合は、いったんローカルに保存されたメールをダウンロードして、拡張子を「.eml」等に変更して、メーラーソフトで開くことで中身を確認することもできますが、S3に保存されたことを知るすべがないこと、わざわざS3にアクセスしてダウンロードしてくる必要があることを考えると、自動化したほうが良さげです。





### Amazon Lamdaを使用して、S3にメールが保存されたらサーバレスでメールを転送しよう





ここから先、Gmailのように他の受信できるメールアドレスが必要です。流れとしては、






  1. Amazon SESでメール受信
  2. ルールに沿ってS3に保存
  3. S3に保存したメールをLamdaでSESのAPIを使用してメール転送




なんだか難しそうに見えますが、すでに公開されているライブラリを使用すればとても簡単に設定することが可能です。





![](/images/2018/08/17-fs8.png)






SESのメール送信APIを介してAWS外部にメールを送信する場合は、送信先のメールアドレスがSESで認証済のアドレスでなければなりません。「Identify Management」から「Email Addresses」を選択して、「Verify a New Email Address」をクリックします。受信できるメールアドレスを用意しておきましょう。管理人はGmailを使用しています。





![](/images/2018/08/18-fs8.png)






有効なメールアドレスを入力して「Verify This Email Address」をクリックすると、そのメールアドレス宛にAWSからメールが届きますので、中身のリンクをクリックすると、認証済のメールアドレス一覧に表示されるようになります。これで準備はOKです。





### AWS Lamdaを使用してSES経由でメールを外部に転送する





続いて、SES経由で受信してS3に保存されたオブジェクト（メール）を、SESのAPI経由で外部メールアドレスに転送するためのLamda関数を作成します。マネジメントコンソールから「Lamda」にアクセスしましょう。なお、注意点として **「Lamda」と「SES」は同一リージョン内で作成**します。「Lamda」のみ東京リージョンに作成してみましたが、米国東部リージョンに作成したSESから保存したS3バケットに、Lamdaからアクセスできませんでした。（設定間違ってるだけかもしれませんが）





![](/images/2018/08/19-fs8-1.png)






右上のリージョンが「米国東部リージョン（バージニア北部）」になっていることを確認したら、「関数の作成」ボタンをクリックします。





![](/images/2018/08/20-fs8.png)






ここからは、GitHubで公開されている[GitHub - arithmetric/aws-lambda-ses-forwarder: Serverless email forwarding using AWS Lambda and SES](https://github.com/arithmetric/aws-lambda-ses-forwarder)のライブラリを使用させてもらいます。「名前」に「SesForwarder」、「ランタイム」に「Node.js 6.10」「ロール」を「カスタムロールの作成」をクリックします。





![](/images/2018/08/21-fs8.png)






「カスタムロールの作成」を選択した時点で、ロールの作成画面に移ります。「IAMロール」は、「新しいIAMロールの作成」、「ロール名」は「LambdaSesForwarder」としておきます。続いて、「ポリシードキュメントを表示」をクリックして（表示されていなければ）、「編集」リンクをクリックしましょう。





![](/images/2018/08/22-fs8.png)






このような警告が表示されますが、「設定間違えないでね！」という警告ですので、そのまま「OK」をクリックします。そして、先ほどのポリシードキュメに、以下のJSON形式の設定ファイルをコピー＆ペーストします。




    
    {
       "Version": "2012-10-17",
       "Statement": [
          {
             "Effect": "Allow",
             "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
             ],
             "Resource": "arn:aws:logs:*:*:*"
          },
          {
             "Effect": "Allow",
             "Action": "ses:SendRawEmail",
             "Resource": "*"
          },
          {
             "Effect": "Allow",
             "Action": [
                "s3:GetObject",
                "s3:PutObject"
             ],
             "Resource": "arn:aws:s3:::S3-BUCKET-NAME/*"
          }
       ]
    }





「S3-BUCKET-NAME」は、SESの受信ルール作成時に作成したS3のバケット名に置き換えてください。CloudWathへの書き込み許可と、S3バケットに対する読み取り、書き込みを許可するロール（権限、役割）をこのLamda関数に与えることになります。「Logs」は、ライブラリが内部でログを出力しているために必要です。





![](/images/2018/08/23-fs8.png)






続いて、Lamdaの作成画面に戻ります。先ほど作成したロールが選択されていることを確認したら、「関数の作成」をクリックします。





![](/images/2018/08/24-fs8.png)






続いて、実際の関数コードを記述します。「コードエントリタイプ」が「コードをインラインで編集」になっていることを確認したら、「index.js」に、[先ほどのGitHubで公開されているindex.js](https://raw.githubusercontent.com/arithmetric/aws-lambda-ses-forwarder/master/index.js)の内容をそのまま貼り付けます。




    
    var defaultConfig = {
      fromEmail: "noreply@<DOMAIN NAME>",
      subjectPrefix: "",
      emailBucket: "S3-BUCKET-NAME",
      emailKeyPrefix: "",
      forwardMapping: {
        "@<DOMAIN NAME>": [
          "<FOWARDING ADDRESS>"
        ]
      }
    };





貼り付けたコードの冒頭にある上記の箇所を、ご自身の内容に合わせて変更してください。「DOMAIN NAME」は独自ドメイン（@より前も任意の値に変更可能です）、「subjectPrefix」は空白、「emailBucket」は、SESで設定したS3のバケット名、「emailKeyPrefix」は空白（デフォルトで半角スラッシュが入ってますが削除します）、「forwardMapping」に転送元アドレス、転送先アドレスのように記述します。1つの転送元アドレスに対する転送先アドレスは複数設定可能です。また、転送元アドレスを複数記述することもできます。なお、「DOMAIN NAME」はSESで認証済のドメイン、転送先アドレス（FOWARDING ADDRESS）はSESで認証済のメールアドレスである必要があります。





![](/images/2018/08/25-fs8.png)






続いて、Lamdaの「基本設定」で「タイムアウト」をデフォルトの「3秒」から「10秒」に変更します。最後に、右上の「保存」ボタンをクリックします。





### SESの受信ルールにLamdaを追加しよう





最後に、SESの受信ルールにLamdaを追加しましょう。SESの受信ルールは、順番に実行されるため、S3バケットに保存→Lamdaの実行とします。それには既存のルールが使用できます。





![](/images/2018/08/26-fs8.png)






「Email Receiving」から「Rule Sets」をクリックします。前半部分で作成したルールがすでに作成されていますので、クリックします。





![](/images/2018/08/27-fs8.png)






「Add action」から「Lamda」を選択します。





![](/images/2018/08/28-fs8.png)






「Lamda function」に先ほど作成したLamda関数（SesForwarder）、「Invocation type」を「Event」、「SNS Topic」を「<None>」にして保存します。





![](/images/2018/08/29-fs8.png)






権限が足らないよと怒られるので、「Add permissions」をクリックします（ここで、SESとLamdaのリージョンが異なると、無効なLamda関数だと怒られてしまいました）





### テストメールを送信してみよう





さて、以上でSES、およびLamdaの設定は完了です。実際にメールクライアントソフト等を使用して、ドメイン宛にメールを送信してみましょう。うまく動作すれば「転送先アドレス」に設定したメールアドレスにメールが転送されているはずです！





### 独自ドメインのメールアドレスを送信元としてメールを送信する





ここまでメール受信はできましたが、では独自ドメインのメールアドレスを送信元としてメールを送信するためにはどうすれば良いのでしょうか。Amazon SESでは、SMTPサービスを提供しているため、こちらのSMTPサービスを経由してメールアドレスを送信すれば良いでしょう。たとえば、Gmailであれば、[iPhoneでGmailをプッシュ通知！すべてのメールアドレスをGmailに転送し、Gmailからすべて送受信する方法](http://ottan.xyz/phone-gmail-push-inbox-4770/)で、送信元を変更しながらすべてGmailで管理できます。





![](/images/2018/08/14-fs8.png)






なお、Amazon SESのSMTPサービスのホスト名や、認証に使う情報は、SESの「SMTP Settings」から確認できます。





![](/images/2018/08/15-fs8.png)






なお、SMTPサービスを使用するためには、SESにアクセス可能なIAMユーザーを作成する必要があります。「Create My SMTP Credentials」をクリックして、IAMユーザーを作成します。





![](/images/2018/08/16-fs8.png)






「SMTPセキュリティ認証情報を表示」をクリックすると、SMTPサービスの認証に使用するユーザー名、パスワードが表示されます。
