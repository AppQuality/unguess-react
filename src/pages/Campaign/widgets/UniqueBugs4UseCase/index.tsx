import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useWindowSize from 'src/hooks/useWindowSize';
import FlipCard from '../widgetCards/FlipCard';
import { ChartUniqueBugs4UseCase } from './Chart';
import { ListUniqueBugs4UseCase } from './List';

const UniqueBugs4UseCase = ({ height }: { height: string }) => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const { campaignId } = useParams();
  if (!campaignId) {
    return null;
  }

  return (
    <FlipCard height={height}>
      <FlipCard.Header hasBack={!isMobile}>
        {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_CARD_TITLE')}
      </FlipCard.Header>
      <FlipCard.Body
        front={
          isMobile ? (
            <ListUniqueBugs4UseCase campaignId={campaignId} />
          ) : (
            <ChartUniqueBugs4UseCase campaignId={campaignId} />
          )
        }
        back={
          isMobile ? undefined : (
            <ListUniqueBugs4UseCase campaignId={campaignId} />
          )
        }
      />
    </FlipCard>
  );
};

export default UniqueBugs4UseCase;
