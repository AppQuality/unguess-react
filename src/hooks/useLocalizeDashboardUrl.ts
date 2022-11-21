import { CampaignActionProps } from 'src/pages/Dashboard/types';
import i18n from 'src/i18n';

export const getLocalizedFunctionalDashboardUrl = (
  aCampaignId: number,
  aLanguage: string
): string =>
  aLanguage === 'en'
    ? `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/functional-customer-dashboard/?cid=${aCampaignId}`
    : `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/it/dashboard-campagne-funzionali/?cid=${aCampaignId}`;

export const getLocalizedUXDashboardUrl = (
  aCampaignId: number,
  aLanguage: string
): string =>
  aLanguage === 'en'
    ? `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/ux-customer-dashboard/?cid=${aCampaignId}`
    : `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/it/dashboard-campagne-esperienziali/?cid=${aCampaignId}`;

export function getLocalizeDashboardRoute(props: CampaignActionProps): string {
  const { campaignId, outputs } = props;

  const currentLang = i18n.language || 'en';

  if (outputs.some((o) => o === 'media')) {
    return getLocalizedUXDashboardUrl(campaignId, currentLang);
  }

  return `${
    currentLang === 'en' ? '' : `/${currentLang}`
  }/campaigns/${campaignId}/`;
}
