import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 76px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  position: relative;
  color: ${({ theme }) => theme.palette.blue[600]};
  line-height: 40px;
  font-style: italic;
`;

const Component = ({ children }: { children: ReactNode }) => (
  <Wrapper>{children}</Wrapper>
);

export default Component;
