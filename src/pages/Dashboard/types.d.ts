import { Output } from 'src/features/api';

export interface CampaignActionProps {
  campaignId: number;
  cpFamily: string;
  outputs: Output[];
}
