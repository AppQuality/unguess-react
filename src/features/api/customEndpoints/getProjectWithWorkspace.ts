import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type {
  GetProjectsByPidApiResponse,
  GetWorkspacesByWidApiResponse,
  GetProjectsByPidApiArg,
} from '..';
import { apiSlice } from '../api';

type GetProjectWithWorkspaceResponse = {
  project: GetProjectsByPidApiResponse;
  workspace: GetWorkspacesByWidApiResponse;
};

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectWithWorkspace: builder.query<
      GetProjectWithWorkspaceResponse,
      GetProjectsByPidApiArg
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get project by pid to retrieve workspace id
        const projectResult = await fetchWithBQ(`/projects/${_arg.pid}`);
        if (projectResult.error)
          return { error: projectResult.error as FetchBaseQueryError };
        const project = projectResult.data as GetProjectsByPidApiResponse;

        // finally get workspace by id
        const workspaceResult = await fetchWithBQ(
          `/workspaces/${project.workspaceId}`
        );

        // return project with its workspace
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
  overrideExisting: false,
});

export const { useGetProjectWithWorkspaceQuery } = extendedApi;
