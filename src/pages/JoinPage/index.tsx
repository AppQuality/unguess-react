import { Col, Grid, Logo, Row } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import joinImg1 from 'src/assets/join-step-1.svg';
import joinImg2 from 'src/assets/unguess-join-steps.svg';
import joinImg3 from 'src/assets/unguess-join-steps.svg';
import joinBg from 'src/assets/join-bg.png';
import logoImgs from 'src/assets/join-loghi.png';
import { GoogleTagManager } from 'src/common/GoogleTagManager';
import { useGetInvitesByProfileAndTokenQuery } from 'src/features/api';
import styled from 'styled-components';
import { FormProvider } from './FormProvider';
import { JoinForm } from './JoinForm';
import { JoinPageError } from './JoinPageError';
import { JoinPageLoading } from './JoinPageLoading';
import { WaitModal } from './WaitModal';

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 0 ${({ theme }) => theme.space.xl};
  max-width: ${({ theme }) => theme.breakpoints.xxl};
  margin: 0 auto;
  background: url(${joinBg}) no-repeat right top;
  background-size: cover;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .step-img {
    flex: 1 0 auto;
  }
  .partners-img {
    flex: 0 0 auto;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: ${(p) => p.theme.space.lg};
`;

const JoinPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { status } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { profile, token } = useParams();
  const shouldSkipQuery =
    status === 'logged' || status === 'loading' || !(profile && token);

  const { isLoading, data, error } = useGetInvitesByProfileAndTokenQuery(
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

  if (isLoading || (shouldSkipQuery && profile && token)) {
    return <JoinPageLoading />;
  }

  if (error) return <JoinPageError />;

  return (
    <GoogleTagManager title={t('__PAGE_TITLE_JOIN')}>
      <FormProvider {...data}>
        {({ isSubmitting, values }) => (
          <CenteredXYContainer>
            {isSubmitting ? (
              <WaitModal />
            ) : (
              <Grid gutters="lg">
                <Row>
                  <Col md={5}>
                    <LogoWrapper>
                      <Logo type="vertical" size={100} />
                    </LogoWrapper>
                    <JoinForm />
                  </Col>
                  <StyledCol md={7}>
                    {values.step === 1 && (
                      <img
                        className="step-img"
                        src={joinImg1}
                        alt="Unguess Join Step 1"
                      />
                    )}
                    {values.step === 2 && (
                      <img
                        className="step-img"
                        src={joinImg2}
                        alt="Unguess Join Step 2"
                      />
                    )}
                    {values.step === 3 && (
                      <img
                        className="step-img"
                        src={joinImg3}
                        alt="Unguess Join Step 3"
                      />
                    )}
                    <img
                      className="partners-img"
                      src={logoImgs}
                      alt="Unguess partners"
                    />
                  </StyledCol>
                </Row>
              </Grid>
            )}
          </CenteredXYContainer>
        )}
      </FormProvider>
    </GoogleTagManager>
  );
};

export default JoinPage;
