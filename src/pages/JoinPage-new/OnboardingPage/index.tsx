/**
 * OnboardingPage - Flusso di onboarding multi-step
 * Step 1: Dati personali (nome, cognome, ruolo, company size)
 * Step 2: Nome workspace
 */
import { Col, Grid, Logo, Row } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Track } from 'src/common/Track';
import styled from 'styled-components';
import { OnboardingProvider } from './OnboardingProvider';
import { PersonalInfoStep } from './Steps/PersonalInfoStep';
import { WorkspaceStep } from './Steps/WorkspaceStep';

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

const OnboardingPage = () => {
  const { t } = useTranslation();

  const meta = [
    { name: 'og:description', content: t('__PAGE_ONBOARDING_DESCRIPTION') },
    { name: 'robots', content: 'noindex, nofollow' },
  ];

  return (
    <Track
      title={t('__PAGE_ONBOARDING_TITLE')}
      description={t('__PAGE_ONBOARDING_DESCRIPTION')}
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
                  <OnboardingProvider>
                    {({ step }) => (
                      <>
                        {step === 1 && <PersonalInfoStep />}
                        {step === 2 && <WorkspaceStep />}
                      </>
                    )}
                  </OnboardingProvider>
                </FormContainer>
              </Col>
            </Row>
          </Grid>
        </CenteredXYContainer>
      </Background>
    </Track>
  );
};

export default OnboardingPage;
