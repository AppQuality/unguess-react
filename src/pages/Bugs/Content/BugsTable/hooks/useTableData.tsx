import { getIsNaBugExcluded } from 'src/features/bugsPage/bugsPageSlice';
import { getExcludeNotABugInfo } from 'src/common/components/utils/getExcludeNotABugInfo';
import { useTranslation } from 'react-i18next';
import { useCampaignBugs } from './useCampaignBugs';
import { useCampaignBugStates } from './useCampaignBugStates';
import { useCampaignUseCases } from './useCampaignUseCases';
import { sortByUseCase } from '../utils/sortByUseCase';
import { sortByStates } from '../utils/sortByStates';

export const useTableData = (campaignId: number) => {
  const { t } = useTranslation();

  // get  bugs accepted states and usecases
  const { bugs, bugsError, bugsLoading, bugsFetching } =
    useCampaignBugs(campaignId);
  const { bugStates, bugStatesError, bugStatesFetching } =
    useCampaignBugStates(campaignId);
  const { useCases, useCasesError, useCasesLoading } =
    useCampaignUseCases(campaignId);

  const currentIsNaBugExcluded = getIsNaBugExcluded();

  const customStatusNotABugInfo = getExcludeNotABugInfo(t);

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
        bugsByStates: [],
      },
      isLoading: bugsLoading,
      isFetching: bugsFetching,
      isError: bugsError || bugStatesError || useCasesError,
    };
  }

  let bugItems = [...bugs.items];
  if (currentIsNaBugExcluded) {
    bugItems = bugs.items.filter(
      (item) => item.custom_status.id !== customStatusNotABugInfo.customStatusId
    );
  }

  const bugsByStates = sortByStates(bugItems, bugStates);
  const bugsByUseCases = sortByUseCase(bugItems, useCases);

  /* got the data */
  return {
    data: {
      allBugs: bugItems,
      bugsByUseCases,
      bugsByStates,
    },
    isLoading: bugsLoading,
    isFetching: bugsFetching,
    isError: bugsError || bugStatesError || useCasesError,
  };
};
