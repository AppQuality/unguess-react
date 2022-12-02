import { SunburstChart } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useBugsByDevices } from './useBugsByDevices';
import { getChildrenValue } from './getChildrenValue';

export const ChartTotalBugsByDevice = () => {
  const { t } = useTranslation();
  const { chartData } = useBugsByDevices(3044);
  const [totalBugs, setTotalBugs] = useState(0);

  useEffect(() => {
    setTotalBugs(getChildrenValue(chartData));
  }, [chartData]);

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
      tooltip={({ label, value, data }) => (
        <div style={{ padding: '12px', background: 'white' }}>
          {data?.isLast ? (
            <div>Bug Unici: {value}</div>
          ) : (
            <>
              <div>👉 Drill down to:</div>
              <div>{label}</div>
              <div>Bug Unici: {value}</div>
            </>
          )}
        </div>
      )}
      onChange={(data) => setTotalBugs(getChildrenValue(data))}
      width="100%"
      height="250px"
      legend={{
        columns: chartData.children.length,
      }}
    />
  ) : null;
};
