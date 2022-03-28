import { createSlice } from "@reduxjs/toolkit";
import { getCampaigns } from "./actions";


const initialState: CampaignState = {
  status: "idle",
  campaigns: [],
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      state.campaigns = action.payload;
      state.status = "complete";
    });
    builder.addCase(getCampaigns.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default campaignSlice.reducer;
