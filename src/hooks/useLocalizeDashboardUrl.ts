import { CampaignActionProps } from 'src/pages/Dashboard/types';
import i18n from 'src/i18n';
import { Output } from 'src/features/api';

const isReactCampaign = (outputs: Output[]): boolean => {
  let isReact = true;

  if (outputs.length) {
    outputs.forEach((output) => {
      if (output === 'bugs') isReact = false;
      if (output === 'media') isReact = false;
    });
  }

  return isReact;
};

export function getLocalizeDashboardRoute(props: CampaignActionProps): string {
  const { campaignId, cpFamily, outputs } = props;

  const currentLang = i18n.language || 'en';
  let localizedRoute = '';

  if (isReactCampaign(outputs)) {
    localizedRoute = `${
      currentLang === 'en' ? '' : currentLang
    }/campaigns/${campaignId}`;
  } else if (cpFamily.toLocaleLowerCase() === 'functional') {
    localizedRoute =
      currentLang === 'en'
        ? `${
            process.env.REACT_APP_CROWD_WP_URL ?? ''
          }/functional-customer-dashboard/?cid=${campaignId}`
        : `${
            process.env.REACT_APP_CROWD_WP_URL ?? ''
          }/it/dashboard-campagne-funzionali/?cid=${campaignId}`;
  } else {
    localizedRoute =
      currentLang === 'en'
        ? `${
            process.env.REACT_APP_CROWD_WP_URL ?? ''
          }/ux-customer-dashboard/?cid=${campaignId}`
        : `${
            process.env.REACT_APP_CROWD_WP_URL ?? ''
          }/it/dashboard-campagne-esperienziali/?cid=${campaignId}`;
  }

  // in case of base route ("") we already have a forward slash
  const re = /\/$/;
  return re.test(localizedRoute) ? localizedRoute : `${localizedRoute}/`;
}
