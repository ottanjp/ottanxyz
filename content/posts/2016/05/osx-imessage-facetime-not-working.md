---
author: ["@ottanxyz"]
date: 2016-05-04 12:56:45+00:00
draft: false
title: iMessageとFaceTimeにサインインできない問題の対処法
type: post
slug: osx-imessage-facetime-not-working-6859
categories:
- iPhone
- Mac
tags:
- Tips
---

![](/uploads/2016/05/160504-5729ee8b0122f.jpg)






macOS El Capitan（10.11.4）にアップデート後、とくに不具合が起きることもなく、順調に使用していたのですが、ある日突然、iMessageとFaceTimeにサインインできなくなりました。「アプリケーション」→「ユーティリティ」フォルダーにある「コンソール」からシステムログを見てみると、以下のエラーが頻発していることがわかりました。




    
    2016/05/03 22:23:40.981 apsd[74]: Certificate not yet generated
    2016/05/03 22:13:48.232 apsd[74]: Hardware SerialNumber "unknown" looks incorrect or invalid





原因は意外なところにありました。真の原因は判明していないのですが。





## ロジックボードのシリアル番号がmacOSに認識されない





![](/uploads/2016/05/160504-5729ee8b92e3e.png)






メニューの「」→「このMacについて」を見ると、通常は「シリアル番号」に、そのMac固有のシリアル番号が表示されます。しかし、直接の原因は不明なのですが、いつの日かシリアル番号が認識されなくなっていました。どうやら、このシリアル番号が認識されない問題が、上記のコンソールのエラーに繋がっているようです。また、iMessageもMac固有のシリアル番号で認証を行うため、シリアル番号がOSに認識されない結果、使用できないようでした。




    
    $ system_profiler SPHardwareDataType
    Hardware:
    
        Hardware Overview:
    
          Model Name: MacBook Pro
          Model Identifier: MacBookPro11,2
          Processor Name: Intel Core i7
          Processor Speed: 2 GHz
          Number of Processors: 1
          Total Number of Cores: 4
          L2 Cache (per Core): 256 KB
          L3 Cache: 6 MB
          Memory: 8 GB
          Boot ROM Version: MBP112.0138.B17
          SMC Version (system): 2.18f15
          Serial Number (system): Not Available
          Hardware UUID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX





念のため`system_profiler`コマンドで確認してみましたが、「Serial Number」が「Not Available」になっています。





### 対処法はApple Storeでシリアル番号の書き込みを行ってもらうこと





![](/uploads/2016/05/160504-5729ee8d17d94.png)






対処法は1つしかありません。Apple Store、もしくは正規サービスプロバイダーでシリアル番号をmacOSに再認識してもらうよう修理してもらうことです。私が使用しているモデルは、すでに保証期間対象外でしたが、Apple Store表参道店で無償で修理していただけました。





再びシリアル番号が認識できるようになると、冒頭のコンソールのエラーはなくなり、iMessageもFaceTimeも使用できるようになりました。私の場合は、不幸中の幸いにもiMessageとFaceTimeが使用できない、という問題だけでしたが、App StoreやiTunes Store、さらにはiCloudが使用できない、などさらに深刻な問題に繋がる可能性もあるそうです。





同様の症状で悩まれている方がいらっしゃいましたら、ぜひApple Storeに相談してみてください。
