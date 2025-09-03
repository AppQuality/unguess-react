import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useGetUsersMeQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useAnalytics } from 'use-analytics';

export const Track = ({
  title,
  description,
  metaTags,
  children,
}: {
  title: string;
  description?: string;
  metaTags?: { name: string; content: string }[];
  children: React.ReactNode;
}) => {
  const { data: userData, isLoading, isSuccess } = useGetUsersMeQuery();
  const { activeWorkspace } = useActiveWorkspace();
  const { track, identify, page } = useAnalytics();
  const location = useLocation();

  const defaultMeta = [
    { name: 'og:description', content: description ?? title },
    { name: 'robots', content: 'noindex, nofollow' },
  ];

  // Merge metaTags over defaultMeta, overriding by name
  const meta: { name: string; content: string }[] = [
    ...defaultMeta.map((def) => {
      const override = metaTags?.find((m) => m.name === def.name);
      return override ?? def;
    }),
    ...(metaTags?.filter(
      (m) => !defaultMeta.some((def) => def.name === m.name)
    ) ?? []),
  ];

  useEffect(() => {
    page();
  }, [location]);

  const helmet = () => (
    <Helmet>
      <title>{title} - UNGUESS</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description ?? title} />
      {meta.map((m) => (
        <meta key={m.name} name={m.name} content={m.content} />
      ))}
    </Helmet>
  );

  useEffect(() => {
    if (!isLoading && isSuccess && userData?.role && activeWorkspace?.company) {
      identify(`profile_${userData.profile_id}`, {
        role: userData.role,
        customer_role: userData.customer_role,
        wp_user_id: userData.tryber_wp_user_id,
        tester_id: userData.profile_id,
        name: userData.name,
        email: userData.email,
        company: activeWorkspace.company,
        workspace: activeWorkspace,
      });

      track(
        'unguess_loaded',
        {
          role: userData.role,
          customer_role: userData.customer_role,
          wp_user_id: userData.tryber_wp_user_id,
          tester_id: userData.profile_id,
          name: userData.name,
          email: userData.email,
          company: activeWorkspace.company,
        },
        {
          plugins: {
            // disable userpilot for this event
            userpilot: false,
          },
        }
      );
    }
  }, [userData, activeWorkspace]);

  return (
    <>
      {helmet()}
      {children}
    </>
  );
};
