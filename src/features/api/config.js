const config = {
  schemaFile: process.env.API_URL,
  apiFile: './api.ts',
  apiImport: 'apiSlice',
  outputFiles: {
    './endpoints/users.ts': {
      filterEndpoints: [/users/i],
    },
    './endpoints/projects.ts': {
      filterEndpoints: [/projects/i],
    },
    './endpoints/campaigns.ts': {
      filterEndpoints: [/campaigns/i],
    },
    './endpoints/workspaces.ts': {
      filterEndpoints: [/workspaces/i],
    },
  },
  exportName: 'unguessApi',
  hooks: true,
}

module.exports = config