import {
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

export const SidebarSkeleton = (props: SidebarProps) => {
  const { isSidebarOpen } = useAppSelector((state) => state.navigation);

  return (
    <StyledNav {...props} isExpanded={isSidebarOpen}>
      <NavToggle isExpanded={isSidebarOpen} />

      <NavItem isExpanded={isSidebarOpen} isCurrent>
        <NavItemIcon isStyled>
          <Skeleton
            width="32px"
            height="32px"
            style={{ borderRadius: '100%' }}
          />
        </NavItemIcon>
        <Skeleton height="12px" width="60%" />
        <NavItemText />
      </NavItem>

      <NavDivider isExpanded={isSidebarOpen} />

      <NavItemProject key={1} isExpanded={isSidebarOpen} isCurrent={false}>
        <Skeleton width="60%" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="80%" />
      </NavItemProject>

      <NavItemProject key={2} isExpanded={isSidebarOpen} isCurrent={false}>
        <Skeleton width="60%" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="80%" />
      </NavItemProject>

      <NavItemProject key={3} isExpanded={isSidebarOpen} isCurrent={false}>
        <Skeleton width="60%" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="80%" />
      </NavItemProject>

      <NavItemProject key={4} isExpanded={isSidebarOpen} isCurrent={false}>
        <Skeleton width="60%" style={{ marginBottom: '6px' }} />
        <Skeleton height="12px" width="80%" />
      </NavItemProject>

      {/* Footer Logo */}
      <NavItem
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
      </NavItem>
    </StyledNav>
  );
};
