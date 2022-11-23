import { useGetCampaignsByCidBugsQuery } from 'src/features/api';

const useUniqueBugs = (campaignId: number) => {
  const { data: uniqueBugs, isLoading: isLoadingUniqueBugs } =
    useGetCampaignsByCidBugsQuery({
      cid: campaignId,
      filterBy: { is_duplicated: 0 },
    });
  const { data: bugs, isLoading: isLoadingBugs } =
    useGetCampaignsByCidBugsQuery({ cid: campaignId });
  return {
    bugs: bugs?.total || 0,
    uniqueBugs: uniqueBugs?.total || 0,
    isLoading: isLoadingBugs || isLoadingUniqueBugs,
    uniquePercent: bugs?.total ? (uniqueBugs?.total || 0) / bugs.total : 0,
  };
};

export { useUniqueBugs };
