/**
 * ConfirmEmailForm - Form per confermare l'email con codice OTP
 * Dopo la registrazione, l'utente riceve un codice via email
 */
import {
  Anchor,
  Button,
  CodeVerifier,
  MD,
  Message,
  XL,
} from '@appquality/unguess-design-system';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useAuth } from 'src/features/auth/context';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';

const RESEND_COOLDOWN_SECONDS = 60;

const FormContainer = styled.div`
  width: 100%;
  max-width: 376px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

export const ConfirmEmailForm = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { t } = useTranslation();
  const { confirmSignup, login, resendSignupCode } = useAuth();
  const navigate = useNavigate();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });

  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [resendTimer]);

  const handleVerify = useCallback(async () => {
    if (code.length < 6) return;
    setError(null);
    setIsVerifying(true);
    try {
      await confirmSignup(email, code);

      sendGTMevent({
        event: 'sign-up-flow',
        category: 'not invited',
        action: 'email confirmed',
      });

      await login(email, password);

      sendGTMevent({
        event: 'sign-up-flow',
        category: 'not invited',
        action: 'auto-login completed',
      });

      navigate('/join/onboarding');
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Confirmation error:', err);
      sendGTMevent({
        event: 'sign-up-flow',
        category: 'not invited',
        action: 'confirmation error',
        content: err.message,
      });
      setError(err.message || t('CONFIRM_EMAIL_ERROR_GENERIC'));
      setIsVerifying(false);
    }
  }, [code, confirmSignup, email, login, password, navigate, sendGTMevent, t]);

  const handleResend = useCallback(async () => {
    if (resendTimer > 0 || isResending) return;
    setIsResending(true);
    setError(null);
    try {
      await resendSignupCode(email);
      setResendTimer(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Resend error:', err);
      setError(err.message || t('CONFIRM_EMAIL_ERROR_GENERIC'));
    } finally {
      setIsResending(false);
    }
  }, [resendTimer, isResending, resendSignupCode, email, t]);

  return (
    <FormContainer>
      <XL
        isBold
        style={{
          textAlign: 'center',
          color: appTheme.palette.blue[600],
          marginBottom: appTheme.space.xs,
        }}
      >
        {t('CONFIRM_EMAIL_TITLE')}
      </XL>
      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[600],
          marginBottom: appTheme.space.xxs,
        }}
      >
        {t('CONFIRM_EMAIL_DESCRIPTION')}
      </MD>
      <MD
        isBold
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[800],
          marginBottom: appTheme.space.lg,
        }}
      >
        {email}
      </MD>
      <MD isBold style={{ marginBottom: appTheme.space.sm }}>
        {t('CONFIRM_EMAIL_CODE_LABEL')}
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
      <MD
        style={{
          marginTop: appTheme.space.md,
          color: appTheme.palette.grey[600],
        }}
      >
        {t('CONFIRM_EMAIL_DIDNT_RECEIVE')}{' '}
        {resendTimer > 0 || isResending ? (
          `${t('__VERIFY_CODE_RESEND_TIMER_PREFIX')} ${resendTimer}s`
        ) : (
          <Anchor onClick={handleResend}>
            {t('__VERIFY_CODE_RESEND_CTA')}
          </Anchor>
        )}
      </MD>
      <Button
        isPrimary
        isAccent
        isStretched
        disabled={code.length < 6 || isVerifying}
        onClick={handleVerify}
        style={{ marginTop: appTheme.space.lg }}
      >
        {isVerifying ? t('LOADING') : t('CONFIRM_EMAIL_BUTTON')}
      </Button>
      <Button
        isBasic
        onClick={() => navigate(-1)}
        style={{ marginTop: appTheme.space.xs }}
      >
        {t('SIGNUP_FORM_BACK')}
      </Button>
    </FormContainer>
  );
};
