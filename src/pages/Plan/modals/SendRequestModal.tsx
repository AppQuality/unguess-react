import {
  Button,
  Hint,
  Modal,
  ModalClose,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';
import { Dates } from '../modules/Dates';
import { Title } from '../modules/Title';

const SendRequestModal = ({ onQuit }: { onQuit: () => void }) => {
  const { t } = useTranslation();
  const { isRequestQuoteCTADisabled, handleQuoteRequest, error } =
    useRequestQuotation();
  const { addToast } = useToast();

  const handleConfirm = async () => {
    handleQuoteRequest()
      .then(() => {
        // Show success toast
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_SUCCESS')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      })
      .catch(() => {
        // Show error toast
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="success"
              message={t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_ERROR')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        onQuit();
      });
  };

  if (isRequestQuoteCTADisabled()) return null;

  return (
    <Modal onClose={onQuit} data-qa="request-quotation-modal">
      <Modal.Header>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_TITLE')}</Modal.Header>
      <Modal.Body style={{ overflow: 'visible' }}>
        {t('__PLAN_PAGE_MODAL_SEND_REQUEST_DESCRIPTION')}
        <div style={{ padding: `${appTheme.space.md} 0` }}>
          <Title />
          <Hint style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_MODAL_SEND_REQUEST_TITLE_HINT')}
          </Hint>
        </div>
        <div style={{ padding: `${appTheme.space.md} 0` }}>
          <Dates />
          <Hint style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_MODAL_SEND_REQUEST_DATES_HINT')}
          </Hint>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button isLink onClick={onQuit}>
          {t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CANCEL')}
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          isAccent
          isPrimary
          onClick={handleConfirm}
          data-qa="request-quotation-modal-cta"
        >
          {t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CONFIRM')}
        </Button>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { SendRequestModal };
