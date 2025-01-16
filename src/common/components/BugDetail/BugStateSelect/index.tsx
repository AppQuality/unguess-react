import { Select, Separator } from '@appquality/unguess-design-system';
import React, { useMemo } from 'react';
import { appTheme } from 'src/app/theme';
import { Circle } from 'src/common/components/CustomStatusDrawer/Circle';
import styled from 'styled-components';

export const SelectedItem = styled.div`
  display: flex;
  align-items: center;

  > svg {
    margin-right: ${({ theme }) => theme.space.xs};
    margin-left: 1px; // fix icon alignment
  }
`;

const ToTileCase = (str: string) =>
  str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const BugStateSelect = ({
  currentStatusId,
  phases,
  onChange,
  additionalOptions,
}: {
  currentStatusId?: number;
  phases: {
    statuses: { id: number; name: string; color: string }[];
  }[];
  onChange?: (statusId: number) => void;
  additionalOptions?: React.ReactNode;
}) => {
  const options = useMemo(
    () =>
      phases.map((phase) => (
        <div key={JSON.stringify(phase.statuses)}>
          {phase.statuses.map((status) => (
            <Select.Option
              key={status.id}
              value={status.id.toString()}
              icon={
                <Circle
                  color={status.color}
                  style={{ margin: `auto ${appTheme.space.xs} auto 0` }}
                />
              }
              label={ToTileCase(status.name)}
            />
          ))}
          <Separator />
        </div>
      )),
    [currentStatusId, phases]
  );

  return (
    <Select
      isCompact
      listboxAppendToNode={document.body}
      renderValue={(value) => {
        const selectedStatus = phases
          .flatMap((p) => p.statuses)
          .find((s) => s.id === Number(value.inputValue));
        return (
          <SelectedItem>
            <Circle color={selectedStatus?.color || ''} />{' '}
            {ToTileCase(selectedStatus?.name || '')}
          </SelectedItem>
        );
      }}
      inputValue={currentStatusId?.toString()}
      selectionValue={currentStatusId?.toString()}
      onSelect={(value) => {
        if (onChange) onChange(Number(value));
      }}
    >
      {options}
      {additionalOptions}
    </Select>
  );
};

export default BugStateSelect;
