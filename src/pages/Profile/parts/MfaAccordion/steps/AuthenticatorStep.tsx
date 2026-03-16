import {
  Anchor,
  CodeVerifier,
  MD,
  SM,
} from '@appquality/unguess-design-system';
import { setUpTOTP } from 'aws-amplify/auth';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const StepList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step-counter;
`;

const StepItem = styled.li`
  counter-increment: step-counter;
  margin-bottom: ${({ theme }) => theme.space.lg};

  &::before {
    content: counter(step-counter) '. ';
    font-weight: 500;
    color: ${({ theme }) => theme.palette.grey[800]};
  }
`;

const StepTitle = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const QrPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.space.md} 0;
`;

interface AuthenticatorStepProps {
  onCodeComplete?: (code: string) => void;
}

export const AuthenticatorStep = ({
  onCodeComplete,
}: AuthenticatorStepProps) => {
  const { t } = useTranslation();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | undefined>(undefined);
  console.log('🚀 ~ AuthenticatorStep ~ qrCodeUrl:', qrCodeUrl);

  useEffect(() => {
    const initTOTP = async () => {
      const totpDetails = await setUpTOTP();

      const totpUri = totpDetails.getSetupUri(
        'APP UNGUESS',
        'https://app.unguess.io'
      );
      const generatedQrCodeUrl = await QRCode.toDataURL(totpUri.href);
      console.log(`🚀 ~ initTOTP ~ generatedQrCodeUrl:`, generatedQrCodeUrl);

      setQrCodeUrl(generatedQrCodeUrl);
    };
    initTOTP();
  }, []);
  return (
    <StepList>
      <StepItem>
        <StepTitle>
          {t('__PROFILE_PAGE_MFA_AUTH_STEP_DOWNLOAD_TITLE')}
        </StepTitle>
        <br />
        <SM style={{ color: appTheme.palette.grey[800] }}>
          {t('__PROFILE_PAGE_MFA_AUTH_STEP_DOWNLOAD_DESCRIPTION')}
        </SM>
      </StepItem>

      <StepItem>
        <StepTitle>{t('__PROFILE_PAGE_MFA_AUTH_STEP_SCAN_TITLE')}</StepTitle>
        <br />
        <SM style={{ color: appTheme.palette.grey[800] }}>
          {t('__PROFILE_PAGE_MFA_AUTH_STEP_SCAN_DESCRIPTION')}
        </SM>
        <QrPlaceholder>
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code" width={160} height={160} />
          ) : (
            <div
              style={{
                width: 160,
                height: 160,
                backgroundColor: appTheme.palette.grey[200],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SM style={{ color: appTheme.palette.grey[500] }}>QR Code</SM>
            </div>
          )}
        </QrPlaceholder>
        <div style={{ textAlign: 'center' }}>
          <MD style={{ color: appTheme.palette.grey[800] }}>
            {t('__PROFILE_PAGE_MFA_AUTH_STEP_CANT_SCAN')}{' '}
            <Anchor
              style={{
                color: appTheme.palette.blue[800],
                cursor: 'pointer',
              }}
            >
              {t('__PROFILE_PAGE_MFA_AUTH_STEP_ENTER_KEY')}
            </Anchor>
          </MD>
        </div>
      </StepItem>

      <StepItem>
        <StepTitle>{t('__PROFILE_PAGE_MFA_AUTH_STEP_CODE_TITLE')}</StepTitle>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SM
            style={{
              color: appTheme.palette.grey[800],
              marginTop: appTheme.space.sm,
              marginBottom: appTheme.space.sm,
            }}
          >
            {t('__PROFILE_PAGE_MFA_AUTH_STEP_CODE_DESCRIPTION')}
          </SM>
          <CodeVerifier length={6} onComplete={onCodeComplete} autoFocus />
        </div>
      </StepItem>
    </StepList>
  );
};
