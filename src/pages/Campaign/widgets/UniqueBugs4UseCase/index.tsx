import { useTranslation } from 'react-i18next';
import FlipCard from '../widgetCards/FlipCard';
import { ChartUniqueBugs4UseCase } from './ChartUniqueBugs4UseCase';
import { ListUniqueBugs4UseCase } from './ListUniqueBugs4UseCase';

const UniqueBugs4UseCase = ({ contentHeight }: { contentHeight: string }) => {
  const { t } = useTranslation();
  return (
    <FlipCard>
      <FlipCard.Header>
        {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_CARD_TITLE')}
      </FlipCard.Header>
      <FlipCard.Body
        height={contentHeight}
        front={<ChartUniqueBugs4UseCase />}
        back={<ListUniqueBugs4UseCase />}
      />
    </FlipCard>
  );
};

export default UniqueBugs4UseCase;
