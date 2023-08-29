import React, { useEffect } from 'react';
import {
  Chrome,
  Body,
  PageLoader,
  Main,
  Anchor,
} from '@appquality/unguess-design-system';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useNavigate, useLocation } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { Navigation } from '../navigation/Navigation';

const StyledMain = styled(Main)`
  background-color: transparent;
  margin: 0;
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

  const { status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === 'failed') {
      navigate(loginRoute, {
        state: { from: locationState?.from ?? pathname },
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
      <Chrome isFluid hue={appTheme.palette.white}>
        <Body id="body" style={{ backgroundColor: appTheme.palette.grey[100] }}>
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
