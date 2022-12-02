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
  const { data } = useGetCampaignsByCidWidgetsQuery({
    cid: campaignId,
    s: 'bugs-by-device',
  });
  const [chartData, setChartData] = useState<SunburstData>({
    name: 'graph',
    children: [],
  });
  const [totalBugs, setTotalBugs] = useState(0);

  useEffect(() => {
    if (data && 'kind' in data && data.kind === 'bugsByDevice') {
      const newTotal = data.data.reduce(
        (acc, current) => acc + current.bugs,
        0
      );

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

          thirdLevel = Object.keys(thirdLevel).map((item) => {
            const total = thirdLevel[item].reduce(
              (acc: number, thirdLevelItem: { unique_bugs: number }) =>
                acc + thirdLevelItem.unique_bugs,
              0
            );
            return {
              name: item,
              label:
                thirdLevel[item][0].desktop_type ||
                `${thirdLevel[item][0].manufacturer} ${thirdLevel[item][0].model}`,
              isLast: true,
              value: total,
            };
          });

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
      setTotalBugs(newTotal);
    }
  }, [data]);

  return { chartData, totalBugs };
};

export { useBugsByDevices };
