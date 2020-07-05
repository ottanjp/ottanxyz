---
author: ["@ottanxyz"]
title: Python:3.xコンテナでMeCab + IPADIC + NEologdをシステム辞書として使用するためのDockerfile
date: 2020-05-09T00:00:00+00:00
tags:
  - Docker
  - MeCab
  - Python
categories:
  - Mac
slug: dockerfile-python-mecab-ipadic-neologd
---
[python - Docker Hub](https://hub.docker.com/_/python)で公開されているコンテナイメージをベースとして、MeCab + IPADIC + NEologdを使用するためのDockerfileを公開します。NEologdは、IPAが公開する辞書であるIPADICとの併用が推奨されています。今回は、IPADIC + NEologdを、MeCabのシステム辞書として使用します。

{{< gist ottanjp 66b6686421cbaf5560c7c78fabc2696e >}}

## 詳細

MeCab + IPADIC + NEologdを使用するための流れをご紹介します。

```docker
RUN apt-get install -y libmecab2 libmecab-dev mecab mecab-utils nkf
```

まず、MeCabとユーティリティである`mecab-utils`を`apt-get`コマンドでインストールします。なお、Dockerfileでは`apt`ではなく`apt-get`の利用が推奨されています。`mecab-utils`は、後ほどシステム辞書の生成に利用します。また、`nkf`は、IPAが公開している辞書のCSVファイルの文字コードがEUC-JPであり、UTF-8へ変換するために使用します。

```docker
RUN wget -O mecab-ipadic-2.7.0-20070801.tar.gz "https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7MWVlSDBCSXZMTXM"
RUN tar xvzf mecab-ipadic-2.7.0-20070801.tar.gz
RUN nkf --overwrite -Ew mecab-ipadic-2.7.0-20070801/*
```

`wget`コマンドでIPAの辞書をダウンロードします。2020/5/8時点では上記のURLですが、今後変更される可能性があるため注意してください。ダウンロードしたCSVファイル郡の文字コードを、全てEUC-JPからUTF-8へ変更します。

```docker
RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
RUN xz -dkv mecab-ipadic-neologd/seed/*seed*
RUN mv mecab-ipadic-neologd/seed/*.csv mecab-ipadic-2.7.0-20070801/
```

続いて、[neologd/mecab-ipadic-neologd: Neologism dictionary based on the language resources on the Web for mecab-ipadic](https://github.com/neologd/mecab-ipadic-neologd)のリポジトリをクローンしておきます。コミットの全履歴は必要がないため、`--depth 1`オプションを付与します。ダウンロード後に、リポジトリ内のCSVファイル（対象は`/seed/*seed*/`）がアーカイブされているため解凍します。最後に、IPAの辞書とマージするため、IPAのダウンロード先へ全てのCSVファイルを移動します。

```docker
WORKDIR /mecab-ipadic-2.7.0-20070801
RUN /usr/lib/mecab/mecab-dict-index -f utf-8 -t utf-8
RUN ./configure && make install
```

続いて、作業ディレクトリを移動してシステム辞書の作成を行います。文字コードは`UTF-8`を指定します。`mecab-dict-index`コマンドが辞書のインデックスを生成するためのコマンドですが、`mecab-utils`に同梱されています。ユーティリティのインストールディレクトリはOSによって異なるため、都度確認が必要です。最後にビルドしたらインストール完了です。

```docker
RUN echo 'dicdir=/usr/lib/x86_64-linux-gnu/mecab/dic/ipadic' > /etc/mecabrc
```

辞書のインストールは完了しましたが、MeCabのシステム辞書として認識させるためには、もう一手間必要です。MeCab全体の設定は、`mecabrc`ファイルに記載します。同ファイルの格納場所もOSによって異なります。`mecab-config --sysconfdir`によって格納場所を確認できます。今回は、`/etc`直下であったため、MeCabにシステム辞書として認識させるために、`echo`コマンドでパスを上書きします。なお、デフォルトの`/etc/mecabrc`ファイルは以下のようになっていました。

```
;
; Configuration file of MeCab
;
; $Id: mecabrc.in,v 1.3 2006/05/29 15:36:08 taku-ku Exp $;
;
dicdir = /var/lib/mecab/dic/debian

; userdic = /home/foo/bar/user.dic

; output-format-type = wakati
; input-buffer-size = 8192

; node-format = %m\n
; bos-format = %S\n
; eos-format = EOS\n
```

`dicdir`以外は全てコメントアウトされているため、今回はそのまま上書きしましたが、必要に応じて`sed`等で置換すると良いでしょう。それでは良きMeCabライフを！

### 参考

NEologd導入前

```
ポケモンGO
ポケモン	名詞,一般,*,*,*,*,*
GO	名詞,固有名詞,組織,*,*,*,*
EOS
```

NEologd導入後

```
ポケモンGO
ポケモンGO	名詞,固有名詞,一般,*,*,*,ポケモンGO,ポケモンゴー,ポケモンゴー
EOS
```

なお、NEologdによる弊害もないわけではありません。

```
古池や蛙飛び込む水の音
古池	名詞,固有名詞,地域,一般,*,*,古池,フルイケ,フルイケ
や	助詞,並立助詞,*,*,*,*,や,ヤ,ヤ
蛙	名詞,一般,*,*,*,*,蛙,カエル,カエル
飛び込	名詞,一般,*,*,*,*,飛び込み,トビコミ,トビコミ
む水	名詞,一般,*,*,*,*,無水,ムスイ,ムスイ
の	助詞,連体化,*,*,*,*,の,ノ,ノ
音	名詞,一般,*,*,*,*,音,オト,オト
EOS
```

「飛び込む」ではなく「飛び込」＋「む水」で認識されてしまっていることがわかります。文字と文字の間に半角、もしくは全角スペースを入れると正しく認識されます。
