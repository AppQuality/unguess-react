import { useMemo } from 'react';
import { Pill } from 'src/common/components/pills/Pill';
import { SeverityPill } from 'src/common/components/pills/SeverityPill';
import { ColumnDefinitionType } from 'src/common/components/Table';
import { theme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { useTranslation } from 'react-i18next';
import { bugs } from './mockData';
import { TableDatum } from './types';
import { BugTitle } from './BugTitle';

const columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[] = [
  {
    key: 'title',
    header: 'Title',
    width: 'auto',
  },
  {
    key: 'severity',
    header: 'Severity',
    width: '85px',
  },
  {
    key: 'bugId',
    header: 'Bug ID',
    width: '80px',
  },
];

export const useTableData = () => {
  const { t } = useTranslation();

  const mapBugsToTableData = useMemo<TableDatum[]>(
    () =>
      bugs.map((bug) => ({
        id: bug.id.toString(),
        bugId: (
          <span style={{ color: theme.palette.grey[700] }}>
            {bug.id.toString()}
          </span>
        ),
        severity: <SeverityPill severity={bug.severity} />,
        title: (
          <div>
            <BugTitle isUnread={bug.isUnread}>{bug.title}</BugTitle>
            {bug.tags?.map((tag) => (
              <Pill isBold={bug.isUnread}>{tag}</Pill>
            ))}
            {bug.isUnread && (
              <>
                <Pipe />
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
        isHighlighted: bug.isUnread,
        created: bug.created,
        updated: bug.updated,
        borderColor: theme.colors.bySeverity[bug.severity],
      })),
    [bugs]
  );
  return { columns, data: mapBugsToTableData };
};
