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
import { theme } from 'src/app/theme';

const buttonHeight = theme.space.lg; // 32
const sectionMargin = theme.space.sm; // 12
const tagsHeight = theme.space.lg; // 32
const sectionPaddingTop = theme.space.md; // 20

const StyledAvatarTag = styled(Tag.Avatar)`
  transform: scale(0.5);
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
        <>
          <StyledAvatarTag>{icon}</StyledAvatarTag>
          {name}
        </>
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
  position: relative;
  min-height: calc(
    ${buttonHeight} + ${sectionMargin} + ${tagsHeight} + ${sectionPaddingTop}
  );
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    min-height: 0;
  }
`;

const Inner = styled.div`
  overflow-x: auto;
  overflow-y: visible;
  padding-top: ${(p) => p.theme.space.md};
  padding-right: ${(p) => p.theme.space.sm};
  margin-right: -24px;
  @media (min-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-right: -48px;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    padding-right: 0;
    margin-right: 0;
    overflow-x: initial;
  }
`;

const ScrollingContainer = styled.div`
  display: flex;
  row-gap: ${(p) => p.theme.space.sm};
  width: max-content;
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    flex-wrap: wrap;
    width: auto;
    .filter-recap-item {
      margin-right: ${(p) => p.theme.space.xs};
    }
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: calc(${sectionMargin} + ${tagsHeight} + ${sectionPaddingTop});
  left: 0;
  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    position: static;
  }
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
      <Inner>
        <ScrollingContainer>
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
          <StyledButton
            isBasic
            size="small"
            onClick={() => {
              dispatch(resetFilters());
            }}
            style={{ marginLeft: '8px' }}
          >
            {t('__BUGS_FILTER_VIEW_RESET_LABEL')}
          </StyledButton>
        </ScrollingContainer>
      </Inner>
    </Wrapper>
  ) : null;
};
