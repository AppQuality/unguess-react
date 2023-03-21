import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';
import { AllBugs } from './AllBugs';
import { BugsByUsecase } from './BugsByUsecase';
import { EmptyState } from './components/EmptyState';
import { LoadingState } from './components/LoadingState';
import { useTableData } from './hooks/useTableData';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { groupBy } = useAppSelector((state) => state.bugsPage);
  const { data, isLoading, isFetching, isError } = useTableData(campaignId);

  if (isLoading || isError) {
    return <LoadingState />;
  }

  if (!data.allBugs.length) {
    return <EmptyState />;
  }

  const Wrapper = styled.div<{
    isFetching?: boolean;
  }>`
    padding-top: ${(p) => p.theme.space.md}};

    ${(p) =>
      p.isFetching &&
      `
      opacity: 0.5;
      pointer-events: none;
    `}
  `;

  return (
    <Wrapper isFetching={isFetching}>
      {groupBy === 'usecase' && (
        <BugsByUsecase bugsByUseCases={data.bugsByUseCases} />
      )}
      {groupBy === 'ungrouped' && <AllBugs bugs={data.allBugs} />}
    </Wrapper>
  );
};

export default BugsTable;
