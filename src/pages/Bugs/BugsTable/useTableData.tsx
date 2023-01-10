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
  bugId: ReactNode;
  title: ReactNode;
  severity: ReactNode;
  created: string;
  updated?: string;
  isHighlighted?: boolean;
};

const BugTitle = styled.div<{ isUnread?: boolean }>`
  font-weight: ${({ isUnread }) =>
    isUnread ? theme.fontWeights.medium : theme.fontWeights.regular};
  color: ${({ isUnread }) =>
    isUnread ? theme.palette.blue[600] : theme.palette.grey[800]};
  margin-bottom: ${theme.space.xs};
`;

// todo: move to theme in a way or another
const severitiesBackground = {
  critical: '#FFEEEE',
  high: '#FFF7EE',
  medium: '#EEF7FF',
  low: '#EEFFFE',
};

const Pill = styled(Tag)<{ isBold?: boolean }>`
  pointer-events: none;
  margin-right: ${(p) => p.theme.space.xs};
  border-radius: ${theme.borderRadii.lg};
  color: ${theme.palette.grey[700]};
  font-weight: ${theme.fontWeights.regular};
  background-color: ${theme.palette.grey[100]};
  ${({ isBold }) => isBold && `font-weight: ${theme.fontWeights.medium};`}
`;
const SeverityPill = styled(Pill)<{ severity: Severity }>`
  ${({ severity }) => `color: ${theme.colors.bySeverity[severity]};`}
  ${({ severity }) => `background-color: ${severitiesBackground[severity]};`}
  width: min-content;
  margin-right: 0;
  margin-left: auto;
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
      tags: ['Boutiques ACME', 'Footer', 'Malfunction'],
      severity: 'high',
      created: '2021-01-01',
      updated: '2021-01-01',
    },
    {
      id: 263409,
      title: 'Non funzionano i link del footer ',
      tags: ['Boutiques ACME', 'Footer', 'Malfunction'],
      severity: 'medium',
      created: '2021-01-01',
      updated: '2021-01-01',
      isUnread: true,
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
        key: 'bugId',
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
        bugId: (
          <span style={{ color: theme.palette.grey[700] }}>
            {bug.id.toString()}
          </span>
        ),
        severity: (
          <SeverityPill severity={bug.severity}>
            {capitalizeFirstLetter(bug.severity)}
          </SeverityPill>
        ),
        title: (
          <div>
            <BugTitle isUnread={bug.isUnread}>{bug.title}</BugTitle>
            {bug.tags?.map((tag) => (
              <Pill isBold={bug.isUnread}>{tag}</Pill>
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
