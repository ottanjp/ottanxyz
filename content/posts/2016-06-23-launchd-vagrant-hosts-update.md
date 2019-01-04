---
author: ottan
date: 2016-06-23 13:39:17+00:00
draft: false
title: ログイン時にVCCW（Vagrant＋VirtualBox）で構築した仮想マシンを自動起動する
type: post
url: /launchd-vagrant-hosts-update-4495/
categories:
  - Mac
tags:
  - Development
---

![](/images/2016/06/160622-576a9dcd54988.jpg)

WordPress の開発環境を即座に用意したいのであれば、Vagrant が便利です。Vagrant を使用すれば、簡単に仮想マシンを構築できます。また、さらに WordPress の開発環境に特化した仮想マシンを簡単に構築したければ、VCCW を使用するのが便利です。

* [OTTAN.XYZ | gulp.jsとBrowser Syncで快適なWordPress開発環境を手に入れる](/gulp-browser-sync-476/)

VCCW のインストールについては、上記リンクをご参照ください。さて、仮想マシンは OS 再起動時に自動的にシャットダウンされてしまいます。再起動の都度、毎回仮想マシンを起動するのは手間がかかるため、今回はログイン時に自動起動するよう設定してみましょう。

http://vccw.cc/

## ログイン時に仮想マシンを自動起動する

Vagrant で構築した仮想マシンを起動することは非常に簡単です。`Vagrantfile`と呼ばれる仮想マシンの設定ファイルを記述したファイルが配置されているディレクトリに移動して、`vagrant up`を実行するだけです。それすら面倒臭くなってきたので、自動化してしまえ、というのが今回の趣旨です。

### ログイン時に自動起動する方法

ログイン時に自動起動するためには、macOS の`launchd`を使用します。

<blockquote>launchdはデーモン、アプリケーション、プロセス、スクリプトの起動・停止・管理を行う、オープンソースのサービス管理フレームワークである。</blockquote>

`launchd`を使用することで、OS 起動時、ユーザログイン時のデーモンやアプリケーションの起動、停止を制御できます。`launchd`の定義には、プロパティリストと呼ばれる、macOS でお馴染みの`.plist`ファイルが使用されます。`.plist`ファイルは、XML 形式で書かれているため、視認性が良く、macOS ではアプリケーションの設定ファイルとして使用されています。

`launchd`が制御するプロパティリストは、以下の領域に格納されています。

| 場所                          | 説明                                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ~/Library/LaunchAgents        | 特定ユーザのみで起動されるプログラムの定義を格納する場所（起動時のユーザはログインユーザ）                     |
| /Library/LaunchAgents         | すべてのユーザで共通で起動されるプログラムの定義を格納する場所（起動時のユーザはログインユーザ）               |
| /Library/LaunchDaemons        | すべてのユーザで共通で起動されるプログラムの定義を格納する場所（起動時のユーザは root ユーザ）                 |
| /System/Library/LaunchAgents  | すべてのユーザで共通で起動される OS が管理するプログラムの定義を格納する場所（起動時のユーザはログインユーザ） |
| /System/Library/LaunchDaemons | すべてのユーザで共通で起動される OS が管理するプログラムの定義を格納する場所（起動時のユーザは root ユーザ）   |

`/System/Library`配下は OS によって管理される領域であるため、ここをユーザが管理することはありません。よって、`/Library`、または各ユーザのホームディレクトリにある`~/Library`配下にプログラムの定義を格納することになります。

仮想マシンの起動の場合、すべてのユーザで共通で定義することも可能ですが、今回は特定ユーザのみで起動されるよう、ユーザのホームディレクトリ配下である`~/Library/LaunchAgents`に定義します（`/Library`配下は、管理者ユーザのみ設定を変更することが可能です）。

#### プロパティリスト（plist）

仮想マシンを自動起動するための定義ファイル（プロパティリスト）は以下のようになります。以下のファイルをダウンロードし、`~/Library/LaunchAgents`配下に格納してください。

{{< gist ottanxyz ecb4df89b78b8ff792c44c4df458906d >}}

各項目の意味は以下の通りです。

| 項目                 | 内容                                                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| EnvironmentVariables | 起動時に指定する環境変数を定義します。                                                                                      |
| Label                | `launchd`が管理する一意の識別子（エージェント名）を定義します。一意である必要があるため、通常はドメイン名などを使用します。 |
| ProgramArguments     | 起動するプログラム（スクリプト）、および  パラメーターを指定します。                                                        |
| RunAtLoad            | `launchd`にロードするタイミングで起動するかどうかを、`true`、`false`のいずれかで指定します。                                |
| StandardErrorPath    | 標準エラー出力を出力する場所を指定します。                                                                                  |
| StandardOutPath      | 標準出力を出力する場所を指定します。                                                                                        |
| WorkingDirectory     | 起動するプログラムの作業ディレクトリ（カレントディレクトリ）を指定します。                                                  |

`WorkingDirectory`は、`Vagrantfile`が格納されている場所を指定します。各自で、適宜置き換えて使用してください。

### vagrant-hostsupdater

VCCW では、vagrant-hostsupdater と呼ばれる、仮想マシン起動時にホスト OS（Mac）の`/etc/hosts`に、仮想マシンのホスト名と IP アドレスを自動で追記するプラグインを使用しています。`/etc/hosts`は、root ユーザのみ編集可能なファイルであり、ファイルの書き換えを行うためには`sudo`を実行する必要があります。vagrant-hostsupdater は、`sudo`を使用して`/etc/hosts`の書き換えを行なっています。

ユーザプロセスで仮想マシンを自動起動する場合、ここに問題が発生します。VCCW で構築した仮想マシンを起動する場合、前述の`/etc/hosts`の書き換えのために、`sudo`のタイミングで実行ユーザのパスワードの入力が求められます。パスワードを求められると、プログラム（スクリプト）がそこで停止してしまいます。そこで、特定のコマンド実行時にはパスワードの入力を求められないよう制御するため、`/etc/sudoers`を書き換えます。

### /etc/sudoers

`sudo`は、root 以外のユーザが root 権限でコマンドを実行するための仕組み（自分以外のユーザにスイッチ（su：Switch User）して実行（do）する仕組み）です。その仕組みを管理するファイルが、`/etc/sudoers`です。このファイルもまた、前述の`/etc/hosts`と同様に、root ユーザでのみ編集可能です。

`/etc/sudoers`を書き換えて、`/etc/hosts`をパスワード無しで自動的に更新するようにしましょう。ヒントは、vagrant-hottsupdater が公開されている GitHub にあります。

https://github.com/cogitatio/vagrant-hostsupdater#passwordless-sudo

`/etc/sudoers`は、書き換えたタイミングから、即その内容が反映されます。そのため、構文等にミスがあった場合、二度と`sudo`できなくなる可能性があり、その結果として`/etc/sudoers`の編集もできず、OS のリカバリーが必要になるケースもあります。そのため、本ファイルを直接書き換えてはいけません。書き換える場合は、`visudo`コマンドを使用します。

    $ sudo visudo

通常、文字通り vi エディターが起動しますが、事前に、`EDITOR`環境変数を指定することで、任意のエディターで起動することも可能です。vi が起動したら、`/etc/sudoers`の末尾に以下を追記してください。vi の使用方法については割愛します。

    # Allow passwordless startup of Vagrant with vagrant-hostsupdater.
    Defaults:%admin    visiblepw
    Cmnd_Alias VAGRANT_HOSTS_ADD = /bin/sh -c echo "*" >> /etc/hosts
    Cmnd_Alias VAGRANT_HOSTS_REMOVE = /usr/bin/env sed -i -e /*/ d /etc/hosts
    %admin ALL=(root) NOPASSWD: VAGRANT_HOSTS_ADD, VAGRANT_HOSTS_REMOVE

`%admin`は、仮想マシンを起動するユーザが所属するグループを指定します。所属しているグループは、以下のコマンドで確認できます。通常は、管理者ユーザのみが属している`%admin`を指定するのが良いでしょう。

    $ id

このコマンドの実行結果は以下の通りです。

    uid=501(ottan) gid=20(staff) groups=20(staff),401(com.apple.sharepoint.group.1),12(everyone),61(localaccounts),79(_appserverusr),80(admin),81(_appserveradm),98(_lpadmin),33(_appstore),100(_lpoperator),204(_developer),395(com.apple.access_ftp),398(com.apple.access_screensharing),399(com.apple.access_ssh),701(com.apple.sharepoint.group.2)

これで、パスワードの入力を求められることなく、`sudo`することができるようになります。

### launchd にロードする

さて、事前準備が整いました。作成した定義ファイル（プロパティリスト）を`launchd`にロードします。今回は、`RunAtLoad`を指定しているため、ロードしたタイミングで自動起動されます。次回以降は、ユーザログイン時に自動的に`launchd`から起動されるようになります。

    launchctl load ~/Library/LaunchAgents/dev.vccw.vagrant.agent

正常に起動されない場合は、`/tmp`配下に出力される標準出力、および標準エラー出力を参照してください。なお、`/tmp`配下は、OS 再起動時にリフレッシュされます。

## まとめ

`launchd`、`sudo`、`visudo`など、聞き慣れない単語が多いのですが、使いこなせるようになると、ますます Mac が便利で手放せなくなります。ただし、`/etc/sudoers`の編集は諸刃の剣です。必ず`visudo`を使用しましょう。このコマンドは、`/etc/sudoers`の構文に誤りがあった場合に、指摘してくれたり、複数のユーザが一斉に書き換えることのないように、排他ロック制御を行ってくれます。

是非、`launchd`の魅力に触れてみてください！

### 参考リンク

`/etc/sudoers`については、以下のリンクが非常に参考になります。

http://qiita.com/yuku_t/items/5f995bb0dfc894c9f2df
