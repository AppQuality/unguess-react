// import "./i18n";
import { LoginPage } from "./pages";
import { useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import App from "./App";
// import { refreshUser } from "./redux/user/actions/refreshUser";

const base = ":locale";

function Page() {
  return (
    <div>
      <Routes>
        
        <Route path={`${base}/login`} element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
       
      </Routes>
    </div>
  );
}

export default Page;
