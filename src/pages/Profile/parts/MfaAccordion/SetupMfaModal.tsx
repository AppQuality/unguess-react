import { useState } from 'react';
import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import {
  updateMFAPreference,
  updateUserAttributes,
  verifyTOTPSetup,
} from 'aws-amplify/auth';
import { AuthenticatorStep } from './steps/AuthenticatorStep';

export const SetupMfaModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [authCode, setAuthCode] = useState('');

  const handleContinue = async () => {
    await verifyTOTPSetup({ code: authCode });
    await updateMFAPreference({
      totp: 'PREFERRED',
    });
    await updateUserAttributes({
      userAttributes: {
        'custom:mfa_activated_at': new Date().toISOString(),
      },
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>{t('__PROFILE_PAGE_MFA_SETUP_MODAL_TITLE')}</Modal.Header>
      <Modal.Body>
        <AuthenticatorStep onCodeComplete={(code) => setAuthCode(code)} />
      </Modal.Body>
      <Modal.Footer>
        <Button isBasic onClick={onClose} style={{ paddingRight: 20 }}>
          {t('__PROFILE_PAGE_MFA_SETUP_MODAL_CANCEL')}
        </Button>
        <Button
          isPrimary
          isAccent
          disabled={authCode.length < 6}
          onClick={handleContinue}
        >
          {t('__PROFILE_PAGE_MFA_SETUP_MODAL_CONTINUE')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onClose} />
    </Modal>
  );
};
