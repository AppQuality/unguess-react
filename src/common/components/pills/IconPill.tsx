import { Span, Tag } from '@appquality/unguess-design-system';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledAvatar = styled(Tag.Avatar)``;

const StyledTag = styled(Tag)`
  pointer-events: none;
  padding: 0;
  margin-right: ${({ theme }) => theme.space.xs};
  ${StyledAvatar} {
    margin-left: 0;
    margin-right: ${({ theme }) => theme.space.xxs};
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
}

export const IconPill = ({
  background,
  color,
  icon,
  title,
  children,
  size,
  ...props
}: PillProps) => (
  <PillContainer {...props}>
    <StyledTag isPill hue={background ?? 'white'} size={size || 'large'}>
      {icon && <StyledAvatar>{icon}</StyledAvatar>}
      {title}
    </StyledTag>
    {children && <StyledChild>{children}</StyledChild>}
  </PillContainer>
);
