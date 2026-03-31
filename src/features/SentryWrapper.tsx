import * as Sentry from '@sentry/react';
import i18n from 'src/i18n';
import { isDev } from 'src/common/isDevEnvironment';
import React from 'react';
import {
  createRoutesFromChildren,
  useLocation,
  useNavigationType,
  matchRoutes,
} from 'react-router-dom';

const SentryWrapper = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV !== 'test') {
    Sentry.init({
      dsn: 'https://b8e8d4b25974eb9d50f15b067cbce9d0@o1087982.ingest.sentry.io/4506349729873920',
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.reactRouterV6BrowserTracingIntegration({
          useEffect: React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
      ],
      environment: react_env.REACT_APP_ENVIRONMENT,
      // trace all staging and locale traces and 70% of production traces
      tracesSampleRate: isDev() ? 1.0 : 0.7,
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/dev\.unguess\.io\/api/,
        /^https:\/\/unguess\.io\/api/,
      ],
      release: react_env.REACT_APP_VERSION,
      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      // do not capture for staging and locale
      replaysSessionSampleRate: isDev() ? 0.0 : 0.1,
      replaysOnErrorSampleRate: isDev() ? 0.0 : 1.0,
    });
  }

  Sentry.setTag('page_locale', i18n.language);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default SentryWrapper;
