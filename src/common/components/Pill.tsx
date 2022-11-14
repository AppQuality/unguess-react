import {
  Span,
  Tag,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { FC, ReactNode } from 'react';
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

export const Pill: FC<{
  title: string;
  background?: string;
  color?: string;
  icon?: ReactNode;
}> = ({ background, color, icon, title, children }) => (
  <PillContainer>
    <StyledTag isPill hue={background ?? 'white'} size="large">
      {icon && <StyledAvatar>{icon}</StyledAvatar>}
      <Span isBold style={{ color: color ?? globalTheme.palette.grey[700] }}>
        {title}
      </Span>
    </StyledTag>
    {children && <StyledChild>{children}</StyledChild>}
  </PillContainer>
);
