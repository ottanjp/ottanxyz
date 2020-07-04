---
author: ["@ottanxyz"]
date: 2019-03-23T14:33:42+09:00
draft: false
title: "Git初心者が最初から学ぶGitの入門"
type: post
slug: git-basis-beginner-20190303
categories: ["Mac"]
tags: ["Git","GitHub","VS Code"]
toc: true
---

![](/uploads/2019/03/190323-aa5fe717deb8f540.jpg)

Gitは、分散型バージョン管理システムです。それに対して、Subversionは集中型バージョン管理システムと呼ばれます。また、このバージョン管理システムで管理されているドキュメントの格納庫をリポジトリと呼びます。分散型と集中型バージョン管理システムの違いについては、以下の記事が参考になります。

<!-- textlint-disable -->

-   [ガチで5分で分かる分散型バージョン管理システムGit (3/6) - ＠IT](https://www.atmarkit.co.jp/ait/articles/1307/05/news028_3.html)
    <!-- textlint-enable -->

今回は、分散型バージョン管理システムであるGitについて、以下の読者を対象にGitコマンドの基本をおさらいします。

-   Gitコマンドの概念はなんとなく知っている
-   VS CodeなどGitを統合したIDE等のGUIで使用したことはあるが、コマンドはよくわからない

ぜひ、実際にターミナル上で手を動かして作業を行ってみてください。ただ読むだけより、実際に作業してみたほうが身につきます。

## Gitコマンドの基本的な使い方をおさらいする

Macのローカルで作業します。GitHub、GitLab等のリモートリポジトリについては次回解説します。

## Gitリポジトリの作成

作業ディレクトリを作成し、Gitリポジトリを作成します。

```bash
mkdir ~/training && cd training
ls -la
```

作業ディレクトリを作成した段階では、ディレクトリは空の状態です。

    total 0
    drwxr-xr-x   3 ottan  staff   96  3 20 21:41 .
    drwxr-xr-x   7 ottan  staff  224  3 20 21:39 ..

`git init`コマンドで、Gitリポジトリを作成します。

```bash
git init
ls -la
```

Gitリポジトリを作成すると、`.git`というディレクトリが作成されます。この`.git`ディレクトリ配下に、コミットによるファイルの変更履歴（コミットグラフと呼びます）が記録されます。

    total 0
    drwxr-xr-x   3 ottan  staff   96  3 20 21:41 .
    drwxr-xr-x   7 ottan  staff  224  3 20 21:39 ..
    drwxr-xr-x  10 ottan  staff  320  3 20 21:41 .git

また、プロンプトの表示形式を環境変数を用いて、以下のように変更しておくことで、プロンプトでGitの状態をウォッチできるため便利です。`~/.bashrc`や`~/.zshrc`に記載しておくとよいでしょう。

```bash
PS1=${ret_status} %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)
```

たとえば、今回の場合、Gitリポジトリの作成前後で以下のように表示が変わります。

    training
    training git:(master)

### ステータス

ここで、今後多用するコマンドの1つである`git status`について見ておきましょう。現在の状態で`git status`コマンドを実行します。

```bash
git status
```

`git status`では、現在の作業ブランチに対する状態が表示されます。ブランチについては後述します。リポジトリを作成した段階や、前回のコミット時から変更がない場合、`git status`では現在のブランチが`master`である旨のみが表示されます。

    On branch master

    No commits yet

    nothing to commit (create/copy files and use "git add" to track)

## コミット

Gitリポジトリに対して、はじめてのコミットを行ってみましょう。まず、コミット用のファイルを作成します。

```bash
echo training-1 >> training-1.txt
```

この状態で、Gitのステータスを確認してみましょう。Gitのステータスを確認するためのコマンドは、`git status`でした。

```bash
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	training-1.txt

nothing added to commit but untracked files present (use "git add" to track)
```

「Untracked files」、つまりバージョン管理されていない（ファイルを過去に遡って追跡できない）ファイルがリポジトリに追加されたことを示しています。また、ファイルを追跡するために、`git add`コマンドを使用することが示されています。このように、Gitの状態を知る`git status`コマンドを使用することで、リポジトリの状態だけではなく次にとるべきアクションを知ることができます。

では、`git add`でファイルをバージョン管理できるようにリポジトリに追加します。

```bash
git add training-1.txt
```

`git add`の引数にはパスを指定します。単独、複数のファイルを指定できます。また、ファイル名の代わりに`.`を指定することで、カレントディレクトリ配下のすべてのファイルをリポジトリに追加できます。

再び`git status`でリポジトリのステータスを確認してみましょう。

    On branch master

    No commits yet

    Changes to be committed:
      (use "git rm --cached <file>..." to unstage)

    	new file:   training-1.txt

ステータスが、「Untracked files」から「Changes to be commited」に変更されました。コミットできる準備が整ったということです。また、このコミットに含まれる変更の内容がその下に記載されています。今回の場合は、「training-1.txt」ファイルがリポジトリに追加されることを表しています。

では、実際にリポジトリに対してコミットします。コミットは、`git commit`コマンドで行います。

```bash
git commit
```

`git commit`コマンドを実行すると、リポジトリにコミットするためのメッセージ（具体的なコミットの内容）を求められます。

      1 <
      2 # Please enter the commit message for your changes. Lines starting<
      3 # with '#' will be ignored, and an empty message aborts the commit.<
      4 #<
      5 # On branch master<
      6 #<
      7 # Initial commit<
      8 #<
      9 # Changes to be committed:<
     10 #>new file:   training-1.txt<
     11 #<

デフォルトのエディタ（vi等）でメッセージの編集画面が開くため、任意の内容に編集します。今回は、何も変更せずにエディタの内容を保存してみます。

    Aborting commit due to empty commit message.

すると、コミットのメッセージが空であるため、コミットが破棄された旨のメッセージが表示されます。このように、メッセージを入力しない場合、リポジトリに対してコミットすることはできません。もう一度`git commit`して、最終行に「my first commit」などのメッセージ（日本語でも可）を入力してコミットしてみます。

      1 <
      2 # Please enter the commit message for your changes. Lines starting<
      3 # with '#' will be ignored, and an empty message aborts the commit.<
      4 #<
      5 # On branch master<
      6 #<
      7 # Initial commit<
      8 #<
      9 # Changes to be committed:<
     10 #>new file:   training-1.txt<
     11 #<
     12 my first commit

コミット後に`git status`で状態を確認すると、インデックスや追跡されていないファイルは存在しないことがわかります。

    On branch master
    nothing to commit, working tree clean

#### 作業ツリー、インデックス（ステージング領域）とリポジトリ

ローカルで作業中の領域を作業ツリーと呼びます。コミットの準備ができたファイルを格納する一時的な領域をインデックス（ステージング領域）と呼びます。

`git add`でコミット前のインデックスに格納された状態であり、リポジトリに内容は保存されていません。`git commit`してはじめてコミットされた状態、リポジトリへ格納された状態になります。

### リポジトリへのファイルの追加（2回目のコミット）

続いて2つ目のファイルをコミットします。

```bash
echo training-2 >> training-2.txt
```

ファイルの追跡を確認するために、`git status`コマンドで状態を確認しながら進めましょう。

```bash
git status
git add training-2.txt
git commit -m "my second commit"
```

### リポジトリのファイルの更新（3回目のコミット）

今までは新規作成したファイルをコミットしていました。続いて、すでにリポジトリ上にあるファイルを変更してコミットします。最初に作ったファイルへ追記します。

```bash
echo training-1_1 >> training-1.txt
```

`git status`で状態を確認してみましょう。

    On branch master
    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

    	modified:   training-1.txt

    no changes added to commit (use "git add" and/or "git commit -a")

作業ツリーのファイルを更新しただけですので、まだインデックスにありません。インデックスに追加し、コミットするための手順は、ファイルを新規作成した場合と同様です。`git commit`コマンドのオプション`-a`を付与することで、インデックスへの追加とコミットを同時に行うことができます。

```bash
git commit -a -m "my third commit"
```

リポジトリ上に存在しないファイルを作業ツリーに追加した場合は、`git add`コマンドにより明示的にファイルを指定する必要があります。

### リポジトリのファイルの削除

以下の内容で`training-3.txt`を作成し、インデックスに追加とコミット（`git add` & `git commit`）を行います。コミットメッセージは任意の内容で構いません。

```bash
echo training-3 >> training-3.txt
git add training-3.txt
git commit -m "..."
```

その状態で、作業ツリーからファイルを削除します。

```bash
rm training-3.txt
```

この状態で、`git status`でリポジトリのステータスを確認します。「deleted」と表示され、ファイルが削除されようとしていることがわかります。

    On branch master
    Changes not staged for commit:
      (use "git add/rm <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

    	deleted:    training-3.txt

    no changes added to commit (use "git add" and/or "git commit -a")

リポジトリからファイルを削除する手順は、ファイルを新規作成する手順と同様です。`git add`で削除対象のファイルをインデックスに追加します。

```bash
git add .
```

`git add .`は、カレントディレクトリ直下のディレクトリまたはファイルで、まだインデックスにないファイルをまとめて追加します。この状態で、再度`git status`コマンドを実行します。

    On branch master
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

    	deleted:    training-3.txt

インデックスに削除対象のファイルが追加されました。続いてコミットしましょう。コミットのメッセージは割愛します。任意の内容で構いません。

```bash
git commit -m "..."
```

#### `git rm`コマンドによるファイルの削除

ファイルを削除する場合、物理的なファイルの削除と、インデックスへの追加を同時に行うことができます。`git rm`を使用すれば、物理的なファイルの削除（`rm`）と、インデックスへの追加を同時に行ってくれます。

```bash
git rm training-3.txt
git commit -m "..."
```

### リポジトリのログの確認

Gitリポジトリのコミットの履歴を確認するには、`git log`コマンドを実行します。

```bash
git log
```

ログには以下の内容が表示されます。過去にコミットされた内容が順番に適用されていることがわかります。`HEAD`は現在のブランチの最新のコミットであることを示しています。`HEAD`というキーワードは後々登場するため覚えておきましょう。最新のコミットを示していることを覚えておけば大丈夫です。

    commit be267b01f98f205d84baf85dbf7e71b6d5ab5ebf (HEAD -> master)
    Date:   Wed Mar 20 22:26:27 2019 +0900

        remove training-3.txt

    commit 69bac0e51beb5a4625a26d2b9986c6cdac1ebce2
    Date:   Wed Mar 20 22:21:22 2019 +0900

        add training-3.txt

#### ユーザー名とメールアドレスの設定

`git log`でコミット履歴を確認した際に、「author」欄が表示されていることがわかります。ここに表示されるユーザー名やメールアドレスはどのように設定されているのでしょうか。

リポジトリ全体で共通のユーザー名とメールアドレスを設定するには、`git config`コマンドに`—global`オプションを付与します。すべてのリポジトリで同一のユーザー名とメールアドレスを使用できます。

```bash
git config --global user.name "ottan"
git config --global user.email "ottan@ottan.xyz"
```

また、現在のリポジトリに対してのみユーザー名、メールアドレスを有効化したい場合は、`—global`オプションを付与せずに設定します。

```bash
git config user.name "ottan"
git config user.email "ottan@ottan.xyz"
```

## コミット履歴を活用する

ここからは`git log`で確認できたコミット履歴を使用した応用例です。

### 差分

リポジトリ上のファイルを更新する前に、作業ツリー、インデックスとリポジトリの内容を比較（差分）したい場合があります。

#### 作業ツリーとリポジトリの差分を知りたい

まず、作業ツリー上のファイルとリポジトリの差分を知りたい場合は、`git diff`コマンドを実行します。試しに、リポジトリに存在するファイルに対して更新を加えてみます。その状態で、`git diff`コマンドを実行します。

```bash
echo "training-1_1" >> training-1.txt
git diff
```

作業ツリーとリポジトリで、変更のあるファイルとその内容が表示されます。

    diff --git a/training-1.txt b/training-1.txt
    index 1cbbfb4..e82f098 100644
    --- a/training-1.txt
    +++ b/training-1.txt
    @@ -1 +1,2 @@
     training-1
    +training-1_1

#### インデックスとリポジトリの差分を知りたい

作業ツリーではなく、インデックスのファイルとリポジトリの差分を知りたい場合は、`git diff`コマンドのオプションに`—cached`を付与します。コミット直前のファイルとリポジトリの差分を知ることができます。

```bash
git add .
git diff --cached
```

 作業ツリーとリポジトリの差分と同様に表示されます。

    diff --git a/training-3.txt b/training-3.txt
    deleted file mode 100644
    index a0acf71..0000000
    --- a/training-3.txt
    +++ /dev/null
    @@ -1 +0,0 @@
    -training-3

#### コミットしたことによる差分を知りたい

自分の行ったコミットによって、リポジトリの内容がどのように変更したかを知りたい場合は、`git diff`の引数に`HEAD^`を与えます。

```bash
git diff HEAD^
```

`HEAD^`の`^`は、最新のコミットの直前を意味します。`HEAD~`でも同様です。`HEAD`は最新のコミットを指し示していました。上記のコマンドは、`HEAD`と`HEAD`の1つ前を比較するという意味になります。

    diff --git a/training-3.txt b/training-3.txt
    deleted file mode 100644
    index a0acf71..0000000
    --- a/training-3.txt
    +++ /dev/null
    @@ -1 +0,0 @@
    -training-3

### 元に戻す

Gitの便利な点は、何かあった場合に、容易に以前のバージョンに戻すことができるという点です。

#### 誤ってインデックスに追加したファイルを元に戻す

リポジトリ上のファイルを更新したが、元に戻したい場合の事例を見ていきます。たとえば、変更してインデックスに追加したが、変更内容が誤っていたためインデックスに追加する前の状態に戻したいというケースで使用できます。

```bash
echo "training-1_2" >> training-1.txt
git add training-1.txt
```

すでにリポジトリ上にあるファイルに対して追記し、インデックスに追加します。`cat`コマンド等でファイルの内容を表示すると、以下のように表示されています。

    training-1
    training-1_1
    training-1_2

また、`git status`でステータスを確認すると、1つのファイルがインデックスに追加されていることがわかります。

    On branch master
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

    	modified:   training-1.txt

インデックスに追加する前の状態に戻す方法は、`git status`に示されているように、`git reset`コマンドを使用します。また、`git reset`コマンドの引数に`HEAD`と元に戻したいファイルのパスを指定します。`.`を指定すると、カレントディレクトリのすべてのディレクトリやファイルに対して変更が行われます。

```bash
git reset HEAD training-1.txt
```

`HEAD`は最新のコミットを示すものでした。対象のファイルを最新のコミットの状態に戻します。この状態で再度`git status`コマンドにより状態を確認します。

    On branch master
    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

    	modified:   training-1.txt

    no changes added to commit (use "git add" and/or "git commit -a")

インデックスに追加される前の状態に戻っています。作業ツリー上のファイルは編集されたままの状態です。

    training-1
    training-1_1
    training-1_2

#### 誤って変更した作業ツリーのファイルを元に戻す

インデックスのみならず、作業ツリーの状態を最新のコミットに戻す方法です。作業ツリー上の編集内容がすべて失われてしまうため慎重に作業を行なってください。リポジトリのファイルを変更して、インデックスに追加します。

```bash
echo "training-1_2" >> training-1.txt
git add training-1.txt
```

この状態でファイルの内容を確認すると、末尾に内容が追記されています。

    training-1
    training-1_1
    training-1_2

`git status`で状態を確認します。

    On branch master
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

    	modified:   training-1.txt

指示通り、`git reset`によりファイルをインデックスから削除します。

```bash
git reset HEAD training-1.txt
```

再度、`git status`で状態を確認します。

    On branch master
    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

    	modified:   training-1.txt

    no changes added to commit (use "git add" and/or "git commit -a")

上記を見ると、`git checkout`コマンドで作業ツリー上の変更内容を破棄できる旨が示されていることがわかります。

```bash
git checkout -- training-1.txt
```

`—`オプションは、パラメータとして指定されているファイルが、ファイル名であることを明示的に示すために使用します。付与しなくても構いません。

後述しますが、`git checkout`はブランチを切り替える際にも使用します。その際、ブランチと同一名称のファイルが存在した場合、`—`オプションを付与しないとブランチが切り替わってしまいます。明示的にファイル名を指定する場合は、`—`オプションを付与しておきます。

さて、この状態で作業ツリー上のファイルの内容を確認します。

    training-1
    training-1_1

作業ツリー上のファイルの変更内容が破棄されています。

#### 作業ツリーを直前のコミットの状態に戻す

作業ツリー全体を直前のコミットの状態に戻すだけであれば、もっと簡単にできます。いったん作業状況をリセットしたい場合などに有効ですが、作業ツリー全体の変更内容が破棄されてしまうため注意してください。

```bash
git reset --hard HEAD
```

このコマンドを実行すると作業ツリーの変更内容は破棄され、最新のコミットである`HEAD`の状態に戻ります。

#### 誤って作業ツリーから削除したファイルを元に戻す

作業ツリーから削除してしまったファイルを元に戻したい場合です。この操作は、直前の誤って変更した作業ツリーのファイルを元に戻したい場合と同様です。たとえば、作業ツリーの状態が以下で、すべてリポジトリに存在することとします。

    total 16
    -rw-r--r--  1 ottan  staff    24B  3 20 23:24 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt

この状態でファイルを削除します。

```bash
rm training-1.txt
```

ここで`git status`によりステータスを確認します。

    On branch master
    Changes not staged for commit:
      (use "git add/rm <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

    	deleted:    training-1.txt

    no changes added to commit (use "git add" and/or "git commit -a")

リポジトリ上のファイルに対する更新、削除は同じ操作です。作業ツリーの状態に戻したい場合は、`git checkout`コマンドを使用します。

    git checkout -- training-1.txt

ディレクトリの状態は以下のようになります。削除したファイルが元に戻っていることがわかります。

    total 16
    -rw-r--r--  1 ottan  staff    24B  3 20 23:24 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt

まとめて元に戻したい場合は、作業ツリー全体を戻すことで回復することもできます。

```bash
git reset --hard HEAD
```

### 直前のコミットを変更する

コミット時のメッセージを誤ってしまった、コミットに含めるはずのファイルを含めるのを忘れてしまった、という場合に直前のコミットの内容を変更できます。現在の`git log`の状況が以下の場合を考えます。

    commit c17975b3b81b7d662dee3750613f43e782e0a760 (HEAD -> master)
    Date:   Wed Mar 20 22:50:01 2019 +0900

        del training-4.txt

    commit 4b183b082ab7fb9b4aad94932a62b058d84cf0a6
    Date:   Wed Mar 20 22:32:38 2019 +0900

        add training-4

この状態で最新のコミットを変更します。まず、リポジトリ上のファイルを新たに変更し、インデックスに追加します。

```bash
echo "training-1_3" >> training-1.txt
git add .
```

`git commit`のオプションに`—amend`オプションを付与することで、新規にコミットを作成することなく、直前のコミットを変更できます。

```bash
git commit --amend -m "modify training-1.txt"
```

`git log`の結果を見てみると、直前のコミットの内容が置き換わっていることがわかります。コミットのメッセージを修正する場合に、よく用いる方法です。

    commit cd271c61f573f3469c4a6f006c577de29f8ded7c (HEAD -> master)
    Date:   Wed Mar 20 22:50:01 2019 +0900

        modify training-1.txt

    commit 4b183b082ab7fb9b4aad94932a62b058d84cf0a6
    Date:   Wed Mar 20 22:32:38 2019 +0900

        add training-4

### 直前のコミットを取り消す

Gitはバージョン管理システムであり、コミットの履歴をたどってその状態までロールバックさせることができます。コミットの取り消しは、`git reset`コマンドで行いますが、同コマンドのオプションには`--hard`と`--soft`の2種類があります。

#### 作業ツリーの状態も含めてロールバックする`—hard`

`—hard`オプションを付与することで、作業ツリーの状態も含めてロールバックできます。コミットの取り消しによく用いられますが、作業ツリー上の変更点はすべて破棄されてしまうため注意が必要です。実はこのオプションはすでに紹介済みです。

```bash
echo "training-4" >> training-4.txt
git add .
git commit -m "add training-4.txt"
```

ファイルを新規作成し、新たにコミットした状態です。`git log`を確認すると以下のようになっています。

    commit 2b07d8c62bd8a5716e4b54c8f4f373787ad241be (HEAD -> master)
    Date:   Thu Mar 21 00:25:27 2019 +0900

        add training-4.txt

    commit 69bac0e51beb5a4625a26d2b9986c6cdac1ebce2
    Date:   Wed Mar 20 22:21:22 2019 +0900

        add training-3.txt

また、作業ツリー上には作成したファイルが存在しています。

    total 32
    -rw-r--r--  1 ottan  staff    24B  3 21 00:23 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:24 training-3.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:24 training-4.txt

この状態で直前のコミットを取り消した場合、どのようになるか確認します。コミットを取り消したい場合は、`git reset`コマンドに、コミットのハッシュ値、もしくは`HEAD`、つまり最新の状態からの相対位置を指定します。

```bash
git reset --hard HEAD^
```

`HEAD^`は最新のコミットの直前のコミットという意味でした。つまり、上記のコマンドを実行することで、最新のコミットの1つ手前の状態にリセットされます。この状態で`git log`を確認します。

    commit 69bac0e51beb5a4625a26d2b9986c6cdac1ebce2 (HEAD -> master)
    Date:   Wed Mar 20 22:21:22 2019 +0900

        add training-3.txt

最後に新規追加したファイルのコミット履歴がなくなっていることがわかります。`git status`はどうでしょうか。

    On branch master
    nothing to commit, working tree clean

インデックスの状態も空になっています。また、作業ツリー上のファイルを確認すると、先ほど追加したファイルが消えています。このように、`—hard`オプションを付与することで、作業ツリーも含めてコミットをロールバックできます。

    total 32
    -rw-r--r--  1 ottan  staff    24B  3 21 00:23 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:24 training-3.txt

なお、`git reset`はファイルのパスを指定できました。ファイルのパスを指定すると、指定したファイルのみ指定したコミットの履歴までロールバックさせることができます。

```bash
git reset HEAD <file_path>
```

これはファイルを`HEAD`、つまりリポジトリの最新の状態に戻すという意味です。

#### 作業ツリーの状態はそのままにコミット履歴のみロールバックする`—soft`

先ほどと同様に新規ファイルを作成しコミットします。コミットしてから、以下のコマンドを実行します。先ほどのコマンドとの違いは、オプションが`—hard`から`—soft`に変わったことです。

```bash
git reset --soft HEAD^
```

この状態で`git log`の状態を確認します。`—hard`オプション同様に、直前のコミットが取り消されていることがわかります。

    commit 69bac0e51beb5a4625a26d2b9986c6cdac1ebce2 (HEAD -> master)
    Date:   Wed Mar 20 22:21:22 2019 +0900

        add training-3.txt

`—hard`と`—soft`オプションには違いがあります。この状態で`git status`を確認してみます。

    On branch master
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

    	new file:   training-4.txt

作業ツリー上に新規ファイルを作成した、という形跡は残っています。また、作業ツリー上の状態を確認してみると、以下のようにファイルは新規作成されたままになっています。

    total 32
    -rw-r--r--  1 ottan  staff    24B  3 21 00:23 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:24 training-3.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:24 training-4.txt

`—hard`オプションと`—soft`オプションの違いは、作業ツリーの状態です。`—hard`オプションを付与すると、作業ツリーの状態まで含めてコミットの履歴が戻ります。作業ツリーの状態を巻き戻したくない場合は、`—soft`オプションを使用します。

#### コミットの履歴は保持しつつ直前のコミットを取り消す新規コミットを作成する`git revert`

`git reset`を行うと、リポジトリのコミットの状態が変化します。逆に言えば、過去にコミットした形跡を追うことができなくなります。コミットのログを綺麗にするには有効な手段ですが、コミットの履歴が追いづらくなります。そこで、コミットの履歴はそのままに、直前のコミットの内容を打ち消すコミットを新規に作成するコマンドが`git revert`です。

`git reset`と同様に、リポジトリ上に新規ファイルを作成し、コミットしておきます。

    git revert HEAD

上記のコマンドを実行すると、`git commit`に`-m`オプションを付与しなかった場合と同様に、コミットメッセージを要求する画面がテキストエディタで開きます。そのままコミットメッセージを保存すると、以下のように標準出力に表示されます。

    [master 3b4ffcb] Revert "add training-4.txt"
     1 file changed, 1 deletion(-)
     delete mode 100644 training-4.txt

この状態で`git log`を確認してみます。

    commit e489af006c1570214efefe32c53a6df46839db35 (HEAD -> master)
    Date:   Thu Mar 21 11:23:48 2019 +0900

        Revert "add training-4.txt"
        
        This reverts commit 53f30defe10aad3e13dccafd24d13e902a6cf3dd.

    commit 53f30defe10aad3e13dccafd24d13e902a6cf3dd
    Date:   Thu Mar 21 00:37:35 2019 +0900

        add training-4.txt

直前の変更を取り消す新規のコミット（直前のコミットと逆の内容）が作成されていることがわかります。この状態で作業ツリーを確認すると、`git reset —hard`と同様に作業ツリーも直前のコミットの状態まで巻き戻っていることがわかります。

    total 24
    -rw-r--r--  1 ottan  staff    24B  3 21 00:23 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:37 training-3.txt

## ブランチ

ここからは、いよいよGitの醍醐味とも言えるブランチについて説明します。ブランチ（Branch）とは文字通りコミット履歴（コミットグラフ）が枝分かれしていく様を表しています。GitHubにおけるIssueや機能追加の単位でブランチを作成することが多いです。

    On branch master
    nothing to commit, working tree clean

なお、`git status`で確認した際に表示されていた`master`もブランチです。`master`ブランチは、リポジトリを作成すると自動的に生成されます。

### ブランチの作成

ブランチを作成すると、他のブランチに影響を与えることなく作業を実施できます。また、特定のブランチで作業した履歴を、`master`含めたブランチに対してマージできます。そのため、前述の通り、複数の並行開発を異なるブランチを使用して、互いに影響を与えることなく実施できます。

ブランチを作成するには、`git branch`コマンドを使用します。

```bash
git branch issue1
```

### ブランチのリスト

新しいブランチが作成されたか、`git branch`コマンドで確認してみます。

```bash
git branch
```

ブランチの一覧が表示されます。現在作業中のブランチに対してマークがついています。

    * master
      issue1

### ブランチの削除

不要になったブランチを削除するためには、`git branch`コマンドに`-d`オプションを付与してブランチ名を指定します。

```bash
git branch -d issue1
```

なお、そのブランチにおけるコミットグラフが空でない場合、以下のエラーが表示されます。変更履歴がマージされていないため削除できないという旨のエラーです。

    error: The branch 'issue1' is not fully merged.
    If you are sure you want to delete it, run 'git branch -D issue1'.

強制的にブランチを削除するためには、以下のコマンドを実行します。

```bash
git branch -D issue1
```

### ブランチの切り替え

ブランチの切り替えは`git checkout`コマンドを使用します。なお、作業ツリー上のファイルの変更を元に戻す場合も、同コマンドを使用しました。ブランチではなく、明示的にファイルのパスを指定したい場合は、`—`オプションを使用します。

```bash
git checkout issue1
```

`git checkout`コマンドに、`-b`オプションを付与することで、ブランチの作成と切り替えを同時に行うことができます。

```bash
git checkout -b issue1
git status
```

ブランチを切り替えた状態で`git status`コマンドを実行します。「On branch」の後に表示される名前が、現在作業中のブランチ名に切り替わっていることがわかります。

    On branch issue1
    nothing to commit, working tree clean

ブランチを切り替えた状態で、`git log`コマンドを実行します。

```bash
git log
```

ブランチを作成したばかりの状態では、`master`ブランチの最新、つまり`HEAD`の指す状態と同じであることがわかります。

    commit e489af006c1570214efefe32c53a6df46839db35 (HEAD -> issue1, master)
    Date:   Thu Mar 21 11:23:48 2019 +0900

        Revert "add training-4.txt"
        
        This reverts commit 53f30defe10aad3e13dccafd24d13e902a6cf3dd.

#### 作業ツリーのファイルを最新のコミット状態に戻す

念のため復習しておきましょう。ブランチの切り替えに使用する`git checkout`コマンドは、作業ツリーのファイルをリポジトリの最新の状態に戻す場合にも使用します。

```bash
git checkout -- issue1
```

`—`オプションを付与することで、明示的にファイルのパスであることを指定できます。ブランチの切り替えと、ファイルの変更が同じコマンドのため混同しないように注意しましょう。

### マージ

ブランチで作業した結果を、`master`ブランチにマージします。Gitには2種類のマージがありますが、この後詳しくみていきます。

#### 作業中のブランチでファイルをコミットする

ブランチを切り替えた状態でファイルを修正しコミットします。

```bash
echo "branch-1" >> branch-1.txt
git status
```

`git status`で状態を確認すると、現在のブランチに対して変更が加えられていることがわかります。

    On branch issue1
    Untracked files:
      (use "git add <file>..." to include in what will be committed)

    	branch-1.txt

    nothing added to commit but untracked files present (use "git add" to track)

コミット対象のファイルをインデックスに追加します。

```bash
git add .
git status
```

`master`ブランチで作業していた時と同様です。

    On branch issue1
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

    	new file:   branch-1.txt

では、コミットしてみます。

```bash
git commit -m "add branch-1.txt"
git log
```

`git log`でコミットの履歴を確認すると、`master`ブランチよりも新しいコミットが作成されています。

    commit 41d677943a0586e51cf8583185d31b9058d8d6aa (HEAD -> issue1)
    Date:   Thu Mar 21 11:55:24 2019 +0900

        add branch-1.txt

    commit e489af006c1570214efefe32c53a6df46839db35 (master)
    Date:   Thu Mar 21 11:23:48 2019 +0900

        Revert "add training-4.txt"
        
        This reverts commit 53f30defe10aad3e13dccafd24d13e902a6cf3dd.

作業ツリー上のファイルの状態は以下のようになっています。

    total 32
    -rw-r--r--  1 ottan  staff     9B  3 21 11:39 branch-1.txt
    -rw-r--r--  1 ottan  staff    24B  3 21 00:23 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:37 training-3.txt

#### `master`ブランチの確認

`git checkout`コマンドで`master`ブランチに切り替えてみます。

```bash
git checkout master
git log
```

`git log`コマンドでコミットの履歴を確認します。

    commit e489af006c1570214efefe32c53a6df46839db35 (HEAD -> master)
    Date:   Thu Mar 21 11:23:48 2019 +0900

        Revert "add training-4.txt"
        
        This reverts commit 53f30defe10aad3e13dccafd24d13e902a6cf3dd.

`master`ブランチでは、`issue1`ブランチで作成したファイルのコミットは表示されず、また作業ツリー上にもファイルは存在しません。

    total 24
    -rw-r--r--  1 ottan  staff    24B  3 21 00:23 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:37 training-3.txt

#### ブランチのマージ（Fast-forward）

では、`issue1`ブランチで作業した内容を、`master`ブランチにマージします。ブランチのマージは、マージ先のブランチに切り替えた状態で、`git merge`コマンドを使用します。今回は、`master`ブランチにマージしたい（マージ先）ので、`master`ブランチに切り替えています。

```bash
git checkout master
git merge issue1
```

実行結果は以下のように表示されます。

    Updating e489af0..41d6779
    Fast-forward
     branch-1.txt | 1 +
     1 file changed, 1 insertion(+)
     create mode 100644 branch-1.txt

**Fast-forward**と表示されています。ブランチのマージには2種類存在する旨を述べました。この**Fast-forward**が1種類目のマージ方法です。詳細は後述します。

作業ツリーの状態がどのように変化したか見てみましょう。`master`ブランチに存在しなかったファイルがあります。これは、`issue1`ブランチで作成したファイルが、`master`ブランチにマージされたためです。

    total 32
    -rw-r--r--  1 ottan  staff     9B  3 21 11:56 branch-1.txt
    -rw-r--r--  1 ottan  staff    24B  3 21 00:23 training-1.txt
    -rw-r--r--  1 ottan  staff    11B  3 20 22:19 training-2.txt
    -rw-r--r--  1 ottan  staff    11B  3 21 00:37 training-3.txt

この状態でコミットの履歴を確認してみます。

```bash
git log
```

`HEAD`の位置と、コミットのハッシュ値に注目してください。

「41d6」から始まるハッシュ値は、`issue1`ブランチでコミットした際に表示された値です。もともと、`master`ブランチの`HEAD`は1つ下の「e489」から始まるコミットのハッシュ値を指し示していました。ところが、`issue1`ブランチを`master`ブランチにマージした結果、`issue1`ブランチと、`master`ブランチの`HEAD`の示すハッシュ値が同じになりました。

言い換えれば、`master`ブランチの`HEAD`の位置が、`issue1`ブランチの`HEAD`の位置に移動しただけ、と言えます。マージする段階で`master`ブランチには何も変更を加えていなかったため、結果的に`issue1`ブランチと`master`ブランチの`HEAD`の位置が同一になったのです。

このように、一方のブランチの`HEAD`の位置を、他方のブランチの`HEAD`の位置に合わせるマージ方法を、**Fast-forward**と言います。これが1つ目のマージです。

    commit 41d677943a0586e51cf8583185d31b9058d8d6aa (HEAD -> master, issue1)
    Date:   Thu Mar 21 11:55:24 2019 +0900

        add branch-1.txt

    commit e489af006c1570214efefe32c53a6df46839db35
    Date:   Thu Mar 21 11:23:48 2019 +0900

        Revert "add training-4.txt"
        
        This reverts commit 53f30defe10aad3e13dccafd24d13e902a6cf3dd.

#### ブランチの削除

ブランチは残しておくこともできますが、不要になったブランチは削除します。ブランチの削除は、`git branch`コマンドに`-d`オプションを付与します。

```bash
git branch -d issue1
git log
```

さて、`git log`でコミットの履歴を確認してみましょう。

    commit 41d677943a0586e51cf8583185d31b9058d8d6aa (HEAD -> master)
    Date:   Thu Mar 21 11:55:24 2019 +0900

        add branch-1.txt

先ほどのログと比較してみてください。`master`ブランチの`HEAD`から、`issue1`ブランチが消えただけということに気づいたでしょうか。しばらく時間を置いて、再度`git log`で状態を確認した時はどうでしょう。その際には、`issue1`ブランチがマージされたという記憶は薄れ、単に`master`ブランチに対して新たにコミットされたという事実だけが残るのではないでしょうか。

逆に言えば、Fast-forwardの場合`issue1`ブランチをマージしたという事実がコミットグラフから消えてしまうことになります。では、ブランチをマージしたという事実を意図的に残したい場合はどうすれば良いのでしょうか。

#### ブランチのマージ（Not Fast-forward）

再度ブランチを作成して、そのブランチに切り替えます。ブランチの作成と切り替えを同時に行うためには、`git checkout`コマンドに`-b`オプションを付与します。

```bash
git checkout -b issue2
git log
```

コミットの履歴を確認してみます。今作成したブランチと、`master`ブランチの`HEAD`の示す位置が同じになっています。

    commit 41d677943a0586e51cf8583185d31b9058d8d6aa (HEAD -> issue2, master)
    Date:   Thu Mar 21 11:55:24 2019 +0900

        add branch-1.txt

作業ツリー上にファイルを新規作成しコミットします。

```bash
echo "branch-2" >> branch-2.txt
git add .
git commit -m "add branch-2.txt"
git log
```

この状態で`git log`を確認します。

    commit ff0790ec478f2d63b2107eeb866b861c2659cc67 (HEAD -> issue2)
    Date:   Thu Mar 21 12:20:59 2019 +0900

        add branch-2.txt

    commit 41d677943a0586e51cf8583185d31b9058d8d6aa (master)
    Date:   Thu Mar 21 11:55:24 2019 +0900

        add branch-1.txt

作成したブランチ上で作業したため、`HEAD`の示す位置が変更されています。

```bash
git checkout master
git log
```

`master`ブランチにマージするため、ブランチを切り替えます。コミットの履歴は以下のようになっています。

    commit 41d677943a0586e51cf8583185d31b9058d8d6aa (HEAD -> master)
    Date:   Thu Mar 21 11:55:24 2019 +0900

        add branch-1.txt

先ほどは「Fast-forward（ff）」により、マージした結果、`master`ブランチの`HEAD`の指し示す位置が、マージ元のブランチの最新に切り替わっただけでした。すなわち、マージ元のブランチを削除してしまった場合、マージしたという事実が残らない状態です。

そこで、今回は`git merge`コマンドに`—no-ff`（Not Fast-forward）オプションを付与します。

```bash
git merge --no-ff issue2
```

`git commit`コマンドに`-m`オプションを付与しなかった場合と同様に、コミットメッセージを求められます。デフォルトでは「Merge branch '...'」となっています。

      1 Merge branch 'issue2'<
      2 <
      3 # Please enter a commit message to explain why this merge is necessary,<
      4 # especially if it merges an updated upstream into a topic branch.<
      5 #<
      6 # Lines starting with '#' will be ignored, and an empty message aborts<
      7 # the commit.<

この状態でメッセージを保存します。

    Merge made by the 'recursive' strategy.
     branch-2.txt | 1 +
     1 file changed, 1 insertion(+)
     create mode 100644 branch-2.txt

マージされました。先ほどとは異なり「Fast-forward」とは表示されていないことがわかります。

```bash
git log
```

この状態でコミットの履歴を確認してみましょう。

    commit ff172a93c4f13adaca799aad4e491fa238de9045 (HEAD -> master)
    Merge: 41d6779 ff0790e
    Date:   Thu Mar 21 12:22:07 2019 +0900

        Merge branch 'issue2'

    commit ff0790ec478f2d63b2107eeb866b861c2659cc67 (issue2)
    Date:   Thu Mar 21 12:20:59 2019 +0900

        add branch-2.txt

    commit 41d677943a0586e51cf8583185d31b9058d8d6aa
    Date:   Thu Mar 21 11:55:24 2019 +0900

        add branch-1.txt

Fast-forwardでは、`issue2`ブランチの`HEAD`に、`master`ブランチの`HEAD`が移動するだけでした。今回は、ブランチをマージした旨のコミットが新規に作成されていることがわかります。また、ログ上に「Merge:」という行が追加されています。この状態でブランチを削除してみます。

```bash
git branch -d issue2
git log
```

コミットの履歴を確認してみましょう。ブランチを削除した場合も、Fast-forwardとは異なり、最新のコミットによりマージされたことがわかります。

    commit ff172a93c4f13adaca799aad4e491fa238de9045 (HEAD -> master)
    Merge: 41d6779 ff0790e
    Date:   Thu Mar 21 12:22:07 2019 +0900

        Merge branch 'issue2'

    commit ff0790ec478f2d63b2107eeb866b861c2659cc67
    Date:   Thu Mar 21 12:20:59 2019 +0900

        add branch-2.txt

    commit 41d677943a0586e51cf8583185d31b9058d8d6aa
    Date:   Thu Mar 21 11:55:24 2019 +0900

        add branch-1.txt

### マージの競合（Conflict）

最後に、マージの競合について触れておきます。複数のブランチで並行して作業した結果、同一ファイルの同一行を編集した場合、どちらを正とするかをGitが判断できないため、マージの競合が発生します。これまでは、他方のブランチのみで作業した結果を`master`ブランチに反映していただけであったため、マージの競合は発生していませんでした。

具体的にマージの競合を発生させてみます。新しくブランチを作成して切り替えます。作業ツリーのあるファイルの末尾に追記します。

```bash
git checkout -b issue3
echo "branch-2_1" >> branch-2.txt
cat branch-2.txt
```

`issue3`ブランチにおける`branch-2.txt`の内容は下記の通りになっています。

    branch-2
    branch-2_1

この状態でコミットしておきます。

```bash
git commit -a -m "modify branch-2.txt on issue3"
```

引き続き`master`ブランチに切り替えます。`issue3`ブランチで作業したファイルと同一のファイルの末尾に内容を追記します。`master`ブランチと`issue3`ブランチで同一箇所を修正したことになります。

```bash
git checkout master
echo "branch-2_2" >> branch-2.txt
cat branch-2.txt
```

`master`ブランチにおける`branch-2.txt`の内容は下記の通りになっています。`issue3`ブランチの状態と比較すると、2行目が異なっています。

    branch-2
    branch-2_2

この状態でコミットします。

```bash
git commit -a -m "modify branch-2.txt on master"
```

`master`ブランチに`issue3`ブランチをマージしてみます。

```bash
git merge issue3
```

先ほど編集したファイルでCONFLICT（競合）が発生したため、マージに失敗したことがわかります。

    Auto-merging branch-2.txt
    CONFLICT (content): Merge conflict in branch-2.txt
    Automatic merge failed; fix conflicts and then commit the result.

これまでは、競合箇所がなかったために、Gitが自動的にマージしてくれていました。しかし、今回のケースのように、同一ファイルの同一箇所を修正してしまった場合、どちらを正とするかGit側で判断ができないため、マージに失敗します。

```bash
git status
```

現在のステータスを確認します。

    On branch master
    You have unmerged paths.
      (fix conflicts and run "git commit")
      (use "git merge --abort" to abort the merge)

    Unmerged paths:
      (use "git add <file>..." to mark resolution)

    	both modified:   branch-2.txt

    no changes added to commit (use "git add" and/or "git commit -a")

マージされていないファイルがあります。また、`git merge`コマンドに`—abord`オプションを付与することで、マージを破棄できることがわかります。マージを最後まで完了させるためには、ファイルを手動で修正して、再度`git commit`コマンドを実行しなければなりません。

```bash
cat branch-2.txt
```

競合が発生したファイルの内容を確認します。

    branch-2
    <<<<<<< HEAD
    branch-2_2
    =======
    branch-2_1
    >>>>>>> issue3

Gitにより自動的に競合箇所にマークが付与されています。（2行目、4行目、6行目）

```bash
cat branch-2.txt
```

以下のようにファイルを修正しました。

    branch-2
    branch-2_2
    branch-2_1

この状態でコミットします。

```bash
git commit -a -m "merge branch issue3"
```

コミットが正常に完了すると、以下のようなメッセージが表示されます。

    [master a27898d] merge branch issue3

コミットの履歴を確認してみましょう。

```bash
git log
```

最新のコミットで`master`ブランチにマージされていることがわかります。

    commit a27898da0c9736bc92d9cb2ab8306f6095ed8c1b (HEAD -> master)
    Merge: 955123a 4e90a56
    Date:   Thu Mar 21 14:35:12 2019 +0900

        merge branch issue3

    commit 955123a3f466dc0594854d2d0374b4df15a5f17b
    Date:   Thu Mar 21 14:27:12 2019 +0900

        modify branch-2.txt on master

このようにGit上で自動的にマージができない場合は、Fast-forwardマージは実行されません。

## まとめ

今回は、ローカル上にリポジトリを作成し、Gitの基本コマンドについて見てきました。次回は、GitHubを使用したリモートリポジトリの活用についてご紹介します。
