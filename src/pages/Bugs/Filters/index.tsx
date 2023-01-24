import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SM } from '@appquality/unguess-design-system';
import { TypeFilter } from './TypeFilter';
import { SeverityFilter } from './SeverityFilter';
import { ReadFilter } from './ReadFilter';
import { UniqueFilter } from './UniqueFilter';
import { SearchFilter } from './SearchFilter';
import { FilterRecap } from './FilterRecap';
import { GroupBy } from './GroupBy';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.base * 4}px;
  margin-bottom: ${({ theme }) => theme.space.lg};
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
const RecapContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;

const BugsFilters = () => {
  const { t } = useTranslation();
  return (
    <>
      <FilterContainer>
        <SearchFilter />
        <UniqueFilter />
        <ReadFilter />
        <SeverityFilter />
        <TypeFilter />
        <OrderInfo>
          <StyledSM isBold>
            {t('__BUGS_PAGE_DEFAULT_SEVERITY_SORT_LABEL')}
          </StyledSM>
        </OrderInfo>
        <GroupBy />
      </FilterContainer>
      <RecapContainer>
        <FilterRecap />
      </RecapContainer>
    </>
  );
};

export { BugsFilters };
