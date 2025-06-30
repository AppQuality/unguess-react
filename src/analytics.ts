import Analytics from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';
import segmentPlugin from '@analytics/segment';
import { isDev } from './common/isDevEnvironment';

const analytics = Analytics({
  app: 'unguess-react',
  plugins: [
    googleTagManager({
      containerId: process.env.REACT_APP_GTM_ID || 'GTM-WVXPS94',
      ...(isDev() && {
        auth: 'HjeAxSQB9e685mi-_8YiDw',
        preview: 'env-4',
      }),
    }),
    segmentPlugin({
      writeKey: isDev()
        ? 'AxHbacd31w50NwjDM8tadsP82hSwTz4Z'
        : 'oxd3W7coKxDdzq99F88doV5VvQrESbJh',
    }),
  ],
});

export default analytics;
