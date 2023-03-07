import { TFunction } from 'react-i18next';
import { CampaignStatus } from 'src/types';

export const getDefaultTextByStatus = (
  status: CampaignStatus,
  t: TFunction
) => {
  switch (status) {
    case 'running':
      return t('__CAMPAIGN_STATUS_RUNNING__');
    case 'completed':
      return t('__CAMPAIGN_STATUS_COMPLETED__');
    case 'incoming':
      return t('__CAMPAIGN_STATUS_INCOMING__');
    case 'functional':
      return t('__CAMPAIGN_TYPE_FUNCTIONAL__');
    case 'experiential':
      return t('__CAMPAIGN_TYPE_EXPERIENTIAL__');
    default:
      return undefined;
  }
};
