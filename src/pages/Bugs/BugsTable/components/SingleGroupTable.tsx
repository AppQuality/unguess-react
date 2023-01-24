import { ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table, { ColumnDefinitionType } from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import {
  Accordion,
  Button,
  MD,
  SM,
  theme,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useAppDispatch } from 'src/app/hooks';
import { mapBugsToTableData } from '../mapBugsToTableData';
import { BugBySeverityType, BugByUsecaseType, TableDatum } from '../types';
import { EmptyState } from './EmptyState';
import { InfoRow } from './InfoRow';

interface UsecaseTableProps {
  title?: ReactNode;
  item: BugBySeverityType | BugByUsecaseType;
  columns: ColumnDefinitionType<TableDatum, keyof TableDatum>[];
  isLoading?: boolean;
}

const SingleGroupTable = ({
  title,
  item,
  columns,
  isLoading,
}: UsecaseTableProps) => {
  const { t } = useTranslation();
  const currentBugId = getSelectedBugId();
  const [isPreview, setIsPreview] = useState(true);
  const dispatch = useAppDispatch();

  if (!item) return null; // todo check
  const getDisplayedBugs = useCallback(() => {
    const displayBugs = isPreview ? item.bugs.slice(0, 3) : item.bugs;
    return mapBugsToTableData(displayBugs, t);
  }, [isPreview, item.bugs]);

  const StyledAccordionLabel = styled(Accordion.Label)`
    padding: 0;
  `;
  const StyledAccordionHeader = styled(Accordion.Header)`
    svg {
      padding: ${theme.space.xs};
    }
  `;

  return (
    <Accordion.Section>
      <StyledAccordionHeader>
        <StyledAccordionLabel>
          <InfoRow title={title} bugs={item.bugs} />
        </StyledAccordionLabel>
      </StyledAccordionHeader>
      <Accordion.Panel style={{ padding: 0 }}>
        <Table
          style={{ marginBottom: theme.space.sm }}
          columns={columns}
          data={getDisplayedBugs()}
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button isBasic size="small" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? (
              <>
                {t('__BUGS_PAGE_TABLE_SEE_ALL', 'see all')}
                {` (${item.bugs.length})`}
              </>
            ) : (
              t('__BUGS_PAGE_TABLE_SEE_LESS', 'see less')
            )}
          </Button>
        </div>
      </Accordion.Panel>
    </Accordion.Section>
  );
};

export default SingleGroupTable;
