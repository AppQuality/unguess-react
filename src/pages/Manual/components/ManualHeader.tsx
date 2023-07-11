import styled from 'styled-components';

export const ManualHeader = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  padding: ${({ theme }) => theme.space.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
`;
