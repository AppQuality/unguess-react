import { useParams } from 'react-router-dom';
import { usePlan } from '../../../../hooks/usePlan';

const useApprovedQuote = () => {
  const { planId } = useParams();
  const { plan, planComposedStatus } = usePlan(planId);

  const hasApprovedQuote =
    planComposedStatus &&
    ['Accepted', 'PurchasedPlan'].includes(planComposedStatus);

  return { hasApprovedQuote, quote: plan?.quote };
};

export { useApprovedQuote };
