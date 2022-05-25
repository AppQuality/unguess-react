import React from 'react';
import { GoogleTagManager } from 'src/common/GoogleTagManager';
import { Logged } from './Logged';

export const Page = ({
  children,
  title = 'UNGUESS - BE SMART FROM THE START',
  pageHeader,
  route,
}: {
  children: React.ReactNode;
  title?: string;
  pageHeader?: React.ReactNode;
  route: string;
}) => (
    <GoogleTagManager title={title}>
      <Logged route={route} pageHeader={pageHeader}>
        {children}
      </Logged>
    </GoogleTagManager>
  );
