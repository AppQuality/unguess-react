import { useEffect, useState } from 'react';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';

const useListBugsByDevice = (campaignId: number) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId,
      s: 'bugs-by-device',
    });

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<
    {
      device: string;
      bugs: number;
    }[]
  >([]);

  const { data: results, kind } = data || {};

  useEffect(() => {
    if (results && kind === 'bugsByDevice') {
      const bugsByDevice: {
        [key: string]: number;
      } = {};

      // Desktops
      results
        .filter(
          (item): item is typeof item & { type: 'desktop' } =>
            item.type === 'desktop'
        )
        .forEach((item) => {
          if (!(item.desktop_type in bugsByDevice)) {
            bugsByDevice[item.desktop_type] = 0;
          }
          bugsByDevice[item.desktop_type] += item.bugs;
        });

      // Non desktops
      results
        .filter(
          (item): item is typeof item & { type: 'smartphone' | 'tablet' } =>
            item.type === 'smartphone' || item.type === 'tablet'
        )
        .forEach((item) => {
          if (!(`${item.manufacturer} ${item.model}` in bugsByDevice)) {
            bugsByDevice[`${item.manufacturer} ${item.model}`] = 0;
          }
          bugsByDevice[`${item.manufacturer} ${item.model}`] += item.bugs;
        });

      // Transform the object into an array [ device: string; bugs: number; ]
      const formattedBugs = Object.entries(bugsByDevice).map(
        ([device, bugs]) => ({
          device,
          bugs,
        })
      );

      // Order by number of bugs
      formattedBugs.sort((a, b) => {
        if (a.bugs > b.bugs) return -1;
        if (a.bugs < b.bugs) return 1;
        return 0;
      });

      setItems(formattedBugs);
      setTotal(results.reduce((acc, current) => acc + current.bugs, 0));
    }
  }, [results]);

  return {
    items,
    total,
    isLoading: isLoading || isFetching,
    isError,
  };
};

export { useListBugsByDevice };
