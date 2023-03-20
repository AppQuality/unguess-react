import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { AllBugs } from './AllBugs';
import { BugsByUsecase } from './BugsByUsecase';
import { EmptyState } from './components/EmptyState';
import { LoadingState } from './components/LoadingState';
import { useTableData } from './hooks/useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { groupBy } = useAppSelector((state) => state.bugsPage);
  const { data, isLoading, error } = useTableData(campaignId);

  if (isLoading || error) {
    return <LoadingState />;
  }

  if (!data.allBugs.length) {
    return <EmptyState />;
  }

  const Wrapper = styled.div`
    padding-top: ${(p) => p.theme.space.md}};
  `;

  return (
    <Wrapper>
      {groupBy === 'usecase' && (
        <BugsByUsecase bugsByUseCases={data.bugsByUseCases} />
      )}
      {groupBy === 'ungrouped' && <AllBugs bugs={data.allBugs} />}
    </Wrapper>
  );
};

export default BugsTable;
