import { useGetCampaignsByCidSeveritiesQuery } from 'src/features/api';

export const useCampaignSeverities = (campaignId: number) => {
  const { data, error, isLoading, isFetching } =
    useGetCampaignsByCidSeveritiesQuery({
      cid: campaignId.toString() ?? '0',
    });

  return {
    severities: data || [],
    severitiesError: error,
    severitiesLoading: isLoading || isFetching,
  };
};
