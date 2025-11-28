import {
  useGetCampaignsByCidWatchersQuery,
  useGetUsersMeQuery,
} from 'src/features/api';

const useIsWatching = ({ campaignId }: { campaignId: string }) => {
  const { data: currentUser } = useGetUsersMeQuery();

  const { data } = useGetCampaignsByCidWatchersQuery({
    cid: campaignId,
  });

  if (!data || data.items.length === 0 || !currentUser) return false;

  if (data.items.some((user) => user.id === currentUser.profile_id)) {
    return true;
  }

  return false;
};

export { useIsWatching };
