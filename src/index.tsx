import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { store } from "./app/store";
import { fetchUser } from "./features/user/actions/fetchUser";
import { getWorkspaces } from "src/features/workspaces/actions";
import reportWebVitals from "./reportWebVitals";

const main = () => {
  
  store.dispatch(fetchUser());
  store.dispatch(getWorkspaces());
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

main();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
