import React, { useEffect } from 'react';
// import TagManager, { TagManagerArgs } from 'react-gtm-module';
import { Helmet } from 'react-helmet';
import { useAppSelector } from 'src/app/hooks';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useAnalytics } from 'use-analytics';

// const tagManagerArgs: TagManagerArgs = {
//   gtmId: process.env.REACT_APP_GTM_ID || 'GTM-WVXPS94',
//   ...(process.env.REACT_APP_GTM_AUTH && {
//     auth: process.env.REACT_APP_GTM_AUTH,
//   }),
//   ...(process.env.REACT_APP_GTM_ENV && {
//     preview: process.env.REACT_APP_GTM_ENV,
//   }),
//   events: {
//     unguess_loaded: 'unguess_loaded',
//     workspace_change: 'workspace_change',
//     generic_error: 'generic_error',
//   },
// };
// TagManager.initialize(tagManagerArgs);

export const GoogleTagManager = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { userData } = useAppSelector((state) => state.user);
  const { activeWorkspace } = useActiveWorkspace();
  const { page, identify } = useAnalytics();

  const helmet = () => (
    <Helmet>
      <title>{title} - UNGUESS</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={title} />
    </Helmet>
  );

  page();

  useEffect(() => {
    if (userData?.role && activeWorkspace?.company) {
      // const tagManagerDataLayer = {
      //   role: userData.role,
      //   wp_user_id: userData.tryber_wp_user_id,
      //   tester_id: userData.id,
      //   name: userData.name,
      //   email: userData.email,
      //   company: activeWorkspace.company,
      //   event: 'unguess_loaded',
      // };

      // TagManager.dataLayer({
      //   dataLayer: tagManagerDataLayer,
      // });

      // console.log("🚀 ~ file: GoogleTagManager.tsx:63 ~ useEffect ~ userData:", userData);

      identify(`T${userData.id}`, {
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
