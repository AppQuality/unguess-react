import { Campaign } from 'src/features/api';

export const getCampaignStatus = (campaign: Campaign) => {
  // Current Date
  const now = new Date().getTime();

  if (campaign.status.id === 2) {
    return 'COMPLETED';
  }
  if (campaign.status.id === 1) {
    if (new Date(campaign.start_date).getTime() > now) {
      return 'INCOMING';
    }
    return 'PROGRESS';
  }

  return undefined;
};
