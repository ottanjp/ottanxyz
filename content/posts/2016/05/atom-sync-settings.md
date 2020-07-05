---
author: ["@ottanxyz"]
date: 2016-05-29T00:00:00+00:00
draft: false
title: Atomの設定、キーマップ、スニペット、パッケージを複数の端末間で同期する「sync-settings」
type: post
slug: atom-sync-settings-4386
categories:
  - Mac
  - Blog
tags:
  - Atom
  - Development
---

![](/uploads/2016/05/160529-574a784b76e1b.jpg)

Sublime Text は、Dropbox 経由でパッケージを同期することで、複数の端末間で同一の環境を簡単に構築することができました。Atom についても、ホームディレクトリ配下の`.atom`ディレクトリをオンラインストレージ経由で同期することで同一の環境を構築することも可能ですが、Atom には設定を同期するための専用のパッケージが用意されているので、こちらを使用すると便利です。

- [WordPress のテーマやプラグイン開発のために Atom に導入したパッケージ（2016 年版） - OTTAN.XYZ](/posts/2016/05/wordpress-atom-recommended-package-4369/)

## Atom の設定、パッケージを同期する「sync-settings」

Atom を起動したら、メニューの「Atom」→「Install Shell Commands」から「app」コマンドをインストールしておきます。ターミナルを開いて以下のコマンドを実行します。

    apm install sync-settings

### GitHub のアクセストークンの取得

「sync-settings」パッケージは、GitHub の Gist を経由して Atom の設定やパッケージの情報を同期します。そのために、事前に GitHub にアクセスするためのアクセストークン、および「Secret Gist」の用意が必要です。

https://github.com/

まず、上記のリンクから「GitHub」にアクセスします。

![](/uploads/2016/05/160529-574a785aa6c7e.png)

右上のプロフィールから「Settings」をクリックします。

![](/uploads/2016/05/160529-574a78609a595.png)

サイドメニューの「Personal access tokens」をクリックします。

![](/uploads/2016/05/160529-574a78664fa89.png)

「Generate new token」をクリックします。

![](/uploads/2016/05/160529-574a786cd43f1.png)

「Token description」に任意の名称を入力します。ここでは「Atom」としました。

![](/uploads/2016/05/160529-574a787f85b0f.png)

スコープは「gist」のみチェックしておきます。

![](/uploads/2016/05/160529-574a788427b5f.png)

最後に、「Generate token」をクリックします。

![](/uploads/2016/05/160529-574a788966b74.png)

アクセストークンが画面に表示されるため控えておきます。

### Secret Gist の作成

次に、Secret Gist を作成します。

https://gist.github.com/

まず、上記のリンクにアクセスします。

![](/uploads/2016/05/160529-574a788f72355.png)

任意のファイル名、ファイルの内容を入力して、「Create secret gist」をクリックします。ファイル名、内容は任意で構いません。ここでは、タイトルは「Atom」、内容は「a」としました。

    https://gist.github.com/ottanxyz/[Gist ID]

以上のような URL が生成されるため、最後の「Gist ID」を控えておきます。

### sync-settings の設定

最後に、Atom のパッケージの設定をします。Atom を起動したら、⌘+,を押し、環境設定を開きます。

![](/uploads/2016/05/160529-574a785443268.png)

「Packages」から「sync-settings」を探し、「Settings」をクリックします。

![](/uploads/2016/05/160529-574a78f21d4f5.png)

事前に控えた GitHub のアクセストークンを「Personal Access Token」に、Gist ID を「Gist Id」に入力します。

### sync-settings による設定、パッケージのバックアップ

![](/uploads/2016/05/160529-574a78fa55f9e.png)

Atom を起動したら、⇧+⌘+P を押し、コマンドパレットを起動します。「Sync…」と入力すると、「Sync Settings: Backup」が表示されますのでこちらを選択します。

![](/uploads/2016/05/160529-574a7901e704c.png)

上記のように、「Your settings were successfully backed up.」と表示されればバックアップ完了です。

### 複数の端末間で Atom の設定、パッケージを同期する

バックアップした設定、パッケージを同期するためには、同期先の端末に Atom および「sync-settings」をインストールし、今回実施した内容と同様の設定（GitHub のアクセストークンおよび Secret Gist）を行います。その上で、コマンドパレットを起動し、「Sync Settings: Restore」をクリックします。

    sync-settings: Your settings were successfully synchronized.

上記のメッセージが表示されれば同期完了です。Atom を再起動すると、すべての設定が反映されます。

## まとめ

Atom をメインのエディターとして使用する場合には、複数の端末間で環境を同期できると便利です。「sync-settings」を使用して、快適な Atom ライフをお過ごしください。
