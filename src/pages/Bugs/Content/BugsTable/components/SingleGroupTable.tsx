import { useCallback } from 'react';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import useWindowSize from 'src/hooks/useWindowSize';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import Table from 'src/common/components/Table';
import { TableBugType } from 'src/pages/Bugs/types';
import { useNavigate } from 'react-router-dom';
import { BugByStateType, BugByUsecaseType } from '../types';
import { mapBugsToTableData } from '../utils/mapBugsToTableData';
import { useTableColumns } from '../hooks/useTableColumns';

interface SingleGroupTableProps {
  campaignId: number;
  item: BugByStateType | BugByUsecaseType | { bugs: TableBugType[] };
  isPreview?: boolean;
}

const SingleGroupTable = ({
  campaignId,
  item,
  isPreview,
}: SingleGroupTableProps) => {
  const { width } = useWindowSize();
  const { columns } = useTableColumns();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentBugId = getSelectedBugId();
  const bugPageUrlWithoutId = useLocalizeRoute(`campaigns/${campaignId}/bugs/`);

  const breakpointLg = parseInt(appTheme.breakpoints.lg, 10);
  const isLgBreakpoint = width < breakpointLg;

  const onRowClick = useCallback(
    (bug_id: string) => {
      if (isLgBreakpoint) {
        navigate(bugPageUrlWithoutId + bug_id);
      } else {
        dispatch(selectBug({ bug_id: parseInt(bug_id, 10) }));
      }
    },
    [bugPageUrlWithoutId, isLgBreakpoint]
  );

  const getDisplayedBugs = useCallback(() => {
    const displayBugs =
      isPreview && item && item.bugs.length > 3
        ? item.bugs.slice(0, 3)
        : item.bugs;
    return mapBugsToTableData(displayBugs);
  }, [isPreview, item.bugs]);

  return (
    <Table
      style={{ margin: `${appTheme.space.xs} 0` }}
      columns={columns}
      data={getDisplayedBugs()}
      selectedRow={currentBugId ? currentBugId.toString() : null}
      onRowClick={onRowClick}
      isSticky
    />
  );
};

export default SingleGroupTable;
