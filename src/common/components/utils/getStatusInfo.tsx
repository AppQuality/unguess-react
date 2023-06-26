import { CampaignStatus } from 'src/types';
import {
  StatusCompletedIcon,
  StatusIncomingIcon,
  StatusRunningIcon,
  CampaignExperientialIcon,
  CampaignFunctionalIcon,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { TFunction } from 'i18next';

type StatusInfo = {
  icon?: React.ReactNode;
  text?: string;
  color?: string;
};

export const getStatusInfo = (
  status: CampaignStatus,
  t: TFunction
): StatusInfo => {
  switch (status.toLowerCase()) {
    case 'running':
      return {
        icon: <StatusRunningIcon />,
        text: t('__CAMPAIGN_STATUS_RUNNING__'),
        color: appTheme.palette.yellow[700],
      };
    case 'completed':
      return {
        icon: <StatusCompletedIcon />,
        text: t('__CAMPAIGN_STATUS_COMPLETED__'),
        color: appTheme.palette.green[800],
      };
    case 'incoming':
      return {
        icon: <StatusIncomingIcon />,
        text: t('__CAMPAIGN_STATUS_INCOMING__'),
        color: appTheme.palette.azure[600],
      };
    case 'functional':
      return {
        icon: <CampaignFunctionalIcon />,
        text: t('__CAMPAIGN_TYPE_FUNCTIONAL__'),
        color: appTheme.palette.blue[700],
      };
    case 'experiential':
      return {
        icon: <CampaignExperientialIcon />,
        text: t('__CAMPAIGN_TYPE_EXPERIENTIAL__'),
        color: appTheme.palette.green[700],
      };
    default:
      return {};
  }
};
