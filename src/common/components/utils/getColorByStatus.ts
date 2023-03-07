import { CampaignStatus } from 'src/types';
import { theme } from 'src/app/theme';

export const getColorByStatus = (status: CampaignStatus) => {
  switch (status) {
    case 'running':
      return theme.palette.yellow[700];
    case 'completed':
      return theme.palette.green[800];
    case 'incoming':
      return theme.palette.azure[600];
    case 'functional':
      return theme.palette.blue[700];
    case 'experiential':
      return theme.palette.green[700];
    default:
      return theme.palette.grey[700];
  }
};
