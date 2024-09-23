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
  title,
  setIsConfirmationModalOpen,
}: {
  insightId: number;
  title: string;
  setIsConfirmationModalOpen: (isOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [deleteInsight] = useDeleteInsightsByIidMutation();

  const onQuit = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDelete = () => {
    let notificationProps = {};
    deleteInsight({ iid: insightId.toString() })
      .unwrap()
      .then(() => {
        notificationProps = {
          type: 'success',
          message: `${`${t('_TOAST_DELETED_MESSAGE_SUBJECT')} "${title}" ${t(
            '_TOAST_DELETED_MESSAGE'
          )}`}`,
        };
      })
      .catch((e) => {
        notificationProps = {
          type: 'error',
          message: e.message ? e.message : t('_TOAST_GENERIC_ERROR_MESSAGE'),
        };
      })
      .finally(() => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              closeText="X"
              isPrimary
              {...notificationProps}
            />
          ),
          { placement: 'top' }
        );
      });
  };

  return (
    <Modal onClose={onQuit}>
      <Modal.Header isDanger>
        {t('__INSIGHTS_PAGE_DELETE_MODAL_HEADER_TITLE')}
      </Modal.Header>
      <Modal.Body>{t('__INSIGHTS_PAGE_DELETE_MODAL_BODY_TEXT')}</Modal.Body>
      <Modal.Footer>
        <Button
          style={{ paddingRight: 20 }}
          isDanger
          isLink
          onClick={handleDelete}
        >
          {t('__INSIGHTS_PAGE_DELETE_MODAL_CONTINUE_BUTTON')}
        </Button>
        <Button isPrimary isAccent onClick={onQuit}>
          {t('__INSIGHTS_PAGE_DELETE_MODAL_QUIT_BUTTON')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};
