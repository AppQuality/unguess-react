declare module '@analytics/hubspot' {
  type AnalyticsPlugin = import('analytics').AnalyticsPlugin;

  type HubspotConfig = {
    portalId: string;
  };

  function hubspotPlugin(config: HubspotConfig): AnalyticsPlugin;
  export default hubspotPlugin;
}
