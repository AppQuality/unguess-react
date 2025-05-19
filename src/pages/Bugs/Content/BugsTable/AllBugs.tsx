import { AccordionNew } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { appTheme } from 'src/app/theme';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';
import useWindowSize from 'src/hooks/useWindowSize';
import { styled } from 'styled-components';
import BugCards from './components/BugCards';
import { EmptyState } from './components/EmptyState';
import { InfoRowMeta } from './components/InfoRowMeta';
import { LoadingState } from './components/LoadingState';
import { Reccomendation } from './components/Reccomendation';
import AllBugsTable from './components/SingleGroupTable';
import { useBugs } from './hooks/useBugs';

const Wrapper = styled.div<{
  isFetching?: boolean;
}>`
  padding-top: ${(p) => p.theme.space.lg};

  ${(p) =>
    p.isFetching &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

export const AllBugs = ({ campaignId }: { campaignId: number }) => {
  const { width } = useWindowSize();
  const breakpointMd = parseInt(appTheme.breakpoints.md, 10);
  const isMdBreakpoint = width < breakpointMd;
  const { data, isLoading, isFetching, isError } = useBugs(campaignId);
  const { allBugs: bugs } = data;

  const filterBy = getSelectedFiltersIds();
  const totalBugs = bugs.length ?? 0;

  if (isLoading || isError) {
    return <LoadingState />;
  }

  if (!bugs.length) {
    return <EmptyState />;
  }

  return (
    <Wrapper isFetching={isFetching}>
      <Reccomendation campaignId={campaignId} />
      <AccordionNew level={2}>
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionNew.Label
              label={
                filterBy?.unique && filterBy.unique === 'unique'
                  ? t('__BUGS_PAGE_TABLE_HEADER_UNIQUE_BUGS_COUNTER', {
                      uniqueBugs: totalBugs,
                    })
                  : t('__BUGS_PAGE_TABLE_HEADER_WITH_DUPLICATED_BUGS_COUNTER', {
                      uniqueBugs: totalBugs,
                    })
              }
            />
            <AccordionNew.Meta>
              <InfoRowMeta bugs={bugs} />
            </AccordionNew.Meta>
          </AccordionNew.Header>
          <AccordionNew.Panel>
            {isMdBreakpoint ? (
              <BugCards bugs={bugs} />
            ) : (
              <AllBugsTable campaignId={campaignId} item={{ bugs }} />
            )}
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </Wrapper>
  );
};
