import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  position: relative;
  color: ${({ theme }) => theme.palette.blue[600]};
  line-height: 2;
  font-style: italic;
  user-select: none;
`;

const Component = ({ children }: { children: ReactNode }) => (
  <Wrapper contentEditable="false">{children}</Wrapper>
);

export default Component;
