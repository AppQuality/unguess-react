import { CampaignActionProps } from 'src/pages/Dashboard/types';
import i18n from 'src/i18n';

export const getLocalizedFunctionalDashboardUrl = (
  aCampaignId: number,
  aLanguage: string
): string =>
  aLanguage === 'en'
    ? `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/campaigns/${aCampaignId}/bugs`
    : `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/it/campaigns/${aCampaignId}/bugs`;

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

export function getLocalizeoFirstLevelDashboardRoute(
  campaignId: number
): string {
  const currentLang = i18n.language || 'en';

  return `${
    currentLang === 'en' ? '' : `/${currentLang}`
  }/campaigns/${campaignId}/`;
}

export function getLocalizeDashboardRoute(props: CampaignActionProps): string {
  const { campaignId, outputs } = props;

  if (
    outputs.length === 0 ||
    outputs.some((o) => o === 'bugs') ||
    outputs.some((o) => o === 'insights')
  ) {
    return getLocalizeoFirstLevelDashboardRoute(campaignId);
  }

  const currentLang = i18n.language || 'en';
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
      }/campaigns/${aCampaignId}/bugs/${aBugId}`
    : `${
        process.env.REACT_APP_CROWD_WP_URL ?? ''
      }/it/campaigns/${aCampaignId}/bugs/${aBugId}`;

export const getLocalizedProjectUrl = (
  aProjectId: number,
  aLanguage: string
): string => {
  const { host, protocol } = window.location;
  return aLanguage === 'en'
    ? `${protocol}//${host}/projects/${aProjectId}`
    : `${protocol}//${host}/it/projects/${aProjectId}`;
};

export const getLocalizedCampaignUrl = (
  aCampaignId: number,
  aLanguage: string
): string => {
  const { host, protocol } = window.location;
  return aLanguage === 'en'
    ? `${protocol}//${host}/campaigns/${aCampaignId}`
    : `${protocol}//${host}/it/campaigns/${aCampaignId}`;
};
