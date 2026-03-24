import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { NotLogged } from 'src/features/templates/NotLogged';
import { useAuth } from 'src/features/auth/context';
import { AuthHeader } from '../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../LoginPage/parts/AuthFooter';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { CheckEmailStep } from './CheckEmailStep';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  flex: 1;
`;

const CardWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const StyledLogo = styled(Logo)`
  margin: ${({ theme }) => theme.space.md};
  width: 100%;
`;

type Step = 'request' | 'emailSent';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { forgotPassword } = useAuth();

  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('');

  const handleSendResetCode = async (userEmail: string) => {
    await forgotPassword(userEmail);
    setEmail(userEmail);
    setStep('emailSent');
  };

  const handleResend = async () => {
    await forgotPassword(email);
  };

  return (
    <NotLogged
      title={t('FORGOT_PASSWORD_TITLE')}
      description={t('FORGOT_PASSWORD_SUBTITLE')}
    >
      <PageWrapper>
        <AuthHeader />
        <CenteredXYContainer>
          <CardWrapper>
            <StyledLogo type="icon" size={40} />
            {step === 'request' && (
              <ForgotPasswordForm onSubmit={handleSendResetCode} />
            )}
            {step === 'emailSent' && (
              <CheckEmailStep email={email} onResend={handleResend} />
            )}
          </CardWrapper>
        </CenteredXYContainer>
        <AuthFooter />
      </PageWrapper>
    </NotLogged>
  );
};

export default ForgotPasswordPage;
