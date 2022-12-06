import styled from 'styled-components';
import { Divider } from 'src/common/components/divider';
import { Link } from 'react-scroll';
import { MD } from '@appquality/unguess-design-system';

export const StyledDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.space.base * 3}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

export const StickyNavItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top-left-radius: ${({ theme }) => theme.space.lg};
  border-bottom-left-radius: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  cursor: pointer;
  color: ${({ theme }) => theme.palette.blue[600]};
  margin: ${({ theme }) => theme.space.sm} 0;
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.palette.blue[700]};
    background-color: ${({ theme }) => theme.palette.kale[100]};
    transition: all 0.1s ease-in-out;
    text-decoration: none;
  }

  &.active {
    color: ${({ theme }) => theme.palette.blue[700]};
    background-color: ${({ theme }) => theme.palette.kale[100]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

export const StickyNavItemLabel = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[800]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
