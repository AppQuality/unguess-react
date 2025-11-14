import styled from 'styled-components';

export const StyledPanelSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.xxl};
`;

export const StyledHintContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

export const StyledActivityItem = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
