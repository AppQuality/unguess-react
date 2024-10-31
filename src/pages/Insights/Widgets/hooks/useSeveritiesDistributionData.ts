import { useGetCampaignsByCidObservationsQuery } from 'src/features/api';

export const useSeveritiesDistributionData = (campaignId: string) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidObservationsQuery({
      cid: campaignId,
    });

  const countByType = {
    positive: 0,
    minor: 0,
    major: 0,
    observation: 0,
  };

  if (data && data.kind === 'ungrouped') {
    countByType.minor = data.results.filter((o) => {
      const severity = o.tags.find((t) => t.group.name === 'severity');
      return severity && severity.tag.name === 'Minor issue';
    }).length;
    countByType.major = data.results.filter((o) => {
      const severity = o.tags.find((t) => t.group.name === 'severity');
      return severity && severity.tag.name === 'Major issue';
    }).length;
    countByType.positive = data.results.filter((o) => {
      const severity = o.tags.find((t) => t.group.name === 'severity');
      return severity && severity.tag.name === 'Positive Finding';
    }).length;
    countByType.observation = data.results.filter((o) => {
      const severity = o.tags.find((t) => t.group.name === 'severity');
      return severity && severity.tag.name === 'Observation';
    }).length;
  }

  const total = Object.values(countByType).reduce((a, v) => a + v, 0);
  return {
    countObservations: total,
    countByType,
    byType: countByType,
    isLoading,
    isFetching,
    isError,
  };
};
