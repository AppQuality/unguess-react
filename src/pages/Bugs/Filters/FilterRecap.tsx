import {
  getSelectedFilters,
  resetFilters,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { ReactNode } from 'react';
import { Button, Tag } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import { getPriorityInfo } from 'src/common/components/utils/getPriorityInfo';
import styled from 'styled-components';
import { getSeverityInfo } from 'src/common/components/utils/getSeverityInfo';

const PillWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const FilterRecapItem = ({
  type,
  value,
  hasBackground,
  color,
  name,
  icon,
}: {
  type:
    | 'severities'
    | 'priorities'
    | 'types'
    | 'tags'
    | 'useCases'
    | 'devices'
    | 'os'
    | 'replicabilities';
  hasBackground?: boolean;
  color?: string;
  value: string;
  name: string;
  icon?: ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const filters = getSelectedFilters();
  return (
    <Tag
      hue={color && hasBackground ? `${color}10` : ''}
      color={color || 'inherit'}
      size="large"
    >
      {!icon ? (
        name
      ) : (
        <PillWrapper>
          {icon}
          {name}
        </PillWrapper>
      )}
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
            case 'priorities':
              dispatch(
                updateFilters({
                  filters: {
                    priorities: filters.priorities
                      ? filters.priorities.filter((p) => p.id !== Number(value))
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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: ${(p) => p.theme.space.sm};
  padding-top: ${(p) => p.theme.space.md};
`;

export const FilterRecap = () => {
  const { t } = useTranslation();
  const filters = getSelectedFilters();
  const dispatch = useAppDispatch();

  const hasFilters =
    filters.severities?.length ||
    filters.priorities?.length ||
    filters.types?.length ||
    filters.tags?.length ||
    filters.useCases?.length ||
    filters.devices?.length ||
    filters.os?.length ||
    filters.replicabilities?.length;

  return hasFilters ? (
    <Wrapper>
      {filters.severities && filters.severities.length
        ? filters.severities.map((severity) => (
            <FilterRecapItem
              type="severities"
              value={severity.id.toString()}
              color={getSeverityInfo(severity.name as Severities, t).color}
              hasBackground
              name={getSeverityInfo(severity.name as Severities, t).text}
            />
          ))
        : null}
      {filters.priorities && filters.priorities.length
        ? filters.priorities.map((priorities) => (
            <FilterRecapItem
              type="priorities"
              value={priorities.id.toString()}
              icon={getPriorityInfo(priorities.name as Priority, t).icon}
              name={getPriorityInfo(priorities.name as Priority, t).text}
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
    </Wrapper>
  ) : null;
};
