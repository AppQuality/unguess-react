import {
  Button,
  Modal,
  ModalClose,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useDeleteInsightsByIidMutation } from 'src/features/api';

export const ConfirmDeleteModal = ({
  insightId,
  setIsConfirmationModalOpen,
}: {
  insightId: number;
  setIsConfirmationModalOpen: (isOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [deleteInsight] = useDeleteInsightsByIidMutation();

  const onQuit = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDelete = () => {
    deleteInsight({ iid: insightId.toString() })
      .unwrap()
      .catch((e) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={
                e.message ? e.message : t('_TOAST_GENERIC_ERROR_MESSAGE')
              }
              closeText="X"
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
  };

  return (
    <Modal onClose={onQuit}>
      <Modal.Header isDanger>
        {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_DELETE_MODAL_HEADER_TITLE')}
      </Modal.Header>
      <Modal.Body>
        {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_DELETE_MODAL_BODY_TEXT')}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          isDanger
          isLink
          onClick={handleDelete}
        >
          {t(
            '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_DELETE_MODAL_CONTINUE_BUTTON'
          )}
        </Button>
        <Button isPrimary isAccent onClick={onQuit}>
          {t('__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_DELETE_MODAL_QUIT_BUTTON')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};
