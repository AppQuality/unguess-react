import { Grid, Row, Col } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import { useEffect, useMemo, useState } from 'react';
import { List } from 'src/pages/Campaign/List';
import { Item, Sentiment } from './Item';

export const SentimentList = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const PAGE_ITEMS_SIZE = 4;
  const { t } = useTranslation();

  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId.toString(),
    ...(!isPreview && { showAsCustomer: true }),
  });

  const sentiments = data?.sentiment ?? [];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<Sentiment[]>([]);
  const maxPages = useMemo(
    () => Math.ceil(sentiments.length / PAGE_ITEMS_SIZE),
    [sentiments, PAGE_ITEMS_SIZE]
  );

  useEffect(() => {
    setPaginatedItems(
      [...sentiments]
        .reverse()
        .slice(
          (currentPage - 1) * PAGE_ITEMS_SIZE,
          currentPage * PAGE_ITEMS_SIZE
        )
    );
  }, [currentPage, sentiments]);

  if (isLoading || isFetching || isError || !data) return null;
  if (!sentiments.length) return null;

  // Sort sentiment by value
  const ordered = [...paginatedItems].sort((a, b) => {
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
      <List>
        <List.Columns style={{ marginBottom: 0 }}>
          <List.Columns.Label isBold>
            {' '}
            {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_USECASE_LABEL', {
              count: sentiments.length,
            })}
          </List.Columns.Label>
          <List.Columns.Label isBold>
            {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_SENTIMENT_LABEL')}
          </List.Columns.Label>
        </List.Columns>
        {ordered.map((item) => (
          <Item item={item} />
        ))}
        <List.Pagination
          setPage={setCurrentPage}
          page={currentPage}
          totalPages={maxPages}
        />
      </List>
    </Grid>
  );
};
