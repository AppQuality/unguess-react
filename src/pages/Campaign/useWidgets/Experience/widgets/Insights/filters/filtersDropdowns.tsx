import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
import { SeverityFilter } from './severityFilter';
import { UseCaseFilter } from './usecaseFilter';

const FlexWrapper = styled.div<{
  orderXl?: number;
}>`
  position: sticky;
  top: ${({ theme }) => theme.space.xs};
  column-gap: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-basis: 100%;
  z-index: 99;
  > * {
    margin-bottom: 12px;
  }
  @media (min-width: ${appTheme.breakpoints.lg}) {
    flex-basis: auto;
  }
  @media (min-width: ${appTheme.breakpoints.xl}) {
    order: ${(p) => p.orderXl};
  }
`;

export const FiltersDropwdowns = () => (
  <FlexWrapper>
    <UseCaseFilter />
    <SeverityFilter />
  </FlexWrapper>
);
