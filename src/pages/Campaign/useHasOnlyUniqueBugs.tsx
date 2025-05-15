import { useGetCampaignsByCidBugsQuery } from 'src/features/api';

export const useHasOnlyUniqueBugs = (campaignId: number) => {
  const { data: dataFilter } = useGetCampaignsByCidBugsQuery({
    cid: campaignId.toString(),
    filterBy: { is_duplicated: 0 },
  });

  const { data: dataNoFilter } = useGetCampaignsByCidBugsQuery({
    cid: campaignId.toString(),
  });

  if (!dataFilter || !dataNoFilter) {
    return false;
  }

  const filterCount = dataFilter.items?.length;
  const noFilterCount = dataNoFilter.items?.length;

  return filterCount === noFilterCount;
};
