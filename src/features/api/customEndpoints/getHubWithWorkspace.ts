import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type {
  GetWorkspacesByWidApiResponse,
  GetHubsByHidApiResponse,
  GetHubsByHidApiArg,
} from '..';
import { apiSlice } from '../api';

type GetHubWithWorkspaceResponse = {
  hub: GetHubsByHidApiResponse;
  workspace: GetWorkspacesByWidApiResponse;
};

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHubWithWorkspace: builder.query<
      GetHubWithWorkspaceResponse,
      GetHubsByHidApiArg
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get hub by hubId to retrieve also workspace id
        const hubResult = await fetchWithBQ(`/hubs/${_arg.hid}`);
        if (hubResult.error)
          return { error: hubResult.error as FetchBaseQueryError };
        const hub = hubResult.data as GetHubsByHidApiResponse;

        // get workspace by id
        const workspaceResult = await fetchWithBQ(
          `/workspaces/${hub.workspace.id}`
        );

        // return hub with its workspace
        return workspaceResult.data
          ? {
              data: {
                hub,
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

export const { useGetHubWithWorkspaceQuery } = extendedApi;
