import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

const useUniqueBugs = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId,
      s: 'unique-bugs',
    });

  const { data: results, kind } = data || {};

  if (results && kind === 'campaignUniqueBugs') {
    const { total: totalBugs, unique: uniqueBugs, trend: trendBugs } = results;

    return {
      totalBugs,
      uniqueBugs,
      trendBugs,
      uniquePercentage: Math.floor((uniqueBugs / totalBugs) * 100),
      isLoading,
      isFetching,
      isError,
    };
  }

  return {
    totalBugs: 0,
    uniqueBugs: 0,
    trendBugs: 0,
    uniquePercentage: 0,
    isLoading,
    isFetching,
    isError,
  };
};

export { useUniqueBugs };
