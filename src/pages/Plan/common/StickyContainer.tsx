import styled from 'styled-components';

export const StickyContainer = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height} -
      ${({ theme }) => theme.space.xxl} - ${({ theme }) => theme.space.xxl}
  );
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.sm};
  z-index: ${({ theme }) => theme.levels.front};
  padding-bottom: ${({ theme }) => theme.space.xxl};

  &::-webkit-scrollbar {
    display: none;
  }
`;
