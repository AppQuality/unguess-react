import { Tag } from '@appquality/unguess-design-system';
import { ReactNode, useMemo } from 'react';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { ColumnDefinitionType } from 'src/common/components/Table';
import styled from 'styled-components';

type Bug = {
  id: number;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
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
  .bug-title {
    font-weight: ${({ isUnread }) => (isUnread ? 'bold' : 'normal')};
  }
  .tag {
    margin-right: 5px;
  }
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
        severity: <Tag>{capitalizeFirstLetter(bug.severity)}</Tag>,
        title: (
          <BugTitle isUnread={bug.isUnread}>
            <div className="bug-title">{bug.title}</div>
            {bug.tags?.map((tag) => (
              <Tag className="tag">{tag}</Tag>
            ))}
          </BugTitle>
        ),
        isHighlighted: bug.isUnread,
        created: bug.created,
        updated: bug.updated,
      })),
    [bugs]
  );

  return { columns, data: mapBugsToTableData };
};
