---
author: ottan
date: 2016-10-27 14:19:37+00:00
draft: false
title: macOSのネイティブなHypervisor.frameworkを使用したオープンソースソフトウェア「Veertu Desktop」
type: post
url: /macos-hypervisor-framework-5141/
categories:
- Mac
tags:
- Development
---

![](/uploads/2016/10/161027-5812042cf26a9.jpg)






macOS上でWindowsなどを仮想マシンとして動作させるためのソフトウェア（エミュレーター、ハイパーバイザー）は、VMware Fusion、Parallels Desktop、VirtualBoxが有名ですが、新たなソフトウェアが加わりました。その名も「Veertu Desktop」。macOSにひっそりと追加されている、ネイティブなフレームワークである「Hypervisor.framework」を採用したオープンソースソフトウェアとして話題を集めています。





## Veertu Desktopの使用方法とメリット／デメリット





### Veertu Desktopのダウンロード





先ずは、Veertu Desktopをダウンロードします。以下のURLからダウンロードしてください。



https://veertu.com



### Veertu Desktopによる仮想マシンの構築





![](/uploads/2016/10/161027-5812043503ac2.png)






「Veertu Desktop.app」を起動します。今回は、Windows 10のISOファイルを使用するため、「Install from ISO or DVD」を選択します。なお、Windows 10のISOファイルは、Microsoftの公式サイトからダウンロード可能です（ライセンスは別途購入する必要がありますので注意してください）。



https://www.microsoft.com/ja-jp/software-download/Windows10ISO



選択したら、「Next」をクリックします。





![](/uploads/2016/10/161027-58120439dc3d3.png)






続いて、「VM Name」（仮想マシンの名称。任意の文字列。「Windows 10」など）、「.ISO image file or optical drive」でダウンロードしたISOファイルを選択します。選択したら、「Next」をクリックします。





![](/uploads/2016/10/161027-5812043ee161d.png)






「Select Guest Operating System and Family」からOSの種類を選択します。選択可能なOSは以下のとおり。






  * Windows

    * Windows 10
    * Windows 8
    * Windows Server 2012
    * Windows 7
    * Windows Server 2008
    * Windows Vista
    * Windows XP




  * Linux

    * Ubuntu (32bit/64bit)
    * Debian (32bit/64bit)
    * CentOS (32bit/64bit)
    * Mint (32bit/64bit)
    * SUSE (32bit/64bit)
    * Other (32bit/64bit)





Linuxのディストリビューションが数多くサポートされていることから、FreeBSD系の意思を受け継ぐmacOSも、もしかすると動作するかもしれませんね。また、Windowsについては、レガシーなOSについてもサポートされているようです。





![](/uploads/2016/10/161027-5812044477afd.png)






今回は、Windows 10の導入が目的であるため、「Windows」「Windows 10」を選択します。選択したら、「Next」をクリックします。





![](/uploads/2016/10/161027-58120745d7d28.png)






仮想CPU数、仮想メモリ、ディスクサイズをカスタマイズすることもできます。今回は、デフォルト値をそのまま採用しました。「Launch VM」をクリックします。





![](/uploads/2016/10/161027-5812044a93c83.png)






初回の仮想マシン作成時のみ、管理者権限による実行許可を求められます。管理者のユーザ名とパスワードを入力してください。





![](/uploads/2016/10/161027-581207b40ebf5.png)






MacBook Pro (Late 2013)モデルですが、ものの15分程度でWindows 10の仮想マシン環境の構築が完了しました。とくに日本語環境でも不具合なく動作しますね。





### Guest Add-onのインストール





VMware ToolsやParallels Toolsと同様の位置付けですね。シームレスなマウスカーソルの移動（デフォルトでは、⌃（control）+⌥（option）を押して、マウスカーソルを解放する必要があります）や、最適なドライバーのインストールなどに使用します。「Command」→「Install Guest Add-ons」を選択してください。自動的にCD-ROMドライブにマウントされます。





![](/uploads/2016/10/161027-581208eba7d43.png)






インストールは、「Setup.exe」をダブルクリックして、インストールウィザードにしたがって進めていくだけです。インストールが完了したら、再起動します。





### メリット





Veertu Desktopを使用する上でのメリットは以下の通りです。macOSネイティブのフレームワークを使用している点が、他のエミュレーターを寄せ付けない最大のメリットでしょうか。






  * macOSネイティブのHypervisor.frameworkを使用している
  * macOSが自動的にリソースの割り当てや、エネルギー管理を最適化してくれる
  * VMware Fusion、Parallels Desktop、VirtualBoxなどカーネル拡張（kext）を採用している他製品と比較し、同拡張を導入することがないため、脆弱性に強い（macOSの脆弱性にのみ依存する）
  * 仮想マシンはユーザ空間で動作するため、特権による乗っ取りなどがない
  * オープンソースソフトウェアである
  * Windows、Linuxのさまざまなディストリビューションがサポートされている




### デメリット





では、逆に「Veertu Desktop」のデメリットはどのようなものでしょうか。






  * macOSに最適化したキーマッピング（たとえば、Windowsでも⌘（command）+Cでコピーする）ができない
  * クリップボードの共有ができない
  * 他社製品と比較して実績が少ない
  * サポート情報が少ない（または英語）




## まとめ





とはいえ、個人で使用する分には最適なハイパーバイザーであるような気もします。VirtualBoxがなんとなくイヤという理由で、WindowsをBoot Campを利用して動作させている、という人にとっては朗報かもしれません。今のところ、目立つ不具合もなく、順調に動作しています。今後の機能拡張に期待されます。
