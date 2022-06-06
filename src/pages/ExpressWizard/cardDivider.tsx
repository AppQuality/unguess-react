import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';

export const CardDivider = styled(Divider)`
  background-color: ${({ theme }) => theme.palette.grey[200]};
  margin: ${({ theme }) => theme.space.base * 3}px 0;
`;
