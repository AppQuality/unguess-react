import styled from 'styled-components';
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

export const DropIndicator = styled.div<{ edge?: Edge }>`
  position: absolute;
  z-index: 10;
  background: ${(p) => p.theme.palette.azure[600]};
  pointer-events: none;
  box-sizing: border-box;
  width: 100%;
  height: 2px;
  top: ${(p) => (p.edge === 'top' ? 0 : '100%')};
  left: 0;
  transform: translateY(-50%);

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    position: absolute;
    top: -3px;
    border-width: 3px;
    border-style: solid;
    border-color: ${(p) => p.theme.palette.azure[600]};
    border-radius: 50%;
    box-sizing: border-box;
  }
`;
