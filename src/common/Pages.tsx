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
import Bug from 'src/pages/Bug';
import { Redirect } from './Redirect';

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
                <Route
                  path={`/${langPrefix}/campaigns/:campaignId/bugs/:bugId`}
                  element={<Bug />}
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

            <Route
              path="/it/dashboard-campagne-funzionali"
              element={
                <Redirect
                  url={({ searchParams }) => {
                    if (!searchParams || !searchParams.get('cid'))
                      return '/it/oops';
                    if (!searchParams.get('bug_id'))
                      return `/it/campaigns/${searchParams.get('cid')}`;
                    return `/it/campaigns/${searchParams.get(
                      'cid'
                    )}/bugs/${searchParams.get('bug_id')}`;
                  }}
                />
              }
            />
            <Route
              path="/functional-customer-dashboard"
              element={
                <Redirect
                  url={({ searchParams }) => {
                    if (!searchParams || !searchParams.get('cid'))
                      return '/oops';
                    if (!searchParams.get('bug_id'))
                      return `/campaigns/${searchParams.get('cid')}`;
                    return `/campaigns/${searchParams.get(
                      'cid'
                    )}/bugs/${searchParams.get('bug_id')}`;
                  }}
                />
              }
            />
            <Route path="*" element={<Navigate replace to="/oops" />} />
          </>
        )
      )}
    />
  );
};

export default Pages;
