---
title: VS CodeでRubyで書かれたプログラムを簡単デバッグ
date: 2020-05-06
tags:
  - Ruby
  - VS Code
categories:
  - Mac
slug: ruby-vscode-debug
---
VS Codeで、Rubyで書かれたプログラムをデバッグする方法です。単一のRubyファイルをデバッグするためのものであり、RSpec、およびRuby on Railsなどのフレームワークを用いたプログラムは対象外です。

## rbenvによる環境構築

環境の確認です。Macで確認していますが、Windows 10でも同様です。今回は、Rubyのバージョン管理マネージャである`rbenv`を使用します。本記事執筆時点で最新版である2.7.1を使用して確認します。

```zsh
cd /project # デバッグ対象のプログラムが存在するディレクトリを指定
rbenv install 2.7.1
rbenv local 2.7.1
gem install ruby-debug-ide # Rubyのデバッグ用Gem
```

Rubyのバージョンは以下の通りです。

```zsh
$ ruby -v
ruby 2.7.1p83 (2020-03-31 revision a0c7c23c9c) [x86_64-darwin19]
```

VS Codeを起動します。

```zsh
code . # カレントディレクトリでVS Codeを起動
```

なお、Rubyのデバッグには以下の拡張機能が必要です。

* [Ruby - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)

## VS CodeによるRubyプログラムのデバッグ

VS Codeが自動的にデバッグ環境を構成してくれます。「実行」→「構成を追加」を選択します。もしくは、デバッグのアイコンをクリックして、「launch.json ファイルを作成します。」を選択します。

![](/uploads/2020/05/screenshot-2020-05-05-22.04.21.png)

今回は、Rubyで書かれたプログラムのデバッグを行いたいので、「Ruby」を選択します。

![](/uploads/2020/05/screenshot-2020-05-05-22.04.34.png)

単一のローカルファイル（ローカルファイルから他のRubyファイルを参照していても可）のデバッグを行うため、今回は「Debug Local File」を選択します。

![](/uploads/2020/05/screenshot-2020-05-05-22.04.41.png)

作成される、`launch.json` は以下の通りです。

```json
{
    // IntelliSense を使用して利用可能な属性を学べます。
    // 既存の属性の説明をホバーして表示します。
    // 詳細情報は次を確認してください: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Local File",
            "type": "Ruby",
            "request": "launch",
            "program": "${workspaceRoot}/main.rb"
        }
    ]
}
```

上記の通り、ワークスペースのルートディレクトリ直下にある`main.rb`が実行されます。そこで、ルートディレクトリ直下に`main.rb`ファイルを作成し、以下のコードを記述します。

```ruby
p "Hello, Ruby!"
```

F5キー、もしくは「実行」→「デバッグの開始」を選択します。

![](/uploads/2020/05/screenshot-2020-05-05-22.06.20.png)

「デバッグコンソール」に、標準出力の結果が出力されました！

## 参考リンク

* [Ruby - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)
* [rbenv/rbenv: Groom your app’s Ruby environment](https://github.com/rbenv/rbenv)
* [ruby-debug/ruby-debug-ide: An interface which glues ruby-debug to IDEs like Eclipse (RDT), NetBeans and RubyMine.](https://github.com/ruby-debug/ruby-debug-ide)