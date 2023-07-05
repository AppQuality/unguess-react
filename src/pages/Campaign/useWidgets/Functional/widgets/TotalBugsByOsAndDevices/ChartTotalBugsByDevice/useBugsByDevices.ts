/* eslint-disable security/detect-object-injection */
import { useEffect, useState } from 'react';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';
import { SunburstData } from './types';

const groupArrayOfObjects = (
  array: any[],
  keys: string | string[],
  prefix?: string
) => {
  const key = typeof keys === 'string' ? [keys] : keys;
  return array.reduce((r, a) => {
    if (key.every((k) => a[k])) {
      r[`${prefix || ''}${key.map((k) => a[k])}`] =
        r[`${prefix || ''}${key.map((k) => a[k])}`] || [];
      r[`${prefix || ''}${key.map((k) => a[k])}`].push(a);
      return r;
    }
    return null;
  }, Object.create(null));
};

const useBugsByDevices = (campaignId: number) => {
  const { data, isLoading, isError, isFetching } =
    useGetCampaignsByCidWidgetsQuery({
      cid: campaignId.toString(),
      s: 'bugs-by-device',
    });
  const [chartData, setChartData] = useState<SunburstData>({
    name: 'graph',
    children: [],
  });

  useEffect(() => {
    if (data && 'kind' in data && data.kind === 'bugsByDevice') {
      let firstLevel = groupArrayOfObjects(data.data, 'type');

      firstLevel = Object.keys(firstLevel).map((type) => {
        let secondLevel = groupArrayOfObjects(firstLevel[type], 'os', type);

        secondLevel = Object.keys(secondLevel).map((os) => {
          let thirdLevel = {
            ...groupArrayOfObjects(secondLevel[os], 'desktop_type', os),
            ...groupArrayOfObjects(
              secondLevel[os],
              ['manufacturer', 'model'],
              os
            ),
          };

          thirdLevel = Object.keys(thirdLevel).map((item) => ({
            name: item,
            label:
              thirdLevel[item][0].desktop_type ||
              `${thirdLevel[item][0].manufacturer} ${thirdLevel[item][0].model}`,
            isLast: true,
            value: thirdLevel[item].reduce(
              (acc: number, thirdLevelItem: { bugs: number }) =>
                acc + thirdLevelItem.bugs,
              0
            ),
          }));

          return {
            name: os,
            label: secondLevel[os][0].os,
            children: thirdLevel,
          };
        });

        let typeLabel = 'Unknown';
        if (type === 'desktop') {
          typeLabel = 'PC';
        } else if (type === 'smartphone') {
          typeLabel = 'Smartphone';
        } else if (type === 'tablet') {
          typeLabel = 'Tablet';
        }

        return { name: type, label: typeLabel, children: secondLevel };
      });

      setChartData({ name: 'graph', children: firstLevel });
    }
  }, [data]);

  // If there is only one type of device, remove the first level
  if (
    chartData.children &&
    chartData.children.length === 1 &&
    chartData.children[0].children
  ) {
    chartData.children = chartData.children[0].children;
    // If there is only one OS, remove the second level
    if (
      chartData.children &&
      chartData.children.length === 1 &&
      chartData.children[0].children
    ) {
      chartData.children = chartData.children[0].children;
    }
  }

  return { chartData, isLoading: isLoading || isFetching || isError };
};

export { useBugsByDevices };
