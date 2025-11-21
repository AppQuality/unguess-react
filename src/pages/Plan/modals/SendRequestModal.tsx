import {
  Button,
  FooterItem,
  Label,
  LG,
  MD,
  Message,
  Modal,
  ModalClose,
  Notification,
  Skeleton,
  SM,
  Span,
  useToast,
  XL,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import {
  useGetPlansByPidRulesEvaluationQuery,
  usePutPlansByPidWatchersMutation,
} from 'src/features/api';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';
import { useValidateForm } from 'src/features/planModules';
import { getModuleBySlug } from '../modules/Factory';
import { PurchasablePlanRulesGuide } from './PurchasablePlanRules';
import { Watchers } from './Watchers';

const SendRequestModal = ({
  onQuit,
  isPurchasable,
}: {
  onQuit: () => void;
  isPurchasable: boolean;
}) => {
  const { planId } = useParams();
  const { t } = useTranslation();
  const [updateWatchers] = usePutPlansByPidWatchersMutation();
  const { isRequestingQuote, handleQuoteRequest } = useRequestQuotation();
  const { data, isLoading } = useGetPlansByPidRulesEvaluationQuery({
    pid: planId || '',
  });
  const [watchers, setWatchers] = useState<number[]>([]);

  const isFailed = isPurchasable && data && data.failed.length > 0;
  const { addToast } = useToast();
  const Title = getModuleBySlug('title').Component;
  const Dates = getModuleBySlug('dates').Component;

  const { validateForm } = useValidateForm();

  if (!planId) return null;

  const handleConfirm = async () => {
    try {
      await updateWatchers({
        pid: planId,
        body: { users: watchers.map((id) => ({ id })) },
      }).unwrap();
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

  if (true) {
    return (
      <Modal
        role="dialog"
        style={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          padding: '100px 20px',
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
        {isLoading ? (
          <Skeleton width="100%" height="100px" />
        ) : (
          <>
            <XL isBold>
              {isFailed
                ? t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_TITLE_FAILED_RULES')
                : t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_TITLE')}
            </XL>
            <SM style={{ margin: `${appTheme.space.sm} 0` }}>
              {isFailed
                ? t(
                    '__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_DESCRIPTION_FAILED_RULES'
                  )
                : t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_DESCRIPTION')}
            </SM>
            {isFailed && (
              <>
                <PurchasablePlanRulesGuide failedRules={data?.failed} />
                <MD isBold style={{ marginBottom: appTheme.space.xs }}>
                  {t('__PLAN_PAGE_MODAL_SEND_REQUEST_BODY_DESCRIPTION_CONFIRM')}
                </MD>
              </>
            )}
            <div style={{ padding: `${appTheme.space.md} 0` }}>
              <Label>{t('__PLAN_PAGE_MODAL_SEND_REQUEST_TITLE_LABEL')}</Label>
              <Span style={{ color: appTheme.palette.red[500] }}>*</Span>

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
            <div style={{ padding: `${appTheme.space.md} 0` }}>
              <Label style={{ marginBottom: appTheme.space.xxs }}>
                {t('__PLAN_PAGE_MODAL_SEND_REQUEST_WATCHERS_LABEL')}
                <Span style={{ color: appTheme.palette.red[500] }}>*</Span>
              </Label>
              <SM style={{ marginBottom: appTheme.space.sm }}>
                {t('__PLAN_PAGE_MODAL_SEND_REQUEST_WATCHERS_DESCRIPTION')}
              </SM>
              <Watchers onChange={setWatchers} planId={planId} />
              <Message style={{ marginTop: appTheme.space.sm }}>
                {t('__PLAN_PAGE_MODAL_SEND_REQUEST_WATCHERS_HINT')}
              </Message>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isLoading ? (
          <Skeleton width="100%" height="40px" />
        ) : (
          <>
            <FooterItem>
              <Button isBasic onClick={onQuit}>
                {isFailed
                  ? t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CANCEL_FAILED')
                  : t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CANCEL')}
              </Button>
            </FooterItem>
            <FooterItem>
              <Button
                disabled={watchers.length === 0}
                isAccent
                isPrimary
                onClick={handleConfirm}
                data-qa="request-quotation-modal-cta"
              >
                {isFailed
                  ? t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CONFIRM_FAILED')
                  : t('__PLAN_PAGE_MODAL_SEND_REQUEST_BUTTON_CONFIRM')}
              </Button>
            </FooterItem>
          </>
        )}
      </Modal.Footer>
      <ModalClose />
    </Modal>
  );
};

export { SendRequestModal };
