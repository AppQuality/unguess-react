import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "src/features/user/actions/fetchUser";
import LoginPage from "src/pages/LoginPage";
import { RequireAuth } from "src/common/RequireAuth";
import Dashboard from "src/pages/Dashboard";

const base = ":locale";

function Pages() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route
          path={`${base}/login`}
          element={<LoginPage redirectTo="/" />}
        />
        <Route path="/login" element={<LoginPage redirectTo="/" />} />
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/it"
          element={
            <RequireAuth redirectTo="/it/login">
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default Pages;
