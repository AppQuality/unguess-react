import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';
import styled from 'styled-components';

export const BugStateIcon = styled(CircleFill)<{ height?: string }>`
  width: auto;
  height: 100%;
  max-height: 13px;
  margin: 0 2px;
  overflow: visible;
  stroke-width: 2;
`;
