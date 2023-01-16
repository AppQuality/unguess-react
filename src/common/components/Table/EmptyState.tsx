import React from 'react';
import { theme } from 'src/app/theme';
import styled from 'styled-components';
import Background from './assets/bg_empty_state.png';

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: ${theme.space.md};
`;

export const EmptyState = ({
  colCount,
  children,
}: {
  colCount: number;
  children: React.ReactNode;
}) => (
  <tr>
    <td colSpan={colCount}>
      <StyledEmptyState>
        <>
          <img
            src={Background}
            alt="table empty"
            style={{ marginBottom: theme.space.lg }}
          />
          {children}
        </>
      </StyledEmptyState>
    </td>
  </tr>
);
