import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useToolsContext } from '../context/ToolsContext';

export const ModalAutotag = () => {
  const { setActiveItem } = useToolsContext();
  const { t } = useTranslation();

  const onClose = () => {
    setActiveItem('menu');
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>{t('__TOOLS_MODAL_AUTOTAG_HEADER')}</Modal.Header>
      <Modal.Body>{t('__TOOLS_MODAL_AUTOTAG_BODY')}</Modal.Body>
      <Modal.Footer>
        <Button isLink onClick={onClose}>
          {t('__TOOLS_MODAL_AUTOTAG_CLOSE_BUTTON')}
        </Button>
        <Button isPrimary isAccent onClick={() => {}}>
          {t('__TOOLS_MODAL_AUTOTAG_SEND_BUTTON')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onClose} />
    </Modal>
  );
};
