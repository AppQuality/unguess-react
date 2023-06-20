import { SM } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const StyledSM = styled(SM)<{ accent?: string }>`
    color: ${(p) => p.theme.palette.grey[600]}};
    span {
      color: ${(p) => p.accent};
    }
  `;
