import { HeaderItem } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ChangelogIcon } from 'src/assets/icons/megaphone-stroke.svg';

import styled from 'styled-components';

const StyledWidget = styled.div`
  svg {
    margin-top: ${appTheme.space.sm};
  }
  .HW_badge_cont {
    position: absolute;
    top: -${appTheme.space.xs};
  }
`;

export const Changelog = () => {
  useEffect(() => {
    const HW_config = {
      selector: '#headway-widget',
      account: 'Jn0mVx',
    };
    window.Headway.init(HW_config);
  }, []);

  return (
    <HeaderItem>
      <StyledWidget id="headway-widget">
        <ChangelogIcon />
      </StyledWidget>
    </HeaderItem>
  );
};
