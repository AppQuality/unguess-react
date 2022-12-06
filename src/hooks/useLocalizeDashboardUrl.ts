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

  if (outputs.length === 0 || outputs.some((o) => o === 'bugs')) {
    return `${
      currentLang === 'en' ? '' : `/${currentLang}`
    }/campaigns/${campaignId}/`;
  }

  return getLocalizedUXDashboardUrl(campaignId, currentLang);
}

export const getLocalizedBugUrl = (
  aCampaignId: number,
  aBugId: number,
  aLanguage: string
): string =>
  aLanguage === 'en'
    ? `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/functional-customer-dashboard/?cid=${aCampaignId}&bug_id=${aBugId}`
    : `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/it/dashboard-campagne-funzionali/?cid=${aCampaignId}&bug_id=${aBugId}`;
