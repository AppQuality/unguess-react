declare module '@analytics/segment' {
  type AnalyticsPlugin = import('analytics').AnalyticsPlugin;

  type SegmentConfig = {
    /** Your segment write key */
    writeKey: string;
    flushAt?: number;
    /* Segment sdk config options. Docs https://segment.com/docs/connections/sources/catalog/libraries/server/node/#configuration */
    flushInterval?: number;
    /** Disable loading segment for anonymous visitors */
    disableAnonymousTraffic?: boolean;
    /** Override the Segment snippet url, for loading via custom CDN proxy */
    customScriptSrc?: boolean;
    /** Enable/disable segment destinations https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#managing-data-flow-with-the-integrations-object */
    integrations?: Record<string, boolean>;
  };

  function segmentPlugin(config: SegmentConfig): AnalyticsPlugin;
  export default segmentPlugin;
}
