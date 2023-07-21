import { useTranslation } from 'react-i18next';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorBoundaryPage from 'src/common/components/ErrorBoundary/ErrorBoundaryPage';
import Bug from 'src/pages/Bug';
import BugForm from 'src/pages/Bugform';
import Bugs from 'src/pages/Bugs';
import Campaign from 'src/pages/Campaign';
import Dashboard from 'src/pages/Dashboard';
import Project from 'src/pages/Dashboard/Project';
import LoginPage from 'src/pages/LoginPage';
import NotFound from 'src/pages/NotFound';
import Service from 'src/pages/Service';
import Catalog from 'src/pages/Services';
import Manual from 'src/pages/Manual';
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
              <Route
                path={`/${langPrefix}`}
                key={`react-router-${langPrefix}`}
                errorElement={<ErrorBoundaryPage />}
              >
                <Route
                  path={`/${langPrefix}/campaigns/:campaignId`}
                  element={<Campaign />}
                />
                <Route
                  path={`/${langPrefix}/campaigns/:campaignId/bugform`}
                  element={<BugForm />}
                />
                <Route
                  path={`/${langPrefix}/campaigns/:campaignId/manual`}
                  element={<Manual />}
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
              errorElement={<ErrorBoundaryPage />}
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
              errorElement={<ErrorBoundaryPage />}
            />
            <Route path="*" element={<Navigate replace to="/oops" />} />
          </>
        )
      )}
    />
  );
};

export default Pages;
