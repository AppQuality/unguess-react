import { Col, Grid, Logo, Row } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Track } from 'src/common/Track';
import { useGetInvitesByProfileAndTokenQuery } from 'src/features/api';
import styled from 'styled-components';
import { SetPasswordForm } from './SetPasswordForm';

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
  max-width: ${({ theme }) => theme.breakpoints.md};
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 0 ${({ theme }) => theme.space.xl};
    max-width: ${({ theme }) => theme.breakpoints.xxl};
  }
`;

const Background = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.space.xl} * 2);
  padding: ${({ theme }) => theme.space.xl} 0 ${({ theme }) => theme.space.md};
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: ${(p) => p.theme.space.lg};
`;

const FormContainer = styled.div`
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    padding: 0 ${(p) => p.theme.space.xxl};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${(p) => p.theme.space.xl};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${(p) => p.theme.space.xl};
  color: ${(p) => p.theme.palette.red[600]};
`;

const InvitedUserPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, token } = useParams();

  // Verifica il token di invito
  const { isLoading, data, error } = useGetInvitesByProfileAndTokenQuery(
    {
      profile: profile || '',
      token: token || '',
    },
    {
      skip: !(profile && token),
    }
  );

  const meta = [
    { name: 'og:description', content: t('__PAGE_INVITED_USER_DESCRIPTION') },
    { name: 'robots', content: 'noindex, nofollow' },
  ];

  useEffect(() => {
    if (!profile || !token) {
      navigate('/join/signup');
    }
  }, [profile, token, navigate]);

  if (isLoading) {
    return (
      <Track
        title={t('__PAGE_INVITED_USER_TITLE')}
        description={t('__PAGE_INVITED_USER_DESCRIPTION')}
        metaTags={meta}
      >
        <Background>
          <CenteredXYContainer>
            <LoadingMessage>{t('LOADING')}</LoadingMessage>
          </CenteredXYContainer>
        </Background>
      </Track>
    );
  }

  if (error) {
    return (
      <Track
        title={t('__PAGE_INVITED_USER_TITLE')}
        description={t('__PAGE_INVITED_USER_DESCRIPTION')}
        metaTags={meta}
      >
        <Background>
          <CenteredXYContainer>
            <ErrorMessage>{t('INVITED_USER_ERROR_INVALID_TOKEN')}</ErrorMessage>
          </CenteredXYContainer>
        </Background>
      </Track>
    );
  }

  return (
    <Track
      title={t('__PAGE_INVITED_USER_TITLE')}
      description={t('__PAGE_INVITED_USER_DESCRIPTION')}
      metaTags={meta}
    >
      <Background>
        <CenteredXYContainer>
          <Grid gutters="lg">
            <Row>
              <Col xs={12}>
                <LogoWrapper>
                  <Logo type="vertical" size={100} />
                </LogoWrapper>
                <FormContainer>
                  <SetPasswordForm
                    inviteData={data}
                    profileId={Number(profile)}
                    token={token || ''}
                  />
                </FormContainer>
              </Col>
            </Row>
          </Grid>
        </CenteredXYContainer>
      </Background>
    </Track>
  );
};

export default InvitedUserPage;
