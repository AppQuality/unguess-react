import styled from 'styled-components';
import { TypeFilter } from './TypeFilter';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';
import { SearchFilter } from './SearchFilter';
import { FilterRecap } from './FilterRecap';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.base * 4}px;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;
const RecapContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;

const BugsFilters = () => (
  <>
    <FilterContainer>
      <SearchFilter />
      <UniqueFilter />
      <ReadFilter />
      <SeverityFilter />
      <TypeFilter />
    </FilterContainer>
    <RecapContainer>
      <FilterRecap />
    </RecapContainer>
  </>
);

export { BugsFilters };
