import {
  Button,
  FooterItem,
  Modal,
  ModalClose,
} from '@appquality/unguess-design-system';
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
        <FooterItem>
          <Button isDanger isBasic onClick={onConfirm}>
            {t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_CONFIRM')}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isPrimary isAccent onClick={onQuit}>
            {t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_CANCEL')}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { DeleteModuleConfirmationModal };
