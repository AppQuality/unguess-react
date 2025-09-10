import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { stringify } from 'qs';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      if (process.env.REACT_APP_DEFAULT_TOKEN) {
        const token = process.env.REACT_APP_DEFAULT_TOKEN;
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
    paramsSerializer: (params) => stringify(params, { encodeValuesOnly: true }),
  }),
  tagTypes: [
    'Users',
    'Workspaces',
    'Projects',
    'Campaigns',
    'Reports',
    'Templates',
    'Bugs',
    'Tags',
    'CustomStatuses',
    'Bug',
    'BugComments',
    'Preferences',
    'VideoTags',
    'Observations',
    'Insights',
    'Clusters',
    'Translation',
    'Archive',
    'Plans',
    'Users',
    'EvaluationRules',
  ],
  endpoints: () => ({}),
});
