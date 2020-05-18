---
title: "pipの警告「WARNING: You are using pip version x.x.x, however version y.y.y
  is available.」を抑止する"
date: 2020-05-18
tags:
  - Python
categories:
  - Mac
slug: python-pip-disable-warning
---
PythonのパッケージをPyPIからインストールする際に用いる`pip`コマンドで、よくある警告を抑止する方法です。

例えば、現在アクティブな環境にインストールされているパッケージ一覧を表示した際にも表示されます。`pip list`を実行してみます。

```
Package    Version
---------- -------
pip        19.2.3
setuptools 41.2.0
WARNING: You are using pip version 19.2.3, however version 20.1 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```

文字通り「新しいバージョンの`pip`があるからアップデートしなさい」という警告です。果たして「警告」にするレベルのものかどうかという疑問が残りますが、これまでアップデートしない理由も特にないため毎回アップデートしていました。しかし、この警告を表示させない方法があるようです。

* [python - How to suppress pip upgrade warning? - Stack Overflow](https://stackoverflow.com/questions/46288847/how-to-suppress-pip-upgrade-warning)

## ホスト全体で適用する方法

`$HOME/.config/pip/pip.conf`に、以下の内容を追記します。

```ini
[global]
disable-pip-version-check = True
```

この状態で、冒頭の`pip list`をもう一度打ってみます。

```
Package    Version
---------- -------
pip        19.2.3
setuptools 41.2.0
```

表示されなくなりました。

## 特定の仮想環境（virtualenv）だけ適用する

ホスト全体に適用するのは少し躊躇いが、という場合、特定の仮想環境だけ適用することもできます。変更したことを忘れてしまいそうなので、個人的にはこちらがオススメです。例として、`playground`という仮想環境を作成し、環境をアクティベートします。

```zsh
python3 -m venv playground
source ./playground/bin/activate
```

すると、`VIRTUAL_ENV`という環境変数に仮想環境のパスが記憶されていると思います。この状態で、`pip list`を打っても警告が表示されますが、`$VIRTUAL_ENV/pip.conf`に、先ほどの内容を記述します。

```ini
[global]
disable-pip-version-check = True
```

環境を`deactivate`すると、以下のように再度表示されるようになります。

```
Package    Version
---------- -------
pip        19.2.3
setuptools 41.2.0
WARNING: You are using pip version 19.2.3, however version 20.1 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```

## `pip`コマンドのオプションで解決する

以下のようにオプションを付与するだけです。コマンドのエイリアスとして登録しておいても良いかもしれません。明確に区別する必要がある場合には、`pip!`として登録しておきましょう。

```zsh
pip --disable-pip-version-check <command>
```

## まとめ

`pip.conf`には、上記以外にも様々なオプションがあります。暇な時にでも目を通してみようと思います。

* [User Guide — pip 20.1 documentation](https://pip.pypa.io/en/stable/user_guide/#config-file)