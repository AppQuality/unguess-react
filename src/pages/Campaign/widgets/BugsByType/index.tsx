import { useTranslation } from 'react-i18next';
import { ListTotalBugsByType } from './ListTotalBugsByType';
import FlipCard from '../widgetCards/FlipCard';
import ChartBugsByType from './ChartBugsByType';

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
