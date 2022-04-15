import { theme } from "@appquality/unguess-design-system";
import styled from "styled-components";
import { SearchInput } from "./search";
import { StatusDropdown } from "./status";
import { TestTypeDropdown } from "./test";
import { CampaignTypeDropdown } from "./type";

const FiltersRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.space.base * 8}px;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FilterInputContainer = styled.div`
  margin-right: ${theme.space.base * 4}px;
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
