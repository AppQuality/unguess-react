import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { stringify } from 'qs';
import { fetchAuthSession } from 'aws-amplify/auth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers) => {
      // Prova a ottenere il token da Cognito
      try {
        const session = await fetchAuthSession();
        const cognitoToken = session.tokens?.idToken?.toString();

        if (cognitoToken) {
          headers.set('Authorization', `Bearer ${cognitoToken}`);
          return headers;
        }
      } catch (error) {
        // Utente non autenticato con Cognito, continua
      }

      // Fallback al token di default per development/testing
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
    'PlanWatchers',
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
    'CampaignWatchers',
    'CheckoutItem',
  ],
  endpoints: () => ({}),
});
