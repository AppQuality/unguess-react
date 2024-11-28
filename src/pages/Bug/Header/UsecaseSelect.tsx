import { Select } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { SelectedItem } from 'src/common/components/BugDetail/BugStateSelect';
import { BugByUsecaseType } from 'src/pages/Bugs/Content/BugsTable/types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const UsecaseSelect = ({
  usecases,
  currentUsecase,
}: {
  usecases: BugByUsecaseType[];
  currentUsecase?: string;
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
          label={`${useCase.title.simple || useCase.title.full} (${
            bugs.length
          } bugs)`}
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
      inputValue={currentUsecase}
      selectionValue={currentUsecase}
      onSelect={async (usecaseId) => {
        const target = usecases.find((u) => u.useCase.id === Number(usecaseId))
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
