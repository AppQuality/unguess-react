declare module '@analytics/google-tag-manager' {
  import type { AnalyticsPlugin } from 'analytics';

  export interface GoogleTagManagerConfig {
    auth?: string;
    containerId: string;
    customScriptSrc?: string;
    dataLayerName?: string;
    debug?: boolean;
    execution?: string;
    preview?: string;
  }

  function googleTagManager(config: GoogleTagManagerConfig): AnalyticsPlugin;

  export default googleTagManager;
}
