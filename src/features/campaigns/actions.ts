import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CAMPAIGN } from "./actions.types";
import API from "src/common/api";

interface actionParameters {
  wid: number;
  query?: ApiOperations["get-workspace-campaigns"]["parameters"]["query"];
}

export const getCampaigns = createAsyncThunk(
  GET_CAMPAIGN,
  async (params: actionParameters) => {
    const { wid, query } = params;


    let queryParams = "";
    if (query && Object.keys(query).length) {
      let urlps = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (key && value) {
          if (key === "filterBy") {
            Object.entries(value).forEach(([filterKey, filterValue]) => {
              urlps.set(`filterBy[${filterKey}]`, filterValue);
            });
          } else {
            urlps.set(key, value as string);
          }
        }
      });
      queryParams = "?" + urlps.toString();
    }

    const campaigns = await API.campaigns(wid, queryParams);
    return campaigns.items;
  }
);
