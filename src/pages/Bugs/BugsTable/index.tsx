import { useAppDispatch } from 'src/app/hooks';
import Table from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { BasicEmptyState } from './emptyStates/BasicEmptyState';
import { SearchEmptyState } from './emptyStates/SearchEmptyState';
import { useTableData } from './useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { columns, data, isLoading, filterBy, searchBy } =
    useTableData(campaignId);
  const dispatch = useAppDispatch();
  const currentBugId = getSelectedBugId();
  if (isLoading) return <div>Loading...</div>;
  if (data.length !== 0) {
    return filterBy || searchBy ? (
      <SearchEmptyState searchTerm={searchBy} />
    ) : (
      <BasicEmptyState />
    );
  }
  return (
    <Table
      columns={columns}
      data={data}
      selectedRow={currentBugId ? currentBugId.toString() : null}
      onRowClick={(bug_id) => dispatch(selectBug({ bug_id }))}
      isSticky
    />
  );
};

export default BugsTable;
