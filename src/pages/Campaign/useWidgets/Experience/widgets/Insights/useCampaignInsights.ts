import { useGetCampaignsByCidUxQuery } from 'src/features/api';

export const useCampaignInsights = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId,
  });

  if (isLoading || isFetching) {
    return {
      data: {
        findings: [],
      },
      isLoading: true,
      isError: false,
    };
  }

  if (!data || isError) {
    return {
      data: {
        findings: [],
      },
      isLoading: false,
      isError: true,
    };
  }

  return {
    data,
    isLoading: false,
    isError: false,
  };
};
