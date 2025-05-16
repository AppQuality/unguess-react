import { useEffect } from 'react';
import { Logo } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { GoogleTagManager } from 'src/common/GoogleTagManager';
import { useGetInvitesByProfileAndTokenQuery } from 'src/features/api';

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
  const [searchParams] = useSearchParams();
  const { status } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { profile, token } = useParams();
  const shouldSkipQuery =
    status === 'logged' || status === 'loading' || !(profile && token);

  const { isLoading, data } = useGetInvitesByProfileAndTokenQuery(
    {
      profile: profile || '',
      token: token || '',
    },
    {
      skip: shouldSkipQuery,
    }
  );

  useEffect(() => {
    if (status === 'logged') {
      navigate(searchParams.get('redirectTo') || '/');
    }
  }, [navigate, status, searchParams]);

  if (isLoading) {
    return <div data-qa="join-page-loader">Loading...</div>;
  }

  return (
    <GoogleTagManager title={t('__PAGE_TITLE_JOIN')}>
      <CenteredXYContainer>
        <StyledLogo type="vertical" size={200} />
      </CenteredXYContainer>
    </GoogleTagManager>
  );
};

export default JoinPage;
