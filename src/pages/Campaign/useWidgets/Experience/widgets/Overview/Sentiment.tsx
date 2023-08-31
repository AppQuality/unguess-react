import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import FlipCard from 'src/pages/Campaign/widgetCards/FlipCard';
import { SentimentChart } from './SentimentChart';
import { SentimentList } from './SentimentList';

export const Sentiment = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  const secondRowHeight = '465px';

  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId.toString(),
    ...(!isPreview && { showAsCustomer: true }),
  });

  if (isLoading || isFetching || isError || !data) return <div>loading...</div>;

  return (
    <FlipCard className="bugs-by-type-widget" height={secondRowHeight}>
      <FlipCard.Header>
        {t('__CAMPAIGN_WIDGET_BUGS_BY_TYPE_HEADER')}
      </FlipCard.Header>
      <FlipCard.Body
        front={<SentimentChart campaignId={campaignId} isPreview={isPreview} />}
        back={<SentimentList campaignId={campaignId} isPreview={isPreview} />}
      />
    </FlipCard>
  );
};
