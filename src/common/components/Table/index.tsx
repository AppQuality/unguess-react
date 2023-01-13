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
import { SM } from '@appquality/unguess-design-system';
import { theme as appTheme } from 'src/app/theme';
import { TableRow } from './TableRow';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';

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
  isSticky?: boolean;
  maxHeight?: string;
  isLoading?: boolean;
  loadingRowHeight?: string;
  loadingRowCount?: number;
  emptyState?: ReactNode;
};

const TableWrapper = styled.div<{ maxHeight?: string }>`
  width: 100%;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  padding-bottom: ${({ theme }) => theme.space.sm};
  padding-left: ${({ theme }) => theme.space.xxs};
  padding-right: ${({ theme }) => theme.space.xxs};
  ${({ maxHeight }) =>
    maxHeight && `max-height: ${maxHeight}; overflow-y: auto;`}
`;

const StyledHead = styled(Head)<{ isSticky?: boolean }>`
  ${({ isSticky }) => isSticky && 'z-index: 2;'}
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
}: TableProps<T, K>) => (
  <TableWrapper maxHeight={maxHeight}>
    <ZendeskTable>
      <StyledHead isSticky={isSticky}>
        <HeaderRow>
          {columns.map((column) => (
            <HeaderCell width={column.width}>
              <SM isBold color={appTheme.palette.grey[800]}>
                {column.header}
              </SM>
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
          {!data ? (
            <EmptyState colCount={columns.length}>{emptyState}</EmptyState>
          ) : (
            data.map((row) => (
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
            ))
          )}
        </Body>
      )}
    </ZendeskTable>
  </TableWrapper>
);

export default Table;
