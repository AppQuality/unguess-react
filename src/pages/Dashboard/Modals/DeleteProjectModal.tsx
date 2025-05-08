import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import {
  Modal,
  ModalClose,
  Button,
  FooterItem,
  Notification,
  MD,
  Span,
  useToast,
  Dots,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';

const DeleteProjectModal = ({
  projectId,
  onQuit,
}: {
  projectId: string;
  onQuit: () => void;
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const showDeleteErrorToast = (error: Error) => {
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="error"
          message={
            error instanceof Error && error.message
              ? error.message
              : t('__PROJECT_PAGE_DELETE_PROJECT_MODAL_ERROR')
          }
          closeText={t('__TOAST_CLOSE_TEXT')}
          isPrimary
        />
      ),
      { placement: 'top' }
    );
  };

  const handleConfirm = async () => {
    try {
      await deleteProject({ pid: projectId });
      navigate(`/`);
    } catch (e) {
      showDeleteErrorToast(e as unknown as Error);
    }
    onQuit();
  };

  return (
    <Modal onClose={onQuit} role="dialog" data-qa="delete-project-modal">
      <Modal.Header isDanger>
        {t('__PROJECT_PAGE_DELETE_PROJECT_MODAL_TITLE')}
      </Modal.Header>
      <Modal.Body>
        <Trans
          i18nKey="__PROJECT_PAGE_DELETE_PROJECT_MODAL_BODY"
          components={{ md: <MD />, boldSpan: <Span isBold /> }}
        />
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isBasic isDanger disabled={isLoading} onClick={handleConfirm}>
            {isLoading ? (
              <Dots color={appTheme.palette.red[600]} />
            ) : (
              t('__PROJECT_PAGE_DELETE_PROJECT_MODAL_BUTTON_CONFIRM')
            )}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isAccent isPrimary disabled={isLoading} onClick={onQuit}>
            {t('__PROJECT_PAGE_DELETE_PROJECT_MODAL_BUTTON_CANCEL')}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

export { DeleteProjectModal };
