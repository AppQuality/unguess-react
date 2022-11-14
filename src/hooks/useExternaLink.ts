import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import {
  getLocalizedFunctionalDashboardUrl,
  getLocalizedUXDashboardUrl,
} from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';

export interface ExternalLink {
  url: string;
  label: string;
}

export function useExternalLink(
  aCampaign?: Campaign
): ExternalLink | undefined {
  const { t } = useTranslation();
  if (!aCampaign) return undefined;
  if (aCampaign.type.name.toLocaleLowerCase() === 'functional') {
    return {
      url: getLocalizedFunctionalDashboardUrl(aCampaign.id, i18n.language),
      label: t('__MOTHER_DASHBOARD_NAVIGATION_BUG_DETAILS', 'Bug details'),
    };
  }
  if (aCampaign.type.name === 'exp') {
    return {
      url: getLocalizedUXDashboardUrl(aCampaign.id, i18n.language),
      label: t('__MOTHER_DASHBOARD_NAVIGATION_VIDEO_DETAILS', 'Video details'),
    };
  }
  return undefined;
}
