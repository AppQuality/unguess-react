import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import { data } from './fakeData';

export const useCampaignInsights = ({
  campaignId,
  isPreview,
}: {
  campaignId: string;
  isPreview?: boolean;
}) => {
  // const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
  //   cid: campaignId,
  //   ...(!isPreview && { showAsCustomer: true }),
  // });

  const isLoading = false;
  const isError = false;
  const isFetching = false;

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
