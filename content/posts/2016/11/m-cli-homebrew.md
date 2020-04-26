---
author: ottan
date: 2016-11-26 06:11:59+00:00
draft: false
title: Macをターミナルから操る「m-cli」のソースコードがタメになるというお話
type: post
slug: m-cli-homebrew-5266
categories:
- Mac
tags:
- Tips
---

![](/uploads/2016/11/161126-583923da38587.jpg)






Homebrewは、macOS Sierraでも使用可能なパッケージマネージャーです。そのHomebrewを使用してインストールできるパッケージに「m-cli」というツールがあります。「m-cli」はオープンソースのパッケージで、GitHubでソースコードが公開されています。



https://github.com/rgcr/m-cli



「m-cli」は、macOS Sierraで実行可能なコマンドをラップしているだけに過ぎないのですが、そのラップされているコマンドを参照すると、macOS Sierraをどのようにしてターミナルから操作するかがわかります。



https://github.com/rgcr/m-cli/tree/master/plugins



プラグインは上記で公開されています。





## macOS Sierraをターミナルから操作する





詳細は、GitHubで公開されているソースコードを参照していただくとして、今回は一部をご紹介します。





### Bluetoothのオン／オフ





たとえば、Bluetoothのオン、オフ。通常であれば、メニューバーからオン、オフするか、システム環境設定を開いて、GUIでオン、オフします。これをターミナルから操作できます。




    
    defaults read /Library/Preferences/com.apple.Bluetooth ControllerPowerState





Bluetoothの状態を参照するためには上記のコマンドを実行します。`1`であればBluetoothは「オン」、`0`であればBluetoothは「オフ」です。




    
    sudo defaults write /Library/Preferences/com.apple.Bluetooth ControllerPowerState -int 1
    sudo killall -HUP blued





Bluetoothをオンにするためには上記のコマンドを実行します。「blued」と呼ばれるデーモンを再起動すれば良いことがわかります。




    
    sudo defaults write /Library/Preferences/com.apple.Bluetooth ControllerPowerState -int 0
    sudo killall -HUP blued





Bluetoothをオフにするためには上記のコマンドを実行します。





### Wi-Fiのオン／オフ／スキャン





続いて、Wi-Fiをターミナルから操作する方法です。




    
    /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I





現在接続されているWi-Fiの状態を確認するためには、ターミナルから上記のコマンドを実行します。




    
         agrCtlRSSI: -60
         agrExtRSSI: 0
        agrCtlNoise: -95
        agrExtNoise: 0
              state: running
            op mode: station 
         lastTxRate: 867
            maxRate: 1300
    lastAssocStatus: 0
        802.11 auth: open
          link auth: wpa2-psk
              BSSID: xx:xx:xx:xx:xx:xx
               SSID: xxxx
                MCS: 9
            channel: 36,80





接続されているアクセスポイントのSSIDやチャンネル、RSSIやノイズをターミナルから確認できます。




    
    networksetup -setairportpower en0 off





Wi-Fiをオフにするためには、`networksetup`コマンドを使用します。パラメーターにネットワークインタフェース（MacBook Pro Late 2013の場合は「en0」）と「on/off」を指定します。




    
    networksetup -setairportpower en0 on





逆にWi-Fiをオンにするためには、上記のコマンドを使用します。





## まとめ





その他、Mac App Storeからダウンロードしたアプリのアップデートやデスクトップの壁紙の変更方法まで、ターミナルから操作するのが難しい、痒い所に手が届くコマンドが多数用意されていますので、興味のある方はぜひのぞいてみてください。
