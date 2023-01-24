import { Anchor, SM } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { setFilterDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import { TypeFilter } from './TypeFilter';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';
import { SearchFilter } from './SearchFilter';
import { FilterRecap } from './FilterRecap';
import { GroupBy } from './GroupBy';
import { BugsFilterDrawer } from '../Drawer';
import { TagFilter } from './TagFilter';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space.base * 4}px;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const RecapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`;

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const OrderInfo = styled.div`
  flex: 2;
  text-align: end;
  align-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const BugsFilters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <FilterContainer>
        <SearchFilter />
        <UniqueFilter />
        <ReadFilter />
        <SeverityFilter />
        <TypeFilter />
        <TagFilter />
        <OrderInfo>
          <StyledSM isBold>
            {t('__BUGS_PAGE_DEFAULT_SEVERITY_SORT_LABEL')}
          </StyledSM>
        </OrderInfo>
        <GroupBy />
        <Anchor
          onClick={() => {
            dispatch(setFilterDrawerOpen(true));
          }}
        >
          {t('__BUGS_FILTER_VIEW_ALL_LABEL')}
        </Anchor>
      </FilterContainer>
      <RecapContainer>
        <FilterRecap />
      </RecapContainer>
      <BugsFilterDrawer />
    </>
  );
};

export { BugsFilters };
