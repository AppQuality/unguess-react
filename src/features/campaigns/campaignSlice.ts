import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { getCampaigns } from "./actions";

export type CampaignItem = Component["campaign"] & {
  status_name?: string;
};

const campaignsAdapter = createEntityAdapter<CampaignItem>();

export const CampaignStatus = {
  Running: "running",
  Completed: "completed",
  Incoming: "incoming",
};

const initialState = campaignsAdapter.getInitialState({
  status: "idle",
});

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      campaignsAdapter.setAll(state, action.payload);
      state.status = "complete";
    });
    builder.addCase(getCampaigns.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default campaignSlice.reducer;

export const { selectAll: selectCampaigns, selectById: selectCampaignById } =
  campaignsAdapter.getSelectors((state: RootState) => state.campaigns);

export const selectFilteredCampaigns = createSelector(
  // First input selector: all campaigns
  selectCampaigns,
  (state: RootState) => state.filters,
  // Output selector: receives both values
  (campaigns, filters) => {
    return campaigns.filter((campaign) => {
      //Check Project ID
      if (filters.projectId && filters.projectId !== campaign.project_id)
        return false;

      //Check status
      if (
        filters.status !== "all" &&
        campaign.status_name &&
        campaign.status_name !== filters.status
      )
        return false;

      //Check Type
      if (
        filters.type !== "all" &&
        campaign.test_type_name.toLowerCase() !== filters.type
      )
        return false;

      //Check Test Type
      if (
        filters.testNameId &&
        campaign.campaign_type_id !== filters.testNameId
      )
        return false;

      //Check Search
      if (
        filters.search &&
        campaign.title.toLowerCase()
        .indexOf(filters.search.toLowerCase()) === -1
      )
        return false;

      //All conditions met
      return true;
    });
  }
);

export const selectSuggestedCampaigns = createSelector(
  // First input selector: all campaigns
  selectCampaigns,
  // Output selector: receives both values
  (campaigns) => {
    //Order by date
    campaigns.sort((a, b) => {
      return (
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );
    });

    return campaigns.slice(0, 4);
  }
);

export const selectGroupedCampaigns = createSelector(
  // First input selector: all campaigns
  selectFilteredCampaigns,
  // Output selector: receives both values
  (campaigns) => {
    return campaigns.reduce((acc: any, campaign) => {
      acc[campaign.project_id] = acc[campaign.project_id] || [];
      acc[campaign.project_id].push(campaign);
      return acc;
    }, []);
  }
);

export const selectCampaignsCounter = createSelector(
  selectFilteredCampaigns,
  (campaigns) => {
    let counters = {
      running: 0,
      completed: 0,
      inComing: 0,
      functional: 0,
      experiential: 0,
    };
    campaigns.forEach((cp) => {
      if (cp.status_name === CampaignStatus.Running) counters.running++;
      if (cp.status_name === CampaignStatus.Completed) counters.completed++;
      if (cp.status_name === CampaignStatus.Incoming) counters.inComing++;

      //Update type counters
      if (cp.test_type_name.toLowerCase() === "functional")
        counters.functional++;

      if (cp.test_type_name.toLowerCase() === "experiential")
        counters.experiential++;
    });

    return counters;
  }
);

export const selectStatuses = createSelector(selectCampaigns, (campaigns) => {
  let statuses = ["all"];

  campaigns.forEach((cp) => {
    if (!cp.status_name) return;
    if (statuses.indexOf(cp.status_name) === -1) {
      statuses.push(cp.status_name);
    }
  });

  return statuses;
});

export const selectTestNames = createSelector(selectCampaigns, (campaigns) => {
  let types: Array<{label: string, value: string}> = [];

  campaigns.forEach((cp) => {
    if (
      types.find((type) => Number(type.value) === cp.campaign_type_id) === undefined
    ) {
      types.push({
        label: cp.campaign_type_name,
        value: cp.campaign_type_id + "",
      });
    }
  });

  return types;
});

export const selectTypes = createSelector(selectCampaigns, (campaigns) => {
  let types = ["all"];

  campaigns.forEach((cp) => {
    let testType = cp.test_type_name.toLowerCase();
    if (types.indexOf(testType) === -1) {
      types.push(testType);
    }
  });

  return types;
});
