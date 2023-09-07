import { MD, Skeleton } from '@appquality/unguess-design-system';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { List } from 'src/pages/Campaign/List';
import styled from 'styled-components';
import { useSentiments } from '../useSentiments';
import { Item, Sentiment } from './Item';

const Description = styled(MD)`
  margin: ${({ theme }) => theme.space.base * 5}px 0;
  color: ${({ theme }) => theme.palette.grey[700]};
  align-self: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const SentimentList = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const PAGE_ITEMS_SIZE = 5;
  const { t } = useTranslation();

  const { sentiments, isLoading, isError } = useSentiments({
    cid: campaignId.toString(),
    isPreview,
    order: 'DESC',
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<Sentiment[]>(
    sentiments
      .reverse()
      .slice((currentPage - 1) * PAGE_ITEMS_SIZE, currentPage * PAGE_ITEMS_SIZE)
  );

  const maxPages = useMemo(
    () => Math.ceil(sentiments.length / PAGE_ITEMS_SIZE),
    [sentiments, PAGE_ITEMS_SIZE]
  );

  useEffect(() => {
    if (sentiments.length) {
      setPaginatedItems(
        sentiments
          .reverse()
          .slice(
            (currentPage - 1) * PAGE_ITEMS_SIZE,
            currentPage * PAGE_ITEMS_SIZE
          )
      );
    }
  }, [currentPage, sentiments.length]);

  if (isError || !sentiments) return null;

  if (isLoading) return <Skeleton />;

  return (
    <>
      <Description>
        {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_DESCRIPTION')}
      </Description>
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
        {paginatedItems.map((item) => (
          <Item item={item} />
        ))}
        <List.Pagination
          setPage={setCurrentPage}
          page={currentPage}
          totalPages={maxPages}
        />
      </List>
    </>
  );
};
