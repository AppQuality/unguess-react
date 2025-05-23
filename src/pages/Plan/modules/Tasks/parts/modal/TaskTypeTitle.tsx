import styled from 'styled-components';
import { SM } from '@appquality/unguess-design-system';

export const TaskTypeTitle = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space.sm};
`;
