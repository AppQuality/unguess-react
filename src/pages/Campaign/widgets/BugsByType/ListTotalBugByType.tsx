import { Skeleton, XL } from '@appquality/unguess-design-system';
import { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { theme } from 'src/app/theme';
import { List } from '../List';
import { ListItem } from '../List/ListItem';
import { BugsByTypeData, useBugsByType } from './useBugsByType';

export const ListTotalBugsByType = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { bugsByType, totalBugs, isLoading, isError } =
    useBugsByType(campaignId);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<BugsByTypeData[]>([]);
  const pageSize = 4;
  const maxPages = useMemo(
    () => Math.ceil(bugsByType.length / pageSize),
    [bugsByType, pageSize]
  );

  useEffect(() => {
    setPaginatedItems(
      [...bugsByType]
        .reverse()
        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [currentPage, bugsByType]);

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
            total: totalBugs,
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
        <ListItem
          key={item.label}
          numerator={item.total}
          denominator={totalBugs}
        >
          {item.label}
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
