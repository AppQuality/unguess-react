import { ReactNode } from 'react';
import styled from 'styled-components';

const ActiveWrapper = styled.span`
  background-color: rgba(214, 83, 194, 0.4);
  display: inline-block;
`;

const Component = ({ children }: { children: ReactNode }) => (
  <ActiveWrapper>{children}</ActiveWrapper>
);

export default Component;
