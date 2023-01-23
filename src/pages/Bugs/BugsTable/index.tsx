import { useAppSelector } from 'src/app/hooks';
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
      {pageView === 'byUsecase' ? (
        <BugsByUsecase columns={columns} bugsByUseCases={data.bugsByUseCases} />
      ) : (
        <BugsBySeverity
          columns={columns}
          bugsBySeverity={data.bugsBySeverity}
        />
      )}
    </div>
  );
};

export default BugsTable;
