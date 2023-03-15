import {
  getSelectedFilters,
  resetFilters,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { Button, Tag } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import { theme } from 'src/app/theme';

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
    | 'replicabilities';
  value: string;
  name: string;
}) => {
  const dispatch = useAppDispatch();
  const filters = getSelectedFilters();
  return (
    <Tag hue={theme.palette.blue[100]} size="large">
      {name}
      <Tag.Close
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
                      ? filters.tags.filter((t) =>
                          value === 'none'
                            ? t.tag_id !== value
                            : t.tag_id !== Number(value)
                        )
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
            default:
          }
        }}
      />
    </Tag>
  );
};

export const FilterRecap = () => {
  const { t } = useTranslation();
  const filters = getSelectedFilters();
  const dispatch = useAppDispatch();

  const hasFilters =
    filters.severities?.length ||
    filters.types?.length ||
    filters.tags?.length ||
    filters.useCases?.length ||
    filters.devices?.length ||
    filters.os?.length ||
    filters.replicabilities?.length;

  return hasFilters ? (
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
      {filters.useCases && filters.useCases.length
        ? filters.useCases.map((useCase) => (
            <FilterRecapItem
              type="useCases"
              value={useCase.id.toString()}
              name={useCase.title.full}
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
      {filters.replicabilities && filters.replicabilities.length
        ? filters.replicabilities.map((replicability) => (
            <FilterRecapItem
              type="replicabilities"
              value={replicability.id.toString()}
              name={replicability.name}
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
      <Button
        isBasic
        size="small"
        onClick={() => {
          dispatch(resetFilters());
        }}
        style={{ marginLeft: '8px' }}
      >
        {t('__BUGS_FILTER_VIEW_RESET_LABEL')}
      </Button>
    </>
  ) : null;
};
