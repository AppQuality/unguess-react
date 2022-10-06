import '../i18n';
import { GlobalStyle, theme } from '@appquality/unguess-design-system';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TagManager from 'react-gtm-module';
import Helmet from 'react-helmet';
import Pages from 'src/common/Pages';
import { Provider } from 'react-redux';
import { store } from './store';

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
    ...(process.env.REACT_APP_GTM_AUTH && {
      auth: process.env.REACT_APP_GTM_AUTH,
    }),
    ...(process.env.REACT_APP_GTM_ENV && {
      preview: process.env.REACT_APP_GTM_ENV,
    }),
  };

  TagManager.initialize(tagManagerArgs);
}

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
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
