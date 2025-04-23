import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import {
  Modal,
  ModalClose,
  Button,
  FooterItem,
  Message,
  Notification,
  MD,
  Span,
  useToast,
  Dots,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useDeletePlansByPidMutation } from 'src/features/api';

const DeletePlanModal = ({
  planId,
  planTitle,
  onQuit,
}: {
  planId: string;
  planTitle: string;
  onQuit: () => void;
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [deletePlan, { isLoading }] = useDeletePlansByPidMutation();

  const showDeleteErrorToast = (error: Error) => {
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="error"
          message={
            error instanceof Error && error.message
              ? error.message
              : t('__PLAN_PAGE_DELETE_PLAN_MODAL_ERROR')
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
      await deletePlan({ pid: planId }).unwrap();
      navigate(`/`);
    } catch (e) {
      showDeleteErrorToast(e as unknown as Error);
      onQuit();
      return;
    }
    onQuit();
  };

  return (
    <Modal onClose={onQuit} role="dialog" data-qa="delete-plan-modal">
      <Modal.Header>
        <Message validation="error" style={{ fontSize: appTheme.fontSizes.md }}>
          {t('__PLAN_PAGE_DELETE_PLAN_MODAL_TITLE')}
        </Message>
      </Modal.Header>
      <Modal.Body>
        <Trans
          i18nKey="__PLAN_PAGE_DELETE_PLAN_MODAL_BODY"
          components={{ md: <MD />, boldSpan: <Span isBold /> }}
          values={{ planTitle }}
          defaults=""
        />
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button
            isBasic
            isDanger
            onClick={!isLoading ? handleConfirm : undefined}
          >
            {isLoading ? (
              <Dots color={appTheme.palette.red[600]} />
            ) : (
              t('__PLAN_PAGE_DELETE_PLAN_MODAL_BUTTON_CONFIRM')
            )}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isAccent isPrimary disabled={isLoading} onClick={onQuit}>
            {t('__PLAN_PAGE_DELETE_PLAN_MODAL_BUTTON_CANCEL')}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

export { DeletePlanModal };
