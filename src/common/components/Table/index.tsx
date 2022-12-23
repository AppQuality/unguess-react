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

interface WithId {
  id: string;
}
export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: ReactNode;
  width?: string;
};
type TableProps<T extends WithId, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const Table = <T extends WithId, K extends keyof T>({
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
          <Row
            onClick={() => setSelectedRow(row.id)}
            isSelected={row.id === selectedRow}
          >
            {columns.map((column) => (
              <Cell>{row[column.key]}</Cell>
            ))}
          </Row>
        ))}
      </Body>
    </ZendeskTable>
  );
};

export default Table;
