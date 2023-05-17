import { ReactComponent as ChangelogIcon } from 'src/assets/icons/megaphone-stroke.svg';
import HeadwayWidget from '@headwayapp/react-widget';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { HeaderItem } from '@appquality/unguess-design-system';

const StyledWidget = styled.div`
  svg {
    margin-top: ${appTheme.space.sm};
  }
  .HW_badge_cont {
    top: -${appTheme.space.xs};
  }
`;

export const Changelog = () => (
  <HeaderItem style={{ marginRight: `-${appTheme.space.xs}` }}>
    <StyledWidget>
      <HeadwayWidget account="Jn0mVx">
        <ChangelogIcon />
      </HeadwayWidget>
    </StyledWidget>
  </HeaderItem>
);
