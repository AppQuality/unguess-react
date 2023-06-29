import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type {
  GetProjectsByPidApiResponse,
  GetWorkspacesByWidApiResponse,
  GetCampaignsByCidApiResponse,
  GetCampaignsByCidApiArg,
} from '..';
import { apiSlice } from '../api';

type GetCampaignWithWorkspaceResponse = {
  campaign: GetCampaignsByCidApiResponse;
  workspace: GetWorkspacesByWidApiResponse;
};

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignWithWorkspace: builder.query<
      GetCampaignWithWorkspaceResponse,
      GetCampaignsByCidApiArg
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get campaign by cid to retrieve project id
        const campaignResult = await fetchWithBQ(`/campaigns/${_arg.cid}`);
        if (campaignResult.error)
          return { error: campaignResult.error as FetchBaseQueryError };
        const campaign = campaignResult.data as GetCampaignsByCidApiResponse;

        // get project by pid to retrieve workspace id
        const projectResult = await fetchWithBQ(
          `/projects/${campaign.project.id}`
        );
        if (projectResult.error)
          return { error: projectResult.error as FetchBaseQueryError };
        const project = projectResult.data as GetProjectsByPidApiResponse;

        // finally get workspace by id
        const workspaceResult = await fetchWithBQ(
          `/workspaces/${project.workspaceId}`
        );

        // return campaign with its workspace
        return workspaceResult.data
          ? {
              data: {
                campaign,
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

export const { useGetCampaignWithWorkspaceQuery } = extendedApi;
