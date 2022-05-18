import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "src/pages/LoginPage";
import Dashboard from "src/pages/Dashboard";
import Project from "src/pages/Dashboard/Project";
import NotFound from "src/pages/NotFound";
import Catalog from "src/pages/Catalog";

const base = ":locale";

function Pages() {
  
  return (
    <Routes>
      <Route path={`${base}/login`} element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/it" element={<Dashboard />} />
      <Route path="/projects/:projectId" element={<Project />} />
      <Route path="/it/projects/:projectId" element={<Project />} />
      <Route path="/templates" element={<Catalog />} />
      <Route path="/it/templates" element={<Catalog />} />

      {/* No route found */}
      <Route path="/oops" element={<NotFound />} />
      <Route path=":language/oops" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/oops" />} />
    </Routes>
  );
}

export default Pages;
