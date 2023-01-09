import { Tag } from '@appquality/unguess-design-system';
import { ReactNode, useMemo } from 'react';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { ColumnDefinitionType } from 'src/common/components/Table';
import { theme } from 'src/app/theme';
import styled from 'styled-components';

type Severity = 'critical' | 'high' | 'medium' | 'low';

type Bug = {
  id: number;
  title: string;
  severity: Severity;
  created: string;
  updated?: string;
  isUnread?: boolean;
  tags?: string[];
};

type TableDatum = {
  id: string;
  title: ReactNode;
  severity: ReactNode;
  created: string;
  updated?: string;
  isHighlighted?: boolean;
};

const BugTitle = styled.div<{ isUnread?: boolean }>`
  font-weight: ${({ isUnread }) => (isUnread ? 'bold' : 'normal')};
`;

// todo: move to theme in a way or another
const severitiesBackground = {
  critical: '#FFEEEE',
  high: '#FFF7EE',
  medium: '#EEF7FF',
  low: '#EEFFFE',
};

const SeverityTag = styled.div<{ severity: Severity }>`
  ${({ severity }) => `color: ${theme.colors.bySeverity[severity]};`}
  ${({ severity }) => `background-color: ${severitiesBackground[severity]};`}
  border-radius: 8px;
  padding-left: 4px;
  padding-right: 4px;
  width: min-content;
  margin-right: 0;
  margin-left: auto;
`;

const StyledTag = styled(Tag)`
  pointer-events: none;
  margin-right: ${(p) => p.theme.space.xs};
`;

export const useTableData = () => {
  const bugs: Bug[] = [
    {
      id: 263411,
      title:
        'Risulta impossibile poter aprire le Boutiques di alcuni negozi nel mondo',
      tags: ['Boutiques ACME', 'Footer', 'Malfunction'],
      severity: 'critical',
      created: '2021-01-01',
      isUnread: true,
    },
    {
      id: 263410,
      title: 'Link a pagina specifica di prodotto porta alla homepage',
      severity: 'high',
      created: '2021-01-01',
      updated: '2021-01-01',
    },
  ];

  const columns = useMemo<ColumnDefinitionType<TableDatum, keyof TableDatum>[]>(
    () => [
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
        key: 'id',
        header: 'Bug ID',
        width: '80px',
      },
    ],
    []
  );

  const mapBugsToTableData = useMemo<TableDatum[]>(
    () =>
      bugs.map((bug) => ({
        id: bug.id.toString(),
        severity: (
          <SeverityTag severity={bug.severity}>
            {capitalizeFirstLetter(bug.severity)}
          </SeverityTag>
        ),
        title: (
          <div>
            <BugTitle isUnread={bug.isUnread}>{bug.title}</BugTitle>
            {bug.tags?.map((tag) => (
              <StyledTag>{tag}</StyledTag>
            ))}
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
