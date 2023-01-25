import { Span, Tag } from '@appquality/unguess-design-system';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledAvatar = styled(Tag.Avatar)``;

const StyledTag = styled(Tag)<{ iconPosition: 'left' | 'right' }>`
  pointer-events: none;
  padding: 0;
  margin-right: ${({ theme }) => theme.space.xs};
  ${StyledAvatar} {
    ${({ iconPosition, theme }) => {
      if (iconPosition === 'left') {
        return `
          margin-left: 0;
          margin-right: ${theme.space.xxs};
      `;
      }
      return `
        margin-right: 0;
        margin-left: ${theme.space.xxs};
    `;
    }}
  }
`;

const StyledChild = styled(Span)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const PillContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-right: ${({ theme }) => theme.space.xs};
  display: flex;
  align-items: center;
`;

interface PillProps {
  title: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  background?: string;
  color?: string;
  icon?: ReactNode;
  children?: ReactNode;
  size?: Parameters<typeof Tag>[0]['size'];
  iconPosition?: 'left' | 'right';
}

export const IconPill = ({
  background,
  icon,
  title,
  children,
  size,
  iconPosition = 'left',
  ...props
}: PillProps) => (
  <PillContainer {...props}>
    <StyledTag
      iconPosition={iconPosition}
      isPill
      hue={background ?? 'white'}
      size={size || 'large'}
    >
      {iconPosition === 'right' ? title : null}
      {icon && <StyledAvatar>{icon}</StyledAvatar>}
      {iconPosition === 'left' ? title : null}
    </StyledTag>
    {children && <StyledChild>{children}</StyledChild>}
  </PillContainer>
);
