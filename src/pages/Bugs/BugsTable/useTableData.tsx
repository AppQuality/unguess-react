import { useMemo } from 'react';
import { Pill } from 'src/common/components/pills/Pill';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import { ColumnDefinitionType } from 'src/common/components/Table';
import { theme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { useTranslation } from 'react-i18next';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';
import { useGetCampaignsByCidBugsQuery } from 'src/features/api';
import { TableDatum } from './types';
import { BugTitle } from './BugTitle';

export const useTableData = (campaignId: number) => {
  const { t } = useTranslation();

  const filterBy = getSelectedFiltersIds();

  const columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[] = [
    {
      key: 'title',
      header: t('__BUGS_TABLE_TITLE_HEADER_COLUMN'),
      width: 'auto',
    },
    {
      key: 'severity',
      header: t('__BUGS_TABLE_SEVERITY_HEADER_COLUMN'),
      width: '90px',
    },
    {
      key: 'bugId',
      header: t('__BUGS_TABLE_BUG_ID_HEADER_COLUMN'),
      width: '90px',
    },
  ];

  const {
    isLoading,
    isFetching,
    data: bugs,
  } = useGetCampaignsByCidBugsQuery({
    cid: campaignId.toString() ?? '0',
    filterBy: {
      ...(filterBy?.types ? { types: filterBy.types.join(',') } : {}),
      ...(filterBy?.severities
        ? { severities: filterBy.severities.join(',') }
        : {}),
      ...(filterBy?.read && filterBy.read === 'unread'
        ? { read: 'false' }
        : {}),
      ...(filterBy?.unique && filterBy.unique === 'unique'
        ? { is_duplicated: '0' }
        : {}),
    },
    ...(filterBy?.search ? { search: filterBy.search } : {}),

    orderBy: 'severity_id',
    order: 'DESC',
  });

  const mapBugsToTableData = useMemo<TableDatum[]>(() => {
    if (!bugs || !bugs.items) return [];
    return bugs.items.map((bug) => ({
      id: bug.id.toString(),
      bugId: (
        <span style={{ color: theme.palette.grey[700] }}>
          {bug.id.toString()}
        </span>
      ),
      severity: (
        <SeverityPill
          severity={bug.severity.name.toLowerCase() as Severities}
        />
      ),
      title: (
        <div>
          <BugTitle isUnread={!bug.read}>{bug.title.compact}</BugTitle>
          {bug.title.context && (
            <Pill isBold={!bug.read}>{bug.title.context}</Pill>
          )}
          {bug.tags?.map((tag) => (
            <Pill isBold={!bug.read}>{tag.tag_name}</Pill>
          ))}
          {bug.type.name && (
            <>
              <Pipe size="small" />
              <Pill isBold style={{ marginLeft: theme.space.xs }}>
                {bug.type.name}
              </Pill>
            </>
          )}
          {!bug.read && (
            <>
              <Pipe size="small" />
              <Pill
                isBold
                backgroundColor="transparent"
                color={theme.palette.blue[600]}
              >
                {t('__PAGE_BUGS_UNREAD_PILL', 'Unread')}
              </Pill>
            </>
          )}
        </div>
      ),
      isHighlighted: !bug.read,
      created: bug.created,
      updated: bug.updated,
      borderColor:
        theme.colors.bySeverity[bug.severity.name.toLowerCase() as Severities],
    }));
  }, [bugs]);

  if (isLoading || isFetching || !bugs || !bugs.items)
    return { columns, data: [], isLoading: true };
  return {
    columns,
    data: mapBugsToTableData,
    isLoading: false,
    filterBy,
  };
};
