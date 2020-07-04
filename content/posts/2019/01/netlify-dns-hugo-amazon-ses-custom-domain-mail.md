---
author: ["@ottanxyz"]
date: 2019-01-25T23:35:09+09:00
draft: false
title: 'Netlify CMS + Netlify DNS + Hugo + AWS SESで独自ドメインのメール送受信環境を構築'
type: post
slug: netlify-dns-hugo-amazon-ses-custom-domain-mail-20190125
categories: ['Blog']
tags: ['Netlify', 'Hugo', 'AWS', 'SES']
toc: true
---

![](/uploads/2019/01/190125-f3634302e6a7067.jpg)

Go 言語製の静的サイトジェネレータ Hugo で Netlify に構築したホストで、独自ドメインメールによる安価な送受信環境を整備する方法をご紹介します。

ドメインは「お名前.com」等のレジストラですでに取得済み、DNS サービスは「Netlify DNS」を使用することを前提とします。ただし、「Netlify DNS」は記事執筆時点で β 版です。

-   [Managed DNS | Netlify](https://www.netlify.com/docs/dns/)

「Netlify DNS」を使用する利点として、ルートドメインや「www」などのサブドメインに Netlify の爆速 CDN サービスを利用できるようになります。当サイトも、引っ越し当時は「Route 53」を使用していましたが、「Netlify DNS」に切り替えました。

> Netlify offers the option to handle DNS management for you. This enables advanced subdomain automation and deployment features, and ensures that your site uses our CDN for the root domain as well as subdomains like www.

また、「Netlify DNS」に切り替えることで SSL 証明書（Let's Encrypt）を自動更新できます。完全に「Netlify」へとロックインされた状態になってしまいますが、サーバーや DNS の管理から解放されるメリットは大きいです。

## Netlify DNS + AWS SES で独自ドメインの安価なメール送受信環境を構築

Netlify には Web サイトをホスティングする機能はありますが、メールサービスは提供されていません。「Netlify Form」を使用することで既存の静的サイトへ簡易に「お問い合わせフォーム」を設置することはできますが、メーラーソフト等を使用して応答することはできません。

代替手段として、エックスサーバー（XSERVER）等に代表されるレンタルサーバーを借りることで、付随しているメールサービスを利用することもできます。また、冒頭の「お名前.com」等が提供するメールサービスを使用することで、独自ドメインのメール送受信環境を構築することもできます。しかし、メールのためにサーバーのレンタル費用がかかったり、名前解決に「Netlify DNS」が使用できないなどの制約事項があります。

そこで、今回は以下の構成で独自ドメインによるメール送受信環境を構築します。

-   Netlify CMS（ホスト）
-   Netlify DNS（Netlify のマネージド DNS サービス）
-   Hugo（Go 言語製静的サイトジェネレータ）
-   AWS SES（メール送受信サービス）

### AWS SES を使用する利点

AWS SES[^1]は、Amazon Web Services が提供するメール送受信のフルマネージドサービスです。もともと、メール送信サービスのみの提供でしたがメール受信もできるようになりました。

[^1]: Simple Email Service

-   [[新機能]Amazon SES でメール受信が出来るようになりました！ ｜ DevelopersIO](https://dev.classmethod.jp/cloud/receiving-email-with-amazon-ses/)

SES の最大の利点は、従量課金です。

| お客様の利用状況                                                        | お客様の支払い額                                                                        | 追加料金                                                          |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Amazon EC2 でホストされているアプリケーションからの E メール送信        | 月に 62,000 件までは 0 USD。それ以上の E メール送信については 1,000 件ごとに 0.10 USD。 | 添付ファイル 1 GB につき 0.12 USD。EC2 を使用する場合はその料金。 |
| E メールクライアントやその他のソフトウェアパッケージからの E メール送信 | 1,000 件ごとに 0.10 USD。                                                               | 添付ファイル 1 GB につき 0.12 USD。                               |
| E メール受信                                                            | 最初の 1,000 件までは 0 USD。それ以降は 1,000 件ごとに 0.10 USD。                       | 受信メールチャンク[^2] 1,000 件につき 0.09 USD                    |

[^2]: ヘッダー、メール本文 (文字と画像)、添付ファイルを含めた 256 キロバイト (KB) の受信データが受信メールチャンク 1 単位となります。Amazon SES で E メールを受信した場合、受信メールチャンク 1,000 ごとに 0.09 USD の料金が発生します。[料金 - Amazon SES）| AWS](https://aws.amazon.com/jp/ses/pricing/)から引用。

たとえば、1 ヶ月間に 300 通のメールを SES で送信した場合にかかる料金は 0.03USD です。1USD = 110 円程度であることを考慮すると、SES の料金がいかに安いかがわかります。また、受信は毎月 1,000 通までは無料です。

### AWS SES + Netlify DNS によるドメインメールの送信環境構築

SES は米国東部（バージニア北部）、米国西部（オレゴン）、EU（アイルランド）リージョンでのみ利用可能です。今回は、米国東部リージョン（us-east-1）を使用します。

[SES Management Console](https://console.aws.amazon.com/ses/home)へアクセスします。サイドメニューの「Identity Management」から「Domains」をクリックします。続いて、「Verify a New Domain」をクリックします。

![](/uploads/2019/01/190125-92e33392e706e67.png)

以下の項目を入力し、「Verify This Domain」をクリックします。

-   Domain：メールの送受信に使用するドメイン
-   Generate DKIM Settings：チェック有

![](/uploads/2019/01/190125-92e34382e706e67.png)

ドメインが所有者のものであることを確認するために、表示されたレコードをドメインレジストラに登録している DNS サーバに追加する必要があります。今回は、「お名前.com」で取得したドメインを使用します。ネームサーバーには、Netlify DNS サーバーを設定済みであることを前提とします。

![](/uploads/2019/01/190125-92e35352e706e67.png)

#### Netlify DNS の設定（その 1）

[Netlify DNS](https://app.netlify.com/account/dns)へアクセスします。対象のドメインを選択します。「DNS Settings」で、SES へのドメイン登録時に表示されたレコードを登録します。登録する必要のあるレコードは以下の通りです。なお、「CNAME」レコードは、3 レコード登録する必要があります。

| Record type | Name                        | Value                                    | Priority |
| ----------- | --------------------------- | ---------------------------------------- | -------- |
| TXT         | \_amazonses.`<Domain Name>` | 表示された値                             | -        |
| CNAME       | 表示された値                | 表示された値                             | -        |
| MX          | @                           | inbound-smtp.us-east-1.amazonaws.com[^3] | 10       |

[^3]: 使用するリージョンによって異なります。詳細は[リージョンと Amazon SES - Amazon Simple Email Service](https://docs.aws.amazon.com/ja_jp/ses/latest/DeveloperGuide/regions.html#region-endpoints-receiving)を参照。

AWS のコンソールに戻り、「Status」が「verified」になっていることを確認しましょう。

![](/uploads/2019/01/190125-12e34312e706e67.png)

#### 認証済みメールアドレスの登録

SES の初期状態では、あらかじめ承認されたメールアドレス以外に対してメールを送信できません（サンドボックス環境）。今回は、送信確認用にメールアドレスを登録します。実際に受信できるメールアドレスである必要があります。

AWS のコンソールに戻り、「Identity Management」の「Email Addresses」でメールアドレスを登録してください。登録後に、そのメールアドレス宛に確認用メールが送信されます。メール本文内のリンクをクリックして認証してください。

#### SES 制限緩和申請

承認されたメールアドレス以外にメールを送信するには、AWS のサポート宛に申請する必要があります。以下のリンクから、AWS のサポート宛に連絡しましょう（日本語で問題ありませんが、しっかり内容を確認しましょう）。1営業日以内にサポートから返信があり、承諾されれば申請完了です。なお、申請フォーム中の「クォータ」とは 1 日あたりの送信先メールアドレス件数、「レート」とは 1 秒間に送信するメール件数を表しています。

-   [AWS サポートダッシュボード](http://aws.amazon.com/ses/extendedaccessrequest)

#### 送信元を amazonses.com から独自ドメインに変更する

以上で、SES を経由してメールを送信できるようになりました。また、デフォルトで DKIM[^4]に対応しており、SES 経由で送信したメールのヘッダには電子署名が付与されています。現状のままでも十分ですが、より厳密に SES を利用したい場合は、「MAIL FROM domain」を合わせて設定しましょう。

[^4]: DomainKeys Identified Mail の略称。送信者のなりすましや、メール内容の改ざんを防止するための電子署名技術。

メールアドレスの送信者情報には、送信元メールアドレス以外に、メールの送信元ホスト情報が含まれます。SES を経由した場合、送信元メールアドレスは独自ドメインになりますが、送信元ホストは`amazonses.com`となります。送信元メールアドレスのドメインと、送信元ホストが異なる場合、スパムメール扱いされることもあるため、これらを一致させるための追加設定が必要です。

AWS のコンソールで設定したいドメインをクリックします。「MAIL FROM Domain」の「Set MAIL FROM Domain」をクリックします。

![](/uploads/2019/01/190125-72e35302e706e67.png)

以下の項目を入力し、「Set MAIL FROM domain」をクリックします。

-   MAIL FROM domain：任意のサブドメイン名。例）`mail`.example.com
-   Behavior if MX record not found：Reject message

![](/uploads/2019/01/190125-72e34302e706e67.png)

#### Netlify DNS の設定（その 2）

再び、[Netlify DNS](https://app.netlify.com/account/dns)に戻ります。対象のドメインに対して、以下の DNS レコードを追加してください。

| Record type | Name                           | Value                                     | Priority |
| ----------- | ------------------------------ | ----------------------------------------- | -------- |
| MX          | `MAIL FROM domain`で設定した値 | feedback-smtp.us-east-1.amazonses.com[^3] | 10       |
| TXT         | `MAIL FROM domain`で設定した値 | "v=spf1 include:amazonses.com ~all"       | -        |

AWS コンソール上で「MAIL FROM domain status」が「verified」と表示されていれば設定完了です！

### AWS SES によるメール受信環境構築

さて、ここまでで SES によるメール送信環境が整いました。お疲れ様でした！ここからはメール受信の環境構築になりますが、Netlify DNS 範疇外になります。そのため、手前味噌ですが、設定方法の一例については当サイトの別記事に譲りたいと思います。主にメール受信に関する設定についてじっくり解説していますので、参考にしてみてください！

-   [Amazon Lightsail で月 5 ドルから始める WordPress（独自ドメインでのメール送受信）](/posts/2018/08/aws-lightsail-wordpress-domain-mail-6945/)

## まとめ

いかがでしたでしょうか。SES の概念や、DNS に関する知識が求められるため、やや煩雑に感じられたかもしれません。SES は、お手軽に個人でも簡単にはじめられるメール送受信サービスとなっていますので、独自ドメインで運用されている方は、ぜひ活用してみてください。
