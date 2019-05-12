---
author: ottan
date: 2019-05-11T20:46:03+09:00
draft: false
title: "Macのターミナル（iTerm）で生産性を上げるための方法"
type: post
url: /terminal-zsh-customize-20190505/
categories: ["Mac"]
tags: ["terminal", "zsh"]
toc: true
---

![](/images/2019/05/190511-183c72b78ba92af5.jpg)

ターミナル、デフォルトのまま使用してませんか。ターミナルはもっとかっこよく、そして生産性を高く上げることができます。そのためのツールが数多く存在しますが、今回はその中でも基本となるツール群をご紹介します。

変更前の状態です。（テーマだけ「Pro」に変更しています）

![](/images/2019/05/190511-82aaec9882f9ed5c.png)

変更後は以下のようになります。私は、[iTerm2](https://www.iterm2.com/)を使用していますが、Mac標準のターミナルでも実現できます。

![](/images/2019/05/190511-54895b422fe3b4cb.png)

ついでに、ターミナルに新しい検索（ファジー検索）も導入します。

![](/images/2019/05/190511-4237d7a7957ea779.png)

## ターミナルでの生産性を上げてくれるツール群

macOSの場合、標準のログインシェルは`/bin/bash`ですが`/bin/zsh`を使用するように変更します。その際に、`/bin/zsh`の拡張機能（フレームワーク）である`oh-my-zsh`を使用します。`oh-my-zsh`は、テーマやプラグインが豊富で、カスタマイズが自由にできることが特徴です。

### `~/.zshrc`のバックアップ

既に`/bin/zsh`を使用している場合、`~/.zshrc`をバックアップしておきましょう。`oh-my-zsh`インストール時に上書きされてしまいます。

### oh-my-zsh

定番の`oh-my-zsh`を導入します。以下のコマンドを実行すると、カレントユーザーのログインシェルが`/bin/zsh`に変更されます。インストール後は、ターミナルを再起動してプロンプトが変更されていることを確認します。

```zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

#### Hack Nerd Fontの導入

Hack Nerd Fontは、デベロッパーのために開発されたフォントです。Gitなどの状態を、ターミナル上にビジュアル的にアイコンとして表示してくれるフォントです。必須ではありませんが、導入しておくと、色々と役に立ちます。今回は、このフォントが導入されていることを前提とします。macOSの場合、Homebrewで簡単にインストールできます。

```zsh
brew cask install font-hack-nerd-font
```

インストール後は、環境設定でフォントを「Hack Regular Nerd Font Complete」に変更しておきましょう。（下図は、iTerm2の環境設定画面です）

![](/images/2019/05/190511-1f8f635a3eeeab94.png)

#### oh-my-zshのテーマ変更

`oh-my-zsh`には多数のテーマが用意されています。テーマを導入することで、簡単にターミナルの見た目を変更したり、機能を拡張できます。今回は`powerlevel9k`を導入します。

```zsh
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

続いて、`/bin/zsh`のrcスクリプトである`~/.zshrc`を編集します。

![](/images/2019/05/190511-6cab97ad5affc955.png)

テーマを「powerlevel9k」に、「powerlevel9k」のモードを変更します。モードについては、[Install Instructions · bhilburn/powerlevel9k Wiki](https://github.com/bhilburn/powerlevel9k/wiki/Install-Instructions)に記載方法があります。デフォルトでは「Powerlevel9k」と呼ばれるモードですが、先ほどインストールした「Nerd Font」を使用するモードに変更します。

```zsh
ZSH_THEME="powerlevel9k/powerlevel9k"
POWERLEVEL9K_MODE="nerdfont-complete"
```

`~/.zshrc`を編集したら、同ファイルを再度読み込みます。ターミナルを開き直すか、以下のコマンドを実行してリロードしてください。なお、これ以降で紹介する内容についても、反映するためには以下のコマンドを実行するか、ターミナルを開き直す必要があります。

```zsh
exec $SHELL -l
```

ここまでで見た目が以下のように変更されます。表示されているアイコンについては、[こちら](https://github.com/bhilburn/powerlevel9k#vcs-symbols)を参照してください。デフォルトでは、プロンプトに`vcs`、今回の場合はGitに関する情報が表示されるようになっています。現在のブランチやスタッシュの数、またプッシュ、プルされていないコードの数が表示されるようになっています。

![](/images/2019/05/190511-b3077d5c7a374335.png)

表示されるプロンプトの内容は`~/.zshrc`で変更できます。`POWERLEVEL9K_LEFT_PROMPT_ELEMENTS`と`POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS`を追加します。設定できる内容は、[こちら](https://github.com/bhilburn/powerlevel9k#prompt-customization)に記載があります。なお、`POWERLEVEL9K_LEFT_PROMPT_ELEMENTS`を設定すると、`POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS`にはデフォルト値が自動的に設定されます。

![](/images/2019/05/190511-39a35150eaecf41b.png)

今回は、`POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS`に`os_icon`、`dir`、`vcs`を設定しています。`os_icon`は、macOSの場合、Appleのロゴが表示されます。`dir`はカレントディレクトリのパスです。`vcs`は、Gitの情報が表示されます。（VCSは、Version Control Systemの略称です。文字通りGit以外のバージョン管理システムの情報を表示することもできます）

![](/images/2019/05/190511-7e43a148ff87e513.png)

その他、PHPやNode.jsの実行環境のバージョン、DockerやAWSの情報を表示できます。また、プロンプトが長すぎる場合は、`newline`と記載することでプロンプトを改行して表示できます。私の場合、なるべく簡潔に表示したいため、改行は使用していませんが、ウインドウサイズが小さい場合などには併用すると良いでしょう。

#### プラグインの導入

では、続いてプラグインを導入していきましょう。デフォルトでは`git`プラグインが有効になっています。同プラグインが有効になっている場合、Gitに関するコマンドの自動補完が有効になる他、便利な各種エイリアスが設定されています。

![](/images/2019/05/190511-b280c463333dc4b9.png)

`git`と入力し、<kbd>⇥</kbd> (TAB) キーを押下するとコマンドが補完されます。また、`alias`コマンドでGitに関するエイリアスを確認できます。`g`から始まるコマンドがGitのエイリアスです。例えば、`ggpush`では現在のブランチの内容をリモートリポジトリにプッシュします。

##### zsh-syntax-highlighting

便利なプラグイン（GitHubで人気のプラグイン）を2つご紹介します。1つ目は、`zsh-syntax-highlighting`です。ZshでFish shellのようなシンタックスハイライトを実現するためのツールです。実行しようとしているコマンドが存在するか、エディタで開こうとしているファイルが存在するかを、実行する前にチェックしてプロンプト上でわかりやすく表示してくれます。

```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

上記のコマンドでインストールしたら、`~/.zshrc`をエディタで開き、`plugins`の行を修正します。ロードするプラグインの区切り文字は半角スペースです。`zsh-syntax-highlighting`を追加します。

![](/images/2019/05/190511-0be94cb3d8956adf.png)

存在するコマンドは、下記のように「緑色」で表示されます。これはエイリアスとして設定されているコマンドも同様です。例えば、`git`プラグインが有効になっている場合、`g`は`git`のエイリアスですが、`g`と打つと緑色になります。

![](/images/2019/05/190511-1768adb112eac298.png)

存在しないコマンドは、赤色になります。

![](/images/2019/05/190511-7170e950b3ad04f8.png)

また、存在するディレクトリやファイルには下線が付きます。ファイルやディレクトリを誤って上書き、削除する可能性を低減できます。

![](/images/2019/05/190511-151c2dfebbbcb98e.png)

##### zsh-autosuggestions

2つ目のプラグインです。`zsh-autosuggestions`は、文字通りコマンドの自動補完です。`oh-my-zsh`には、デフォルトで`git`のようにプラグインがあり、自動補完を有効化できます。このプラグインを導入すると、個別にプラグインを導入しなくても、よく使用されるコマンド、例えば`docker`や`npm`などのコマンドが自動補完されるようになります。ただし、`git`プラグインのようにエイリアスまで設定されるわけではありませんので、必要に応じて他のプラグインを追加しましょう。

```zsh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

インストールしたら、いつも通り`~/.zshrc`に`zsh-autosuggestions`を追記します。

![](/images/2019/05/190511-c0db8c9212d53409.png)

例えば、`docker`と入力して<kbd>⇥</kbd> (TAB)キーを押すとコマンドが補完され、一覧として表示されるようになります。コマンドのみならず、そのコマンドのオプションや、サブコマンドについても補完されるようになります。もちろん、エイリアスも補完してくれます。

![](/images/2019/05/190511-d6828dba64efed13.png)

### fzf (command-line fuzzy finder)

ここまでは、`oh-my-zsh`に関する補足でした。最後に、ターミナルをさらに便利にするツールを1つご紹介します。`fzf`は、コマンドの実行履歴（`~/.zsh_history`）や、カレントディレクトリ配下のディレクトリやファイル一覧を表示してくれます。また、そのインクリメンタルサーチも可能です。以前実行したコマンドをもう1回実行したい、ファイル名がうろ覚えといった場合に役に立ちます。

```zsh
brew install fzf
$(brew --prefix)/opt/fzf/install
```

インストールは、Homebrewからおこないます。インストール時の設定は、すべて「y」で問題ないでしょう。例えば、コマンドの実行履歴は、<kbd>⌃</kbd> (Control) + <kbd>R</kbd>で表示できます。

![](/images/2019/05/190511-d3830273f6653e8a.png)

カレントディレクトリ配下の、ディレクトリやファイル一覧は、<kbd>⌃</kbd> (Control) + <kbd>T</kbd>で表示できます。


## 関連リンク

今回使用したツールに関するリンク集です。ツールについてもっと深く知りたい方は、以下のリンク集をご参照ください。

-   [robbyrussell/oh-my-zshx](https://github.com/robbyrussell/oh-my-zsh)
-   [bhilburn/powerlevel9k: The most awesome Powerline theme for ZSH around!](https://github.com/bhilburn/powerlevel9k)
-   [Nerd Fonts - Iconic font aggregator, collection, and patcher](https://nerdfonts.com/)
-   [zsh-users/zsh-syntax-highlighting: Fish shell like syntax highlighting for Zsh.](https://github.com/zsh-users/zsh-syntax-highlighting)
-   [zsh-users/zsh-autosuggestions: Fish-like autosuggestions for zsh](https://github.com/zsh-users/zsh-autosuggestions)
-   [junegunn/fzf: A command-line fuzzy finder](https://github.com/junegunn/fzf)
-   [iTerm2 - macOS Terminal Replacement](https://www.iterm2.com/)
