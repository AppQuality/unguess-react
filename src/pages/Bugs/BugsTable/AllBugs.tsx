import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { theme } from 'src/app/theme';
import Table, { ColumnDefinitionType } from 'src/common/components/Table';
import { Bug } from 'src/features/api';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { EmptyState } from './components/EmptyState';
import { InfoRow } from './components/InfoRow';
import { mapBugsToTableData } from './mapBugsToTableData';
import { TableDatum } from './types';

export const AllBugs = ({
  bugs,
  columns,
  isLoading,
}: {
  bugs: Bug[];
  columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[];
  isLoading?: boolean;
}) => {
  const currentBugId = getSelectedBugId();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  if (!bugs.length) {
    return <EmptyState />;
  }
  return (
    <div>
      <InfoRow bugs={bugs} />
      <Table
        style={{ marginBottom: theme.space.sm }}
        columns={columns}
        data={mapBugsToTableData(bugs, t)}
        selectedRow={currentBugId ? currentBugId.toString() : null}
        onRowClick={(bug_id) =>
          dispatch(selectBug({ bug_id: parseInt(bug_id, 10) }))
        }
        isSticky
        isLoading={isLoading}
        loadingRowHeight="70px"
        loadingRowCount={3}
        emptyState={<EmptyState />}
      />
    </div>
  );
};
