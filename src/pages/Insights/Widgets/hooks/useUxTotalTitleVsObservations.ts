import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

export const useUxTotalTitleVsObservations = (campaignId: string) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId,
      s: 'ux-total-title-vs-observation',
    });

  const { data: results, kind } = data || {};
  if (results && kind === 'uxTotalTitleVsObservations') {
    const { countTitleTag, countObservation, countObservationNoTitle } =
      results;

    return {
      countTitleTag,
      countObservation,
      countObservationNoTitle,
      isLoading,
      isFetching,
      isError,
    };
  }
  return {
    countTitleTag: 0,
    countObservation: 0,
    countObservationNoTitle: 0,
    isLoading,
    isFetching,
    isError,
  };
};
