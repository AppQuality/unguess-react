import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useModule } from 'src/features/modules/useModule';
import { getPlanStatus } from 'src/pages/Dashboard/hooks/getPlanStatus';
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
  const { plan } = usePlan(planId);

  const { t } = useTranslation();

  if (!plan) return null;

  const { status } = getPlanStatus({
    planStatus: plan.status,
    quote: plan.quote,
    t,
  });

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
      await buyPlanAction();
    }
  };

  return (
    <Button
      type="button"
      size="small"
      isAccent={isAccent}
      isPrimary={isPrimary}
      isStretched={isStretched}
      disabled={status === 'approved'}
      onClick={handleBuyButtonClick}
    >
      {t('__PLAN_PAGE_BUY_BUTTON_LABEL')}
    </Button>
  );
};

export { BuyButton };
