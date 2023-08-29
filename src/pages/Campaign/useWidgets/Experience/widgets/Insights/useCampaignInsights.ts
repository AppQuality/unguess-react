import { useGetCampaignsByCidUxQuery } from 'src/features/api';

export const useCampaignInsights = ({
  campaignId,
  isPreview,
}: {
  campaignId: string;
  isPreview?: boolean;
}) => {
  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId,
    ...(!isPreview && { showAsCustomer: true }),
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
