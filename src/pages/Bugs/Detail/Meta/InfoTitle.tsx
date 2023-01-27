import { Span } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const InfoTitle = styled(Span)`
  color: ${({ theme }) => theme.palette.grey[600]};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;
