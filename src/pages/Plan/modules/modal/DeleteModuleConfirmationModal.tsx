import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';

const DeleteModuleConfirmationModal = ({
  onConfirm,
  onQuit,
}: {
  onConfirm: () => void;
  onQuit: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onQuit}>
      <Modal.Header isDanger>
        {t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_TITLE')}
      </Modal.Header>
      <Modal.Body>
        {t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_DESCRIPTION')}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          isDanger
          isLink
          onClick={onConfirm}
        >
          {t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_CONFIRM')}
        </Button>
        <Button isPrimary isAccent onClick={onQuit}>
          {t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_CANCEL')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { DeleteModuleConfirmationModal };
