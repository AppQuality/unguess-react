import { useGetCampaignsByCidUxQuery } from 'src/features/api';

export const useSentiments = ({
  cid,
  isPreview,
  order,
}: {
  cid: string;
  isPreview?: boolean;
  order?: string;
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
    id: s.cluster.id,
    title: s.cluster.name,
    sentiment: s.value,
    note: s.comment,
  }));

  if (order) {
    sentiments.sort((a, b) => {
      if (a.sentiment < b.sentiment) return order === 'DESC' ? 1 : -1;
      if (a.sentiment > b.sentiment) return order === 'DESC' ? -1 : 1;
      return 0;
    });
  }

  return {
    sentiments,
    isLoading: false,
    isError: false,
  };
};
