import { Button } from '@appquality/unguess-design-system';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { setFilterDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import { appTheme } from 'src/app/theme';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';
import { SearchFilter } from './SearchFilter';
import { GroupBy } from './GroupBy';
import { SortBy } from './OrderBy';
import { BugsFilterDrawer } from '../Drawer';

const SearchContainer = styled.div`
  flex-basis: 100%;
  @media (min-width: ${appTheme.breakpoints.md}) {
    flex-basis: 178px;
    margin-right: 8px;
    max-width: 178px;
  }
`;

const TableToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (min-width: ${appTheme.breakpoints.lg}) {
    justify-content: space-between;
  }
`;

const hideOnMobile = css`
  display: none;
  @media (min-width: ${appTheme.breakpoints.md}) {
    display: inherit;
  }
`;

const HideOnMobile = styled.div`
  ${hideOnMobile}
`;

const FlexWrapper = styled.div<{
  orderXl?: number;
  hideOnMobile?: boolean;
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
  ${(p) => p.hideOnMobile && hideOnMobile}
`;

const Wrapper = styled.div`
  padding-top: ${(p) => p.theme.space.sm};
`;

const BugsFilters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <Wrapper>
        <TableToolsContainer>
          <FlexWrapper orderXl={2} hideOnMobile>
            <SortBy />
            <GroupBy />
          </FlexWrapper>
          <FlexWrapper orderXl={1}>
            <SearchContainer className="input-search-bugs">
              <SearchFilter />
            </SearchContainer>
            <UniqueFilter />
            <HideOnMobile>
              <ReadFilter />
            </HideOnMobile>
            <HideOnMobile>
              <SeverityFilter />
            </HideOnMobile>
            <Button
              size="medium"
              className="all-filters-button"
              isBasic
              onClick={() => {
                dispatch(setFilterDrawerOpen(true));
              }}
            >
              {t('__BUGS_FILTER_VIEW_ALL_LABEL')}
            </Button>
          </FlexWrapper>
        </TableToolsContainer>
      </Wrapper>
      <BugsFilterDrawer />
    </>
  );
};

export { BugsFilters };
