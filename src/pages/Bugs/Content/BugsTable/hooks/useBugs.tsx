import { getIsNaBugExcluded } from 'src/features/bugsPage/bugsPageSlice';
import { getExcludeNotABugInfo } from 'src/common/components/utils/getExcludeNotABugInfo';
import { useTranslation } from 'react-i18next';
import { useCampaignBugs } from './useCampaignBugs';

export const useBugs = (campaignId: number) => {
  const { t } = useTranslation();
  const currentIsNaBugExcluded = getIsNaBugExcluded();
  const customStatusNotABugInfo = getExcludeNotABugInfo(t);

  const { bugs, bugsError, bugsLoading, bugsFetching } =
    useCampaignBugs(campaignId);

  if (bugsLoading || !bugs || !bugs.items) {
    return {
      data: {
        allBugs: [],
      },
      isLoading: bugsLoading,
      isFetching: bugsFetching,
      isError: bugsError,
    };
  }

  let bugItems = [...bugs.items];
  if (currentIsNaBugExcluded) {
    bugItems = bugs.items.filter(
      (item) => item.custom_status.id !== customStatusNotABugInfo.customStatusId
    );
  }

  return {
    data: {
      allBugs: bugItems,
    },
    isLoading: bugsLoading,
    isFetching: bugsFetching,
    isError: bugsError,
  };
};
