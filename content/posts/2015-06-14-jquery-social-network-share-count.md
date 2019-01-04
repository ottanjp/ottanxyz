---
author: ottan
date: 2015-06-14 05:55:45+00:00
draft: false
title: jQueryを使用してTwitter、Facebook、Google+、はてなブックマークのシェア数を非同期で取得する方法のまとめ
type: post
url: /jquery-social-network-share-count-1705/
categories:
  - Blog
tags:
  - Development
  - WordPress
---

![](/images/2015/06/150614-557d1764949ee.jpg)

プラグインを使用せずにソーシャルネットワークからシェア数を取得する方法のサンプルです。WordPress にはさまざまなプラグインが用意されており、また公式ボタンを使用した方がより設置が簡単なのですが、jQuery の勉強も兼ねて自力で作成してみました。

## サンプル

サンプルをご用意しました。サンプルについては後ほど詳細に解説します。

### HTML

        <li><i class="fa fa-twitter"></i>&nbsp;<span class="social_twitter" data-url="https://ottan.xyz/tethering-tripmode-1363/"><i class="fa fa-spinner fa-spin"></i></span></li>
        <li><i class="fa fa-facebook"></i>&nbsp;<span class="social_facebook" data-url="https://ottan.xyz/tethering-tripmode-1363/"><i class="fa fa-spinner fa-spin"></i></span></li>
        <li><b>B!</b>&nbsp;<span class="social_hatena" data-url="https://ottan.xyz/tethering-tripmode-1363/"><i class="fa fa-spinner fa-spin"></i></span></li>
    </ul>

### JavaScript

    jQuery(function($) {
      $("[class^=social_]").each(function() {
        var obj = this;
        var urlJson = {
            social_facebook: "//graph.facebook.com/?id={url}",
            social_twitter: "//opensharecount.com/count.json?url={url}",
            social_hatena: "//api.b.st-hatena.com/entry.count?url={url}&callback=?"
          },
          targetURL = urlJson[obj.className].replace('{url}', encodeURIComponent(($(obj).data()).url));

        $.getJSON(targetURL, function(json) {
          if (typeof json === 'object') {
            $(obj).text(json.count || json.share.share_count || 0);
          } else {
            $(obj).text(json || 0);
          }
        });
      });
    });

## 解説

今回のサンプルは[Bootstrap](http://getbootstrap.com/)、および[Font Awesome](http://fortawesome.github.io/Font-Awesome/)を利用していますが必須ではありません。ただし、[jQuery 1.x](http://jquery.com/)を使用するためあらかじめダウンロードして置いてください。

### HTML

まず、表示部分となる HTML です。ソースコードが長くなるため、Google+、はてなブックマークは割愛しますが、Twitter、Facebook と同様です。

        <li><i class="fa fa-twitter"></i>&nbsp;<span class="social_twitter" data-url="https://ottan.xyz/tethering-tripmode-1363/"><i class="fa fa-spinner fa-spin"></i></span></li>
        <li><i class="fa fa-facebook"></i>&nbsp;<span class="social_facebook" data-url="https://ottan.xyz/tethering-tripmode-1363/"><i class="fa fa-spinner fa-spin"></i></span></li>
        <li><b>B!</b>&nbsp;<span class="social_hatena" data-url="https://ottan.xyz/tethering-tripmode-1363/"><i class="fa fa-spinner fa-spin"></i></span></li>
    </ul>

肝となるのは`<span>` タグに指定しているクラス名と独自データ属性です。`<span>` タグに指定するクラス名、および独自データ属性は以下の通りです。なお、`<span>` や`<ul>` タグ以外のタグを使用していても、クラス名や独自データ属性さえ定義すれば問題ありません。

| 項目     | 内容                                                                             |
| -------- | -------------------------------------------------------------------------------- |
| class    | `social_twitter` 、`social_facebook` 、`social_gplus` 、`social_hatena` から選択 |
| data-url | ソーシャルネットワークのシェア数を取得する URL を指定する。                      |

jQuery による取得が完了したら、`<span>` タグの中身をまるっと入れ替えます。デフォルトでは、[Font Awesome Examples](http://fortawesome.github.io/Font-Awesome/examples/)の「Spinning Icons」を指定し、ロードが完了すると`<span>` タグの中身がまるっと入れ替わるようになっています。

### JavaScript

今回のサンプルの最重要要素の JavaScript です。順を追って解説します。

    $("[class^=social_]").each(function(){//do stuff};

指定したすべてのクラスに対して処理を実行します。`[class^=social_]`と指定することで、`social_`から始まるすべての要素に対して処理を実行させることができます。

    var obj = this;
    var urlJson = {
            social_facebook: "//graph.facebook.com/?id={url}",
            social_twitter: "//cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
            social_hatena: "//api.b.st-hatena.com/entry.count?url={url}&callback=?"
        },
        targetURL = urlJson[obj.className].replace('{url}', encodeURIComponent(($(obj).data()).url));

取得した要素を`obj` 変数に格納します。シェア数の取得が完了した要素の HTML を入れ替えるために使用します。

続いて、`urlJson` 要素にソーシャルネットワークからシェア数を取得するための URL を指定します。ここで指定した連想配列のキーがクラス名と一致している必要があります。Google+については後述します。

最後に、`targetURL` に、指定したクラス名に対応する URL を`urlJson` から取得し格納します。取得対象とするページの URL は、独自データ属性である`data-url` から取得します。また、URL 文字列はエンコードしておきます。

#### 独自データ属性の取得について

`data-url` で指定した URL を取得するためには、`$(element).data()` メソッドを使用します。`data()` メソッドで取得した戻り値は連想配列になっており、`data-xxx` の`xxx` が配列のキーとなります。

    $.getJSON(targetURL, function(json) {
        if (typeof json === 'object') {
            $(obj).text(json.count || json.share.share_count || 0);
        } else {
            $(obj).text(json || 0);
        }
    });

続いて、`getJSON()` メソッドで指定した URL に対して、非同期で JSON データを取得します。取得した JSON データは`json` 変数に格納します。

ここで、各ソーシャルネットワークから返される結果が異なるため、場合分けが発生します。

| ソーシャルネットワーク | 取得方法               |
| ---------------------- | ---------------------- |
| Twitter                | json.count             |
| Facebook               | json.share.share_count |
| Google+                | json.count             |
| はてなブックマーク     | テキスト               |

Twitter、Facebook はオブジェクトを返すのに対して、はてなブックマークは単純なテキスト（シェア数）を返します。そのため、オブジェクトかどうかで場合分けする必要があります。

### 注意事項

このサンプルはそのまま使用できますが、何点か注意事項があります。

- Twitter の API は 1.0 を使用しているため、いずれ廃止される可能性があります。最新バージョンの API 1.1 を使用する場合、認証が必要になります。
- jQuery 1.11.0 で動作確認済みです。jQuery 2.x では動作確認していません。
- はてなブックマーク数取得の API の動作が安定しないため取得できないことがあります。

## まとめ

ソーシャルネットワークのシェア数を独自で取得してみたいという方は、ぜひ参考にしてみてください。ご意見、ご感想等ありましたら、コメント欄までお願いします。
