---
author: ["@ottanxyz"]
title: zplugとpreztoでzshをいい感じにする
date: 2020-04-26T00:00:00+00:00
tags:
  - zsh
  - zplug
  - Homebrew
categories:
  - Mac
slug: zsh-zplug-homebrew
katex: false
---
zplugは、zshのプラグインマネージャ、preztoは軽量なフレームワークです。zplug以外に、zinitなどがありますが、乗り換えるのが面倒であるため、現在はzplugで落ち着いています。また、下記の使い方であれば、preztoを入れる必要性をそこまで感じませんが、preztoに同梱されているモジュールが便利なのでそのまま使用しています。

## zsh、zplugのインストール

```zsh
# zsh、zplugのインストール
brew install zsh zplug
# enhancdプラグインを使用する場合
brew install fzf
```

ログインシェルを変更するために、`/etc/shells`の末尾に、Homebrewでインストールしたzshである`/usr/local/bin/zsh`を追記します。

```zsh
sudo vim /etc/shells
```

ログインシェルを、Homebrewでインストールした最新のzshへ変更します。

```zsh
# ログインシェルの変更
chsh -s /usr/local/bin/zsh
```

`~/.zshrc`を以下のように編集します。一部、oh-my-zshのgitプラグインなども導入してます。

{{< gist ottanjp 2a8c47197273a2d0ca2a86d6778c666a >}}

最後に、編集した`~/.zshrc`を読み込みます。

```zsh
source ~/.zshrc
```

未インストールのプラグインの導入を促されるため、インストールします。

## preztoの設定

続いて、zshのフレームワークであるpreztoを設定します。まず、zplugによりインストールされたpreztoの設定ファイルに対してシンボリックリンクを作成します。

```zsh
ln -s $ZPLUG_HOME/repos/sorin-ionescu/prezto $HOME/.zprezto
```

preztoの設定を始めると、`~/.zshrc`が上書きされてしまうため、事前に退避しておきます。

```zsh
mv ~/.zshrc /tmp/.zshrc
```

公式のインストール方法に従い、preztoの設定を行います。

```zsh
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
   ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

退避した`~/.zshrc`を元に戻します。

```zsh
mv /tmp/.zshrc ~/.zshrc
```

## テーマの変更

preztoのテーマを好きなものに変更します。`powerlevel10k`が最近のお気に入りです。`~/.zpreztorc`を編集します。`theme`で検索すると良いでしょう。

```zsh
...
zstyle ':prezto:module:prompt' theme 'powerlevel10k'
...
```

最後にシェルをリロードします。

```zsh
source ~/.zshrc
```

## 結論

`~/.zshrc`は以下のようになりました。

{{< gist ottanjp 2a8c47197273a2d0ca2a86d6778c666a >}}

## 環境をリセットする

上記の方法で、途中から訳が分からなくなってしまった場合は、以下の手順を実行して環境を初期化すると良いです。必要に応じて、バックアップを取得しておきましょう。

```zsh
# .zshrc、.zshenv、.zsh_history、.zprezto、.zpreztorcなどの削除
rm -fr ~/.z*
# zplugの削除
brew uninstall zplug --force
# zshの削除
brew uninstall zplug --force
chsh -s /bin/zsh
```

## 参考リンク

* [sorin-ionescu/prezto: The configuration framework for Zsh](https://github.com/sorin-ionescu/prezto)
* [zplug/zplug: A next-generation plugin manager for zsh](https://github.com/zplug/zplug)
* [ohmyzsh/ohmyzsh: 🙃 A delightful community-driven (with 1500+ contributors) framework for managing your zsh configuration. Includes 200+ optional plugins (rails, git, OSX, hub, capistrano, brew, ant, php, python, etc), over 140 themes to spice up your morning, and an auto-update tool so that makes it easy to keep up with the latest updates from the community.](https://github.com/ohmyzsh/ohmyzsh)
* [b4b4r07/enhancd: A next-generation cd command with your interactive filter](https://github.com/b4b4r07/enhancd)
* [junegunn/fzf: A command-line fuzzy finder](https://github.com/junegunn/fzf)
