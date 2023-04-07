import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';
import styled from 'styled-components';

export const BugStateIcon = styled(CircleFill)<{ size?: 'regular' | 'small' }>`
  width: auto;
  height: 100%;
  max-height: ${(p) => (p.size === 'small' ? '9px' : '11px')};
  overflow: visible;
  stroke-width: 2;
`;
