import { ReactNode } from 'react';
import styled from 'styled-components';

const ComponentContainer = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => (
  <div data-qa="transcript-paragraph" className={className}>
    {children}
  </div>
);

const Component = styled(ComponentContainer)`
  padding: ${({ theme }) => theme.space.sm} 0;
  .paragraph-topbar {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`;

export default Component;
