import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.sm};
  align-items: center;
  justify-content: flex-end;
  padding-top: ${(p) => p.theme.space.md};
`;
