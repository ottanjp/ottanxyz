---
author: ottan
date: 2014-09-10 13:48:28+00:00
draft: false
title: Time Machineはどのようにしてバックアップを取得しているの？MacのTime Machineの疑問徹底解説
type: post
url: /about-time-machine-244/
categories:
- Mac
tags:
- Time Machine
---

![](/images/2014/09/140909-540ea71939214.jpg)






Time Machineは、macOSが誇る史上最大の機能です。外付けのディスクをMacに接続して、Time Machineをオンにするだけで、自動的に毎日欠かさず、あなたに代わってバックアップを取得してくれます。





photo credit: [adamwilson](https://www.flickr.com/photos/adamwilson/3241009989/) via [photopin](http://photopin.com) [cc](http://creativecommons.org/licenses/by-nc-nd/2.0/)





外付けのディスクは、Macに直接接続されている必要はありません。たとえば、AirMac Time Capsuleの場合、無線LANルーターに2TBまたは3TBのディスクを内蔵されており、ネットワーク経由でMacのバックアップ取得します。




以降、Time Machineに接続されているディスクのことを、バックアップディスクと呼びます。





さて、Time Machineには以下のものが保存されています。






  * ローカルスナップショット（後述）
  * 過去24時間の1時間ごとのバックアップ
  * 過去1か月の１日ごとのバックアップ
  * 過去のすべての月の1週間ごとのバックアップ




バックアップディスクが一杯になった場合は、一番古いバックアップから自動的に削除されます。これらのバックアップはTime Machineによりどのように保存され、いつでも復旧できる環境を作っているのでしょうか？





## ローカルスナップショットとは？





![](/images/2014/09/140910-54105697c5965.png)






Time Machineはローカルディスク上にもバックアップを作成します。メニューの「このMacについて」→「詳しい情報」とたどると、ディスプレイやメモリなどと同列で、ストレージの情報を表示できます。ここにある「バックアップ」が「ローカルスナップショット」の正体です。





Time Machineでバックアップを行うためには、バックアップディスクが必要です。MacBook ProやMacBook Airなど、持ち運びを前提として作られている機種の場合、常にTime Machineのバックアップディスクが手元にある状況とは限りません。





このような状況へ対応するために、macOS Lionから**「Mobile Time Machine」**という機能が追加されました。同機能は、MacがTime Machineのバックアップディスクに接続できない場合、次回のバックアップ候補をいったんローカルディスクの専用の領域に退避します。そして、MacがTime Machineへ接続できる段階になったら、退避していたバックアップ領域をバックアップディスクにコピーします。こうして、Macはいつも欠かさずバックアップを取得しようとしているのです。





### Mobile Time Machineの起動／停止方法





MacBook ProやMacBook Airの使用可能なディスクの領域は、それほど大きくはありません。また、常にTime Machineのバックアップディスクに接続可能な状況で使用するのであれば、本機能自体が意味を持ちません。ディスクを節約したい、などの理由があれば停止してしまっても構わないでしょう。





**Mobile Time Machineの停止**





    $ sudo tmutil disablelocal





**Mobile Time Machineの起動**





    $ sudo tmutil enablelocal





Mobile Time Machine停止直後のストレージの情報は下図のようになっています。「バックアップ」に注目してください。「0KB」となっているのがお分かりいただけるかと思います。





![](/images/2014/09/140910-54105698e321d.png)






## Time Machineによるバックアップの仕組み





前述のとおり、Time Machineは、ローカルスナップショットを除けば、１時間ごと、１日ごと、１週間ごととさまざまなバックアップを取得しています。毎回ディスクの中身をすべてバックアップディスクに取得していては、バックアップディスクの容量がいくらあっても足りそうにありません。





そこで、Time Machineでは以下のような方式をとっています。なお、参考のためのイメージ図であり実態とは異なることをご承知置きください。





![](/images/2014/09/140910-54105699b962d.png)






1世代目、すなわち最初のバックアップはローカルディスクの内容をフルで取得します。そのため1回目のTime Machineによるバックアップには時間を要します。





2世代目のバックアップはどうでしょうか。ローカルディスクの内容をすべて取得するのではなく、1世代目のバックアップから変更のあった箇所のみをバックアップします。しかし、このままでは2世代目のバックアップから復旧することができませんから、変更のなかった箇所については1世代目のバックアップを参照するようにします。3世代目以降も同様です。





Mobile Time Machineも同様です。このような仕組み（スナップショットと言います）を採用することで、確実かつスムーズなバックアップを実現可能にしているのです。





## Time Machineにより除外される項目





Time Machineではすべての項目をバックアップ対象としているわけではありません。たとえば、アプリケーションのキャッシュなど、バックアップする必要のない項目についてはあらかじめ除外されています。除外対象とするディレクトリやファイルについては、Time Machineの設定ファイルに記載されています。





    /System/Library/CoreServices/backupd.bundle/Contents/Resources/StdExclusions.plist





### PathsExcluded（完全に除外される項目）






  * /.MobileBackups
  * /.Spotlight-V100
  * ...




「.MobileBackups」は前述のMobile Time Machineの保存場所です。Mobile Time Machine（ローカルのバックアップ）で作成されたバックアップファイル自体をTime Machineによるバックアップの対象に含めないように考慮されています。





また、「.Spotlight-V100」はSpotlightのインデックスファイルが保存されている場所です。この領域も保存されません。Time Machineから復元すると、再度Spotlightのインデックスが構成されます。





### ContentsExcluded（バックアップ対象ではないが復元対象とするもの）






  * /Volumes
  * /Library/Caches
  * /Library/Logs
  * /System/Library/Caches
  * /System/Library/Extensions/Caches
  * …




「/Volumes」は外部ディスクです。Macに接続されている外付けディスクやSDカードの内容は、Time Machineのバックアップ対象とはなりません。





「/Library/Caches」「/Library/Logs」はアプリケーションが使用するキャッシュおよびログの保存場所です。こうした一時的な情報もTime Machineのバックアップ対象とならないように考慮されています。





### UserPathsExcluded（ユーザーごとのフォルダーで除外される項目）






  * Library/Caches
  * Library/Logs
  * …




基本的な考え方は「ContentsExcluded」と同様です。一時的な情報についてはTime Machineの対象とはなりません。





## 除外する項目を追加するためには





![](/images/2014/09/140910-5410569c2b0ee.png)






「システム環境設定」→「Time Machine」の「オプション」から行います。





![](/images/2014/09/140910-5410569eafe0f.png)






ここにバックアップの対象から除外する項目を追加します。バックアップ時に復元する必要のない項目については、あらかじめ設定しておきましょう。






  * ~/Dropbox
  * ~/Downloads
  * …




などなど、オンラインストレージに常に保存されているフォルダー、ダウンロードフォルダーなどダウンロード時に一時的に使用するフォルダーを選択すると良いでしょう。





## まとめ





Time Machine、Mobile Time Machineの仕組みについて簡単にご紹介しました。Macは精密機械ですから、いつどこで何があるかわかりません。Time Machineを活用して、いつでもバックアップから復旧できる環境を整えておきましょう。
