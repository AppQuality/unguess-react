import { SpecialCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const WidgetSpecialCard = styled(SpecialCard)`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  cursor: auto;
  &:hover {
    box-shadow: none;
  }
`;
