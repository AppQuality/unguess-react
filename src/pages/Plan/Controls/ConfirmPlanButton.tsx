import { Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import { useAnalytics } from 'use-analytics';
import { usePlan, usePlanIsPurchasable } from '../../../hooks/usePlan';
import { BuyButton } from '../summary/components/BuyButton';

const ConfirmPlanButton = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patchStatus] = usePatchPlansByPidStatusMutation();

  const { planId } = useParams();
  const { plan, planComposedStatus } = usePlan(planId);
  const { t } = useTranslation();
  const isPurchasable = usePlanIsPurchasable(planId);
  const { track } = useAnalytics();

  if (!plan) return null;

  if (isPurchasable) {
    return <BuyButton />;
  }

  return (
    <Button
      type="button"
      size="small"
      isAccent
      isPrimary
      disabled={
        planComposedStatus === 'Submitted' ||
        planComposedStatus === 'OpsCheck' ||
        planComposedStatus === 'Paying' ||
        isSubmitted
      }
      onClick={() => {
        setIsSubmitted(true);
        patchStatus({
          pid: planId?.toString() ?? '',
          body: { status: 'approved' },
        })
          .unwrap()
          .then(() => {
            setIsSubmitted(false);
          });
        track('planActivityConfirmed', {
          planId: planId?.toString(),
          templateId: plan?.from_template?.id.toString(),
          templateName: plan?.from_template?.title,
          previousStatus: 'AwaitingApproval', // should be AwaitingApproval
          newStatus: 'Accepted',
          confirmedPrice: plan.price,
        });
      }}
    >
      {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA')}
    </Button>
  );
};

export { ConfirmPlanButton };
