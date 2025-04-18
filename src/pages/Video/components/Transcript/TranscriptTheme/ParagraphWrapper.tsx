import { ReactNode } from 'react';
import styled from 'styled-components';

const ComponentContainer = ({ children }: { children: ReactNode }) => (
  <div data-qa="transcript-paragraph">{children}</div>
);

const Component = styled(ComponentContainer)`
  padding: ${({ theme }) => theme.space.sm} 0;
  .paragraph-topbar {
    display: flex;
    justify-content: space-between;
  }
`;

export default Component;
