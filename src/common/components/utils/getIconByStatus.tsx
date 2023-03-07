import {
  StatusCompletedIcon,
  StatusIncomingIcon,
  StatusRunningIcon,
  CampaignExperientialIcon,
  CampaignFunctionalIcon,
} from '@appquality/unguess-design-system';
import { CampaignStatus } from 'src/types';

export const getIconByStatus = (status: CampaignStatus) => {
  switch (status) {
    case 'running':
      return <StatusRunningIcon />;
    case 'completed':
      return <StatusCompletedIcon />;
    case 'incoming':
      return <StatusIncomingIcon />;
    case 'functional':
      return <CampaignFunctionalIcon />;
    case 'experiential':
      return <CampaignExperientialIcon />;
    default:
      return undefined;
  }
};
