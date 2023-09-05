import { useTranslation } from 'react-i18next';
import FlipCard from 'src/pages/Campaign/widgetCards/FlipCard';
import { Chart } from './Chart';
import { SentimentList } from './SentimentList';
import { useSentiments } from './useSentiments';

export const Sentiment = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  const secondRowHeight = '550px';

  const { sentiments, isLoading, isError } = useSentiments({
    cid: campaignId.toString(),
    isPreview,
  });

  if (isLoading || isError || !sentiments) return null;

  return (
    <FlipCard className="bugs-by-type-widget" height={secondRowHeight}>
      <FlipCard.Header>
        {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_HEADER')}
      </FlipCard.Header>
      <FlipCard.Body
        front={<Chart campaignId={campaignId} isPreview={isPreview} />}
        back={<SentimentList campaignId={campaignId} isPreview={isPreview} />}
      />
    </FlipCard>
  );
};
