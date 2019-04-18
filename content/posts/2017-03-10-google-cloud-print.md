---
author: ottan
date: 2017-03-10 06:49:43+00:00
draft: false
title: Google Cloud Printを使って外出先やiPhoneからいつでもどこでも印刷しよう
type: post
url: /google-cloud-print-5587/
categories:
- iPhone
- Mac
tags:
- Google
- Tips
---

![](/images/2017/03/170310-58c240cde5066.jpg)






iOS端末（iPhone、iPad）から閲覧しているWebページを印刷したい場合には、[AirPrint](https://support.apple.com/ja-jp/HT201311)に対応しているプリンターが便利です。iOS端末と同一ネットワーク（同一のWi-Fi）に接続してるだけで、とくに何も意識することなく、プリンターで印刷できます。しかし、ここ最近、AirPrint対応のプリンターの数は多くなってきたものの、いまだにAirPrint非対応のプリンターもあります。また、AirPrintでは印刷時の詳細な設定はできません。そこで、今回はAirPrintが使用できない、またはAirPrintは使用できるがより詳細な設定をしたい、外出先からも使いたい、と思っている方々のために、Google Cloud Printをご紹介します。





## Google Cloud Printを使用してどこからでも印刷できるようにする





### Google Cloud Printを使用するための準備





Google Cloud Printを使用するためには、PCまたはMacに接続しているプリンター、およびPCまたはMacにGoogle Chromeがインストールされている必要があります。Google Chromeは、[こちら](https://www.google.co.jp/chrome/browser/desktop/)からインストールできます。





また、お使いのプリンターがインターネットに直接接続している場合と、そうでない場合で手順が異なります。今回は、インターネットに接続しているプリンターである、自宅の「EPSON EP-707A」を使用します。なお、このプリンターはAirPrintにも対応している、廉価版モデルです。価格の割になかなかの省エネモデルであり、一般家庭で使用するには十分です。






インターネットに接続しているプリンターをGoogle Cloud Printにセットアップするための手順は、メーカーによって異なります。[こちら](https://www.google.com/cloudprint/learn/printers.html#setup-hp#setup-kodak#info-kodakverite#setup-epson#setup-canon#setup-samsung#info-dell#info-develop#info-brother#info-ricoh#info-lantronix#info-oki#info-pantum#info-konica#info-lexmark#info-xerox#info-kyocera#info-prinkprima#info-ta)のページから各メーカーの接続手順を確認してください。今回は、EPSONのプリンターを選択します。





### Google Cloud Printのセットアップ





お使いのプリンターがインターネットに直接接続している場合と、そうでない場合（従来型のプリンター）で手順が異なります。





#### インターネットに直接接続している場合





まずは、「EPSON EP-707A」の設定ページを、ブラウザから開きます。ブラウザを開き、アドレスバーに「http://<プリンターのIPアドレス>」と入力してください。プリンターのIPアドレスがわからない場合は、直接プリンターのネットワーク設定を確認するか、Macを使用していて、かつEPSONのプリンターを使用している場合は、「システム環境設定」→「プリンターとスキャナー」を開きます。





![](/images/2017/03/170310-58c243a8bf346.png)






「オプションとサプライ」をクリックします。





![](/images/2017/03/170310-58c243b979ebf.png)






「プリンターのWebページを表示」をクリックします。





![](/images/2017/03/170310-58c2442ce9d98.png)






AirPrintに関する設定ページが表示されますが、そのまま「メインに戻る」をクリックします。





![](/images/2017/03/170310-58c2450165740.png)






まずは、プリンターのファームウェア（制御ソフトウェア）が最新かどうか確認しておきましょう。「ファームウェアアップデート」をクリックします。





![](/images/2017/03/170310-58c2453593064.png)






「確認開始」をクリックします。





![](/images/2017/03/170310-58c24545e6927.png)






ファームウェアのアップデート中はプリンターが一時的に使用できなくなります。また、アップデートは機種によって異なりますが時間を要しますので、時間に余裕のあるときに行いましょう。「開始」をクリックします。ファームウェアのアップデートが完了し、プリンターが再起動されたら再び先ほどの設定画面を開きます。





![](/images/2017/03/170310-58c2450165740.png)






「Google クラウド プリント設定」をクリックします。





![](/images/2017/03/170310-58c245b26b9dd.png)






「登録」をクリックします。





![](/images/2017/03/170310-58c245df11e96.png)






「同意する」をチェックし、「次へ」をクリックします。





![](/images/2017/03/170310-58c246161d8e7.png)






しばらくすると、Google Cloud Printのセットアップが完了します。「確認」をクリックすると、テストページが印刷されますので、プリンターに用紙がセットされているか確認しておいてください。





![](/images/2017/03/170310-58c2466fe1e14.png)






Googleアカウントが表示されます。登録するGoogleアカウントに問題がなければそのまま「プリンター登録を完了」をクリックします。





#### 従来型のプリンターの場合





インターネットに接続していないプリンターをGoogle Cloud Printに登録するためには、Google Chromeが必要です。プリンターを接続しているPCまたはMacからGoogle Chromeを開き、「環境設定」を開きます。（Macの場合は、⌘+,を押します）





![](/images/2017/03/170310-58c247f87b566.png)






「設定」→「詳細設定を表示」（画面最下部）→「Google クラウド プリント」→「管理」をクリックします。





![](/images/2017/03/170310-58c2481c7884e.png)






「プリンターを追加」をクリックします。





![](/images/2017/03/170310-58c2484f44ebb.png)






対象のプリンターが表示されていることを確認し、「プリンターを追加」をクリックします。以上で、設定は完了です。





### Google Cloud Printを使用してみよう





では、実際にGoogle Cloud Printを使用して印刷してみましょう。Google Chromeを開き、プリントダイアログを表示します。Macの場合は、⌘+Pを押します。





![](/images/2017/03/170310-58c248b248a4a.png)






「送信先」の「変更」をクリックします。





![](/images/2017/03/170310-58c249110aae5.png)






Google クラウド プリントに登録されているプリンターを選択して印刷してみましょう。これで自宅のプリンターに現在閲覧しているWebページが印刷されているはずです。外出先でもGoogleアカウントとGoogle Chromeさえあれば、どこでも自宅のプリンターに印刷できます。





### iOS端末からGoogle Cloud Printに印刷する





iOS端末からGoogle Cloud Printに印刷するためには、対応しているアプリケーションが必要です。[こちら](https://www.google.co.jp/intl/ja/cloudprint/learn/apps.html)のページで公開されているためぜひ確認してみてくださいね。
