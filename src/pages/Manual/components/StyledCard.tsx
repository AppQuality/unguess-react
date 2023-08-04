import { ContainerCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';

const StyledCard = styled(ContainerCard)`
  margin-top: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space.xl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.space.lg} ${theme.space.md}`};
  }
`;

export default StyledCard;
