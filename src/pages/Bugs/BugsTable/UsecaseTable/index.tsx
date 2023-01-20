import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table, { ColumnDefinitionType } from 'src/common/components/Table';
import { Bug } from 'src/features/api';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { Accordion, Button } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { mapBugsToTableData } from '../mapBugsToTableData';
import { TableDatum } from '../types';
import { EmptyState } from '../EmptyState';

interface UsecaseTableProps {
  bugs: Bug[];
  columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[];
  isLoading: boolean;
}

const UsecaseTable = ({ bugs, columns, isLoading }: UsecaseTableProps) => {
  const { t } = useTranslation();
  const currentBugId = getSelectedBugId();
  const [isPreview, setIsPreview] = useState(true);
  const dispatch = useAppDispatch();

  const getDisplayedBugs = useCallback(() => {
    const displayBugs = isPreview ? bugs.slice(0, 3) : bugs;
    return mapBugsToTableData(displayBugs, t);
  }, [isPreview, bugs]);

  return (
    <Accordion.Panel>
      {bugs && bugs.length > 0 && (
        <Table
          columns={columns}
          data={getDisplayedBugs()}
          selectedRow={currentBugId ? currentBugId.toString() : null}
          onRowClick={(bug_id) => dispatch(selectBug({ bug_id }))}
          isSticky
          isLoading={isLoading}
          loadingRowHeight="70px"
          emptyState={<EmptyState />}
        />
      )}
      <Button onClick={() => setIsPreview(!isPreview)}>vedi tutti</Button>
    </Accordion.Panel>
  );
};

export default UsecaseTable;
