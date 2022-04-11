import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CAMPAIGN } from "./actions.types";
import API from "src/common/api";

export const getCampaigns = createAsyncThunk(GET_CAMPAIGN,
  async (wid: number) => {
    const campaigns = await API.campaigns(wid);
    return campaigns;
  }
);