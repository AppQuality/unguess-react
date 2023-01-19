import { useAppDispatch } from 'src/app/hooks';
import Table from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { EmptyState } from './EmptyState';
import { useTableData } from './useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { columns, data, isLoading } = useTableData(campaignId);
  const dispatch = useAppDispatch();
  const currentBugId = getSelectedBugId();

  return (
    <>
      {data.bugsByUseCases && data.bugsByUseCases.length > 0 && (
        <div>Showing {data.bugsByUseCases.length} use cases</div>
      )}
      {data.bugsByUseCases.map((item) => (
        <>
          <div key={item.useCase.id}>{item.useCase.name}</div>
          {item.bugs && item.bugs.length > 0 && (
            <Table
              columns={columns}
              data={item.bugs}
              selectedRow={currentBugId ? currentBugId.toString() : null}
              onRowClick={(bug_id) => dispatch(selectBug({ bug_id }))}
              isSticky
              isLoading={isLoading}
              loadingRowHeight="70px"
              emptyState={<EmptyState />}
            />
          )}
        </>
      ))}
    </>
  );
};

export default BugsTable;
