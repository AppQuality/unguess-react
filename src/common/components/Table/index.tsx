import {
  SM,
  TableNew as ZendeskTable,
} from '@appquality/unguess-design-system';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { LoadingState } from './LoadingState';
import { TableRow } from './TableRow';

const { HeaderRow, Head, HeaderCell, Body, Cell } = ZendeskTable;
interface TableData extends Record<string, ReactNode> {
  id: string;
  isHighlighted?: boolean;
  borderColor?: string;
}

export type TextAlign = 'start' | 'center' | 'end' | undefined;

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: ReactNode;
  width?: string;
  textAlign?: TextAlign;
};

type TableProps<T extends TableData, K extends keyof T> = {
  style?: React.CSSProperties;
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  onRowClick?: (id: string) => void;
  selectedRow?: string | null;
  isSticky?: boolean;
  maxHeight?: string;
  isLoading?: boolean;
  loadingRowHeight?: string;
  loadingRowCount?: number;
  emptyState?: JSX.Element;
};

const TableWrapper = styled.div<{ maxHeight?: string }>`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.space.sm};
  ${({ maxHeight }) =>
    maxHeight && `max-height: ${maxHeight}; overflow-y: auto;`}
`;

const StyledHead = styled(Head)<{ isSticky?: boolean }>`
  ${({ isSticky }) => isSticky && 'z-index: 1;'}
`;

const Table = <T extends TableData, K extends keyof T>({
  columns,
  data,
  selectedRow,
  onRowClick,
  isSticky,
  maxHeight,
  isLoading,
  loadingRowHeight,
  loadingRowCount,
  emptyState,
  style,
}: TableProps<T, K>) => {
  if (!isLoading && (!data || !data.length)) {
    return emptyState || null;
  }
  return (
    <TableWrapper maxHeight={maxHeight} style={style}>
      <ZendeskTable>
        <StyledHead isSticky={isSticky}>
          <HeaderRow>
            {columns.map((column) => (
              <HeaderCell
                width={column.width}
                key={column.key.toString()}
                style={{ textAlign: column.textAlign }}
              >
                <SM isBold>{column.header}</SM>
              </HeaderCell>
            ))}
          </HeaderRow>
        </StyledHead>
        {isLoading ? (
          <LoadingState
            colCount={columns.length}
            rowCount={loadingRowCount}
            rowHeight={loadingRowHeight}
          />
        ) : (
          <Body>
            {data.map((row) => (
              <TableRow
                key={row.id}
                id={row.id}
                onClick={onRowClick}
                isSelected={row.id === selectedRow}
                isHighlighted={row.isHighlighted}
                borderColor={row.borderColor}
              >
                {columns.map((column) => (
                  <Cell key={`${row.id}-${column.key.toString()}`}>
                    {row[column.key]}
                  </Cell>
                ))}
              </TableRow>
            ))}
          </Body>
        )}
      </ZendeskTable>
    </TableWrapper>
  );
};

export default Table;
