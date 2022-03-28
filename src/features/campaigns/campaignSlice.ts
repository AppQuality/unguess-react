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
  // Output selector: receives both values
  (campaigns) => {
    return campaigns.reduce((acc: any, campaign) => {
      
      if (campaign.project_id) {
        acc[campaign.project_id] = acc[campaign.project_id] || [];
        acc[campaign.project_id].push(campaign);
      }
      return acc;
    }, []);

  }
);
