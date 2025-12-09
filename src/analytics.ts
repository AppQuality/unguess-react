import googleAnalytics from '@analytics/google-analytics';
import googleTagManager from '@analytics/google-tag-manager';
import hubspotPlugin from '@analytics/hubspot';
import Analytics from 'analytics';
import userpilot from './common/analytics-plugins/userpilot';
import { isDev } from './common/isDevEnvironment';

const analytics = Analytics({
  app: 'unguess-react',
  ...(process.env.NODE_ENV !== 'test' && {
    plugins: [
      googleTagManager({
        containerId: process.env.REACT_APP_GTM_ID || 'GTM-WVXPS94',
        ...(isDev() && {
          auth: 'HjeAxSQB9e685mi-_8YiDw',
          preview: 'env-4',
        }),
      }),
      // fallback to staging/local GA4 if no production ID is provided
      googleAnalytics({
        measurementIds: [process.env.REACT_APP_GA4_ID || 'G-3G0Z44ZM07'],
      }),
      userpilot({
        token: 'NX-54e88e10',
      }),
      hubspotPlugin({
        portalId: isDev() ? '50612068' : '6087279',
      }),
    ],
  }),
});

export default analytics;
