---
author: ottan
date: 2018-08-05 04:08:13+00:00
draft: false
title: Amazon Lightsailで月5ドルから始めるWordPress（下準備〜HTTPS化編）
type: post
url: /aws-lightsail-wordpress-6908/
categories:
- Blog
tags:
- Amazon
- AWS
- WordPress
---

![](/images/2018/08/wordpress-265132_640.jpg)






弊サイトは、レンタルサーバーであるエックスサーバー（XSERVER）で運用していました。長期契約（最大36か月）を結ぶと、月々わずか約1,000円から始められ、ホームページの運用に必要な各種機能（独自ドメイン、SSL、メールサービス、データベース等）がすべて揃う素晴らしいレンタルサーバーです。また、レスポンスも良好、すべてが高速と素晴らしいのですが、ふとWordPressのブログのためにここまで高機能なサーバーが必要なのかどうかという疑問が湧きまして、ちょっとした思いつきと自分の勉強も兼ねて、[Lightsail](https://aws.amazon.com/jp/lightsail/)にWordPressを移行してみることにしました。





AWS Lightsailは月5ドルから簡単に始められるホスティングサービスです。スペックは以下の通りです。月5ドルということでリソースはかなり限られていると思いますが、最新世代のCPU、RAM、そして高速なSSDが5ドルから使用できる、魅力的ではないでしょうか？画像ファイル等が大量になると、20GBの容量で足りるのかという疑問はありますが、弊サイトも4年程度運用していますが、使用している容量は5GBほどです。






  * 512MB RAM
  * 1 vCPU
  * 20GB SSD
  * 1TB Transfer




というわけで、今回はAWS Lightsailのインスタンスの構築から独自ドメインの設定、SSL化までを行ってみます。独自ドメインは別途取得している（例：お名前.com等）ことを前提とします。





## AWS Lightsailで気楽に始めるWordPress





AWS（Amazon Web Services）のアカウントは事前に準備しておきましょう。AWSの決済にはクレジットカードが必須です。クレジットカードが使用できない場合は、AWSを使用することはできません。（エックスサーバーは、クレジットカード決済以外の方法にも対応しています）





### AWS Lightsailのインスタンスを構築しよう





では、AWS Lightsailで仮想インスタンスを構築してみましょう。





![](/images/2018/08/01-fs8.png)






AWSのマネジメントコンソールにログインしたら、サービス一覧から「Lightsail」を選択します。





![](/images/2018/08/02-fs8.png)






AWS Lightsailで「インスタンス」タブを選択し、「インスタンスの作成」をクリックします。





![](/images/2018/08/03-fs8.png)






インスタンスロケーションは、「ap-northeast」（東京リージョン）を選択します。プラットフォームは、「Linux」、アプリケーションは「WordPress」、インスタンスプランは「$5」を選択して、「作成」をクリックします。





![](/images/2018/08/04-fs8.png)






最初のインスタンス構築の準備のみ多少時間を要しますが、5分以内には完了することでしょう。





![](/images/2018/08/05-fs8.png)






たった、これだけの手順でWordPressで運用できる準備が整ってしまいました。





### 固定グローバルIPアドレスの割り当て





AWS Lightsailのインスタンスには、グローバルIPアドレスを1つまで無料で割り当てることができます。しかし、デフォルトではインスタンスを再起動するたびにIPアドレスが変更されてしまうため、静的なIPアドレスを割り当てる必要があります。





![](/images/2018/08/06-fs8.png)






「ネットワーキング」タブをクリックし、「静的IPの作成」をクリックします。





![](/images/2018/08/07-fs8.png)






「静的IPロケーション」は、インスタンスと同様のリージョン（ap-northeast-xx）を選択します。割り当てるインスタンスを選択し、「作成」をクリックします。





![](/images/2018/08/08-fs8.png)






たった、これだけの手順でグローバルIPアドレスの割り当てに成功しました。





### WordPressのトップページにアクセスしてみよう





では、続いてWordPressのトップページにアクセスしてみます。前述の例では、「http://52.194.5.10」になります。IPアドレスは、割り当てた静的IPアドレスに変更してください。





![](/images/2018/08/09.jpg)






このような画面が表示されれば成功です。





### WordPressのダッシュボードにアクセスしよう





WordPressといえば、多機能な管理者用のダッシュボードが特徴です。では、ブラウザからダッシュボードにアクセスしてみましょう。と、ここで疑問がはじめて生まれます。これまでの手順の中で、WordPressが簡単に構築できることはわかりましたが、ダッシュボードにアクセスするためのユーザーについては情報がありません。ダッシュボードにアクセスするためのユーザーのパスワードについては、作成したインスタンスのホームディレクトリに含まれています。





![](/images/2018/08/10-fs8.png)






というわけで、作成したインスタンスに対してSSHで接続し、ホームディレクトリを参照する必要があります。作成したインスタンスをクリックして、「管理」をクリックします。





![](/images/2018/08/12-fs8.png)






Lightsailのインスタンスに接続する方法としては、ブラウザ（コンソール）から接続する方法と、公開鍵認証方式でローカルのターミナル等からアクセスする方法がありますが、ここでは後者の方法でアクセスします。アクセスするためのユーザー名、IPアドレスは上記の画面で確認できます。アクセスするための秘密鍵を入手する必要がありますが、上記の「アカウントページ」と書かれたリンクからダウンロードできます。





![](/images/2018/08/11-fs8.png)






公開鍵認証で使用する公開鍵、秘密鍵は自分で作成したものを使用することもできますし、デフォルトで用意されている秘密鍵をダウンロードして使用することもできます。今回はデフォルトで用意されている鍵を使用します。「デフォルト」と書かれた横の「ダウンロード」をクリックします。秘密鍵がダウンロードされます。秘密鍵は漏洩しないように、また第三者と共有することがないようにしっかり管理しておく必要があります。




    
    ssh -i <Private Key Path>.pem bitnami@<Public IP>





ターミナルから上記のコマンドを実行します。




    
    Welcome to Ubuntu 16.04.5 LTS (GNU/Linux 4.4.0-1060-aws x86_64)
    *** System restart required ***
           ___ _ _                   _
          | _ |_) |_ _ _  __ _ _ __ (_)
          | _ \ |  _| ' \/ _` | '  \| |
          |___/_|\__|_|_|\__,_|_|_|_|_|
    
      *** Welcome to the Bitnami WordPress 4.9.6-0 ***
      *** Documentation:  https://docs.bitnami.com/aws/apps/wordpress/ ***
      ***                 https://docs.bitnami.com/aws/ ***
      *** Bitnami Forums: https://community.bitnami.com/ ***





正常にログインできると上記の画面が表示されます。ホームディレクトリ上に「bitnami_application_password」というテキストファイルがあります。こちらのファイルの中にダッシュボードにアクセスするためのユーザーの初期パスワード情報が書かれています。なお、初期ユーザーのユーザー名は「user」です。これでダッシュボードにもアクセスできるはずです！





もしログインできない場合は、ダウンロードした秘密鍵のパーミッションが誤っている可能性があります。




    
    chmod 600 <Private Key Path>





で、パーミッションを変更しておきましょう。





なお、デフォルトのWordPressのトップページにアクセスすると、右下に「Manage」というアイコンが表示されると思いますが、一般のユーザー（読者）には不要な情報ですので、この段階で無効化しておきましょう。




    
    sudo /opt/bitnami/apps/wordpress/bnconfig --disable_banner 1
    sudo /opt/bitnami/ctlscript.sh restart apache





### 独自ドメインを設定しよう





DNSサービスは、AWSの[Route 53](https://console.aws.amazon.com/route53/home?region=ap-northeast-1)を使用します。なお、今回はすでに他のドメイン取得サービス等でドメインを取得していることを前提としますが、Route 53でドメインを新規に取得することもできます。その場合、すべての設定をAWSに任せることができるので簡単です。





![](/images/2018/08/a22af19ec64e538cd78c43f963ba63b1.png)






マネジメントコンソールから「Route 53」にアクセスします。





![](/images/2018/08/5d468fb112acf6f8ef420c42981166a7.png)






「Create Hosted Zone」をクリックします。はじめてRoute 53にアクセスした場合、上記の画面は表示されないかもしれません。「Create Hosted Zone」と書かれたボタンを見つけてクリックしてください。





![](/images/2018/08/1d15d674ee3caf5e935cc72f9ef30688.png)






「Domain Name」にあらかじめ取得したドメイン名、「Comment」は任意、「Type」は「Public Hosted Zone」を選択し、作成します。





![](/images/2018/08/f716fda35394d83edab5ae388cffbd6c.png)






表示されるNSレコードがネームサーバーになります。ドメイン取得元のサービスでネームサーバーを上記のネームサーバーに変更してください。ドメイン取得元によっては、設定できるネームサーバーの数が異なりますが、最低でも2つのネームサーバーは設定しておくようにします。こちらの手順は、取得元のドメインサービスで手順が異なりますので割愛します。





![](/images/2018/08/3d8a4c25667f70ab86548eb5d98e49c2.png)






続いて、「Create Record Set」と書かれた青いボタンをクリックします。





![](/images/2018/08/5a38f66d97ff431520f56233edc2fdc8.png)






「Name」は空白、「Type」は「A - IPv4 address」、「Value」にLightsailで割り当てたグローバルIPアドレスを設定します。





![](/images/2018/08/69fbb90b9e0fa1580428350b4301ae1b.png)






続いて、「www.ottan.xyz」と「ottan.xyz」の両方でアクセスを可能にするために、「CNAME」レコードを作成します。「Create Record Set」ボタンをクリックします。「Name」に「www」、「Type」に「CNAME - Canonical name」、「Value」に事前に取得したドメイン名を設定します。





以上で、独自ドメインの設定は完了です！





### WordPressをHTTPS化しよう





Let's EncryptでSSL証明書（ドメイン認証）を取得します。具体的な手順は下記の通りです。まずは、ターミナルからインスタンスにアクセスします。そして、「Git」コマンドをインストールします。




    
    sudo apt-get install git





もし、インストールできない場合は、事前にリポジトリの最新化、パッケージの最新化を行っておきます。




    
    sudo apt-get update
    sudo apt-get upgrade





続いて、GitHubからLet's Encryptの設定に必要なスクリプトをダウンロードし、SSLサーバ証明書を作成します。ターミナルから以下のコマンドを実行します。




    
    git clone https://github.com/letsencrypt/letsencrypt
    cd letsencrypt
    ./letsencrypt-auto
    ./letsencrypt-auto certonly --webroot -w /opt/bitnami/apps/wordpress/htdocs/ -d <Domain Name>
    sudo cp /etc/letsencrypt/live/<Domain Name>/fullchain.pem /opt/bitnami/apache2/conf/server.crt
    sudo cp /etc/letsencrypt/live/<Domain Name>/privkey.pem /opt/bitnami/apache2/conf/server.key
    sudo /opt/bitnami/ctlscript.sh restart apache





以上で、SSLサーバ証明書の設定は完了です。簡単ですね！





![](/images/2018/08/6dbee09ee0ddf5d22580b4400e0d35c5.png)






最後に、最新版のGoogle ChromeからWordPressにアクセスし、「保護された通信」と表示されることを確認してください。





## まとめ





今回は、AWS Lightsailの初期設定からWordPressのHTTPS化まで行いました。エックスサーバーでは、すべてこれらの作業をGUIで行うことができるのですが、AWS Lightsailではある程度のことは、ターミナル等で作業する必要があります。また、メールサービス等はありませんが、それでも月5ドルでこのスペックは魅力的です。みなさんもAWS LightsailでWordPressをはじめてみませんか。
