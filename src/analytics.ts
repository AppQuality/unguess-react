import googleTagManager from '@analytics/google-tag-manager';
import Analytics from 'analytics';
import hubspotPlugin from '@analytics/hubspot';
import userpilot from './common/analytics-plugins/userpilot';
import gaPlugin from './common/analytics-plugins/ga';
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
      gaPlugin({
        measurementId:
          process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-2M29YVTK78',
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
