import { useState } from 'react';
import {
  Button,
  CodeVerifier,
  FooterItem,
  MD,
  Modal,
  ModalClose,
  Message,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { verifyTOTPSetup } from 'aws-amplify/auth';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import styled from 'styled-components';

const DangerHeader = styled(Modal.Header)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${({ theme }) => theme.space.xs};
  padding-left: ${({ theme }) => theme.space.xs};
  gap: ${({ theme }) => theme.space.xs};
  ${(props) => retrieveComponentStyles('text.danger', props)};
`;

interface TurnOffMfaModalProps {
  onClose: () => void;
  onRemove: () => Promise<void>;
}

export const TurnOffMfaModal = ({
  onClose,
  onRemove,
}: TurnOffMfaModalProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'verify' | 'confirm'>('verify');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (code.length < 6) return;
    setIsVerifying(true);
    setError(null);
    try {
      await verifyTOTPSetup({ code });
      setStep('confirm');
    } catch {
      setError(t('__PROFILE_PAGE_MFA_TURN_OFF_VERIFY_ERROR'));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleTurnOff = async () => {
    await onRemove();
    onClose();
  };

  if (step === 'confirm') {
    return (
      <Modal onClose={onClose}>
        <DangerHeader>
          <AlertIcon />
          {t('__PROFILE_PAGE_MFA_TURN_OFF_CONFIRM_TITLE')}
        </DangerHeader>
        <Modal.Body>
          <MD isBold style={{ marginBottom: appTheme.space.xs }}>
            {t('__PROFILE_PAGE_MFA_TURN_OFF_CONFIRM_QUESTION')}
          </MD>
          <MD>
            <Trans
              i18nKey="__PROFILE_PAGE_MFA_TURN_OFF_CONFIRM_DESCRIPTION"
              components={{ bold: <strong /> }}
            />
          </MD>
        </Modal.Body>
        <Modal.Footer>
          <FooterItem>
            <Button isBasic onClick={onClose}>
              {t('__PROFILE_PAGE_MFA_TURN_OFF_CONFIRM_KEEP')}
            </Button>
          </FooterItem>
          <FooterItem>
            <Button isPrimary isDanger onClick={handleTurnOff}>
              {t('__PROFILE_PAGE_MFA_TURN_OFF_CONFIRM_TURN_OFF')}
            </Button>
          </FooterItem>
        </Modal.Footer>
        <ModalClose />
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        {t('__PROFILE_PAGE_MFA_TURN_OFF_VERIFY_TITLE')}
      </Modal.Header>
      <Modal.Body>
        <MD
          style={{
            textAlign: 'center',
            color: appTheme.palette.grey[800],
            marginBottom: appTheme.space.md,
          }}
        >
          {t('__PROFILE_PAGE_MFA_TURN_OFF_VERIFY_DESCRIPTION')}
        </MD>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CodeVerifier
            length={6}
            onComplete={(completedCode) => {
              setCode(completedCode);
              setError(null);
            }}
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button isBasic onClick={onClose}>
          {t('__PROFILE_PAGE_MFA_TURN_OFF_VERIFY_CANCEL')}
        </Button>
        <Button
          isPrimary
          isAccent
          disabled={code.length < 6 || isVerifying}
          onClick={handleVerify}
        >
          {t('__PROFILE_PAGE_MFA_TURN_OFF_VERIFY_CONTINUE')}
        </Button>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};
