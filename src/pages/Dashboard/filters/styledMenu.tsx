import { Menu } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const UgMenu = styled(Menu)`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: auto !important;
    min-width: 100%;
  }
`;
