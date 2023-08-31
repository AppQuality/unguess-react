import { Grid, Row, Col } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import styled from 'styled-components';
import { Item } from './Item';

export const List = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();

  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId.toString(),
    ...(!isPreview && { showAsCustomer: true }),
  });

  if (isLoading || isFetching || isError || !data) return <div>loading...</div>;

  if (!data?.sentiment) return <div>no data</div>;

  // Sort sentiment by value
  const orderedSentiment = [...data.sentiment].sort((a, b) => {
    if (a.value > b.value) return 1;
    if (a.value < b.value) return -1;
    return 0;
  });

  return (
    <Grid>
      <Row>
        <Col xs={12}>
          {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_DESCRIPTION')}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {orderedSentiment.map((item) => (
            <Item item={item} />
          ))}
        </Col>
      </Row>
    </Grid>
  );
};
