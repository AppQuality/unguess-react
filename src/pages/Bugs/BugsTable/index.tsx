import Table from 'src/common/components/Table';
import { useTableData } from './useTableData';

interface BugsTableProps {
  currentBugId: string | null;
  setCurrentBugId: (id: string | null) => void;
}

const BugsTable = ({ currentBugId, setCurrentBugId }: BugsTableProps) => {
  const { columns, data } = useTableData();
  return (
    <Table
      columns={columns}
      data={data}
      selectedRow={currentBugId?.toString()}
      onRowClick={setCurrentBugId}
    />
  );
};

export default BugsTable;
