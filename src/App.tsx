import React from "react";
import logo from "./logo.svg";
import {
  Button,
  GlobalStyle,
  theme,
  Avatar,
} from "@appquality/unguess-design-system";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { ReactComponent as UserIcon } from "@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg";
import Page from "./Page";
// import Provider from "./redux/provider";

function App() {
  console.log("theme ", theme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page />
    </ThemeProvider>
  );
}

export default App;
