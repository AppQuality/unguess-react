import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Logo } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { AuthCardWrapper } from 'src/common/components/AuthCardWrapper';
import { NotLogged } from 'src/features/templates/NotLogged';
import { useAuth } from 'src/features/auth/context';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { AuthHeader } from '../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../LoginPage/parts/AuthFooter';
import { VerifyIdentityStep } from '../ForgotPasswordPage/VerifyIdentityStep';
import { ChangePasswordForm } from '../ForgotPasswordPage/ChangePasswordForm';

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

const StyledLogo = styled(Logo)`
  margin: ${({ theme }) => theme.space.md};
  width: 100%;
`;

type Step = 'verify' | 'changePassword';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginRoute = useLocalizeRoute('login');
  const { confirmForgotPassword, forgotPassword } = useAuth();

  const emailParam = searchParams.get('email') || '';
  const codeParam = searchParams.get('code') || '';
  const smsDestination = searchParams.get('sms_destination') || '';

  const [step, setStep] = useState<Step>(
    smsDestination ? 'verify' : 'changePassword'
  );
  const [verifiedCode, setVerifiedCode] = useState(codeParam);

  useEffect(() => {
    if (!emailParam || !codeParam) {
      navigate(loginRoute, { replace: true });
    }
  }, [emailParam, codeParam, navigate, loginRoute]);

  const handleVerifyCode = (smsCode: string) => {
    setVerifiedCode(smsCode);
    setStep('changePassword');
  };

  const handleResend = async () => {
    await forgotPassword(emailParam);
  };

  const handleResetPassword = async (newPassword: string) => {
    await confirmForgotPassword(emailParam, verifiedCode, newPassword);
  };

  if (!emailParam || !codeParam) return null;

  return (
    <NotLogged
      title={t('FORGOT_PASSWORD_CHANGE_TITLE')}
      description={t('FORGOT_PASSWORD_CHANGE_SUBTITLE')}
    >
      <PageWrapper>
        <AuthHeader />
        <CenteredXYContainer>
          <AuthCardWrapper>
            <StyledLogo type="icon" size={40} />
            {step === 'verify' && (
              <VerifyIdentityStep
                email={emailParam}
                smsDestination={smsDestination}
                onVerify={handleVerifyCode}
                onResend={handleResend}
              />
            )}
            {step === 'changePassword' && (
              <ChangePasswordForm onSubmit={handleResetPassword} />
            )}
          </AuthCardWrapper>
        </CenteredXYContainer>
        <AuthFooter />
      </PageWrapper>
    </NotLogged>
  );
};

export default ResetPasswordPage;
