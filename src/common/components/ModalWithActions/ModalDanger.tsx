import {
  Modal,
  FooterItem,
  Button,
  ModalClose,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { useTranslation } from 'react-i18next';
import { WaterButton } from '../waterButton';

const DangerHeader = styled(Modal.Header)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: ${({ theme }) => theme.space.md};
  gap: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.dangerHue};
`;

const ModalDanger = ({
  handleCancel,
  onClose,
}: {
  handleCancel: () => void;
  onClose?: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <Modal onClose={handleCancel}>
      <DangerHeader>
        <AlertIcon />
        {t('__EXPRESS_WIZARD_CONFIRM_CLOSE_HEADER')}
      </DangerHeader>
      <Modal.Body>{t('__EXPRESS_WIZARD_CONFIRM_CLOSE_MESSAGE')}</Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isDanger isBasic onClick={onClose}>
            {t('__EXPRESS_WIZARD_CONFIRM_CLOSE_CANCEL_BUTTON_TEXT')}
          </Button>
        </FooterItem>
        <FooterItem>
          <WaterButton isPrimary isPill onClick={handleCancel}>
            {t('__EXPRESS_WIZARD_CONFIRM_CLOSE_CONTINUE_BUTTON_TEXT')}
          </WaterButton>
        </FooterItem>
      </Modal.Footer>
      <ModalClose aria-label="Close modal" />
    </Modal>
  );
};

export default ModalDanger;
