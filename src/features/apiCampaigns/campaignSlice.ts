import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { apiSlice } from "../api/api";
import { getCampaignStatus } from "../campaigns/actions";

export type CampaignItem = Component["campaign"] & {
  status_name?: string;
};

interface queryArgs {
  id: number;
  limit?: number;
  start?: number;
}

const campaignsAdapter = createEntityAdapter<CampaignItem>();

export const CampaignStatus = {
  Running: "running",
  Completed: "completed",
  Incoming: "incoming",
};

const initialState = campaignsAdapter.getInitialState({
  status: "idle",
});

export const campaignApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: (args: queryArgs) => {
        args = {
            ...args,
            limit: args.limit || 10,
            start: args.start || 0,
        };

        return `workspaces/${args.id}/campaigns?limit=${args.limit}&start=${args.start}`;
      },

      transformResponse: (
        response: ApiOperations["get-workspace-campaigns"]["responses"]["200"]["content"]["application/json"]
      ) => {
        let mappedCampaigns: CampaignItem[] = [];
        if (response.items && response.items.length) {
          response.items.forEach(
            (campaign: ApiComponents["schemas"]["Campaign"]) => {
              return mappedCampaigns.push({
                ...campaign,
                status_name: getCampaignStatus(campaign),
              });
            }
          );
        }
        return campaignsAdapter.setAll(initialState, mappedCampaigns);
      },
    }),
  }),
});

export const { useGetCampaignsQuery } = campaignApiSlice;

export const selectCampaigns = (workspaceId: number) =>
  campaignApiSlice.endpoints.getCampaigns.select({id: workspaceId});



export const { selectById: selectCampaignById } = campaignsAdapter.getSelectors((state: RootState) => state.campaigns);