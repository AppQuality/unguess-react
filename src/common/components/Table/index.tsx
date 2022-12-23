import { ReactNode, useState } from 'react';
import {
  Table as ZendeskTable,
  HeaderRow,
  Head,
  HeaderCell,
  Body,
  Cell,
  Row,
} from '@zendeskgarden/react-tables';
import styled from 'styled-components';

interface TableData {
  id: string;
  isHighlighted?: boolean;
}
export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: ReactNode;
  width?: string;
};
type TableProps<T extends TableData, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const StyledRow = styled(Row)<{ isHighlighted?: boolean }>`
  cursor: pointer;
  background-color: ${({ isHighlighted, theme }) =>
    isHighlighted ? theme.palette.white : theme.palette.grey[100]};
`;

const Table = <T extends TableData, K extends keyof T>({
  columns,
  data,
}: TableProps<T, K>) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  return (
    <ZendeskTable>
      <Head>
        <HeaderRow>
          {columns.map((column) => (
            <HeaderCell width={column.width}>{column.header}</HeaderCell>
          ))}
        </HeaderRow>
      </Head>
      <Body>
        {data.map((row) => (
          <StyledRow
            onClick={() => setSelectedRow(row.id)}
            isSelected={row.id === selectedRow}
            isHighlighted={row.isHighlighted}
          >
            {columns.map((column) => (
              <Cell>{row[column.key]}</Cell>
            ))}
          </StyledRow>
        ))}
      </Body>
    </ZendeskTable>
  );
};

export default Table;
