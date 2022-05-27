import { Divider } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const CardDivider = styled(Divider)`
  background-color: ${({ theme }) => theme.palette.grey[200]};
  margin: ${({ theme }) => theme.space.base * 3}px 0;
`;
