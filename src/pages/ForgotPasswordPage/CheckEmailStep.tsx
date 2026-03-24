import { useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Anchor, MD, Span, Title, XL } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import emailEnvelope from 'src/assets/email-envelop-onboarding.svg';

const RESEND_COOLDOWN_SECONDS = 60;

interface CheckEmailStepProps {
  email: string;
  onResend: () => Promise<void>;
}

export const CheckEmailStep = ({ email, onResend }: CheckEmailStepProps) => {
  const { t } = useTranslation();
  const loginRoute = useLocalizeRoute('login');
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

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
    try {
      await onResend();
      setResendTimer(RESEND_COOLDOWN_SECONDS);
    } catch {
      // silently fail
    } finally {
      setIsResending(false);
    }
  }, [resendTimer, isResending, onResend]);

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
          marginTop: appTheme.space.xs,
        }}
      >
        <Trans
          i18nKey="FORGOT_PASSWORD_CHECK_EMAIL_SUBTITLE"
          values={{ email }}
          components={{ bold: <Span isBold /> }}
        />
      </MD>
      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[600],
          marginTop: appTheme.space.md,
        }}
      >
        {t('FORGOT_PASSWORD_LINK_EXPIRY')}
      </MD>

      <img
        src={emailEnvelope}
        alt=""
        style={{
          maxWidth: 160,
          marginTop: appTheme.space.xl,
          marginBottom: appTheme.space.xl,
        }}
      />

      <MD
        style={{
          textAlign: 'center',
          color: appTheme.palette.grey[600],
        }}
      >
        {t('FORGOT_PASSWORD_DIDNT_RECEIVE')}{' '}
        <Anchor
          onClick={handleResend}
          disabled={resendTimer > 0 || isResending}
          style={{ fontWeight: 400 }}
        >
          {resendTimer > 0
            ? `${t('__VERIFY_CODE_RESEND_TIMER_PREFIX')} ${resendTimer}s`
            : t('FORGOT_PASSWORD_CLICK_RESEND')}
        </Anchor>
      </MD>

      <div style={{ textAlign: 'center', marginTop: appTheme.space.lg }}>
        <Anchor href={loginRoute} style={{ color: appTheme.palette.blue[600] }}>
          {t('FORGOT_PASSWORD_BACK_TO_LOGIN')}
        </Anchor>
      </div>
    </>
  );
};
