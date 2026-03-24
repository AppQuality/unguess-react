import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Anchor,
  Button,
  CodeVerifier,
  MD,
  Message,
  Title,
  XL,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

const RESEND_COOLDOWN_SECONDS = 60;

interface CheckEmailStepProps {
  email: string;
  onResend: () => Promise<void>;
  onSubmitCode: (code: string) => void;
}

export const CheckEmailStep = ({
  email,
  onResend,
  onSubmitCode,
}: CheckEmailStepProps) => {
  const { t } = useTranslation();
  const loginRoute = useLocalizeRoute('login');
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResend = useCallback(async () => {
    if (resendTimer > 0 || isResending) return;
    setIsResending(true);
    setError(null);
    try {
      await onResend();
      setResendTimer(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      setError(err.message || t('FORGOT_PASSWORD_ERROR_GENERIC'));
    } finally {
      setIsResending(false);
    }
  }, [resendTimer, isResending, onResend, t]);

  const handleSubmit = () => {
    if (code.length < 6) return;
    onSubmitCode(code);
  };

  return (
    <>
      <Title
        style={{
          textAlign: 'center',
          marginTop: appTheme.space.sm,
        }}
      >
        <XL isBold style={{ color: appTheme.palette.blue[600] }}>
          {t('FORGOT_PASSWORD_CHECK_EMAIL_TITLE')}
        </XL>
      </Title>
      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[600],
          marginBottom: appTheme.space.xxs,
        }}
      >
        {t('FORGOT_PASSWORD_CHECK_EMAIL_SUBTITLE', { email })}
      </MD>
      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[600],
          marginBottom: appTheme.space.lg,
        }}
      >
        {t('FORGOT_PASSWORD_LINK_EXPIRY')}
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
        {t('FORGOT_PASSWORD_DIDNT_RECEIVE')}{' '}
        <Anchor
          onClick={handleResend}
          disabled={resendTimer > 0 || isResending}
          style={{ fontWeight: 600 }}
        >
          {resendTimer > 0
            ? `${t('__VERIFY_CODE_RESEND_TIMER_PREFIX')} ${resendTimer}s`
            : t('FORGOT_PASSWORD_CLICK_RESEND')}
        </Anchor>
      </MD>

      <Button
        isPrimary
        isAccent
        isStretched
        disabled={code.length < 6}
        onClick={handleSubmit}
        style={{ marginTop: appTheme.space.lg }}
      >
        {t('FORGOT_PASSWORD_VERIFY_CODE_CTA')}
      </Button>

      <div style={{ textAlign: 'center', marginTop: appTheme.space.md }}>
        <Anchor href={loginRoute} style={{ color: appTheme.palette.blue[600] }}>
          {t('FORGOT_PASSWORD_BACK_TO_LOGIN')}
        </Anchor>
      </div>
    </>
  );
};
