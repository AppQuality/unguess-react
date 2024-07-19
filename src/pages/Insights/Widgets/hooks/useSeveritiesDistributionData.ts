import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

const useSeveritiesDistributionData = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId.toString(),
      s: 'ux-severities-distribution',
    });
  const { data: results, kind } = data || {};
  if (results && kind === 'uxSeveritiesDistribution') {
    if (results.severitiesDistribution) {
      const {
        countPositiveFindings,
        countMinorIssue,
        countMajorIssue,
        countObservations,
      } = results.severitiesDistribution;
      return {
        countPositiveFindings,
        countMinorIssue,
        countMajorIssue,
        countObservations,
        isLoading,
        isFetching,
        isError,
      };
    }
  }
  return {
    countPositiveFindings: 0,
    countMinorIssue: 0,
    countMajorIssue: 0,
    countObservations: 0,
    isLoading,
    isFetching,
    isError,
  };
};
