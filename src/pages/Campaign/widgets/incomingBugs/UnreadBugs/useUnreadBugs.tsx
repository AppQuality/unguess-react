import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import i18n from 'src/i18n';
import { getLocalizedFunctionalDashboardUrl } from 'src/hooks/useLocalizeDashboardUrl';

const countBugsByUsecaseId = (
  bugs: { application_section: { id?: number } }[],
  usecaseId: number
) =>
  bugs.reduce((count, bug) => {
    if (bug.application_section.id === usecaseId) {
      return count + 1;
    }
    return count;
  }, 0);

const getUsecases = (
  bugs: { application_section: { id?: number; title?: string } }[]
) => {
  const useCases: { [key: number]: string } = {};
  bugs.forEach((bug) => {
    if (
      bug.application_section.id &&
      bug.application_section.title &&
      !useCases[bug.application_section.id]
    ) {
      useCases[bug.application_section.id] = bug.application_section.title;
    }
  });

  return useCases;
};

const useUnreadBugs = (
  campaignId: number
):
  | { isError: true; isLoading: false; data: [] }
  | { isLoading: true; isError: false; data: [] }
  | {
      isLoading: false;
      isError: false;
      data: {
        title: string;
        unreadCount: number;
        totalCount: number;
        bugs: {
          severity: Severities;
          internal_id: string;
          title: string;
          titleContext?: string[];
          type: string;
          url: string;
        }[];
      }[];
    } => {
  const {
    data: unreadBugs,
    isLoading: unreadBugsIsLoading,
    isFetching: unreadBugsIsFetching,
  } = useGetCampaignsByCidBugsQuery({
    cid: campaignId,
    filterBy: {
      unread: true,
    },
  });
  const {
    data: totalBugs,
    isLoading: totalBugsIsLoading,
    isFetching: totalBugsIsFetching,
  } = useGetCampaignsByCidBugsQuery({
    cid: campaignId,
  });

  if (
    unreadBugsIsLoading ||
    totalBugsIsLoading ||
    totalBugsIsFetching ||
    unreadBugsIsFetching
  )
    return {
      isLoading: true,
      isError: false,
      data: [],
    };

  if (!unreadBugs || !unreadBugs.items || unreadBugs.items.length === 0)
    return {
      isError: true,
      isLoading: false,
      data: [],
    };

  const items = {
    unreadBugs: unreadBugs.items,
    totalBugs: totalBugs && totalBugs.items ? totalBugs.items : [],
  };

  const useCases = getUsecases(unreadBugs.items);

  return {
    isLoading: false,
    isError: false,
    data: Object.keys(useCases).map((useCaseId) => ({
      title: useCases[Number(useCaseId)],
      unreadCount: countBugsByUsecaseId(items.unreadBugs, Number(useCaseId)),
      totalCount: countBugsByUsecaseId(items.totalBugs, Number(useCaseId)),
      bugs: items.unreadBugs.map((bug) => ({
        severity: bug.severity.name.toLowerCase() as Severities,
        title: bug.title.compact,
        titleContext: bug.title.context,
        url: `${getLocalizedFunctionalDashboardUrl(
          campaignId,
          i18n.language
        )}&bug_id=${bug.id}`,
        type: bug.type.name,
        internal_id: bug.internal_id,
      })),
    })),
  };
};

export { useUnreadBugs };
