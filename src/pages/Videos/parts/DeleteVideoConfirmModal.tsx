import {
  Button,
  FooterItem,
  Modal,
  ModalClose,
  Paragraph,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { styled } from 'styled-components';

const DangerHeader = styled(Modal.Header)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${({ theme }) => theme.space.xs};
  padding-left: ${({ theme }) => theme.space.xs};
  gap: ${({ theme }) => theme.space.xs};
  ${(props) => retrieveComponentStyles('text.danger', props)};
`;

export const DeleteVideoConfirmModal = ({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <DangerHeader>
        <AlertIcon />
        {t('__VIDEOS_LIST_DELETE_MODAL_HEADER')}
      </DangerHeader>
      <Modal.Body>
        <Paragraph>{t('__VIDEOS_LIST_DELETE_MODAL_MESSAGE')}</Paragraph>
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isDanger isBasic disabled={isDeleting} onClick={onConfirm}>
            {t('__VIDEOS_LIST_DELETE_MODAL_CONFIRM_BUTTON')}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isPrimary isAccent disabled={isDeleting} onClick={onClose}>
            {t('__VIDEOS_LIST_DELETE_MODAL_CANCEL_BUTTON')}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose aria-label={t('__VIDEOS_LIST_DELETE_MODAL_CLOSE_BUTTON')} />
    </Modal>
  );
};
