import { useAppSelector } from 'src/app/hooks';
import { getSelectedFilters } from 'src/features/bugsPage/bugsPageSlice';
import { useMemo } from 'react';
import { AllBugs } from './AllBugs';
import { BugsByUsecase } from './BugsByUsecase';
import { BugsByState } from './BugsByState';

const BugsTable = ({ campaignId }: { campaignId: number }) => {
  const { groupBy } = useAppSelector((state) => state.bugsPage);
  const selectedFilters = getSelectedFilters();
  const isDefaultView = useMemo(
    () =>
      !selectedFilters.search &&
      selectedFilters.severities?.length === 0 &&
      selectedFilters.types?.length === 0 &&
      !selectedFilters.read,
    [selectedFilters]
  );

  return (
    <>
      {groupBy === 'usecase' && (
        /* TODO: prop drilling (campaignId) */
        <BugsByUsecase campaignId={campaignId} isDefaultView={isDefaultView} />
      )}
      {groupBy === 'bugState' && (
        /* TODO: prop drilling (campaignId) */
        <BugsByState campaignId={campaignId} isDefaultView={isDefaultView} />
      )}
      {/* TODO: prop drilling (campaignId) */}
      {groupBy === 'ungrouped' && <AllBugs campaignId={campaignId} />}
    </>
  );
};

export default BugsTable;
