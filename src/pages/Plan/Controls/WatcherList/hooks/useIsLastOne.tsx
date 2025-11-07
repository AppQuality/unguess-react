import { useGetPlansByPidWatchersQuery } from 'src/features/api';

const useIsLastOne = ({ planId }: { planId: string }) => {
  const { data } = useGetPlansByPidWatchersQuery({
    pid: planId,
  });

  if (!data || data.items.length === 0) return false;

  return data.items.length === 1;
};

export { useIsLastOne };
