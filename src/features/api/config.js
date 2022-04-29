const config = {
  schemaFile: process.env.API_URL,
  apiFile: './api.ts',
  apiImport: 'apiSlice',
  outputFile: './index.ts',
  exportName: 'unguessApi',
  hooks: true,
}

module.exports = config