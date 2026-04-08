import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { AuthCardWrapper } from 'src/common/components/AuthCardWrapper';
import { NotLogged } from 'src/features/templates/NotLogged';
import { useAuth } from 'src/features/auth/context';
import { AuthHeader } from '../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../LoginPage/parts/AuthFooter';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { VerifyIdentityStep } from './VerifyIdentityStep';
import { ChangePasswordForm } from './ChangePasswordForm';

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

const CardWrapper = styled(AuthCardWrapper)`
  padding: 0 ${({ theme }) => theme.space.md};
`;

const StyledLogo = styled(Logo)`
  margin: ${({ theme }) => theme.space.md};
  width: 100%;
`;

type Step = 'request' | 'verify' | 'changePassword';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { forgotPassword, confirmForgotPassword } = useAuth();

  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('');
  const [smsDestination, setSmsDestination] = useState('');
  const [code, setCode] = useState('');

  const handleSendResetCode = async (userEmail: string) => {
    const result = await forgotPassword(userEmail);
    setEmail(userEmail);
    setSmsDestination(result.destination || '');
    setStep('verify');
  };

  const handleResend = async () => {
    await forgotPassword(email);
  };

  const handleVerifyCode = (verifiedCode: string) => {
    setCode(verifiedCode);
    setStep('changePassword');
  };

  const handleResetPassword = async (newPassword: string) => {
    await confirmForgotPassword(email, code, newPassword);
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
            {step === 'verify' && (
              <VerifyIdentityStep
                email={email}
                smsDestination={smsDestination}
                onVerify={handleVerifyCode}
                onResend={handleResend}
                onBack={() => setStep('request')}
              />
            )}
            {step === 'changePassword' && (
              <ChangePasswordForm onSubmit={handleResetPassword} />
            )}
          </CardWrapper>
        </CenteredXYContainer>
        <AuthFooter />
      </PageWrapper>
    </NotLogged>
  );
};

export default ForgotPasswordPage;
