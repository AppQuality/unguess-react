import { SunburstChart } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidWidgetsQuery } from 'src/features/api';
import { SunburstData } from './types';

export const ChartTotalBugsByDevice = () => {
  const { t } = useTranslation();
  const { data } = useGetCampaignsByCidWidgetsQuery({
    cid: 3044,
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
      const desktop: SunburstData = {
        name: 'Desktop',
        children: [],
      };
      const smartphone: SunburstData = {
        name: 'Smartphone',
        children: [],
      };
      const tablet: SunburstData = {
        name: 'Tablet',
        children: [],
      };

      //   [
      //     {
      //         "name": "Desktop",
      //         "children": [
      //             {
      //                 "name": "Windows",
      //                 "value": 2
      //             }
      //         ]
      //     },
      //     {
      //         "name": "Smartphone",
      //         "children": [
      //             {
      //                 "name": "Android",
      //                 "value": 1
      //             }
      //         ]
      //     }
      // ]

      // children: [
      //   {
      //     name: 'Windows',
      //     children: [
      //       { name: 'Notebook1', value: 34 },
      //       { name: 'Gaming PC', value: 9 },
      //     ],
      //   },
      //   {
      //     name: 'MacOS',
      //     children: [{ name: 'Notebook', value: 6 }],
      //   },
      // ],

      //   {
      //     "desktop_type": "Notebook",
      //     "os": "MacOS",
      //     "os_version": "10.14.1",
      //     "type": "desktop",
      //     "bugs": 5,
      //     "unique_bugs": 5
      // }
      data.data.forEach((item) => {
        if (item.type === 'desktop') {
          desktop.children = [
            {
              name: item.os,
              value: item.unique_bugs,
            },
          ];
        }
        if (item.type === 'smartphone') {
          smartphone.children = [
            {
              name: item.os,
              value: item.unique_bugs,
            },
          ];
        }
        if (item.type === 'tablet') {
          tablet.children = [
            {
              name: item.os,
              value: item.unique_bugs,
            },
          ];
        }
      });
      setChartData({ name: 'graph', children: [desktop, smartphone] });
      setTotalBugs(newTotal);
    }
  }, [data]);

  return chartData.children && chartData.children.length > 0 ? (
    <SunburstChart
      data={chartData}
      centerItem={{
        label: t(
          '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_DEVICE_CHART_HEADER',
          'tot bug'
        ),
        value: totalBugs.toString(),
      }}
      width="100%"
      height="250px"
    />
  ) : null;
};
