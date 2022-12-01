import { useGetCampaignsByCidBugsQuery } from 'src/features/api';

const EmptyState = () => <>wow such empty</>;
const UnreadBugs = () => {
  const {
    data: unreadBugs,
    isLoading: unreadBugsIsLoading,
    isFetching: unreadBugsIsFetching,
  } = useGetCampaignsByCidBugsQuery({
    cid: 4852,
    filterBy: {
      unread: true,
    },
  });
  const {
    data: totalBugs,
    isLoading: totalBugsIsLoading,
    isFetching: totalBugsIsFetching,
  } = useGetCampaignsByCidBugsQuery({
    cid: 4852,
  });

  if (
    unreadBugsIsLoading ||
    totalBugsIsLoading ||
    totalBugsIsFetching ||
    unreadBugsIsFetching
  )
    return <>Loading...</>;

  if (!unreadBugs || !unreadBugs.items || unreadBugs.items.length === 0)
    return <EmptyState />;

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
      usecase: useCases[Number(key)],
      unreadCount,
      totalCount,
      bugs: items.unreadBugs,
    };
  });

  return (
    <div style={{ height: '100%', overflowY: 'scroll' }}>
      {JSON.stringify(enhancedUsecase)}
    </div>
  );
};

export { UnreadBugs };
