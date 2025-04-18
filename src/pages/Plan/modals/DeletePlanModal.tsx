import {
  Button,
  FooterItem,
  MD,
  Message,
  Modal,
  ModalClose,
  Notification,
  Span,
  useToast,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Dots } from '@zendeskgarden/react-loaders';
import { useDeletePlansByPidMutation } from 'src/features/api';

const DeletePlanModal = ({
  onQuit,
  planId,
  planTitle,
}: {
  planId: string;
  planTitle: string;
  onQuit: () => void;
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [deletePlan, { isLoading }] = useDeletePlansByPidMutation();

  const deletePlanId = async (plan: string) => {
    if (!plan) return;
    await deletePlan({ pid: plan })
      .unwrap()
      .then(() => {
        navigate(`/`);
      });
  };

  const handleConfirm = async () => {
    try {
      await deletePlanId(planId);
    } catch (e) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={
              e instanceof Error && e.message
                ? e.message
                : t('__PLAN_PAGE_DELETE_PLAN_MODAL_ERROR')
            }
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );

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
      <Modal.Body style={{ overflow: 'visible' }}>
        <Trans
          i18nKey="__PLAN_PAGE_DELETE_PLAN_MODAL_BODY"
          components={{
            md: <MD />,
            boldSpan: <Span isBold />,
          }}
          values={{
            planTitle,
          }}
          defaults=""
        />
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button
            isBasic
            isDanger
            disabled={isLoading}
            onClick={handleConfirm}
            data-qa="delete-plan-modal-cta"
          >
            {!isLoading ? (
              t('__PLAN_PAGE_DELETE_PLAN_MODAL_BUTTON_CONFIRM')
            ) : (
              <Dots color={appTheme.palette.red[600]} />
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
