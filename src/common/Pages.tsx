import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchUser } from "src/features/user/actions/fetchUser";
import LoginPage from "src/pages/LoginPage";
import Dashboard from "src/pages/Dashboard";
import PageLoader from "src/features/templates/PageLoader";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import Project from "src/pages/Dashboard/projectView";

const base = ":locale";

function Pages() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { status } = useAppSelector((state) => state.user);

  return status === "idle" || status === "loading" ? (
    <PageLoader />
  ) : (
    <Routes>
      <Route path={`${base}/login`} element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/it" element={<Dashboard />} />
      <Route path="/projects/:projectId" element={<Project />} />
      <Route path="/it/projects/:projectId" element={<Project />} />
    </Routes>
  );
}

export default Pages;
