import { useCampaignUseCases } from './useCampaignUseCases';
import { sortByUseCase } from '../utils/sortByUseCase';
import { useBugs } from './useBugs';

export const useBugsByUseCase = (campaignId: number) => {
  const {
    data,
    isError: bugsError,
    isLoading: bugsLoading,
    isFetching: bugsFetching,
  } = useBugs(campaignId);
  const { allBugs: bugs } = data;
  const { useCases, useCasesError, useCasesLoading, useCasesFetching } =
    useCampaignUseCases(campaignId);

  if (bugsLoading || useCasesLoading || !bugs) {
    return {
      data: {
        bugsByUseCases: [],
      },
      isLoading: bugsLoading || useCasesLoading,
      isFetching: bugsFetching || useCasesFetching,
      isError: bugsError || useCasesError,
    };
  }

  const bugsByUseCases = sortByUseCase(bugs, useCases);

  return {
    data: {
      bugsByUseCases,
    },
    isLoading: bugsLoading || useCasesLoading,
    isFetching: bugsFetching || useCasesFetching,
    isError: bugsError || useCasesError,
  };
};
