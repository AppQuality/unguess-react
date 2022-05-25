import { Campaign } from '../api';
import { FilterState } from '../campaignsFilter/campaignsFilterSlice';

export const CampaignStatus = {
  Running: 'running',
  Completed: 'completed',
  Incoming: 'incoming',
};

export const selectFilteredCampaigns = (
  campaigns: Campaign[],
  filters: FilterState
) => campaigns.filter((campaign) => {
    // Check Project ID
    if (filters.projectId && filters.projectId !== campaign.project_id)
      return false;

    // Check status
    if (
      filters.status !== 'all' &&
      campaign.status_name &&
      campaign.status_name !== filters.status
    )
      return false;

    // Check Type
    if (
      filters.type !== 'all' &&
      campaign.campaign_family_name.toLowerCase() !== filters.type
    )
      return false;

    // Check Test Type
    if (filters.testNameId && campaign.campaign_type_id !== filters.testNameId)
      return false;

    // Check Search
    if (
      filters.search &&
      campaign.title.toLowerCase().indexOf(filters.search.toLowerCase()) === -1
    )
      return false;

    // All conditions met
    return true;
  });

export const selectGroupedCampaigns = (campaigns: Campaign[]) => campaigns.reduce((acc: Array<Campaign[]>, campaign) => {
    acc[campaign.project_id] = acc[campaign.project_id] || [];
    acc[campaign.project_id].push(campaign);
    return acc;
  }, []);

export const selectStatuses = (campaigns: Campaign[]): Array<string> => {
  const statuses = ['all'];

  campaigns.forEach((cp) => {
    if (!cp.status_name) return;
    if (statuses.indexOf(cp.status_name) === -1) {
      statuses.push(cp.status_name);
    }
  });

  return statuses;
};

interface TestName {
  label: string;
  value: string;
}

export const selectTestNames = (campaigns: Campaign[]): TestName[] => {
  const types: TestName[] = [];

  campaigns.forEach((cp) => {
    if (
      types.find((type) => Number(type.value) === cp.campaign_type_id) ===
      undefined
    ) {
      types.push({
        label: cp.campaign_type_name,
        value: `${cp.campaign_type_id  }`,
      });
    }
  });

  return types;
};

export const selectTypes = (campaigns: Campaign[]): Array<string> => {
  const types = ['all'];

  campaigns.forEach((cp) => {
    const testType = cp.campaign_family_name.toLowerCase();
    if (types.indexOf(testType) === -1) {
      types.push(testType);
    }
  });

  return types;
};
