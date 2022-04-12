export function getLocalizeRoute(campaignId: number, campaignType: string, lang?: string): string {
  let currentLang = lang || 'en';
  let localizedRoute = "";

  if(campaignType === 'functional')
  {
    localizedRoute =
  currentLang === "en" ? `/functional-customer-dashboard/?cp=${campaignId}` : `it/dashboard-campagne-funzionali/?cp=${campaignId}`;
  }else
  {
    localizedRoute =
    currentLang === "en" ? `/ux-customer-dashboard/?cp=${campaignId}` : `it/dashboard-campagne-esperienziali/?cp=${campaignId}`;
  }

  
  // in case of base route ("") we already have a forward slash
  let re = /\/$/;
  return re.test(localizedRoute) ? localizedRoute : `${localizedRoute}/`;
}