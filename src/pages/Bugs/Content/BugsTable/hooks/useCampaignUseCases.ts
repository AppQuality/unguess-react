import { useGetCampaignsByCidUsecasesQuery } from 'src/features/api';

export const useCampaignUseCases = (campaignId: number) => {
  const { data, error, isLoading, isFetching } =
    useGetCampaignsByCidUsecasesQuery(
      {
        cid: campaignId.toString() ?? '0',
        filterBy: 'bugs',
      },
      { skip: !campaignId }
    );

  return {
    useCases: data || [],
    useCasesError: error,
    useCasesLoading: isLoading,
    useCasesFetching: isFetching,
  };
};
