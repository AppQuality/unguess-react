import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

export const useUxTotalTitleVsRecurrentTitles = (campaignId: string) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId,
      s: 'ux-total-titles-vs-recurrent-titles',
    });

  const { data: results, kind } = data || {};
  if (results && kind === 'uxTotalTitlesVsRecurrentTitles') {
    const { countTitleTag, countRecurrentTitles, countObservationNoTitle } =
      results;

    return {
      countTitleTag,
      countRecurrentTitles,
      countObservationNoTitle,
      isLoading,
      isFetching,
      isError,
    };
  }
  return {
    countTitleTag: 0,
    countRecurrentTitles: 0,
    countObservationNoTitle: 0,
    isLoading,
    isFetching,
    isError,
  };
};
