import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';

interface ChartData {
  label: string;
  keys: {
    [key: string]: number;
  };
  total: number;
}

export const useBugsByType = (campaignId: number) => {
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
    keys: { Low: 0, Medium: 0, High: 0, Critical: 0 },
    total: 0,
  }));

  data?.items?.forEach((item) => {
    let bugType = bugsByType.find((type) => type.label === item.type.name);
    // fallback to Other for unknown bug types
    bugType = bugType || bugsByType.find((type) => type.label === 'Other');
    if (typeof bugType !== 'undefined') {
      bugType.keys[capitalizeFirstLetter(item.severity.name)] += 1;
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
