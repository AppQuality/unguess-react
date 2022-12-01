import {
  useGetCampaignsByCidWidgetsQuery,
  WidgetBugsByDuplicates,
} from 'src/features/api';

const useBugsByDuplicates = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId,
      s: 'bugs-by-duplicates',
    });

  const { data: results, kind } = data || {};

  if (results && kind === 'bugsByDuplicates') {
    return {
      bugs: results as WidgetBugsByDuplicates['data'],
      isLoading,
      isFetching,
      isError,
    };
  }

  return {
    bugs: [],
    isLoading,
    isFetching,
    isError,
  };
};

export { useBugsByDuplicates };
