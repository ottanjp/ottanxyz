---
author: ["@ottanxyz"]
date: 2015-08-06T00:00:00+00:00
draft: false
title: Objective-Cで書かれたソースコードをSwiftに変換してくれる「Objective-C to Swift Converter」
type: post
slug: objective-c-to-swift-1915
categories:
- Web
tags:
- Tips
---

![](/uploads/2015/08/150806-55c337463614c.jpg)






Appleの製品で動作するアプリケーションは、すべて「Objective-C」で書かれていましたが、先日のWWDCで新言語「Swift」が発表され話題になりました。「Swift」は、従来も直感的なプログラミングを行うことができる言語であり、プログラミング初心者でもとっかかりの良いものとなっています。





今回は、今までの主流言語であった「Objective-C」のソースコードを解析して、「Swift」に変換してくれる「Objective-C to Swift Converter」をご紹介します。もちろん、人の手で作られたものですから完全ではありませんが、「Objective-C」経験者ならありがたいサービスかもしれません。



https://objectivec2swift.com/?ref=producthunt#/converter/code



サンプルは以下の通りです。こちらが「Objective-C」で書かれたもの。




    
    @implementation SampleClass
    - (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
    {
        static NSString *CellIdentifier = @"CountryCell";
        UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
        if (cell == nil) {
            cell = [[[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier] autorelease];
        }
        NSString *continent = [self tableView:tableView titleForHeaderInSection:indexPath.section];
        NSString *country = [[self.countries valueForKey:continent] objectAtIndex:indexPath.row];
        cell.textLabel.text = country; 
        cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
        return cell;
    }
    @end





そして、こちらが変換後のソースコード。すべて「Swift」の形式で書き直されていることがわかります。まだまだ完全にパースできる状態ではないようですが、「Swift」への移行を考えている方がいらっしゃるならば、こちらのサイトを一度利用してみてはいかがでしょうか。




    
    class SampleClass {
        func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
            static var CellIdentifier: String = "CountryCell"
            var cell: UITableViewCell = tableView.dequeueReusableCellWithIdentifier(CellIdentifier)
            if cell == nil {
                cell = UITableViewCell(style: UITableViewCellStyleDefault, reuseIdentifier: CellIdentifier)
            }
            var continent: String = self.tableView(tableView, titleForHeaderInSection: indexPath.section)
            var country: String = self.countries.valueForKey(continent).objectAtIndex(indexPath.row)
            cell.textLabel.text = country
            cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator
            return cell
        }
    }





こちらのコードを見る限りでも、いかに「Swift」が「Objective-C」の独特の書き方と異なり、優れていることがわかりますね。私は、「Objective-C」を少し触ったことがあるくらいで、「Swift」についてはまだまだ勉強不足ですが、サンプルを見ながら勉強していきたいと思います。
