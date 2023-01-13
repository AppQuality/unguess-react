import { useAppDispatch } from 'src/app/hooks';
import Table from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { SearchEmptyState } from './SearchEmptyState';
import { useTableData } from './useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { columns, data, isLoading, filterBy, searchBy } =
    useTableData(campaignId);
  const dispatch = useAppDispatch();
  const currentBugId = getSelectedBugId();
  const isSearch = filterBy || searchBy;

  return (
    <Table
      columns={columns}
      data={data}
      selectedRow={currentBugId ? currentBugId.toString() : null}
      onRowClick={(bug_id) => dispatch(selectBug({ bug_id }))}
      isSticky
      isLoading={isLoading}
      loadingRowHeight="70px"
      emptyState={isSearch && <SearchEmptyState searchTerm={searchBy} />}
    />
  );
};

export default BugsTable;
