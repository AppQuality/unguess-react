import {
  getSelectedFilters,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { Tag } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as XIcon } from 'src/assets/icons/close-icon.svg';

const FilterRecapItem = ({
  type,
  value,
  name,
}: {
  type: 'search' | 'unique' | 'severities' | 'types' | 'read';
  value: string;
  name: string;
}) => {
  const dispatch = useAppDispatch();
  const filters = getSelectedFilters();
  return (
    <Tag size="large" isPill>
      {name}
      <XIcon
        onClick={() => {
          switch (type) {
            case 'search':
              dispatch(
                updateFilters({
                  filters: {
                    search: undefined,
                  },
                })
              );
              break;
            case 'unique':
              dispatch(
                updateFilters({
                  filters: {
                    unique: false,
                  },
                })
              );
              break;
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
            case 'read':
              dispatch(
                updateFilters({
                  filters: {
                    read: false,
                  },
                })
              );
              break;
            default:
          }
        }}
      />
    </Tag>
  );
};

export const FilterRecap = () => {
  const filters = getSelectedFilters();
  return (
    <>
      {filters.search ? (
        <FilterRecapItem
          type="search"
          value={filters.search}
          name={filters.search}
        />
      ) : null}
      {filters.unique ? (
        <FilterRecapItem
          type="unique"
          value={filters.unique}
          name={filters.unique}
        />
      ) : null}
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
      {filters.read ? (
        <FilterRecapItem type="read" value={filters.read} name={filters.read} />
      ) : null}
    </>
  );
};
