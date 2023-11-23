import React from 'react';
import { GoogleTagManager } from 'src/common/GoogleTagManager';
import { Logged } from './Logged';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { Container } from './Container';

export const Page = ({
  children,
  title = 'UNGUESS - BE SMART FROM THE START',
  pageHeader,
  route,
  excludeMarginTop,
  excludeMarginBottom,
  className,
  isMinimal,
}: {
  children: React.ReactNode;
  title?: string;
  pageHeader?: React.ReactNode;
  route: string;
  excludeMarginTop?: boolean;
  excludeMarginBottom?: boolean;
  className?: string;
  isMinimal?: boolean;
}) => (
  <GoogleTagManager title={title}>
    <ErrorBoundary>
      <Logged route={route} pageHeader={pageHeader} isMinimal={isMinimal}>
        <Container
          id="container"
          className={className}
          excludeMarginTop={excludeMarginTop}
          excludeMarginBottom={excludeMarginBottom}
        >
          {children}
        </Container>
      </Logged>
    </ErrorBoundary>
  </GoogleTagManager>
);
