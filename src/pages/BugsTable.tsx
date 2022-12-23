import { Tag } from '@appquality/unguess-design-system';
import { ReactNode } from 'react';
import Table, { ColumnDefinitionType } from 'src/common/components/Table';
import styled from 'styled-components';

type Bug = {
  id: string;
  title: ReactNode;
  severity: ReactNode;
  created: string;
  updated?: string;
  isUnread?: boolean;
};

const BugTitle = styled.div<{ isUnread?: boolean }>`
  .bug-title {
    font-weight: ${({ isUnread }) => (isUnread ? 'bold' : 'normal')};
  }
  .tag {
    margin-right: 5px;
  }
`;

const BugsTable = () => {
  const data: Bug[] = [
    {
      id: '263411',
      title: (
        <BugTitle isUnread>
          <div className="bug-title">
            Risulta impossibile poter aprire le Boutiques di alcuni negozi nel
            mondo
          </div>
          <div>
            <Tag className="tag">Boutiques ACME</Tag>
            <Tag>Footer</Tag>
            <Tag>Malfunction</Tag>
          </div>
        </BugTitle>
      ),
      severity: <Tag>Critical</Tag>,
      created: '2021-01-01',
      isUnread: true,
    },
    {
      id: '263410',
      title: (
        <BugTitle>
          <div className="bug-title">
            Link a pagina specifica di prodotto porta alla homepage
          </div>
          <div>
            <Tag className="tag">Boutiques ACME</Tag>
            <Tag>Footer</Tag>
            <Tag>Malfunction</Tag>
          </div>
        </BugTitle>
      ),
      severity: <Tag>Critical</Tag>,
      created: '2021-01-01',
      updated: '2021-01-01',
    },
  ];

  const columns: ColumnDefinitionType<Bug, keyof Bug>[] = [
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
  ];

  return <Table columns={columns} data={data} />;
};

export default BugsTable;
