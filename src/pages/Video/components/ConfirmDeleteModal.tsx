import {
  Button,
  Modal,
  ModalClose,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDeleteVideoByVidObservationsAndOidMutation } from 'src/features/api';

export const ConfirmDeleteModal = ({
  observationId,
  setIsConfirmationModalOpen,
}: {
  observationId: number;
  setIsConfirmationModalOpen: (isOpen: boolean) => void;
}) => {
  const { videoId } = useParams();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [deleteObservation] = useDeleteVideoByVidObservationsAndOidMutation();

  const onQuit = () => {
    setIsConfirmationModalOpen(false);
  };

  const onContinue = async () => {
    deleteObservation({ vid: videoId || '', oid: observationId.toString() })
      .unwrap()
      .then(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t(
                '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_DELETE_TOAST_SUCCESS'
              )}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        setIsConfirmationModalOpen(false);
      })
      .catch(() => {});
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
          onClick={onContinue}
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
