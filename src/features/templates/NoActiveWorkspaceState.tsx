import { useEffect } from 'react';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { PageLoader } from 'src/common/components/PageLoader';
import * as Sentry from '@sentry/react';
import { ReactComponent as Background } from 'src/assets/icons/lost-in-the-space.svg';
import { Button, MD, theme, XL } from '@appquality/unguess-design-system';

const PageContainer = styled.div`
  background-color: ${theme.palette.grey[100]};
  background-color: ${theme.palette.red[100]};
  margin: 0;
  padding: 0;
  height: 100%;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const NoActiveWorkSpaceState = () => {
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
  });

  return (
    <PageContainer>
      <Container>
        <Column>
          <Background />
        </Column>
        <Column>
          <XL>It is currently not possible to access this page.</XL>
          <MD>
            It would appear that you no longer have access to the workspace. If
            you need help, please contact our help centre.
          </MD>
          <Column>
            <Button isAccent isPrimary color={theme.palette.kale[600]}>
              Logout
            </Button>
            <Button isBasic color={theme.palette.blue[600]}>
              Get help
            </Button>
          </Column>
          <Column />
        </Column>
      </Container>
    </PageContainer>
  );
};
