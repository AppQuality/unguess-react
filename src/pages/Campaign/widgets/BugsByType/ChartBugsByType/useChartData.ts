import { useGetCampaignsByCidBugsQuery } from 'src/features/api';

interface ChartData {
  label: string;
  keys: {
    [key: string]: number;
  };
  total: number;
}

export const useChartData = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidBugsQuery({
      cid: campaignId,
    });
  const totalBugs = data?.total || 0;

  const bugTypes = [
    'Malfunction',
    'Usability',
    'Graphic',
    'Typo',
    'Performance',
    'Crash',
    'Security',
    'Other',
  ];

  const bugsByType: ChartData[] = bugTypes.map((type) => ({
    label: type,
    keys: { low: 0, medium: 0, high: 0, critical: 0 },
    total: 0,
  }));

  data?.items?.forEach((item) => {
    const bugType = bugsByType.find((type) => type.label === item.type.name);
    if (typeof bugType !== 'undefined') {
      bugType.keys[item.severity.name.toLowerCase()] += 1;
      bugType.total += 1;
    }
  });

  bugsByType.sort((a, b) => {
    if (a.total < b.total) return -1;
    if (a.total > b.total) return 1;
    return 0;
  });

  return {
    bugsByType,
    totalBugs,
    isLoading: isLoading || isFetching,
    isError,
  };
};
