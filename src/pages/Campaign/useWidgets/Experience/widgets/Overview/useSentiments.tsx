import { useGetCampaignsByCidUxQuery } from 'src/features/api';

export const useSentiments = ({
  cid,
  isPreview,
}: {
  cid: string;
  isPreview?: boolean;
}) => {
  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid,
    ...(!isPreview && { showAsCustomer: true }),
  });

  if (isLoading || isFetching) {
    return {
      sentiments: [],
      isLoading: true,
      isError: false,
    };
  }

  if (!data || !data?.sentiment || isError) {
    return {
      sentiments: [],
      isLoading: false,
      isError: true,
    };
  }

  const sentiments = data.sentiment?.map((s) => ({
    title: s.cluster.name,
    sentiment: s.value,
    note: s.comment,
  }));

  return {
    sentiments,
    isLoading: false,
    isError: false,
  };
};
