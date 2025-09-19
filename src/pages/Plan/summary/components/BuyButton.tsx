import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { isDev } from 'src/common/isDevEnvironment';
import {
  useGetPlansByPidCheckoutItemQuery,
  usePostCheckoutMutation,
} from 'src/features/api';
import { getPlanStatus } from 'src/pages/Dashboard/hooks/getPlanStatus';
import { usePlanContext } from '../../context/planContext';
import { usePlan } from '../../hooks/usePlan';

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
  const { setIsPaymentInProgress } = usePlanContext();

  const { planId } = useParams();
  const { plan } = usePlan(planId);
  const { t } = useTranslation();

  const { data: checkoutItemData } = useGetPlansByPidCheckoutItemQuery(
    { pid: planId ?? '' },
    { skip: !planId }
  );

  const baseUrl = isDev() ? 'https://dev.unguess.io' : 'https://app.unguess.io';

  if (!plan) return null;

  const { status } = getPlanStatus({
    planStatus: plan.status,
    quote: plan.quote,
    t,
  });

  const [postCheckout] = usePostCheckoutMutation();

  return (
    <Button
      type="button"
      size="small"
      isAccent={isAccent}
      isPrimary={isPrimary}
      isStretched={isStretched}
      disabled={status === 'approved'}
      onClick={async () => {
        setIsPaymentInProgress(true);
        try {
          const response = await postCheckout({
            body: {
              meta: JSON.stringify(checkoutItemData?.metadata),
              price_id: checkoutItemData?.price_id ?? '',
              cancel_url: `${baseUrl}/plans/${planId}?payment=failed`,
              success_url: `${baseUrl}/plans/${planId}?payment=success`,
            },
          }).unwrap();
          if (response.url) {
            window.location.href = response.url;
          } else {
            setIsPaymentInProgress(false);
          }
        } catch (error) {
          setIsPaymentInProgress(false);
          console.error(`Error while checkout process: ${error}`);
        }
      }}
    >
      {t('__PLAN_PAGE_BUY_BUTTON_LABEL')}
    </Button>
  );
};

export { BuyButton };
