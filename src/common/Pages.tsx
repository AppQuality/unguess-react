import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import LoginPage from 'src/pages/LoginPage';
import Dashboard from 'src/pages/Dashboard';
import Project from 'src/pages/Dashboard/Project';
import NotFound from 'src/pages/NotFound';
import Catalog from 'src/pages/Services';
import Service from 'src/pages/Service';
import Campaign from 'src/pages/Campaign';
import Bugs from 'src/pages/Bugs';
import { useTranslation } from 'react-i18next';

const Pages = () => {
  const { i18n } = useTranslation();

  const langPathPrefixes = [...i18n.languages, ''];

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            {langPathPrefixes.map((langPrefix) => (
              <Route path={`/${langPrefix}`} key={`react-router-${langPrefix}`}>
                <Route
                  path={`/${langPrefix}/campaigns/:campaignId`}
                  element={<Campaign />}
                />
                <Route path={`/${langPrefix}/login`} element={<LoginPage />} />
                <Route
                  path={`/${langPrefix}/projects/:projectId`}
                  element={<Project />}
                />
                <Route
                  path={`/${langPrefix}/campaigns/:campaignId/bugs`}
                  element={<Bugs />}
                />
                <Route path={`/${langPrefix}/services`} element={<Catalog />} />
                <Route
                  path={`/${langPrefix}/services/:templateId`}
                  element={<Service />}
                />

                {/* No route found */}
                <Route path={`/${langPrefix}/oops`} element={<NotFound />} />
                <Route index element={<Dashboard />} />
              </Route>
            ))}
            <Route path="*" element={<Navigate replace to="/oops" />} />
          </>
        )
      )}
    />
  );
};

export default Pages;
