import { useCallback } from 'react';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import useWindowSize from 'src/hooks/useWindowSize';
import { useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const { columns } = useTableColumns();
  const currentBugId = getSelectedBugId();
  const navigate = useNavigate();

  const breakpointLg = parseInt(globalTheme.breakpoints.lg, 10);
  const isLgBreakpoint = width < breakpointLg;
  const bugPageUrlWithoutId = useLocalizeRoute(`campaigns/${campaignId}/bugs/`);

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
    return mapBugsToTableData(displayBugs, t);
  }, [isPreview, item.bugs]);

  return (
    <Table
      style={{ margin: `${globalTheme.space.xs} 0` }}
      columns={columns}
      data={getDisplayedBugs()}
      selectedRow={currentBugId ? currentBugId.toString() : null}
      onRowClick={onRowClick}
      isSticky
    />
  );
};

export default SingleGroupTable;
