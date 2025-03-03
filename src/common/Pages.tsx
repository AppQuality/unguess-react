import * as Sentry from '@sentry/react';
import { useTranslation } from 'react-i18next';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorBoundaryPage from 'src/common/components/ErrorBoundary/ErrorBoundaryPage';
import SentryWrapper from 'src/features/SentryWrapper';
import Bug from 'src/pages/Bug';
import BugForm from 'src/pages/Bugform';
import Bugs from 'src/pages/Bugs';
import Campaign from 'src/pages/Campaign';
import CampaignPreview from 'src/pages/Campaign/preview';
import Dashboard from 'src/pages/Dashboard';
import Project from 'src/pages/Dashboard/Project';
import InsightsPage from 'src/pages/Insights';
import LoginPage from 'src/pages/LoginPage';
import Manual from 'src/pages/Manual';
import MediaNotFound from 'src/pages/NotFound/MediaNotFound';
import NotFound from 'src/pages/NotFound/NotFound';
import Service from 'src/pages/Service';
import Template from 'src/pages/Template';
import Catalog from 'src/pages/Services';
import { Temp } from 'src/pages/Temp';
import Plan from 'src/pages/Plan';
import Video from 'src/pages/Video';
import Videos from 'src/pages/Videos';
import Templates from 'src/pages/Templates';
import { Redirect } from './Redirect';

const Pages = () => {
  const { i18n } = useTranslation();

  const langPathPrefixes = [...i18n.languages, ''];
  const sentryCreateBrowserRouter =
    Sentry.wrapCreateBrowserRouter(createBrowserRouter);
  return (
    <SentryWrapper>
      <RouterProvider
        router={sentryCreateBrowserRouter(
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
                    path={`/${langPrefix}/campaigns/:campaignId/preview`}
                    element={<CampaignPreview />}
                  />
                  <Route
                    path={`/${langPrefix}/campaigns/:campaignId/bugform`}
                    element={<BugForm />}
                  />
                  <Route
                    path={`/${langPrefix}/campaigns/:campaignId/manual`}
                    element={<Manual />}
                  />
                  <Route
                    path={`/${langPrefix}/login`}
                    element={<LoginPage />}
                  />
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
                  <Route
                    path={`/${langPrefix}/services`}
                    element={<Catalog />}
                  />
                  <Route
                    path={`/${langPrefix}/services/:templateId`}
                    element={<Service />}
                  />
                  <Route
                    path={`/${langPrefix}/templates`}
                    element={<Templates />}
                  />
                  <Route
                    path={`/${langPrefix}/templates/:templateId`}
                    element={<Template />}
                  />
                  <Route
                    path={`/${langPrefix}/campaigns/:campaignId/videos`}
                    element={<Videos />}
                  />
                  <Route
                    path={`/${langPrefix}/campaigns/:campaignId/insights`}
                    element={<InsightsPage />}
                  />
                  <Route
                    path={`/${langPrefix}/campaigns/:campaignId/videos/:videoId`}
                    element={<Video />}
                  />
                  <Route path={`/${langPrefix}/temp`} element={<Temp />} />
                  <Route
                    path={`/${langPrefix}/temp/:planId`}
                    element={<Plan />}
                  />
                  {/* No route found */}
                  <Route
                    path={`/${langPrefix}/media/oops`}
                    element={<MediaNotFound />}
                  />
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
    </SentryWrapper>
  );
};

export default Pages;
