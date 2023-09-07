/* TODO: Move all the components (StickyNavItem, StickyNavItemExternal, StickyNavItemLabel, StyledDivider) 
    inside this component instead of using "items" as a ReactNode. 
    At the end remove the same components from navigation file. */

import { Skeleton } from '@appquality/unguess-design-system';
import { StickyNavContainer } from '../../navigation';

interface IAsideNav {
  containerId: string;
  isSpy?: boolean;
  isSmooth?: boolean;
  duration?: number;
  offset?: number;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const AsideNav = ({ isLoading, children, ...rest }: IAsideNav) => (
  <StickyNavContainer {...rest}>
    {isLoading ? <Skeleton height="300px" /> : children}
  </StickyNavContainer>
);
