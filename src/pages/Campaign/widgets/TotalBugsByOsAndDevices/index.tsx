import { useTranslation } from 'react-i18next';
import useWindowSize from 'src/hooks/useWindowSize';
import FlipCard from '../widgetCards/FlipCard';
import { ChartTotalBugsByDevice } from './ChartTotalBugsByDevice';
import { ListTotalBugsByDevice } from './ListTotalBugsByDevice';

const TotalBugsByOsAndDevices = ({
  height,
  campaignId,
}: {
  height: string;
  campaignId: number;
}) => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();

  return (
    <FlipCard height={height}>
      <FlipCard.Header hasBack={!isMobile}>
        {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_OS_AND_DEVICE_CARD_TITLE')}
      </FlipCard.Header>
      <FlipCard.Body
        front={
          isMobile ? (
            <ListTotalBugsByDevice campaignId={campaignId} />
          ) : (
            <ChartTotalBugsByDevice campaignId={campaignId} />
          )
        }
        back={
          isMobile ? undefined : (
            <ListTotalBugsByDevice campaignId={campaignId} />
          )
        }
      />
    </FlipCard>
  );
};

export default TotalBugsByOsAndDevices;
