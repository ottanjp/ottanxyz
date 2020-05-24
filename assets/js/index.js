import markdownIt from "markdown-it";
import markdownItKatex from "./node_modules/markdown-it-katex";
import htm from "./node_modules/htm";
// import Prism from "prismjs";

const html = htm.bind(h);

let options = {
  html: true,
  typographer: true,
  linkify: true,
};

var customMarkdownIt = new markdownIt(options);
customMarkdownIt.use(markdownItKatex);

var Post = createClass({
  render() {
    const entry = this.props.entry;
    const title = entry.getIn(["data", "title"], null);
    const body = entry.getIn(["data", "body"], null);
    const bodyRendered = customMarkdownIt.render(body || "");

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

CMS.registerPreviewTemplate("blog", Post);
