import "./i18n";
import {
  LoginPage
} from "./pages";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { refreshUser } from "./redux/user/actions/refreshUser";

const base = "/:locale(en|it)?";

function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  });
  return (
    <div>
      <Switch>
        <Route path={`${base}/login`} element={() => <LoginPage />} />
      </Switch>
    </div>
  );
}

export default Page;
