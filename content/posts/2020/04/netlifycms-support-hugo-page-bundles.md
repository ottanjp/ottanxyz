---
author: ["@ottanxyz"]
title: Netlify CMS + HugoでPage Bundles（コンテントと画像を同じ場所に配置）に対応する
date: 2020-04-26
tags:
  - Hugo
  - Netlify
categories:
  - Blog
slug: netlifycms-support-hugo-page-bundles
---
[Hugo | Netlify CMS | Open-Source Content Management System](https://www.netlifycms.org/docs/hugo/)に沿って構築した、Netlify CMSのテンプレートを、[Page Bundles | Hugo](https://gohugo.io/content-management/page-bundles/)に対応させる方法です。

最終的なディレクトリ構成は以下の通りです。Page Bundlesに無関係な項目は割愛、一部名称の変更を行っています。

```
.
├── archetypes
├── assets
├── config.yml
├── content
│   ├── posts
│   │   └── 2020
│   │       ├── 03
│   │       │   ├── post1.md
│   │       │   └── post2.md
│   │       └── 04
│   │           ├── post3.md
│   │           └── post4.md
│   └── uploads
│       └── 2020
│           ├── 03
│           │   ├── image1.png
│           │   └── image2.png
│           └── 04
│               ├── image3.png
│               └── image4.png
├── data
├── layouts
├── static
│   └── admin
│       ├── config.yml
│       └── index.html
└── themes
    └── theme
        ├── archetypes
        │   └── default.md
        ├── images
        └── layouts
            ├── _default
            │   ├── _markup
            │   │   └── render-image.html
            ├── index.html
            ├── partials
            │   ├── ...
            └── shortcodes
```

## Netlify CMSのカスタマイズ

`static/admin/index.html`でロードする、Netlify CMSのスクリプトのバージョンが、`2.10.17`以降であることを確認してください。公式のチュートリアルのまま進めていれば特に問題ありません。

```html
<script src="https://unpkg.com/netlify-cms@^2.10.17/dist/netlify-cms.js"></script>
```

`static/admin/config.yml`を以下のように修正します。長くなるため、本筋ではない項目については、内容を一部割愛しています。

```yaml
backend:
  name: git-gateway
  branch: master
media_folder: /static/images
public_folder: /images
publish_mode: editorial_workflow
collections:
  - name: 'blog'
    label: 'Blog'
    folder: 'content/posts'
    create: true
    slug: '{{fields.slug}}'
    path: '{{year}}/{{month}}/{{slug}}'
    preview_path: posts/{{year}}/{{month}}/{{slug}}/
    media_folder: '../../../uploads/{{year}}/{{month}}'
    public_folder: '/uploads/{{year}}/{{month}}'
    identifier_field: title
    fields:
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Publish Date', name: 'date', widget: 'datetime', format: 'YYYY-MM-DD' }
      - { label: 'Body', name: 'body', widget: 'markdown' }
      - { label: 'Slug', name: 'slug', widget: 'string' }
```

順を追って説明します。

### folder

コンテントが保存されるパスです。コレクション毎に指定します。ここで指定したパスが起点になります。

### slug

生成されるMarkdownのファイル名になります。今回は、コレクションのフィールドで明示的に指定した`slug`フィールドを採用しています。例えば、以下のように入力すると、生成されるMarkdownのファイル名は、`netlifycms-support-hugo-page-bundles.md`です。

![](/uploads/2020/04/screenshot-2020-04-11-11.18.12.png)

### path

生成されるMarkdownのファイルが格納される場所です。`{{year}}`や`{{month}}`はNetlify CMSで使用できる独自テンプレートです。Markdownのファイルが生成された年（西暦4桁）、月（ゼロ埋め2桁）になります。

```
{{year}}/{{month}}/{{slug}}
```

前述の`slug`を指定した場合、`folder`を考慮すると、以下のMarkdownファイルが生成されます。ディレクトリが存在しない場合は、Netlify CMSが自動的に生成します。

```
content/posts/2020/04/netlifycms-support-hugo-page-bundles.md
```

### media_folder

ルートと、`collections`配下の、2箇所に登場します。ルートの`media_folder`は、Netlify CMSのトップページ（ダッシュボード）で、「Media」を選択時に画像ファイルがアップロードされるパスを示しています。

`collections`配下の`media_folder`がポイントです。こちらは、コレクション単位で、画像ファイルのアップロード先を変更することができます。コンテント作成時に挿入する画像ファイルを格納するディレクトリを指定します。

```yaml
media_folder: '../../../uploads/{{year}}/{{month}}'
```

パスの指定方法は、絶対パスで指定、もしくは**生成されるMarkdownを起点とした相対パス**での指定が可能です。前述の`path`を指定した場合、

```
content/posts/2020/04/../../../uploads/2020/04/image1.png
```

つまり、

```
content/uploads/2020/04/image1.png
```

に格納されます。これで自由に画像ファイルを配置することができるようになりました。

### public_folder

Markdownに実際に記載される画像ファイルのパスです。アップロードした画像ファイルは、

```
content/uploads/2020/04/image1.png
```

配下に格納されますが、実際のMarkdownには、

```
![](/uploads/2020/04/image1.png)
```

のように記載されます。

### 静的ファイルをローカルホストで生成してみる

以上の設定をもとに、`hugo`コマンドで生成した`public`ディレクトリ配下の構造は以下の通りです。（一部、割愛しています）

```
public
├── admin
│   ├── config.yml
│   └── index.html
├── index.html
├── index.xml
├── posts
│   ├── 2020
│   │   ├── 03
│   │   │   ├── slug1
│   │   │   │   └── index.html
│   │   │   └── slug2
│   │   │       └── index.html
│   │   └── 04
│   │       ├── slug3
│   │       │   └── index.html
│   │       └── slug4
│   │           └── index.html
│   └── index.html
└── uploads
    └── 2020
        ├── 03
        │   ├── image1.png
        │   └── image2.png
        └── 04
            ├── image3.png
            └── image4.png
```

デフォルトの公開ディレクトリである`public`配下に`posts`、`uploads`ディレクトリが生成され、コンテントと画像ファイルを想定どおりに配置することができました。

## コンテントと画像ファイルを同じパスに配置する

同じようにして、コンテントと画像ファイルを同じディレクトリに格納することもできます。

```yml
collections:
  - name: 'blog'
    media_folder: ''
    public_folder: ''
```

先ほどより単純になりました。

## 既知の問題

* デプロイプレビュー（Deploy Preview）のリンクをクリック時に、「404 Not found」となる

`preview_path`に問題があると考えられるが、原因調査中。

## 参考リンク

* [Hugo | Netlify CMS | Open-Source Content Management System](https://www.netlifycms.org/docs/hugo/)
* [画像ファイルを Markdown ファイルと同じディレクトリに置く (Page Bundle) | まくまくHugo/Goノート](https://maku77.github.io/hugo/misc/page-bundle.html)
