import Analytics from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';
import { isDev } from '../isDevEnvironment';
import { debuggerPlugin } from './plugins/debugger';

const instance = Analytics({
  app: 'unguess-react',
  plugins: [
    ...(isDev() ? [debuggerPlugin] : []),
    googleTagManager({
      containerId: process.env.REACT_APP_GTM_ID || 'GTM-WVXPS94',
      ...(process.env.REACT_APP_GTM_AUTH && {
        auth: process.env.REACT_APP_GTM_AUTH,
      }),
      ...(process.env.REACT_APP_GTM_ENV && {
        preview: process.env.REACT_APP_GTM_ENV,
      }),
    }),
  ],
  debug: isDev(),
});

export default instance;
