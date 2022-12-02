import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import FlipCard from '../widgetCards/FlipCard';
import { ChartUniqueBugs4UseCase } from './ChartUniqueBugs4UseCase';
import { ListUniqueBugs4UseCase } from './ListUniqueBugs4UseCase';

const UniqueBugs4UseCase = ({ contentHeight }: { contentHeight: string }) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  if (!campaignId) {
    return null;
  }
  return (
    <FlipCard>
      <FlipCard.Header>
        {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_CARD_TITLE')}
      </FlipCard.Header>
      <FlipCard.Body
        height={contentHeight}
        front={<ChartUniqueBugs4UseCase campaignId={campaignId} />}
        back={<ListUniqueBugs4UseCase campaignId={campaignId} />}
      />
    </FlipCard>
  );
};

export default UniqueBugs4UseCase;
