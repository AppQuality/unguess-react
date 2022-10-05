import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import LoginPage from 'src/pages/LoginPage';
import Dashboard from 'src/pages/Dashboard';
import Project from 'src/pages/Dashboard/Project';
import NotFound from 'src/pages/NotFound';
import Catalog from 'src/pages/Services';
import Service from 'src/pages/Service';
import { useEffect } from 'react';
import Campaign from 'src/pages/Campaign';

const base = ':locale';

const Pages = () => {
  const location = useLocation();

  const trackPageView = (pathName: string) => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        path: pathName,
      },
    });
  };

  // useEffect(() => {
  //   trackPageView(location.pathname);
  // }, [location]);

  return (
    <Routes>
      <Route path={`${base}/login`} element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/it" element={<Dashboard />} />
      <Route path="/projects/:projectId" element={<Project />} />
      <Route path="/it/projects/:projectId" element={<Project />} />
      <Route path="/campaigns/:campaignId" element={<Campaign />} />
      <Route path="/it/campaigns/:campaignId" element={<Campaign />} />
      <Route path="/services" element={<Catalog />} />
      <Route path="/it/services" element={<Catalog />} />
      <Route path="/services/:templateId" element={<Service />} />
      <Route path="/it/services/:templateId" element={<Service />} />

      {/* No route found */}
      <Route path="/oops" element={<NotFound />} />
      <Route path=":language/oops" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/oops" />} />
    </Routes>
  );
};

export default Pages;
