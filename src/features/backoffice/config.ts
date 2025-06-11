import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: './openapi/documentation.json',
  apiFile: './strapi.ts',
  apiImport: 'strapiSlice',
  filterEndpoints: [/categories/i, /manuals/i, /templates/i],
  outputFile: 'index.ts',
  exportName: 'unguessStrapi',
  hooks: true,
};

export default config;
