import { CampaignActionProps } from 'src/pages/Dashboard/types';
import i18n from 'src/i18n';
import { Output } from 'src/features/api';

const isReactCampaign = (outputs: Output[]): boolean => {
  let isReact = true;

  if (outputs.length) {
    outputs.forEach((output) => {
      if (output === 'media') isReact = false;
    });
  }

  return isReact;
};

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
  const { campaignId, cpFamily, outputs } = props;

  const currentLang = i18n.language || 'en';
  let localizedRoute = '';

  if (isReactCampaign(outputs)) {
    localizedRoute = `${
      currentLang === 'en' ? '' : currentLang
    }/campaigns/${campaignId}`;
  } else if (cpFamily.toLocaleLowerCase() === 'functional') {
    localizedRoute = getLocalizedFunctionalDashboardUrl(
      campaignId,
      currentLang
    );
  } else {
    localizedRoute = getLocalizedUXDashboardUrl(campaignId, currentLang);
  }

  // in case of base route ("") we already have a forward slash
  const re = /\/$/;
  return re.test(localizedRoute) ? localizedRoute : `${localizedRoute}/`;
}
