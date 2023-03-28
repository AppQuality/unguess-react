import { Output } from 'src/features/api';

export interface CampaignActionProps {
  campaignId: number;
  cpFamily: string;
  outputs: Output[];
}

export type CAMPAING_STATUSES = 'COMPLETED' | 'PROGRESS' | 'INCOMING';
