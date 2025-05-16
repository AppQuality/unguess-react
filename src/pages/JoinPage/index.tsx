import { useEffect } from 'react';
import { Button, Logo } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { GoogleTagManager } from 'src/common/GoogleTagManager';
import { appTheme } from 'src/app/theme';

const StyledLogo = styled(Logo)`
  margin-top: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 70%;
  }
`;

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

interface NavigationState {
  from: string;
}

const JoinPage = () => {
  const { t } = useTranslation();
  const { status } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const from = (locationState as NavigationState)?.from || '/';

  useEffect(() => {
    if (status === 'logged') {
      navigate(from || '/');
    }
  }, [navigate, status]);

  return (
    <GoogleTagManager title={t('__PAGE_TITLE_JOIN')}>
      <CenteredXYContainer>
        <StyledLogo type="vertical" size={200} />
      </CenteredXYContainer>
    </GoogleTagManager>
  );
};

export default JoinPage;
