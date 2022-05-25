import { theme } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { SearchInput } from './search';
import { StatusDropdown } from './status';
import { TestTypeDropdown } from './test';
import { CampaignTypeDropdown } from './type';

const FiltersRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.space.base * 8}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
  }
`;

const FilterInputContainer = styled.div`
  margin-right: ${theme.space.base * 4}px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-right: 0;
    margin-bottom: ${theme.space.xxs};
    width: 100%;
  }
`;

export const Filters = () => {
  return (
    <FiltersRow>
      <FiltersContainer>
        <FilterInputContainer>
          <StatusDropdown />
        </FilterInputContainer>
        <FilterInputContainer>
          <CampaignTypeDropdown />
        </FilterInputContainer>
        <FilterInputContainer>
          <TestTypeDropdown />
        </FilterInputContainer>
      </FiltersContainer>
      <SearchInput />
    </FiltersRow>
  );
};
