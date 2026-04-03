import { useState } from 'react';
import {
  Button,
  Modal,
  ModalClose,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import {
  updateMFAPreference,
  updateUserAttributes,
  verifyTOTPSetup,
} from 'aws-amplify/auth';
import { appTheme } from 'src/app/theme';
import { AuthenticatorStep } from './steps/AuthenticatorStep';

export const SetupMfaModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [authCode, setAuthCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleContinue = async () => {
    setError(null);
    setIsVerifying(true);
    try {
      await verifyTOTPSetup({ code: authCode });
      await updateMFAPreference({
        totp: 'PREFERRED',
      });
      await updateUserAttributes({
        userAttributes: {
          'custom:mfa_activated_at': new Date().toISOString(),
        },
      });
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__PROFILE_PAGE_TOAST_SUCCESS_MFA_ADDED')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
      onClose();
    } catch {
      setError(t('__VERIFY_CODE_INVALID_CODE'));
      setIsVerifying(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>{t('__PROFILE_PAGE_MFA_SETUP_MODAL_TITLE')}</Modal.Header>
      <Modal.Body>
        <AuthenticatorStep
          onCodeComplete={(code) => {
            setAuthCode(code);
            setError(null);
          }}
          error={error}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button isBasic onClick={onClose} style={{ paddingRight: 20 }}>
          {t('__PROFILE_PAGE_MFA_SETUP_MODAL_CANCEL')}
        </Button>
        <Button
          isPrimary
          isAccent
          disabled={authCode.length < 6 || isVerifying}
          onClick={handleContinue}
        >
          {t('__PROFILE_PAGE_MFA_SETUP_MODAL_CONTINUE')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onClose} />
    </Modal>
  );
};
