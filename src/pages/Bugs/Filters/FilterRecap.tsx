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
  type: 'severities' | 'types' | 'tags' | 'useCases'; // TODO: add new filter
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
            case 'tags':
              dispatch(
                updateFilters({
                  filters: {
                    tags: filters.tags
                      ? filters.tags.filter((t) => t.tag_id !== Number(value))
                      : [],
                  },
                })
              );
              break;
            case 'useCases':
              dispatch(
                updateFilters({
                  filters: {
                    useCases: filters.useCases
                      ? filters.useCases.filter((t) => t.id !== Number(value))
                      : [],
                  },
                })
              );
              break;
            // TODO: add new filter
            default:
          }
        }}
      />
    </StyledTag>
  );
};

const RecapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const FilterRecap = () => {
  const filters = getSelectedFilters();
  const haveFilters =
    (filters.severities && filters.severities.length) ||
    (filters.types && filters.types.length);
  if (!haveFilters) {
    return null;
  }
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
      {filters.tags && filters.tags.length
        ? filters.tags.map((tag) => (
            <FilterRecapItem
              type="tags"
              value={tag.tag_id.toString()}
              name={tag.display_name}
            />
          ))
        : null}
      {filters.useCases && filters.useCases.length
        ? filters.useCases.map((useCase) => (
            <FilterRecapItem
              type="useCases"
              value={useCase.id.toString()}
              name={useCase.title.full}
            />
          ))
        : null}
      {/* TODO: add new filter */}
    </>
  );
};
