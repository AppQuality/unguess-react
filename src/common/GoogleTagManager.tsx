import React, { useEffect } from 'react';
import TagManager, { TagManagerArgs } from 'react-gtm-module';
import { Helmet } from 'react-helmet';
import { useAppSelector } from 'src/app/hooks';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

const tagManagerArgs: TagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID || 'GTM-WVXPS94',
  ...(process.env.REACT_APP_GTM_AUTH && {
    auth: process.env.REACT_APP_GTM_AUTH,
  }),
  ...(process.env.REACT_APP_GTM_ENV && {
    preview: process.env.REACT_APP_GTM_ENV,
  }),
  events: {
    unguess_loaded: 'unguess_loaded',
    workspace_change: 'workspace_change',
    generic_error: 'generic_error',
  },
};
TagManager.initialize(tagManagerArgs);

const analytics = Analytics({
  app: 'Unguess',
  plugins: [
    googleAnalytics({
      measurementIds: ['G-2M29YVTK78'],
    }),
  ],
});

export const GoogleTagManager = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { userData } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useActiveWorkspace();

  const helmet = () => (
    <Helmet>
      <title>{title} - UNGUESS</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={title} />
    </Helmet>
  );

  useEffect(() => {
    if (userData?.role && activeWorkspace?.company) {
      const tagManagerDataLayer = {
        role: userData.role,
        wp_user_id: userData.tryber_wp_user_id,
        tester_id: userData.id,
        name: userData.name,
        email: userData.email,
        company: activeWorkspace.company,
        event: 'unguess_loaded',
      };

      TagManager.dataLayer({
        dataLayer: tagManagerDataLayer,
      });

      analytics.identify(userData.id.toString(), {
        role: userData.role,
        wp_user_id: userData.tryber_wp_user_id,
        tester_id: userData.id,
        name: userData.name,
        email: userData.email,
        company: activeWorkspace.company,
      });
    }
  }, [userData, activeWorkspace]);

  return (
    <>
      {helmet()}
      {children}
    </>
  );
};
