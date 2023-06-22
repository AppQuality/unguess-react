import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { stringify } from 'qs';
import {
  GetProjectsByPidApiArg,
  GetProjectsByPidApiResponse,
  GetWorkspacesApiResponse,
  GetWorkspacesByWidApiArg,
  GetWorkspacesByWidApiResponse,
  Template,
} from '.';

type GetProjectWithWorkspaceResponse = {
  project: GetProjectsByPidApiResponse;
  workspace: GetWorkspacesByWidApiResponse;
};

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
  ],
  endpoints: (builder) => ({
    getProjectWithWorkspace: builder.query<
      GetProjectWithWorkspaceResponse,
      GetProjectsByPidApiArg
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const projectResult = await fetchWithBQ(`/projects/${_arg.pid}`);
        if (projectResult.error)
          return { error: projectResult.error as FetchBaseQueryError };
        const project = projectResult.data as GetProjectsByPidApiResponse;
        const workspaceResult = await fetchWithBQ(
          `/workspaces/${project.workspaceId}`
        );
        return workspaceResult.data
          ? {
              data: {
                project,
                workspace:
                  workspaceResult.data as GetWorkspacesByWidApiResponse,
              },
            }
          : { error: workspaceResult.error as FetchBaseQueryError };
      },
    }),
  }),
});

export const { useGetProjectWithWorkspaceQuery } = apiSlice;

export interface UseCaseTemplate extends Template {
  id?: number;
}
