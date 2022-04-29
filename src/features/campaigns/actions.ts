import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_CAMPAIGN } from "./actions.types";
import API from "src/common/api";
import { CampaignItem, CampaignStatus } from "./campaignSlice";

interface actionParameters {
  wid: number;
  query?: ApiOperations["get-workspace-campaigns"]["parameters"]["query"];
}

//Temporary function used to check cp status, will be replaced by API
export const getCampaignStatus = (campaign: Component["campaign"]) => {

  const now = new Date().getTime();

  if (campaign.status_id === 2) {
    return CampaignStatus.Completed;
  } else if (campaign.status_id === 1) {
    if (new Date(campaign.start_date).getTime() > now) {
      return CampaignStatus.Incoming;
    } else {
      return CampaignStatus.Running;
    }
  }

  //Default
  return CampaignStatus.Running;
};

export const getCampaigns = createAsyncThunk(
  GET_CAMPAIGN,
  async (params: actionParameters) => {
    const { wid, query } = params;


    //TODO: check params types
    let queryParams = "?limit=10000";
    // if (query && Object.keys(query).length) {
    //   let urlps = new URLSearchParams();
    //   Object.entries(query).forEach(([key, value]) => {
    //     if (key && value) {
    //       if (key === "filterBy") {
    //         Object.entries(value).forEach(([filterKey, filterValue]) => {
    //           urlps.set(`filterBy[${filterKey}]`, filterValue);
    //         });
    //       } else {
    //         urlps.set(key, value as string);
    //       }
    //     }
    //   });
    //   queryParams = "?" + urlps.toString();
    // }

    const campaigns = await API.campaigns(wid, queryParams);

    if(campaigns.items?.length) {

      let mappedCampaigns: CampaignItem[] = [];
      //Update campaign status 
      campaigns.items.forEach(campaign => {
        return mappedCampaigns.push({
          ...campaign as ApiComponents['schemas']['Campaign'],
          status_name: getCampaignStatus(campaign as ApiComponents['schemas']['Campaign'])
        });
      });
      
      return mappedCampaigns;
    }

    return [];
  }
);
