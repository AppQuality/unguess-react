import { useAppSelector } from 'src/app/hooks';
import { AllBugs } from './AllBugs';
import { BugsBySeverity } from './BugsBySeverity';
import { BugsByUsecase } from './BugsByUsecase';
import { LoadingState } from './components/LoadingState';
import { useTableData } from './useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { pageView } = useAppSelector((state) => state.bugsPage);
  const { columns, data, isLoading } = useTableData(campaignId);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div>
      {pageView === 'byUsecase' && (
        <BugsByUsecase columns={columns} bugsByUseCases={data.bugsByUseCases} />
      )}
      {pageView === 'bySeverity' && (
        <BugsBySeverity
          columns={columns}
          bugsBySeverity={data.bugsBySeverity}
        />
      )}
      {pageView === 'ungrouped' && (
        <AllBugs columns={columns} bugs={data.allBugs} />
      )}
    </div>
  );
};

export default BugsTable;
