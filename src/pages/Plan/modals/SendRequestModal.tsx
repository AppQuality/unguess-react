import {
  Button,
  FooterItem,
  Label,
  Message,
  Modal,
  ModalClose,
  Notification,
  OrderedList,
  SM,
  useToast,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';
import { useValidationContext } from 'src/features/modules/FormProvider';
import { Dates } from '../modules/Dates';
import { Title } from '../modules/Title';

const SendRequestModal = ({ onQuit }: { onQuit: () => void }) => {
  const { t } = useTranslation();
  const { isRequestQuoteCTADisabled, handleQuoteRequest, error } =
    useRequestQuotation();
  const { addToast } = useToast();

  const { validateForm } = useValidationContext();

  const handleConfirm = async () => {
    try {
      await validateForm();
    } catch (e) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={
              e instanceof Error
                ? e.message
                : t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_ERROR')
            }
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
      return;
    }
    handleQuoteRequest()
      .then(() => {
        onQuit();
      })
      .catch((e) => {
        let message = t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_ERROR');
        if ('message' in e && e.message) {
          message = e.message;
        }
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={message}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  if (isRequestQuoteCTADisabled()) return null;

  return (
    <Modal onClose={onQuit} data-qa="request-quotation-modal">
      <Modal.Header>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_TITLE')}</Modal.Header>
      <Modal.Body style={{ overflow: 'visible' }}>
        <XL isBold>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_TITLE')}</XL>
        <SM style={{ margin: `${appTheme.space.sm} 0` }}>
          {t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_DESCRIPTION')}
        </SM>
        <OrderedList style={{ fontSize: appTheme.fontSizes.sm }}>
          <li>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_DESCRIPTION_1')}</li>
          <li>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_DESCRIPTION_2')}</li>
          <li>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_DESCRIPTION_3')}</li>
        </OrderedList>
        <div style={{ padding: `${appTheme.space.md} 0` }}>
          <Label>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_TITLE_LABEL')}</Label>
          <Title />
          <Message style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_MODAL_SEND_REQUEST_TITLE_HINT')}
          </Message>
        </div>
        <div style={{ padding: `${appTheme.space.md} 0` }}>
          <Label style={{ marginBottom: appTheme.space.xxs }}>
            {t('__PLAN_PAGE_MODAL_SEND_REQUEST_DATES_LABEL')}
          </Label>
          <SM style={{ marginBottom: appTheme.space.sm }}>
            {t('__PLAN_PAGE_MODAL_SEND_REQUEST_DATES_DESCRIPTION')}
          </SM>
          <Dates />
          <Message style={{ marginTop: appTheme.space.sm }}>
            {t('__PLAN_PAGE_MODAL_SEND_REQUEST_DATES_HINT')}
          </Message>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isBasic onClick={onQuit}>
            {t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CANCEL')}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button
            isAccent
            isPrimary
            onClick={handleConfirm}
            data-qa="request-quotation-modal-cta"
          >
            {t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CONFIRM')}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { SendRequestModal };
