import { SpecialCard } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';

const StyledHeader = styled(SpecialCard.Header)`
  pointer-events: none;
  z-index: 99;
`;

export const FiltersHeader = () => (
  <StyledHeader>
    <StyledHeader.Title style={{ marginBottom: appTheme.space.xs }}>
      Filtri
    </StyledHeader.Title>
  </StyledHeader>
);
