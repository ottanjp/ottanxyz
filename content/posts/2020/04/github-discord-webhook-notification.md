---
title: GitHubのイベントをDiscordのチャンネルに通知する
date: 2020-04-26
tags:
  - Netlify
categories:
  - Blog
slug: github-discord-webhook-notification
---
Slackであれば、AppディレクトリからGitHubアプリをインストールすれば、GitHubと簡単に連携できます。Discordでも同様の連携ができないかどうか試してみたところ、一癖ありましたが連携可能でした。以下で使用している画像は、Mac版のDiscordアプリ（0.0.256）のスクリーンショットです。

## Discordの設定

通常のテキストチャンネルと分割し、できれば専用チャンネルを作成しておきます。

![](/uploads/2020/04/screenshot-2020-04-09-20.13.10.png)

チャンネル横の「歯車」アイコンをクリックします。

![](/uploads/2020/04/screenshot-2020-04-09-20.13.35.png)

サイドメニューから「ウェブフック」を選択します。Discordのイベントをトリガーとした外向きのウェブフックは用意されていないようです。

![](/uploads/2020/04/screenshot-2020-04-09-20.13.56.png)

ウェブフックのアイコンはなくても良いですが、設定しておいた方が雰囲気は出ますし、発信元を識別しやすいと思います（特に、同一チャンネル内にいろいろ混在させる場合）。名前は任意ですが、後々のメンテナンスを考えて、わかりやすい名称にしておきましょう。このダイアログに表示される、「ウェブフックURL」をコピーしておきます。「Copy」ボタンを押しても、クリップボードへコピーできます。

## GitHubの設定

ブラウザ（デスクトップ）で連携したいリポジトリを開きます。「Settings」をクリックします。

![](/uploads/2020/04/screenshot-2020-04-09-20.14.26.png)

サイドメニューから「Webhooks」を開きます。GitHubのウェブフックは、Discordと異なり、外方向のウェブフックを設定可能です。「Add webhook」をクリックします。

![](/uploads/2020/04/screenshot-2020-04-09-20.14.59.png)

以下の項目を入力します。

* Pyaload URL
  * 「先ほどコピーしたURL」 + **「/github」**
  * ここ毎回忘れるポイントなので注意が必要です
* Content type
  * 「application/json」へ変更
* Which events would you like to trigger this webhook?
  * 任意ですが、「Send me everything.」にしておくとテストがしやすいです
  * 大量のイベント（スター、プッシュ、Issue、プルリク、ブランチの作成、削除など）が発生するリポジトリの場合、Discordのチャンネルが見辛くなる可能性があります
  * 「Let me select indivisual events」で通知したいイベントだけ選択するとよいです

「Add webhook」を押したら完了です。

![](/uploads/2020/04/screenshot-2020-04-09-20.15.42.png)