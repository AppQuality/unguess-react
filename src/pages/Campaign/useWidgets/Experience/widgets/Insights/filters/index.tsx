import { SpecialCard, Tag, Button } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
import { useAppDispatch } from 'src/app/hooks';
import { getSeverityInfo } from 'src/common/components/utils/getSeverityInfo';
import {
  getCurrentUxData,
  resetFilters,
  updateFilters,
} from 'src/features/uxFilters';
import { useTranslation } from 'react-i18next';
import { SeverityFilter } from './severityFilter';
import { UseCaseFilter } from './usecaseFilter';
import { getSeverity } from '../utils';

const buttonHeight = appTheme.space.lg; // 32
const sectionMargin = appTheme.space.sm; // 12
const tagsHeight = appTheme.space.lg; // 32
const sectionPaddingTop = appTheme.space.md; // 20

const StyledHeader = styled(SpecialCard.Header)`
  pointer-events: none;
`;

const FlexWrapper = styled.div<{
  orderXl?: number;
}>`
  column-gap: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-basis: 100%;
  > * {
    margin-bottom: 12px;
  }
  @media (min-width: ${appTheme.breakpoints.lg}) {
    flex-basis: auto;
  }
  @media (min-width: ${appTheme.breakpoints.xl}) {
    order: ${(p) => p.orderXl};
  }
`;

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
  align-items: center;
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

export const Filters = () => {
  const { t } = useTranslation();
  const data = getCurrentUxData();

  const dispatch = useAppDispatch();

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
    <SpecialCard style={{ background: 'transparent' }}>
      <StyledHeader>
        <StyledHeader.Title style={{ marginBottom: appTheme.space.xs }}>
          Filtri
        </StyledHeader.Title>
      </StyledHeader>
      <FlexWrapper>
        <UseCaseFilter />
        <SeverityFilter />
      </FlexWrapper>

      <Wrapper>
        <Inner>
          <ScrollingContainer>
            {data.severities.selected.map((item) => (
              <Tag
                key={item.id}
                hue={`${
                  getSeverityInfo(getSeverity(item) as Severities, t).color
                }10`}
                color={
                  getSeverityInfo(getSeverity(item) as Severities, t).color
                }
                size="large"
              >
                {item.name}
                <Tag.Close onClick={removeSeverity(item.id)} />
              </Tag>
            ))}

            {data.clusters.selected.map((item) => (
              <Tag key={item.id} size="large" hue={appTheme.palette.grey[200]}>
                {item.name}
                <Tag.Close onClick={removeUseCase(item.id)} />
              </Tag>
            ))}

            <StyledButton
              isBasic
              size="medium"
              onClick={() => {
                dispatch(resetFilters());
              }}
            >
              {t('__BUGS_FILTER_VIEW_RESET_LABEL')}
            </StyledButton>
          </ScrollingContainer>
        </Inner>
      </Wrapper>
    </SpecialCard>
  );
};
