import {
  Button,
  FooterItem,
  Label,
  LG,
  Message,
  Modal,
  ModalClose,
  Notification,
  OrderedList,
  Skeleton,
  SM,
  useToast,
  XL,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';
import { useValidateForm } from 'src/features/planModules';
import { getModuleBySlug } from '../modules/Factory';

const SendRequestModal = ({ onQuit }: { onQuit: () => void }) => {
  const { t } = useTranslation();
  const { isRequestingQuote, handleQuoteRequest } = useRequestQuotation();
  const { addToast } = useToast();
  const Title = getModuleBySlug('title').Component;
  const Dates = getModuleBySlug('dates').Component;

  const { validateForm } = useValidateForm();

  const handleConfirm = async () => {
    try {
      await validateForm();
      await handleQuoteRequest();
    } catch (e) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            role="alert"
            title={t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_ERROR')}
            message={
              e instanceof Error && e.message
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
    onQuit();
  };

  if (isRequestingQuote()) {
    return (
      <Modal
        role="dialog"
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          marginTop: '-100px',
        }}
      >
        <Trans
          i18nKey="__PLAN_PAGE_MODAL_SEND_REQUEST_WAIT"
          components={{
            LG: <LG color="white" />,
            XL: (
              <XL
                color="white"
                isBold
                style={{ marginBottom: appTheme.space.xs }}
              />
            ),
          }}
        />
        <Skeleton
          width="100%"
          height="8px"
          style={{
            marginTop: appTheme.space.lg,
            backgroundColor: appTheme.palette.teal[500],
            borderRadius: appTheme.borderRadii.lg,
          }}
        />
      </Modal>
    );
  }

  return (
    <Modal onClose={onQuit} role="dialog">
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
      <ModalClose />
    </Modal>
  );
};

export { SendRequestModal };
