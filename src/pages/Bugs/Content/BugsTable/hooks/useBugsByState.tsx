import { useCampaignBugStates } from './useCampaignBugStates';
import { sortByStates } from '../utils/sortByStates';
import { useBugs } from './useBugs';

export const useBugsByState = (campaignId: number) => {
  const {
    data,
    isError: bugsError,
    isLoading: bugsLoading,
    isFetching: bugsFetching,
  } = useBugs(campaignId);
  const { allBugs: bugs } = data;
  const { bugStates, bugStatesError, bugStatesLoading, bugStatesFetching } =
    useCampaignBugStates(campaignId);

  if (bugsLoading || bugStatesLoading || !bugs) {
    return {
      data: {
        bugsByStates: [],
      },
      isLoading: bugsLoading || bugStatesLoading,
      isFetching: bugsFetching || bugStatesFetching,
      isError: bugsError || bugStatesError,
    };
  }

  const bugsByStates = sortByStates(bugs, bugStates);

  return {
    data: {
      bugsByStates,
    },
    isLoading: bugsLoading || bugStatesLoading,
    isFetching: bugsFetching || bugStatesFetching,
    isError: bugsError || bugStatesError,
  };
};
