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

interface TableData {
  id: string;
  isHighlighted?: boolean;
  borderColor?: string;
}

export type TextAlign = 'left' | 'right' | 'justify' | 'center' | undefined;

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
