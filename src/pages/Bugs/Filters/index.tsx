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
  flex-basis: 100%;
  @media (min-width: ${globalTheme.breakpoints.sm}) {
    flex-basis: 178px;
    margin-right: 8px;
    max-width: 178px;
  }
`;
const FiltersContainer = styled(GridArea)`
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  align-items: center;
`;

const BugsFilters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <Grid>
        <FiltersContainer area="filters">
          <SearchContainer>
            <SearchFilter />
          </SearchContainer>
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
