import { styled } from 'styled-components';

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: 250px;
  gap: ${({ theme }) => theme.space.md};
`;
