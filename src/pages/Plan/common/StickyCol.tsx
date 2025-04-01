import { Col } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const StickyCol = styled(Col)<{ $stickyHeight: number }>`
  position: sticky;
  top: ${({ $stickyHeight }) => $stickyHeight}px;
  max-height: calc(
    95vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  min-height: calc(
    95vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  margin: 0;
  z-index: ${({ theme }) => theme.levels.front};
`;
