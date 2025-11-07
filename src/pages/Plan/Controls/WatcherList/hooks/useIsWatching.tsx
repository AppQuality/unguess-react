import {
  useGetPlansByPidWatchersQuery,
  useGetUsersMeQuery,
} from 'src/features/api';

const useIsWatching = ({ planId }: { planId: string }) => {
  const { data: currentUser } = useGetUsersMeQuery();

  const { data } = useGetPlansByPidWatchersQuery({
    pid: planId,
  });

  if (!data || data.items.length === 0 || !currentUser) return false;

  if (data.items.some((user) => user.id === currentUser.profile_id)) {
    return true;
  }

  return false;
};

export { useIsWatching };
