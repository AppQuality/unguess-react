import React, { useEffect } from 'react';
import { Chrome, Body, Main, Anchor } from '@appquality/unguess-design-system';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useNavigate, useLocation } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { PageLoader } from 'src/common/components/PageLoader';
import * as Sentry from '@sentry/react';
import { Navigation } from '../navigation/Navigation';

const StyledMain = styled(Main)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.white};
`;

export const Logged = ({
  children,
  pageHeader,
  route,
  isMinimal = false,
}: {
  children: React.ReactNode;
  pageHeader?: React.ReactNode;
  route: string;
  isMinimal?: boolean;
}) => {
  const { pathname, state: locationState } = useLocation();
  const loginRoute = useLocalizeRoute('login');
  const navigate = useNavigate();

  const { status, userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'failed') {
      navigate(loginRoute, {
        state: { from: locationState?.from ?? pathname },
      });
    }
  }, [status]);

  if (status === 'idle' || status === 'loading') {
    return <PageLoader />;
  }

  Sentry.setUser({
    id: userData.id ?? 0,
    email: userData.email ?? 'unknown',
    wp_user_id: userData.unguess_wp_user_id ?? 0,
    tryber_id: userData.tryber_wp_user_id ?? 0,
    role: userData.role ?? 'unknown',
    customer_role: userData.customer_role,
  });

  return (
    <>
      <Anchor
        href="https://www.iubenda.com/privacy-policy/833252/full-legal"
        className="iubenda-cs-preferences-link"
      />
      <Chrome isFluid hue={appTheme.palette.white}>
        <Body id="body" style={{ overflow: 'hidden' }}>
          <Navigation route={route} isMinimal={isMinimal}>
            <StyledMain id="main">
              {pageHeader && <HeaderContainer>{pageHeader}</HeaderContainer>}
              {children}
            </StyledMain>
          </Navigation>
        </Body>
      </Chrome>
    </>
  );
};
