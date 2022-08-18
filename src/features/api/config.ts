import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: process.env.API_URL || '',
  apiFile: './api.ts',
  apiImport: 'apiSlice',
  // outputFiles: {
  //   './endpoints/users.ts': {
  //     filterEndpoints: [/users/i],
  //   },
  //   './endpoints/projects.ts': {
  //     filterEndpoints: [/projects/i],
  //   },
  //   './endpoints/campaigns.ts': {
  //   filterEndpoints: [/campaigns/i],
  //   },
  //   './endpoints/workspaces.ts': {
  //     filterEndpoints: [/workspaces/i],
  //   },
  // },
  outputFile: 'index.ts',
  exportName: 'unguessApi',
  hooks: true,
};

// (require codegen 1.1)  hooks: { queries: true, lazyQueries: true, mutations: true },

export default config;
