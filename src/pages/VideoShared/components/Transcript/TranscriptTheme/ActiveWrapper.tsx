import { ReactNode } from 'react';
import styled from 'styled-components';

const ActiveWrapper = styled.span`
  background-color: ${({ theme }) => theme.palette.fuschia[400]}66;
  display: inline-block;
`;

const Component = ({ children }: { children: ReactNode }) => (
  <ActiveWrapper>{children}</ActiveWrapper>
);

export default Component;
