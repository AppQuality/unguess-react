import { Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import { usePlan } from '../hooks/usePlan';
import { BuyButton } from '../summary/components/BuyButton';

const ConfirmPlanButton = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patchStatus] = usePatchPlansByPidStatusMutation();

  const { planId } = useParams();
  const { plan, planComposedStatus } = usePlan(planId);
  const { t } = useTranslation();

  if (!plan) return null;

  if (plan.isPurchasable) {
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
      }}
    >
      {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA')}
    </Button>
  );
};

export { ConfirmPlanButton };
