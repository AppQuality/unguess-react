import { appTheme } from 'src/app/theme';
import useWindowSize from 'src/hooks/useWindowSize';
import { styled } from 'styled-components';
import { InfoRow } from './components/InfoRow';
import AllBugsTable from './components/SingleGroupTable';
import BugCards from './components/BugCards';
import { useBugs } from './hooks/useBugs';
import { LoadingState } from './components/LoadingState';
import { EmptyState } from './components/EmptyState';

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

  if (isLoading || isError) {
    return <LoadingState />;
  }

  if (!bugs.length) {
    return <EmptyState />;
  }

  return (
    <Wrapper isFetching={isFetching}>
      <InfoRow bugs={bugs} />
      {isMdBreakpoint ? (
        <BugCards bugs={bugs} />
      ) : (
        <AllBugsTable campaignId={campaignId} item={{ bugs }} />
      )}
    </Wrapper>
  );
};
