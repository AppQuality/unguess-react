import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const CloseDrawerModal = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <Modal>
      <Modal.Header isDanger>
        {t('__BUGS_PAGE_CUSTOM_STATUS_CLOSE_DRAWER_MODAL_HEADER_TITLE')}
      </Modal.Header>
      <Modal.Body>
        {t('__BUGS_PAGE_CUSTOM_STATUS_CLOSE_DRAWER_MODAL_BODY_TEXT')}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          id="custom-status-close-drawer-quit"
          isDanger
          isLink
        >
          {t('__BUGS_PAGE_CUSTOM_STATUS_CLOSE_DRAWER_MODAL_QUIT_BUTTON')}
        </Button>
        <Button id="custom-status-close-drawer-continue" isPrimary isAccent>
          {t('__BUGS_PAGE_CUSTOM_STATUS_CLOSE_DRAWER_MODAL_CONTINUE_BUTTON')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={() => setIsModalOpen(false)} />
    </Modal>
  );
};
