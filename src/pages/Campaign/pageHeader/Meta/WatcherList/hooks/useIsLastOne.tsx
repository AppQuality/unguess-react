import { useGetCampaignsByCidWatchersQuery } from 'src/features/api';

const useIsLastOne = ({ campaignId }: { campaignId: string }) => {
  const { data } = useGetCampaignsByCidWatchersQuery({
    cid: campaignId,
  });

  if (!data || data.items.length === 0) return false;

  return data.items.length === 1;
};

export { useIsLastOne };
