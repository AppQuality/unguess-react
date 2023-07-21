import styled from 'styled-components';

export const ScrollingContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: 0;

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  &:hover {
    ::-webkit-scrollbar {
      background-color: inherit;
    }
  }
`;
