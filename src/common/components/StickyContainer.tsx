import { ContainerCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const StickyContainer = styled(ContainerCard)`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  z-index: 1;
  padding: ${({ theme }) => theme.space.sm}
    ${({ theme }) => theme.space.base * 4}px;
  background-color: ${({ theme }) => theme.palette.white};
`;
