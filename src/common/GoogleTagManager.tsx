import React, { useEffect } from 'react';
import TagManager, { TagManagerArgs } from 'react-gtm-module';
import { Helmet } from 'react-helmet';
import { useAppSelector } from 'src/app/hooks';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { isDev } from './isDevEnvironment';

const tagManagerArgs: TagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID || 'GTM-WVXPS94',
  ...(isDev() && {
    auth: 'HjeAxSQB9e685mi-_8YiDw',
    preview: 'env-4',
  }),
  events: {
    unguess_loaded: 'unguess_loaded',
    workspace_change: 'workspace_change',
    generic_error: 'generic_error',
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
        tester_id: userData.profile_id,
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
