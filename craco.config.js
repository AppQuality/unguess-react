const path = require(`path`);

const alias = () => ({
  react: `./node_modules/react`,
  'styled-components': `./node_modules/styled-components`,
  '@zendeskgarden/react-theming': `./node_modules/@zendeskgarden/react-theming`,
});

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  webpack: {
    // alias: resolvedAliases,
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });
      return webpackConfig;
    },
  },
  babel: {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-nullish-coalescing-operator',
      '@babel/plugin-transform-logical-assignment-operators',
    ],
  },
};
