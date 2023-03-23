import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import Table from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import useWindowSize from 'src/hooks/useWindowSize';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useCallback, useEffect } from 'react';
import { TableBugType } from '../../types';
import { InfoRow } from './components/InfoRow';
import { mapBugsToTableData } from './utils/mapBugsToTableData';
import { useTableColumns } from './hooks/useTableColumns';

export const AllBugs = ({
  campaignId,
  bugs,
}: {
  campaignId: number;
  bugs: TableBugType[];
}) => {
  const currentBugId = getSelectedBugId();
  const { t } = useTranslation();
  const { columns } = useTableColumns();
  const dispatch = useAppDispatch();

  const { width } = useWindowSize();
  const breakpoint = parseInt(globalTheme.breakpoints.lg, 10);
  const isMobile = width < breakpoint;

  const bugPageUrlWithoutId = useLocalizeRoute(`campaigns/${campaignId}/bugs/`);

  const onRowClick = useCallback(
    (bug_id: string) => {
      if (isMobile) {
        window.location.href = bugPageUrlWithoutId + bug_id;
      } else {
        dispatch(selectBug({ bug_id: parseInt(bug_id, 10) }));
      }
    },
    [bugPageUrlWithoutId, isMobile]
  );

  useEffect(() => {
    dispatch(selectBug({ bug_id: undefined }));
  }, [isMobile]);

  return (
    <div>
      <InfoRow bugs={bugs} />
      <Table
        style={{
          marginBottom: globalTheme.space.sm,
          marginTop: globalTheme.space.xs,
        }}
        columns={columns}
        data={mapBugsToTableData(bugs, t)}
        selectedRow={currentBugId ? currentBugId.toString() : null}
        onRowClick={onRowClick}
        isSticky
      />
    </div>
  );
};
