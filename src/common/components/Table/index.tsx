import { ReactNode } from 'react';
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

const StyledRow = styled(Row)<{
  isHighlighted?: boolean;
  isSelected?: boolean;
  borderColor?: string;
}>`
  cursor: pointer;
  border-left: ${({ borderColor }) =>
    borderColor ? `2px solid ${borderColor}` : 'none'};
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[200]};
  border-top: 1px solid ${({ theme }) => theme.palette.grey[100]};
  &:hover {
    box-shadow: 0px 4px 8px rgba(47, 57, 65, 0.15);
  }
  background-color: ${({ theme }) => theme.palette.grey[100]};
  ${({ isHighlighted, theme }) =>
    isHighlighted && `background-color: ${theme.palette.white};`}
  ${({ isSelected, theme }) =>
    isSelected && `background-color: ${theme.palette.blue[100]};`}
  > td {
    box-shadow: none !important;
  }
`;

const StyledZendeskTable = styled.div`
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
            onClick={() => onRowClick && onRowClick(row.id)}
            isSelected={row.id === selectedRow}
            isHighlighted={row.isHighlighted}
            borderColor={row.borderColor}
          >
            {columns.map((column) => (
              <Cell>{row[column.key]}</Cell>
            ))}
          </StyledRow>
        ))}
      </Body>
    </ZendeskTable>
  </StyledZendeskTable>
);

export default Table;
