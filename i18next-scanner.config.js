const fs = require('fs');
const typescriptTransform = require('i18next-scanner-typescript');

const eol = require('eol');
const path = require('path');
const VirtualFile = require('vinyl');

function sortObject(object) {
  const unsortedArr = [...Object.entries(object)];
  const sortedArr = unsortedArr.sort(([key1, value1], [key2, value2]) =>
    key1.localeCompare(key2, 'en', {
      sensitivity: 'base',
      numeric: true,
      ignorePunctuation: true,
    })
  );
  var sorted = {};
  sortedArr.forEach(([key, value]) => (sorted[key] = value));
  return sorted;
}

function flush(done) {
  const { parser } = this;
  const { options } = parser;

  // Flush to resource store
  const resStore = parser.get({ sort: options.sort });
  const { jsonIndent } = options.resource;
  const lineEnding = String(options.resource.lineEnding).toLowerCase();

  Object.keys(resStore).forEach((lng) => {
    const namespaces = resStore[lng];

    Object.keys(namespaces).forEach((ns) => {
      const resPath = parser.formatResourceSavePath(lng, ns);
      let resContent;
      try {
        resContent = JSON.parse(
          fs
            .readFileSync(fs.realpathSync(path.join('src', resPath)))
            .toString('utf-8')
        );
      } catch (e) {
        resContent = {};
      }
      const obj = { ...namespaces[ns], ...resContent };
      Object.keys(obj).forEach((key) => {
        if (namespaces[ns][key] === undefined) {
          delete obj[key];
        }
      });

      // Order the keys
      const ordered = sortObject(obj);

      let text = `${JSON.stringify(ordered, null, jsonIndent)}\n`;

      if (lineEnding === 'auto') {
        text = eol.auto(text);
      } else if (lineEnding === '\r\n' || lineEnding === 'crlf') {
        text = eol.crlf(text);
      } else if (lineEnding === '\n' || lineEnding === 'lf') {
        text = eol.lf(text);
      } else if (lineEnding === '\r' || lineEnding === 'cr') {
        text = eol.cr(text);
      } else {
        // Defaults to LF
        text = eol.lf(text);
      }

      let contents = null;

      try {
        // "Buffer.from(string[, encoding])" is added in Node.js v5.10.0
        contents = Buffer.from(text);
      } catch (e) {
        // Fallback to "new Buffer(string[, encoding])" which is deprecated since Node.js v6.0.0
        contents = new Buffer(text);
      }

      this.push(
        new VirtualFile({
          path: resPath,
          contents,
        })
      );
    });
  });

  done();
}
module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  removeUnusedKeys: true,
  sort: true,
  output: './src',
  options: {
    contextFallback: false,
    sort: true,
    func: {
      list: ['t', 'i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey(ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 2020,
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ['en', 'it'],
    ns: ['links', 'translation'],
    defaultLng: 'en',
    defaultNs: 'translation',
    defaultValue: (language, namespace, key) => {
      if (
        key.indexOf('__') === 0 &&
        key.indexOf('MAX') > 0 &&
        key.indexOf(':') > 0
      ) {
        let lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
        const parts = key.split('MAX');
        const max = parts[1].replace(/\D/g, '');
        while (lipsum.length < max) {
          lipsum += lipsum;
        }
        return lipsum.substring(0, max);
      }
      return '';
    },
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: 'auto',
    },
    nsSeparator: false, // namespace separator
    keySeparator: ':::', // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: typescriptTransform({
    // default value for extensions
    extensions: ['.tsx', '.ts'],
    tsOptions: {
      target: 'es2017',
    },
  }),
  flush,
};
