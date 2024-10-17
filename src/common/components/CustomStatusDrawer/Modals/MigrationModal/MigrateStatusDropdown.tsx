import BugStateSelect from 'src/common/components/BugDetail/BugStateSelect';
import useStatusByPhase from 'src/common/components/BugDetail/BugStateSelect/useStatusByPhase';

const MigrateStatusDropdown = ({
  statusToMigrate,
  campaignId,
  onChange,
}: {
  statusToMigrate: number;
  campaignId: string;
  onChange: (statusId: number) => void;
}) => {
  const {
    data: customStatusesByPhase,
    isLoading: isLoadingCustomStatus,
    isError: isErrorCustomStatus,
  } = useStatusByPhase({
    campaignId,
  });

  if (!customStatusesByPhase || isErrorCustomStatus || isLoadingCustomStatus)
    return null;

  const filteredStatuses = customStatusesByPhase.map((phase) => ({
    ...phase,
    statuses: phase.statuses.filter((status) => status.id !== statusToMigrate),
  }));

  const firstStatus = filteredStatuses
    .flat()
    .find(() => true)
    ?.statuses.find(() => true);

  return (
    <BugStateSelect
      currentStatusId={firstStatus?.id}
      phases={filteredStatuses}
      onChange={onChange}
    />
  );
};

export { MigrateStatusDropdown };
