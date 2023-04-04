import { useGetCampaignsByCidCustomStatusesQuery } from 'src/features/api';

export const useCampaignBugStates = (campaignId: number) => {
  const { data, error, isFetching } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId.toString() ?? '0',
  });

  return {
    bugStates: data || [],
    bugStatesError: error,
    bugStatesFetching: isFetching,
  };
};
