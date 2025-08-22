import {
  useGetPlansByPidCheckoutItemQuery,
  useGetPlansByPidQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

const usePlan = (planId?: string) => {
  const { activeWorkspace } = useActiveWorkspace();
  const {
    isLoading,
    isFetching,
    data: plan,
  } = useGetPlansByPidQuery(
    {
      pid: planId ?? '',
    },
    {
      skip: !activeWorkspace || !planId,
    }
  );

  const {
    data: ci,
    isLoading: isCiLoading,
    isFetching: isCiFetching,
  } = useGetPlansByPidCheckoutItemQuery(
    {
      pid: planId ?? '',
    },
    {
      skip: !activeWorkspace || !planId,
    }
  );

  if (!plan) {
    return {
      isLoading: isLoading || isCiLoading,
      isFetching: isFetching || isCiFetching,
      activeWorkspace,
      plan: undefined,
      checkoutItem: ci,
    };
  }

  return {
    isLoading: isLoading || isCiLoading,
    isFetching: isFetching || isCiFetching,
    activeWorkspace,
    plan: { ...plan, isPurchasable: !!ci },
    checkoutItem: ci,
  };
};

export { usePlan };
