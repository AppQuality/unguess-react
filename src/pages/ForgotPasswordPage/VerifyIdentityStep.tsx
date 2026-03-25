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

const RESEND_COOLDOWN_SECONDS = 60;

interface VerifyIdentityStepProps {
  email: string;
  smsDestination: string;
  onVerify: (code: string) => void;
  onResend: () => Promise<void>;
}

export const VerifyIdentityStep = ({
  email,
  smsDestination,
  onVerify,
  onResend,
}: VerifyIdentityStepProps) => {
  const { t } = useTranslation();
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

  const handleVerify = useCallback(() => {
    if (code.length < 6) return;
    setIsVerifying(true);
    setError(null);
    try {
      onVerify(code);
    } catch (err: any) {
      setError(err.message || t('__VERIFY_CODE_INVALID_CODE'));
      setIsVerifying(false);
    }
  }, [code, onVerify, t]);

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

  return (
    <>
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
      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[800],
          marginBottom: appTheme.space.lg,
        }}
      >
        {t('FORGOT_PASSWORD_SMS_CODE_INSTRUCTIONS', {
          destination: smsDestination,
        })}
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
        {resendTimer > 0 ? (
          `${t('__VERIFY_CODE_RESEND_TIMER_PREFIX')} ${resendTimer}s`
        ) : (
          <Anchor
            onClick={isResending ? undefined : handleResend}
            style={{
              fontWeight: 400,
              ...(isResending && {
                opacity: 0.5,
                pointerEvents: 'none' as const,
              }),
            }}
          >
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
        {isVerifying ? t('__VERIFY_CODE_VERIFYING') : t('__LOGIN_FORM_CTA')}
      </Button>
      <Button
        isBasic
        onClick={() => window.history.back()}
        style={{
          marginTop: appTheme.space.xs,
          color: appTheme.palette.blue[600],
        }}
      >
        {t('__VERIFY_CODE_BACK_CTA')}
      </Button>
    </>
  );
};
