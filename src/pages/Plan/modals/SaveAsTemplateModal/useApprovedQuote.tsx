import { useParams } from 'react-router-dom';
import { usePlan } from '../../../../hooks/usePlan';

const useApprovedQuote = () => {
  const { planId } = useParams();
  const { plan } = usePlan(planId);

  const hasApprovedQuote =
    plan?.status === 'approved' && plan?.quote?.status === 'approved';

  return { hasApprovedQuote, quote: hasApprovedQuote ? plan.quote : undefined };
};

export { useApprovedQuote };
