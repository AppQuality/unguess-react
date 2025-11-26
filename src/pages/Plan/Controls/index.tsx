import { Notification, useToast } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useModule } from 'src/features/modules/useModule';
import useWindowSize from 'src/hooks/useWindowSize';
import { useSubmit } from '../../../features/modules/useModuleConfiguration';
import { usePlan, usePlanIsPurchasable } from '../../../hooks/usePlan';
import { usePlanContext } from '../context/planContext';
import { DateInThePastAlertModal } from '../modals/DateInThePastAlertModal';
import { DeletePlanModal } from '../modals/DeletePlanModal';
import { SendRequestModal } from '../modals/SendRequestModal';
import { CancelPlanButton } from '../summary/components/CancelPlanButton';
import { ConfirmPlanButton } from './ConfirmPlanButton';
import { GoToCampaignButton } from './GoToCampaignButton';
import { IconButtonMenu } from './IconButtonMenu';
import { RequestQuotationButton } from './RequestQuotationButton';
import { SaveConfigurationButton } from './SaveConfigurationButton';
import { WatcherList } from './WatcherList';

export const Controls = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const isMobile = width < breakpointSm;
  const [isRequestQuotationModalOpen, setRequestQuotationModalOpen] =
    useState(false);
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDateInThePastAlertModalOpen,
    setDateInThePastAlertModalOpen,
  } = usePlanContext();
  const { planId } = useParams();
  const { plan, planComposedStatus } = usePlan(planId);
  const isPurchasable = usePlanIsPurchasable(planId);
  const { value: titleValue } = useModule('title'); // to use the current changed title value (also if plan is not saved) in delete modal
  const { addToast } = useToast();
  const { handleSubmit } = useSubmit(planId || '');

  if (!plan || !planId) return null;

  const handleRequestQuotation = async () => {
    try {
      await handleSubmit();
      setRequestQuotationModalOpen(true);
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
    }
  };

  return (
    <div
      style={{ display: 'flex', gap: appTheme.space.xs, alignItems: 'center' }}
    >
      <WatcherList planId={planId} />
      {(planComposedStatus === 'Accepted' ||
        planComposedStatus === 'PurchasedPlan') && <GoToCampaignButton />}
      {(planComposedStatus === 'AwaitingApproval' ||
        planComposedStatus === 'AwaitingPayment' ||
        planComposedStatus === 'OpsCheck' ||
        planComposedStatus === 'Submitted') && <ConfirmPlanButton />}
      {planComposedStatus === 'Paying' && <CancelPlanButton size="small" />}
      {(planComposedStatus === 'PurchasableDraft' ||
        planComposedStatus === 'PrequotedDraft' ||
        planComposedStatus === 'UnquotedDraft') && (
        <>
          <SaveConfigurationButton />
          <RequestQuotationButton onClick={handleRequestQuotation} />
        </>
      )}

      {planComposedStatus !== 'AwaitingPayment' &&
        planComposedStatus !== 'Paying' &&
        planComposedStatus !== 'PurchasedPlan' &&
        !isMobile && <IconButtonMenu />}
      {isDeleteModalOpen && planId && (
        <DeletePlanModal
          planId={planId}
          planTitle={titleValue?.output ?? ''}
          onQuit={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isDateInThePastAlertModalOpen && (
        <DateInThePastAlertModal
          onQuit={() => setDateInThePastAlertModalOpen(false)}
        />
      )}

      {isRequestQuotationModalOpen && (
        <SendRequestModal
          isPurchasable={isPurchasable}
          onQuit={() => setRequestQuotationModalOpen(false)}
        />
      )}
    </div>
  );
};
