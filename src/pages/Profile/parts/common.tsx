import { ContainerCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const StyledContainerCard = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.md};
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;
