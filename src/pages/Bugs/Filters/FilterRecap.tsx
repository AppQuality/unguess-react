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
  type:
    | 'severities'
    | 'types'
    | 'tags'
    | 'useCases'
    | 'devices'
    | 'os'
    | 'replicabilities'; // TODO: add new filter
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
            case 'devices':
              dispatch(
                updateFilters({
                  filters: {
                    devices: filters.devices
                      ? filters.devices.filter((t) => t.device !== value)
                      : [],
                  },
                })
              );
              break;
            case 'os':
              dispatch(
                updateFilters({
                  filters: {
                    os: filters.os
                      ? filters.os.filter((t) => t.os !== value)
                      : [],
                  },
                })
              );
              break;
            case 'replicabilities':
              dispatch(
                updateFilters({
                  filters: {
                    replicabilities: filters.replicabilities
                      ? filters.replicabilities.filter(
                          (t) => t.id !== Number(value)
                        )
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
      {filters.devices && filters.devices.length
        ? filters.devices.map((device) => (
            <FilterRecapItem
              type="devices"
              value={device.device}
              name={device.device}
            />
          ))
        : null}
      {filters.os && filters.os.length
        ? filters.os.map((os) => (
            <FilterRecapItem type="os" value={os.os} name={os.os} />
          ))
        : null}
      {filters.replicabilities && filters.replicabilities.length
        ? filters.replicabilities.map((replicability) => (
            <FilterRecapItem
              type="replicabilities"
              value={replicability.id.toString()}
              name={replicability.name}
            />
          ))
        : null}
      {/* TODO: add new filter */}
    </>
  );
};
