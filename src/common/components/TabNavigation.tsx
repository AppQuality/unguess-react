import { getColor } from '@appquality/unguess-design-system';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export type TabNavigationItem = {
  /** Stable id used to resolve the active tab. */
  id: string;
  /** Visible tab label. */
  label: React.ReactNode;
  /** Destination URL for the tab (built by the caller). */
  to: string;
};

type TabNavigationProps = {
  items: TabNavigationItem[];
  activeId: string;
  className?: string;
  'aria-label'?: string;
};

const StyledTabList = styled.ul`
  list-style: none;
  display: flex;
  gap: 0;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  overflow-x: auto;
  overflow-y: hidden;
`;

const StyledNavButton = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px 28px 6px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  outline: none;
  border-bottom: ${({ theme }) => theme.borderWidths.md} solid
    ${({ theme, $active }) =>
      $active ? getColor(theme.colors.primaryHue, 600) : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? getColor(theme.colors.primaryHue, 600) : theme.palette.grey[600]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeights.semibold : theme.fontWeights.medium};
  text-decoration: none;
  white-space: nowrap;
  margin-bottom: -1px;

  &:hover {
    color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
    text-decoration: none;
  }

  &:focus,
  &:focus-visible,
  &:active {
    outline: none;
    box-shadow: none;
    background: transparent;
    border-radius: 0;
  }
`;

/**
 * URL-driven tab navigation: a row of links styled as tabs with a bottom
 * underline indicator on the active item. Stateless and presentational — the
 * caller owns the routing and builds each item's `to` URL.
 */
export const TabNavigation = ({
  items,
  activeId,
  className,
  'aria-label': ariaLabel,
}: TabNavigationProps) => (
  <StyledTabList className={className} aria-label={ariaLabel}>
    {items.map((item) => {
      const isActive = activeId === item.id;
      return (
        <li key={item.id}>
          <StyledNavButton
            to={item.to}
            $active={isActive}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </StyledNavButton>
        </li>
      );
    })}
  </StyledTabList>
);
