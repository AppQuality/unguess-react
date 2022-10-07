import React, { useEffect } from 'react';
import TagManager, { TagManagerArgs } from 'react-gtm-module';
import { Helmet } from 'react-helmet';
import { useAppSelector } from 'src/app/hooks';

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
  },
};
TagManager.initialize(tagManagerArgs);

export const GoogleTagManager = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { userData } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

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
    }
  }, [userData, activeWorkspace]);

  return (
    <>
      {helmet()}
      {children}
    </>
  );
};
