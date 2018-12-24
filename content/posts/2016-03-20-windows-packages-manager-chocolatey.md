---
author: ottan
date: 2016-03-20 04:46:04+00:00
draft: false
title: PowerShellが使える環境ならどこでも使用できる、Windows用のパッケージ管理マネージャー「Chocolatey」
type: post
url: /windows-packages-manager-chocolatey-6845/
categories:
- Windows
tags:
- Development
---

![](/images/2016/03/160320-56ee136311e8e.png)






Macなら、[Homebrew](http://brew.sh/index_ja.html)で簡単にターミナルからCUIベースでパッケージ管理を行う事が可能です。今回は、Windowsでも同様のCUI　ベースでのパッケージ管理が可能となる、「Chocolatey」をご紹介します。





## Windowsのパッケージ管理マネージャー「Chocolatey」





今回は、Windows 10で「Chocolatey」を使用するための方法をご紹介します。





### Chocolateyのインストール





「Chocolatey」をインストールするためには、管理者権限でコマンドプロンプトを起動する必要があります。Windows 10の場合、「スタート」ボタンを右クリックして、「コマンドプロンプト（管理者）」をクリックします。





![](/images/2016/03/160320-56ee1364aa033.png)






UAC（User Account Control）が有効になっている場合は、コマンドプロンプトを管理者権限で実行して良いかどうかプロンプトが表示されるため、「はい」をクリックします





![](/images/2016/03/160320-56ee1367846ca.png)






「Chocolatey」をインストールするために、コマンドプロンプトで、以下のコマンドを実行します。なお、インストール方法は、今後変更される可能性もあります。そのため、以下のコマンドが正常に動作しない場合は、[Chocolatey Gallery](https://chocolatey.org/)から最新の情報を確認してください。




    
    @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin





![](/images/2016/03/160320-56ee1368777c9.png)






### パッケージのインストール





たとえば、Windowsの定番のシステムクリーナーである「CCleaner」も「Chocolatey」を使用して、コマンドプロンプトからインストールできます。「CCleaner」をインストールするために、コマンドプロンプトで、以下のコマンドを実行します。




    
    choco install ccleaner





![](/images/2016/03/160320-56ee136b60ca8.png)






インストールスクリプトを実行しても良いかどうか聞かれるため、「1」（yes）と入力して、Enterキーを押下します。





![](/images/2016/03/160320-56ee136d90296.png)






バッチファイルで、パッケージをインストールするために、毎回、「1」（yes）を入力するのは面倒です。このような場合には、コマンドプロンプトで実行する際に、「-y」オプションを付与します。




    
    choco install ccleaner -y





これで、毎回、「1」（yes）を入力する必要がなくなります。





### インストール可能なパッケージの検索





「Chocolatey」でインストール可能なパッケージを検索するためには、[Chocolatey Gallery](https://chocolatey.org/)から検索します。





![](/images/2016/03/160320-56ee1370b9eb2.png)






たとえば、「MySQL」で検索すると、以下のように検索結果が表示されるため、検索結果に記載されているコマンドを入力することで、パッケージをインストールすることが可能です。





![](/images/2016/03/160320-56ee13741dae0.png)






### パッケージのアンインストール





インストールしたパッケージをアンインストールするためには、コマンドプロンプトで、以下のコマンドを実行します。ここでは、インストールした、「CCleaner」をアンインストールします。




    
    choco uninstall ccleaner





![](/images/2016/03/160320-56ee13784fbde.png)






インストールスクリプトを実行しても良いかどうか聞かれるため、「1」（yes）と入力して、Enterキーを押下します。





![](/images/2016/03/160320-56ee137a749d2.png)






### GUIでパッケージを管理する





コマンドプロンプトの黒い画面が苦手だという人向けに、「Chocolatey」にはGUIも用意されています。コマンドプロンプトで、以下のコマンドを実行して、「Chocolatey」のGUIをインストールしてください。




    
    choco install chocolateygui





インストールしたパッケージのアンインストールや再インストールも、GUIで管理することができるようになります。





![](/images/2016/03/160320-56ee1619a0edf.png)






また、「Chocolatey」のギャラリーから、GUIを使用してパッケージをインストールすることができるようになります。





![](/images/2016/03/160320-56ee1627bf3f6.png)






## まとめ





Windowsでパッケージをインストールするためには、インストーラーを公式サイトからダウンロードしてきて、ダウンロードしたインストーラーを実行する、アンインストールするためには、コントロールパネルから削除する、という流れが一般的です。





しかし、「Chocolatey」を使用することで、主要なパッケージについては、わざわざインストーラーをダウンロードすることなく、CUI、もしくはGUIで簡単にインストール、アンインストールを行うことができます。Windowsでパッケージを管理したい場合には、「Chocolatey」がオススメです。



https://chocolatey.org/
