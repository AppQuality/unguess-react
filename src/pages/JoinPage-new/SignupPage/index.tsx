/**
 * SignupPage - Pagina di registrazione con Cognito
 * Step 1: Email + Password
 * Step 2: Conferma email con codice OTP
 */
import { Col, Grid, Logo, Row } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Track } from 'src/common/Track';
import styled from 'styled-components';
import { SignupForm } from './SignupForm';
import { ConfirmEmailForm } from './ConfirmEmailForm';

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

const SignupPage = () => {
  const { t } = useTranslation();
  const [userEmail, setUserEmail] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const meta = [
    { name: 'og:description', content: t('__PAGE_JOIN_DESCRIPTION') },
    { name: 'robots', content: 'index, follow' },
  ];

  console.log('SignupPage render - needsConfirmation:', needsConfirmation);

  return (
    <Track
      title={t('__PAGE_JOIN_TITLE')}
      description={t('__PAGE_JOIN_DESCRIPTION')}
      metaTags={meta}
    >
      <Background>
        <CenteredXYContainer>
          <Grid gutters="lg">
            <Row justifyContent="center">
              <Col xs={12} md={8} lg={6}>
                <LogoWrapper>
                  <Logo type="vertical" size={100} />
                </LogoWrapper>
                <FormContainer>
                  {needsConfirmation ? (
                    <ConfirmEmailForm email={userEmail} />
                  ) : (
                    <SignupForm
                      onSignupSuccess={(email) => {
                        setUserEmail(email);
                        setNeedsConfirmation(true);
                      }}
                    />
                  )}
                </FormContainer>
              </Col>
            </Row>
          </Grid>
        </CenteredXYContainer>
      </Background>
    </Track>
  );
};

export default SignupPage;
