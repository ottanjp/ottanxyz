---
author: ["@ottanxyz"]
title: macOS CatalinaのPythonのデフォルトを3.x.xにする
date: 2020-04-26T00:00:00+00:00
tags:
  - Python
categories:
  - Mac
slug: macos-catalina-python3-default
---
macOS Catalinaに搭載されているPythonの実行環境を3.x.xへ変更する方法です。ただ、`python`コマンドで、3.x.xを実行したいだけの記事です。Pythonの開発環境についてどうこう議論する場でないことは最初に申し上げておきます。次期のmacOSでは、Python 2.x.x系は駆逐されているでしょう。以下の環境で確認しています。

```
ProductName:	Mac OS X
ProductVersion:	10.15.4
BuildVersion:	19E266
```

まず、搭載されているバージョンを調べてみます。

```zsh
$ python -V
Python 2.7.16
```

`/usr/bin`配下に`python3`コマンドがあります。

```zsh
$ /usr/bin/python3 -V
Python 3.7.3
```

## エイリアス

`python`コマンドのデフォルトを3.x.xへ変更します。いくつかの方法が考えられます。例えば、以下のようにエイリアスを変更することで、そのシェルでは`python`は`/usr/bin/python3`を参照するようになります。最も手軽に変更できる方法です。

```zsh
alias python=/usr/bin/python3
```

`pip`も忘れないように変更しておきましょう。

```zsh
alias pip=/usr/bin/pip3
```

別にエイリアスでも構わないのですが、Catalina標準で搭載されているPythonのバージョンが少々古いので変更したいと思います。

## Homebrew

HomebrewでPython 3.x.xをインストールできます。Homebrewのリポジトリの状況にもよりますが、常に最新を追いかけていくことができます。

```zsh
brew install python
```

以下のコマンドで表示されるパスをエイリアスへ登録するだけでOKです。これで、`python`コマンドがいつでも最新バージョンになります。

```zsh
$ brew info python
...
Python has been installed as
  /usr/local/bin/python3
...
```

## pyenv

どうせなら、様々なPythonの処理系を共存させてみます。

公式のインストーラでも良いのですが、バージョンマネージャとしてはPyenvがやはり便利です。必要かどうかは人それぞれです。[pyenvが必要かどうかフローチャート - Qiita](https://qiita.com/shibukawa/items/0daab479a2fd2cb8a0e7)あたりが参考になりそうです。確かに、**必須かどうかと言われると微妙**な立ち位置ですが、記事の通り便利ですよ。

Homebrewでのインストールが簡単です。

```zsh
brew install pyenv
```

続いて、`~/.zshrc`に以下を追記します。Bashをお使いの場合は、`~/.bash_profile`に読み替えてください。

```zsh
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc
```

シェルを再起動します。`$0`は現在のシェルを指します。

```zsh
exec $0
# もしくは
source ~/.zshrc
```

以下のコマンドで、インストール可能なバージョンの確認ができます。

```zsh
pyenv install -l
```

例えば、最新の`3.8.2`をインストールします。

```zsh
pyenv install 3.8.2
```

デフォルトのバージョンを変更します。

```zsh
pyenv global 3.8.2
exec $0 # シェルの再起動
```

もう一度、`python`コマンドを実行してみます。

```zsh
$ python -V
Python 3.8.2
```

無事変更されました！`pip`は、と言うと。

```zsh
$ pip -V
pip 19.2.3 from /Users/xxx/.pyenv/versions/3.8.2/lib/python3.8/site-packages/pip (python 3.8)
```

バッチリです！Node.jsやRubyのように、マイナーバージョンを強く意識することはあまりないPythonなので、確かにここまで意識する必要はないのかもしれません。

なお、Pyenvでは、AnacondaやMinicondaのバージョン共存もできるなど、なかなかに混沌としかねない状況ですので、取り扱いにはご注意ください。

* [pyenv/pyenv: Simple Python version management](https://github.com/pyenv/pyenv)
