import styled from 'styled-components';

export const NavContainer = styled.div`
  position: relative;
  height: 100%;
  padding: ${({ theme }) => theme.space.sm};
  z-index: ${({ theme }) => theme.levels.front};
  padding-bottom: ${({ theme }) => theme.space.xxl};
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
`;
