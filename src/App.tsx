import React from "react";
import logo from "./logo.svg";
import "./i18n";
import {
  Button,
  GlobalStyle,
  theme,
  Avatar,
} from "@appquality/unguess-design-system";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { ReactComponent as UserIcon } from "@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg";
import Page from "./Page";
import { BrowserRouter } from "react-router-dom";
// import Provider from "./redux/provider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
