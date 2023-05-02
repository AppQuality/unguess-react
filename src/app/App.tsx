import '../i18n';
import { GlobalStyle, ToastProvider } from '@appquality/unguess-design-system';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import Pages from 'src/common/Pages';
import { theme } from 'src/app/theme';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Helmet>
          <meta
            property="og:title"
            content={`UNGUESS - ${t('__APP_META_PAYOFF')}`}
          />
          <title>UNGUESS - {t('__APP_META_PAYOFF')}</title>
          <meta name="description" content={t('__APP_META_DESCRIPTION')} />
        </Helmet>
        {/* TODO: Fix ToastProvider children error */}
        <ToastProvider
          limit={5}
          zIndex={theme.levels.front}
          placementProps={{
            top: {
              style: {
                top:
                  parseInt(theme.components.chrome.header.height, 10) +
                  theme.space.base * 4,
              },
            },
          }}
        >
          <Pages />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
