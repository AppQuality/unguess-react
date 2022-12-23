import Table from 'src/common/components/Table';
import { useTableData } from './useTableData';

const BugsTable = () => {
  const { columns, data } = useTableData();
  return <Table columns={columns} data={data} />;
};

export default BugsTable;
