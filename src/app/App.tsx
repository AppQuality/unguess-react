import '../i18n';
import { GlobalStyle, ToastProvider } from '@appquality/unguess-design-system';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import Pages from 'src/common/Pages';
import { appTheme } from 'src/app/theme';
import { Provider } from 'react-redux';
import { AnalyticsProvider } from 'use-analytics';
import analytics from 'src/common/analytics';
import { store } from './store';

const App = () => {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
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
          <AnalyticsProvider instance={analytics}>
            <Pages />
          </AnalyticsProvider>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
