import '../i18n';
import { GlobalStyle, theme } from '@appquality/unguess-design-system';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import Pages from 'src/common/Pages';
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
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
