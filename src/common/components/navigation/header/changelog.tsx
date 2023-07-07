import { HeaderItem } from '@appquality/unguess-design-system';
import HeadwayWidget from '@headwayapp/react-widget';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ChangelogIcon } from 'src/assets/icons/megaphone-stroke.svg';
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
    <StyledWidget>
      <HeadwayWidget account="Jn0mVx">
        <ChangelogIcon />
      </HeadwayWidget>
    </StyledWidget>
  </HeaderItem>
);
