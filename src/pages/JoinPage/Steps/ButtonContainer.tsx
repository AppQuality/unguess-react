import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.sm};
  flex-direction: column;
  padding-top: ${(p) => p.theme.space.md};
`;
