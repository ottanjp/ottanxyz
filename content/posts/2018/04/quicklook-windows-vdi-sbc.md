---
author: ["@ottanxyz"]
date: 2018-04-08 13:28:47+00:00
draft: false
title: インストール不要、管理者権限不要！VDI、SBC環境でも動作するWindowsでQuickLookを実現する「QuickLook」
type: post
slug: quicklook-windows-vdi-sbc-6694
categories:
  - Windows
tags:
  - QuickLook
  - Windows 10
---

![](/uploads/2018/04/180408-5aca13741dea3.jpg)

Windows 環境で QuickLook を実現するソフトウェアといえば、[Windows で、macOS の Quick Look を実現する「Seer」](/posts/2016/04/windows-osx-like-quick-look-seer-6850/)をご紹介しました。しかし、「Seer」のインストールには管理者権限が必須であり、VDI（Virtual Desktop Infrastructure）や SBC（Server Based Computing）など、通常 ActiveDirectory 等のセキュリティポリシーで権限が制限されている職場環境で使用できないのがネックでした。Mac で QuickLook に慣れている身としては、職場の Windows（Windows Server 2008 R2）でも QuickLook を使用したい。そこで、行き着いたのが、その名も「QuickLook」でした。

## Windows で QuickLook を実現する「QuickLook」

[QuickLook](http://pooi.moe/QuickLook/)は、GitHub 上で GPN ライセンスのオープンソースとして公開されており、インストーラー（MSI 形式）、アーカイブ（ZIP 形式）、Microsoft Store 版（Windows 10 のみ）がそれぞれ公開されています。インストーラー形式が推奨されていますが、アーカイブ版との違いは、「ファイル・フォルダーを開く」ダイアログ時にプレビューできるかどうかの違いであり、前述のように「msi ファイルによるインストーラーが起動できない」「管理者権限がない」「C:¥Program Files にアクセス権限がない」といった場合にも使用できます。

また、Microsoft Store 版は Windows 10 のみで使用可能ですが、GitHub で最新版が公開されてから Microsoft Store 版に反映されるまで、1〜3 日程度かかるため、Microsoft Store しか使用できないという方以外は、インストーラーを使用することを推奨します。

### Windows 10 でアーカイブ版を使用するとクラッシュする？

筆者の環境では再現しなかったのですが、GitHub の Issue に公開されている情報によると、Windows 10 環境でアーカイブ版の QuickLook を使用しようとすると、クラッシュするという事象が報告されているようです。[Cannot start on Window 10 · Issue #1 · xupefei/QuickLook · GitHub](https://github.com/xupefei/QuickLook/issues/1)にあるように、インストール前にアーカイブファイルのロックを解除する必要がありますので、クラッシュしてしまうという方は試してみてください。

### QuickLook の使い方

インストーラー形式の場合、インストール完了後に自動起動、アーカイブ版の場合は、展開したフォルダー内の「QuickLook.exe」をダブルクリックで起動します。なお、アーカイブ版で Windows 再起動後も自動起動するようにするためには、「スタートアップ」フォルダーに「QuickLook.exe」のショートカットをおいてください。

「QuickLook」起動後は、バックグラウンドで動作し続けます（サービスではないため、一般ユーザ権限で起動可能）。あとは、Mac 同様、プレビューしたいファイルを選択して「スペース」キーを押すだけです。

### ソースコードのシンタックスハイライトや Markdown にも対応

Mac でも[Mac を購入したら最初に導入しておきたい Quick Look のプラグイン](/posts/2014/09/quick-look-plugin-78/)でご紹介しているように、プラグインを導入することで、QuickLook にさまざまな機能が提供されていますが、今回ご紹介する QuickLook もさまざまな形式のファイルに対応しています。

また、[GitHub - xupefei/QuickLook: Bring macOS “Quick Look” feature to Windows](https://github.com/xupefei/QuickLook)の構造からわかるように、将来的には QuickLook の API 自体が解放され、ユーザーが自由に拡張機能として機能を追加できるようになるのかもしれません。（なお、ソースコードは C#で記述されています）

![](/uploads/2018/04/180408-5aca137ce94f1.png)

QuickLook のソースコードを「QuickLook」でプレビューしたところ。シンタックスハイライトにより、ソースコードがわかりやすく表示されます。

![](/uploads/2018/04/180408-5aca1385250c3.png)

GitHub で公開されている Markdown 形式の「README.md」も綺麗に表示されます。なお、プレビューしたファイルは、関連付けされているアプリケーションでそのまま開くこともできます。

また、Mac ではデフォルトでは無効ですが、プレビューしたファイル内のテキストをコピーすることもできます。Excel や Word にも対応しているので職場で活躍しそうですね！
