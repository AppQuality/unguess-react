import styled from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { Link } from 'react-scroll';
import { MD } from '@appquality/unguess-design-system';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';

export const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

export const StickyNavItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  cursor: pointer;
  margin: ${({ theme }) => theme.space.sm} 0;
  transition: all 0.1s ease-in-out;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
  ${(props) => retrieveComponentStyles('navigation.hoverableItem', props)};
`;

StickyNavItem.defaultProps = {
  activeClass: 'isCurrent',
};

export const StickyNavItemLabel = styled(MD)`
  padding-top: ${({ theme }) => theme.space.xxs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
