import googleTagManager from '@analytics/google-tag-manager';
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
      userpilot({
        token: isDev() ? 'STG-NX-54e88e10' : 'NX-54e88e10',
      }),
    ],
  }),
});

export default analytics;
