import { MD, SM } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export type MetaSize = 'medium' | 'large';

export interface MetaArgs extends React.HTMLAttributes<HTMLDivElement> {
  size?: MetaSize;
  children?: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
  secondaryText?: React.ReactNode;
}

const IconWrapper = styled.span``;

const StyledSpan = styled.span``;

const StyledMeta = styled.div<{ size: MetaSize }>`
  margin-right: ${(p) => p.theme.space.sm};
  &:last-of-type {
    margin-right: 0;
  }
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  padding: 0;
  min-width: 24px;
  background: transparent;
  text-decoration: none;
  color: ${(p) => p.color || p.theme.palette.grey[700]};

  ${IconWrapper} {
    display: inline-flex;
    align-items: center;
    margin-right: ${(p) => p.theme.space.xxs};
    > * {
      width: ${(p) => (p.size === 'large' ? '24px' : '16px')};
      height: ${(p) => (p.size === 'large' ? '24px' : '16px')};
    }
  }
  ${StyledSpan} {
    color: ${(p) => p.theme.palette.grey[700]};
    font-weight: ${(p) => p.theme.fontWeights.medium};
    margin-left: ${(p) => p.theme.space.xxs};
  }
`;

const Meta = ({
  size = 'medium',
  children,
  color,
  icon,
  secondaryText,
}: MetaArgs) => (
  <StyledMeta size={size} color={color}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {size === 'medium' ? (
      <SM isBold color={color}>
        {children}
      </SM>
    ) : (
      <MD isBold color={color}>
        {children}
      </MD>
    )}
    {typeof secondaryText !== 'undefined' && (
      <StyledSpan>{secondaryText}</StyledSpan>
    )}
  </StyledMeta>
);

export { Meta };
