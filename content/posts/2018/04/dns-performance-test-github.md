---
author: ottan
date: 2018-04-05 14:22:44+00:00
draft: false
title: 最速のDNSリゾルバーを見つけるためのパフォーマンス測定方法と「DNS Performance test」
type: post
slug: dns-performance-test-github-6689
categories:
- Mac
tags:
- DNS
- GItHub
- Wi-Fi
---

![](/uploads/2018/04/180405-5ac62b3619f6a.jpg)

[NURO光のZTE社製ルーター「F660T」「F660A」でDNSによる名前解決が遅い時に試したいこと](/posts/2018/03/nuro-sonet-zte-f660t-f660a-6679/)や、[iPhoneやMacでWi-Fiの「体感速度」が遅く読み込みに時間がかかる場合の対処法](/posts/2018/01/wi-fi-slow-down-speed-iphone-mac-6585/)で、DNSの変更についてご紹介しています。ちょうどこの記事を公開した時期と同時期に、話題になったのが、米CDN（コンテンツデリバリーネットワーク）大手Cloudflareの[1.1.1.1 — the Internet’s Fastest, Privacy-First DNS Resolver](https://1.1.1.1/)です。

世界最速、かつプライバシーを保護したDNSリゾルバーであることを謳う同サービスですが、「本当に速いの？」と目くじらを立てたくなるものです。DNSリゾルバーと言えば、Google Public DNSが有名ですが、DNSPerfによるとGoogle Public DNSより勝ると言います。では、実際に応答速度を計測してみましょう。

## DNSの解析に役立つdigコマンド

具体的に、Cloudflareが公開しているDNSリゾルバーがどれぐらい速いのか、計測してみましょう。Macを利用している方なら、ターミナルからすぐに実行できます。

    dig @1.1.1.1 www.google.co.jp

さまざまな結果が表示されますが、注目すべきは、

    ;; Query time: 53 msec

です。クエリ時間（実行時間）が表示されます。CloudflareのDNSリゾルバーを使用すると、「www.google.co.jp」の名前解決に「53msec」かかっていることがわかります。「@」の後ろにDNSサーバのIPアドレスを指定します。それに対して、Google Public DNSはというと、

    ;; Query time: 55 msec

ほぼ誤差ですね。ちなみに、このMacが接続されている無線LANルーターに対して実行した結果、

    ;; Query time: 432 msec

遅い！遅すぎる！！CloudflareやGoogle Public DNSと比較すると、約10倍程度実行に時間がかかっています。DNSサーバーが設置されている場所（遠ければ遠いほど遅延時間も大きくなる）を考慮しても、あまりにも遅いです。ブラウジング時の体感速度が遅くなるはずですね。

### GitHubで公開されているオープンソース「DNS Performance Test」

さて、著名なDNSリゾルバーに対して、同様の`dig`コマンドによる測定結果の平均値を算出してくれるツールが、GitHubで公開されていたためご紹介します。それは、[GitHub - cleanbrowsing/dnsperftest: DNS Performance test](https://github.com/cleanbrowsing/dnsperftest)です。たった1つのシェルスクリプトです。`dig`コマンドを叩いてぐるぐる回しているだけです。とてもお手頃です。

#### 実行方法

このシェルスクリプトを実行するまでの流れは以下の通りです。GitHub上のReadmeにも記載があります。

    git clone --depth=1 https://github.com/cleanbrowsing/dnsperftest/
    cd dnsperftest
    bash ./dnstest.sh

というわけで実際に実行してみました。

                      test1   test2   test3   test4   test5   test6   test7   test8   test9   test10  Average 
    1.1.1.1           46 ms   47 ms   41 ms   41 ms   40 ms   41 ms   40 ms   41 ms   40 ms   40 ms     41.70
    1.0.0.1           40 ms   39 ms   41 ms   41 ms   40 ms   40 ms   40 ms   40 ms   40 ms   41 ms     40.20
    192.168.1.1       342 ms  494 ms  495 ms  494 ms  392 ms  494 ms  494 ms  448 ms  43 ms   481 ms    417.70
    cloudflare        45 ms   41 ms   45 ms   41 ms   41 ms   39 ms   41 ms   41 ms   40 ms   40 ms     41.40
    level3            40 ms   43 ms   43 ms   41 ms   112 ms  44 ms   42 ms   41 ms   42 ms   42 ms     49.00
    google            40 ms   41 ms   42 ms   42 ms   52 ms   228 ms  44 ms   41 ms   41 ms   41 ms     61.20
    quad9             84 ms   83 ms   83 ms   84 ms   84 ms   83 ms   82 ms   83 ms   83 ms   82 ms     83.10
    freenom           45 ms   42 ms   40 ms   40 ms   41 ms   275 ms  44 ms   1000 ms 47 ms   216 ms    179.00
    opendns           128 ms  81 ms   80 ms   129 ms  80 ms   414 ms  81 ms   80 ms   130 ms  79 ms     128.20
    norton            45 ms   41 ms   41 ms   40 ms   40 ms   39 ms   41 ms   42 ms   40 ms   41 ms     41.00
    cleanbrowsing     40 ms   59 ms   40 ms   41 ms   41 ms   178 ms  197 ms  44 ms   40 ms   42 ms     72.20
    yandex            351 ms  305 ms  376 ms  300 ms  382 ms  495 ms  289 ms  391 ms  290 ms  392 ms    357.10
    adguard           145 ms  158 ms  158 ms  197 ms  146 ms  418 ms  183 ms  396 ms  183 ms  148 ms    213.20
    neustar           44 ms   41 ms   41 ms   41 ms   39 ms   40 ms   45 ms   40 ms   50 ms   40 ms     42.10
    comodo            190 ms  190 ms  271 ms  187 ms  187 ms  289 ms  190 ms  187 ms  187 ms  188 ms    206.60

やはり現段階ではCloudflareが安定していますね。これから先利用者が増える中でどうなるかがわからないこと、CDNサービスを生業とするCloudflareがこのまま有志で無償で使用可能なDNSサービスを提供し続ける保証がないこと、などの心配はありますが、現段階でプロバイダーが提供するDNSに満足できない場合は、Cloudflareへの乗り換えを検討してみましょう。なお、Cloudflareが提供するDNSサーバーのIPアドレスは以下の通りです。（下段2行は、IPv6用です）

    1.1.1.1
    1.0.0.1
    2606:4700:4700::1111
    2606:4700:4700::1001

なお、前述の結果を平均値で並び替えたい場合は、`sort`コマンドを使います。

    $ bash ./dnstest.sh | sort -k 22 -n
                      test1   test2   test3   test4   test5   test6   test7   test8   test9   test10  Average 
    neustar           42 ms   38 ms   40 ms   39 ms   41 ms   38 ms   39 ms   39 ms   39 ms   39 ms     39.40
    cloudflare        40 ms   43 ms   40 ms   39 ms   40 ms   40 ms   38 ms   40 ms   49 ms   40 ms     40.90
    1.1.1.1           52 ms   43 ms   41 ms   39 ms   39 ms   39 ms   39 ms   39 ms   40 ms   39 ms     41.00
    norton            52 ms   49 ms   41 ms   42 ms   40 ms   39 ms   39 ms   40 ms   40 ms   39 ms     42.10
    cleanbrowsing     38 ms   168 ms  42 ms   38 ms   40 ms   46 ms   39 ms   39 ms   40 ms   39 ms     52.90
    google            39 ms   40 ms   39 ms   42 ms   57 ms   200 ms  39 ms   39 ms   39 ms   41 ms     57.50
    quad9             82 ms   84 ms   83 ms   82 ms   83 ms   82 ms   82 ms   83 ms   82 ms   85 ms     82.80
    opendns           80 ms   83 ms   79 ms   128 ms  83 ms   349 ms  80 ms   295 ms  78 ms   80 ms     133.50
    1.0.0.1           39 ms   40 ms   40 ms   40 ms   40 ms   39 ms   39 ms   39 ms   1000 ms 42 ms     135.80
    level3            1000 ms 41 ms   39 ms   39 ms   39 ms   147 ms  40 ms   39 ms   38 ms   38 ms     146.00
    freenom           39 ms   40 ms   51 ms   39 ms   153 ms  149 ms  43 ms   39 ms   39 ms   919 ms    151.10
    adguard           155 ms  192 ms  146 ms  155 ms  260 ms  183 ms  143 ms  182 ms  239 ms  146 ms    180.10
    comodo            188 ms  187 ms  188 ms  190 ms  190 ms  190 ms  191 ms  187 ms  187 ms  187 ms    188.50
    192.168.1.1       94 ms   533 ms  494 ms  494 ms  494 ms  41 ms   39 ms   39 ms   39 ms   187 ms    245.40
    yandex            367 ms  299 ms  382 ms  392 ms  391 ms  306 ms  376 ms  290 ms  288 ms  398 ms    348.90

意外とNeustarが速い。

## まとめ

世界最速を謳うCloudflareですが、世界で提供されているパブリックDNSにはさまざまなものがあり、たとえば、Ciscoの提供するOpenDNSの場合、悪質なWebサイトにアクセスした場合に自動的にフィルターリングするなどの付加機能を提供しているところもあります。場合によって使い分けるのが良さそうですが、とりあえずユーザーにとって速いに越したことはないでしょうか。

    $ ping 1.1.1.1
    PING 1.1.1.1 (1.1.1.1): 56 data bytes
    64 bytes from 1.1.1.1: icmp_seq=0 ttl=58 time=5.975 ms
    64 bytes from 1.1.1.1: icmp_seq=1 ttl=58 time=5.353 ms
    64 bytes from 1.1.1.1: icmp_seq=2 ttl=58 time=6.556 ms
    64 bytes from 1.1.1.1: icmp_seq=3 ttl=58 time=7.194 ms
    64 bytes from 1.1.1.1: icmp_seq=4 ttl=58 time=7.478 ms
