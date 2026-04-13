import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAnalytics } from 'use-analytics';
import { useModule } from 'src/features/modules/useModule';
import { usePlan } from '../../../../hooks/usePlan';
import { usePlanContext } from '../../context/planContext';

interface BuyButtonProps {
  isStretched?: boolean;
  isAccent?: boolean;
  isPrimary?: boolean;
}

const BuyButton = ({
  isStretched,
  isAccent = true,
  isPrimary = true,
}: BuyButtonProps) => {
  const { setDateInThePastAlertModalOpen, buyPlanAction } = usePlanContext();
  const { value } = useModule('dates');
  const { planId } = useParams();
  const { plan, planComposedStatus, template } = usePlan(planId);
  const { track } = useAnalytics();
  const { t } = useTranslation();

  if (!plan) return null;

  const checkIfDateIsValid = (dateString?: string) => {
    if (!dateString) {
      setDateInThePastAlertModalOpen(true);
      return false;
    }
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      setDateInThePastAlertModalOpen(true);
      return false;
    }
    const today = new Date();
    if (date < today) {
      setDateInThePastAlertModalOpen(true);
      return false;
    }
    // continue
    return true;
  };

  const handleBuyButtonClick = async () => {
    if (checkIfDateIsValid(value?.output.start) && buyPlanAction) {
      track('planPaymentInProgress', {
        planId: planId?.toString(),
        templateId: plan?.from_template?.id.toString(),
        templateName:
          template?.name ?? plan?.from_template?.title ?? 'Unknown Template',
        previousStatus: 'AwaitingPayment',
        planStatus: 'Paying',
        standardPrice: template?.price ?? 'Unknown Price',
        isTailored: !!template?.workspace_id,
        confirmedPrice: plan.price,
      });
      await buyPlanAction();
      console.log('Buy action completed');
    }
  };

  return (
    <Button
      type="button"
      size="small"
      isAccent={isAccent}
      isPrimary={isPrimary}
      isStretched={isStretched}
      disabled={
        planComposedStatus &&
        ['Accepted', 'PurchasedPlan'].includes(planComposedStatus)
      }
      onClick={handleBuyButtonClick}
    >
      {t('__PLAN_PAGE_BUY_BUTTON_LABEL')}
    </Button>
  );
};

export { BuyButton };
