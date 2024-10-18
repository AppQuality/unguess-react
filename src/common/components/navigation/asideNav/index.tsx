// TODO: Structure the menu in this components instead of using the children

import {
  Anchor,
  ContainerCard,
  MD,
  Skeleton,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { Link } from 'react-scroll';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';

export const StickyNavContainer = styled(ContainerCard)`
  position: sticky;
  top: ${({ theme }) => theme.space.md};
  z-index: 1;
  padding: ${({ theme }) => theme.space.sm};
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    background-color: transparent;
    border-color: transparent;
    padding: ${({ theme }) => theme.space.xs};
  }
`;

export const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 6}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

export const StickyNavItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xs}
    ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.space.xs};
  transition: all 0.1s ease-in-out;
  text-decoration: none;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    text-decoration: none;
  }

  ${(props) => retrieveComponentStyles('navigation.hoverableItem', props)};

  &.isCurrent {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

StickyNavItem.defaultProps = {
  activeClass: 'isCurrent',
};

export const StickyNavItemLabel = styled(MD)`
  padding-top: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

export const StickyNavItemExternal = styled(Anchor)`
  display: block;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xs}
    ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
`;

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
