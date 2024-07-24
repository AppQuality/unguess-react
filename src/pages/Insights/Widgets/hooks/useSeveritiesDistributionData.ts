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
        countObservations: countObservationsSeverity,
      } = results.severitiesDistribution;

      return {
        countObservation: results.countObservation,
        countPositiveFindings,
        countMinorIssue,
        countMajorIssue,
        countObservationsSeverity,
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
    countObservationsSeverity: 0,
    isLoading,
    isFetching,
    isError,
  };
};
