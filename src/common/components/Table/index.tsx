import { ReactNode } from 'react';
import {
  Table as ZendeskTable,
  HeaderRow,
  Head,
  HeaderCell,
  Body,
  Cell,
} from '@zendeskgarden/react-tables';
import styled from 'styled-components';
import { TableRow } from './TableRow';

interface TableData {
  id: string;
  isHighlighted?: boolean;
  borderColor?: string;
}
export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: ReactNode;
  width?: string;
};
type TableProps<T extends TableData, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  onRowClick?: (id: string) => void;
  selectedRow?: string | null;
};

const StyledZendeskTable = styled(ZendeskTable)`
  width: 100%;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding-bottom: ${({ theme }) => theme.space.sm};
  padding-left: ${({ theme }) => theme.space.xxs};
  padding-right: ${({ theme }) => theme.space.xxs};
`;

const Table = <T extends TableData, K extends keyof T>({
  columns,
  data,
  selectedRow,
  onRowClick,
}: TableProps<T, K>) => (
  <StyledZendeskTable>
    <Head>
      <HeaderRow>
        {columns.map((column) => (
          <HeaderCell width={column.width}>{column.header}</HeaderCell>
        ))}
      </HeaderRow>
    </Head>
    <Body>
      {data.map((row) => (
        <TableRow
          id={row.id}
          onClick={onRowClick}
          isSelected={row.id === selectedRow}
          isHighlighted={row.isHighlighted}
          borderColor={row.borderColor}
        >
          {columns.map((column) => (
            <Cell>{row[column.key]}</Cell>
          ))}
        </TableRow>
      ))}
    </Body>
  </StyledZendeskTable>
);

export default Table;
