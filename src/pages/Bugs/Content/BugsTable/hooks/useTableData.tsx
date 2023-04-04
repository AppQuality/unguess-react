import { useCampaignBugs } from './useCampaignBugs';
import { useCampaignBugStates } from './useCampaignBugStates';
import { useCampaignUseCases } from './useCampaignUseCases';
import { sortByUseCase } from '../utils/sortByUseCase';
import { sortByStates } from '../utils/sortByStates';

export const useTableData = (campaignId: number) => {
  // get  bugs accepted states and usecases
  const { bugs, bugsError, bugsLoading, bugsFetching } =
    useCampaignBugs(campaignId);
  const { bugStates, bugStatesError, bugStatesFetching } =
    useCampaignBugStates(campaignId);
  const { useCases, useCasesError, useCasesLoading } =
    useCampaignUseCases(campaignId);

  // if there is no data, return empty array
  if (
    bugsLoading ||
    bugStatesFetching ||
    useCasesLoading ||
    !bugs ||
    !bugs.items
  ) {
    return {
      bugStates,
      campaignUsecases: useCases,
      data: {
        allBugs: [],
        bugsByUseCases: [],
        bugsBySeverity: [],
      },
      isLoading: bugsLoading,
      isFetching: bugsFetching,
      isError: bugsError || bugStatesError || useCasesError,
    };
  }

  const bugsByStates = sortByStates(bugs.items, bugStates);
  const bugsByUseCases = sortByUseCase(bugs.items, useCases);

  /* got the data */
  return {
    data: {
      allBugs: bugs.items,
      bugsByUseCases,
      bugsByStates,
    },
    isLoading: bugsLoading,
    isFetching: bugsFetching,
    isError: bugsError || bugStatesError || useCasesError,
  };
};
