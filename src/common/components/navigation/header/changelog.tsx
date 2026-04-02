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

    const initHeadway = () => {
      // @ts-ignore
      if (window.Headway && typeof window.Headway.init === 'function') {
        // Check is Headway is already initialized to prevent multiple initializations
        const headwayElement = document.querySelector('#headway-widget');
        const isAlreadyInitialized = !!headwayElement;

        if (!isAlreadyInitialized) {
          // @ts-ignore
          window.Headway.init(HW_config);
        } else {
          // eslint-disable-next-line no-console
          console.warn('Headway is already initialized');
        }
      } else {
        // eslint-disable-next-line no-console
        console.warn('Headway not found');
      }
    };

    initHeadway();

    return () => {
      // @ts-ignore
      if (window.Headway && window.Headway.destroy) {
        // @ts-ignore
        window.Headway.destroy();
      }
    };
  }, []);

  return (
    <HeaderItem>
      <StyledWidget id="headway-widget">
        <ChangelogIcon />
      </StyledWidget>
    </HeaderItem>
  );
};
