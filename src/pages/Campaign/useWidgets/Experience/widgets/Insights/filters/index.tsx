import { SpecialCard } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';
import { useAppSelector } from 'src/app/hooks';
import { SeverityFilter } from './severityFilter';
import { UseCaseFilter } from './usecaseFilter';

const StyledHeader = styled(SpecialCard.Header)`
  pointer-events: none;
`;

export const Filters = () => {
  const { severity: selectedSeverity, usecase: selectedUseCase } =
    useAppSelector((state) => state.uxFilters);
  return (
    <SpecialCard>
      <StyledHeader>
        <StyledHeader.Title style={{ marginBottom: appTheme.space.xs }}>
          Filtri
        </StyledHeader.Title>
      </StyledHeader>
      <UseCaseFilter />
      <SeverityFilter />
      <>selectedSeverity: {JSON.stringify(selectedSeverity)}</>
      <>selectedUseCase: {JSON.stringify(selectedUseCase)}</>
    </SpecialCard>
  );
};
