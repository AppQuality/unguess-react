import { useGetCampaignsByCidBugTypesQuery } from 'src/features/api';

export const useCampaingBugTypes = (campaignId: string) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidBugTypesQuery({
      cid: campaignId?.toString() ?? '0',
    });

  return {
    bugTypes: data || [],
    isBugTypesLoading: isLoading || isFetching,
    isBugTypeError: isError,
  };
};
