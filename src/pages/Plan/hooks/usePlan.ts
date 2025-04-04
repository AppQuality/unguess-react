import { useGetPlansByPidQuery } from 'src/features/api';
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

  return {
    isLoading,
    isFetching,
    activeWorkspace,
    plan,
  };
};

export { usePlan };
