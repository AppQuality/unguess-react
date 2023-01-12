import { theme } from 'src/app/theme';
import styled from 'styled-components';
import Background from './bg_empty_state.png';

interface EmptyStateProps {
  children?: React.ReactNode;
}

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: ${theme.space.md};
`;

export const BasicEmptyState = ({ children }: EmptyStateProps) => (
  <EmptyState>
    <img
      src={Background}
      alt="table empty"
      style={{ marginBottom: theme.space.lg }}
    />
    {children}
  </EmptyState>
);
