---
author: ["@ottanxyz"]
date: 2018-08-12 07:39:15+00:00
draft: false
title: Amazon Lightsailで月5ドルから始めるWordPress（独自ドメインでのメール送受信）
type: post
slug: aws-lightsail-wordpress-domain-mail-6945
categories:
    - Blog
tags:
    - Amazon
    - AWS
    - Blog
---

![](/uploads/2018/08/businessman-2956974_640.jpg)

[こちら](/posts/2018/08/aws-lightsail-wordpress-6908/)
で、AWS の VPS サービスである Amazon Lightsail を使用して、月 5 ドルから始める WordPress についてご紹介しました。国内外の VPS サービスと比較しても、月 5 ドルという価格は魅力的です。個人や商用にしてもそこまでピーク性能が求められないブログであれば十分に実用的な範囲内で、手軽に始められるサービスですので、ぜひこれを機にクラウドサービスを体験してみてください。

今回は、引き続き AWS を使用した WordPress 構築手順の続きです。
たとえば、エックスサーバー（XSERVER）では、ホスティングサービス（VPS）以外に、メールサービスやその他のサービスを提供しています。しかし、AWS Lightsail で提供されるのはあくまで VPS サービスのみです。
別途、EC2[^1]を使用してメールサーバを構築するという手もあります。しかし、月 5 ドルという範囲を大きく超えてしまうため、今回は SES[^2]、S3[^3]、Lambda を使用してメールを送受信できる環境を構築します。

[^1]: Elastic Compute Cloud
[^2]: Simple Email Service
[^3]: Simple Storage Service

一気に AWS で使用するサービスの名前が増えて混乱するかもしれませんが、順を追って設定していくだけ、またはコピー＆ペーストで済ますことのできるものばかりなので、まずは手探りでやっていきましょう。

## Amazon SES でメールを簡単に送受信しよう

まずはじめに、SES は一般のメールサービスとは異なります。
メールサービスといえば、メールクライアントソフトで、POP3 または IMAP、および SMTP プロトコルを使用してメールの送受信を行う場面を思い浮かべます。しかし、SES で提供されるのは、あくまでメール中継サービスのみ。POP3、IMAP プロトコルによる受信については対応していないことに注意が必要です。

そんなサービスをどうやって使用するのか、具体的に解説します。まずは、AWS のマネジメントコンソールにアクセスします。また、SES は、東京リージョンではサービスを提供していませんので、今回は米国東部（バージニア）リージョンを選択しました。

![](/uploads/2018/08/1-fs8.png)

サービス一覧の中から、「Simple Email Service」を選択します。

### Amazon SES で受信したメールを S3 に保存する

![](/uploads/2018/08/2-fs8.png)

まずは、前回設定した独自ドメインを、Amazon SES に設定します。独自ドメインの所有者であることの確認が取れれば、そのドメインに対してメールの送受信を行うことができるようになります。サイドメニューの「Identify Management」から「Domains」を選択します。

![](/uploads/2018/08/3-fs8.png)

「Verify a New Domain」をクリックします。

![](/uploads/2018/08/4-fs8.png)

以下の項目を入力し、「Verify This Domain」をクリックします。

-   Domain：前回 Route 53 に設定したドメイン名
-   Generate DKIM Settings：チェック

「DKIM」とは、「Domainkeys Identified Mail」の略称で、電子署名に関する規格で RFC4871、5672 として標準化されています。とりあえず、電子署名に関するものだということを頭に入れて、次へ進みます。（なお、後述の手順で DKIM を意識して設定する必要のある項目はありません）

![](/uploads/2018/08/5-fs8.png)

通常であれば DNS サービスに、表示されているレコードを手動で登録、管理する必要があるのですが、今回は Route 53 を使用しているので、「Use Route 53」をクリックするだけです。

![](/uploads/2018/08/6-fs8.png)

「Create Record Sets」をクリックします。

![](/uploads/2018/08/7-fs8.png)

5〜10 分程度で、「Vertification Status」が「verified」（検証済み）に変わります。

### Amazon SES でメールを受信した際のルールを作成する

通常、メールを受信した場合、メールクライアントソフトを開いてメールをダウンロードして内容を確認する、という流れを思い浮かべます。しかし、前述のように SES ではそのようなサービスを提供していません。別途、WorkMail というサービスがありますが、月 4 ドルかかってしまうため、料金が約 2 倍に跳ね上がってしまいます（十分安いんですけどね…）。

Amazon SES では、認証済のドメイン（xxx@example.com）に対するメールを受信した場合、そのメールに対してどのような操作を行うのか、ルールを作成できます。ルールは複数設定可能で、上から順番に優先的に処理され、ルールに合致しないメールが届いた場合には受信が拒否されます。

![](/uploads/2018/08/8-fs8.png)

「Email Receiving」から「Rule Sets」をクリックします。続いて、「Create a Receipt Rule」をクリックします。メール受信時の挙動を設定します。

![](/uploads/2018/08/9-fs8.png)

ドメイン、およびサブドメインすべての対するメールに対するルールを設定するために、「ドメイン名」を入力して「Add Recipient」をクリックします。特定のメールアドレスや、サブドメインに対してのみルールを設定したい場合は、その値を入力します。

![](/uploads/2018/08/10-fs8-1.png)

「Action」で、今回は S3（Simple Storage Service）を選択します。S3 ではバケットという単位（フォルダーのようなもの）で管理され、バケット単位にアクセス権限等を設定できますが、今回はとりあえずメールの入れ物としてのバケットを 1 つ用意します。新規にバケットを作成しましょう。既存のバケットを使用することもできますが、SES からのアクセスを許可するなど特別な設定が必要になるため、新規にバケットを作成した方が手順的には楽チンです。

![](/uploads/2018/08/11-fs8-1.png)

以下の項目を入力し、右下の「Next Step」をクリックします。

-   S3 bucket：作成するバケットの名称（半角英数字、または半角ハイフン、S3 全体で一意の名前である必要があります）
-   Object key prefix：空白
-   Encrypt Message：チェック無
-   SNS Topic：`<None>`

![](/uploads/2018/08/12-fs8-1.png)

以下の項目を入力し、右下の「Next Step」をクリックします。

-   Rule name：任意の名称（メール受信を表す名前など）
-   Enabled：チェック有（ルールを有効化）
-   Require TLS：チェック無（受信するメールについて TLS による暗号化を必要としない）
-   Enable spam and virus scanning：チェック有（スパム、迷惑メール対策を実施する）

![](/uploads/2018/08/13-fs8.png)

最後に、「Create Rule」をクリックします。
`xxx@<Domain Name` で受信したメールは、作成した S3 のバケットに保存されます。
S3 に保存されたメールを閲覧したい場合、いったんローカルに保存されたメールをダウンロードします。
拡張子を「.eml」等に変更して、メーラーソフトで開き中身を確認できます。S3 に保存されたことを知るすべがないこと、わざわざ S3 にアクセスしてダウンロードしてくる必要があることを考えると、自動化したほうが良さげです。

### Amazon Lambda を使用して、S3 にメールが保存されたらサーバレスでメールを転送しよう

ここから先、Gmail のように他の受信できるメールアドレスが必要です。流れは、以下の通りです。

1. SES でメール受信
2. ルールに沿って S3 に保存
3. S3 に保存したメールを Lambda で SES の API を使用してメール転送

なんだか難しそうに見えますが、有志によって公開されているライブラリを使用すればとても簡単に設定できます。

![](/uploads/2018/08/17-fs8.png)

SES のメール送信 API を介して AWS 外部にメールを送信する場合は、送信先のメールアドレスが SES で認証済のアドレスでなければなりません。「Identify Management」から「Email Addresses」を選択して、「Verify a New Email Address」をクリックします。受信できるメールアドレスを用意しておきましょう。管理人は Gmail を使用しています。

![](/uploads/2018/08/18-fs8.png)

有効なメールアドレスを入力して「Verify This Email Address」をクリックします。そのメールアドレス宛に AWS からメールが届きます。
メール本文中のリンクをクリックすると、認証済のメールアドレス一覧に表示されます。

### AWS Lambda を使用して SES 経由でメールを外部に転送する

続いて、SES 経由で受信して S3 に保存されたオブジェクト（メール）を、SES の API 経由で外部メールアドレスに転送するための Lambda 関数を作成します。マネジメントコンソールから「Lambda」にアクセスしましょう。なお、注意点として **「Lambda」と「SES」は同一リージョン内で作成**します。「Lambda」のみ東京リージョンに作成してみましたが、米国東部リージョンに作成した SES から保存した S3 バケットに、Lambda からアクセスできませんでした。（設定間違ってるだけかもしれませんが）

![](/uploads/2018/08/19-fs8-1.png)

右上のリージョンが「米国東部リージョン（バージニア北部）」になっていることを確認したら、「関数の作成」ボタンをクリックします。

![](/uploads/2018/08/20-fs8.png)

ここからは、GitHub で公開されている[aws-lambda-ses-forwarder](https://github.com/arithmetric/aws-lambda-ses-forwarder)を使用します。「名前」に「SesForwarder」、「ランタイム」に「Node.js 6.10」「ロール」を「カスタムロールの作成」をクリックします。

![](/uploads/2018/08/21-fs8.png)

「カスタムロールの作成」を選択した時点で、ロールの作成画面に移ります。「IAM ロール」は、「新しい IAM ロールの作成」、「ロール名」は「LambdaSesForwarder」としておきます。続いて、「ポリシードキュメントを表示」をクリックして（表示されていなければ）、「編集」リンクをクリックしましょう。

![](/uploads/2018/08/22-fs8.png)

このような警告が表示されますが、「設定間違えないでね！」という警告ですので、そのまま「OK」をクリックします。そして、先ほどのポリシードキュメに、以下の JSON 形式の設定ファイルをコピー＆ペーストします。

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

「S3-BUCKET-NAME」は、SES の受信ルール作成時に作成した S3 のバケット名に置き換えてください。CloudWatch への書き込み許可と、S3 バケットに対する読み取り、書き込みを許可するロール（権限、役割）をこの Lambda 関数に与えます。「Logs」は、ライブラリが内部でログを出力しているために必要です。

![](/uploads/2018/08/23-fs8.png)

続いて、Lambda の作成画面に戻ります。先ほど作成したロールが選択されていることを確認したら、「関数の作成」をクリックします。

![](/uploads/2018/08/24-fs8.png)

続いて、実際の関数コードを記述します。「コードエントリタイプ」が「コードをインラインで編集」になっていることを確認したら、「index.js」に、[先ほどの GitHub で公開されている index.js](https://raw.githubusercontent.com/arithmetric/aws-lambda-ses-forwarder/master/index.js)の内容をそのまま貼り付けます。

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

貼り付けたコードの冒頭にある上記の箇所を、ご自身の内容に合わせて変更してください。

* DOMAIN NAME：独自ドメイン（@より前も任意の値に変更可能です）
* subjectPrefix：空白
* emailBucket：SES で設定した S3 のバケット名
* emailKeyPrefix：空白（デフォルトで半角スラッシュが入ってますが削除します）
* forwardMapping：転送元アドレス、転送先アドレスのように記述します。

1 つの転送元アドレスに対する転送先アドレスは複数設定可能です。また、転送元アドレスを複数記述することもできます。なお、「DOMAIN NAME」は SES で認証済のドメイン、転送先アドレス（FOWARDING ADDRESS）は SES で認証済のメールアドレスである必要があります。

![](/uploads/2018/08/25-fs8.png)

続いて、Lambda の「基本設定」で「タイムアウト」をデフォルトの「3 秒」から「10 秒」に変更します。最後に、右上の「保存」ボタンをクリックします。

### SES の受信ルールに Lambda を追加しよう

最後に、SES の受信ルールに Lambda を追加しましょう。SES の受信ルールは、順番に実行されるため、S3 バケットに保存 →Lambda の実行とします。それには既存のルールが使用できます。

![](/uploads/2018/08/26-fs8.png)

「Email Receiving」から「Rule Sets」をクリックします。前半部分で作成したルールがすでに作成されていますので、クリックします。

![](/uploads/2018/08/27-fs8.png)

「Add action」から「Lambda」を選択します。

![](/uploads/2018/08/28-fs8.png)

* Lambda function：SesForwarder
* Invocation type：Event
* SNS Topic：`<None>`

とします。

![](/uploads/2018/08/29-fs8.png)

権限が足らないよと怒られるので、「Add permissions」をクリックします（ここで、SES と Lambda のリージョンが異なると、無効な Lambda 関数だと怒られてしまいました）

### テストメールを送信してみよう

さて、以上で SES、および Lambda の設定は完了です。メーラーソフト等を使用して、ドメイン宛にメールを送信してみましょう。うまく動作すれば「転送先アドレス」に設定したメールアドレスへメールが転送されているはずです！

#### 送信制限の緩和申請

SESのデフォルトの状態は、認証済みのメールアドレス宛のみに送信可能なサンドボックス環境です。それ以外のメールアドレス宛にメールを送信するためには、[AWS サポートダッシュボード](http://aws.amazon.com/ses/extendedaccessrequest)からサンドボックスの解除申請が必要です。

### 独自ドメインのメールアドレスを送信元としてメールを送信する

ここまでメール受信はできましたが、では独自ドメインのメールアドレスを送信元としてメールを送信するためにはどうすれば良いのでしょうか。SES では、SMTP サービスを提供しているため、こちらの SMTP サービスを経由してメールアドレスを送信すれば良いでしょう。たとえば、Gmail であれば、[以前ご紹介した記事](/posts/2016/08/phone-gmail-push-inbox-4770/)で、送信元を変更しながらすべて Gmail で管理できます。

![](/uploads/2018/08/14-fs8.png)

なお、Amazon SES の SMTP サービスのホスト名や、認証に使う情報は、SES の「SMTP Settings」から確認できます。

![](/uploads/2018/08/15-fs8.png)

なお、SMTP サービスを使用するためには、SES にアクセス可能な IAM ユーザーを作成する必要があります。「Create My SMTP Credentials」をクリックして、IAM ユーザーを作成します。

![](/uploads/2018/08/16-fs8.png)

「SMTP セキュリティ認証情報を表示」をクリックすると、SMTP サービスの認証に使用するユーザー名、パスワードが表示されます。
