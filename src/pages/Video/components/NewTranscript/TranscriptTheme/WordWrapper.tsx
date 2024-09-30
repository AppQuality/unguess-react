import { ReactNode } from 'react';
import styled from 'styled-components';

const WordWrapper = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.md};
  position: relative;
  color: ${({ theme }) => theme.palette.grey[700]};
  line-height: 40px;
`;

const Component = ({ children }: { children: ReactNode }) => (
  <WordWrapper>{children}</WordWrapper>
);

export default Component;
