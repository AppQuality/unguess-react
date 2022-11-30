import { useTranslation } from 'react-i18next';
import FlipCard from '../widgetCards/FlipCard';
import { ChartTotalBugsByDevice } from './ChartTotalBugsByDevice';
import { ListTotalBugsByDevice } from './ListTotalBugsByDevice';

const TotalBugsByOsAndDevices = ({
  contentHeight,
}: {
  contentHeight: string;
}) => {
  const { t } = useTranslation();
  return (
    <FlipCard>
      <FlipCard.Header>
        {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_OS_AND_DEVICE_CARD_TITLE')}
      </FlipCard.Header>
      <FlipCard.Body
        height={contentHeight}
        front={<ChartTotalBugsByDevice />}
        back={<ListTotalBugsByDevice />}
      />
    </FlipCard>
  );
};

export default TotalBugsByOsAndDevices;
