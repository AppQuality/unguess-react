import { Col, Row } from '@appquality/unguess-design-system';
import { selectStatuses, selectTestNames } from 'src/features/campaigns';
import styled from 'styled-components';
import { useCampaignsGroupedByProject } from '../campaigns-list/useCampaignsGroupedByProject';
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

export const Filters = () => {
  const { campaigns, isLoading, isFetching, isError } =
    useCampaignsGroupedByProject();

  if (isError || isLoading || isFetching) return null;

  const filtered = campaigns.flatMap((campaign) => campaign.items);

  return (
    <FiltersRow>
      <FiltersContainer>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <FilterInputContainer>
              <StatusDropdown availableStatuses={selectStatuses(filtered)} />
            </FilterInputContainer>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <FilterInputContainer>
              <CampaignTypeDropdown />
            </FilterInputContainer>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <FilterInputContainer>
              <TestTypeDropdown availableTests={selectTestNames(filtered)} />
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
};
