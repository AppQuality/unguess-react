import { ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { Accordion, Button, theme } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useAppDispatch } from 'src/app/hooks';
import { mapBugsToTableData } from '../utils/mapBugsToTableData';
import { BugBySeverityType, BugByUsecaseType } from '../types';
import { InfoRow } from './InfoRow';
import { useTableColumns } from '../hooks/useTableColumns';

interface SingleGroupTableProps {
  title?: ReactNode;
  item: BugBySeverityType | BugByUsecaseType;
  footer?: ReactNode;
}

const SingleGroupTable = ({ title, item, footer }: SingleGroupTableProps) => {
  const { t } = useTranslation();
  const { columns } = useTableColumns();
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

  const AccordionFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <Accordion.Section style={{ marginBottom: theme.space.lg }}>
      <StyledAccordionHeader>
        <StyledAccordionLabel>
          <InfoRow title={title} bugs={item.bugs} />
        </StyledAccordionLabel>
      </StyledAccordionHeader>
      <Accordion.Panel style={{ padding: 0 }}>
        <Table
          style={{ margin: `${theme.space.xs} 0` }}
          columns={columns}
          data={getDisplayedBugs()}
          selectedRow={currentBugId ? currentBugId.toString() : null}
          onRowClick={(bug_id) =>
            dispatch(selectBug({ bug_id: parseInt(bug_id, 10) }))
          }
          isSticky
        />
        <AccordionFooter>
          {footer || <div />}
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
        </AccordionFooter>
      </Accordion.Panel>
    </Accordion.Section>
  );
};

export default SingleGroupTable;
