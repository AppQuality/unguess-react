import React, { useEffect } from 'react';
import {
  Chrome,
  Body,
  theme as globalTheme,
  PageLoader,
  Main,
  Anchor,
} from '@appquality/unguess-design-system';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { Navigation } from '../navigation/Navigation';

const Container = styled.div`
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
  margin: ${({ theme }) => theme.space.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.space.md};
  }

  max-width: ${({ theme }) => theme.breakpoints.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
    margin: ${({ theme }) => theme.space.xxl} auto;
    padding-left: ${({ theme }) => theme.space.xxl};
    padding-right: ${({ theme }) => theme.space.xxl};
  }
`;

const StyledMain = styled(Main)`
  background-color: transparent;
  margin: 0;
`;

export const Logged = ({
  children,
  pageHeader,
  route,
}: {
  children: React.ReactNode;
  pageHeader?: React.ReactNode;
  route: string;
}) => {
  const location = useLocation();
  const loginRoute = useLocalizeRoute('login');
  const navigate = useNavigate();

  const { status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'failed') {
      navigate(loginRoute, {
        state: { from: location.pathname },
      });
    }
  }, [status]);

  return status === 'idle' || status === 'loading' ? (
    <PageLoader />
  ) : (
    <>
      <Anchor
        href="https://www.iubenda.com/privacy-policy/833252/full-legal"
        className="iubenda-cs-preferences-link"
      />
      <Chrome isFluid hue={globalTheme.palette.white}>
        <Body style={{ backgroundColor: globalTheme.palette.grey[100] }}>
          <Navigation route={route}>
            <StyledMain id="main">
              {pageHeader && pageHeader}
              <Container>{children}</Container>
            </StyledMain>
          </Navigation>
        </Body>
      </Chrome>
    </>
  );
};
