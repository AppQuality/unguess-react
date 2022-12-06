import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';
import { getLocalizedBugUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';

const useBugsByDuplicates = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId,
      s: 'bugs-by-duplicates',
    });

  const { data: results, kind } = data || {};

  if (results && kind === 'bugsByDuplicates') {
    return {
      bugs: results.map((bug) => ({
        ...bug,
        url: getLocalizedBugUrl(bug.campaign_id, bug.id, i18n.language),
      })),
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
