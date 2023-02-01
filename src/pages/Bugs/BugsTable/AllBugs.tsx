import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { theme } from 'src/app/theme';
import Table from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { TableBugType } from '../types';
import { InfoRow } from './components/InfoRow';
import { mapBugsToTableData } from './utils/mapBugsToTableData';
import { useTableColumns } from './hooks/useTableColumns';

export const AllBugs = ({ bugs }: { bugs: TableBugType[] }) => {
  const currentBugId = getSelectedBugId();
  const { t } = useTranslation();
  const { columns } = useTableColumns();
  const dispatch = useAppDispatch();

  return (
    <div>
      <InfoRow bugs={bugs} />
      <Table
        style={{ marginBottom: theme.space.sm, marginTop: theme.space.xs }}
        columns={columns}
        data={mapBugsToTableData(bugs, t)}
        selectedRow={currentBugId ? currentBugId.toString() : null}
        onRowClick={(bug_id) =>
          dispatch(selectBug({ bug_id: parseInt(bug_id, 10) }))
        }
        isSticky
      />
    </div>
  );
};
