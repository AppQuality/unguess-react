import { Tag } from '@appquality/unguess-design-system';
import { theme } from 'src/app/theme';
import styled from 'styled-components';

export const Pill = styled(Tag)<{
  isBold?: boolean;
  backgroundColor?: string;
  color?: string;
}>`
  pointer-events: none;
  margin-right: ${(p) => p.theme.space.xs};
  border-radius: ${theme.borderRadii.lg};
  font-weight: ${theme.fontWeights.regular};
  color: ${(p) => p.color || theme.palette.grey[700]};
  background-color: ${(p) => p.backgroundColor || theme.palette.grey[100]};
  ${({ isBold }) => isBold && `font-weight: ${theme.fontWeights.medium};`}
  &:last-of-type {
    margin-right: 0;
  }
`;
