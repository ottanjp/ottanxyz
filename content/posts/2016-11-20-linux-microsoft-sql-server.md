---
author: ottan
date: 2016-11-20 11:38:30+00:00
draft: false
title: LinuxにMicrosoft SQL Serverをインストールする方法
type: post
url: /linux-microsoft-sql-server-5249/
categories:
- Windows
tags:
- Development
- Linux
---

![](/images/2016/11/161120-58314ed6a9ab1.png)






[MicrosoftがLinux Foundationに参加](http://jp.techcrunch.com/2016/11/17/20161116microsoft-joins-the-linux-foundation/)するという、スティーブ・バルマー前CEOの時には考えられない行動にMicrosoftが出ています。Surface Studioや、Surface Dialなど、これまでのOS一辺倒であったMicrosoftがハードウェアに手を出して見たり、数々の資産をオープンソース化しています。また、Windows OSでしか使用できなかったソフトウェアを、MacやLinuxに移植し始めています。今回、ご紹介するMicrosoft SQL Serverも例外ではありません。



https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-release-notes



このように、現段階ではWindows版のMicrosoft SQL Serverと比較すると、まだまだ制限は多いものの、「Windows版のインストール、セットアップになんであんなに躓いたのか」というのが不思議なくらい簡単に初期セットアップできるようになっています。今回は、RedHat Enterprise Linux ServerとUbuntuにMicrosoft SQL Serverをインストール、セットアップする方法をご紹介します。





## LinuxにMS SQL Serverをインストールする





インターネットに接続できる環境であれば、セットアップは一瞬で完了します。以下の操作は、すべて特権ユーザで実施しているものとして記述しています。必要に応じて、`sudo`などを使用して置き換えてください。





### RedHat Enterprise Linux Server





まずは、RedHat Enterprise Linux Severからご紹介します。




    
    # cat /etc/redhat-release 
    Red Hat Enterprise Linux Server release 7.3 (Maipo)





今回使用するOSは上記の通りです。記事執筆時点の最新バージョンである7.3です。




    
    # curl https://packages.microsoft.com/config/rhel/7/mssql-server.repo > /etc/yum.repos.d/mssql-server.repo





SQL Serverのリポジトリを追加します。




    
    # cat /etc/yum.repos.d/mssql-server.repo 
    [packages-microsoft-com-mssql-server]
    name=packages-microsoft-com-mssql-server
    baseurl=https://packages.microsoft.com/rhel/7/mssql-server/
    enabled=1
    gpgcheck=1
    gpgkey=https://packages.microsoft.com/keys/microsoft.asc





追加したリポジトリの内容はこのようになっています。




    
    # yum install -y mssql-server





続いて、追加したリポジトリからSQL Serverをインストールします。ここまででインストール完了です。




    
    # /opt/mssql/bin/sqlservr-setup





続いて、SQL Serverを起動します。




    
    Do you accept the license terms? If so, please type "YES":





ライセンスに同意する必要があるため、「YES」と入力します。




    
    Please enter a password for the system administrator (SA) account:





また、System Administrator（SA）のパスワードを入力します。パスワードは、大文字、小文字、英数字、記号から3種類以上、8文字以上である必要があります。




    
    Do you wish to start the SQL Server service now? [y/n]:





サービスとしてインストールするかどうか確認されます。ここでは、「y」と入力します。




    
    Do you wish to enable SQL Server to start on boot? [y/n]:





起動時にサービスを自動的に起動するかどうか確認されます。ここでは、「y」とします。以上で、セットアップ完了です。




    
    # firewall-cmd --add-port=1433/tcp --permanent
    # firewall-cmd --reload





最後に、ホストの外部からSQL Serverに接続する必要がある場合は、ファイアウォールのポートを解放します。`firewalld`を使用している場合は、上記のコマンドを入力します。




    
    # iptables -A INPUT -p tcp --dport 1433 -j ACCEPT
    # iptables-save





`iptables`を使用している場合は、上記のコマンドを入力します。以上で、すべてのセットアップ完了です！非常に簡単ですね。機能がそぎ落とされている分、Windows版よりも簡単です。





### Ubuntu 16.04





Ubuntuの場合もほぼ同様の手順で実現できます。




    
    # curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -





まず、GPG（GNU Privacy Guard）に使用される公開鍵を追加します。




    
    # curl https://packages.microsoft.com/config/ubuntu/16.04/mssql-server.list | tee /etc/apt/sources.list.d/mssql-server.list





次に、SQL Serverのリポジトリを追加します。




    
    # cat /etc/apt/sources.list.d/mssql-server.list
    deb [arch=amd64] https://packages.microsoft.com/ubuntu/16.04/mssql-server xenial main





追加したリポジトリの内容はこのようになっています。




    
    # apt-get update
    # apt-get install -y mssql-server





続いて、`apt-get`コマンドでリポジトリの情報をリフレッシュしたら、SQL Severをインストールします。




    
    # /opt/mssql/bin/sqlservr-setup





最後に、SQL Serverをセットアップします。セットアップ内容については、RedHat Enterprise Linux Server版と同様ですので割愛します。とにかく簡単ですね！





## MS SQL Serverを操作する





SQL Serverといえば、Microsoft SQL Server Management Studioが有名ですが、残念ながらWindows版しかありません。そこで、今回はLinuxでも使用できるSQL Server Toolsをダウンロードして接続します。





### RedHat Enterprise Linux Server





インストール方法は、SQL Serverと同様です。




    
    # curl https://packages.microsoft.com/config/rhel/7/prod.repo > /etc/yum.repos.d/msprod.repo





SQL Server Toolsのリポジトリを追加します。




    
    # cat /etc/yum.repos.d/msprod.repo
    [packages-microsoft-com-prod]
    name=packages-microsoft-com-prod
    baseurl=https://packages.microsoft.com/rhel/7/prod/
    enabled=1
    gpgcheck=1
    gpgkey=https://packages.microsoft.com/keys/microsoft.asc





追加したリポジトリの内容は上記の通りです。




    
    # yum install -y mssql-tools





続いて、`yum`コマンドによりインストールします。




    
    Do you accept the license terms? (Enter YES or NO)





インストール時に、ライセンスに同意する必要があります。2種類のライセンスに同意する必要があるため、2回入力します。




    
    # sqlcmd -S localhost -U SA -P Password
    1> 





これで`sqlcmd`コマンドが使用できるようになりました。先ほどセットアップしたSystem Administratorのアカウントを使用して接続できることを確認します。接続後は、Windows版のSQL Serverと同様に操作できます。





### Ubunt 16.04





では、続いてUbuntuの場合です。




    
    # curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | tee /etc/apt/sources.list.d/msprod.list





SQL Serverのリポジトリを追加します。




    
    # cat /etc/apt/sources.list.d/msprod.list
    deb [arch=amd64] https://packages.microsoft.com/ubuntu/16.04/prod xenial main





追加したリポジトリの情報は上記の通りです。




    
    # apt-get update
    # apt-get install -y mssql-tools





`apt-get`コマンドでリポジトリ情報をリフレッシュ後に、SQL Server Toolsをインストールします。





![](/images/2016/11/161120-5831544ac81e5.png)






突然、このような画面が現れ驚かされますが、「Yes」を選択します。





![](/images/2016/11/161120-583154542e955.png)






もう1回表示されます。「Yes」を選択します。




    
    # sqlcmd -S localhost -U SA -P Password
    1>





後は、RedHat Enterprise Linux Serverと同様です。





## まとめ





SQL Serverはもう全部Linuxに移行すればいいと思う、というくらい簡単にセットアップできました。なお、SQL Serverをインストールするためには、3,258MB以上のメモリの割り当てが必要です。メモリが不足している場合には、インストール時に警告が表示され、インストールに失敗しますので、注意してください。
