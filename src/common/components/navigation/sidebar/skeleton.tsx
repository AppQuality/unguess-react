import {
  getColor,
  Nav,
  NavDivider,
  NavItem,
  NavItemIcon,
  NavItemProject,
  NavItemText,
  NavToggle,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useAppSelector } from 'src/app/hooks';
import styled from 'styled-components';

const StyledNav = styled(Nav)<SidebarProps>`
  ${({ isExpanded, theme }) =>
    isExpanded && `width: ${theme.components.chrome.nav.openWidth}`};
`;

const StyledNavItem = styled(NavItem)`
  flex: 0;
  &[aria-current='true'] {
    background-color: ${({ theme }) => getColor(theme.colors.primaryHue, 100)};
  }
`;

const StyledNavItemProject = styled(NavItemProject)`
  flex: 0;
  &[aria-current='true'] {
    background-color: ${({ theme }) => getColor(theme.colors.primaryHue, 100)};
  }
`;

const StyledNavDivider = styled(NavDivider)`
  flex: 0;
`;
export const SidebarSkeleton = (props: SidebarProps) => {
  const { isSidebarOpen } = useAppSelector((state) => state.navigation);

  return (
    <StyledNav {...props} isExpanded={isSidebarOpen}>
      <NavToggle isExpanded={isSidebarOpen} />

      <StyledNavItem isExpanded={isSidebarOpen} isCurrent>
        <NavItemIcon isStyled>
          <Skeleton
            width="32px"
            height="32px"
            style={{ borderRadius: '100%' }}
          />
        </NavItemIcon>
        <Skeleton height="12px" width="60%" />
        <NavItemText />
      </StyledNavItem>

      <StyledNavDivider isExpanded={isSidebarOpen} />

      <StyledNavItemProject
        key={1}
        isExpanded={isSidebarOpen}
        isCurrent={false}
      >
        <Skeleton width="60%" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="80%" />
      </StyledNavItemProject>

      <StyledNavItemProject
        key={2}
        isExpanded={isSidebarOpen}
        isCurrent={false}
      >
        <Skeleton width="60%" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="80%" />
      </StyledNavItemProject>

      <StyledNavItemProject
        key={3}
        isExpanded={isSidebarOpen}
        isCurrent={false}
      >
        <Skeleton width="60%" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="80%" />
      </StyledNavItemProject>

      <StyledNavItemProject
        key={4}
        isExpanded={isSidebarOpen}
        isCurrent={false}
      >
        <Skeleton width="60%" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="80%" />
      </StyledNavItemProject>

      {/* Footer Logo */}
      <StyledNavItem
        isExpanded={isSidebarOpen}
        hasBrandmark
        title="Be smart from the start"
        style={{ pointerEvents: 'none' }}
      >
        <NavItemIcon>
          <Skeleton
            width="32px"
            height="32px"
            style={{ borderRadius: '100%' }}
          />
        </NavItemIcon>
        <NavItemText>UNGUESS</NavItemText>
      </StyledNavItem>
    </StyledNav>
  );
};
