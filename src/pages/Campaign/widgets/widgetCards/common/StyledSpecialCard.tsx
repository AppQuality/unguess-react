import { SpecialCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const StyledSpecialCard = styled(SpecialCard)`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`;
