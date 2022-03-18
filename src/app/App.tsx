import "../i18n";
import { GlobalStyle, theme } from "@appquality/unguess-design-system";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import Pages from "src/common/Pages";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
