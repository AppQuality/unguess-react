import "../i18n";
import { GlobalStyle, theme } from "@appquality/unguess-design-system";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import Helmet from "react-helmet";
import Pages from "src/common/Pages";
import { Provider } from "react-redux";
import { store } from "./store";

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
  };

  TagManager.initialize(tagManagerArgs);
}

function App() {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Helmet>
          <meta
            property="og:title"
            content={"UNGUESS - " + t("Be smart from the start")}
          />
          <title>UNGUESS - {t("Be smart from the start")}</title>
          <meta
            name="description"
            content={t(
              "UNGUESS provides collective wisdom to improve your decision-making process. Eliminate inefficiencies with our testing, monitoring and research platform.")}
          />
        </Helmet>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
