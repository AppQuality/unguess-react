import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

const useUxTaggingVideoCompletionData = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId.toString(),
      s: 'ux-tagging-video-completion',
    });
  const { data: results, kind } = data || {};
  if (results && kind === 'uxTaggingVideoCompletion') {
    const { countMediaWithObservation, countMedia } = results;

    return {
      countMediaWithObservation,
      countMedia,
      isLoading,
      isFetching,
      isError,
    };
  }
  return {
    countMediaWithObservation: 0,
    countMedia: 0,
    isLoading,
    isFetching,
    isError,
  };
};
