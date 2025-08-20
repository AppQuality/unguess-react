import { Button } from '@appquality/unguess-design-system';
import { th } from 'date-fns/locale';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  useGetPlansByPidCheckoutItemQuery,
  usePatchPlansByPidStatusMutation,
  usePostCheckoutMutation,
} from 'src/features/api';
import { getPlanStatus } from 'src/pages/Dashboard/hooks/getPlanStatus';
import { usePlan } from '../hooks/usePlan';

const BuyPlanButton = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patchStatus] = usePatchPlansByPidStatusMutation();

  const { planId } = useParams();
  const { plan } = usePlan(planId);
  const { t } = useTranslation();

  const { data: checkoutItemData } = useGetPlansByPidCheckoutItemQuery(
    { pid: planId ?? '' },
    { skip: !planId }
  );

  if (!plan) return null;

  const { status } = getPlanStatus(plan, t);

  const [postCheckout] = usePostCheckoutMutation();

  return (
    <Button
      type="button"
      size="small"
      isAccent
      isPrimary
      disabled={status === 'approved'}
      onClick={async () => {
        setIsSubmitted(true);
        patchStatus({
          pid: planId?.toString() ?? '',
          body: { status: 'pending_review' },
        })
          .unwrap()
          .then(() => {
            setIsSubmitted(false);
          });
        await postCheckout({
          body: {
            meta: JSON.stringify(checkoutItemData?.metadata),
            price_id: checkoutItemData?.price_id ?? '',
          },
        })
          .unwrap()
          .then((response) => {
            window.open(response.url || '', '_blank');
          });
      }}
    >
      BUY NOW
    </Button>
  );
};

export { BuyPlanButton };
