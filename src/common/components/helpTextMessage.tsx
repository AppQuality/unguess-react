import { Message } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const HelpTextMessage = styled(Message)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.space.sm};
`;
