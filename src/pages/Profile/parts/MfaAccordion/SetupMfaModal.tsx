import { useState } from 'react';
import {
  Button,
  FormField,
  Label,
  MD,
  Modal,
  ModalClose,
  Radio,
  SM,
  Tag,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import styled from 'styled-components';
import { updateMFAPreference, verifyTOTPSetup } from 'aws-amplify/auth';
import { AuthenticatorStep } from './steps/AuthenticatorStep';
import { SmsStep } from './steps/SmsStep';

type MfaMethod = 'authenticator' | 'sms';
type Step = 'choose' | 'setup';

const RadioOption = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.borderRadii.md};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-top: ${({ theme }) => theme.space.md};
`;

export const SetupMfaModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('choose');
  const [selectedMethod, setSelectedMethod] =
    useState<MfaMethod>('authenticator');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+39');
  const [authCode, setAuthCode] = useState('');

  const handleContinue = async () => {
    if (step === 'choose') {
      setStep('setup');
      return;
    }
    await verifyTOTPSetup({ code: authCode });
    // TODO: handle other method verification
    updateMFAPreference({
      totp: 'PREFERRED',
    });
    // TODO: call API to verify code / send SMS
    onClose();
  };

  const handleBack = () => {
    if (step === 'setup') {
      setStep('choose');
      return;
    }
    onClose();
  };

  const isSetupContinueDisabled =
    step === 'setup' &&
    ((selectedMethod === 'authenticator' && authCode.length < 6) ||
      (selectedMethod === 'sms' && !phoneNumber));

  const getFooterPrimaryLabel = () => {
    if (step === 'choose') return t('__PROFILE_PAGE_MFA_SETUP_MODAL_CONTINUE');
    if (selectedMethod === 'sms')
      return t('__PROFILE_PAGE_MFA_SMS_STEP_SEND_CODE');
    return t('__PROFILE_PAGE_MFA_SETUP_MODAL_CONTINUE');
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>{t('__PROFILE_PAGE_MFA_SETUP_MODAL_TITLE')}</Modal.Header>
      <Modal.Body>
        {step === 'choose' && (
          <>
            <MD
              style={{
                color: appTheme.palette.grey[800],
                marginBottom: appTheme.space.md,
              }}
            >
              {t('__PROFILE_PAGE_MFA_SETUP_MODAL_SUBTITLE')}
            </MD>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: appTheme.space.sm,
              }}
            >
              <RadioOption isSelected={selectedMethod === 'authenticator'}>
                <FormField>
                  <Radio
                    name="mfa-method"
                    value="authenticator"
                    checked={selectedMethod === 'authenticator'}
                    onChange={() => setSelectedMethod('authenticator')}
                  >
                    <Label isRegular>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: appTheme.space.xs,
                        }}
                      >
                        <strong>
                          {t(
                            '__PROFILE_PAGE_MFA_SETUP_MODAL_AUTHENTICATOR_LABEL'
                          )}
                        </strong>
                        <Tag
                          color={appTheme.palette.green[600]}
                          hue={appTheme.palette.green[10]}
                        >
                          {t('__PROFILE_PAGE_MFA_SETUP_MODAL_RECOMMENDED')}
                        </Tag>
                      </span>
                    </Label>
                    <SM style={{ color: appTheme.palette.grey[600] }}>
                      {t(
                        '__PROFILE_PAGE_MFA_SETUP_MODAL_AUTHENTICATOR_DESCRIPTION'
                      )}
                    </SM>
                  </Radio>
                </FormField>
              </RadioOption>
              <RadioOption isSelected={selectedMethod === 'sms'}>
                <FormField>
                  <Radio
                    name="mfa-method"
                    value="sms"
                    checked={selectedMethod === 'sms'}
                    onChange={() => setSelectedMethod('sms')}
                  >
                    <Label isRegular>
                      <strong>
                        {t('__PROFILE_PAGE_MFA_SETUP_MODAL_SMS_LABEL')}
                      </strong>
                    </Label>
                    <SM style={{ color: appTheme.palette.grey[600] }}>
                      {t('__PROFILE_PAGE_MFA_SETUP_MODAL_SMS_DESCRIPTION')}
                    </SM>
                  </Radio>
                </FormField>
              </RadioOption>
            </div>
            <InfoRow>
              <InfoIcon
                style={{
                  width: appTheme.iconSizes.sm,
                  height: appTheme.iconSizes.sm,
                  color: appTheme.palette.grey[500],
                  flexShrink: 0,
                }}
              />
              <SM style={{ color: appTheme.palette.grey[600] }}>
                {t('__PROFILE_PAGE_MFA_SETUP_MODAL_INFO')}
              </SM>
            </InfoRow>
          </>
        )}
        {step === 'setup' && selectedMethod === 'authenticator' && (
          <AuthenticatorStep onCodeComplete={(code) => setAuthCode(code)} />
        )}
        {step === 'setup' && selectedMethod === 'sms' && (
          <SmsStep
            phoneNumber={phoneNumber}
            onPhoneNumberChange={setPhoneNumber}
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button isLink onClick={handleBack} style={{ paddingRight: 20 }}>
          {step === 'choose'
            ? t('__PROFILE_PAGE_MFA_SETUP_MODAL_CANCEL')
            : t('__PROFILE_PAGE_MFA_SETUP_MODAL_BACK')}
        </Button>
        <Button
          isPrimary
          isAccent
          disabled={isSetupContinueDisabled}
          onClick={handleContinue}
        >
          {getFooterPrimaryLabel()}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onClose} />
    </Modal>
  );
};
