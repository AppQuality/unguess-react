import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.space.sm};
  padding-right: 0;
  padding-bottom: ${({ theme }) => 6 * theme.space.base}px;
  padding-left: 0;

  > button {
    width: auto;
  }
`;
