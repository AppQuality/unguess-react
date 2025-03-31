import { Col } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const StickyCol = styled(Col)`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  max-height: calc(
    95vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  min-height: calc(
    95vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  margin: 0;
  z-index: ${({ theme }) => theme.levels.front};
`;
