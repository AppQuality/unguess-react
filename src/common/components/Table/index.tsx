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
};

const StyledRow = styled(Row)<{
  isHighlighted?: boolean;
  borderColor?: string;
}>`
  cursor: pointer;
  background-color: ${({ isHighlighted, theme }) =>
    isHighlighted ? theme.palette.white : theme.palette.grey[100]};
  border-left: ${({ borderColor }) =>
    borderColor ? `2px solid ${borderColor}` : 'none'};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  border-top: 1px solid ${({ theme }) => theme.palette.grey[100]};
  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[200]};
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
}: TableProps<T, K>) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  return (
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
              onClick={() => setSelectedRow(row.id)}
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
};

export default Table;
