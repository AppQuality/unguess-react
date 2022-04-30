import { Campaign } from "../api/endpoints/campaigns";
import { FilterState } from "../campaignsFilter/campaignsFilterSlice";

export const selectFilteredCampaigns = (
  campaigns: Campaign[],
  filters: FilterState
) => {
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
    if (filters.testNameId && campaign.campaign_type_id !== filters.testNameId)
      return false;

    //Check Search
    if (
      filters.search &&
      campaign.title.toLowerCase().indexOf(filters.search.toLowerCase()) === -1
    )
      return false;

    //All conditions met
    return true;
  });
};

export const selectGroupedCampaigns = (campaigns: Campaign[]) => {
  return campaigns.reduce((acc: Array<Campaign[]>, campaign) => {
    acc[campaign.project_id] = acc[campaign.project_id] || [];
    acc[campaign.project_id].push(campaign);
    return acc;
  }, []);
};
