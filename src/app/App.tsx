import {
  GlobalStyle,
  ThemeProvider,
  ToastProvider,
} from '@appquality/unguess-design-system';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { appTheme } from 'src/app/theme';
import { AnalyticsProvider } from 'use-analytics';
import Pages from 'src/common/Pages';
import analytics from 'src/analytics';
import '../i18n';
import { store } from './store';

const App = () => {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <AnalyticsProvider instance={analytics}>
        <ThemeProvider theme={appTheme}>
          <GlobalStyle />
          <Helmet>
            <meta
              property="og:title"
              content={`UNGUESS - ${t('__APP_META_PAYOFF')}`}
            />
            <title>UNGUESS - {t('__APP_META_PAYOFF')}</title>
            <meta name="description" content={t('__APP_META_DESCRIPTION')} />
          </Helmet>
          <ToastProvider
            limit={5}
            zIndex={500}
            placementProps={{
              top: {
                style: {
                  top:
                    parseInt(appTheme.components.chrome.header.height, 10) +
                    appTheme.space.base * 4,
                },
              },
            }}
          >
            <Pages />
          </ToastProvider>
        </ThemeProvider>
      </AnalyticsProvider>
    </Provider>
  );
};

export default App;
