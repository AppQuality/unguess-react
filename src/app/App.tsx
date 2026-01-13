import {
  GlobalStyle,
  ThemeProvider,
  ToastProvider,
} from '@appquality/unguess-design-system';
import isPropValid from '@emotion/is-prop-valid';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import analytics from 'src/analytics';
import { appTheme } from 'src/app/theme';
import Pages from 'src/common/Pages';
import {
  ThemeProvider as SCThemeProvider,
  StyleSheetManager,
} from 'styled-components';
import { AnalyticsProvider } from 'use-analytics';
import '../i18n';
import { store } from './store';

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName: string, target: any) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

const App = () => {
  const { t } = useTranslation();
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Provider store={store}>
        <AnalyticsProvider instance={analytics}>
          <SCThemeProvider theme={appTheme}>
            <ThemeProvider theme={appTheme}>
              <GlobalStyle />
              <Helmet>
                <meta
                  property="og:title"
                  content={`UNGUESS - ${t('__APP_META_PAYOFF')}`}
                />
                <title>UNGUESS - {t('__APP_META_PAYOFF')}</title>
                <meta
                  name="description"
                  content={t('__APP_META_DESCRIPTION')}
                />
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
          </SCThemeProvider>
        </AnalyticsProvider>
      </Provider>
    </StyleSheetManager>
  );
};

export default App;
