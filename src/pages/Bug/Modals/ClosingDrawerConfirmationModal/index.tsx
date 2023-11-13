import { Button, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { setCustomStatusDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';

export const CloseDrawerModal = ({
  setIsConfirmationModalOpen,
}: {
  setIsConfirmationModalOpen: (isOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onQuit = () => {
    dispatch(setCustomStatusDrawerOpen(false));
  };

  const onContinue = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <Modal onClose={onContinue}>
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
          onClick={onQuit}
        >
          {t('__BUGS_PAGE_CUSTOM_STATUS_CLOSE_DRAWER_MODAL_QUIT_BUTTON')}
        </Button>
        <Button
          id="custom-status-close-drawer-continue"
          isPrimary
          isAccent
          onClick={onContinue}
        >
          {t('__BUGS_PAGE_CUSTOM_STATUS_CLOSE_DRAWER_MODAL_CONTINUE_BUTTON')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onContinue} />
    </Modal>
  );
};
