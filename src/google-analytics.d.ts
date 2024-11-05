/*
 ** This is a manually compiled declaration file for the google-analytics plugin
 ** as in issue https://github.com/DavidWells/analytics/issues/99
 */
declare module '@analytics/google-analytics' {
  type GoogleAnalyticsOptions = {
    /** Google Analytics MEASUREMENT IDs */
    measurementIds: string[];

    /** Enable Google Analytics debug mode */
    debug?: boolean;

    /** The optional name for dataLayer object. Defaults to 'ga4DataLayer'. */
    dataLayerName?: string;

    /** The optional name for the global gtag function. Defaults to 'gtag'. */
    gtagName?: string;

    /** Configuration for gtag, including anonymizing IP and cookie settings */
    gtagConfig?: {
      anonymize_ip?: boolean;
      cookie_domain?: string;
      cookie_expires?: number;
      cookie_prefix?: string;
      cookie_update?: boolean;
      cookie_flags?: string;
    };

    /** Custom URL for google analytics script, if proxying calls */
    customScriptSrc?: string;
  };

  type AnalyticsPlugin = {
    /** Name of plugin */
    name: string;

    /** Exposed events of the plugin */
    EVENTS?: any;

    /** Configuration of the plugin */
    config?: any;

    /** Method to load analytics scripts */
    initialize?: (...params: any[]) => any;

    /** Page visit tracking method */
    page?: (...params: any[]) => any;

    /** Custom event tracking method */
    track?: (...params: any[]) => any;

    /** User identify method */
    identify?: (...params: any[]) => any;

    /** Function to determine if analytics script is loaded */
    loaded?: (...params: any[]) => any;

    /** Fire function when the plugin is ready */
    ready?: (...params: any[]) => any;
  };

  function GoogleAnalytics(options: GoogleAnalyticsOptions): AnalyticsPlugin;
  export default GoogleAnalytics;
}
