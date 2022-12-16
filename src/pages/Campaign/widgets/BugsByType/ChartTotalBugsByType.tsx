import {
  BarChart,
  CHARTS_COLOR_PALETTE,
} from '@appquality/unguess-design-system';
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
          CHARTS_COLOR_PALETTE.darkPine,
          CHARTS_COLOR_PALETTE.blueRoyal,
          CHARTS_COLOR_PALETTE.gubbioLight,
          CHARTS_COLOR_PALETTE.mattone,
        ]}
        width="100%"
        height="279px"
        margin={{ top: 20, right: 60, bottom: 60, left: 140 }}
        data={bugsByType}
        axisBottomLabel={`${t('Bugs', {
          count: totalBugs,
        })} (Tot: ${totalBugs})`}
        axisLeftLabel={t('Type')}
        legend={{ marginTop: '20px', columns: 4, width: '100%' }}
      />
    </div>
  );
};

export default ChartBugsByType;
