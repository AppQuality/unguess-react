import { BarChart } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { WidgetLoader } from '../widgetLoader';
import { useBugsByType } from './useBugsByType';

const ChartBugsByType = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { bugsByType, isLoading, totalBugs } = useBugsByType(campaignId);

  if (isLoading) return <WidgetLoader size="md" align="center" />;

  return (
    <div className="chart-bugs-by-type" style={{ width: '100%' }}>
      <BarChart
        colors={[
          appTheme.colors.bySeverity.low,
          appTheme.colors.bySeverity.medium,
          appTheme.colors.bySeverity.high,
          appTheme.colors.bySeverity.critical,
        ]}
        width="100%"
        height="279px"
        margin={{ top: 20, right: 60, bottom: 60, left: 140 }}
        data={bugsByType}
        axisBottomLabel={`${t(
          '__PAGE_CAMPAIGN_WIDGET_BUGS_BY_TYPE_AXIS_BOTTOM_LABEL',
          {
            count: totalBugs,
          }
        )} (Tot: ${totalBugs})`}
        axisLeftLabel={t('__PAGE_CAMPAIGN_WIDGET_BUGS_BY_TYPE_AXIS_LEFT_LABEL')}
        legend={{ marginTop: '20px', columns: 4, width: '100%' }}
      />
    </div>
  );
};

export default ChartBugsByType;
