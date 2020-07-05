---
author: ["@ottanxyz"]
date: 2019-02-23T00:00:00+00:00
draft: false
title: 'MacのGoogle Chromeを使用して、iPhone、iPadのSafariでデバッグを行う方法'
type: post
slug: ios-safari-chrome-debug-20190202
categories: ['iPhone', 'Mac']
tags: ['Safari', 'Google Chrome']
toc: true
---

![](/uploads/2019/02/190223-f3634302e6a7067.jpg)

[Mac を使用して iPhone、iPad の Safari でデバッグを行う方法](/posts/2019/02/ios-safari-debug-mac-20190222/)で、iPhone の Safari でデバッグする方法をご紹介しました。iPhone、Mac の標準機能のみで実現できるものの、Mac の Safari を使用する必要があります。

今回は、Safari を使用する場合に比べて若干準備が面倒ではありますが、Mac の Google Chrome を使用して同様に iPhone でデバッグを行う方法をご紹介します。Google Chrome には、iPhone や Android をエミュレートする機能がありますが、iPhone 実機を使用してデバッグする方法です。

## Mac の Google Chrome を使用して、iPhone の Safari でデバッグする

iPhone 側の準備は、冒頭でご紹介した記事と同様のため詳細は割愛します。iOS の「設定」アプリから Safari の「Web インスペクタ」を有効化してください。

### Mac 側の準備

Google Chrome で iPhone の Safari をデバッグする場合、Google が提供する「iOS WebKit Debug Proxy（iwdp）」を使用します。

-   [google/ios-webkit-debug-proxy: A DevTools proxy (Chrome Remote Debugging Protocol) for iOS devices (Safari Remote Web Inspector).](https://github.com/google/ios-webkit-debug-proxy)

iwdp は、WebSocket 接続を介して USB 経由で接続された iOS の Safari に対して操作を行うことができるというものです。Mac であれば、Homebrew を使用することで簡単にインストールできる、はずだったのですが。iwdp を Homebrew 経由でインストールし起動したところ、iPhone を Mac に接続した際、下記のエラーが表示され正常にデバッグできませんでした。

```
Listing devices on :9221
Could not connect to lockdownd, error code -13. Exiting.
Unable to attach bc6e6b088a1ff62c736027a5bd8bd37b9090b89a inspector
```

これは、iwdp が依存する libimobiledevice と呼ばれるパッケージのバージョンが古いことに起因するバグのようです。Homebrew でパッケージをインストールした場合、最新の安定版（公開版）が自動的にダウンロードされます。しかし、公開されているバージョンでは上記のエラーが発生してしまうため、リポジトリから最新バージョンを意図的にインストールする必要がありした。

さらに、libimobiledevice は usbmuxd パッケージに依存します。libimobiledevice の最新版をインストールする場合は、usbmuxd もリポジトリから最新版を取得する必要があります。つまり、iwdp をインストールするための最短の手順は以下の通りです。ターミナルから実行してください。

```bash
brew install --HEAD usbmuxd
brew install --HEAD libimobiledevice
brew install ios-webkit-debug-proxy
```

### Mac の Google Chrome と、iPhone の Safari でデバッグを行う

iwdp のインストールが完了したら、任意の作業ディレクトリ上で以下のコマンドを実行します。

```bash
ios_webkit_debug_proxy
```

続いて、iPhone と Mac を USB ケーブル経由で接続します。

![](/uploads/2019/02/190223-1fdf0c57d3693281.png)

iPhone でこのような画面が表示されたら、「信頼」をタップしてください。iPhone と iwdp が無事に接続されたら、ターミナル上に以下のような文字列が表示されます。下記の例では、Mac（ローカルホスト）の 9222 番ポートで、iwdp（プロキシ）が待ち受けている状態です。

```
Listing devices on :9221
Connected :9222 to iPhone X (bc6e6b088a1ff62c736027a5bd8bd37b9090b89a)
```

接続が失敗した場合、`/var`ディレクトリ配下に一時ファイルが残存している可能性があります。接続できない場合は、Mac を再起動して、再度 iwdp を起動してください。

無事、iPhone を接続できたら、Mac の Google Chrome を開いて、アドレスバーに以下を入力します。なお、「Discover network targes」がオフの場合、正常に動作しませんので、オンにしておいてください。Google Chrome のデフォルトはオンです。

```http
chrome://inspect/#devices
```

続いて、iPhone の Safari でデバッグしたい Web ページを開きます。すると Mac の Google Chrome に「Remote Target」の一覧に、iPhone の Safari で開いた Web ページのタイトルと URL が表示されます。

![](/uploads/2019/02/190223-12dc169a3b205c95.png)

デバッグを行う場合は、Mac の Google Chrome で inspect をクリックしてください。

![](/uploads/2019/02/190223-49981de49a2eeeca.png)

無事に Google Chrome のデベロッパーコンソールが起動しました。デベロッパーコンソールの機能はすべて使用できます。DOM 操作をしたり、JavaScript のデバッグをしたり、Google Chrome のデベロッパーコンソールを使用して、良きデバッグライフを！
