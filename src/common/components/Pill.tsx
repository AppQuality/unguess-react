import { Span, Tag } from '@appquality/unguess-design-system';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledTag = styled(Tag)`
  color: ${(props) => props.hue};
  pointer-events: none;

  > * {
    overflow: visible;
    text-overflow: unset;
  }
`;

const StyledSpan = styled(Span)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

export const Pill: FC<{
  title: string;
  background?: string;
  color?: string;
  icon?: ReactNode;
}> = ({ background, color, icon, title, children }) => (
  <StyledTag isPill hue={background ?? 'white'} size="large">
    {icon && <StyledTag.Avatar className="icon">{icon}</StyledTag.Avatar>}
    <Span isBold style={{ color: color ?? 'black' }}>
      {title}
    </Span>
    {children && <StyledSpan>{children}</StyledSpan>}
  </StyledTag>
);
