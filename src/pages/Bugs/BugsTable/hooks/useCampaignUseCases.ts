import { useGetCampaignsByCidUsecasesQuery } from 'src/features/api';

export const useCampaignUseCases = (campaignId: number) => {
  const { data, error, isLoading, isFetching } =
    useGetCampaignsByCidUsecasesQuery({
      cid: campaignId.toString() ?? '0',
    });

  return {
    useCases: data || [],
    useCasesError: error,
    useCasesLoading: isLoading || isFetching,
  };
};
