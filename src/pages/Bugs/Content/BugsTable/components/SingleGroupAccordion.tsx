import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import { AccordionNew, Button } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useAppDispatch } from 'src/app/hooks';
import useWindowSize from 'src/hooks/useWindowSize';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ChevronDownStroke } from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg';
import { ReactComponent as ChevronUpStroke } from '@zendeskgarden/svg-icons/src/16/chevron-up-stroke.svg';
import { BugByStateType, BugByUsecaseType } from '../types';
import { InfoRow } from './InfoRow';
import BugCards from './BugCards';
import SingleGroupTable from './SingleGroupTable';

const AccordionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${appTheme.space.xxs} ${appTheme.space.sm};
  margin-bottom: ${appTheme.space.sm};
`;

interface SingleGroupAccordionProps {
  campaignId: number;
  title?: string | undefined;
  item: BugByStateType | BugByUsecaseType;
  footer?: ReactNode;
}

const SingleGroupAccordion = ({
  campaignId,
  title,
  item,
  footer,
}: SingleGroupAccordionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const [isPreview, setIsPreview] = useState(true);

  const breakpointLg = parseInt(appTheme.breakpoints.lg, 10);
  const breakpointMd = parseInt(appTheme.breakpoints.md, 10);
  const isLgBreakpoint = width < breakpointLg;
  const isMdBreakpoint = width < breakpointMd;

  // Force close bug details on mobile
  useEffect(() => {
    if (isLgBreakpoint) dispatch(selectBug({ bug_id: undefined }));
  }, [isLgBreakpoint]);

  const AccordionPanel = styled(AccordionNew.Panel)`
    padding: 0;
    .bordered-content {
      @media (min-width: ${appTheme.breakpoints.md}) {
        background-color: white;
        border-radius: ${({ theme }) => theme.borderRadii.lg};
        border: 1px solid ${({ theme }) => theme.palette.grey[300]};
        padding-left: ${({ theme }) => theme.space.xxs};
        padding-right: ${({ theme }) => theme.space.xxs};
      }
    }
  `;

  return (
    <AccordionNew.Section style={{ marginBottom: appTheme.space.lg }}>
      <AccordionNew.Header>
        <AccordionNew.Label label={title} />
        {/* There is a blank title for not rendering the trans in InfoRow */}
        <InfoRow title=" " bugs={item.bugs} />
      </AccordionNew.Header>
      <AccordionPanel>
        <div className="bordered-content">
          {' '}
          {isMdBreakpoint ? (
            <BugCards bugs={isPreview ? item.bugs.slice(0, 3) : item.bugs} />
          ) : (
            <SingleGroupTable
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
                    <ChevronDownStroke
                      style={{ marginRight: appTheme.space.xs }}
                    />
                    {t('__BUGS_PAGE_TABLE_SEE_ALL', 'see all')}
                    {` (${item.bugs.length})`}
                  </>
                ) : (
                  <>
                    <ChevronUpStroke
                      style={{ marginRight: appTheme.space.xs }}
                    />
                    {t('__BUGS_PAGE_TABLE_SEE_LESS', 'see less')}
                  </>
                )}
              </Button>
            )}
          </AccordionFooter>
        </div>
      </AccordionPanel>
    </AccordionNew.Section>
  );
};

export default SingleGroupAccordion;
