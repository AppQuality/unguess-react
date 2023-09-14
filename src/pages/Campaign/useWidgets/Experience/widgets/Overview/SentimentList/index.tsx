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
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    display: block;
  }
`;

const ListBody = styled.div`
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    margin-top: 0;
  }
`;

const StyledLabel = styled(List.Columns.Label)`
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
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
    order: 'ASC',
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
        <ListBody>
          <List.Columns>
            <List.Columns.Label isBold>
              {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_USECASE_LABEL', {
                count: sentiments.length,
              })}
            </List.Columns.Label>
            <StyledLabel isBold>
              {t('__CAMPAIGN_EXP_WIDGET_SENTIMENT_LIST_SENTIMENT_LABEL')}
            </StyledLabel>
          </List.Columns>
          {paginatedItems.map((item) => (
            <Item item={item} />
          ))}
        </ListBody>
        <List.Pagination
          setPage={setCurrentPage}
          page={currentPage}
          totalPages={maxPages}
        />
      </List>
    </>
  );
};
