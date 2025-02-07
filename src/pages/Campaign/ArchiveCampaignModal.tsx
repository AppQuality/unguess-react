import {
  Button,
  MD,
  Modal,
  ModalClose,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import {
  CampaignWithOutput,
  usePatchCampaignsByCidMutation,
} from 'src/features/api';

const ArchiveCampaignModal = ({
  campaign,
  onClose,
}: {
  campaign: CampaignWithOutput;
  onClose: () => void;
}) => {
  const { id: cpId } = campaign;
  const { t } = useTranslation();
  const [patchCampaign] = usePatchCampaignsByCidMutation();
  const { addToast } = useToast();

  return (
    <Modal onClose={onClose}>
      <Modal.Header isDanger>
        {t('__CAMPAIGN_PAGE_ARCHIVE_CAMPAIGN_MODAL_TITLE')}
      </Modal.Header>
      <Modal.Body>
        <MD style={{ marginBottom: appTheme.space.md }}>
          {t('__CAMPAIGN_PAGE_ARCHIVE_CAMPAIGN_MODAL_DESCRIPTION_1')}
        </MD>
        <MD style={{ marginBottom: appTheme.space.md }}>
          {t('__CAMPAIGN_PAGE_ARCHIVE_CAMPAIGN_MODAL_DESCRIPTION_2')}
        </MD>
      </Modal.Body>
      <Modal.Footer>
        <Button isBasic isDanger onClick={onClose}>
          {t('__CAMPAIGN_PAGE_ARCHIVE_CAMPAIGN_MODAL_BUTTON_CANCEL')}
        </Button>
        <Button
          isPrimary
          isAccent
          onClick={async () => {
            await patchCampaign({
              cid: cpId?.toString() ?? '0',
              body: {
                project_id: -1,
              },
            })
              .unwrap()
              .then(() => {
                onClose();
              })
              .catch(() => {
                addToast(
                  ({ close }) => (
                    <Notification
                      onClose={close}
                      type="error"
                      message={t(
                        '__CAMPAIGN_PAGE_ARCHIVE_CAMPAIGN_TOAST_ERROR'
                      )}
                      closeText={t('__TOAST_CLOSE_TEXT')}
                      isPrimary
                    />
                  ),
                  { placement: 'top' }
                );
              });
          }}
        >
          {t('__CAMPAIGN_PAGE_ARCHIVE_CAMPAIGN_MODAL_BUTTON_CONFIRM')}
        </Button>
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

export { ArchiveCampaignModal };
