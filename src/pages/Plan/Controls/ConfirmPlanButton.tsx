import { Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { usePatchPlansByPidStatusMutation } from 'src/features/api';
import { getPlanStatus } from 'src/pages/Dashboard/hooks/getPlanStatus';
import { usePlan } from '../hooks/usePlan';

const ConfirmPlanButton = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patchStatus] = usePatchPlansByPidStatusMutation();

  const { planId } = useParams();
  const { plan } = usePlan(planId);
  const { t } = useTranslation();

  if (!plan) return null;
  const { status } = getPlanStatus(plan, t);

  return (
    <Button
      type="button"
      size="small"
      isAccent
      isPrimary
      disabled={status === 'submitted' || isSubmitted}
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
