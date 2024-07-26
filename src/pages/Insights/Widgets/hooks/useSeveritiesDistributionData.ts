import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

export const useSeveritiesDistributionData = (campaignId: string) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId,
      s: 'ux-severities-distribution',
    });
  const { data: results, kind } = data || {};
  if (results && kind === 'uxSeveritiesDistribution') {
    if (results.severitiesDistribution) {
      const {
        countPositiveFindings,
        countMinorIssue,
        countMajorIssue,
        countObservationSeverity,
      } = results.severitiesDistribution;

      return {
        countObservations: results.countObservations,
        countPositiveFindings,
        countMinorIssue,
        countMajorIssue,
        countObservationSeverity,
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
    countObservationSeverity: 0,
    isLoading,
    isFetching,
    isError,
  };
};
