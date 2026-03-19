import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Track } from 'src/common/Track';
import {
  Button,
  CodeVerifier,
  MD,
  Message,
  Title,
  XL,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useAuth } from 'src/features/auth/context';
import { AuthHeader } from '../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../LoginPage/parts/AuthFooter';

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
  max-width: 376px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg} 0;
`;

interface VerifyCodeState {
  email: string;
  challengeType: string;
  from: string;
}

const VerifyCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const loginRoute = useLocalizeRoute('login');
  const { confirmMfaSignIn } = useAuth();

  const { email, from } = (locationState as VerifyCodeState) || {};

  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      navigate(loginRoute, { replace: true });
    }
  }, [email, navigate, loginRoute]);

  const handleVerify = useCallback(async () => {
    if (code.length < 6) return;
    setError(null);
    setIsVerifying(true);
    try {
      await confirmMfaSignIn(code);
      document.location.href = from || '/';
    } catch (err: any) {
      const errorMsg = err.message || err.name || '';
      const isSessionExpired =
        errorMsg.includes('session is expired') ||
        errorMsg.includes('Invalid session') ||
        errorMsg.includes('NotAuthorizedException');
      if (isSessionExpired) {
        window.location.href = `${loginRoute}?session_expired=true`;
        return;
      }
      setError(t('__VERIFY_CODE_INVALID_CODE'));
      setIsVerifying(false);
    }
  }, [confirmMfaSignIn, from, t, code]);

  if (!email) return null;

  return (
    <Track title={t('__PAGE_TITLE_VERIFY_CODE')}>
      <PageWrapper>
        <AuthHeader />
        <CenteredXYContainer>
          <CardWrapper>
            <Title
              style={{
                textAlign: 'center',
                marginTop: appTheme.space.sm,
              }}
            >
              <XL isBold style={{ color: appTheme.palette.blue[600] }}>
                {t('__VERIFY_CODE_TITLE')}
              </XL>
            </Title>
            <MD
              style={{
                textAlign: 'center',
                color: appTheme.palette.grey[600],
                marginBottom: appTheme.space.lg,
              }}
            >
              {email}
            </MD>
            <FormContainer>
              <MD
                style={{
                  textAlign: 'center',
                  color: appTheme.palette.grey[800],
                  marginBottom: appTheme.space.lg,
                }}
              >
                {t('__VERIFY_CODE_TOTP_INSTRUCTIONS')}
              </MD>
              <CodeVerifier
                length={6}
                onComplete={(completedCode) => setCode(completedCode)}
                autoFocus
              />
              {error && (
                <Message
                  validation="error"
                  style={{ marginTop: appTheme.space.md, textAlign: 'center' }}
                >
                  {error}
                </Message>
              )}
              <Button
                isPrimary
                isAccent
                isStretched
                disabled={code.length < 6 || isVerifying}
                onClick={handleVerify}
                style={{
                  marginTop: appTheme.space.lg,
                }}
              >
                {isVerifying
                  ? t('__VERIFY_CODE_VERIFYING')
                  : t('__LOGIN_FORM_CTA')}
              </Button>
              <Button
                isBasic
                onClick={() => navigate(loginRoute)}
                style={{
                  marginTop: appTheme.space.xs,
                  color: appTheme.palette.blue[600],
                }}
              >
                {t('__VERIFY_CODE_BACK_CTA')}
              </Button>
            </FormContainer>
          </CardWrapper>
        </CenteredXYContainer>
        <AuthFooter />
      </PageWrapper>
    </Track>
  );
};

export default VerifyCodePage;
