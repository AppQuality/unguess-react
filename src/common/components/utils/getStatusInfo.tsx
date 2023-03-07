import { CampaignStatus } from 'src/types';
import {
  StatusCompletedIcon,
  StatusIncomingIcon,
  StatusRunningIcon,
  CampaignExperientialIcon,
  CampaignFunctionalIcon,
} from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';

type StatusInfo = {
  icon?: React.ReactNode;
  text?: string;
  color?: string;
};

export const getStatusInfo = (status: CampaignStatus): StatusInfo => {
  const { t } = useTranslation();

  switch (status) {
    case 'running':
      return {
        icon: <StatusRunningIcon />,
        text: t('__CAMPAIGN_STATUS_RUNNING__'),
        color: theme.palette.yellow[700],
      };
    case 'completed':
      return {
        icon: <StatusCompletedIcon />,
        text: t('__CAMPAIGN_STATUS_COMPLETED__'),
        color: theme.palette.green[800],
      };
    case 'incoming':
      return {
        icon: <StatusIncomingIcon />,
        text: t('__CAMPAIGN_STATUS_INCOMING__'),
        color: theme.palette.azure[600],
      };
    case 'functional':
      return {
        icon: <CampaignFunctionalIcon />,
        text: t('__CAMPAIGN_TYPE_FUNCTIONAL__'),
        color: theme.palette.blue[700],
      };
    case 'experiential':
      return {
        icon: <CampaignExperientialIcon />,
        text: t('__CAMPAIGN_TYPE_EXPERIENTIAL__'),
        color: theme.palette.green[700],
      };
    default:
      return {};
  }
};
