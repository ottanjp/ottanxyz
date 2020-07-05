---
author: ["@ottanxyz"]
date: 2016-04-06T00:00:00+00:00
draft: false
title: Windowsで、macOSのQuick Lookを実現する「Seer」
type: post
slug: windows-osx-like-quick-look-seer-6850
categories:
  - Windows
tags:
  - Tips
---

![](/uploads/2016/04/160423-571b71955920d-1.png)

Quick Look といえば、macOS の代表的な機能であり、Finder で ␣（スペース）を押すだけで、ファイルの内容をプレビューできる、とても素敵なものです。また、[Mac を購入したら最初に導入しておきたい Quick Look のプラグイン](/posts/2014/09/quick-look-plugin-78/)でもご紹介しているように、プラグインと呼ばれるプログラムを導入することで、macOS の標準機能ではまかないきれないファイルのプレビューにも対応できるようになります。

これと同等の機能を、Windows で実現したのが「Seer」です。

https://sourceforge.net/projects/ccseer/

「Seer」を使用すれば、Mac と同様に、Windows のファイルエクスプローラー上で、␣（スペース）を押すだけで、ファイルの内容をプレビューできるようになります。

## Windows で Quick Look を実現する「Seer」

![](/uploads/2016/04/160423-571b7184c673b-1.png)

インストーラーをダウンロードしたら、管理者権限で起動してください。具体的には、Windows 10 の場合は、「右クリック」→「管理者として実行」となります。なお、「Seer」がサポートする Windows は、Windows Vista 以降となります（実質的にすべての OS）。

![](/uploads/2016/04/160423-571b7199b85b3-1.png)

「Seer」のインストールが終わり、起動すると、簡単な使い方が表示されます。と言っても、何も意識する必要はありません。使い方は簡単。「Seer」を起動した状態で、内容をプレビューしたいファイルをファイルエクスプローラーで選択して、␣（スペース）を押すだけ。

![](/uploads/2016/04/160423-571b71aa262ab-1.png)

スクリーンショットもこの通り。わざわざ、「フォト」や「ペイント」を開く必要はありません。

![](/uploads/2016/04/160423-571b71bac7d6f-1.png)

フォルダーを選択した状態で、␣ を押すと、フォルダーの内容をプレビューすることもできます。

![](/uploads/2016/04/160423-571b71cae629e-1.png)

マークダウン（Markdown）形式のファイルも、デフォルトでプレビューできます。macOS の場合は、別途プラグインを導入する必要があります。このファイルは、[github-cheat-sheet/README.ja.md at master · tiimgreen/github-cheat-sheet · GitHub](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.ja.md)からお借りしました。

Google で検索する際に、「filetype:md GitHub」を指定して、最初に登場したのがこのファイルでした。

![](/uploads/2016/04/160423-571b71e0a1a0f-1.png)

ソースコードも、デフォルトでハイライトされます。とても便利です。

その他にも、以下のようなファイルに対応しています。

- 写真、フォトショップ（.psd）、イラストレータ（.ai）
- オーディオ、ビデオファイル
- 圧縮ファイル（.zip、.tar）
- テキストファイル
- ソースコード（.php、.xml、.json など）
- PDF ファイル（.pdf）
- マークダウン（.md）
- フォルダー

日常的に Mac を使用していて、仕事で Windows を使用する場合に、イマイチ物足りないなあと感じたら、Windows に Quick Look が存在しないせいかもしれません。Mac の Quick Look を愛する方、ぜひお試しください。
