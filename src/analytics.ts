import googleTagManager from '@analytics/google-tag-manager';
import Analytics from 'analytics';
// @ts-ignore
import hubspotPlugin from '@analytics/hubspot';
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
      userpilot({
        token: 'NX-54e88e10',
      }),
      hubspotPlugin({
        portalId: process.env.REACT_APP_HUBSPOT_PORTAL_ID,
      }),
    ],
  }),
});

export default analytics;
