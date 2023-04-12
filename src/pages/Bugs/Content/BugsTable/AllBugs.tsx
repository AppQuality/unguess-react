import { theme as globalTheme } from 'src/app/theme';
import useWindowSize from 'src/hooks/useWindowSize';
import { TableBugType } from '../../types';
import { InfoRow } from './components/InfoRow';
import UseCaseTable from './components/SingleGroupTable';
import BugCards from './components/BugCards';

export const AllBugs = ({
  campaignId,
  bugs,
}: {
  campaignId: number;
  bugs: TableBugType[];
}) => {
  const { width } = useWindowSize();

  const breakpointMd = parseInt(globalTheme.breakpoints.md, 10);
  const isMdBreakpoint = width < breakpointMd;

  return (
    <>
      <InfoRow bugs={bugs} />
      {isMdBreakpoint ? (
        <BugCards bugs={bugs} />
      ) : (
        <UseCaseTable campaignId={campaignId} item={{ bugs }} />
      )}
    </>
  );
};
