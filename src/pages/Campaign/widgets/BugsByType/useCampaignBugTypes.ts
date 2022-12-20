import { useGetCampaignsByCidBugTypesQuery } from 'src/features/api';

export const useCampaingBugTypes = (campaignId: string) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidBugTypesQuery({
      cid: campaignId,
    });

  return {
    bugTypes: data || [],
    isBugTypesLoading: isLoading || isFetching,
    isBugTypeError: isError,
  };
};
