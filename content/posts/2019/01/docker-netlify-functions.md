---
author: ["@ottanxyz"]
date: 2019-01-20T22:10:18+09:00
draft: false
title: "Netlify FunctionsをDockerで実行する"
type: post
slug: docker-netlify-functions-20190120
categories: ["Mac", "Blog"]
tags: ["Docker", "Netlify"]
toc: true
---

![](/uploads/2019/01/190120-82e35302e706e67.png)

以前、Netlify Functions をローカル環境でエミュレートする方法、Netlify にデプロイする方法をご紹介しました。今回は、ローカル環境で開発した Netlify Fucntions をコンテナ技術の理解を深めるために Docker で実行してみます。前回作成したアプリケーションをもとに話を進めますので、まだの方はそちらを一読されてから読み進めることをオススメします。

<!-- textlint-disable -->

- [無償で利用可能な Netlify Functions（AWS Lambda）で学ぶサーバレスプログラミングの基本](/posts/2019/01/netlify-functions-aws-lambda-serverless-20190115/)

<!-- textlint-enable -->

## Node.js のアプリケーションを Docker のコンテナで実行する

Docker Hub に公開されている[node - Docker Hub](https://hub.docker.com/_/node)のイメージを利用して、Docker コンテナ上で Netlify Functions を実行します。また、作成したアプリケーションを実行するだけでなく、アプリケーションを開発する環境も整えてみます。

### Dockerfile

空のイメージ（スクラッチ）を使用して一から環境を構築しても良かったのですが、Node.js の公式テンプレートが Docker Hub に公開されているため、今回はそちらを使用します。`Dockerfile`を作成しましょう。

```dockerfile
# Docker HubのNode.js 8.15のイメージを取得
FROM node:carbon
# COPY、RUNの作業ディレクトリを作成して移動
WORKDIR /app
# NODE_ENV環境変数を指定
ENV NODE_ENV=production
# カレントディレクトリのpackage.jsonとyarn.lockファイルを作業ディレクトリにコピー
COPY package.json yarn.lock ./
# 必要パッケージのインストール
RUN yarn install --frozen-lockfile --no-cache --production
# 現在のディレクトリのファイルを作業ディレクトリにコピー
COPY . .
# Netlify Functionsのビルド
RUN yarn build:server
# 9000番ポートを使用
EXPOSE 9000
# Netlify Functionsを起動
CMD [ "yarn", "start:server" ]
```

`Dockerfile`の各行にコメントを補記していますので、そちらも参照してください。簡単な流れを説明すると以下の通りとなります。前回ご紹介した記事を、コンテナ内で実行しているだけであることがお分かりいただけたでしょうか。

1. `yarn`で必要なパッケージのみインストール
2. `yarn build:server`で`netlify-lambda build`を実行
3. `yarn start:server`で 9000 番ポートを使用してリッスン

### .dockerignore

上記の`Dockerfile`のままビルドしても良いのですが、このままでは`COPY`命令実行時にカレントディレクトリの不要ファイルがすべてコピーされてしまいます。`COPY`ファイルから除外したいファイルがある場合は、`Dockerfile`と同一階層に`.dockerignore`ファイルを作成します。記述方法は`.gitignore`と同様です。

```
.dockerignore
.DS_Store
.git
Dockerfile
node_modules
npm-debug.log
README.md
/dist
/publish
```

### コンテナのビルド、起動

これで準備は整いました。実際にコンテナのイメージを作成し、コンテナを起動します。今回はビルドしたイメージに`netlify-functions`というタグを付与しました。`-t`はタグを付与するオプションです。

```bash
docker build -t netlify-functions .
docker run -d -p 9000:9000 netlify-functions
```

コンテナが起動したかどうかは、`docker ps`で確認できます。もし、コンテナの起動に失敗している場合は、`docker logs <conainer id>`でエラーの原因を追えます。`<container id>`は、`docker run`実行時の標準出力で確認できます。

起動に失敗する原因のほとんどは、`package.json`の不備によるインストールパッケージの過不足です。`package.json`の記述内容を見直した上で、再度`docker build`コマンドを実行してみましょう。

無事起動できた場合はブラウザを開いて以下の URL にアクセスしてみましょう。`Hello, World!`と画面上に表示されましたか？

```http
http://localhost:9000/.netlify/functions/hello
```

## Docker 環境で Netlify Functions を開発する

<!-- textlint-disable -->

さて、ここまでは**既製のアプリケーションを Docker で実行する方法**を見てきました。ここからは手法を変えて、Docker 上で Node.js のアプリケーションを開発する方法をご紹介します。ただ、`netlify-lambda`や`nvm`などローカルホスト上で Netlify Functions を簡単にエミュレートする方法があるため、あえて Docker コンテナ上で開発するメリットはあまりありません。

<!-- textlint-enable -->

`docker run`コマンドのオプションに`-v`があります。これは、ローカルホストのボリュームをコンテナにマウントします。ローカルホストで編集したファイルの変更をコンテナに簡単に反映できます。たとえば、`docker run`コマンド実行時に、以下のように実行します。

```bash
docker run --rm -it -p 9000:9000 -v $(pwd):/app netlify-functions /bin/bash
```

`--rm`オプションは、コンテナ停止時に自動的にコンテナを削除するためのオプションです。`-it`は、コンテナ内でインタラクティブなシェル（今回は、`/bin/bash`）を実行するためのオプションです。

そして、重要なオプションが`-v`です。上記ではホスト OS のカレントディレクトリを、コンテナの`/app`ディレクトリにマウントしています。ホスト OS（つまり、Mac）のカレントディレクトリで変更した内容は、すぐにコンテナの`/app`ディレクトリに反映されます。

```bash
yarn global add nodemon
nodemon src/lambda/*.js
```

さて、上記のコマンドを実行するとコンテナ上で対話型シェルを実行できる状態になります。Node.js にはソースコードの変更を検知し、変更があれば自動的にリロードしてくれる便利な`nodemon`というモジュールがあります。コンテナ内でソースコードの変更を監視し、ホスト OS 上でのアプリケーションの修正をすぐにコンテナに反映させることができます。

以上で、ローカルホスト上に Node.js の実行環境を一切持たずに（Docker の実行環境は必要）、開発環境を整えることができました。

#### Volume オプションについて

`docker run`実行時に指定した`-v`オプションは非常に強力ですが、使い方には注意が必要です。`-v`オプションは、ホスト OS 上で実行するプロセス（コンテナ）が、自由にホスト OS のファイルを読み書きできることを意味します。今回は、開発環境を整える目的で使用しましたが、商用環境等での使用は控えてなるべく`COPY`命令等を使用するべきでしょう。`COPY`命令は一方通行です。

## まとめ

いかがでしたでしょうか。Docker で実行しようと思ったきっかけは、毎回`yarn start:server`するのが面倒で常時プロセスとして起動しておきたかったからです。別にコンテナは必須要件ではなくバックグラウンドで起動しておくという手もあったのですが、Docker を久しく持て余していたということもあり、`Dockerfile`から作成してみました。ぜひ Docker で遊んでみてくださいね。
