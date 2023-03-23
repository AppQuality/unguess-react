import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'src/common/components/Table';
import {
  getSelectedBugId,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { Accordion, Button, theme } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useAppDispatch } from 'src/app/hooks';
import useWindowSize from 'src/hooks/useWindowSize';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { theme as globalTheme } from 'src/app/theme';
import { mapBugsToTableData } from '../utils/mapBugsToTableData';
import { BugBySeverityType, BugByUsecaseType } from '../types';
import { InfoRow } from './InfoRow';
import { useTableColumns } from '../hooks/useTableColumns';

interface SingleGroupTableProps {
  campaignId: number;
  title?: ReactNode;
  item: BugBySeverityType | BugByUsecaseType;
  footer?: ReactNode;
}

const SingleGroupTable = ({
  campaignId,
  title,
  item,
  footer,
}: SingleGroupTableProps) => {
  const { t } = useTranslation();
  const { columns } = useTableColumns();
  const currentBugId = getSelectedBugId();
  const [isPreview, setIsPreview] = useState(true);
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

  if (!item) return null; // todo check
  const getDisplayedBugs = useCallback(() => {
    const displayBugs =
      isPreview && item.bugs.length > 3 ? item.bugs.slice(0, 3) : item.bugs;
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
          onRowClick={onRowClick}
          isSticky
        />
        <AccordionFooter>
          {footer || <div />}
          {item.bugs.length > 3 && (
            <Button
              isBasic
              size="small"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? (
                <>
                  {t('__BUGS_PAGE_TABLE_SEE_ALL', 'see all')}
                  {` (${item.bugs.length})`}
                </>
              ) : (
                t('__BUGS_PAGE_TABLE_SEE_LESS', 'see less')
              )}
            </Button>
          )}
        </AccordionFooter>
      </Accordion.Panel>
    </Accordion.Section>
  );
};

export default SingleGroupTable;
