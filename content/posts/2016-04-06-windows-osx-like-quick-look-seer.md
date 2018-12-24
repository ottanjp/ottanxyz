---
author: ottan
date: 2016-04-06 13:38:43+00:00
draft: false
title: Windowsで、macOSのQuick Lookを実現する「Seer」
type: post
url: /windows-osx-like-quick-look-seer-6850/
categories:
- Windows
tags:
- Tips
---

![](/images/2016/04/160423-571b71955920d-1.png)






Quick Lookといえば、macOSの代表的な機能であり、Finderで␣（スペース）を押すだけで、ファイルの内容をプレビューできる、とても素敵なものです。また、[Macを購入したら最初に導入しておきたいQuick Lookのプラグイン](https://ottan.xyz/quick-look-plugin-78/)でもご紹介しているように、プラグインと呼ばれるプログラムを導入することで、macOSの標準機能ではまかないきれないファイルのプレビューにも対応できるようになります。





これと同等の機能を、Windowsで実現したのが「Seer」です。



https://sourceforge.net/projects/ccseer/



「Seer」を使用すれば、Macと同様に、Windowsのファイルエクスプローラー上で、␣（スペース）を押すだけで、ファイルの内容をプレビューできるようになります。





## WindowsでQuick Lookを実現する「Seer」





![](/images/2016/04/160423-571b7184c673b-1.png)






インストーラーをダウンロードしたら、管理者権限で起動してください。具体的には、Windows 10の場合は、「右クリック」→「管理者として実行」となります。なお、「Seer」がサポートするWindowsは、Windows Vista以降となります（実質的にすべてのOS）。





![](/images/2016/04/160423-571b7199b85b3-1.png)






「Seer」のインストールが終わり、起動すると、簡単な使い方が表示されます。と言っても、何も意識する必要はありません。使い方は簡単。「Seer」を起動した状態で、内容をプレビューしたいファイルをファイルエクスプローラーで選択して、␣（スペース）を押すだけ。





![](/images/2016/04/160423-571b71aa262ab-1.png)






スクリーンショットもこの通り。わざわざ、「フォト」や「ペイント」を開く必要はありません。





![](/images/2016/04/160423-571b71bac7d6f-1.png)






フォルダーを選択した状態で、␣を押すと、フォルダーの内容をプレビューすることもできます。





![](/images/2016/04/160423-571b71cae629e-1.png)






マークダウン（Markdown）形式のファイルも、デフォルトでプレビューできます。macOSの場合は、別途プラグインを導入する必要があります。このファイルは、[github-cheat-sheet/README.ja.md at master · tiimgreen/github-cheat-sheet · GitHub](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.ja.md)からお借りしました。





Googleで検索する際に、「filetype:md GitHub」を指定して、最初に登場したのがこのファイルでした。





![](/images/2016/04/160423-571b71e0a1a0f-1.png)






ソースコードも、デフォルトでハイライトされます。とても便利です。





その他にも、以下のようなファイルに対応しています。






  * 写真、フォトショップ（.psd）、イラストレータ（.ai）
  * オーディオ、ビデオファイル
  * 圧縮ファイル（.zip、.tar）
  * テキストファイル
  * ソースコード（.php、.xml、.jsonなど）
  * PDFファイル（.pdf）
  * マークダウン（.md）
  * フォルダー




日常的にMacを使用していて、仕事でWindowsを使用する場合に、イマイチ物足りないなあと感じたら、WindowsにQuick Lookが存在しないせいかもしれません。MacのQuick Lookを愛する方、ぜひお試しください。
