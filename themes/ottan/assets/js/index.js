import markdown from 'markdown-it';
import katex from '@iktakahiro/markdown-it-katex';
import htm from 'htm';
import hljs from 'highlight.js';

const html = htm.bind(h);
const md = new markdown({
  html: true,
  typographer: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});
md.use(katex);

const Post = createClass({
  render() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title'], null);
    let body = entry.getIn(['data', 'body'], null);
    body = md.render(body || '');
    // body = katex.renderToString(body, { throwOnError: false });

    return html`
      <body>
        <main>
          <article class="markdown-body">
            <h1>${title}</h1>
            <div dangerouslySetInnerHTML=${{ __html: body }}></div>
          </article>
        </main>
      </body>
    `;
  },
});

CMS.registerPreviewTemplate('blog', Post);
