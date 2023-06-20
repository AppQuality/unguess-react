import { Col, Row } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Campaign } from 'src/features/api';
import {
  selectStatuses,
  selectTestNames,
  selectTypes,
} from 'src/features/campaigns';
import { SearchInput } from './search';
import { StatusDropdown } from './status';
import { TestTypeDropdown } from './test';
import { CampaignTypeDropdown } from './type';

const FiltersRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

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
  width: 100%;
  margin-right: ${({ theme }) => theme.space.base * 4}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 0;
    width: 100%;
  }
`;

export const Filters = ({ campaigns }: { campaigns: Campaign[] }) => (
  <FiltersRow>
    <FiltersContainer>
      <Row>
        <Col xs={12} md={6} lg={3}>
          <FilterInputContainer>
            <StatusDropdown availableStatuses={selectStatuses(campaigns)} />
          </FilterInputContainer>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <FilterInputContainer>
            <CampaignTypeDropdown availableTypes={selectTypes(campaigns)} />
          </FilterInputContainer>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <FilterInputContainer>
            <TestTypeDropdown availableTests={selectTestNames(campaigns)} />
          </FilterInputContainer>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <FilterInputContainer>
            <SearchInput />
          </FilterInputContainer>
        </Col>
      </Row>
    </FiltersContainer>
  </FiltersRow>
);
