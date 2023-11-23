import { Button, Tag } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { getSeverityInfo } from 'src/common/components/utils/getSeverityInfo';
import {
  getCurrentUxData,
  resetFilters,
  updateFilters,
} from 'src/features/uxFilters';
import { styled } from 'styled-components';
import { getSeverity } from '../utils';
import { useFilterData } from './useFilterData';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${(p) => p.theme.space.xs};

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    min-height: 0;
  }
`;

const Inner = styled.div`
  overflow-x: auto;
  overflow-y: visible;
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
  align-items: center;
  flex-wrap: nowrap;

  @media (min-width: ${(p) => p.theme.breakpoints.md}) {
    flex-wrap: wrap;
    width: auto;
    .filter-recap-item {
      margin-right: ${(p) => p.theme.space.xs};
    }
  }
`;

export const FiltersTags = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = getCurrentUxData();
  const { counters: severitiesCounters } = useFilterData('severities');
  const { counters: clustersCounters } = useFilterData('clusters');

  if (!data || !data.clusters || !data.severities) return null;

  const removeSeverity = (id: number) => () => {
    const { selected } = data.severities;
    dispatch(
      updateFilters({
        filters: {
          severities: selected.filter((s) => s.id !== id),
        },
      })
    );
  };

  const removeUseCase = (id: number) => () => {
    const { selected } = data.clusters;
    dispatch(
      updateFilters({
        filters: {
          clusters: selected.filter((c) => c.id !== id),
        },
      })
    );
  };

  return (
    <Wrapper>
      <Inner>
        <ScrollingContainer>
          {data.severities.selected.map((item) => (
            <Tag
              key={item.id}
              hue={`${
                getSeverityInfo(getSeverity(item) as Severities, t).color
              }10`}
              color={getSeverityInfo(getSeverity(item) as Severities, t).color}
              size="large"
            >
              {data.severities.available.find((s) => s.id === item.id)?.name} (
              {severitiesCounters[item.id] ?? 0})
              <Tag.Close onClick={removeSeverity(item.id)} />
            </Tag>
          ))}

          {data.clusters.selected.map((item) => (
            <Tag key={item.id} size="large" hue={appTheme.palette.grey[200]}>
              {data.clusters.available.find((s) => s.id === item.id)?.name} (
              {clustersCounters[item.id] ?? 0})
              <Tag.Close onClick={removeUseCase(item.id)} />
            </Tag>
          ))}

          {(data.clusters.selected.length > 0 ||
            data.severities.selected.length > 0) && (
            <Button
              isBasic
              size="medium"
              onClick={() => {
                dispatch(resetFilters());
              }}
              style={{ marginLeft: appTheme.space.xs }}
            >
              {t('__BUGS_FILTER_VIEW_RESET_LABEL')}
            </Button>
          )}
        </ScrollingContainer>
      </Inner>
    </Wrapper>
  );
};
