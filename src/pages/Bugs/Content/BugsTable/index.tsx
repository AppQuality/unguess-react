import { useAppSelector } from 'src/app/hooks';
import { AllBugs } from './AllBugs';
import { BugsBySeverity } from './BugsBySeverity';
import { BugsByUsecase } from './BugsByUsecase';
import { EmptyState } from './components/EmptyState';
import { LoadingState } from './components/LoadingState';
import { useTableData } from './hooks/useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { pageView } = useAppSelector((state) => state.bugsPage);
  const { data, isLoading, error } = useTableData(campaignId);

  if (isLoading || error) {
    return <LoadingState />;
  }

  if (!data.allBugs.length) {
    return <EmptyState />;
  }

  return (
    <div>
      {pageView === 'byUsecase' && (
        <BugsByUsecase bugsByUseCases={data.bugsByUseCases} />
      )}
      {pageView === 'bySeverity' && (
        <BugsBySeverity
          bugsBySeverity={data.bugsBySeverity}
          allBugs={data.allBugs}
        />
      )}
      {pageView === 'ungrouped' && <AllBugs bugs={data.allBugs} />}
    </div>
  );
};

export default BugsTable;
