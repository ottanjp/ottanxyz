---
author: ottan
date: 2019-04-06T22:57:01+09:00
draft: false
title: "Git初心者が最初から学ぶGitの入門（リモートリポジトリ）"
type: post
slug: git-basis-beginner-remote-repository-20190404
categories: ["Mac"]
tags: ["Git","GitHub","VS Code"]
toc: true
---

![](/uploads/2019/04/190406-b00cb34a8bada846.jpg)

[前回の記事](/git-basis-beginner-20190303/)でGitの基本的な操作方法についてご紹介しました。ローカル上にGitのリポジトリを作成し、コミット、ブランチ、マージといったGitのコアとなる部分について学びました。今回は、GitHubを使用して主にリモートリポジトリの扱いに焦点を当ててご紹介します。あらかじめ、GitHubのアカウントを作成しておいてください。（今回はGitHubの機能を使用するわけではないため、厳密にはGitHubのアカウントについては必須ではありません）

まずは、GitHubにサインインして、新規リポジトリを作成しましょう。その際に、すでにコミットされているローカルリポジトリの情報をマージするため、「Initialize this repository with a README」のチェックは外しておきましょう。今回は、`training`という名前で空のリポジトリを作成しました。

![](/uploads/2019/04/190406-f8ddfae612ff88ce.png)

## リモートリポジトリ

[前回の記事](/git-basis-beginner-20190303/)で作成した、ローカルのリポジトリを引き続き使用します。まだ、ローカルリポジトリを作成していない方は、作業ディレクトリを作成し`git init`コマンドでローカルディレクトリにGitリポジトリを作成しておいてください。

Gitは、分散型バージョン管理システムです。それに対して、Subversionは集中型バージョン管理システムと呼ばれます。

Subversionは、1つのリポジトリに対して複数人が作業を実施します。ユーザーは、同一のファイルに対してあらかじめ編集の競合が起きないように、「チェックアウト」（ロック）を行います。また、マスターとなるリポジトリが決まっているため、そのリポジトリにアクセスできないユーザーは作業を実施できません。競合しないことが前提となっているためシンプルである分、複数人による同時作業には向きません。

それに対して、Gitはユーザー毎にリポジトリを持ちます。ユーザーは、各人のリポジトリで作業を実施し、最終的な結果をマスターとなるリポジトリにマージします。Gitは、リポジトリが複数存在するため、同一ファイルに対する編集の競合が発生するかもしれません。編集の競合（コンフリクト）については、前回の記事でご紹介しました。

### リモートリポジトリの追加

GitHubは、Gitリポジトリを提供するマネージド型サービスです。複数人のユーザーが、GitHub上のリポジトリをクローン（clone）、またはフォーク（fork）して使用します。フォーク（fork）やプルリクエスト（pull request）など、GitHub固有の機能については、次回以降取り上げます。ユーザーは、ローカルホストのリポジトリ上で作業を実施し、実施した結果を最終的にGitHub上のリポジトリにGitの仕組みを使用してマージします。

まず、ローカルで作業していたリポジトリに対して、GitHub上のリポジトリをリモートリポジトリとして設定する方法を見ていきます。すでに作成済みのローカルリポジトリに対して、リモートリポジトリの設定を追加する場合、`git remote`コマンドで行います。

```bash
git remote add origin https://github.com/ottanxyz/training
```

リモートリポジトリには、ローカルと区別するために名前を付与する必要があります。慣例的に`origin`という名前を付けることが多いですが、名称は何でも構いません。なお、`git clone`でリポジトリをコピーした場合、自動的に`origin`という名称でリモートリポジトリが設定されます。なお、すでに`origin`という名前のリポジトリが存在する場合は、`git remote`で上書きすることもできます。

```bash
git remote set-url origin https://github.com/ottanxyz/training
```

なお、リモートリポジトリは複数設定できます。主にリポジトリをフォークした際に、フォーク元のリポジトリの変更を追跡するために使用しますが、詳細は次回以降に取り上げます。

### リモートリポジトリの詳細

先ほど作成したリモートリポジトリの詳細を確認してみましょう。`git remote`コマンドに`-v`オプションを付与します。

```bash
git remote -v
```

`origin`という名前のリモートリポジトリが設定されていることがわかります。

    origin	https://github.com/ottanxyz/training (fetch)
    origin	https://github.com/ottanxyz/training (push)

リモートリポジトリにあるブランチの情報も確認してみましょう。`git branch`コマンドに`-a`オプションを付与すると、リモートリポジトリのブランチも合わせて表示されます。

```bash
git branch -a
```

`remotes/origin/master`は、リモート（remote）リポジトリとして設定した`origin`という名称の`master`ブランチを指しています。では、`origin/master`とはなんでしょうか。（今回の場合）`remotes/origin/master`と`origin/master`は同義です。即ち、リモートリポジトリとして設定した`origin`の`HEAD`は、リモートリポジトリの`master`ブランチの最新のコミットと一致していることもわかります。

    * master
      remotes/origin/HEAD -> origin/master
      remotes/origin/master

少し奥歯に物が挟まったような表現をしたのは、Gitではややこしいことに`origin/master`というブランチを作成することもできるからです！このような混乱を招きそうなブランチを作成したくはありませんが、試しに作成してみて`git branch`コマンドを実行すると、以下のように表示されます。

    * master
      origin/master
      remotes/origin/HEAD -> remotes/origin/master
      remotes/origin/master

Gitが気を利かせて、`origin/master`ではなく`remotes/origin/master`として表示してくれました。

```bash
git branch -D origin/master
```

誤って作成してしまった、ややこしい名前のブランチはさっさと消しておきましょう。以降、`origin/master`と言えば、`remotes/origin/master`のことを指します。

### プッシュ

続いて、ローカルリポジトリでコミットした内容を、リモートリポジトリに反映してみましょう。ローカルリポジトリの内容をリモートリポジトリへ反映させることを、プッシュ（push）と呼びます。逆の操作を、フェッチ（fetch）と呼びますが、こちらは後述します。

ローカルリポジトリの`master`ブランチを、リモートリポジトリである`origin`にプッシュするためには、以下のコマンドを実行します。

```bash
git push -u origin master
```

GitHub上にローカルリポジトリでコミットした内容が反映されているはずです。

![](/uploads/2019/04/190406-01de9fbe9b3e7835.png)

#### 上流ブランチ

ところで、`git push`に付与した`-u`オプションは何を意味するのでしょうか。`-u`オプションを付与しない場合と比較して何が異なるのでしょうか。`-u`オプションの謎を解き明かすため、ここでもう一度整理しておきましょう。Gitは、用語が多いので時に混乱を招きます。

以下のコマンドで新たなブランチを作成します。

```bash
git checkout -b sample
```

この状態で`git status`を確認すると、以下のように表示されるはずです。ここまでは前回と同様です。

    On branch sample
    nothing to commit, working tree clean

ここで以下のコマンドを実行します。

```bash
git branch sample --set-upstream-to master
```

`--set-upstream-to`オプションはよく使用されるため、`-u`という短縮形が用意されています。現在のブランチに対して`master`ブランチを**上流ブランチ**として設定しなさいという意味になります。先ほど`git push`の際に使用したオプションも同様です。なお、`sample`を省略すると、現在のブランチに対して同じ操作を実行します。Gitのコマンドの多くは、現在のブランチを省略できます。

この状態でステータス（何かあったときのための、`git status`！）を確認してみます。新たに情報が追加されていることがわかりますね。「`master`ブランチは、`sample`ブランチの上流ブランチである」ことを示しています。

    On branch sample
    Your branch is up to date with 'master'.

    nothing to commit, working tree clean

では、具体的に「上流ブランチ」には何の役目があるのでしょうか。具体的な例を示すために、`master`ブランチで新たにファイルの変更をコミットします。

```bash
git checkout master
touch upstream.txt
git add upstream.txt
git commit -m "add upstream.txt"
```

この状態で、再び`git checkout`コマンドで`sample`ブランチに切り替えてみます。

    Switched to branch 'sample'
    Your branch is behind 'master' by 1 commit, and can be fast-forwarded.
      (use "git pull" to update your local branch)

`master` ブランチを上流ブランチとして設定したことにより、`sample`ブランチに切り替えた際、`master`ブランチに変更がある旨を表示してくれました。また、Fast-forward（早送り）によるマージが可能であることもわかります。実際に、`git merge`を実行すると`master`ブランチの変更が、`sample`ブランチにマージされます。なお、再三繰り返していますが、この情報は`git status`コマンドでも確認できます。

さて、再び`master`ブランチに戻り、Gitリポジトリの状態を確認してみます。

```bash
git checkout master
git status
```

`origin/master`、即ちリモートリポジトリである`origin`の`master`ブランチは、ローカルリポジトリの`master`ブランチの上流ブランチであることがわかりました。

    On branch master
    Your branch is up to date with 'origin/master'.

    nothing to commit, working tree clean

#### リモート追跡ブランチ

この`origin/master`ブランチについて、もう少し詳しくみていきます。

`origin/master`ブランチは、`origin`というリポジトリにある`master`ブランチを指し示していることは前述の通りです。さらに、`origin/master`ブランチは、ローカルリポジトリにある`master`ブランチの上流ブランチです。ということは、GitHub上の`master`ブランチにファイルを追加すると、先ほどのようにローカルリポジトリの`master`ブランチに通知されるはずです！

GitHubの`master` ブランチで適当にファイルを作成してみてください。そのあと、`git status`コマンドにより、ローカルリポジトリの`master`ブランチの様子を確認してみます。

    On branch master
    Your branch is up to date with 'origin/master'.

    nothing to commit, working tree clean

`origin/master`ブランチを更新したはずなのに、何も変更が表示されません。ただ、`origin/master`が`master`の上流ブランチであることは、上記の表示から理解できます。

`origin/master`は、`origin`というリモートリポジトリにある`master`ブランチを指していることを冒頭から散々述べてきました。実は、この`origin/master`はリモートリポジトリにある`master`ブランチの参照であり、実態ではないのです。よく考えれば、リポジトリが異なるので当たり前です。

このリモートリポジトリにあるブランチを指す、ローカルリポジトリのブランチ（今回の場合は、`origin/master`）のことを**リモート追跡ブランチ**と呼びます。リモート追跡ブランチは、文字通りリモートリポジトリにあるブランチを追跡するために使用されるブランチです。

まとめると、`origin/master`は、ローカルリポジトリの`master`ブランチの上流ブランチであり、リモートリポジトリの`master`ブランチのリモート追跡ブランチです。

    (local)                        |     (remote)
    master ---> origin/master -----|----> master

では、リモートリポジトリの変更をローカルリポジトリへ取り込むためにどうすればよいでしょうか。リモートリポジトリの情報をローカルリポジトリに取り込むためには、`git fetch`コマンドを使用します。もっと言えば、`git fetch`コマンドによりローカルリポジトリの`master`ブランチの上流ブランチである`origin/master`が更新されます。

#### `git push -u`の意味

先に`-u`オプションの謎を解き明かしておきましょう。`-u`オプションは、現在のブランチ、もしくは指定したブランチの上流ブランチを設定するオプションでした。では、以下のコマンドはどのような意味になるでしょうか。

```bash
git push -u origin master
```

これは、ローカルリポジトリの`master`ブランチを、リモートリポジトリである`origin`にプッシュするとともに、`origin/master`を`master`の上流ブランチとして設定しています。逆に言えば、`-u`オプションを使用しないと、上流ブランチは自動的に設定されません。

なお、別のGitリポジトリをクローン（clone）すると、自動的にローカルリポジトリへ`master`ブランチが作成され、`origin/master`が`master`ブランチの上流ブランチとして設定されます。

#### プッシュ（2回目以降）

さて、上流ブランチについて学んだところで、もう一度リモートリポジトリに対してプッシュしてみましょう。今度は、リモートリポジトリ名、ブランチを指定しなくても、以下のコマンドだけでプッシュできるはずです。

```bash
git push
```

これは、`master`ブランチの上流ブランチとして`origin/master`が設定されているからです。もし、上流ブランチとして設定されていない場合、以下のようなエラーが表示されます。

    fatal: The current branch master has no upstream branch.
    To push the current branch and set the remote as upstream, use

        git push --set-upstream origin master

### フェッチ

では、GitHub（リモートリポジトリ）の変更を取り込んでみましょう。リモートリポジトリの変更を取り込むためには、`git fetch`コマンドにより`origin/master`を更新する必要があることは述べました。実際に、`git fetch`コマンドを実行してみましょう。

```bash
git fetch
```

これで、`origin/master`に変更が取り込まれました。では、ローカルリポジトリとリモートリポジトリの差分を確認してみましょう。リモートリポジトリとの差分を確認するためには、`git diff`コマンドにリモートリポジトリのブランチを指定します。`git diff`は、リポジトリ上で作業をしていると、さまざまな差分を取得してくれます。

```bash
git diff origin/master
```

以下のようなログが確認できたでしょうか。

```bash
diff --git a/github-4.txt b/github-4.txt
deleted file mode 100644
index 8b13789..0000000
--- a/github-4.txt
+++ /dev/null
@@ -1 +0,0 @@
```

内容が問題ないと確認できた場合は、`git merge`コマンドによりリモートリポジトリの変更をマージします。

```bash
git merge
```

前回、マージする際にブランチ名を指定していたことを思い出してください。今回は、`master`ブランチの上流ブランチとして`origin/master`ブランチを指定していたため、Gitが気を利かせて上流ブランチの変更を自動的にマージしてくれたわけです。

### プル

プル（pull）とは、リモートリポジトリの変更を取り込み（fetch）、マージ（merge）まで一気に行う方法です。GitHubにおける「プル」リクエスト（通称、プルリク）とは、別のリポジトリやブランチからの変更を取り込み、マージしてほしい意思を伝えるための手段です。プルリクエストについては、今回は取り上げません。

```bash
git pull
```

上流ブランチを指定している場合、ブランチ名を指定する必要はありません。上記のコマンドは、以下と同義です。

```bash
git fetch && git merge
```

英語の対義語としては、プッシュ（push）の反対はプル（pull）を思い浮かべるかもしれません。しかし、Gitにおけるプル（pull）とは、上記の通りリモートリポジトリの変更をローカルに取り込んだ上で、さらにマージする行為を指します。プッシュ（push）、即ちローカルリポジトリの変更をリモートリポジトリに取り込む行為の反対は、フェッチ（fetch）が正しい認識です。

## まとめ

Gitにおける用語が多数登場しました。また、前回と今回でご紹介していないコマンドやオプションも多数あります。次回以降のタイミングで、GitHubのコラボレーション機能（フォーク、プルリクエスト）について取り上げたいと思います。
