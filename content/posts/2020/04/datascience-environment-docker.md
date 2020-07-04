---
author: ["@ottanxyz"]
title: データ分析（データサイエンス）に必要な環境（Jupyter Lab）を一発で整えるワンライナー
date: 2020-04-26
tags:
  - Docker
  - Jupyter Lab
  - Python
categories:
  - Mac
slug: datascience-environment-docker
---
Docker使いましょう。

[GitHub](https://github.com/jupyter/docker-stacks)で公開されている、Dockerイメージのテンプレートからコンテナを起動するだけで、データ分析に大抵の場合に必要なPythonのライブラリ（例えば、Pandas、Numpy等）が一式揃った環境を用意できます。

Dockerさえインストールされていれば、プラットフォームを問わず使用できるので便利です。また、全てコンテナ内でモノが揃うので、ホストOSの環境を汚すこともありません。ホストOSに、Pythonがインストールされている必要すらないのです。

```zsh
docker run --rm -p 10000:8888 -e JUPYTER_ENABLE_LAB=yes -v "$PWD":/home/jovyan/work jupyter/datascience-notebook:9b06df75e445
```

ホストOSで`8888`番ポートを既に使用している場合、競合するため適宜変更してください。また、環境変数である`JUPYTER_ENABLE_LAB`を`yes`に設定することで、Jupyter Notebookの代わりにLabを起動できます。また、カレンとディレクトリをコンテナにマウントするため、作業ディレクトリ（例えば、ノートブックが存在するディレクトリ）に移動してから起動しましょう。

あとは、ブラウザから以下のURLへアクセスするだけです。ターミナル上にURLが表示されますので、そちらをクリックして起動してください。

```
    To access the notebook, open this file in a browser:
        file:///home/jovyan/.local/share/jupyter/runtime/nbserver-6-open.html
    Or copy and paste one of these URLs:
        http://64ce6629900e:8888/?token=8aeba014e2affe112f62056f3715f8ff35b00197420aad2c
     or http://127.0.0.1:8888/?token=8aeba014e2affe112f62056f3715f8ff35b00197420aad2c
```

- [Jupyter Docker Stacks
](https://github.com/jupyter/docker-stacks)
