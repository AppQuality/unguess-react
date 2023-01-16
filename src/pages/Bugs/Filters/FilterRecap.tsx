import styled from 'styled-components';
import {
  getSelectedFilters,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { Tag } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as XIcon } from 'src/assets/icons/close-icon.svg';

const XIconStyled = styled(XIcon)``;
const StyledTag = styled(Tag)`
  background-color: ${({ theme }) => theme.palette.blue[100]};
  ${XIconStyled} {
    cursor: pointer;
  }
`;

const FilterRecapItem = ({
  type,
  value,
  name,
}: {
  type: 'severities' | 'types';
  value: string;
  name: string;
}) => {
  const dispatch = useAppDispatch();
  const filters = getSelectedFilters();
  return (
    <StyledTag size="large" isPill>
      {name}
      <XIconStyled
        onClick={() => {
          switch (type) {
            case 'severities':
              dispatch(
                updateFilters({
                  filters: {
                    severities: filters.severities
                      ? filters.severities.filter((s) => s.id !== Number(value))
                      : [],
                  },
                })
              );
              break;
            case 'types':
              dispatch(
                updateFilters({
                  filters: {
                    types: filters.types
                      ? filters.types.filter((t) => t.id !== Number(value))
                      : [],
                  },
                })
              );
              break;
            default:
          }
        }}
      />
    </StyledTag>
  );
};

export const FilterRecap = () => {
  const filters = getSelectedFilters();
  return (
    <>
      {filters.severities && filters.severities.length
        ? filters.severities.map((severity) => (
            <FilterRecapItem
              type="severities"
              value={severity.id.toString()}
              name={severity.name}
            />
          ))
        : null}
      {filters.types && filters.types.length
        ? filters.types.map((type) => (
            <FilterRecapItem
              type="types"
              value={type.id.toString()}
              name={type.name}
            />
          ))
        : null}
    </>
  );
};
