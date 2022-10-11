import i18n from 'src/i18n';

export const getLocalizeIntegrationCenterRoute = (
  campaignId: number
): string => {
  const currentLang = i18n.language || 'en';
  const localizedRoute =
    currentLang === 'en'
      ? `${
          process.env.REACT_APP_CROWD_WP_URL ?? ''
        }/integration-center/${campaignId}`
      : `${
          process.env.REACT_APP_CROWD_WP_URL ?? ''
        }/it/integration-center/${campaignId}`;

  return localizedRoute;
};
