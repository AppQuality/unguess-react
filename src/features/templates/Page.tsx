import React from 'react';
import { GoogleTagManager } from 'src/common/GoogleTagManager';
import styled from 'styled-components';
import { Logged } from './Logged';
import ErrorBoundary from '../../common/components/ErrorBoundary';

const Container = styled.div<{
  excludeMarginTop?: boolean;
  excludeMarginBottom?: boolean;
}>`
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  margin: ${({ theme }) => theme.space.xxl} auto;
  ${({ excludeMarginTop }) => excludeMarginTop && `margin-top: 0;`}
  ${({ excludeMarginBottom }) => excludeMarginBottom && `margin-bottom: 0;`}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.space.md} auto;
    ${({ excludeMarginTop }) => excludeMarginTop && `margin-top: 0;`}
    ${({ excludeMarginBottom }) => excludeMarginBottom && `margin-bottom: 0;`}
  }
`;

export const Page = ({
  children,
  title = 'UNGUESS - BE SMART FROM THE START',
  pageHeader,
  route,
  excludeMarginTop,
  excludeMarginBottom,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  pageHeader?: React.ReactNode;
  route: string;
  excludeMarginTop?: boolean;
  excludeMarginBottom?: boolean;
  className?: string;
}) => (
  <GoogleTagManager title={title}>
    <ErrorBoundary>
      <Logged route={route} pageHeader={pageHeader}>
        <Container
          id="container"
          excludeMarginTop={excludeMarginTop}
          excludeMarginBottom={excludeMarginBottom}
        >
          {children}
        </Container>
      </Logged>
    </ErrorBoundary>
  </GoogleTagManager>
);
