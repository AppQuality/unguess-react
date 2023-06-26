import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import { Accordion, Button, theme } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useAppDispatch } from 'src/app/hooks';
import useWindowSize from 'src/hooks/useWindowSize';
import { appTheme } from 'src/app/theme';
import { BugByStateType, BugByUsecaseType } from '../types';
import { InfoRow } from './InfoRow';
import BugCards from './BugCards';
import UseCaseTable from './SingleGroupTable';

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

interface BugStateAccordionProps {
  campaignId: number;
  title?: ReactNode;
  item: BugByStateType | BugByUsecaseType;
  footer?: ReactNode;
}

const BugStateAccordion = ({
  campaignId,
  title,
  item,
  footer,
}: BugStateAccordionProps) => {
  const { t } = useTranslation();
  const [isPreview, setIsPreview] = useState(true);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  const breakpointLg = parseInt(appTheme.breakpoints.lg, 10);
  const breakpointMd = parseInt(appTheme.breakpoints.md, 10);
  const isLgBreakpoint = width < breakpointLg;
  const isMdBreakpoint = width < breakpointMd;

  useEffect(() => {
    if (isLgBreakpoint) dispatch(selectBug({ bug_id: undefined }));
  }, [isLgBreakpoint]);

  return (
    <Accordion.Section style={{ marginBottom: theme.space.lg }}>
      <StyledAccordionHeader>
        <StyledAccordionLabel>
          <InfoRow title={title} bugs={item.bugs} />
        </StyledAccordionLabel>
      </StyledAccordionHeader>
      <Accordion.Panel style={{ padding: 0 }}>
        {isMdBreakpoint ? (
          <BugCards bugs={isPreview ? item.bugs.slice(0, 3) : item.bugs} />
        ) : (
          <UseCaseTable
            campaignId={campaignId}
            item={item}
            isPreview={isPreview}
          />
        )}
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

export default BugStateAccordion;
