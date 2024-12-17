import { Select } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SelectedItem } from 'src/common/components/BugDetail/BugStateSelect';
import { BugByUsecaseType } from 'src/pages/Bugs/Content/BugsTable/types';

export const UsecaseSelect = ({
  usecases,
}: {
  usecases: BugByUsecaseType[];
}) => {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();
  const renderOptions = useMemo(
    () =>
      usecases.map(({ useCase, bugs }) => (
        <Select.Option
          key={useCase.id}
          value={useCase.id.toString()}
          label={`${useCase.title.full} (${bugs.length} bugs)`}
          isDisabled={bugs.length === 0}
        />
      )),
    [usecases]
  );

  return (
    <Select
      renderValue={(value) => {
        const selectedStatus = usecases.find(
          (u) => u.useCase.id === Number(value.inputValue)
        );
        return (
          <SelectedItem>{selectedStatus?.useCase.title.full}</SelectedItem>
        );
      }}
      isCompact
      inputValue={searchParams.get('groupByValue') || ''}
      selectionValue={searchParams.get('groupByValue') || ''}
      onSelect={async (usecaseId) => {
        const target = usecases.find((u) => u.useCase.id === Number(usecaseId))
          ?.bugs[0].id;
        searchParams.set('groupByValue', usecaseId);
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
