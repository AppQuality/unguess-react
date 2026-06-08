import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type {
  GetHubsByHidApiResponse,
  GetProjectsByPidHubsApiResponse,
  GetWorkspacesByWidProjectsApiResponse,
} from '..';
import { apiSlice } from '../api';

type GetWorkspaceHubsApiArg = {
  wid: string;
};

type GetWorkspaceHubsApiResponse = {
  items: GetHubsByHidApiResponse[];
};

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaceHubs: builder.query<
      GetWorkspaceHubsApiResponse,
      GetWorkspaceHubsApiArg
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const projectsResult = await fetchWithBQ(
          `/workspaces/${_arg.wid}/projects`
        );
        if (projectsResult.error) {
          return { error: projectsResult.error as FetchBaseQueryError };
        }

        const projects =
          (projectsResult.data as GetWorkspacesByWidProjectsApiResponse)
            .items ?? [];

        if (!projects.length) {
          return { data: { items: [] } };
        }

        const hubsByProjectResults = await Promise.all(
          projects.map((project) => fetchWithBQ(`/projects/${project.id}/hubs`))
        );

        const hubIdSet = new Set<number>();

        for (const result of hubsByProjectResults) {
          if (result.error) {
            return { error: result.error as FetchBaseQueryError };
          }

          const hubs =
            (result.data as GetProjectsByPidHubsApiResponse).items ?? [];
          hubs.forEach((hub) => hubIdSet.add(hub.id));
        }

        const hubIds = Array.from(hubIdSet);

        if (!hubIds.length) {
          return { data: { items: [] } };
        }

        const hubResults = await Promise.all(
          hubIds.map((hubId) => fetchWithBQ(`/hubs/${hubId}`))
        );

        const hubs: GetHubsByHidApiResponse[] = [];

        for (const result of hubResults) {
          if (result.error) {
            return { error: result.error as FetchBaseQueryError };
          }

          hubs.push(result.data as GetHubsByHidApiResponse);
        }

        hubs.sort(
          (a, b) =>
            new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );

        return {
          data: {
            items: hubs,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetWorkspaceHubsQuery } = extendedApi;
