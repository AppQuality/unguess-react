import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "src/features/user/actions/fetchUser";
import LoginPage from "src/pages/LoginPage";
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
        <Route path={`${base}/login`} element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/it" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Pages;
