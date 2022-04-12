export function getLocalizeRoute(campaignId: number, campaignType: string, lang?: string): string {
  let currentLang = lang || 'en';
  let localizedRoute = "";

  if(campaignType === 'functional')
  {
    localizedRoute =
  currentLang === "en" ? `/functional-customer-dashboard/?cid=${campaignId}` : `it/dashboard-campagne-funzionali/?cid=${campaignId}`;
  }else
  {
    localizedRoute =
    currentLang === "en" ? `/ux-customer-dashboard/?cid=${campaignId}` : `it/dashboard-campagne-esperienziali/?cid=${campaignId}`;
  }

  
  // in case of base route ("") we already have a forward slash
  let re = /\/$/;
  return re.test(localizedRoute) ? localizedRoute : `${localizedRoute}/`;
}