import { useGetCampaignsByCidBugsQuery } from 'src/features/api';

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
          id: number;
          severity: Severities;
          internal_id: string;
          title: {
            compact: string;
            context?: string[];
          };
          type: { name: string };
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

  const useCases: { [key: number]: string } = {};

  const items = {
    unreadBugs: unreadBugs.items,
    totalBugs: totalBugs && totalBugs.items ? totalBugs.items : [],
  };
  unreadBugs.items.forEach((bug) => {
    if (
      bug.application_section.id &&
      bug.application_section.title &&
      !useCases[bug.application_section.id]
    ) {
      useCases[bug.application_section.id] = bug.application_section.title;
    }
  });

  const enhancedUsecase = Object.keys(useCases).map((key) => {
    let unreadCount = 0;
    items.unreadBugs.forEach((bug) => {
      if (bug.application_section.id === Number(key)) {
        unreadCount += 1;
      }
    });
    let totalCount = 0;
    items.totalBugs.forEach((bug) => {
      if (bug.application_section.id === Number(key)) {
        totalCount += 1;
      }
    });
    return {
      title: useCases[Number(key)],
      unreadCount,
      totalCount,
      bugs: items.unreadBugs.map((bug) => ({
        ...bug,
        severity: bug.severity.name.toLowerCase() as Severities,
      })),
    };
  });

  return {
    isLoading: false,
    isError: false,
    data: enhancedUsecase,
  };
};

export { useUnreadBugs };
