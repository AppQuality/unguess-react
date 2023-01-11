import { Span, Tag } from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledTag = styled(Tag)`
  pointer-events: none;
  padding: 0;
  margin-right: ${({ theme }) => theme.space.xs};
`;

const StyledChild = styled(Span)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const StyledAvatar = styled(StyledTag.Avatar)`
  margin-left: 0 !important;
  margin-right: ${({ theme }) => theme.space.xxs} !important;
`;

const PillContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-right: ${({ theme }) => theme.space.xs};
`;
interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  background?: string;
  color?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const IconPill = ({
  background,
  color,
  icon,
  title,
  children,
  ...props
}: PillProps) => (
  <PillContainer {...props}>
    <StyledTag isPill hue={background ?? 'white'} size="large">
      {icon && <StyledAvatar>{icon}</StyledAvatar>}
      <Span isBold style={{ color: color ?? globalTheme.palette.grey[700] }}>
        {title}
      </Span>
    </StyledTag>
    {children && <StyledChild>{children}</StyledChild>}
  </PillContainer>
);
