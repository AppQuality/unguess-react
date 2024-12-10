import { Select } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { SelectedItem } from 'src/common/components/BugDetail/BugStateSelect';
import { BugByStateType } from 'src/pages/Bugs/Content/BugsTable/types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const StatusSelect = ({
  statuses,
  currentStatus,
}: {
  statuses: BugByStateType[];
  currentStatus?: string;
}) => {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();
  const renderOptions = useMemo(
    () =>
      statuses.map(({ state, bugs }) => (
        <Select.Option
          key={state.id}
          value={state.id.toString()}
          label={`${state.name} (${bugs.length} bugs)`}
          isDisabled={bugs.length === 0}
        />
      )),
    [statuses]
  );

  return (
    <Select
      renderValue={(value) => {
        const selectedStatus = statuses.find(
          (u) => u.state.id === Number(value.inputValue)
        );
        return <SelectedItem>{selectedStatus?.state.name}</SelectedItem>;
      }}
      isCompact
      inputValue={currentStatus}
      selectionValue={currentStatus}
      onSelect={async (stateId) => {
        const target = statuses.find((u) => u.state.id === Number(stateId))
          ?.bugs[0].id;
        if (target) {
          navigate(
            `/campaigns/${campaignId}/bugs/${target}?${searchParams.toString()}`
          );
        }
      }}
    >
      {renderOptions}
    </Select>
  );
};
