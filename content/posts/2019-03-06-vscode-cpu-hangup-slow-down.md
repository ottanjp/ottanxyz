---
author: ottan
date: 2019-03-06T22:20:45+09:00
draft: false
title: "VS Code（Code Helper）のCPU使用率が100%になってしまった場合のワークアラウンド"
type: post
url: /vscode-cpu-hangup-slow-down-20190303/
categories: ["Mac"]
tags: ["VS Code"]
toc: true
---

![](/images/2019/03/190306-2730d936a56a3381.jpg)

Macの動作が重くなってしまったため、アクティビティモニターを眺めていたところ、「Code Helper」と呼ばれるプロセスがCPUを占有していました。同プロセスは、VS Codeの子プロセスで、複数のプロセスが起動します。拡張機能の一部が暴走している可能性があるのかと思い、拡張機能の停止や削除を繰り返したのですが事象はおさまりません。今回は、VS Codeを使用していてMac全体の動作が重くなった場合の、ワークアラウンドをご紹介します。

```
ProductName:	Mac OS X
ProductVersion:	10.14.3
BuildVersion:	18D109
```

## VS Codeのプロセス「Code Helper」の暴走を止めるワークアラウンド

将来的なVS Codeのアップデート、もしくは関連する拡張機能のアップデート等で解消される可能性があります。VS Code 1.31.1における対処法をご紹介します。

### 気が付いたらCPU使用率が100%になる「Code Helper」

![](/images/2019/03/190306-4f7e55be1bf1770e.png)

このように「Code Helper」のCPU使用率が100%近くまで上昇しています。この状態になると、CPUのファンがフル回転し、Mac全体の動作が重くなり、何もできなくなります。また、このプロセスはVS Codeの再起動でも停止せず、永遠と残り続けているため、何かしらのバグと考えられるのですが。

### 導入済みの拡張機能

参考までに事象が発生した環境における拡張機能の導入状況です。

```
budparr.language-hugo-vscode
bungcip.better-toml
christian-kohler.npm-intellisense
CoenraadS.bracket-pair-colorizer
dbaeumer.jshint
dbaeumer.vscode-eslint
eamodio.gitlens
eg2.vscode-npm-script
esbenp.prettier-vscode
formulahendry.auto-close-tag
GitHub.vscode-pull-request-github
mikestead.dotenv
mrmlnc.vscode-remark
ms-vscode.atom-keybindings
ms-vsliveshare.vsliveshare
rusnasonov.vscode-hugo
shardulm94.trailing-spaces
taichi.vscode-textlint
yzhang.markdown-all-in-one
```

なお、拡張機能の一覧を取得するためには、ターミナルから以下のコマンドを実行します。

```bash
code --list-extensions
```

### 「Code Helper」の暴走を止めるワークアラウンド

VS CodeのIssueに同様の報告がありました。他のIssueも参照してみたのですが、現段階では下記のワークアラウンドがもっとも効果的でした。

- [Code Helper using almost 100% CPU · Issue #31328 · Microsoft/vscode](https://github.com/Microsoft/vscode/issues/31328)

#### settings.jsonに以下を追加する

<kbd>&#8984;</kbd> + <kbd>&#8679;</kbd> + <kbd>P</kbd>でコマンドパレットを開きます。「Open Settings (JSON)」を検索して開きます。ユーザー毎の設定ファイル（`settings.json`）が開くため、下記の設定を追記します。

```json
"files.useExperimentalFileWatcher": true,
"files.exclude": {
	"/.git": true,
	"/.DS_Store": true,
	"/node_modules": true,
	"/node_modules/": true
},
"search.exclude": {
	"/node_modules": true
},
"files.watcherExclude": {
	"/node_modules/": true
}
```

上記は、`.git`や`node_modules`などのディレクトリ配下の監視を停止するための記述です。`useExperimentalFileWatcher`の詳細は不明です。「Experimental」のため、将来的に実装される実験的な機能のようですが、これを使用するように設定を変更します。残念ながら、設定を変更することによる影響は、現段階ではわかっていません。とりあえず、今までできていたことができなくなる、ということには遭遇していません。

他のパッケージマネージャー（Composerなど）を使用している場合は、それらのディレクトリも除外しておいたほうが良いかもしれません。

#### VS Codeの再起動

`settings.json`を編集したら、設定を反映させるためにVS Codeを再起動します。

#### 「Code Helper」のプロセスを強制終了する

アクティビティモニターを開き、CPU使用率が100%近くになっている「Code Helper」のプロセスを強制終了します。

![](/images/2019/03/190306-4f7e55be1bf1770e.png)

## まとめ

MacやPC全体が重くなってしまった場合、VS Codeのプロセスが暴走している可能性があります。アクティビティモニターやタスクマネージャーを開き、「Code Helper」が暴走していないか、確認してみてください。
