import { useTranslation } from 'react-i18next';
import { ListTotalBugsByType } from './ListTotalBugsByType';
import { BasicWidget } from '../widgetCards/BasicWidget';
import FlipCard from '../widgetCards/FlipCard';

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
        front={<ListTotalBugsByType campaignId={campaignId} />}
        back={<ListTotalBugsByType campaignId={campaignId} />}
      />
    </FlipCard>
  );
};

export default BugsByType;
