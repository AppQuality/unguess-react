import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

const SendRequestModal = ({
  onConfirm,
  onQuit,
}: {
  onConfirm: () => Promise<void>;
  onQuit: () => void;
}) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    onConfirm()
      .then(() => {
        // Show success toast
      })
      .catch(() => {
        // Show error toast
      })
      .finally(() => {
        onQuit();
      });
  };

  return (
    <Modal onClose={onQuit}>
      <Modal.Header>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_TITLE')}</Modal.Header>
      <Modal.Body>
        {t('__PLAN_PAGE_MODAL_SEND_REQUEST_DESCRIPTION')}
        module title module dates
      </Modal.Body>
      <Modal.Footer>
        <Button isLink onClick={onQuit}>
          {t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CANCEL')}
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          isAccent
          isPrimary
          onClick={handleConfirm}
        >
          {t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CONFIRM')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { SendRequestModal };
