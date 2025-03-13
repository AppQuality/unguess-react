import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  align-items: flex-start;
  padding: ${({ theme }) => `${theme.space.sm} 0`};

  > button {
    width: auto;
  }
`;
