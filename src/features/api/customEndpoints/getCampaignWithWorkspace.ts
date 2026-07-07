import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type {
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
        // get campaign by cid to retrieve also workspace id
        const campaignResult = await fetchWithBQ(`/campaigns/${_arg.cid}`);
        if (campaignResult.error)
          return { error: campaignResult.error as FetchBaseQueryError };
        const campaign = campaignResult.data as GetCampaignsByCidApiResponse;

        // get workspace by id
        const workspaceResult = await fetchWithBQ(
          `/workspaces/${campaign.workspace.id}`
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
      // Provide the same tags the underlying resources use so mutations that
      // invalidate them (e.g. patchCampaignsByCid on move/archive) refetch this
      // composite query instead of serving stale campaign/workspace data.
      providesTags: ['Campaigns', 'Workspaces'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCampaignWithWorkspaceQuery } = extendedApi;
