import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/actions/fetchUser";
import { LoginPage } from "./pages";
import { RequireAuth } from "./RequireAuth";
import Dashboard from "./pages/Dashboard";

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
