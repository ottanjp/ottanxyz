---
author: ottan
date: 2018-04-08 13:28:47+00:00
draft: false
title: インストール不要、管理者権限不要！VDI、SBC環境でも動作するWindowsでQuickLookを実現する「QuickLook」
type: post
url: /quicklook-windows-vdi-sbc-6694/
categories:
- Windows
tags:
- QuickLook
- Windows 10
---

![](/images/2018/04/180408-5aca13741dea3.jpg)






Windows環境でQuickLookを実現するソフトウェアといえば、[Windowsで、macOSのQuick Lookを実現する「Seer」](/windows-osx-like-quick-look-seer-3780/)をご紹介しました。しかし、「Seer」のインストールには管理者権限が必須であり、VDI（Virtual Desktop Infrastructure）やSBC（Server Based Computing）など、通常ActiveDirectory等のセキュリティポリシーで権限が制限されている職場環境で使用できないのがネックでした。MacでQuickLookに慣れている身としては、職場のWindows（Windows Server 2008 R2）でもQuickLookを使用したい。そこで、行き着いたのが、その名も「QuickLook」でした。





## WindowsでQuickLookを実現する「QuickLook」





[QuickLook](http://pooi.moe/QuickLook/)は、GitHub上でGPNライセンスのオープンソースとして公開されており、インストーラー（MSI形式）、アーカイブ（ZIP形式）、Microsoft Store版（Windows 10のみ）がそれぞれ公開されています。インストーラー形式が推奨されていますが、アーカイブ版との違いは、「ファイル・フォルダーを開く」ダイアログ時にプレビューできるかどうかの違いであり、前述のように「msiファイルによるインストーラーが起動できない」「管理者権限がない」「C:¥Program Filesにアクセス権限がない」といった場合にも使用できます。





また、Microsoft Store版はWindows 10のみで使用可能ですが、GitHubで最新版が公開されてからMicrosoft Store版に反映されるまで、1〜3日程度かかるため、Microsoft Storeしか使用できないという方以外は、インストーラーを使用することを推奨します。





### Windows 10でアーカイブ版を使用するとクラッシュする？





筆者の環境では再現しなかったのですが、GitHubのIssueに公開されている情報によると、Windows 10環境でアーカイブ版のQuickLookを使用しようとすると、クラッシュするという事象が報告されているようです。[Cannot start on Window 10 · Issue #1 · xupefei/QuickLook · GitHub](https://github.com/xupefei/QuickLook/issues/1)にあるように、インストール前にアーカイブファイルのロックを解除する必要がありますので、クラッシュしてしまうという方は試してみてください。





### QuickLookの使い方





インストーラー形式の場合、インストール完了後に自動起動、アーカイブ版の場合は、展開したフォルダー内の「QuickLook.exe」をダブルクリックで起動します。なお、アーカイブ版でWindows再起動後も自動起動するようにするためには、「スタートアップ」フォルダーに「QuickLook.exe」のショートカットをおいてください。





「QuickLook」起動後は、バックグラウンドで動作し続けます（サービスではないため、一般ユーザ権限で起動可能）。あとは、Mac同様、プレビューしたいファイルを選択して「スペース」キーを押すだけです。





### ソースコードのシンタックスハイライトやMarkdownにも対応





Macでも[Macを購入したら最初に導入しておきたいQuick Lookのプラグイン](/quick-look-plugin-78/)でご紹介しているように、プラグインを導入することで、QuickLookにさまざまな機能が提供されていますが、今回ご紹介するQuickLookもさまざまな形式のファイルに対応しています。





また、[GitHub - xupefei/QuickLook: Bring macOS “Quick Look” feature to Windows](https://github.com/xupefei/QuickLook)の構造からわかるように、将来的にはQuickLookのAPI自体が解放され、ユーザーが自由に拡張機能として機能を追加できるようになるのかもしれません。（なお、ソースコードはC#で記述されています）





![](/images/2018/04/180408-5aca137ce94f1.png)






QuickLookのソースコードを「QuickLook」でプレビューしたところ。シンタックスハイライトにより、ソースコードがわかりやすく表示されます。





![](/images/2018/04/180408-5aca1385250c3.png)






GitHubで公開されているMarkdown形式の「README.md」も綺麗に表示されます。なお、プレビューしたファイルは、関連付けされているアプリケーションでそのまま開くこともできます。





また、Macではデフォルトでは無効ですが、プレビューしたファイル内のテキストをコピーすることもできます。ExcelやWordにも対応しているので職場で活躍しそうですね！
