import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import { getSelectedUxFiltersIds } from 'src/features/uxFilters';

export const useCampaignInsights = ({
  campaignId,
  isPreview,
}: {
  campaignId: string;
  isPreview?: boolean;
}) => {
  const filterBy = getSelectedUxFiltersIds();

  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId,
    ...(!isPreview && { showAsCustomer: true }),
    filterBy: {
      ...(filterBy?.clusters ? { clusters: filterBy.clusters.join(',') } : {}),
      ...(filterBy?.severities
        ? { severities: filterBy.severities.join(',') }
        : {}),
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
