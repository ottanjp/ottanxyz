---
title: Netlify Functions + Hugoで簡単サイト内検索
date: 2020-06-01
tags:
  - Hugo
  - Netlify
categories:
  - Blog
slug: netlify-functions-hugo-site-search
katex: false
---
## Hugo Configuration

`/config.yaml`

```yaml
outputs:
  home: [HTML,JSON,RSS]
```

`/layouts/index.json`

```go-html-template
{{- $.Scratch.Add "index" slice -}}
{{- range .Site.RegularPages -}}
  {{- $.Scratch.Add "index" (dict "title" .Title "tags" .Params.tags "categories" .Params.categories "permalink" .Permalink "summary" .Summary "publish_date" .PublishDate) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```

`/public/index.json`

```json
[{"categories":["Blog"],"permalink":"https://ottan.xyz/posts/2020/05/support-netlify-cms-katex/","publish_date":"2020-05-30T00:00:00Z","summary":"...","tags":["Netlify","Hugo","KaTeX"],"title":"Netlify CMSのプレビューでHightlight.js + KaTeX（LaTeX）をサポートする"},{...}]
```

## Netlify Functions

`/functions/search.js`

```javascript
const index = require('../public/index.json');
const Fuse = require('fuse.js');

const fuse = new Fuse(index, { keys: ['title'] });

exports.handler = function (event, context, callback) {
  const term = event.queryStringParameters.q || '';
  let result = fuse.search(term);
  const length = Math.min(result.length, 21);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result.slice(0, length)),
  });
}
```

`/package.json`

```json
{
...
  "dependencies": {
    "fuse.js": "^6.0.0"
  },
...
}
```

## Hugo Template

`/layouts/_default/baseof.html`

```html
<body>
...
  <main role="main">
    {{ block "main" . }}{{ end }}
  </main>
...
</body>
```

`/content/search.md`

```markdown
---
title: "検索結果"
sitemap:
  priority : 0.1
layout: "search"
---
```

`/layouts/_default/search.html`

```html
{{ define "main" }}
<!-- 検索結果表示用 -->
<section>
...
  <!-- 検索ワード・ヒット件数表示用 -->
  <div>検索結果：<span id="search-term"></span></div>
  <div>ヒット件数：<span id="search-count"></span></div>
...
</section>
<!-- 検索結果件数が上限に達したことを表示する -->
<section id="search-warning">
...
  検索結果の件数が多すぎます。そのため、一部のみ表示しています。
...
</section>
<!-- 検索結果が存在しないことを表示する -->
<section id="search-notfound">
...
  検索結果が0件です。別のキーワードをお試しください。
</section>
<section>
...
  <div id="search-result"></div>
...
</section>
<script>
  function formatDate(date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    return format;
  }

  function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
  }

  window.onload = async () => {
    const search_term = param('q')
    const result = await fetch(
      `/.netlify/functions/search?q=${search_term}`).then(x => x
      .json())
    if (result.length > 20) {
      document.getElementById('search-warning').classList.remove('is-hidden')
    } else if (result.length == 0) {
      document.getElementById('search-notfound').classList.remove('is-hidden')
    }
    let count = Math.min(result.length, 20);
    let html = '';
    for (i = 0; i < count; i++) {
      let publish_date = formatDate(new Date(result[i].item.publish_date), "yyyy.MM.dd");
      html += `<div>
        ...
          <div>
            <a href="${result[i].item.permalink}">${result[i].item.title}</a>
          </div>
          <div>${result[i].item.summary}</div>
          <div>
            <time>${publish_date}</time>
          </div>
        ...
      </div>`
    }
    document.getElementById('search-result').innerHTML = html
    document.getElementById('search-term').innerHTML = decodeURI(search_term)
    document.getElementById('search-count').innerHTML = count
  }
</script>
{{ end }}
```