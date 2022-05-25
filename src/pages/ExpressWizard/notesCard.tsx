import { Card, MD } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const NotesTitle = styled(MD)`
  color: ${({ theme }) => theme.palette.teal.M600};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const Notes = styled(Card)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.space.base * 4}px;
  box-shadow: none !important; /** TODO: temporary fix */
`;
