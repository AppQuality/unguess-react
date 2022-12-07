import { Skeleton, XL } from '@appquality/unguess-design-system';
import { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { theme } from 'src/app/theme';
import { List } from '../../List';
import { ListItem } from '../../List/ListItem';
import { useListBugsByType } from './useListBugsByType';

export const ListTotalBugsByType = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { items, total, isLoading, isError } = useListBugsByType(campaignId);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState(items);
  const pageSize = 4;
  const maxPages = useMemo(
    () => Math.ceil(items.length / pageSize),
    [items, pageSize]
  );

  useEffect(() => {
    setPaginatedItems(
      items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [currentPage, items]);

  if (isLoading || isError)
    return (
      <>
        <Skeleton
          height="100px"
          style={{ borderRadius: 0, margin: `${theme.space.md} 0` }}
        />
        <Skeleton height="200px" style={{ borderRadius: 0 }} />
      </>
    );

  return (
    <List
      header={t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_TYPE_LIST_HEADER_LABEL')}
      title={
        <Trans i18nKey="__CAMPAIGN_PAGE_WIDGET_BUGS_BY_TYPE_LIST_TITLE">
          {{
            total,
          }}{' '}
          <XL tag="span" isBold>
            total bugs
          </XL>
        </Trans>
      }
    >
      <List.Columns>
        <List.Columns.Label isBold>
          {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_TYPE_LIST_COLUMN_LEFT')}
        </List.Columns.Label>
        <List.Columns.Label isBold>
          {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_TYPE_LIST_COLUMN_RIGHT')}
        </List.Columns.Label>
      </List.Columns>
      {paginatedItems.map((item) => (
        <ListItem key={item.type} numerator={item.bugs} denominator={total}>
          {item.type}
        </ListItem>
      ))}
      <List.Pagination
        setPage={setCurrentPage}
        page={currentPage}
        totalPages={maxPages}
      />
    </List>
  );
};
