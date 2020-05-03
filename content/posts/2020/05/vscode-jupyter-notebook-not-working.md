---
title: "VS Codeで「Failed to connect to Jupyter notebook」「Jupyter Server: Not
  Started」と表示されJupyter Notebookが起動できない場合の対処法"
date: 2020-05-03T00:00:00.000Z
tags:
  - Jupyter Notebook
  - Python
  - VSCode
categories:
  - Mac
slug: vscode-jupyter-notebook-not-working
---
VS Codeで[Python - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-python.python)の拡張機能を使用すると、Pythonで記述されたプログラムのデバッグや、Jupyter Notebook環境をVS Codeで実行できて大変重宝します。たまに、このJupyter Notebookが、以下のエラーにより起動しなくなったことがあったため、その対処法をメモしておきます。

```
Failed to connect to Jupyter notebook
Jupyter Server: Not Started
```

## 原因はワークスペースに複数のフォルダを追加している場合の環境設定

空のJupyter Notebookを起動すると、自動的にJupyter Notebook環境がローカルホスト上で起動します。また、選択されている仮想環境にJupyter Notebook起動に必要なパッケージが揃っているかどうかがチェックされ、揃っていない場合は自動的にインストールされます。

ただし、以下の条件が揃った場合にJupyter Notebook環境が自動的に起動しないことがあります。

* ワークスペースに複数のフォルダが追加されている
* 過去にVS Codeからリモート、もしくはローカルホスト上の別のJupyter Notebookに接続したことがある

![](/uploads/2020/05/screenshot-2020-05-03-15.56.51.png)

このような場合、空のJupyter Notebookを起動しても「Jupyter Server: Not Started」と表示され、Jupyter Serverが起動されていません。

![](/uploads/2020/05/screenshot-2020-05-03-15.57.05.png)

コマンドパレットを開き、「Python: Select Interpreter to start Jupyter Server」を選択、インタプリタ（仮想環境）を選択しても現象は変わりません。

![](/uploads/2020/05/screenshot-2020-05-03-16.02.04.png)

再びコマンドパレットを開き、「Python: Specify local or remote Jupyter server for connections」を選択します。

![](/uploads/2020/05/screenshot-2020-05-03-15.57.16.png)

VS Codeがローカルホストで自動的にJupyter Notebook環境を起動する「Default」（既定値）を設定し、VS Codeをリロードしても状況が変わりません。このJupyter Server選択時に、一度でも「Existing」やリモート（VS Code環境外）のJupyter Notebook環境に接続したことがある場合、この設定が元に戻らないことがあります。

### ワークスペース、もしくはフォルダー単位の設定を見直す

筆者の環境では、フォルダー単位の拡張機能の設定が原因でした。ワークスペースの設定は、「ユーザー」単位、「ワークスペース」単位、「フォルダー」単位とあるのですが、「フォルダー」単位の設定が上書きされてしまい優先されてしまっている可能性があります。

![](/uploads/2020/05/screenshot-2020-05-03-15.57.32.png)

今回、起動しなかった「playground」フォルダの設定を見ます。検索ボックスに「jupyter」と入力し、「Python > Data Science: Jupyter Server URI」の項目を探します。

![](/uploads/2020/05/screenshot-2020-05-03-15.57.51.png)

このように、過去に接続したことのあるJupyter NotebookのURIがそのまま残っており、先ほど「Default」環境を選択したにも関わらずフォルダの設定が上書きされていませんでした。「歯車」アイコンをクリックして「設定をリセット」するか、「local」と入力して、VS Codeをリロードします。

![](/uploads/2020/05/screenshot-2020-05-03-15.58.56.png)

もう一度、空のJupyter Notebookを開くと、今度は「Jupyter Server: local」と表示され、Jupyter Notebookが起動していることを確認できました。

なお、Jupyter Notebookの実行には、拡張機能が必要です。非常に便利な機能ですので、Pythonを利用されている場合は、ぜひ導入しておきましょう。

* [Python - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-python.python)