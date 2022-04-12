import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { getCampaigns } from "./actions";

const campaignsAdapter = createEntityAdapter<Component["campaign"]>();

const initialState = campaignsAdapter.getInitialState({
  status: "idle",
});

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      campaignsAdapter.setAll(state, action.payload);
      state.status = "complete";
    });
    builder.addCase(getCampaigns.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default campaignSlice.reducer;

export const { selectAll: selectCampaigns, selectById: selectCampaignById } =
  campaignsAdapter.getSelectors((state: RootState) => state.campaigns);

export const selectGroupedCampaigns = createSelector(
  // First input selector: all campaigns
  selectCampaigns,

  (state: RootState) => state.filters,

  // Output selector: receives both values
  (campaigns, filters) => {
    return campaigns.reduce((acc: any, campaign) => {
      if (campaign.project_id && (!filters.projectId || filters.projectId === campaign.project_id)) {
        acc[campaign.project_id] = acc[campaign.project_id] || [];
        acc[campaign.project_id].push(campaign);
      }
      return acc;
    }, []);
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

export const selectCampaignsCounter = createSelector(
  // First input selector: all campaigns
  selectCampaigns,

  (state: RootState) => state.filters,

  // Output selector: receives both values
  (campaigns, filters) => {
    let counters = {
      running: 0,
      completed: 0,
      inComing: 0,
      functional: 0,
      experiential: 0,
    };
    //Current Date
    const now = new Date().getTime();

    campaigns.forEach((cp) => {
      if(filters.projectId && filters.projectId !== cp.project_id) return;
      //Update status counters
      if (cp.status_id === 2) {
        counters.completed++;
      } else if (cp.status_id === 1) {
        if (new Date(cp.start_date).getTime() > now) {
          counters.inComing++;
        } else {
          counters.running++;
        }
      }

      //Update type counters
      if (cp.test_type_name.toLowerCase() === "functional") {
        counters.functional++;
      } else if (cp.test_type_name.toLowerCase() === "experiential") {
        counters.experiential++;
      }
    });

    return counters;
  }
);

