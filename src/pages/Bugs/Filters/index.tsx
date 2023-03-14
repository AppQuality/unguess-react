import { Button } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { setFilterDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import { theme as globalTheme } from 'src/app/theme';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';
import { SearchFilter } from './SearchFilter';
import { FilterRecap } from './FilterRecap';
import { GroupBy } from './GroupBy';
import { SortBy } from './SortBy';
import { BugsFilterDrawer } from '../Drawer';

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    'filters'
    'group-sort'
    'filter-recap';
  grid-template-columns: 1fr;
`;

const GridArea = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
  > * {
    margin-bottom: 12px;
  }
`;

const SearchContainer = styled.div`
  @media (min-width: ${globalTheme.breakpoints.md}) {
    margin-right: 16px;
  }
`;
const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 12px;
  align-items: center;
  @media (min-width: ${globalTheme.breakpoints.md}) {
    margin-right: 16px;
  }
`;

const BugsFilters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <Grid>
        <GridArea area="filters">
          <SearchContainer>
            <SearchFilter />
          </SearchContainer>
          <FiltersContainer>
            <UniqueFilter />
            <ReadFilter />
            <SeverityFilter />
            <Button
              size="small"
              isBasic
              onClick={() => {
                dispatch(setFilterDrawerOpen(true));
              }}
            >
              {t('__BUGS_FILTER_VIEW_ALL_LABEL')}
            </Button>
          </FiltersContainer>
        </GridArea>
        <GridArea area="group-sort">
          <SortBy />
          <GroupBy />
        </GridArea>
        <GridArea area="filter-recap">
          <FilterRecap />
        </GridArea>
      </Grid>
      <BugsFilterDrawer />
    </>
  );
};

export { BugsFilters };
