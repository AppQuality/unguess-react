import { Skeleton, Span } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { theme } from 'src/app/theme';
import { List } from '../List';
import { ListItem } from '../List/ListItem';
import { useListBugsByDevice } from './useListBugsByDevice';

export const ListTotalBugsByDevice = ({
  campaignId,
}: {
  campaignId: number;
}) => {
  const { t } = useTranslation();

  const { bugsByDevice, bugsTotal, isLoading, isFetching, isError } =
    useListBugsByDevice(campaignId);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState(bugsByDevice);
  const pageSize = 6;
  const maxPages = Math.ceil(bugsTotal / pageSize);

  useEffect(() => {
    setPaginatedItems(
      bugsByDevice.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [currentPage, bugsByDevice]);

  if (isLoading || isFetching || isError)
    return (
      <div>
        <Skeleton
          height="100px"
          style={{ borderRadius: 0, margin: `${theme.space.md} 0` }}
        />
        <Skeleton height="200px" style={{ borderRadius: 0 }} />
      </div>
    );

  return (
    <List
      header={t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_DEVICE_LIST_HEADER_LABEL')}
      title={
        <Trans i18nKey="__CAMPAIGN_PAGE_WIDGET_BUGS_BY_DEVICE_LIST_TITLE">
          <Span>{{ bugsTotal }}</Span> bugs
        </Trans>
      }
    >
      <List.Columns>
        <List.Columns.Label isBold>
          {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_DEVICE_LIST_COLUMN_LEFT')}
        </List.Columns.Label>
        <List.Columns.Label isBold>
          {t('__CAMPAIGN_PAGE_WIDGET_BUGS_BY_DEVICE_LIST_COLUMN_RIGHT')}
        </List.Columns.Label>
      </List.Columns>
      {paginatedItems.map((item) => (
        <ListItem
          key={item.device}
          numerator={item.meta.bugs as number}
          denominator={bugsTotal}
        >
          {item.device}
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
