import { useEffect, useState } from 'react';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';

const useListBugsByType = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidBugsQuery({
      cid: campaignId,
    });

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<
    {
      type: string;
      bugs: number;
    }[]
  >([]);

  const { items: results, total: bugsTotal } = data || {};

  useEffect(() => {
    if (results) {
      const bugsByType: {
        [key: string]: number;
      } = {};

      results.forEach((item) => {
        if (!(item.type.name in bugsByType)) {
          bugsByType[item.type.name] = 0;
        }
        bugsByType[item.type.name] += 1;
      });

      const formattedBugs = Object.entries(bugsByType).map(([type, bugs]) => ({
        type,
        bugs,
      }));

      // Order by number of bugs
      formattedBugs.sort((a, b) => {
        if (a.bugs > b.bugs) return -1;
        if (a.bugs < b.bugs) return 1;
        return 0;
      });

      setItems(formattedBugs);
      setTotal(bugsTotal || 0);
    }
  }, [results, bugsTotal]);

  return {
    items,
    total,
    isLoading: isLoading || isFetching,
    isError,
  };
};

export { useListBugsByType };
