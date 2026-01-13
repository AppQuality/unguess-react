import { HeaderItem } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

const StyledWidget = styled.div`
  svg {
    margin-top: ${appTheme.space.sm};
  }
  .HW_badge_cont {
    top: -${appTheme.space.xs};
  }
`;

export const Changelog = () => (
  <HeaderItem>
    <StyledWidget>sss </StyledWidget>
  </HeaderItem>
);
