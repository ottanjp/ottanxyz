import markdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';
import htm from 'htm';
import hljs from 'highlight.js';

const html = htm.bind(h);
const md = new markdownIt({
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
md.use(markdownItKatex);

const Post = createClass({
  render() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title'], null);
    const body = entry.getIn(['data', 'body'], null);
    const bodyRendered = md.render(body || '');

    return html`
      <body>
        <main>
          <article class="markdown-body">
            <h1>${title}</h1>
            <div dangerouslySetInnerHTML=${{ __html: bodyRendered }}></div>
          </article>
        </main>
      </body>
    `;
  },
});

CMS.registerPreviewTemplate('blog', Post);
