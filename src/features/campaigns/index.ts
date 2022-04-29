import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { unguessApi } from "../api/endpoints/campaigns";
import { selectActiveWorkspace } from "../navigation/selectors";
import workspaceSlice from "../workspaces/workspaceSlice";


export const selectWorkspaceCampaigns = (workspaceId: number) => unguessApi.endpoints.getWorkspacesByWidCampaigns.select({wid: workspaceId});

export const selectAllCampaigns = createSelector(
    selectWorkspaceCampaigns,
    (state: RootState) => state.filters,
    (campaigns, filters) => {
        console.log("INSIDE SELECTOR filters", filters);
        console.log("INSIDE SELECTOR Campaigns", campaigns);
        return campaigns;
    }
);



export const selectFilteredCampaigns = createSelector(
    (state: RootState) => state.navigation.activeWorkspace,
    (activeWorkspace: Component['workspace']) => selectWorkspaceCampaigns(activeWorkspace.id),
    (state: RootState) => state.filters,
    (campaigns, filters) => {
        console.log("Campaigns: ", campaigns);
        console.log("Filters: ", filters);
        return [];
        // return campaigns.filter((campaign) => {
        //     //Check Project ID
        //     if (filters.projectId && filters.projectId !== campaign.project_id)
        //       return false;
      
        //     //Check status
        //     if (
        //       filters.status !== "all" &&
        //       campaign.status_name &&
        //       campaign.status_name !== filters.status
        //     )
        //       return false;
      
        //     //Check Type
        //     if (
        //       filters.type !== "all" &&
        //       campaign.test_type_name.toLowerCase() !== filters.type
        //     )
        //       return false;
      
        //     //Check Test Type
        //     if (
        //       filters.testNameId &&
        //       campaign.campaign_type_id !== filters.testNameId
        //     )
        //       return false;
      
        //     //Check Search
        //     if (
        //       filters.search &&
        //       campaign.title.toLowerCase()
        //       .indexOf(filters.search.toLowerCase()) === -1
        //     )
        //       return false;
      
        //     //All conditions met
        //     return true;
        //   });
    }
);