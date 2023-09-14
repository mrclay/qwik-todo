import * as fs from 'node:fs';

// Creates embed-friendly dist/fragment.html
export default function vitePluginQwikFragment() {
  return {
    name: 'vite-plugin-qwik-fragment',
    enforce: 'post',
    closeBundle: {
      order: 'post',
      sequential: true,
      async handler() {
        if (!fs.existsSync('dist/index.html')) {
          return;
        }

        const markup = fs.readFileSync('dist/index.html').toString();
        const { documentFragment } = extractQwikMarkup(markup);
        fs.writeFileSync('dist/fragment.html', documentFragment);
      },
    },
  };
}

function extractQwikMarkup(markup) {
  let styles = '';
  let htmlAttrs = {};
  let body = '';
  let bootScripts = '';

  markup.replace(/<html ([^>]+)>/, (m0, m1) => {
    m1.replace(/(q[^= ]+)(="([^"]*)")?/g, (m0, m1, m2, m3) => {
      htmlAttrs[m1] = m3 ? m3 : '';
    });
  });

  markup.replace(/<style [\w\W]*?<\/style>/g, (m0) => {
    styles += m0;
  });

  markup.replace(/<body .*?>([\w\W]*?)<\/body>/, (m0, m1) => {
    body += m1;
  });

  markup.replace(/<\/body>([\w\W]*?)<\/html>/, (m0, m1) => {
    bootScripts += m1;
  });

  const addHtmlAttrsScript = `
    <script>
      (() => {
        const attrs = ${JSON.stringify(htmlAttrs)};
        const html = document.querySelector('html');
        for (const [k, v] of Object.entries(attrs)) {
          html.setAttribute(k, v);
        }
      })();
    </script>
  `
    .replace(/\n    /g, '\n')
    .trim();

  return {
    parts: {
      // Script to add qwik attributes to html element
      addHtmlAttrsScript,
      styles,
      body,
      bootScripts,
    },
    documentFragment: [addHtmlAttrsScript, styles, body, bootScripts].join(
      '\n'
    ),
  };
}
