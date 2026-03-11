import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useUtmParams } from 'src/hooks/useUtmParams';
import { useAnalytics } from 'use-analytics';

export const NotLogged = ({
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
  const { page } = useAnalytics();
  const utmParams = useUtmParams();
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
    page(utmParams);
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

  return (
    <>
      {helmet()}
      {children}
    </>
  );
};
