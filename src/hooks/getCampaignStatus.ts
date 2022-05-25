import { Campaign } from 'src/features/api';

export const getCampaignStatus = (campaign: Campaign) => {
  // Current Date
  const now = new Date().getTime();

  if (campaign.status_id === 2) {
    return 'COMPLETED';
  } if (campaign.status_id === 1) {
    if (new Date(campaign.start_date).getTime() > now) {
      return 'INCOMING';
    } 
      return 'PROGRESS';
    
  }
};
