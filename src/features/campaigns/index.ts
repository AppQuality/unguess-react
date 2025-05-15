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
) =>
  campaigns.filter((campaign) => {
    const { project, status, family, type } = campaign;
    // Check Project ID
    if (filters.projectId && filters.projectId !== project.id) return false;

    // Check status
    if (
      filters.status !== 'all' &&
      status.name &&
      status.name !== filters.status
    )
      return false;

    // Check Type
    if (filters.type !== 'all' && family.name.toLowerCase() !== filters.type)
      return false;

    // Check Test Type
    if (
      filters.testType.value !== '0' &&
      type.id !== Number.parseInt(filters.testType.value, 10)
    )
      return false;

    // Check Search
    if (
      filters.search &&
      campaign.customer_title
        .toLowerCase()
        .indexOf(filters.search.toLowerCase()) === -1
    )
      return false;

    // All conditions met
    return true;
  });

export const selectStatuses = (campaigns: Campaign[]): Array<string> => {
  const statuses = ['all'];

  campaigns.forEach((cp) => {
    if (!cp.status.name) return;
    if (statuses.indexOf(cp.status.name) === -1) {
      statuses.push(cp.status.name);
    }
  });

  return statuses;
};

export interface TestName {
  label: string;
  value: string;
}

export const selectTestNames = (campaigns: Campaign[]): TestName[] => {
  const types: TestName[] = [];

  campaigns.forEach((cp) => {
    if (types.find((type) => Number(type.value) === cp.type.id) === undefined) {
      types.push({
        label: cp.type.name,
        value: `${cp.type.id}`,
      });
    }
  });

  return types;
};

export const selectTypes = (campaigns: Campaign[]): Array<string> => {
  const types = ['all'];

  campaigns.forEach((cp) => {
    const testType = cp.family.name.toLowerCase();
    if (types.indexOf(testType) === -1) {
      types.push(testType);
    }
  });

  return types;
};
