import styled from 'styled-components';

export const NavContainer = styled.div`
  position: relative;
  height: 100%;
  padding: ${({ theme }) => theme.space.md};
  z-index: ${({ theme }) => theme.levels.front};
  margin-right: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
`;
