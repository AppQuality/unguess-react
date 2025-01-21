import { appTheme } from 'src/app/theme';
import useWindowSize from 'src/hooks/useWindowSize';
import { styled } from 'styled-components';
import { useGetCampaignsByCidSuggestionsQuery } from 'src/features/api';
import { AccordionNew } from '@appquality/unguess-design-system';
import { getSelectedFiltersIds } from 'src/features/bugsPage/bugsPageSlice';
import { t } from 'i18next';
import { InfoRow } from './components/InfoRow';
import AllBugsTable from './components/SingleGroupTable';
import BugCards from './components/BugCards';
import { useBugs } from './hooks/useBugs';
import { LoadingState } from './components/LoadingState';
import { EmptyState } from './components/EmptyState';
import { Reccomendation } from './components/Reccomendation';

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
  const { data: suggestions } = useGetCampaignsByCidSuggestionsQuery({
    cid: campaignId.toString(),
  });
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
      <Reccomendation suggestion={suggestions?.suggestion} />
      <AccordionNew level={2}>
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
            <InfoRow bugs={bugs} />
          </AccordionNew.Meta>
        </AccordionNew.Header>
      </AccordionNew>
      {isMdBreakpoint ? (
        <BugCards bugs={bugs} />
      ) : (
        <AllBugsTable campaignId={campaignId} item={{ bugs }} />
      )}
    </Wrapper>
  );
};
