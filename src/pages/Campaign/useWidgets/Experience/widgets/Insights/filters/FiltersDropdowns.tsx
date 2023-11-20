import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
import { SeverityFilter } from './SeverityFilter';
import { UseCaseFilter } from './UsecaseFilter';

const FlexWrapper = styled.div<{
  orderXl?: number;
}>`
  position: sticky;
  top: -1px;
  column-gap: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-basis: 100%;
  z-index: ${({ theme }) => theme.levels.front};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.space.sm} 0;

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
