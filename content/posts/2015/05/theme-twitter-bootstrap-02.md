---
author: ottan
date: 2015-05-23 12:12:10+00:00
draft: false
title: Twitter Bootstrap 3を用いてWordPressテーマを作成しよう②
type: post
url: /theme-twitter-bootstrap-02-1456/
categories:
- Blog
tags:
- Development
---

![](/uploads/2015/05/150523-556023a46a7b7.jpg)

[Twitter Bootstrap 3を用いてWordPressテーマを作成しよう①](/theme-twitter-bootstrap-01-1453/)までで、[Initializr](http://www.initializr.com/)を使用したプロトタイプの作成から、ヘッダー、フッターの分割までを行いました。今回は、メインとなる投稿一覧の表示部分をカスタマイズしていきたいと思います。前回の記事をまだご覧になっていない方はそちらからご覧ください。

## Twitter Bootstrapのグリッドシステム

まず、メインの作成へ着手する前に、Twitter Bootstrapの根幹ともいえるグリッドシステムについてご紹介します。Twitter Bootstrapでは、デバイスを以下の4種類に分類し、デバイスの横幅に応じて表示を変える、いわゆる**レスポンシブデザイン**に対応しています。

-   デバイスの横幅が768px未満
-   デバイスの横幅が768px以上、992px未満
-   デバイスの横幅が992px以上、1200px未満
-   デバイスの横幅が1200px以上

また、表示エリアを縦に12分割し、その分割したカラムの組み合わせで自由自在にレイアウトできるようになっています。たとえば、メイン表示領域を9カラム、サイドバー領域を3カラム、のようにカラムの合計が12になるように調整します。

|                 | Extra small devices Phones (&lt;768px) | Small devices Tablets (≥768px)                   | Medium devices Desktops (≥992px) | Large devices Desktops (≥1200px) |
| --------------- | -------------------------------------- | ------------------------------------------------ | -------------------------------- | -------------------------------- |
| Grid behavior   | Horizontal at all times                | Collapsed to start, horizontal above breakpoints |                                  |                                  |
| Container width | None (auto)                            | 750px                                            | 970px                            | 1170px                           |
| Class prefix    | `.col-xs-`                             | `.col-sm-`                                       | `.col-md-`                       | `.col-lg-`                       |
| # of columns    | 12                                     |                                                  |                                  |                                  |
| Column width    | Auto                                   | ~62px                                            | ~81px                            | ~97px                            |
| Gutter width    | 30px (15px on each side of a column)   |                                                  |                                  |                                  |
| Nestable        | Yes                                    |                                                  |                                  |                                  |
| Offsets         | Yes                                    |                                                  |                                  |                                  |
| Column ordering | Yes                                    |                                                  |                                  |                                  |

### メインの表示領域を作成する

ブログらしく、メインコンテンツ（投稿一覧を表示する領域）、サイドバーコンテンツ（ウィジェットを表示する領域）が表示できるように、「**index.php**」を修正します。[Initializr](http://www.initializr.com/)により自動生成されたコードを、以下のように修正してください。

```html
<!-- Example row of columns -->
<div class="row">
	<div class="col-sm-8">
		<h2>Heading</h2>
		<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
		<p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
    </div>
    <div class="col-sm-4">
		<h2>Heading</h2>
		<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
		<p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
    </div>
</div>
```

`.container` については、先ほどの表の「Container width」を見ると、どのように振る舞うかが理解できます。デバイスの横幅が768px未満の場合は、幅を固定せず流動的な値になります。また、デバイスの横幅が768px以上、992px未満の場合は、750px固定になります。

```css
.container {
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
}
@media (min-width: 768px) {
	.container {
	width: 750px;
	}
}
@media (min-width: 992px) {
	.container {
	width: 970px;
	}
}
@media (min-width: 1200px) {
	.container {
	width: 1170px;
	}
}
```

また、`row` という見慣れないクラスが出てきました。Twitter Bootstrapでは、グリッドを実現するために、CSSのプロパティである`float:left` を多用しています。しかし、`float` プロパティを多用した場合、意図せずテキストが回り込んでしまったりと、同プロパティの使用には頭を煮やします。

そこで、登場するのが`row` クラスです。同クラスで括られたタグの中では自由にレイアウトすることを可能にします。

```css
.row {
	margin-right: -15px;
	margin-left: -15px;
}
.row:before,
.row:after {
	display: table;
	content: " ";
}
.row:after {
	clear: both;
}
```

ここまでで以下のように表示されているはずです。また、今回はiPadの横幅である768pxに重点を置き、横幅が768px以上の端末であれば、メインおよびサイドバーを分けて表示するようにしました。（`col-sm-8` がメイン、`col-sm-4` がサイドバー）

![](/uploads/2015/05/150523-5560320b8c605.png)

### メインコンテンツに投稿一覧を表示しよう

では、いよいよメインコンテンツに投稿一覧を表示してみます。メインコンテンツは、`col-sm-8` クラスの配下に作成します。また、グリッドはネスト（複数階層）することも可能です。これを利用して、コンテンツの左側にはアイキャッチ画像、コンテンツの右側に投稿のタイトル、本文を表示してみます。`col-sm-8` 配下を以下のように編集してください。

```php
<?php if ( have_posts() ) : ?>
<?php while ( have_posts() ) : the_post() ?>
<div class="row">
	<div class="col-sm-4">
		<a href="<?php the_permalink(); ?>">
		<?php the_post_thumbnail( array( 180,9999) ); ?> </a>
	</div>
	<div class="col-sm-8">
		<h3> <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a> </h3>
	<div>
<?php the_excerpt(); ?>
</div>
<?php endwhile; ?>
<?php else : ?>
<div>投稿が見つかりませんでした。</div>
<?php endif; ?> 
</div>
```

`col-sm-8` クラス配下に、さらに`col-sm-4` 、`col-sm-8` クラスを作りました。ここでは上位のグリッド（`col-sm-8`）に合わせて、下位のグリッドも`col-sm-xx` としましたが、上位と下位で異なるグリッドを使用しても構いません。

-   グリッド構造はネストすることが可能
-   上位のグリッドと下位のグリッドは別々の横幅を指定する事が可能

#### 例

タブレット型端末（デバイスの幅：768px）では、メインコンテンツに対して、左側にアイキャッチ画像、右側にタイトルと抜粋を表示したい。iPhoneなどのスマートフォン（デバイスの幅：768px未満）では画面全体にアイキャッチ画像、その下にタイトルと抜粋を表示したい、とします。

```html
<div class="col-xs-12 col-sm-4">
	<?php the_post_thumbnail( array( 180,9999) ); ?>
</div>
<div class="col-xs-12 col-sm-8">
	<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
	<p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
</div>
```

複合クラス構成とすることで、タブレット型端末の場合は左右に分割して表示、それよりも横幅が狭い端末の場合は、グリッドいっぱいに文面を表示させるといったことができます。

### have_posts()関数とthe_posts()関数について

`have_posts()` 関数は、投稿が存在するかどうかを判定する関数です。投稿が存在すれば`true` 、投稿が存在しなければ`false` を返します。まだ投稿がない状態を想定して、`if` で投稿の有無を判定してからループに入ります。

`the_post()` 関数は、現在の投稿のオブジェクトを内部にセットする関数です。 同関数を呼び出すことでWordPressの持つ内部のインデックスがインクリメントされ、次の投稿を表示できるようになります。インデックスの初期値は0です。そのため、`the_post()` を1回呼び出せば、1つめの投稿を表示できます。

たとえば、投稿が1つの場合は、`the_post()` 関数が呼び出された時点でインデックスは最大値に達します。最大値に達した時点で`have_posts()` 関数は投稿が存在しないものとして`false` を返します。これで、`while` によるループは終了になります。

-   `have_posts()` 関数は、投稿が存在するかどうかを判定する関数
-   `the_posts()` 関数は、投稿を取得し内部のインデックスをインクリメントする関数
-   `have_posts()` 関数と`the_posts()` 関数はセットで用いるのが定石

### the_XXXX()関数とget_the_XXXX()関数について

よく間違えるのが、`the_XXXX()` という関数と、`get_the_XXXX()` 関数です。なぜ、2種類も存在するのか、それには理由があるからです。まずはじめに、どちらの関数も **`the_posts()` 関数により投稿が取得されている状態でなければ使用できません**。突然、`the_title()` 関数を呼び出しても何も表示されません。

では、両者の違いは何でしょうか。`the_XXXX()` 関数はブラウザに表示するための関数、`get_the_XXXX()` 関数は、コード内で値を受け取るための関数です。下記の例を見てください。

```php
$title = the_title(); // 誤り
$title = get_the_title(); // 正しい
```

`the_title()` 関数に戻り値はありませんので前者の使い方は誤っています。もし、変数に取得したい場合は、後者の方法をとる必要があります。取得した値を別の関数に渡したい場合など、ブラウザに表示する以外の用途で使う場合には、必ず`get_the_XXXX()` 関数を使用します。

![](/uploads/2015/05/150523-5560320f1e470.png)

ようやくブログらしい構成になってきました。長くなりましたので今回はこの辺で。
