const path = require(`path`);
const alias = (prefix = `src`) => ({
  react: `./node_modules/react`,
  "styled-components": `./node_modules/styled-components`,
//   formik: `./node_modules/formik`,
});

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

console.log(resolvedAliases);

module.exports = {
  webpack: {
    alias: resolvedAliases,
  },
};
