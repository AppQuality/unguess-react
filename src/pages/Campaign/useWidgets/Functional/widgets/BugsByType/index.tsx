import { useTranslation } from 'react-i18next';
import FlipCard from 'src/pages/Campaign/widgetCards/FlipCard';
import { ListTotalBugsByType } from './ListTotalBugByType';
import ChartBugsByType from './ChartTotalBugsByType';

const BugsByType = ({
  campaignId,
  height,
}: {
  campaignId: number;
  height?: string;
}) => {
  const { t } = useTranslation();

  return (
    <FlipCard className="bugs-by-type-widget" height={height}>
      <FlipCard.Header>
        {t('__CAMPAIGN_WIDGET_BUGS_BY_TYPE_HEADER')}
      </FlipCard.Header>
      <FlipCard.Body
        front={<ChartBugsByType campaignId={campaignId} />}
        back={<ListTotalBugsByType campaignId={campaignId} />}
      />
    </FlipCard>
  );
};

export default BugsByType;
