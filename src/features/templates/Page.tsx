import React from 'react';
import { GoogleTagManager } from 'src/common/GoogleTagManager';
import styled from 'styled-components';
import { Logged } from './Logged';

const Container = styled.div<{ excludeMarginTop?: boolean }>`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.space.md} auto;
  }

  ${({ excludeMarginTop }) => excludeMarginTop && `margin-top: 0;`}
`;

export const Page = ({
  children,
  title = 'UNGUESS - BE SMART FROM THE START',
  pageHeader,
  route,
  excludeMarginTop,
}: {
  children: React.ReactNode;
  title?: string;
  pageHeader?: React.ReactNode;
  route: string;
  excludeMarginTop?: boolean;
}) => (
  <GoogleTagManager title={title}>
    <Logged route={route} pageHeader={pageHeader}>
      <Container id="container" excludeMarginTop={excludeMarginTop}>
        {children}
      </Container>
    </Logged>
  </GoogleTagManager>
);
